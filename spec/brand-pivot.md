# Brand Pivot Specification — Aurora Luxe

> **Issue:** #203 (supersedes #181)  
> **Author:** Morpheus (Lead/Architect)  
> **Status:** Draft  
> **Date:** 2026-04-14  
> **Scope:** Specs only — no code changes  
> **Depends on:** Architecture spike `spec/tier-architecture-spike.md` (#210)

---

## 1. Executive Summary

Aurora Luxe is a **luxury experiential party platform**. We design and produce extraordinary, bespoke celebrations — from half-million-dollar galas to curated children's birthday parties to surprise gift experiences purchased by a third party.

This spec defines the brand language, data model, consultation flow, and implementation phases for the party platform. It replaces the earlier travel-era spec (#181) and aligns with the three-tier transaction model documented in the architecture spike (#210).

### The Three Service Tiers

Aurora Luxe offers three fundamentally different **service tiers** — not levels of the same thing, but three distinct transaction types:

| Tier | Price | Transaction Type | Who It's For |
|---|---|---|---|
| **One Time** | $500,000 | Single event booking | A client who wants one extraordinary event produced |
| **Yearly** | $1,200,000/yr | Annual subscription | A family that wants cradle-to-pre-teen celebrations managed year-round |
| **Gift** | $250,000 | Third-party purchase | A buyer purchasing an experience for someone else (buyer ≠ recipient) |

**Why this matters architecturally:** These aren't pricing tiers — they're structurally different products with different data shapes, consultation flows, and API endpoints. The architecture spike (#210) documents the discriminated union pattern (`ServiceTier = OneTimeEvent | YearlySubscription | GiftPurchase`) that models this. This spec translates those architectural decisions into brand language, content strategy, and implementation phases.

This is a **teaching site** — fictitious content, production-grade architecture, simple readable code. Every decision in this spec was chosen because it's a pattern worth learning. Simpler alternatives exist; these patterns earn their complexity.

---

## 2. Brand Identity

### 2.1 Positioning Statement

> **Aurora Luxe: Architects of the Extraordinary.**  
> We don't plan parties. We produce events that rewrite what's possible.

**Positioning:** Ultra-premium bespoke event production for UHNW individuals and families. From intimate milestone celebrations to city-scale spectacles to curated children's experiences — if it can be dreamed, we can produce it.

### 2.2 Brand Voice Guidelines

| Attribute | Description |
|---|---|
| **Scope language** | "events," "productions," "celebrations," "experiences" |
| **Expertise signal** | "event architects," "production directors," "celebration designers" |
| **Scale language** | "private venues," "custom-built sets," "bespoke logistics," "white-glove coordination" |
| **Emotional register** | Aspiration + wonder + imagination |

**Core voice principles (unchanged from previous identity):**
- Commanding, discreet, bespoke personality
- No "curated," "discerning," "pinnacle" — ban list unchanged
- Fragmented, atmospheric copy style (see Decision #3, Hero Copy Direction)
- UHNW confidence without showiness

**Added to voice:**
- Playfulness where context allows (kids' events, pet celebrations)
- Narrative framing — each event has a "story arc"
- Scale vocabulary — "intimate" (2–10 people) to "spectacular" (100+ people)
- Tier-aware language — copy acknowledges that One Time, Yearly, and Gift clients have different needs

### 2.3 What Stays the Same

- **Visual identity:** Warm ivory base, champagne gold accent, deep navy hero/tiers/footer
- **Typography:** Space Grotesk headings, Inter body, fluid clamp() scale
- **Design principles:** Authority through restraint, warmth in light, editorial hierarchy, accessible luxury, memorable through craft
- **Brand name:** Aurora Luxe (no name change)
- **Anti-references:** Generic AI sites, generic event planning sites, SaaS landing pages
- **Technical stack:** Next.js, TypeScript, Tailwind CSS, Framer Motion, static data

### 2.4 What Changes

| Area | Previous (Travel Era) | Current (Party Platform) |
|---|---|---|
| Company descriptor | "Luxury Travel" | "Luxury Experiential Party Platform" |
| Service model | Linear privilege hierarchy (three levels of the same thing) | Three distinct transaction types (One Time, Yearly, Gift) |
| Primary content unit | Geographic locations | Event packages and celebration types |
| Category system | Geographic regions | Event categories (Galas, Milestones, Children's, Corporate, Bespoke) |
| Team titles | Regional specialists | "Event Architect," "Celebration Director," "Production Lead" |
| Hero CTA | "Explore destinations" | "Design Your Event" |
| Social proof framing | Location-based testimonials | Event-based testimonials |
| FAQ scope | Logistics (flights, booking, cancellation) | Event logistics (planning timelines, safety, venues, scale) |
| Pricing | Undifferentiated tiers | $500K one-time · $1.2M/yr subscription · $250K gift |

---

## 3. Information Architecture

### 3.1 Current Sitemap (Single-Page Sections)

```
page.tsx (Home)
├── Hero              — Updated headline/subhead + event type/scale picker
├── TrustBar          — Press/award logos
├── WhyAurora         — 3-card editorial grid (why choose us)
├── ExperiencePortfolio — Category-driven event browsing
├── FeaturedPackages   — Curated highlight packages
├── Testimonials       — Event-focused testimonials spanning tier types
├── Interstitial       — Breathing break / visual divider
├── Tiers              — One Time / Yearly / Gift service tiers
├── FAQ                — 8 event-focused questions
└── ConciergeForm      — Tier-aware intake with progressive disclosure
```

**Navigation:** Events | Packages | Our Team | Service Tiers | Testimonials | Contact

### 3.2 Key Structural Notes

1. **Tiers section** displays three cards — but unlike a typical pricing table, each card represents a different *kind* of engagement, not a level of privilege. The card design should visually communicate this (see §7.3).
2. **ConciergeForm** adapts its fields based on which tier the user selected. This is the progressive disclosure pattern documented in the architecture spike §2.
3. **ExperiencePortfolio** shows event categories, not locations. Each card links to sample packages within that category.

### 3.3 Category Taxonomy for Event Types

Six top-level categories, each with 2–4 sub-types:

| Category | Description | Sub-types |
|---|---|---|
| **Galas & Spectacles** | Large-scale formal events | Black-tie galas, award ceremonies, launch events, charity spectacles |
| **Celebrations** | Personal milestone events | Milestone birthdays, anniversary productions, engagement parties, pet celebrations |
| **Children's** | Kid-focused parties and builds | Themed birthday parties, adventure builds, science camps, creative workshops |
| **Corporate** | Business entertaining at the highest level | Executive retreats, product launches, team celebrations, client entertainment |
| **Productions** | Cinematic/theatrical-scale events | City-scale film weekends, private concert productions, immersive theater, documentary events |
| **Bespoke** | Fully custom, unclassifiable events | If you can describe it, we can produce it |

---

## 4. Content Strategy

### 4.1 Hero Section

**New headline options (pick one during implementation):**
1. "Events That Don't Exist Yet"
2. "We Build What You Imagine"
3. "Beyond the Guest List"

**New subhead options:**
1. "A rented city block. A six-year-old's robot birthday. A surprise gala for someone who has everything."
2. "Private productions. Impossible timelines. Events that rewrite the rules."
3. "From backyard adventure builds to city-scale spectacles. If you can dream it, we produce it."

**Recommendation:** Option 1 for headline, Option 1 for subhead. Maintains the fragmented atmospheric style from Decision #3 while signaling the breadth of event types.

**Hero discovery row update:**
- "What kind?" → event category selector (maps to §3.3 taxonomy)
- "How many guests?" → scale selector
- "Talk to an architect →" → links to ConciergeForm

### 4.2 "Why Us" Proof Points

**New proof points (3-card grid):**

| Card | Title | Supporting Copy |
|---|---|---|
| 1 | **Architects, Not Planners** | "We don't book venues — we build worlds. Every event is designed from scratch, with dedicated production teams, bespoke logistics, and white-glove execution." |
| 2 | **Every Scale, Every Scene** | "Intimate candlelit proposals. 500-guest spectacles. Supervised backyard builds for a six-year-old's birthday. The scale changes; the standard doesn't." |
| 3 | **Obsessive Safety & Detail** | "Behind every extraordinary moment is a meticulous operations plan. Licensed vendors, contingency protocols, and real-time coordination — invisible to you, essential to us." |

### 4.3 Event Categories (ExperiencePortfolio Section)

Each category card displays: icon, title, description, 2–3 sample event titles, price range.

| Category | Sample Events | Starting Price |
|---|---|---|
| **Galas & Spectacles** | "The Midnight Masquerade," "Neon Noir: A Warehouse Gala," "The Floating Ballroom" | From $500,000 |
| **Celebrations** | "The Royal Paw Gala" (luxury dog party), "Golden Anniversary: A Private Opera," "Surprise 50th: Rooftop Fireworks" | From $250,000 |
| **Children's** | "Backyard Space Station Build," "Junior Paleontologist Expedition," "Robot Wars: Birthday Edition" | From $50,000 |
| **Corporate** | "The Boardroom in the Sky," "Product Launch: Immersive Edition," "Team Summit: Arctic Base Camp" | From $300,000 |
| **Productions** | "Rent-a-City: Your Weekend Film," "Private Concert for 50," "Murder Mystery: Your Estate" | From $500,000 |
| **Bespoke** | "Tell us your dream. We'll tell you when it's ready." | By Consultation |

### 4.4 Service Tiers — Content & Positioning

The three tiers are **not levels** — they are fundamentally different transaction types. The content on each tier card must communicate this distinction clearly.

**One Time — "One Night. Every Detail." ($500,000)**
- Full-service production for a single extraordinary event
- Dedicated event architect and production team
- Venue sourcing, design, build-out, and teardown
- Complete vendor coordination (catering, entertainment, AV, décor)
- Day-of production management with real-time coordination
- Post-event documentation (professional photography, highlight reel)

**Yearly — "Every Milestone. Every Year." ($1,200,000/yr)**
- Annual subscription covering cradle-to-pre-teen family celebrations
- Up to 12 produced events per year (birthdays, holidays, milestones)
- Dedicated family event architect who knows your children's evolving interests
- Ongoing planning calendar with quarterly check-ins
- Priority vendor access and venue booking year-round
- Rollover unused events (up to 3) to the following year
- Sibling coordination — themed continuity across kids' events

**Gift — "Give the Impossible." ($250,000)**
- Purchase a single produced event for someone else
- Buyer and recipient are different people — two-party model
- Choose a presentation style: physical card, digital reveal, or surprise in-person delivery
- Recipient activates with a unique gift code and enters the One Time consultation flow
- 18-month redemption window from purchase date
- Buyer is notified when the recipient activates

**Why these three?** See architecture spike §1 — each tier carries structurally different data. A One Time event has a date, guest count, and venue. A Yearly subscription has a renewal cycle and event allotment. A Gift has a buyer, a recipient, and a redemption lifecycle. Forcing these into a single "tier" shape would mean a messy interface full of optional fields. The discriminated union pattern keeps each type clean.

### 4.5 Testimonials — Updated for Event Variety

Replace previous testimonials with 7 that span tier types and event categories:

| Name | Event Type (Tier) | Key Quote Direction |
|---|---|---|
| Sophia Chen | Anniversary gala (One Time) | "They turned a rooftop into Venice for our 25th anniversary" |
| Marcus Laurent | Surprise 40th birthday (Gift) | "I bought it for my wife — she had no idea until the helicopter landed" |
| Aisha Rahman | Annual family events (Yearly) | "Our kids' birthday parties are the talk of the school — every single year" |
| Henrik Bjørn | City-scale production (One Time) | "They shut down three blocks of Stockholm for our company's centennial" |
| Olivia Martinez | Luxury dog celebration (One Time) | "Our golden retriever's birthday party had 40 guests, a three-course dog menu, and a photographer from Vogue" |
| James Whitfield | Kids' adventure build (Yearly) | "They built a working zip line and fossil dig in our backyard for our son's 8th birthday" |
| Yuki Tanaka | Corporate retreat (One Time) | "The product launch felt like a film premiere — because it was" |

### 4.6 FAQ — Updated for Party Platform

Replace previous FAQs with 8 event-focused FAQs:

| ID | Question | Answer Direction |
|---|---|---|
| `process` | "How does the event design process work?" | Consultation → concept brief → production plan → execution. Flow varies by tier type (see §6) |
| `tiers` | "What's the difference between One Time, Yearly, and Gift?" | Three different transaction types, not privilege levels. One Time = single event. Yearly = annual subscription for family events. Gift = buy an event for someone else. |
| `lead-time` | "How far in advance should I plan?" | 4–8 weeks for intimate events, 3–6 months for galas/productions, 12+ months for city-scale spectacles |
| `modifications` | "Can I change the plan after booking?" | Yes — flexibility is built into every tier. Yearly subscribers can adjust their calendar quarterly. |
| `cancellation` | "What if I need to cancel?" | Cancellation policies vary by tier. Gift purchases have an 18-month redemption window with no cancellation needed. |
| `safety` | "How do you handle safety and permits?" | Licensed vendors, insurance, local permits, contingency plans, on-site safety coordinators for every event |
| `kids-safety` | "Are children's events supervised?" | DBS/background-checked staff, age-appropriate risk assessment, parent briefing, 1:4 staff-child ratio minimum |
| `gift` | "How does the Gift tier work?" | You purchase, choose a presentation method, and we deliver a gift code. The recipient activates when ready and enters the full consultation flow. Codes are valid for 18 months. |

### 4.7 CTA Language

| Location | CTA Text |
|---|---|
| Hero primary | "Design Your Event" |
| Hero secondary | "Explore Events" |
| Hero discovery row | "Talk to an architect →" |
| One Time tier card | "Start Planning" |
| Yearly tier card | "Subscribe Now" |
| Gift tier card | "Give an Experience" |
| Footer | "Design Something Extraordinary" |
| Navbar CTA | "Start Here" |

**Why tier-specific CTAs?** Each tier enters a different consultation funnel (see §6). The CTA text signals what happens next. "Start Planning" sets up a single-event intake. "Subscribe Now" sets up an annual onboarding. "Give an Experience" sets up the two-party gift flow.

---

## 5. Data Model

### 5.1 Service Tier Types (from Architecture Spike #210)

The architecture spike defines a **discriminated union** for service tiers. This is the canonical type system — all downstream specs and components reference these interfaces.

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
  createdAt: string;  // ISO 8601
}

// --- One Time: single event, no ongoing relationship ---

interface OneTimeEvent extends ServiceTierBase {
  tierType: 'one-time';
  eventBrief: string;
  eventDate: string;
  guestCount: number;
  status: 'inquiry' | 'planning' | 'confirmed' | 'executed' | 'completed';
}

// --- Yearly: subscription, recurring family events ---

interface YearlySubscription extends ServiceTierBase {
  tierType: 'yearly';
  subscriptionStart: string;
  subscriptionEnd: string;
  eventsUsed: number;
  eventsIncluded: number;  // default: 12
  status: 'active' | 'paused' | 'cancelled' | 'expired';
}

// --- Gift: third-party purchase, buyer ≠ recipient ---

interface GiftPurchase extends ServiceTierBase {
  tierType: 'gift';
  buyer: ContactInfo;
  recipient: ContactInfo;
  redeemed: boolean;
  expiresAt: string;  // 18 months from purchase
  status: 'purchased' | 'delivered' | 'activated' | 'redeemed' | 'expired';
}

// Discriminated union — use tierType to narrow
type ServiceTier = OneTimeEvent | YearlySubscription | GiftPurchase;
```

**Why a discriminated union?** TypeScript's narrowing on `tierType` gives compile-time safety. A `switch` on `tierType` catches missing cases. Learners see a real-world use of discriminated unions — one of TypeScript's most practical patterns. See architecture spike §1 for full field-level documentation.

**Why `string` dates?** JSON has no Date type. ISO 8601 strings serialize cleanly and parse predictably. A teaching site should model what APIs actually return.

### 5.2 ExperiencePackage Type (Event Catalog)

The primary content unit for the event catalog. Each bookable event template is an `ExperiencePackage`:

```typescript
/** A single bookable event package */
export interface ExperiencePackage {
  slug: string;                    // URL-safe identifier
  title: string;                   // Display title
  tagline: string;                 // 1-2 sentence atmospheric description
  category: EventCategory;         // Top-level category
  subCategory?: string;            // Optional sub-category for filtering
  priceFrom: number;               // Starting price in USD
  priceDisplay: string;            // e.g., "From $500,000" or "By Consultation"
  imageUrl: string;                // Hero image URL
  highlights: string[];            // 3-5 bullet points
  duration: string;                // e.g., "1 evening", "3 days", "2 weekends"
  guestRange: string;              // e.g., "2–10", "50–500", "1 very good dog"
  locationType: 'fixed' | 'flexible' | 'remote' | 'client-site';
  location: string;                // e.g., "Any major city", "Your backyard"
  ageRange?: 'all-ages' | 'adults-only' | 'kids-focused' | 'family';
  complexity: 'intimate' | 'standard' | 'complex' | 'spectacular';
  featured: boolean;
  sortOrder: number;
}
```

### 5.3 Category Taxonomy Type

```typescript
/** Top-level event categories */
export type EventCategory =
  | 'galas'
  | 'celebrations'
  | 'childrens'
  | 'corporate'
  | 'productions'
  | 'bespoke';

/** Metadata for each category (used in ExperiencePortfolio section) */
export interface CategoryMeta {
  id: EventCategory;
  label: string;
  description: string;
  icon: string;
  imageUrl: string;
  subCategories: string[];
  sortOrder: number;
}
```

### 5.4 Supporting Type Updates

```typescript
/** TeamMember — updated titles, no structural change */
export interface TeamMember {
  id: string;
  name: string;
  title: string;          // e.g., "Event Architect" instead of regional specialist
  bio: string;
  photoUrl: string;
  yearsExperience: number;
  specialties: string[];  // Now category-based (galas, children's, etc.)
}

/** Testimonial — add tier type and category tag */
export interface Testimonial {
  id: string;
  name: string;
  role: string;           // Describes the event, not a location
  quote: string;
  location: string;
  date: string;
  avatar?: string;
  rating?: number;
  sourceLink?: string;
  tierType?: TierType;              // NEW: which tier (one-time, yearly, gift)
  category?: EventCategory;         // NEW: for filtering/display
}
```

### 5.5 Data Files After Migration

| File | Records | Notes |
|---|---|---|
| `categories.ts` | 6 CategoryMeta | One per event category |
| `packages.ts` | 18–24 ExperiencePackage | 3–4 per category |
| `tiers.ts` | 3 ServiceTierBase | One Time, Yearly, Gift — updated names, prices, perks |
| `testimonials.ts` | 7 Testimonial | Span all three tier types |
| `team.ts` | 5 TeamMember | Updated titles/bios for party platform |
| `navigation.ts` | 6 NavLink | Updated labels |
| `awards.ts` | 6 PressAward | Minor updates for broader event press |

### 5.6 Migration Path

**Strategy:** Additive migration. New types coexist with old types during transition. No runtime migration needed (static data).

| Phase | Action |
|---|---|
| Phase 1 | Add `ServiceTierBase`, `OneTimeEvent`, `YearlySubscription`, `GiftPurchase` types to `types.ts`. Update `tiers.ts` data to One Time / Yearly / Gift. Create `categories.ts` and `packages.ts`. Update copy in testimonials, team, navigation, awards. |
| Phase 2 | Remove old content types (old category/location types). All data flows through new types. |
| Phase 3 | Update ConciergeForm with tier-aware progressive disclosure (see §6). |
| Phase 4 | Replace old section components with ExperiencePortfolio and FeaturedPackages. Update page composition. |

---

## 6. Consultation Flow

The architecture spike (#210, §2) documents that the three tier types require **three distinct consultation funnels** after the initial tier selection. This section specifies the form fields and UX patterns.

### 6.1 Shared Base Fields (All Tiers)

| Field | Type | Required |
|---|---|---|
| Name | text input | Yes |
| Email | email input | Yes |
| Tier selection | card selector | Yes — user picks One Time, Yearly, or Gift |

**Progressive disclosure:** The base form shows these 3 fields. After tier selection, tier-specific fields are revealed. This matches the `showDetails` + `selectedTier` pattern already in ConciergeForm — we extend it, not replace it.

### 6.2 One Time: Event Brief Flow

After selecting the One Time tier, reveal:

| Field | Type | Notes |
|---|---|---|
| Event type | select dropdown | Maps to EventCategory. Options: Gala, Celebration, Children's, Corporate, Production, Bespoke |
| Target date | date input | When the event should happen |
| Guest count | number input (default: 50) | Drives staffing and venue sizing |
| Venue preference | text input | Free text. Placeholder: "A rooftop, a warehouse, your backyard, or 'surprise me'" |
| Budget range | radio select | "$250K–$500K," "$500K–$1M," "$1M+," "Let's discuss" |
| Special requirements | textarea (500 char) | Dietary, accessibility, entertainment preferences |

**Flow after submit:** Inquiry → single consultation call → contract + deposit → planning → execution → completion.

### 6.3 Yearly: Subscription Onboarding

After selecting the Yearly tier, reveal:

| Field | Type | Notes |
|---|---|---|
| Family size | number input | Total family members |
| Children's ages | text input | Comma-separated ages. Drives event appropriateness. |
| Important annual dates | textarea | Birthdays, anniversaries, holidays to plan around |
| Interests | multi-select | Children's current interests (science, adventure, arts, sports, animals) |
| Dietary/allergy notes | textarea | Applies across all family events |
| Preferred event scale | select | "Intimate family," "Extended family," "Friends included" |

**Flow after submit:** Family needs assessment → subscription agreement → ongoing planning calendar (12 events/year) → quarterly check-ins.

### 6.4 Gift: Two-Party Intake

After selecting the Gift tier, reveal:

| Field | Type | Notes |
|---|---|---|
| Recipient name | text input | Who receives the gift |
| Recipient email | email input | For gift code delivery |
| Occasion | text input | "Birthday," "Retirement," "Just because," etc. |
| Delivery method | select | Physical card, digital reveal, surprise in-person |
| Personal message | textarea (300 char) | Included with the gift presentation |
| Surprise preference | checkbox | "Don't tell them who it's from" |

**Flow after submit:** Purchase confirmation → gift presentation designed → gift delivered to recipient → recipient activates with gift code → recipient enters One Time flow.

**Why the Gift tier converts to One Time on redemption:** Once a recipient activates, they need the same consultation flow as a One Time client (event type, date, guests, etc.). Creating a separate "gift event" flow would duplicate logic. Instead, redemption creates a `OneTimeEvent` booking linked to the gift record. See architecture spike §4 for the full data flow diagram.

### 6.5 Form UX: Progressive Disclosure Pattern

```
Base fields (all tiers):  Name, Email, Tier Selection
  ├─ one-time:  eventType, targetDate, guestCount, venuePreference, budget, specialRequirements
  ├─ yearly:    familySize, childrenAges, annualDates, interests, dietaryNotes, preferredScale
  └─ gift:      recipientName, recipientEmail, occasion, deliveryMethod, personalMessage, surprise
```

**Why progressive disclosure?** It keeps the initial form approachable (3 fields), then expands based on the user's tier choice. This is a real UX pattern learners should see — and it avoids the "wall of fields" anti-pattern. The architecture spike recommends this exact approach: "Don't build three separate forms. Use progressive disclosure."

**Conditional behaviors:**
- Gift tier: if "surprise" is checked, hide the "personal message" field (message goes to buyer confirmation only)
- Yearly tier: if any child is under 5, show an additional "infant considerations" note
- One Time tier: if event type = "Children's," show a safety considerations field

---

## 7. Design System Impact

### 7.1 What Stays in `.impeccable.md`

- Full color palette (ivory, champagne gold, deep navy, warm brown, beige variants)
- Typography system (Space Grotesk + Inter, fluid scale)
- All 5 design principles
- Corner radius hierarchy (Decision #3)
- SVG icon system approach (monoline, 24×24, currentColor)
- Anti-references list
- Aesthetic direction (light credibility-first, luxury editorial)

### 7.2 What Needs Updating in `.impeccable.md`

| Section | Change |
|---|---|
| **Users** | Update to "affluent individuals and families seeking extraordinary event production." Add: "They compare against luxury event planners, bespoke production companies, and high-end party designers." |
| **Brand Personality context** | Update job description: "The job is to convert high-intent visitors into event design consultations across three distinct service tiers." |
| **References** | Add event production references: "Meow Wolf (immersive scale), Sleep No More (theatrical production), The Ritz-Carlton (service standard)" |
| **Anti-references** | Add: "Generic event planning sites, children's party template sites, corporate retreat brochures" |
| **Service tier language** | Replace any "privilege hierarchy" or level-based language with three-transaction-type framing |

### 7.3 New Section Patterns Needed

**Tier card pattern (critical — differs from typical pricing tables):**
- Three cards, but each communicates a **different kind of engagement**, not a "good/better/best" hierarchy
- Visual differentiation: One Time gets event imagery, Yearly gets calendar/family imagery, Gift gets wrapping/surprise imagery
- Each card's CTA is unique (§4.7) because each leads to a different consultation funnel
- Price display differs: "$500,000" (flat), "$1,200,000/yr" (subscription indicator), "$250,000" (gift framing)

**ExperiencePortfolio pattern:**
- Category card grid (2 columns on desktop, 1 on mobile)
- Each card: full-bleed image, category title overlay, 2–3 sample event titles, "Explore →" link
- Hover: subtle parallax shift on image, event titles fade in
- Follows editorial hierarchy principle — cards should NOT all be the same height

**FeaturedPackages pattern:**
- Horizontal scroll / carousel of 6–8 featured event packages
- Each card: image, title, category pill, price, duration, guest range
- Should feel like "editorial picks" — not a product grid
- First card larger than rest (magazine spread feel)

---

## 8. Implementation Phases

### Phase 1: Brand/Copy/Data Updates (Content Swap, No New Components)
**Estimated scope:** 2–3 PRs

- [ ] Add discriminated union types to `types.ts` (ServiceTierBase, OneTimeEvent, YearlySubscription, GiftPurchase)
- [ ] Update `tiers.ts` — replace old tier data with One Time / Yearly / Gift (names, prices, perks)
- [ ] Create `categories.ts` (6 EventCategory records) and `packages.ts` (18–24 event packages)
- [ ] Update copy in: `testimonials.ts`, `team.ts`, `navigation.ts`, `awards.ts`
- [ ] Update inline copy: Hero headline/subhead, WhyAurora proof points, FAQ content, CTA text
- [ ] Update `.impeccable.md` per §7.2
- [ ] Run existing test suite — fix any broken assertions due to copy/data changes

**Definition of done:** All existing tests pass. Site renders with new tier names, prices, and copy. No new components yet.

### Phase 2: Data Model Migration (Remove Old Types)
**Estimated scope:** 1–2 PRs

- [ ] Remove old content type interfaces from `types.ts`
- [ ] Remove or replace deprecated data files
- [ ] Update all component imports to use new types
- [ ] Update/add unit tests for new data structures

**Definition of done:** All data flows through new types. No references to old type names in codebase.

### Phase 3: Consultation Flow — Tier-Aware Progressive Disclosure
**Estimated scope:** 1–2 PRs

- [ ] Update ConciergeForm: base fields (name, email, tier selection) → tier-specific fieldsets
- [ ] Implement One Time fields per §6.2
- [ ] Implement Yearly fields per §6.3
- [ ] Implement Gift fields per §6.4
- [ ] Add conditional field behaviors per §6.5
- [ ] Update form validation for each tier path
- [ ] Update ConciergeForm unit tests and e2e tests

**Definition of done:** Form captures tier-specific data. Each tier funnel works end-to-end. Tier pre-fill from card CTA still works.

### Phase 4: New Section Patterns
**Estimated scope:** 2–3 PRs

- [ ] Build updated Tiers component with three-transaction-type cards (§7.3)
- [ ] Build ExperiencePortfolio component (category-driven event grid)
- [ ] Build FeaturedPackages component (editorial event highlights)
- [ ] Update `page.tsx` section composition
- [ ] Update ScrollNav section targets
- [ ] Update Hero discovery row (category + scale selectors)
- [ ] Add unit tests for new components
- [ ] Update e2e tests for new page structure

**Definition of done:** Full new IA live. All 4 phases complete. Test suite green.

### Cross-Phase Concerns

- **Test updates:** Each phase must leave the test suite green. Data changes in Phase 1 will break snapshot-style assertions — update them in the same PR.
- **Accessibility:** New components must meet WCAG AA. Form changes need keyboard navigation and screen reader support.
- **Git strategy:** One feature branch per phase. Each phase merges to `main` independently. Phases are ordered but not blocking — Phase 3 can begin before Phase 2 merges if types are stable.
- **Architecture spike alignment:** Every data model and flow decision in this spec must be traceable to the architecture spike (#210). If this spec and the spike disagree, the spike wins — update this spec.

---

## 9. Teaching Notes

### 9.1 Production Patterns This Spec Demonstrates

1. **Brand pivot as a spec-first process.** In production, you don't start coding a rebrand — you write down exactly what changes and what doesn't. This spec is the artifact that a team would review before any PR is opened.

2. **Three transaction types, not three privilege levels.** The most important conceptual shift. Learners should understand why a discriminated union (`ServiceTier = OneTimeEvent | YearlySubscription | GiftPurchase`) is the right pattern when your "tiers" are fundamentally different products. A simple `{ tier: 'gold' | 'platinum' | 'diamond' }` enum works for privilege hierarchies; it doesn't work here.

3. **Additive data model migration.** New types coexist with old types during transition. No "big bang" rewrite. Each phase ships independently. This is how real teams migrate schemas without breaking production.

4. **Progressive disclosure in forms.** The consultation flow in §6 shows how to gather complex, tier-specific input without overwhelming users. The base form is 3 fields; tier selection reveals the right fieldset. This is a real UX pattern worth learning.

5. **Gift tier as a two-party system.** The Gift tier introduces a buyer ≠ recipient model. Learners see how this affects data shapes (two ContactInfo objects), API design (separate purchase and redemption endpoints), and UX (two distinct flows for buyer and recipient). This is a pattern that appears in real e-commerce (gift cards, corporate gifting, registry systems).

6. **Spec-to-spike traceability.** This spec references the architecture spike (#210) for every data model and API decision. Learners see how specs layer: the spike defines *what* the architecture is; this spec defines *how the brand presents it*.

### 9.2 What Learners Should Pay Attention To

- **Types first, components second.** Phase 1–2 nail the data model before Phase 3–4 touch components. This prevents rework.
- **The discriminated union pattern.** `ServiceTier = OneTimeEvent | YearlySubscription | GiftPurchase` is the backbone. Every component that renders tier data should `switch` on `tierType`. See architecture spike §1.
- **Three distinct consultation funnels.** The ConciergeForm doesn't just swap labels — it shows entirely different fields per tier. This is progressive disclosure driven by a discriminant, not just a "show more" toggle.
- **Gift redemption converts to One Time.** When a gift recipient activates, they enter the One Time flow. No "gift event" special case downstream. Simplicity through conversion, not duplication.
- **Test strategy per phase.** Each phase defines its own "done" criteria. Tests are updated in the same PR as the code they test — never deferred.

### 9.3 Common Pitfalls This Spec Avoids

| Pitfall | How This Spec Avoids It |
|---|---|
| Treating tiers as privilege levels | Three distinct transaction types with different data shapes, not "good/better/best" |
| "Rewrite everything at once" | Four independent phases. Each ships on its own. |
| Changing the design system during a content pivot | Visual identity is explicitly frozen (§7.1). Only content, copy, and data types change. |
| Vague data model ("we'll figure it out") | Full TypeScript discriminated union with field-level documentation (§5.1, architecture spike §1). |
| Single form for three different products | Tier-aware progressive disclosure — each tier gets its own fieldset (§6.2–6.4). |
| Breaking tests with data changes | Phase 1 explicitly calls out test updates as part of the deliverable. |
| Losing the teaching angle | Teaching notes are a first-class section, not an afterthought. |
| Spec contradicts architecture spike | Explicit traceability: "If this spec and the spike disagree, the spike wins." |

---

## Appendix A: API Shape (from Architecture Spike)

These are the API endpoints recommended in the architecture spike (#210, §3). Reproduced here for reference — the full rationale lives in the spike.

```
POST /api/bookings/one-time     → Create one-time event inquiry
POST /api/bookings/yearly       → Start subscription onboarding
POST /api/bookings/gift         → Purchase gift (buyer flow)
POST /api/bookings/gift/redeem  → Activate gift (recipient flow)

GET  /api/bookings/:id          → Booking status (any tier type)
GET  /api/bookings/:id/timeline → Event/subscription timeline

POST /api/gift/validate-recipient  → Check recipient email isn't already active
GET  /api/gift/:code               → Gift status lookup (recipient-facing)
POST /api/gift/:code/activate      → Recipient claims the gift
```

**Why separate POST endpoints?** Request bodies are different shapes per tier. Validation rules differ. Separate endpoints keep things clean and give learners a real example of RESTful resource modeling.

---

## Appendix B: File Impact Summary

| File | Phase | Change Type |
|---|---|---|
| `apps/web/app/lib/types.ts` | 1, 2 | Add discriminated union types (P1), remove old types (P2) |
| `apps/web/app/data/categories.ts` | 1 | NEW file — 6 EventCategory records |
| `apps/web/app/data/packages.ts` | 1 | NEW file — 18–24 ExperiencePackage records |
| `apps/web/app/data/tiers.ts` | 1 | Rewritten — One Time / Yearly / Gift with new prices and perks |
| `apps/web/app/data/testimonials.ts` | 1 | Updated copy + tierType/category fields |
| `apps/web/app/data/team.ts` | 1 | Updated titles/bios for event platform |
| `apps/web/app/data/navigation.ts` | 1 | Updated labels |
| `apps/web/app/data/awards.ts` | 1 | Minor updates |
| `apps/web/app/components/Hero.tsx` | 1, 4 | Copy update (P1), discovery row (P4) |
| `apps/web/app/components/WhyAurora.tsx` | 1 | Updated proof point copy |
| `apps/web/app/components/FAQ.tsx` | 1 | Updated FAQ data |
| `apps/web/app/components/Tiers.tsx` | 1, 4 | Updated tier data (P1), three-type card redesign (P4) |
| `apps/web/app/components/Testimonials.tsx` | 1 | Updated testimonial data |
| `apps/web/app/components/Interstitial.tsx` | 1 | Updated copy |
| `apps/web/app/components/Footer.tsx` | 1 | Updated CTA copy |
| `apps/web/app/components/ConciergeForm.tsx` | 3 | Tier-aware progressive disclosure, three fieldsets |
| `apps/web/app/components/ExperiencePortfolio.tsx` | 4 | NEW component — event category grid |
| `apps/web/app/components/FeaturedPackages.tsx` | 4 | NEW component — editorial event highlights |
| `apps/web/app/page.tsx` | 4 | Section composition update |
| `apps/web/app/components/ScrollNav.tsx` | 4 | Section targets update |
| `.impeccable.md` | 1 | Updated per §7.2 |
| Tests (multiple) | 1–4 | Updated per phase |

---

*This is a teaching site. Every decision in this spec was chosen because it's a pattern worth learning, not because it's the only way. The three-tier transaction model, discriminated unions, progressive disclosure, and two-party gift flow are all production patterns that appear in real systems. Simpler alternatives exist; these patterns earn their complexity.*
