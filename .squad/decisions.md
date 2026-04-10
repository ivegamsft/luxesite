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

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
