# Squad Decisions

## Active Decisions

### 1. Aurora Luxe Travel — Architecture Decisions
**Author:** Morpheus  
**Date:** 2024  
**Status:** Approved  

Production-ready, luxury travel website with futuristic aesthetic. Next.js 14+ App Router, TypeScript, Tailwind CSS, Framer Motion.

**Key Technical Points:**
- Project structure: `/app` with components, data, lib, destinations subdirs
- Styling: Tailwind CSS with custom aurora theme (cyan, purple, magenta, gold)
- Typography: Space Grotesk (headings), Inter (body) via next/font
- Images: Unsplash Source API with next/image optimization
- Animation: Framer Motion for scroll-triggered reveals
- Data: All mock data in `/app/data/*.ts` (no backend)
- State: Local React useState only (no global state needed)
- Responsive: Mobile-first with Tailwind breakpoints
- Testing: E2E and a11y focus, skip unit tests on static components
- Deployment: Vercel with GitHub Actions CI/CD

See `.squad/decisions/morpheus-architecture.md` for full details.

---

### 2. Colocate Tests with Components
**Author:** Morpheus  
**Date:** 2026-04-09  
**Status:** Implemented  

Component tests moved from `__tests__/components/` → `app/components/__tests__/`  
Mock files moved from `__mocks__/` → `app/__mocks__/`  
Config files (`jest.config.js`, `jest.setup.ts`) stay at root — standard tooling configs like `tsconfig.json`  

All 24 tests pass. Colocation keeps tests near the code they exercise. Root stays clean and config-only.

### 3. Design Polish — Kill AI Aesthetics
**Author:** Mouse  
**Date:** 2026-04-10  
**Status:** Implemented  

#### Decisions Made

**1. Corner Radius Hierarchy (replaces uniform rounded-2xl)**
- Cards/containers: `rounded-sm` — sharp, editorial authority
- Buttons: `rounded-lg` — medium, touchable
- Inputs: `rounded-lg` — matches buttons
- Pills/badges: `rounded-full` — only these get full rounding
- Rationale: Uniform `rounded-2xl` was the #1 AI aesthetic tell. Hierarchy creates visual intention.

**2. SVG Icon System for ExperienceList**
- Inline monoline SVGs replace emoji. 24×24 viewBox, `currentColor` stroke, 1.5px weight.
- Icons keyed by experience ID via `experienceIcons` map.
- Rationale: Emoji destroys premium credibility. Monoline SVGs read as editorial illustration.

**3. Hero Copy Direction**
- Subtext: "Private shores. Unmarked airstrips. Tables that don't take reservations."
- Fragmented, atmospheric, under 15 words. No "curated", "discerning", "pinnacle", "luxury".
- Rationale: The brand name says luxury. Copy should evoke, not describe.

**4. Price Display: Typographic, Not Badge**
- Destination prices shown in Bodoni Moda at reduced opacity. No gradient background, no pill.
- Rationale: SaaS pricing pills undermine editorial tone. The number speaks for itself.

**5. No Aurora Blob in Hero**
- Removed floating gradient blob. Added bottom vignette for text readability.
- Rationale: Blurred gradient circles are the most common AI hero element. Photography carries the mood.

**6. Section Intro Variety System**
- Each section uses a different heading/subtitle treatment. No two sections structurally identical.
- Rationale: Formulaic repetition reads as template. Editorial layout demands compositional variety.

**7. Branded Error Color**
- `aurora-error: oklch(0.65 0.20 25)` — warm bordeaux-adjacent red, not cold Tailwind red-400.
- Rationale: Every visible color should belong to the OKLCH brand system.

### 4. Frontend Quality Fixes — Trinity
**Author:** Trinity  
**Date:** 2026-04-10  
**Status:** Implemented  

#### Changes Made

**1. [P0] Testimonial nav dot touch targets — FIXED**
Dots were 12px (fails 44px WCAG). Wrapped each in a `min-w-[44px] min-h-[44px]` button with flex centering. Visual dot unchanged.

**2. [P0] "Most Popular" badge removed — FIXED**
SaaS copywriting deleted from Tiers.tsx. The animated-border on the featured tier is sufficient visual differentiation.

**3. [P1] @container queries added — IMPLEMENTED**
Added `@container` class to grid parents in DestinationGrid, ExperienceList, and Tiers. CSS `container-type: inline-size` declared in globals.css with `@container` rules for card padding, text sizing, and layout stacking at narrow widths.

**4. [P1] Mobile menu animation — IMPLEMENTED**
Navbar mobile menu now uses `AnimatePresence` + `motion.div` with slide-down animation (height 0→auto, opacity 0→1) using ease-out-quint easing. No more instant appear/disappear.

**5. [P1] useReducedMotion() wired — IMPLEMENTED**
All 6 Framer Motion components (AnimatedSection, Hero, Testimonials, DestinationGrid, ExperienceList, Tiers) now check `useReducedMotion()`. When true: initial===animate (no transition), parallax RAF skipped, carousel slide disabled, stagger disabled.

**6. [P1] Toast colors → OKLCH — FIXED**
ConciergeForm Toaster styles converted from `rgba(255,255,255,0.1)` / `#f0f0f5` to `oklch(0.95 0.01 85 / 0.1)` / `oklch(0.95 0.005 85)`. Maintains warm-tinted brand palette.

**7. [P1] Type scale trimmed — IMPLEMENTED**
Consolidated from 8 steps to 6 (sm, base, lg, xl, 2xl, 3xl). Removed `--fluid-4xl` and `--fluid-5xl`. The `--fluid-3xl` step now uses a wider clamp range (`2.441rem` → `6.5rem`) to cover hero/display use. Hero.tsx updated from `text-fluid-5xl` → `text-fluid-3xl`. Tailwind config and CSS utilities updated.

---

### 5. GitHub Issues Sweep — Mouse & Trinity
**Author:** Mouse, Trinity  
**Date:** 2026-04-10  
**Status:** Implemented  

#### Issue #1 — Animated Border (Removed Rotation)

**Decision:** Featured tier border now static, not rotating.

**Implementation:** Removed `@keyframes rotate` animation block and animation rule from `.animated-border::before` in `globals.css`.

**Rationale:** Continuous rotation violates "authority through restraint." The conic gradient (champagne gold → bordeaux → dusty rose → gold) is already a strong visual differentiator as a static border. Spinning draws the eye reflexively — the featured tier should command attention through presence, not movement. Luxury brands don't wave their arms.

**Impact:** Static border preserves visual hierarchy without animation overhead. Aligns with design philosophy of restraint.

---

#### Issue #2 — Currency EUR → USD

**Decision:** Global currency conversion from EUR (€) to USD ($).

**Implementation:**
- `tiers.ts`: Silver $25k, Black $75k, Obsidian $200k; perk "valued at $50,000"
- `destinations.ts`: All 6 destinations updated `currency: '€'` → `'$'`
- `ConciergeForm.tsx`: Budget dropdown options changed to USD

**Rationale:** Business decision to quote prices in USD for broader market appeal.

**Impact:** All price displays now consistent with USD branding.

---

#### Issue #3 — Destination Card Text Contrast (Dual-Scrim System)

**Decision:** Replace single gradient overlay with layered scrim system for robust text contrast on any background.

**Implementation:** Three-layer scrim in `DestinationGrid.tsx`:
1. Full vignette: `inset-0`, `from-aurora-dark/70 via-aurora-dark/20 to-transparent`
2. Bottom scrim: `h-1/2`, `from-aurora-dark/80 via-aurora-dark/40 to-transparent` — protects title, region, tagline
3. Top-right corner: `w-2/3 h-1/3`, `from-aurora-dark/60 to-transparent` — protects price text

Text opacity bumps:
- Price: `/60` → `/80` (WCAG AA against any background)
- Region: `/60` → `/70` (improved contrast on bright backgrounds)

All scrims use `pointer-events-none` to preserve interactions.

**Rationale:** Single-layer gradients distribute evenly across image height. On tall cards (featured 16:9) or bright imagery (Alpine snow, Dubai gold skyline), the gradient becomes too diffuse to protect text. Layered scrims deliver exact opacity per zone — standard technique in production media UI (Netflix, movie posters).

**Impact:** All destination card text now passes WCAG AA contrast. No visible UI chrome added — contrast purely typographic through invisible gradient layers.

---

#### Issue #4 — Budget Dropdown Readability + Form Input Class Typo

**Decision:** Solid-background select dropdowns (native browsers ignore transparency); fix form input class name errors.

**Implementation in `ConciergeForm.tsx`:**
- Select styling: Replaced `bg-aurora-glass` (transparent) with solid `bg-[oklch(0.15_0.015_50)]`
- Option styling: Added `[&>option]:bg-[oklch(0.15_0.015_50)] [&>option]:text-[oklch(0.95_0.012_85)]` for explicit option colors
- Class typo fix: `rounded-lgpx-4` → `rounded-lg px-4` across 5 inputs (name, email, travelDates, travelers, budget). Missing space caused both classes to silently fail.

**Rationale:** 
- Native `<select>` dropdowns don't support transparency or backdrop-blur on most browsers. Glass backgrounds are for CSS-controlled containers only.
- Missing space in class names produced `rounded-lgpx-4` — an invalid Tailwind class generating no CSS output.

**Impact:** Dropdown options now readable with solid backgrounds. Form inputs restored proper border-radius and padding.

---

#### Issue #8 — Submit Button Affordance & WCAG AA Contrast

**Decision:** Add interaction feedback and fix contrast failure on gradient background.

**Implementation in `ConciergeForm.tsx`:**
- Added `cursor-pointer` for interaction feedback
- Added `active:scale-[0.98]` for press-state scale feedback
- Changed `text-aurora-dark` → `text-aurora-white` (fixes contrast on gradient's bordeaux midpoint)
- Added `focus:ring-offset-2 focus:ring-offset-aurora-dark` for keyboard focus visibility

**Rationale:**
- Button on `bg-gradient-aurora` with dark text fails WCAG AA contrast at the gradient's darkest point (bordeaux, oklch L=0.42). Ratio only ~2.5:1, need 4.5:1 minimum.
- Light text (`text-aurora-white` at oklch L=0.95) passes 4.5:1 against all gradient stops.
- Press feedback and focus ring improve perceived affordance.

**Impact:** Button now fully accessible (WCAG AA), has clear press feedback, and keyboard-navigable focus indication.

---

### 6. Motion System Simplification
**Author:** Trinity  
**Date:** 2026-04-10  
**Issues:** #24, #29  
**Status:** Implemented

Simplified motion system to opacity-only fades. Removed slide-up animations, parallax scroll, decorative overlays, and unused keyframe utilities.

**Changes:**
- All animations: `opacity: 0 → 1` only, 600ms easeOut
- Hero: Removed parallax ref-based system (3 refs, useCallback, rAF listener)
- Removed: `bg-gradient-aurora-subtle` overlay, SVG noise texture
- Removed unused keyframes: `aurora-pulse`, `shimmer`, `float`
- AnimatedSection trigger: 80% viewport visibility (was -100px offset)

**Rationale:** Slide-up animations read as "presentation deck," not editorial. Parallax and decorative overlays diluted photography and added AI aesthetic noise. Photography carries the mood.

**Impact:** Hero reduced 141→102 lines (28% reduction). Build clean.

---

### 7. Light Color Theme Migration
**Author:** Mouse  
**Date:** 2026-04-10  
**Issues:** #25 (P0), #26 (P1)  
**Status:** Implemented

Migrated from dark OKLCH theme to light hex values. Removed all glow shadows and SaaS visual patterns.

**Color Changes:**
- Page background: `aurora-bg` (#f5f3f0)
- Card background: `aurora-bg-light` (#faf9f7)
- Alternating section: `aurora-bg-dark` (#f0ebe5)
- Body text: `aurora-text` (#2c2620)
- Muted text: `aurora-text-muted` (#6b6458)
- Primary accent: `aurora-gold` (#c9a76a)
- Secondary: `aurora-navy` (#1a3a52)
- Tertiary: `aurora-sage` (#7a8f7f)
- Borders: `aurora-border` (#e8e4df)
- Error: `aurora-error` (#a85a4a) — warm bordeaux
- Success: `aurora-success` (#5a8f4a)

**Shadow Strategy:**
- Removed: `glow`, `glow-purple` (SaaS patterns)
- Added: `lift` (primary hover), `subtle` (card), `medium` (active)
- Photo overlays: Use `from-black/XX`, not theme colors

**Key Decisions:**
- Hero text stays white (dark photo backgrounds)
- CTA buttons: Solid gold (`bg-aurora-gold text-aurora-text`), not gradient
- Glass utility: Solid surface (#faf9f7) with border, no blur
- Animated border preserved (conic gradient updated)

---

### 8. Navbar & Hero Light Theme Redesign
**Author:** Trinity  
**Date:** 2026-04-10  
**Issues:** #30, #32  
**Status:** Implemented

**Navbar (#30):**
- `bg-white/90 backdrop-blur-sm border-b border-[#e8e4df]`
- Links: `uppercase tracking-wider text-xs text-[#2c2620]`
- Active/hover: `text-[#c9a76a]` with underline
- CTA: "Request Consultation" `bg-[#c9a76a] text-white`

**Hero (#32):**
- Removed dark vignette and image opacity dimming
- Added `bg-white/15` overlay for subtle readability on dark photos
- Dark text throughout (`text-[#2c2620]`)
- New headline/subhead emphasizing bespoke service
- Concierge discovery row: `[Where? ▾] [When? ▾] [Discuss →]` (md+ only)
- CTAs: "Request Consultation" (gold) + "Explore Destinations" (dark outline)

---

### 9. FloatingCTA Removal
**Author:** Trinity  
**Date:** 2026-04-10  
**Issue:** #41  
**Status:** Implemented

Deleted `FloatingCTA.tsx`. Sticky navbar CTA "Request Consultation" (always visible) made the floating button redundant.

---

### 10. Destinations Expansion & GuideGrid
**Author:** Neo  
**Date:** 2026-04-10  
**Issues:** #33, #34  
**Status:** Implemented

**Destinations (#33):**
- Expanded to 15 destinations (added Patagonia, Bali, Amalfi Coast, Santorini, Bora Bora, Marrakech, Iceland, Seychelles)
- 15 destinations fill 3-col grid evenly (1 featured 2-col + 14 standard = clean rows)
- Added "Learn More →" gold link on hover

**GuideGrid (#34):**
- 6 guides with unique authors and 8-12 min read times
- 4:3 image cards in responsive 3/2/1 grid
- `AnimatedSection` wrapper with staggered Framer Motion
- Read-time badge overlay, gold "Read Guide →" link
- Hover: `-translate-y-1 + shadow-lg`
- `TravelGuide` interface added to `app/lib/types.ts`

---

### 11. Press & Awards Section
**Author:** Neo  
**Date:** 2026-04-10  
**Issue:** #38  
**Status:** Implemented

**PressAwards Component:**
- 6 publications with text-based logo treatment (tracking-widest font-heading)
- Desktop: flex row with 1px dividers
- Mobile: 2×3 grid with borders
- Stat line with gold star rating
- External links on all logos
- Hover: text-aurora-gold
- `PressAward` interface added to `app/lib/types.ts`

**Rationale:** Text logos avoid asset management, render crisply, easy to update. Better than trying to source and host image assets.

---

### 12. ConciergeForm & Footer Styling (Wave 3)
**Author:** Trinity  
**Date:** 2026-04-10  
**Issues:** #36, #39, #40, #43  
**Status:** Implemented

**ConciergeForm (#36):**
- Success feedback: Auto-dismissing toast (6s) instead of full-page panel
- Toast remains above form; form resets for immediate reuse
- Inputs: `bg-white` (#fff) for clear separation on `bg-aurora-bg` container
- Selected interest pills: `text-white` on gold background (matches button pattern)
- Toast: `role="status"` for screen reader announcement

**Footer (#39):**
- `bg-aurora-navy text-white` for visual page terminus
- Separate inline footer data (not coupled to nav links)
- Footer links grouped by category, allows independent evolution

**SEO (#40):**
- Title, description, keywords, OG, Twitter card per spec

**Section Order (#43):**
- Wired imports for TrustBar, WhyAurora, GuideGrid, PressAwards
- Spec-exact ordering in page.tsx

---

### 13. WhyAurora & TrustBar New Sections
**Author:** Neo  
**Date:** 2026-04-10  
**Issues:** #31, #35  
**Status:** Implemented

**WhyAurora:**
- 5 mock specialists with Unsplash portraits (avg 13 years experience)
- 3-col lg / 2-col md / 1-col sm grid
- White cards with `#e8e4df` borders
- Hover: `-translate-y-1 + shadow-medium`
- Monoline SVG icons in gold circles (consistent with ExperienceList)
- `useReducedMotion()` disables all motion
- Light bg: `#faf9f7` (aurora-bg-light)

**TrustBar:**
- 4 credibility signals: phone (gold-highlighted), review count, years, destinations
- Desktop: flex row with `w-px` dividers
- Mobile: 2×2 grid
- `role="complementary"` + `aria-label`

**Data Layer:**
- `TeamMember` interface in `app/lib/types.ts`
- `app/data/team.ts` holds 5 specialists

---

### 14. Testimonials & Experiences Redesign
**Author:** Neo  
**Date:** 2026-04-10  
**Issues:** #37, #42  
**Status:** Implemented

**Testimonials (#37):**
- Kept carousel + sidebar-dot navigation (works well for single voice focus)
- All ratings: 5 stars
- 4 of 7 with Trustpilot sourceLinks (>3 as required)
- Trip-specific roles ("Anniversary — Private Island, Greece") instead of job titles

**Experiences (#42):**
- Replaced SVG icons with emoji (simpler, renders well at 4xl)
- Switched from alternating horizontal cards to 3/2/1 responsive grid
- Region pills: `rounded-full` (differentiate from `rounded-sm` cards)
- Pills: subdued styling (light bg, border, text-xs) so they inform without competing

---

### 15. Layout Monotony Fix (Wave 4)
**Author:** Neo  
**Date:** 2026-04-10  
**Issue:** #46  
**Status:** Implemented

**Strategy:** Changed 3 of 5 grid sections to add visual variety; kept 2 unchanged.

**ExperienceList:** Featured + compact grid
- Left: featured card with 2-col span
- Right: 2×4 compact grid
- Featured: slide-from-left (x: -32)
- Compact: opacity fade with minimal stagger (0.04s)
- Mobile: featured on top, grid below

**GuideGrid:** Editorial hero + grid
- First guide as side-by-side hero (image left, content right, "Featured Guide" label)
- Remaining 5 guides in standard card grid
- Rationale: Signals editorial curation, not AI generation

**WhyAurora:** Horizontal scroll strip
- Replaced 3-col stagger grid with static scroll strip
- Asymmetric card sizing (first 2 larger) adds visual interest
- No Framer Motion animation — static render
- Rationale: Trust content shouldn't bounce. Team sections use scroll pattern in luxury travel (cf. LinkedIn, Virtuoso)

**Animation Diversity:**
- Removed "everything stagger-fades-up" pattern (top #1 AI tell)
- Featured cards: slide-from-left
- Remaining cards: opacity fade only
- Credibility sections: static (no animation)

---

### 16. Experience Icon System & Emoji Replacement
**Author:** Neo  
**Date:** 2026-04-10  
**Issue:** #49  
**Status:** Implemented

**Strategy:** Replace emoji icons with stroke-only 24×24 SVGs for consistency.

**Icon System:**
- Icon map (`experienceIcons` record) in ExperienceList.tsx
- IDs keyed to experience data
- All SVGs: `fill="none" stroke="currentColor" strokeWidth="1.5"`
- 24×24 viewBox for consistent sizing (`w-8 h-8`)
- Color: `text-aurora-gold` (inherited via `stroke="currentColor"`)
- Consistent with WhyAurora differentiator icons (monoline look)

**Rationale:** Stroke-only SVGs avoid asset overhead and match existing icon patterns. Emoji destroys premium credibility.

---

### 17. Wave 4 UI/A11y Fixes
**Author:** Mouse  
**Date:** 2026-04-10  
**Issues:** #44, #48, #50, #51  
**Status:** Implemented

**PressAwards Hover (#44, #48):**
- Replaced inline `onMouseEnter`/`onMouseLeave` style handlers with Tailwind `hover:text-aurora-gold focus:text-aurora-gold`
- Enables keyboard/focus access; normalizes token usage

**DestinationGrid Focus (#48):**
- Changed `focus-within:opacity-100` → `group-focus-within:opacity-100`
- Card is `group` element; keyboard focus on card now reveals overlay

**Testimonials Heading Semantics (#50):**
- Swapped elements: eyebrow `<h2>` → `<p>`, visual heading `<p>` → `<h2>`
- Visual appearance unchanged; semantic hierarchy fixed

**Phone Number Standardization (#51):**
- TrustBar: `+1 (212) 555-0190` → `+1 (888) 200-LUXE`
- Footer: Already `+1 (888) 200-LUXE`
- Vanity number is on-brand and memorable

---

### 18. Token Naming Audit
**Author:** Mouse  
**Date:** 2026-04-10  
**Issue:** #27  
**Status:** No action — already complete

All token renames from dark to light theme (Issue #26) are already done:
- `aurora-cyan` → `aurora-gold` (#c9a76a)
- `aurora-purple` → `aurora-navy` (#1a3a52)
- `aurora-magenta` → `aurora-sage` (#7a8f7f)

No stale references remain. Minor observation: `lift` shadow uses `oklch(0 0 0 / 0.35)` while others use `rgba()` — format inconsistency, not a bug. Can normalize in future cleanup.

---

### 19. Wave 4 Design Decisions (Trinity)
**Author:** Trinity  
**Date:** 2026-04-10  
**Issues:** #45, #47  
**Status:** Implemented

**Custom Event Pattern (#45):**
- Hero → ConciergeForm pre-fill via `CustomEvent('hero-discovery')`
- Hero dispatches with destination, timing, tags
- ConciergeForm listens via `useEffect`, pre-fills matching fields
- Rationale: Lightweight, browser-native, keeps components independent (no imports, no prop drilling)
- Pre-fill strategy: Map destination → interest tags (maldives → "Beach & Islands"), timing → travelDates, fallback to human-readable summary in notes

**Region Tab Filtering (#47):**
- Horizontal pill-style tabs with "All" + per-region tabs
- Tab labels show counts: "Indian Ocean (2)"
- "All" tab gates to 6 destinations with expand button
- Filtered views show all (small enough sets don't need gating)
- Featured card (`index === 0` of visible set) spans 2×2 — changes per region
- Animation: `AnimatePresence mode="wait"` with opacity crossfade (250ms), respects `useReducedMotion`
- No layout shift — grid dimensions consistent

---

### 20. Custom Dropdown Pattern for Aurora Luxe
**Author:** Mouse  
**Date:** 2026-04-11  
**Issue:** #136  
**Status:** Implemented

## Decision

Native `<select>` elements are replaced with custom `LuxeSelect` dropdowns in the hero concierge bar. The pattern uses aurora design tokens (`bg-white/90 backdrop-blur-md`, `border-aurora-border`, `shadow-glass`) for visual consistency with the glass control bar.

## Why

Browser-native `<select>` dropdown panels cannot be styled — they break the luxury aesthetic by rendering OS-default chrome. Any future select/dropdown in the control bar or similar glass surfaces should follow this same pattern.

## Accessibility Contract

- `role="combobox"` trigger + `role="listbox"` panel + `role="option"` items
- Full keyboard: ArrowUp/Down, Enter/Space, Escape, Home/End
- `aria-expanded`, `aria-activedescendant`, `aria-selected`
- Click-outside-to-close via document mousedown listener
- Focus returns to trigger on close

## Scope

Currently only in Hero.tsx. If more custom selects are needed, extract `LuxeSelect` to a shared component.

### 21. Design System Update — No Category Accent Colors
**Author:** Trinity  
**Date:** 2026-04-11  
**Issue:** #196  
**Status:** Proposed  
**Artifact:** `spec/design-system-update.md`

## Decision

The 6 new experience categories (Voyages, Celebrations, Adventures, Productions, Junior, Bespoke) will **not** receive individual accent colors. All categories use the existing `aurora-navy` + `aurora-gold` palette.

## Rationale

1. **Authority through restraint** (Design Principle #1) — a 6-color category palette would undermine the editorial luxury tone.
2. **Icons + typography** differentiate categories without color coding.
3. **Maintenance** — every token added is maintenance forever. The palette scales as-is.
4. **Category pills** use `aurora-navy` background (matching existing tier badge treatment), providing visual consistency without new tokens.

## Alternatives Considered

- Muted tint per category (e.g., warm rose for Celebrations, sage for Junior) — rejected as decorative accumulation that violates Principle #1.
- Gold shade variants per category — rejected as too subtle to be useful and too complex to maintain.

## Impact

- No new color tokens in globals.css or tailwind.config.ts
- CategoryPill component uses existing navy/light color pair
- Applies to ExperiencePortfolio cards, FeaturedPackages cards, testimonials, and guides

---

### 22. Security Architecture — Two-Provider Auth + Five-Role RBAC
**Author:** Dozer  
**Date:** 2026-04-11  
**Issue:** #187  
**Status:** Proposed  
**Artifact:** `spec/security-architecture.md`

## Decision

Defined the security architecture for Aurora Luxe with these key choices:

### 1. Two Identity Providers
- **Azure AD B2C** for customers (self-service sign-up, social login, password reset)
- **Azure AD (Entra ID)** for staff (corporate SSO, conditional access, MFA enforcement)
- Both issue JWTs validated by the same API gateway

### 2. Five-Role RBAC Model
- Anonymous → Customer → Editor → Admin → System
- Permission matrix defines exact access per role per resource
- Server-side enforcement at three points: gateway, middleware, handler

### 3. Phased Implementation
- Phase 1 (now): Security headers + CSP on static site
- Phase 2: Auth when backend arrives
- Phase 3: RBAC when CMS arrives
- Phase 4: Full infra security (VNet, Key Vault, WAF, monitoring)

### 4. Token Storage
- Access tokens in memory (never localStorage)
- Refresh tokens in HttpOnly secure cookies

### 5. Data Protection
- PII (consultation form data) encrypted at rest, access-logged, retention-limited
- No PII in logs — ever

## Team Impact
- **Morpheus:** Security headers can be added to `next.config.js` in Phase 1.
- **Trinity:** CSP `style-src 'unsafe-inline'` needed for Tailwind. No `dangerouslySetInnerHTML`.
- **Tank:** Security test plan needed — auth flows, RBAC enforcement, header validation.
- **Niobe:** AI endpoints rate-limited per role. Service-to-service uses managed identity.

## Needs Review From
- Morpheus (overall architecture alignment)
- Tank (testability of security controls)

---

### 23. Sprint Plan — Aurora Luxe Platform Pivot
**Author:** Morpheus  
**Date:** 2026-04-12  
**Issue:** Sprint planning (37 issues → 4 sprints)  
**Status:** Approved  
**Artifact:** `.squad/decisions/inbox/morpheus-sprint-plan.md` (now consolidated here)

## Decision

Sequenced all 37 open issues into 4 sequential 2-week sprints (8 weeks) with explicit dependency graph, team assignments, and parallelization strategy.

### Critical Path
1. **Sprint 1:** #210 (architecture spike) → #203 (P0 brand rewrite) — gates all downstream work
2. **Sprint 2:** Tier-impact specs (#204–#209) + security RBAC + Azure architecture (parallel after #203)
3. **Sprint 3:** Content APIs, back-office, AI agents (parallel after #184 + #187)
4. **Sprint 4:** Data migration, CI/CD, environments, test strategy (parallel implementation phase)

### Team Assignments
| Person | Role | Sprint Load | Focus |
|--------|------|------------|-------|
| **Morpheus** | Lead/Architect | 7 specs | Architecture, structure, decisions, core specs (#210, #203, #204, #206, #208, #209, #194) |
| **Trinity** | Frontend/Design | 8 specs + QA | UI components, design system, migration (#181, #196, #205, #207, #190, #199, #191 + UI bugs) |
| **Dozer** | Backend/Cloud | 9 specs | APIs, cloud, infra, observability (#184, #187, #180, #188, #186, #192, #193, #195, #198) |
| **Niobe** | AI/M365 | 4 specs | AI agents, back-office (#185, #189, #186, #188) |
| **Tank** | QA/Testing | 1 spec + verification | Testing strategy (#197) + spot-check others |

### Issue Status Summary
- **Total:** 37 open issues
- **Assigned to sprints:** 29 active specs
- **Parallelizable UI bugs:** 8 (#151, #157–#158, #160–#161, #165, #172–#173)
- **Deprioritized to stretch:** 2 (#143, #144 — depend on #204)
- **Retitled (not closed):** 3 (#139, #141, #142 retitled in #209)

### Key Technical Insights
1. **Three Tier Types Are Fundamentally Different**
   - Old model: Linear privilege hierarchy (Silver < Black < Obsidian)
   - New model: Three transaction types (transactional One Time, subscription Yearly, third-party Gift)
   - Affects: Data model, consultation flows, API design, RBAC (Gift tier has two-party identity)

2. **Data Model Migration Strategy**
   - New types (`ExperiencePackage`, `CategoryMeta`) coexist with old types during transition
   - Four-phase rollout: copy → data model → consultation flow → components
   - Each phase independently mergeable

3. **Risks & Mitigations**
   - **Architecture gap:** Joint Morpheus + Dozer spike on #210; pre-enumerate unknowns (payment flows, recipient identity, renewal logic)
   - **RBAC complexity:** Scope #210 spike to include identity contract; decide Auth0/Entra vendor in Sprint 1
   - **API versioning:** Pre-decide URL vs header strategy; document in #210 spike
   - **M365 scope creep:** Tank QA each spec; Niobe scope strictly to "backoffice admin"
   - **Monorepo blocker:** Treat #194 as informational; Dozer proceeds with single-repo assumptions

### Success Criteria (Per Sprint)
- **Sprint 1:** #210 spike output (architecture diagram, API shape) + #203 rewrite (zero stale tier refs)
- **Sprint 2:** All tier-impact specs merged + RBAC matrix + Azure architecture
- **Sprint 3:** Content API schema + back-office draft + sample data pack + A11y/i18n spec
- **Sprint 4:** Data migration plan + CI/CD design + environment strategy + Phase 2 backlog prioritized

### Teaching-Site Principles (Phase 2)
1. **Readability over cleverness** — simple, explicit patterns; JSDoc on non-obvious logic
2. **Decision annotation** — every choice (auth, caching, tier logic) documented with "why"
3. **Phase colocation** — specs and code in same repo; no separate "design docs"
4. **Testing as teaching** — test files are examples of how to use the code
5. **No magic numbers** — all config/thresholds in `.env` or spec'd constants with rationale

---

### 23. User Directives — Visual Quality & Test Hygiene
**By:** ivegamsft (via Copilot)  
**Date:** 2026-04-12  
**Status:** Active Guidance

**Directive 1 — Test artifacts must never live in `public/`:**
Test screenshots, diagnostic images, and any test output must go in `apps/web/e2e/screenshots/` or `apps/web/test-results/`, NEVER in `apps/web/public/`. The `public/` folder ships to production. Existing screenshots in `public/screenshots/` must be moved and gitignored.

**Directive 2 — Visual verification requires actual screenshots:**
Code review alone is not sufficient to verify visual fixes. Typography, spacing, contrast, and imagery issues MUST be verified with Playwright screenshots at both desktop (1440px) and mobile (375px) widths. "Tests pass" and "build clean" is necessary but not sufficient.

**Directive 3 — Family-friendly imagery and content:**
Aurora Luxe caters to families including kids. No wine glasses, cocktails, alcohol imagery, or adult-only visual content on the homepage. Text references were fixed (commit 7dc22ae) but imagery must also be audited.

**Directive 4 — Contrast must be visually verified, not just computed:**
WCAG AA ratio calculations are a minimum bar. If light text on light backgrounds is still visible to the user, the fix isn't done regardless of what the math says. Always screenshot-verify contrast fixes.

**Why:** User repeatedly flagged visual issues that passed code review but failed visual inspection. These directives prevent recurrence.

---

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
