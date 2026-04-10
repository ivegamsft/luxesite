# Project Context

- **Owner:** ivegamsft
- **Project:** Aurora Luxe Travel — a futuristic luxury travel website. Single-page (plus optional destination detail route) for a fictional ultra-premium concierge travel brand.
- **Stack:** Next.js (latest stable), TypeScript, Tailwind CSS, Framer Motion, next/image
- **Created:** 2026-04-10

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->

### Visual Redesign — "Gilded Bordeaux" (2026-04-10)

**Palette:** Replaced the AI-default cyan/purple/magenta-on-dark with an OKLCH warm luxury palette:
- Primary accent: champagne gold `oklch(0.82 0.105 85)` — mapped to `aurora-cyan` token
- Secondary: deep bordeaux wine `oklch(0.42 0.13 20)` — mapped to `aurora-purple`
- Tertiary: dusty rose `oklch(0.70 0.09 30)` — mapped to `aurora-magenta`
- Gold highlight: burnished antique `oklch(0.80 0.12 75)` — mapped to `aurora-gold`
- Dark backgrounds: wine-tinted near-black, not pure neutral
- Text: warm ivory `oklch(0.95 0.012 85)`, not cold white

**All color token NAMES preserved** (aurora-cyan, aurora-purple, etc.) so component classes didn't break. Only VALUES changed.

**Glassmorphism:** Reduced from heavy 16px blur + transparent bg to subtle 6px blur + 70% opaque warm surface. The `.glass` class now reads as a tinted solid surface. `animated-border` retains stronger glass (12px blur, 60% opacity) for the featured tier.

**Fonts:** Uses Bodoni Moda (heading serif — editorial luxury) + Libre Franklin (body sans — clean readability). These are the actual current fonts in layout.tsx (NOT Playfair Display + Source Sans 3). Variables: `--font-bodoni-moda`, `--font-libre-franklin`.

**Fluid Typography:** Major Third (1.25) scale with `clamp()` — 8 steps from `--fluid-sm` to `--fluid-5xl`. Available as CSS custom properties and Tailwind `text-fluid-*` utilities.

**Section Spacing:** 5 rhythm tokens (`--space-hero` through `--space-section-xs`) using `clamp()`. Available as Tailwind `section-hero`, `section-lg`, etc. Trinity needs to apply these to component section padding.

**Key files:**
- `apps/web/app/globals.css` — OKLCH vars, glass, animated-border, fluid type, spacing tokens
- `apps/web/tailwind.config.ts` — all color/gradient/shadow/font/fontSize/spacing tokens
- `apps/web/app/layout.tsx` — Playfair Display + Source Sans 3 imports

### Impeccable Design Critique (2026-04-10)

**Fonts are now correct:** History entry above (Visual Redesign) has been corrected. Code actually imports **Bodoni Moda** (heading) + **Libre Franklin** (body). These are NOT on the banned list — good.

**Overall Score:** 48/80 — Borderline AI-slop. Site reads as "ambitious startup" rather than "quiet luxury." 

**Key issues identified:**
- `rounded-2xl` used on nearly every surface (cards, buttons, form, badges) — biggest AI-tell, needs hierarchy (sharp/small/full)
- 8-step fluid type scale should be trimmed to ~5 steps for consistency
- Hero subtext and several section intros are cliché-ridden (pure AI-generated copy)
- No `@container` queries anywhere (impeccable guidelines require them)
- Testimonial navigation dots are 12px — fail 44px WCAG touch target by 3.7x
- Toast component uses raw rgba/hex instead of OKLCH tokens
- Mobile menu has zero animation (conditional render, not AnimatePresence) — jarring for motion-rich site
- Framer Motion animations don't check prefers-reduced-motion (CSS only covers CSS animations)
- Emoji icons in ExperienceList destroy credibility instantly
- "Most Popular" badge on pricing tier uses SaaS copywriting; undermines exclusivity
- Aurora blob is most overused AI hero element; should be removed

**What works exceptionally well:**
- OKLCH palette is warm, intentional, and considered — no pure black/white
- Bodoni Moda + Libre Franklin is a strong editorial heading/body pairing
- Custom ease-out-quint `[0.22, 1, 0.36, 1]` used consistently in scroll reveals
- `animated-border` properly reserved for featured tier only — restraint shows craft
- Testimonials component has best layout — asymmetric grid, editorial feel
- Experience list alternating layout direction (left/right) adds visual variety

**Full severity breakdown:** 22 findings total (P0: 4, P1: 5, P2: 5, P3: 3). See decisions.md for complete audit.

**Key file notes for future fixes:**
- ConciergeForm.tsx: Toaster styles use rgba/hex (need OKLCH); error uses `text-red-400` (not branded)
- Testimonials.tsx: nav dots 12px (need 44px touch target)
- Navbar.tsx: mobile menu uses conditional render (needs AnimatePresence)
- All Framer Motion animations: need `useReducedMotion()` hook
- Global need for `@container` queries on card components

## Session Activity

### Impeccable Audit Fixes (2026-04-10T03:42:00Z)

**Session:** ivegamsft requested full audit fix  
**Status:** ✅ COMPLETE  
**Orchestration Log:** `.squad/orchestration-log/2026-04-10T03-42-00Z-mouse.md`

Redesigned visual system successfully implemented. Gilded Bordeaux OKLCH palette, new typography, fluid scales, and section spacing tokens established as foundation for all downstream components. Build passes; all metrics clean.

### Design Polish Pass — Kill AI Aesthetics (2026-04-10)

**7 fixes applied across 10 files. Build clean.**

**Task 1 — SVG Icons in ExperienceList:** Replaced all 5 emoji icons (✈️🛥️🍽️🌌🏔️) with inline monoline SVGs. Each uses 24×24 viewBox, `currentColor` stroke, 1.5px weight. Icons: paper-plane (aviation), sailboat (yacht), wine glass (culinary), crescent moon (celestial), dual-peak mountain (alpine). Typed as `Record<string, React.ReactNode>` with `React` import.

**Task 2 — Corner Radius Hierarchy:** Killed uniform `rounded-2xl` everywhere. New system:
- Cards/containers → `rounded-sm` (DestinationGrid, ExperienceList, Tiers, ConciergeForm container)
- Buttons → `rounded-lg` (Hero CTAs, Navbar CTAs, ConciergeForm submit)
- Inputs → `rounded-lg` (all ConciergeForm fields)
- Pills/badges → `rounded-full` (interest tags, FloatingCTA already correct)
- No `rounded-2xl` or `rounded-xl` remains in any component.

**Task 3 — Hero Subtext:** Replaced 3-line AI cliché ("pinnacle of luxury…curated to perfection…discerning travelers") with 9-word editorial line: "Private shores. Unmarked airstrips. Tables that don't take reservations." Fragmented, atmospheric, specific.

**Task 4 — Price Badges:** Removed gradient pill badges from DestinationGrid. Replaced with `font-heading text-base tracking-wide text-aurora-white/60` — typographic-only, no background, no pill shape. Editorial price display.

**Task 5 — Hero Aurora Blob:** Removed the floating 600px gradient blob entirely. Replaced with a bottom-up vignette (`bg-gradient-to-t from-aurora-dark via-aurora-dark/40 to-transparent`) for text readability. Photography + noise texture carry the atmosphere.

**Task 6 — Section Intro Variety:** Broke the formulaic h2+p.text-aurora-white/60.mb-12.max-w-2xl pattern:
- Destinations: subtitle widened to `max-w-3xl`, opacity dropped to `/50`
- Experiences: subtitle removed entirely, heading carries section
- Testimonials: replaced with pull-quote style (small uppercase label + italic Bodoni quote)
- Tiers: left-aligned, tightened to `max-w-xl`, rewritten ("Three tiers. One standard — uncompromising.")
- ConciergeForm: left-aligned, copy rewritten ("One conversation. Then we take it from here.")

**Task 7 — Branded Error Color:** Added `aurora-error: oklch(0.65 0.20 25)` — warm bordeaux-adjacent red in OKLCH. Added to both `tailwind.config.ts` (color token) and `globals.css` (CSS variable). Updated ConciergeForm `text-red-400` → `text-aurora-error` on both error messages.

**Key lesson:** Files in this project have been modified by multiple agents (Trinity, Morpheus). Always read current file state before editing — classes like `destination-card`, `tier-card`, `experience-card`, `@container`, and `useReducedMotion` were added by other squad members and must be preserved.

## Cross-Agent Coordination

### Trinity Frontend Fixes (2026-04-10T04:30:00Z)

Trinity completed P0+P1 frontend fixes in parallel with Mouse design polish:
- **Touch targets (P0):** Nav dots wrapped in 44px buttons (WCAG compliance)
- **Badge removal (P0):** "Most Popular" copy stripped from pricing tier
- **Container queries (P1):** @container rules added to DestinationGrid, ExperienceList, Tiers — complements Mouse's card styling with responsive adaptation
- **Mobile menu (P1):** AnimatePresence animation for smooth conditional render
- **Motion reduced (P1):** useReducedMotion() wired into 6 Framer Motion components (complements Mouse's design work by respecting accessibility)
- **Token migration (P1):** Toast colors converted to OKLCH (aligns with Mouse's branded error color work)
- **Type scale trim (P1):** 8→6 steps consolidation (aligns with Mouse's visual hierarchy goals)

**No conflicts:** Trinity's frontend fixes orthogonal to Mouse's design aesthetics. Combined coverage: design polish (Mouse) + engineering quality (Trinity) = complete P0+P1+P2 pass.

**Build Status:** Both agents' changes verified independently and together — zero regressions.

### Typography System Overhaul (2026-04-10)

**8 tasks, 23 edits across 9 files. Build clean.**

**Task 1 — Heading Hierarchy:** Section headings (Destinations, Experiences, Tiers, ConciergeForm) dropped from `text-fluid-3xl` to `text-fluid-2xl`. Hero stays at `text-fluid-3xl`. Creates clear display → section → subsection hierarchy.

**Task 2 — Line-Height by Size:** Hero h1 gets `leading-[1.1]` (tight for 6.5rem display). Section h2s get `leading-tight` (1.25). Testimonial quotes changed from `leading-relaxed` to `leading-snug` (1.375). Body stays at 1.7 (task 8). Rule: line-height scales inversely with font size.

**Task 3 — Weight Strategy:** Consistent roles enforced:
- Display (Hero h1): `font-bold` (700)
- Section h2s: `font-semibold` (600) — ConciergeForm was bold, others had nothing
- Subsection h3s (card titles): `font-medium` (500)
- Buttons: `font-semibold` (600) — Hero, Navbar, Tiers, FloatingCTA upgraded from font-medium
- Body/labels: Regular (400) — default

**Task 4 — Letter-Spacing:** `tracking-tight` added to all `text-fluid-2xl` headings and the Testimonials pull quote. Large display text needs tighter tracking. Navbar wordmark keeps `tracking-wider` (correct for uppercase), Testimonials label keeps `tracking-widest`.

**Task 5 — Tabular Numerals:** `tabular-nums` added to Tiers price display and DestinationGrid price badges. Prices now align visually in columns.

**Task 6 — Ch-Based Measure:** Prose max-widths converted to `ch` units:
- Hero subtitle: `max-w-2xl` → `max-w-[65ch]`
- DestinationGrid subtitle: `max-w-3xl` → `max-w-[75ch]`
- Tiers subtitle: `max-w-xl` → `max-w-[65ch]`
- ConciergeForm subtitle: added `max-w-[65ch]`
- Testimonials pull quote: `max-w-3xl` → `max-w-[75ch]`
- Active quote already used `max-w-[50ch]` ✓

**Task 7 — OpenType Features:** Added `font-kerning: normal` to body in globals.css. Antialiased already handled by Tailwind `antialiased` class on html+body. Kept `uppercase` on Testimonials label (Google Fonts Bodoni Moda subsetting may strip small-caps OpenType tables — safer to keep text-transform).

**Task 8 — Dark Background Line-Height:** Body `line-height: 1.7` added to globals.css. Light-on-dark text appears lighter weight and needs more breathing room. Headings unaffected — they have explicit leading classes from task 2.

**Key pattern:** Typography hierarchy is now fully intentional: size, weight, tracking, and leading all scale together. Each heading level is visually distinct without relying solely on font-size.
