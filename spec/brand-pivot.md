# Brand Pivot Specification — Aurora Luxe

> **Issue:** #181  
> **Author:** Morpheus (Lead/Architect)  
> **Status:** Draft  
> **Date:** 2026-04-11  
> **Scope:** Specs only — no code changes

---

## 1. Executive Summary

Aurora Luxe is pivoting from a luxury travel concierge brand to a luxury experiential events brand. The company will be repositioned as a "luxury experience architect" — an outfit that designs and produces extraordinary, bespoke experiences across a much wider spectrum than international travel. Travel remains one category, but it now sits alongside futuristic adventures, premium celebrations, kids' engineering builds, cinematic productions, and high-concept bespoke events.

This pivot does **not** change the site's architecture (single-page Next.js), visual identity (warm light theme, champagne gold, editorial tone), or business model (tiered membership + concierge consultation). It changes **what Aurora Luxe sells** — from destinations to experiences — and therefore requires updates to content, data models, information architecture, and the consultation intake flow.

The pivot is a teaching opportunity. Learners will see how a real brand repositioning flows through every layer of a production app — from marketing copy to TypeScript interfaces to form validation — without touching infrastructure. It demonstrates that a well-architected codebase absorbs business pivots gracefully.

---

## 2. Brand Identity

### 2.1 New Positioning Statement

> **Aurora Luxe: Architects of the Extraordinary.**  
> We don't book trips. We design experiences that don't exist until you imagine them.

**Old positioning:** Ultra-premium concierge travel for UHNW individuals.  
**New positioning:** Ultra-premium bespoke experience design — from private-island retreats to city-scale cinematic weekends to supervised backyard adventure builds for kids. If it can be dreamed, we can produce it.

### 2.2 Brand Voice Guidelines

| Attribute | Before (Travel) | After (Experiences) |
|---|---|---|
| **Scope language** | "journeys," "destinations," "itineraries" | "experiences," "productions," "events" |
| **Expertise signal** | "travel curators," "destination specialists" | "experience architects," "production directors" |
| **Scale language** | "private villas," "seaplane transfers" | "private venues," "custom-built sets," "bespoke logistics" |
| **Emotional register** | Aspiration + wanderlust | Aspiration + wonder + imagination |

**Kept from current voice:**
- Commanding, discreet, bespoke personality
- No "curated," "discerning," "pinnacle" — ban list unchanged
- Fragmented, atmospheric copy style (see Decision #3, Hero Copy Direction)
- UHNW confidence without showiness

**Added to voice:**
- Playfulness where context allows (kids' events, pet celebrations)
- Narrative framing — each experience has a "story arc"
- Scale vocabulary — "intimate" (2–10 people) to "spectacular" (100+ people)

### 2.3 What Stays the Same

- **Visual identity:** Warm ivory base, champagne gold accent, deep navy hero/tiers/footer
- **Typography:** Space Grotesk headings, Inter body, fluid clamp() scale
- **Design principles:** Authority through restraint, warmth in light, editorial hierarchy, accessible luxury, memorable through craft
- **Brand name:** Aurora Luxe (no name change)
- **Business model:** Tiered membership (Silver / Black / Obsidian) + concierge consultation flow
- **Anti-references:** Generic AI sites, cruise brochures, SaaS landing pages
- **Technical stack:** Next.js, TypeScript, Tailwind CSS, Framer Motion, static data

### 2.4 What Changes

| Area | Current | New |
|---|---|---|
| Company descriptor | "Luxury Travel" | "Luxury Experiences" |
| Primary content unit | Destination | Experience Package |
| Category system | Travel regions (Indian Ocean, Europe…) | Experience categories (Adventures, Celebrations, Productions…) |
| Team titles | "Africa Specialist," "Asia & Pacific Specialist" | "Adventure Architect," "Celebration Director," etc. |
| Hero CTA | "Explore Destinations" | "Explore Experiences" |
| Social proof framing | Trip-based testimonials | Experience-based testimonials |
| FAQ scope | Travel logistics (flights, booking, cancellation) | Experience logistics (planning timelines, safety, venue, scale) |

---

## 3. Information Architecture

### 3.1 Current Sitemap (Single-Page Sections)

```
page.tsx (Home)
├── Hero              — "Journeys Written in Light" + destination/timing picker
├── TrustBar          — Press/award logos
├── WhyAurora         — 3-card editorial grid (why choose us)
├── DestinationGrid   — 14 travel destinations with pricing
├── ExperienceList    — 8 travel experience categories
├── Testimonials      — 7 travel-focused testimonials
├── Interstitial      — Breathing break / visual divider
├── Tiers             — Silver / Black / Obsidian membership
├── FAQ               — 8 travel-focused questions
└── ConciergeForm     — Name, email, dates, travelers, interests, budget, notes
```

**Navigation (current):** Destinations | Experiences | Our Team | Membership | Testimonials | Contact

### 3.2 New Sitemap (Post-Pivot)

```
page.tsx (Home)
├── Hero              — Updated headline/subhead + experience type/scale picker
├── TrustBar          — Updated press references (broader lifestyle press)
├── WhyAurora         — Updated proof points (experience breadth, not travel depth)
├── ExperiencePortfolio — NEW: Replaces DestinationGrid. Category-driven browsing.
├── FeaturedPackages   — NEW: Replaces ExperienceList. Curated highlight packages.
├── Testimonials       — Updated for experience variety
├── Interstitial       — Retained (copy update only)
├── Tiers              — Updated perks language (experiences, not trips)
├── FAQ                — Updated for experience scope
└── ConciergeForm      — Expanded with event type, audience, location, scale, safety fields
```

**Key structural changes:**
1. **DestinationGrid → ExperiencePortfolio** — Grid of experience categories (not geographic destinations). Each card shows a category with sample packages. Travel-inclusive experiences become one category among many.
2. **ExperienceList → FeaturedPackages** — Curated set of 6–8 flagship packages across categories. Replaces the region-based experience list.
3. **ConciergeForm** — Expanded fields for broader intake.

### 3.3 Updated Navigation

```
Experiences | Packages | Our Team | Membership | Testimonials | Contact
```

- "Destinations" → "Experiences" (points to ExperiencePortfolio)
- "Experiences" → "Packages" (points to FeaturedPackages)
- All other nav items retain targets

### 3.4 Category Taxonomy for Experience Types

Six top-level categories, each with 2–4 sub-types:

| Category | Description | Sub-types |
|---|---|---|
| **Voyages** | Travel-based luxury experiences | Private Island Escapes, Cultural Immersions, Expedition Adventures, Yacht Charters |
| **Celebrations** | Premium events for milestones | Weddings & Proposals, Milestone Birthdays, Anniversary Experiences, Pet Celebrations |
| **Adventures** | Boundary-pushing experiences | Futuristic/Fictional Narratives, Extreme Environment Expeditions, Survival Challenges, Space-Theme Productions |
| **Productions** | Cinematic/theatrical-scale events | City-Scale Film Weekends, Private Concert Productions, Immersive Theater, Documentary Experiences |
| **Junior** | Kid-focused builds and expeditions | Engineering Adventure Builds, Nature Expeditions, Science Camps, Creative Workshops |
| **Bespoke** | Fully custom, unclassifiable experiences | If you can describe it, we can produce it |

---

## 4. Content Strategy

### 4.1 Hero Section

**Current headline:** "Journeys Written in Light"  
**Current subhead:** "Private shores. Unmarked airstrips. Tables that don't take reservations."

**New headline options (pick one during implementation):**
1. "Experiences That Don't Exist Yet"
2. "We Build What You Imagine"
3. "Beyond the Itinerary"

**New subhead options:**
1. "A rented city. A dog's birthday on a private island. A trip to Mars — almost."
2. "Private productions. Impossible timelines. Events that rewrite the rules."
3. "From backyard adventure builds to city-scale spectacles. If you can dream it, we produce it."

**Recommendation:** Option 1 for headline, Option 1 for subhead. Maintains the fragmented atmospheric style from Decision #3 while signaling the broader scope.

**Hero discovery row update:**
- Replace "Where to?" destination dropdown with "What kind?" experience category selector
- Replace "When?" timing dropdown with "How many guests?" scale selector
- "Discuss with a specialist →" text unchanged

### 4.2 "Why Us" Proof Points

**Current (travel-focused):** Three cards about travel expertise, destination access, and concierge service.

**New proof points (3-card grid retained):**

| Card | Title | Supporting Copy |
|---|---|---|
| 1 | **Architects, Not Agents** | "We don't book — we build. Every experience is designed from scratch, with dedicated production teams, bespoke logistics, and white-glove execution." |
| 2 | **Every Scale, Every Scene** | "Intimate candlelit proposals. 500-guest spectacles. Supervised backyard builds for a six-year-old's birthday. The scale changes; the standard doesn't." |
| 3 | **Obsessive Safety & Detail** | "Behind every extraordinary moment is a meticulous operations plan. Licensed vendors, contingency protocols, and real-time coordination — invisible to you, essential to us." |

### 4.3 Experience Categories (ExperiencePortfolio Section)

Each category card displays: icon, title, description, 2–3 sample package titles, price range.

| Category | Sample Packages | Starting Price |
|---|---|---|
| **Voyages** | "Maldives Overwater Escape," "Patagonia Glacier Trek," "Tokyo After Dark" | From $7,400 |
| **Celebrations** | "The Royal Paw Gala" (luxury dog party), "Golden Anniversary: Venice," "Surprise Proposal: Santorini Cliffside" | From $5,000 |
| **Adventures** | "Mission to Mars: A Three-Day Narrative," "Antarctic Survival Weekend," "Volcano Rim Dining" | From $12,000 |
| **Productions** | "Rent-a-City: Your Weekend Film," "Private Beyoncé-Scale Concert for 50," "Murder Mystery: Your Estate" | From $25,000 |
| **Junior** | "Backyard Space Station Build," "Junior Paleontologist Expedition," "Robot Wars: Family Edition" | From $3,500 |
| **Bespoke** | "Tell us your dream. We'll tell you when it's ready." | By Consultation |

### 4.4 Package Tiers — Updated Language

Tier names (Silver, Black, Obsidian) and price points are **unchanged**. Perks language shifts from travel to experience framing:

**Silver — "Your Journey Begins" → "Your First Act"**
- Priority booking at partner venues and properties worldwide
- Complimentary VIP access at Aurora-partnered events
- Quarterly experience portfolio and trend intelligence
- 10% discount on all designed experiences
- Dedicated concierge hotline

**Black — "Elevated Beyond Limits" → "Main Stage"**
- Everything in Silver, plus:
- Personal experience architect who knows your preferences
- Complimentary venue upgrades at 500+ partner locations
- Access to private aviation booking with preferred rates
- Invitation-only Aurora showcase events in Monaco, Aspen, and Dubai
- Annual complimentary experience (valued at $15,000)
- 24/7 emergency production support anywhere in the world

**Obsidian — "The Rarest Circle" → "The Director's Cut"**
- Everything in Black, plus:
- Dedicated production team of three specialists
- Unlimited complimentary companion access for one guest
- Private experiences designed exclusively for you
- Helicopter transfers in major cities
- Annual bespoke production (valued at $50,000)
- Access to Aurora's private island in the Seychelles
- Lifetime membership after five consecutive years
- Your name etched in the Aurora Hall of Legends

### 4.5 Testimonials — Updated for Variety

Replace current 7 travel-only testimonials with 7 that span categories:

| Name | Experience Type | Key Quote Direction |
|---|---|---|
| Sophia Chen | Family Safari (Voyages) | Retained — travel testimonial still valid |
| Marcus Laurent | Private Venice event (Celebrations) | Shifted from "villa stay" to "anniversary production" |
| Aisha Rahman | Culinary trail (Voyages) | Retained with minor language shift |
| Henrik Bjørn | City-scale film weekend (Productions) | New: "They shut down three blocks of Stockholm for our anniversary film" |
| Olivia Martinez | Luxury dog celebration (Celebrations) | New: "Our golden retriever's birthday party had 40 guests, a three-course dog menu, and a photographer from Vogue" |
| James Whitfield | Kids' adventure build (Junior) | New: "They built a working zip line and fossil dig in our backyard for our son's 8th birthday" |
| Yuki Tanaka | Cultural immersion (Voyages) | Retained — already brand-aligned |

### 4.6 FAQ — Updated for Broader Scope

Replace 8 travel-focused FAQs with 8 experience-focused FAQs:

| ID | Question | Answer Direction |
|---|---|---|
| `process` | "How does the design process work?" | Consultation → concept brief → production plan → execution. Replaces "consultation process" travel version |
| `tiers` | "What's included in each membership tier?" | Updated perk descriptions (see §4.4). Structure unchanged |
| `lead-time` | "How far in advance should I plan?" | 2–4 weeks for intimate events, 3–6 months for productions, 12+ months for city-scale or travel-based |
| `modifications` | "Can I change the plan after booking?" | Retained — flexibility messaging applies broadly |
| `cancellation` | "What if I need to cancel?" | Retained — policy structure applies broadly |
| `safety` | "How do you handle safety and permits?" | NEW: Licensed vendors, insurance, local permits, contingency plans, on-site safety coordinators |
| `kids-safety` | "Are kids' experiences supervised?" | NEW: DBS/background-checked staff, age-appropriate risk assessment, parent briefing, 1:4 staff-child ratio |
| `budget` | "Is there a minimum budget?" | Updated: "Our experiences start at $3,500 for Junior packages and scale to whatever your imagination requires." |

### 4.7 CTA Language

| Location | Current | New |
|---|---|---|
| Hero primary | "Request Consultation" | "Design Your Experience" |
| Hero secondary | "Explore Destinations" | "Explore Experiences" |
| Hero discovery row | "Discuss with a specialist →" | "Talk to an architect →" |
| Tier cards | "Begin Your Journey" / "Enquire Now" | "Start Designing" / "Talk to Us" |
| Footer | "Book Your Consultation" | "Design Something Extraordinary" |
| Navbar CTA (if any) | "Contact" | "Start Here" |

---

## 5. Data Model

### 5.1 Current Model (Static .ts Files)

**File:** `apps/web/app/lib/types.ts`

```typescript
// Current interfaces
interface Destination {
  slug: string;        // URL-safe identifier
  name: string;        // Display name
  region: string;      // Geographic region
  tagline: string;     // Short descriptor
  price: number;       // Starting price (numeric)
  currency: string;    // Currency symbol
  imageUrl: string;    // Unsplash URL
  quickFacts: string[]; // 4 bullet points
}

interface Experience {
  id: string;          // Kebab-case identifier
  title: string;       // Category name
  description: string; // 2-sentence description
  icon: string;        // Icon key for SVG map
  regions: string[];   // Geographic regions
  imageUrl?: string;   // Optional hero image
}

interface MembershipTier { ... }  // Unchanged
interface Testimonial { ... }     // Minor field updates
interface TeamMember { ... }      // Title/bio updates
interface NavLink { ... }         // Label updates
interface TravelGuide { ... }     // Rename to ExperienceGuide
interface PressAward { ... }      // Unchanged
```

**Data files (current):**
- `destinations.ts` — 14 Destination records (travel locations)
- `experiences.ts` — 8 Experience records (travel categories)
- `tiers.ts` — 3 MembershipTier records
- `testimonials.ts` — 7 Testimonial records
- `team.ts` — 5 TeamMember records
- `navigation.ts` — 6 NavLink records
- `guides.ts` — 6 TravelGuide records
- `awards.ts` — 6 PressAward records

### 5.2 New ExperiencePackage Type

The new primary content unit. Replaces both `Destination` and `Experience`:

```typescript
/** A single bookable experience package */
export interface ExperiencePackage {
  /** URL-safe identifier (e.g., "mars-mission-narrative") */
  slug: string;

  /** Display title (e.g., "Mission to Mars: A Three-Day Narrative") */
  title: string;

  /** 1-2 sentence atmospheric description */
  tagline: string;

  /** Top-level category from the taxonomy */
  category: ExperienceCategory;

  /** Optional sub-category for filtering */
  subCategory?: string;

  /** Starting price in USD (numeric for sorting/filtering) */
  priceFrom: number;

  /** Price display string (e.g., "From $12,000" or "By Consultation") */
  priceDisplay: string;

  /** Hero image URL */
  imageUrl: string;

  /** 3-5 highlight bullet points */
  highlights: string[];

  /** Estimated duration (e.g., "3 days", "1 evening", "2 weekends") */
  duration: string;

  /** Guest count range (e.g., "2–10", "50–500", "1 very good dog") */
  guestRange: string;

  /** Location type */
  locationType: 'fixed' | 'flexible' | 'remote' | 'client-site';

  /** Location description (e.g., "Maldives", "Your backyard", "Any major city") */
  location: string;

  /** Age appropriateness */
  ageRange?: 'all-ages' | 'adults-only' | 'kids-focused' | 'family';

  /** Safety/logistics tier: how much operational planning is involved */
  complexity: 'intimate' | 'standard' | 'complex' | 'spectacular';

  /** Whether this package is currently featured on homepage */
  featured: boolean;

  /** Sort order within category */
  sortOrder: number;
}
```

### 5.3 Category Taxonomy Type

```typescript
/** Top-level experience categories */
export type ExperienceCategory =
  | 'voyages'
  | 'celebrations'
  | 'adventures'
  | 'productions'
  | 'junior'
  | 'bespoke';

/** Metadata for each category (used in ExperiencePortfolio section) */
export interface CategoryMeta {
  /** Category key */
  id: ExperienceCategory;

  /** Display name */
  label: string;

  /** 1-sentence category description */
  description: string;

  /** Icon key for SVG map */
  icon: string;

  /** Hero image for category card */
  imageUrl: string;

  /** Sub-category labels */
  subCategories: string[];

  /** Display order */
  sortOrder: number;
}
```

### 5.4 Supporting Type Updates

```typescript
/** Replaces TravelGuide */
export interface ExperienceGuide {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  imageUrl: string;
  link: string;
  author: string;
  category: ExperienceCategory;  // NEW: ties guide to a category
}

/** TeamMember — updated titles, no structural change */
export interface TeamMember {
  id: string;
  name: string;
  title: string;          // e.g., "Adventure Architect" instead of "Africa Specialist"
  bio: string;
  photoUrl: string;
  yearsExperience: number;
  specialties: string[];  // Now category-based, not region-based
}

/** Testimonial — add category tag */
export interface Testimonial {
  id: string;
  name: string;
  role: string;           // Now describes experience, not trip
  quote: string;
  location: string;
  date: string;
  avatar?: string;
  rating?: number;
  sourceLink?: string;
  category?: ExperienceCategory;  // NEW: for filtering/display
}
```

### 5.5 Migration Path

**Strategy:** Additive migration. New types are created alongside old ones. Old data files are replaced in Phase 1–2. No runtime migration needed (static data).

| Phase | Action |
|---|---|
| Phase 1 | Add new types to `types.ts`. Create `categories.ts` and `packages.ts` data files. Update text in existing data files (testimonials, tiers, FAQ, team, navigation). |
| Phase 2 | Remove `destinations.ts` — content absorbed into `packages.ts` with `category: 'voyages'`. Remove old `experiences.ts` — replaced by `categories.ts`. Rename `guides.ts` exports. |
| Phase 3 | Update ConciergeForm to use new category/scale fields. |
| Phase 4 | Replace DestinationGrid component with ExperiencePortfolio. Replace ExperienceList with FeaturedPackages. |

**New data files after migration:**
- `categories.ts` — 6 CategoryMeta records
- `packages.ts` — 18–24 ExperiencePackage records (3–4 per category)
- `tiers.ts` — 3 records (updated copy)
- `testimonials.ts` — 7 records (updated copy/categories)
- `team.ts` — 5 records (updated titles/bios)
- `navigation.ts` — 6 records (updated labels)
- `guides.ts` → `experience-guides.ts` — 6 records (updated)
- `awards.ts` — 6 records (minor updates to broader press)

---

## 6. Consultation Flow

### 6.1 Current Form Fields

From `ConciergeForm.tsx`:

| Field | Type | Required |
|---|---|---|
| Name | text input | Yes |
| Email | email input | Yes |
| Travel dates | text input | No (progressive disclosure) |
| Number of travelers | number input (default: 2) | No (progressive disclosure) |
| Interests | multi-select checkboxes (8 travel options) | No (progressive disclosure) |
| Budget | radio select (5 ranges) | No (progressive disclosure) |
| Notes | textarea (500 char max) | No (progressive disclosure) |

**Progressive disclosure:** Initial view shows Name + Email. "Tell us more" toggle reveals remaining fields.

### 6.2 New Form Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| Name | text input | Yes | Unchanged |
| Email | email input | Yes | Unchanged |
| **Experience type** | select dropdown | No | Maps to ExperienceCategory taxonomy. Options: Voyage, Celebration, Adventure, Production, Junior Experience, Bespoke / Not Sure |
| **Audience** | select dropdown | No | "Adults only," "Family with kids," "Corporate group," "Couple," "Solo," "Other" |
| **Guest count** | number input (default: 2) | No | Replaces "travelers" — broader language |
| **Preferred location** | text input with suggestions | No | Free text. Replaces fixed destination list. Placeholder: "A city, a country, or 'surprise me'" |
| **Preferred dates** | text input | No | Unchanged semantics, updated label to "When?" |
| **Scale** | select dropdown | No | "Intimate (2–10)," "Gathering (10–50)," "Event (50–200)," "Spectacular (200+)" |
| Budget | radio select | No | Updated ranges: "Under $5,000," "$5,000–$25,000," "$25,000–$100,000," "$100,000+," "Let's discuss" |
| **Safety considerations** | textarea (300 char max) | No | "Any allergies, mobility needs, age-specific requirements, or safety concerns?" |
| Notes | textarea (500 char max) | No | Unchanged |

### 6.3 Form UX: Progressive Disclosure & Conditional Fields

**Step 1 (always visible):** Name, Email, Experience Type  
**Step 2 (revealed on "Tell us more" or after selecting Experience Type):** Audience, Guest Count, Preferred Location, Preferred Dates  
**Step 3 (revealed on further expansion):** Scale, Budget, Safety Considerations, Notes

**Conditional logic:**
- If Experience Type = "Junior Experience" → show Safety Considerations immediately (Step 2)
- If Experience Type = "Production" or "Adventure" → show Scale immediately (Step 2)
- If Experience Type = "Bespoke" → collapse to Name, Email, Notes only ("Tell us everything")
- Guest count default adjusts: "Couple" audience → 2, "Family" → 4, "Corporate" → 20

**Tier pre-fill preserved:** When a user clicks "Start Designing" on a tier card, the form pre-fills budget and notes with tier context (existing CustomEvent pattern retained).

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
| **Users** | Update from "affluent travelers" to "affluent individuals seeking extraordinary experiences." Add: "They compare against luxury event planners, bespoke travel agencies, and high-end production companies." |
| **Brand Personality context** | Update "Single-page marketing site" job description. Add: "The job is to convert high-intent visitors into experience design consultations." |
| **References** | Add experiential luxury references alongside travel ones: "Meow Wolf (immersive scale), Sleep No More (theatrical production), The Ritz-Carlton (service standard)" |
| **Anti-references** | Add: "Generic event planning sites, children's party template sites, corporate retreat brochures" |
| All "travel" language | Search-and-replace "travel" → "experience" where contextually appropriate. Keep "travel" where it refers specifically to the Voyages category |

### 7.3 New Section Patterns Needed

**ExperiencePortfolio pattern:**
- Category card grid (2 columns on desktop, 1 on mobile)
- Each card: full-bleed image, category title overlay, 2–3 sample package titles, "Explore →" link
- Hover: subtle parallax shift on image, package titles fade in
- Follows editorial hierarchy principle — cards should NOT all be the same height

**FeaturedPackages pattern:**
- Horizontal scroll / carousel of 6–8 featured packages
- Each card: image, title, category pill, price, duration, guest range
- Should feel like "editorial picks" — not a product grid
- First card larger than rest (magazine spread feel)

---

## 8. Implementation Phases

### Phase 1: Brand/Copy/IA Changes (Content Swap, No New Features)
**Estimated scope:** 2–3 PRs

- [ ] Update `types.ts` — add new types alongside existing ones
- [ ] Create `categories.ts` and `packages.ts` data files
- [ ] Update copy in: `tiers.ts`, `testimonials.ts`, `team.ts`, `navigation.ts`, `awards.ts`
- [ ] Update inline copy: Hero headline/subhead, WhyAurora proof points, FAQ content, CTA text
- [ ] Update `.impeccable.md` per §7.2
- [ ] Update Interstitial copy
- [ ] Run existing test suite — fix any broken assertions due to copy changes

**Definition of done:** All existing tests pass. Site renders with new copy. No new components yet.

### Phase 2: Data Model Migration (Static .ts → New Types)
**Estimated scope:** 1–2 PRs

- [ ] Replace `destinations.ts` with content in `packages.ts` (voyages category)
- [ ] Replace `experiences.ts` with `categories.ts`
- [ ] Rename `guides.ts` → `experience-guides.ts`, update type
- [ ] Remove deprecated type aliases from `types.ts`
- [ ] Update all component imports
- [ ] Update/add unit tests for new data structures

**Definition of done:** Old `Destination` and `Experience` types fully removed. All data flows through new types.

### Phase 3: Consultation Flow Expansion
**Estimated scope:** 1–2 PRs

- [ ] Update ConciergeForm with new fields per §6.2
- [ ] Implement progressive disclosure logic per §6.3
- [ ] Add conditional field behavior
- [ ] Update form validation
- [ ] Update ConciergeForm unit tests
- [ ] Update e2e tests that interact with the form

**Definition of done:** Form captures experience type, audience, location, scale, budget, and safety. Tier pre-fill still works.

### Phase 4: New Section Patterns
**Estimated scope:** 2–3 PRs

- [ ] Build ExperiencePortfolio component (replaces DestinationGrid)
- [ ] Build FeaturedPackages component (replaces ExperienceList)
- [ ] Update `page.tsx` section composition
- [ ] Update ScrollNav section targets
- [ ] Update Hero discovery row (category + scale selectors)
- [ ] Add unit tests for new components
- [ ] Update e2e tests for new page structure

**Definition of done:** Full new IA live. All 4 phases complete. Test suite green.

### Cross-Phase Concerns

- **Test updates:** Each phase must leave the test suite green. Copy changes in Phase 1 will break snapshot-style assertions in Hero, FAQ, Tiers tests — update them.
- **Accessibility:** New components must meet WCAG AA. Dropdown selectors need keyboard navigation (existing `LuxeSelect` pattern from Hero can be reused).
- **Git strategy:** One feature branch per phase. Each phase merges to `main` independently. No cross-phase dependencies that block merging.

---

## 9. Teaching Notes

### 9.1 Production Patterns This Spec Demonstrates

1. **Brand pivot as a spec-first process.** In production, you don't start coding a rebrand — you write down exactly what changes and what doesn't. This spec is the artifact that a team would review before any PR is opened.

2. **Additive data model migration.** New types coexist with old types during transition. No "big bang" rewrite. Each phase ships independently. This is how real teams migrate schemas without downtime.

3. **Phased rollout.** Four phases, each independently mergeable. Phase 1 (copy) can ship while Phase 4 (new components) is still in development. This is CI/CD discipline in practice.

4. **Content strategy as a technical artifact.** The copy matrix in §4 isn't just marketing — it's the source of truth for what developers put in data files. Ambiguity in copy = bugs in implementation.

5. **Form design as progressive disclosure.** The consultation flow in §6 shows how to gather complex input without overwhelming users. Conditional fields based on experience type demonstrate real-world form UX patterns.

### 9.2 What Learners Should Pay Attention To

- **Types first, components second.** Phase 1–2 nail the data model before Phase 3–4 touch components. This prevents rework.
- **The migration path table (§5.5).** This is how you plan a data migration without losing data or breaking the site mid-transition.
- **What stays vs. what changes (§2.3 / §2.4).** A good pivot preserves more than it changes. The visual identity, architecture, and business model are untouched — only the content layer moves.
- **Test strategy per phase.** Each phase defines its own "done" criteria. Tests are updated in the same PR as the code they test — never deferred.

### 9.3 Common Pitfalls This Spec Avoids

| Pitfall | How This Spec Avoids It |
|---|---|
| "Rewrite everything at once" | Four independent phases. Each ships on its own. |
| Changing the design system during a content pivot | Visual identity is explicitly frozen (§7.1). Only copy and content references change. |
| Vague data model ("we'll figure it out") | Full TypeScript interfaces with field-level comments (§5.2–5.4). |
| Form fields without UX rationale | Progressive disclosure rules and conditional logic documented (§6.3). |
| Breaking tests with copy changes | Phase 1 explicitly calls out test updates as part of the deliverable. |
| Losing the teaching angle | Teaching notes are a first-class section, not an afterthought. |

---

## Appendix: File Impact Summary

| File | Phase | Change Type |
|---|---|---|
| `apps/web/app/lib/types.ts` | 1, 2 | Add new types (P1), remove old types (P2) |
| `apps/web/app/data/categories.ts` | 1 | NEW file |
| `apps/web/app/data/packages.ts` | 1 | NEW file |
| `apps/web/app/data/destinations.ts` | 2 | REMOVED |
| `apps/web/app/data/experiences.ts` | 2 | REMOVED |
| `apps/web/app/data/guides.ts` | 2 | RENAMED → `experience-guides.ts` |
| `apps/web/app/data/tiers.ts` | 1 | Updated copy |
| `apps/web/app/data/testimonials.ts` | 1 | Updated copy + category field |
| `apps/web/app/data/team.ts` | 1 | Updated titles/bios |
| `apps/web/app/data/navigation.ts` | 1 | Updated labels |
| `apps/web/app/data/awards.ts` | 1 | Minor updates |
| `apps/web/app/components/Hero.tsx` | 1, 4 | Copy update (P1), discovery row (P4) |
| `apps/web/app/components/WhyAurora.tsx` | 1 | Updated proof point copy |
| `apps/web/app/components/FAQ.tsx` | 1 | Updated FAQ data |
| `apps/web/app/components/Tiers.tsx` | 1 | Updated perk copy |
| `apps/web/app/components/Testimonials.tsx` | 1 | Updated testimonial data |
| `apps/web/app/components/Interstitial.tsx` | 1 | Updated copy |
| `apps/web/app/components/Footer.tsx` | 1 | Updated CTA copy |
| `apps/web/app/components/ConciergeForm.tsx` | 3 | Expanded fields, conditional logic |
| `apps/web/app/components/ExperiencePortfolio.tsx` | 4 | NEW component |
| `apps/web/app/components/FeaturedPackages.tsx` | 4 | NEW component |
| `apps/web/app/components/DestinationGrid.tsx` | 4 | REMOVED from page.tsx |
| `apps/web/app/components/ExperienceList.tsx` | 4 | REMOVED from page.tsx |
| `apps/web/app/page.tsx` | 4 | Section composition update |
| `apps/web/app/components/ScrollNav.tsx` | 4 | Section targets update |
| `.impeccable.md` | 1 | Updated per §7.2 |
| Tests (multiple) | 1–4 | Updated per phase |
