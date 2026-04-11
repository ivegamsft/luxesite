# Documentation & Content Rules Specification

> **Issue:** #183  
> **Author:** Morpheus (Lead/Architect)  
> **Status:** In Progress  
> **Date:** 2026-04-11  
> **Scope:** Documentation standards and content governance for post-pivot Aurora Luxe

---

## 1. Executive Summary

This specification defines how Aurora Luxe documentation, code comments, and authored content should be structured, voiced, and validated after the brand pivot from luxury travel to luxury experiential events (see `spec/brand-pivot.md`).

The goal is to ensure:
- **Consistency** across README, specs, code, and marketing copy
- **Teaching clarity** — code should explain WHY decisions were made, not just WHAT they do
- **Credible fictionality** — content is imaginative but grounded, never AI-slop or absurd
- **Guardrails** for contributors so future updates maintain brand voice

This is a teaching site. Every piece of documentation and code serves two audiences: end users and learners building similar projects.

---

## 2. README & Top-Level Documentation

### 2.1 Root README.md Structure (Updated)

The root README.md (in `luxesite/`) should include:

1. **Project Title & Tagline**
   - "Aurora Luxe — Architects of the Extraordinary"
   - Subtitle: "A teaching project demonstrating production-grade patterns in a luxury experiential events brand"

2. **"What This Is" Section (NEW)**
   - Explicit statement: "This is a fictional brand created for teaching purposes"
   - Frame: "Every detail — from form validation to testimonial attribution to pricing — models real production code. The brand and experiences are entirely made up."
   - Why this matters: "Learners see how a coherent codebase handles a complete business pivot without touching infrastructure"

3. **Brand Context & Pivot Summary**
   - One paragraph: Aurora Luxe designs extraordinary bespoke experiences across six categories (Voyages, Celebrations, Adventures, Productions, Junior, Bespoke)
   - Link to `spec/brand-pivot.md` for full details
   - Visual identity section (unchanged: warm ivory, champagne gold, editorial restraint)

4. **Technology Stack** (unchanged section, verify accuracy)
   - Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion
   - Static data (no backend/API integration)
   - Testing: Jest + Playwright (with examples)

5. **Project Structure**
   - Keep monorepo layout clear: root ← specs & team docs, `apps/web/` ← Next.js app
   - Update directory descriptions to reference "teaching site" purpose
   - Example structure comment: "Non-code dirs at root stay clean; source code lives in `apps/web/`"

6. **Getting Started** (update with pivot context)
   - Dev/prod/test commands unchanged
   - **New subsection:** "Understanding the Brand"
     - Link to `spec/brand-pivot.md`
     - One-line summary of each experience category

7. **Page Sections** (update descriptions for experiential framing)
   - Replace travel-centric section descriptions with experience-centric language
   - Example: "Destination Grid" → "Experience Portfolio" (category-driven browsing)

8. **Code Structure & Philosophy (NEW)**
   - Components are test-collocated; mock data lives in `data/`
   - Types are consolidated in `lib/types.ts`; add TypeScript teaching notes
   - Why: "Learners can modify or extend data without touching infrastructure"

9. **Contributing & Content Rules**
   - Link to this spec (documentation-update.md) and `spec/content-rules.md` (TBD)
   - Tone checklist: professional, luxurious, intentionally fictional, coherent voice
   - Never real people, brands, or locations that could confuse users

10. **Accessibility & Design System (condensed)**
    - WCAG 2.1 AA; reduced motion respected; touch targets ≥ 44×44px
    - Typography: Space Grotesk (headings), Inter (body)
    - Color system: OKLCH basis, glassmorphic surfaces, aurora palette

11. **Squad Team & Maintenance**
    - Link to `.squad/team.md` and `.squad/decisions.md`
    - Frame: "This project is maintained as a teaching artifact by the Squad"

---

### 2.2 App-Level README (`apps/web/README.md`)

Create a focused README at `apps/web/README.md`:

1. **Purpose**
   - "The Next.js web application for Aurora Luxe. Single-page marketing site + consultation flow."

2. **Project Setup**
   - Quick install/dev/build commands
   - Note: "Must run from `apps/web/` directory"
   - Testing commands with examples

3. **File Structure Within `app/`**
   - `components/` — UI components organized by section (Hero, ExperiencePortfolio, etc.)
   - `data/` — Mock data files (experiences.ts, testimonials.ts, etc.)
   - `lib/` — Type definitions, utilities, hooks
   - `__tests__/` — Component tests, collocated with sources

4. **Data Format & Extensibility (Teaching Focus)**
   - Explain the data schema briefly (types.ts)
   - Show example of adding a new experience category
   - Frame: "Mock data is intentionally simple so learners can modify it"

5. **Key Components (Learning Guide)**
   - Brief description of each major section component
   - Why certain patterns were chosen (e.g., test colocation, Framer Motion for scroll reveals)
   - Teaching notes: where learners typically customize code

6. **Form Validation & Concierge Flow**
   - Schema for contact form (post-pivot)
   - What fields are required vs. optional
   - Note on progressive disclosure in form (shown based on experience type)

---

## 3. Content Rules & Guardrails

### 3.1 Voice & Tone Standards

Create `spec/content-rules.md` (NEW) with these sections:

#### 3.1.1 Core Tone

**Target voice:** Luxurious, imaginative, professional, intentionally fictional.

| Dimension | DO | DON'T |
|-----------|----|----|
| **Luxury register** | "Bespoke production," "white-glove execution," "intimate gathering" | "Super awesome," "pretty cool," "budget-friendly" |
| **Fictionality signal** | "Custom-built," "designed from scratch," "imaginative scale" | Claim real partnerships (unless actually real); use real celebrity names casually |
| **Narrative framing** | Each experience tells a story arc (concept → execution → memory) | Generic marketing babble; random adjectives; AI-filler language |
| **Professional-playful balance** | Playfulness in kid/celebration contexts, restraint in main copy | Meme language; forced casualness; winking at the audience constantly |
| **Detail-driven** | "42 guests, three-course dog menu, Vogue photographer" | "Absolutely epic," "literally the best," vague superlatives |

#### 3.1.2 Believability Guardrails

These constraints prevent content from feeling absurd or AI-generated:

1. **Price anchoring:** Prices should feel proportional to scope.
   - Example ✅: "From $3,500" for a kids' backyard build
   - Example ✅: "From $25,000" for a city-scale film production
   - Example ❌: "$50" for a wedding or "$5M" for a backyard party

2. **Real-world feasibility:** Experiences should feel possible, even if aspirational.
   - Example ✅: "Supervised backyard zip-line build" (real, feasible, luxury-framed)
   - Example ✅: "Maldives overwater villa escape" (standard luxury travel, elevated)
   - Example ❌: "Teleportation experience," "time travel simulation," "visit alternate dimensions"

3. **Locational plausibility:** Venues and locations should either be real OR clearly fictional.
   - Use real cities: Monaco, Aspen, Dubai, Tokyo, Venice, Stockholm
   - Use real natural sites: Maldives, Patagonia, Antarctic, Seychelles
   - If inventing: "Private Aurora island in the Seychelles" (clearly branded as ours)
   - Never: Misleading real-location naming to imply actual operations

4. **Testimonial authenticity:** Testimonials are from fictional people with realistic bios.
   - Format: Full name, role/background, experience type, quote
   - Examples: "Sophia Chen, CFO," "Marcus Laurent, Art Collector," "James Whitfield, Venture Capitalist"
   - Never: Use real celebrities, public figures, or people's actual professions

5. **Safety language for sensitive content:**
   - Kids' experiences: Always mention "DBS-checked staff," "age-appropriate risk assessment," "parental briefing," "supervision ratios"
   - Extreme adventures: "Licensed guides," "contingency protocols," "insurance," "on-site coordinators"
   - Never: Glorify risk; downplay safety; make it sound reckless

6. **Anti-AI-slop checklist:**
   - [ ] No adverbs stacked ("absolutely incredibly amazingly")
   - [ ] No false specificity ("up to 47 five-star amenities")
   - [ ] No tired luxury clichés ("curated," "hand-selected," "discerning")
   - [ ] No generic superlatives ("world-class," "best-in-breed," "unparalleled")
   - [ ] Sentences have clear subjects and active voice where possible
   - [ ] Copy doesn't sound like a marketing template

#### 3.1.3 Voice Examples

**✅ GOOD — Luxurious, narrative-driven, grounded:**
```
Production: "Rent a City — Your Weekend Film"
Description: "For a select group of cinematic dreamers, 
we shut down a city block — Stockholm's Gamla Stan, 
Tokyo's Shibuya Crossing, New Orleans' French Quarter — 
and produce a custom short film around your story. 
Cast, crew, permits, craft services. 
Your screenplay becomes a 72-hour production."

Emotional register: Wonder + precision. Feasible but spectacular.
```

**❌ BAD — Generic AI voice, vague, unsettling:**
```
Production: "Absolutely Epic Urban Cinema Experience"
Description: "Imagine having your own movie made in a magical 
city of your dreams! We'll make it super incredible with 
A-list production value and Hollywood vibes. Totally customizable. 
The experience of a lifetime, guaranteed."

Problems: Vague location; no specificity; false superlatives; 
"super incredible" + "vibes" = AI-slop; "guaranteed" is legally risky.
```

**✅ GOOD — Playful but credible, kids' category:**
```
Junior: "Backyard Space Station Build"
Description: "Your child and a team of engineers design and construct 
a working command center, observation deck, and control room 
in your backyard. By day three, they're running mission simulations. 
By night, they're stargazing from their own observatory platform. 
Licensed builders, age-appropriate engineering, parent briefing included."

Emotional register: Wonder + empowerment. Clearly real, clearly crafted.
```

---

### 3.2 Content Attribution & Data Sources

All content should follow these rules:

1. **Testimonials:**
   - Fictional people only; no real employees or clients
   - Realistic job titles / backgrounds (CFO, venture capitalist, photographer, chef, scientist)
   - Realistic-sounding names (no "Happybob" or "Lux Dreamstar")
   - Quote should match experience type and tier naturally

2. **Imagery & Media:**
   - Unsplash for photography (credited in code comments)
   - No images of real people presented as clients/staff
   - Monoline SVG icons for category illustrations
   - All images are licensed or created

3. **Press References (TrustBar section):**
   - Fictional publications (✅ "Luxury Travel Quarterly," "Experience Design Review")
   - Real publications (✅ "Wired," "The New York Times") — only if context is clearly aspirational/award-fictional
   - Mixed fictional + real is acceptable; just be consistent

4. **Award References:**
   - Fictional awards acceptable (✅ "Aurora Excellence in Bespoke Events")
   - Real award names avoided unless mockup is clearly humorous
   - Logo usage: Monochrome, no confusion with real brands

---

## 4. Code Documentation Standards

### 4.1 JSDoc/TSDoc Conventions

Use JSDoc for all public components, hooks, and functions. Focus on **WHY**, not WHAT:

#### 4.1.1 Component Documentation

```typescript
/**
 * ExperiencePortfolio — Category-driven experience browsing.
 * 
 * This component replaces the travel-specific DestinationGrid after the pivot.
 * Rather than geographic regions, users browse six experience categories,
 * each with sample packages and price anchors.
 * 
 * Why categories over destinations? Categories scale across new experience types
 * (celebrations, productions, junior events) without infrastructure changes.
 * Each card is a leaf in the taxonomy; clicking initiates consultation flow.
 * 
 * @component
 * @example
 * return <ExperiencePortfolio />
 */
export function ExperiencePortfolio() {
  // ...
}
```

#### 4.1.2 Utility/Hook Documentation

```typescript
/**
 * useScrollNav — Manage active section during scroll.
 * 
 * Why a custom hook? The ScrollNav component needs to know which section
 * is currently in viewport, but must update on scroll without re-rendering
 * the entire page. useScrollNav abstracts this logic so it's testable
 * and reusable if future sections need awareness of scroll state.
 * 
 * @returns { activeSection: string; isSticky: boolean }
 */
export function useScrollNav() {
  // ...
}
```

#### 4.1.3 Data & Type Documentation

```typescript
/**
 * ExperiencePackage type — The core data model after pivot.
 * 
 * Before pivot: destinations.ts held Destination[] (geographic).
 * After pivot: experiences.ts holds ExperiencePackage[] (activity-based).
 * 
 * Why this structure? Each package represents a complete, priced offering.
 * The `category` field enables filtering & discovery. The `narrative` field
 * reminds devs (and learners) that every experience is story-driven, not generic.
 * 
 * Related types: CategoryMeta (in lib/types.ts) defines category metadata.
 */
export interface ExperiencePackage {
  id: string;
  title: string;
  category: Category; // Voyages | Celebrations | Adventures | Productions | Junior | Bespoke
  narrative: string;  // Story arc of the experience
  description: string;
  priceRange: { min: number; max: number };
  images: string[];
  features: string[];
  capacity: { min: number; max: number };
  leadTime: string;   // "2 weeks" | "3 months" | "12 months"
}
```

### 4.2 Comment Philosophy

**Rule: Explain architectural decisions, not code flow.**

❌ **BAD** — explains WHAT the code does:
```typescript
// Loop through experiences and filter by category
const filtered = experiences.filter(exp => exp.category === selectedCategory);
```

✅ **GOOD** — explains WHY and the pattern:
```typescript
// Filter experiences by selected category. We do this client-side
// rather than server-fetch to keep the page interactive (no page reload).
// If this grows beyond 50 packages, consider pagination or a search backend.
const filtered = experiences.filter(exp => exp.category === selectedCategory);
```

**Guidance:**
- Comment on non-obvious choices (e.g., client-side filtering vs. server)
- Comment on technical debt or known limitations
- Comment on teaching moments (e.g., why we chose test colocation)
- Don't comment on obvious code (e.g., variable assignment, standard loop)
- Use line-length wisely; 80 chars for comment lines

### 4.3 README per Package/App

Each `apps/*/` directory should have its own README:

**`apps/web/README.md` sections:**
1. Purpose (what this app does)
2. Setup (dev/build/test)
3. File structure (brief)
4. Key components (learning-focused)
5. Data model (how to extend)
6. Testing strategy (jest + playwright setup)
7. Deployment (if applicable)

**`apps/api/README.md` (if added later):**
- Same structure, API-focused

---

## 5. Spec Directory Organization

Organize `spec/` for clarity and discoverability:

```
spec/
├── README.md                      — Index of all specs (NEW)
├── brand-pivot.md                 — Business pivot details (existing)
├── documentation-update.md        — This file (specs for docs)
├── content-rules.md               — Writing guidelines (NEW)
├── site.md                        — UI/UX reverse-engineered spec (existing, review)
├── luxurysite.md                  — (Archive or integrate)
└── /future                        — Placeholder for future specs
    └── (api-design.md, deployment.md, etc.)
```

**`spec/README.md` (NEW):**
```markdown
# Aurora Luxe Specification Index

Specifications define the "what" and "why" of the Aurora Luxe project.
Code and documentation implement the "how."

## Active Specifications

- **brand-pivot.md** — Business pivot from travel → experiences, content updates, data model
- **documentation-update.md** — Documentation standards and content governance
- **content-rules.md** — Voice, tone, and believability guardrails for writing
- **site.md** — UI/UX design reverse-engineered spec

## Legacy / Reference

- **luxurysite.md** — Previous iteration (retained for reference)

## Spec Philosophy

Specs are decision artifacts. They explain:
- The "why" behind structural choices
- Teaching opportunities
- Boundaries and guardrails (what's in scope, what's not)

Specs are NOT detailed implementation guides; the codebase is the source of truth for details.

## Adding New Specs

See .squad/decisions.md for the spec approval process.
```

---

## 6. Content Guardrails

### 6.1 What IS Acceptable

✅ **Acceptable content:**
- Luxury-framed experiences that are aspirational but feasible
- Fictional testimonials from realistic people
- Made-up pricing that scales with scope
- Imaginative event concepts (city shutdowns, private productions)
- Safety language for adventure/kids content
- Playful tone in celebration/junior contexts

### 6.2 What IS NOT Acceptable

❌ **Unacceptable content:**
- Real people presented as clients or team members (without permission)
- Misleading geographic or business claims (e.g., "operating in 50 countries" when we're a teaching site)
- Unsafe-sounding adventure copy (risk glorification without safety framing)
- Random absurdity (teleportation, magic, alternate dimensions)
- Generic AI marketing language (stacked adverbs, false specificity, clichés)
- Copyright infringement (music, art, IP)
- Off-brand vulgarity or political statements

### 6.3 Review Checklist for Content PRs

Before merging content changes:

- [ ] Testimonials use fictional names + realistic roles?
- [ ] Prices are proportional to scope?
- [ ] Geographic or partnership claims are clearly fictional?
- [ ] Safety language is present for adventure/kids content?
- [ ] No stacked adverbs, false specificity, or AI-slop patterns?
- [ ] Voice is consistent across sections?
- [ ] No real people/brands used without clear fictional framing?
- [ ] Images are licensed or created by team?
- [ ] Links to updated brand-pivot.md and content-rules.md where relevant?

---

## 7. Teaching Annotations

### 7.1 Marking Teaching Moments

Add `[TEACHING]` comments to code sections that illustrate important patterns:

```typescript
// [TEACHING] Test colocation: This test file lives next to the component
// it tests, not in a separate __tests__ directory. This pattern makes it
// obvious when a component is tested and easy to update tests alongside code changes.
import { render, screen } from '@testing-library/react';
import { ExperiencePortfolio } from '../ExperiencePortfolio';

describe('ExperiencePortfolio', () => {
  it('renders category cards', () => {
    // test body
  });
});
```

### 7.2 Teaching Notes in READMEs

Include learning context in code READMEs:

```markdown
### Test Strategy

We use Jest + React Testing Library for component tests, colocated 
in __tests__/ directories next to their components.

**Why colocation?** It makes the test-to-component relationship obvious 
and makes it harder to ship untested code. Learners can see immediately 
which components are tested and modify tests as they learn.

**Example learning task:** Add a new experience category, then add a test 
that verifies it renders in the portfolio grid.
```

---

## 8. Implementation Checklist

Files that require documentation or content updates post-pivot:

### 8.1 Top-Level Documentation

- [ ] `README.md` — Update with pivot context, "what this is" section, teaching framing
- [ ] Create `spec/README.md` — Index of specs
- [ ] Create `spec/content-rules.md` — Voice and guardrails

### 8.2 App-Level Documentation

- [ ] Create `apps/web/README.md` — App-specific setup, structure, learnings
- [ ] Update `apps/web/app/README.md` (if exists) — Component structure post-pivot
- [ ] Review `apps/web/package.json` — Verify scripts and dependencies are documented

### 8.3 Code Documentation

- [ ] Add JSDoc to all public components (Hero, ExperiencePortfolio, FeaturedPackages, etc.)
- [ ] Add JSDoc to hooks (useScrollNav, etc.)
- [ ] Add JSDoc to data types (ExperiencePackage, CategoryMeta, etc.)
- [ ] Review existing comments; update for architecture rationale
- [ ] Add `[TEACHING]` annotations to key patterns

### 8.4 Data & Content

- [ ] `apps/web/app/data/experiences.ts` — Verify pivot-aligned data structure and content
- [ ] `apps/web/app/data/testimonials.ts` — Verify fictional attribution and voice alignment
- [ ] `apps/web/app/data/tiers.ts` — Verify updated perk language (experience-framed, not travel)
- [ ] `apps/web/app/data/navigation.ts` — Update nav labels ("Destinations" → "Experiences," etc.)

### 8.5 Forms & Validation

- [ ] Review `apps/web/app/components/ConciergeForm.tsx` — Verify expanded fields match pivot
- [ ] Ensure validation messages use updated voice
- [ ] Success copy aligns with experiential framing

### 8.6 Type Definitions

- [ ] `apps/web/app/lib/types.ts` — Verify ExperiencePackage + CategoryMeta types are documented
- [ ] Consider adding `docstring` fields for learning annotations

### 8.7 Test Documentation

- [ ] Add README section in `apps/web/app/components/__tests__/` explaining test strategy
- [ ] Ensure test files have [TEACHING] comments where appropriate

### 8.8 Spec Directory

- [ ] Review all files in `spec/` for accuracy post-pivot
- [ ] Archive or integrate `luxurysite.md`
- [ ] Create `spec/README.md` index

---

## 9. Maintenance & Evolution

### 9.1 Updating Documentation

When content changes (new experience, testimonial update, price adjustment):
1. Update relevant data file in `apps/web/app/data/`
2. Verify it aligns with content-rules.md voice guidelines
3. Update README or spec if architecture changed
4. Link to this spec in PR description

### 9.2 Onboarding New Contributors

New team members should:
1. Read root README.md (especially "What This Is" section)
2. Read spec/brand-pivot.md (2 min skim, 15 min deep read)
3. Read spec/content-rules.md (10 min, reference during writing)
4. Read apps/web/README.md (5 min setup, 10 min structure overview)

### 9.3 Revision Process

Quarterly review:
- Are specs still accurate?
- Has voice drifted? Check content against content-rules.md
- Any teaching moments missed in comments?
- Update history.md in .squad/agents/morpheus/ with learnings

---

## 10. Appendix: Quick Reference

### Voice Checklist (Copywriter / PR Reviewer)

Before publishing content:

| Check | Examples |
|-------|----------|
| **Luxury register** | ✅ "bespoke," "white-glove" ❌ "super cool," "budget" |
| **Narrative framing** | ✅ "A story arc" ❌ Generic list of features |
| **Realistic pricing** | ✅ $25K for production ❌ $100 for wedding |
| **Fictional attribution** | ✅ "Sophia Chen, CFO" ❌ Real celebrity names |
| **Safety language** | ✅ "DBS-checked" for kids ❌ "Unsafe thrills" |
| **No AI-slop** | ✅ Clear subjects, active voice ❌ Stacked adverbs, false specificity |

### Documentation Checklist (Engineer / Spec Reviewer)

Before shipping code:

| Check | Status |
|-------|--------|
| Public components have JSDoc? | [ ] |
| Comments explain "why," not "what"? | [ ] |
| Data types documented? | [ ] |
| Teaching moments marked with `[TEACHING]`? | [ ] |
| README updated for pivot? | [ ] |
| Content aligns with content-rules.md? | [ ] |
| No real people/brands used without framing? | [ ] |

---

## 11. Version History

- **v1.0** (2026-04-11, Morpheus) — Initial spec for post-pivot documentation governance

