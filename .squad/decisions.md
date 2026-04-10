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

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
