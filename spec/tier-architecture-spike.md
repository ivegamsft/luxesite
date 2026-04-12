# Architecture Spike: Three-Tier Transaction Model

> **Issue:** #210 · **Author:** Morpheus · **Date:** 2026-04-12  
> **Status:** Draft — pending team review

## Why This Document Exists

PR #202 changed our tier names. But the real change runs deeper: we moved from a **linear privilege hierarchy** (Silver < Black < Obsidian — three levels of the same thing) to **three fundamentally different transaction types**. This spike maps the architectural ripple effects so downstream specs don't build on stale assumptions.

---

## 1. Data Model Impact

### Current State

The existing `MembershipTier` type treats all tiers identically:

```typescript
// Current — apps/web/app/lib/types.ts
interface MembershipTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  featured: boolean;
  perks: string[];
  perTrip?: string;
}
```

This works for the static frontend (tier cards render the same shape). But once we add APIs (#180, #195), each transaction type carries different data.

### Proposed Interfaces

A shared base keeps the common shape. Per-tier types extend it with fields specific to each transaction model.

```typescript
// --- Base type (shared across all tiers) ---

type TierType = 'one-time' | 'yearly' | 'gift';

interface ServiceTierBase {
  id: string;
  tierType: TierType;
  name: string;
  tagline: string;
  price: string;
  perks: string[];
  /** ISO 8601 timestamp — when the client first engaged */
  createdAt: string;
}

// --- One Time: single event, no ongoing relationship ---

interface OneTimeEvent extends ServiceTierBase {
  tierType: 'one-time';
  /** What the client wants (gala, milestone birthday, etc.) */
  eventBrief: string;
  /** Target date for the event */
  eventDate: string;
  /** Estimated guest count — drives staffing and venue */
  guestCount: number;
  /** Where we are in the pipeline */
  status: 'inquiry' | 'planning' | 'confirmed' | 'executed' | 'completed';
}

// --- Yearly: subscription, recurring family events ---

interface YearlySubscription extends ServiceTierBase {
  tierType: 'yearly';
  /** When the subscription started */
  subscriptionStart: string;
  /** When it renews (or ended) */
  subscriptionEnd: string;
  /** Events used out of the annual allotment */
  eventsUsed: number;
  /** Max events per year (default: 12) */
  eventsIncluded: number;
  /** Active or lapsed */
  status: 'active' | 'paused' | 'cancelled' | 'expired';
}

// --- Gift: third-party purchase, buyer ≠ recipient ---

interface GiftPurchase extends ServiceTierBase {
  tierType: 'gift';
  /** Who bought it */
  buyer: ContactInfo;
  /** Who receives it */
  recipient: ContactInfo;
  /** Has the recipient activated their gift? */
  redeemed: boolean;
  /** ISO 8601 — 18 months from purchase */
  expiresAt: string;
  /** Tracking the gift lifecycle */
  status: 'purchased' | 'delivered' | 'activated' | 'redeemed' | 'expired';
}

// Shared contact shape — used by Gift tier's two-party model
interface ContactInfo {
  name: string;
  email: string;
  phone?: string;
}

// Discriminated union — use tierType to narrow
type ServiceTier = OneTimeEvent | YearlySubscription | GiftPurchase;
```

**Why a discriminated union?** TypeScript's narrowing on `tierType` gives us compile-time safety. A `switch` on `tierType` catches missing cases. Learners see a real-world use of discriminated unions — one of TypeScript's most practical patterns.

**Why `string` dates?** JSON has no Date type. ISO 8601 strings serialize cleanly and parse predictably. A teaching site should model what APIs actually return.

---

## 2. Consultation Flow Divergence

The current `ConciergeForm` is a single funnel. With three transaction types, the intake diverges after tier selection.

### One Time: Event Brief Flow

```
Tier selection → Event brief (what, when, where, how many)
  → Single consultation call
  → Contract + deposit
  → Planning phase → Execution → Completion
```

**Form fields:** Event type, target date, guest count, venue preferences, budget range, special requirements.

### Yearly: Subscription Onboarding

```
Tier selection → Family needs assessment (ages, interests, recurring dates)
  → Subscription agreement (annual commitment)
  → Ongoing planning calendar (12 events/year)
  → Quarterly check-ins
```

**Form fields:** Family composition, children's ages/interests, important annual dates, dietary/allergy notes, preferred regions.

### Gift: Two-Party Intake

```
Tier selection → Buyer info + recipient info + occasion
  → Gift presentation design (physical card, digital reveal, surprise delivery)
  → Purchase confirmation → Gift delivered to recipient
  → Recipient activates → Recipient enters One Time flow
```

**Form fields:** Buyer contact, recipient contact, occasion, delivery method, personal message, surprise preference.

### Implementation Recommendation

Don't build three separate forms. Use **progressive disclosure** — the base form collects name/email/tier, then reveals tier-specific fieldsets. ConciergeForm already has `showDetails` state and `selectedTier`; extend this pattern.

```
Base fields (all tiers):  name, email, tier selection
  ├─ one-time:  eventBrief, eventDate, guestCount, budget
  ├─ yearly:    familySize, childrenAges, annualDates, interests
  └─ gift:      recipientName, recipientEmail, occasion, deliveryMethod
```

**Why progressive disclosure?** It keeps the initial form approachable (3 fields), then expands. This is a real UX pattern learners should see — and it avoids the "wall of fields" anti-pattern.

---

## 3. API Shape Recommendations

These are sketches for #180 (Content APIs) and #195 (Booking APIs) — not full specs.

### Content API (#180) — Tier-Aware Endpoints

```
GET  /api/tiers                    → All tiers (static content, current shape)
GET  /api/tiers/:tierType          → Single tier detail
GET  /api/tiers/:tierType/catalog  → Available experiences for this tier type
```

The catalog endpoint matters because Gift tier recipients choose from a **curated subset**, not the full event menu.

### Booking API (#195) — Per-Tier Endpoints

```
POST /api/bookings/one-time     → Create one-time event inquiry
POST /api/bookings/yearly       → Start subscription onboarding
POST /api/bookings/gift         → Purchase gift (buyer flow)
POST /api/bookings/gift/redeem  → Activate gift (recipient flow)

GET  /api/bookings/:id          → Booking status (any tier type)
GET  /api/bookings/:id/timeline → Event/subscription timeline
```

**Why separate POST endpoints instead of one `/api/bookings` with a type field?** Three reasons:
1. Request bodies are different shapes — forcing them into one endpoint means a messy union with lots of optional fields
2. Validation rules differ per tier — separate endpoints keep validation clean
3. Learners see RESTful resource modeling: the URL tells you what you're creating

**Why a shared GET?** Once a booking exists, reading it uses the same pattern regardless of tier. The `tierType` discriminant in the response tells the client how to render it.

### Gift-Specific Endpoints

```
POST /api/gift/validate-recipient  → Check recipient email isn't already active
GET  /api/gift/:code               → Gift status lookup (recipient-facing)
POST /api/gift/:code/activate      → Recipient claims the gift
```

---

## 4. Gift Tier Recipient Model

The Gift tier is architecturally unique: the person who pays is not the person who uses the service.

### Data Flow

```
┌─────────┐    purchase    ┌──────────────┐    deliver     ┌───────────┐
│  Buyer  │ ──────────────→│ Gift Record  │──────────────→ │ Recipient │
│ (known) │                │ (system)     │                │ (unknown  │
└─────────┘                └──────────────┘                │  until    │
     │                           │                         │  activation)
     │ pays                      │ holds:                  └───────────┘
     │                           │  - buyer contact              │
     │                           │  - recipient contact           │ activates
     │                           │  - gift code                   │
     │                           │  - expiry (18 months)         ↓
     │                           │  - status              ┌───────────┐
     │                           │                        │ One Time  │
     │                           └───────────────────────→│ Event     │
     │                             (converts on redeem)   │ Booking   │
     └────────────────────────────────────────────────────→└───────────┘
       buyer notified when redeemed
```

### Key Design Decisions

1. **Gift code, not account creation.** The buyer provides a recipient email, but we don't create a recipient account at purchase time. The recipient gets a unique gift code and creates their own account on activation. Why: you can't create an account for someone who hasn't consented.

2. **Redemption converts to One Time.** When a recipient activates, the system creates a `OneTimeEvent` booking linked to the gift record. The recipient then follows the standard One Time consultation flow. Why: keeps the downstream flow simple — no "gift event" special case in planning.

3. **Expiry is hard.** 18 months from purchase. Expired gifts cannot be redeemed. Why: the business model needs a clear liability window. Real gift cards work this way.

4. **Buyer gets notified.** When the recipient activates, the buyer gets a confirmation. It's a gift — the buyer wants to know it landed. This is a webhook/notification concern, not a data model concern.

### Security Note for #208

The Gift tier introduces a **two-party identity model**. The security spec needs to address:
- Gift code generation (unique, non-guessable, URL-safe)
- Rate limiting on gift code lookups (prevent enumeration)
- Recipient activation creates a new identity — standard onboarding security applies

---

## 5. Impact on Existing Specs

| Spec | Issue | Impact | Severity |
|------|-------|--------|----------|
| `brand-pivot.md` | #203 | **Full rewrite needed.** Old 4-phase rollout assumed membership hierarchy. New model needs per-tier-type sections for data model, flow, and components. | P0 |
| `site.md` | #204 | Tier section description, ConciergeForm section, and any "membership" language need tier-type framing. ~13 refs. | P1 |
| `design-system-update.md` | #205 | Tier card component spec needs three variants. Color/styling may differ per tier type (e.g., Gift gets a distinct presentation). | P1 |
| `documentation-update.md` | #206 | Content voice examples reference old model. Teaching annotations need tier-type examples. | P1 |
| `security-architecture.md` | #208 | Gift tier two-party identity model (§4 above). Gift code security. Tier-based access control replaces linear RBAC. | P2 |

### What Does NOT Need Deep Updates

- **`docs/competitive-analysis.md` (#207):** Terminology swap only. The competitive landscape analysis applies regardless of tier structure.
- **Issues #142, #144:** These need retitling (#209) but the architectural approach — three distinct detail pages — was already implied by #210.

---

## 6. Sample Data Implications (#190)

Each tier type needs representative sample records showing realistic lifecycle states.

### One Time — Sample Records Needed

| Record | State | Teaching Purpose |
|--------|-------|-----------------|
| Completed gala event | `completed` | Shows full lifecycle with all fields populated |
| Event in planning | `planning` | Shows partial data (no post-event fields yet) |
| New inquiry | `inquiry` | Minimal fields — shows what intake captures |

### Yearly — Sample Records Needed

| Record | State | Teaching Purpose |
|--------|-------|-----------------|
| Active subscription, 7/12 events used | `active` | Shows mid-year state with event history |
| Recently renewed subscription | `active` | Shows subscription continuity |
| Expired subscription | `expired` | Shows end-state, events preserved |

### Gift — Sample Records Needed

| Record | State | Teaching Purpose |
|--------|-------|-----------------|
| Purchased, not yet delivered | `purchased` | Shows buyer-only data |
| Delivered, awaiting activation | `delivered` | Shows both parties, pending state |
| Redeemed and converted to event | `redeemed` | Shows full chain: gift → booking |
| Expired, never redeemed | `expired` | Shows expiry handling |

**Why four Gift samples?** The Gift lifecycle has more states than the other tiers because of the two-party handoff. Learners need to see each transition.

---

## Summary of Recommendations

1. **Adopt discriminated union** (`ServiceTier = OneTimeEvent | YearlySubscription | GiftPurchase`) as the canonical type. Keep the current flat `MembershipTier` for static tier card rendering — it's fine for display.

2. **Progressive disclosure in ConciergeForm** — don't build three forms. Extend the existing `selectedTier` + `showDetails` pattern with tier-conditional fieldsets.

3. **Separate POST endpoints per tier type** in the Booking API. Shared GET for reads. Gift gets its own sub-resource (`/api/gift/`).

4. **Gift redemption converts to One Time** — no special "gift event" type downstream. Keeps the planning pipeline simple.

5. **Update specs in dependency order:** #203 (brand pivot, P0) → #204/#205/#206 (P1, parallelizable) → #208 (security, P2).

6. **Sample data needs 10 records** across three tier types covering all lifecycle states.

---

*This is a teaching site. Every architectural decision above was chosen because it's a pattern worth learning, not because it's the only way. Simpler alternatives exist; these patterns earn their complexity.*
