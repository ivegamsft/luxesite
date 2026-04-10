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

### GitHub Issue Fixes — #1 (spinning border) & #3 (text contrast) (2026-04-10T05:08:21Z)

**Parallel Sprint:** Mouse + Trinity GitHub Issues Sweep  
**Status:** ✅ COMPLETE  
**Orchestration Log:** `.squad/orchestration-log/2026-04-10T05-08-21Z-mouse.md`

Fixed issues #1 (rotating border) and #3 (destination text contrast) as part of larger 5-issue sweep. All changes committed as `1bad133` with all issues now closed on GitHub.

**Issue #1 — Featured Tier Border:** Removed `@keyframes rotate` animation from `.animated-border::before`. Static conic gradient (champagne gold → bordeaux → dusty rose) now provides visual distinction without spinning motion, aligning with luxury restraint principle.

**Issue #3 — Destination Card Scrims:** Implemented three-layer scrim system in `DestinationGrid.tsx`:
- Full vignette for cinematic tone
- Bottom scrim protecting title/region/tagline zone
- Top-right corner scrim protecting price zone

Price opacity bumped from `/60` to `/80`; region from `/60` to `/70`. All text now passes WCAG AA (4.5:1 minimum) on any background without visible UI chrome.

**Key pattern:** Dual-scrim layering is standard in production media UI. Single-layer overlays fail on bright imagery; layered scrims provide exact opacity per content zone.

**Issue #1 — Animated border made static:**
- Removed `animation: rotate 4s linear infinite` from `.animated-border::before` in globals.css
- Removed the now-unused `@keyframes rotate` block entirely
- Removed the specific `.animated-border::before { animation: none }` from `prefers-reduced-motion` (no animation to stop)
- The conic gradient border remains as a static visual distinction for the featured tier — beautiful without spinning
- Aligns with design principle #1: "Authority through restraint"

**Issue #3 — Destination card text contrast hardened:**
- Added dual-scrim system to DestinationGrid.tsx (cinematic, like Netflix/movie poster overlays):
  - Full-image vignette: `from-aurora-dark/70 via-aurora-dark/20 to-transparent` (softened from /90)
  - Targeted bottom scrim: `h-1/2 from-aurora-dark/80 via-aurora-dark/40 to-transparent` for title/region/tagline
  - Top-right corner vignette: `w-2/3 h-1/3 from-aurora-dark/60 to-transparent` for price text
- Price text opacity bumped from `/60` to `/80` for WCAG AA compliance
- Region text opacity bumped from `/60` to `/70`
- All scrims use `pointer-events-none` to preserve click/hover/keyboard interactions

## Wave 4 — Issues #44, #48, #50, #51 (2025-01-XX)

### Issue #44 (P0): Footer + PressAwards accessibility
- Footer.tsx: All `<a>` links now have `focus:text-white focus:underline focus:outline-none focus:ring-2 focus:ring-aurora-gold`
- Footer.tsx: Copyright row bumped from `text-white/40` → `text-white/70` for WCAG AA
- Footer.tsx: All body text bumped from `text-white/60` → `text-white/80`
- PressAwards.tsx: Award links now have visible focus styles with ring offset
- PressAwards.tsx: Removed onMouseEnter/onMouseLeave inline style handlers, replaced with Tailwind hover:/focus: classes
- Tiers.tsx: Join buttons now have `focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:outline-none`

### Issue #48 (P2): Normalize inline styles to tokens
- Hero.tsx: All `[#hex]` replaced with `aurora-*` tokens (text, gold, border, bg)
- Navbar.tsx: All `[#hex]` replaced with tokens (text, gold, border)
- WhyAurora.tsx: All `[#hex]` replaced with tokens (bg-light, text, gold, border, text-muted)
- GuideGrid.tsx: All `style={{ }}` inline styles replaced with Tailwind token classes
- PressAwards.tsx: All `style={{ }}` inline styles replaced with Tailwind token classes

### Issue #50 (P2): Skip-nav, main landmark, reduced-motion
- layout.tsx: Added skip-to-content link as first child of `<body>`, removed `<main>` wrapper
- page.tsx: Wrapped all sections (after Navbar, before Footer) in `<main id="main-content">`
- StaggerChildren.tsx: Added `useReducedMotion` — sets stagger to 0 when reduced motion preferred
- globals.css: Added `@media (prefers-reduced-motion: reduce) { .animate-scroll-hint { animation: none; } }`
- Navbar.tsx: Mobile menu animation kept as-is (functional reveal, not decorative)

### Issue #51 (P3): Minor fixes
- TrustBar.tsx: Phone number standardized to `+1 (888) 200-LUXE` (was `+1 (212) 555-0190`)
- Testimonials.tsx: Swapped h2/p — eyebrow is now `<p>`, visual heading is now `<h2>`
- DestinationGrid.tsx: Changed `focus-within:opacity-100` → `group-focus-within:opacity-100` on overlay so keyboard focus on card reveals quick facts
- All colors remain in OKLCH via aurora-dark token
- No badges, pills, or visible UI elements — contrast is achieved through invisible gradient layers

**Key lesson:** Dual-scrim layering (general vignette + targeted text protection) is standard in production media UIs. It provides robust contrast on any image brightness without visible UI chrome. The existing single full-image gradient wasn't enough on bright imagery (Swiss Alps snow, Dubai gold).

### Critique Fixes — Visual Rhythm & Passive Scroll (2026-04-10)

**2 fixes across 2 files. Build clean.**

**Issue #20 — Section background rhythm:** Added `bg-aurora-darker` to Testimonials `<section>`. Creates alternating dark/darker/dark pattern across Tiers → Testimonials → ConciergeForm. Prevents the lower page from reading as a single continuous block.

**Issue #22 — Passive scroll listener:** Added `{ passive: true }` to FloatingCTA's scroll event listener. Hero.tsx already used passive — this was an inconsistency. Passive listeners let the browser optimize scroll performance by guaranteeing no `preventDefault()` call.

**Key lesson:** Always add `{ passive: true }` to scroll/touch listeners that don't call `preventDefault()`. It's a free performance win and browsers may warn without it.

### Light Theme Migration — Issues #25 & #26 (2026-04-10)

**Issue #25 — Remove glow shadows and SaaS patterns from Tiers:**
- Deleted `glow` and `glow-purple` boxShadow tokens from tailwind.config.ts
- Added `lift: '0 2px 24px oklch(0 0 0 / 0.35)'` as replacement elevation shadow
- Removed `scale-[1.02] md:scale-105` from featured tier card — scale transforms are SaaS patterns
- Removed `staggerChildren: 0.15` stagger variant from Tiers grid — cards now appear simultaneously
- Replaced `shadow-glow-purple` → `shadow-lift` on featured card
- Replaced `bg-gradient-aurora` → `bg-aurora-gold` (solid CTA) on featured tier button
- Updated Hero CTA `hover:shadow-glow` → `hover:shadow-lift`
- Replaced ALL `shadow-glow` references across Navbar, DestinationGrid, ConciergeForm, FloatingCTA

**Issue #26 — Full light color theme migration:**
- Replaced ALL OKLCH color tokens with hex values: aurora-bg (#f5f3f0), aurora-bg-light (#faf9f7), aurora-bg-dark (#f0ebe5), aurora-text (#2c2620), aurora-text-muted (#6b6458), aurora-border (#e8e4df), aurora-gold (#c9a76a), aurora-navy (#1a3a52), aurora-sage (#7a8f7f), aurora-success (#5a8f4a), aurora-error (#a85a4a)
- Changed `color-scheme: dark` → `color-scheme: light` in globals.css
- Simplified `.glass` utility — removed backdrop-blur, now solid #faf9f7 with #e8e4df border
- Updated `.animated-border` — gold/navy/sage conic gradient, no backdrop-blur
- Updated `::selection` for light theme (gold on cream)
- Updated gradients to use new gold/navy/sage palette
- Added `subtle` and `medium` shadow tokens for light-theme elevation hierarchy
- Updated 10 component files: Navbar, Hero, DestinationGrid, ExperienceList, Tiers, Testimonials, ConciergeForm, Footer, FloatingCTA, layout.tsx

**Key design decisions for photo-heavy components:**
- Hero and DestinationGrid keep dark scrims (`from-black/XX`) for text readability on photography — cinematic overlays are theme-independent
- Hero text uses `text-white` (not aurora-text) because it sits on dark photo backgrounds
- DestinationGrid card text uses `text-white` for same reason
- All CTA buttons switched from gradient to solid `bg-aurora-gold text-aurora-text` — dark text on gold passes WCAG AA (~5.5:1 contrast ratio)

**Token mapping reference:**
- aurora-dark → aurora-bg | aurora-darker → aurora-bg-dark
- aurora-white → aurora-text | aurora-white/60 → aurora-text-muted
- aurora-cyan → aurora-gold | aurora-purple → aurora-navy | aurora-magenta → aurora-sage
- aurora-glass → aurora-bg-light | aurora-glass-border → aurora-border
- shadow-glow → shadow-lift | shadow-glass → shadow-subtle

**Key lesson:** When migrating to a light theme, photo-heavy components (Hero, card grids) must retain dark scrims regardless of overall theme. The scrim color should be neutral black (not theme background) to ensure contrast on any photograph. This is a separation of concerns: page chrome follows theme, media overlays follow content.

### Font Switch — Space Grotesk + Inter (Issue #28)

**3 files, 6 edits. Build clean.**

**Task:** Replace Bodoni Moda (serif heading) + Libre Franklin (body sans) with Space Grotesk (geometric sans heading) + Inter (body sans) per luxurysite.md spec.

**Changes:**
- `layout.tsx`: Swapped imports and font configs. Variables now `--font-space-grotesk` and `--font-inter`.
- `globals.css`: Updated `@theme inline` block to map `--font-sans` → Inter, `--font-heading` → Space Grotesk. Updated body fallback. Recalibrated fluid type scale targets: h1→3rem, h2→2.25rem, h3→1.75rem, body→1rem, sm→0.875rem. Body line-height 1.7→1.6. Added 8px baseline spacing tokens (xs through 3xl).
- `tailwind.config.ts`: Heading fallback changed from `"Bodoni Moda", "Georgia", "serif"` to `"Space Grotesk", "system-ui", "sans-serif"`. Body fallback updated to Inter. Added 8px spacing tokens.

**Key lesson:** Moving from a serif heading font (Bodoni Moda) to a geometric sans (Space Grotesk) shifts the brand voice from editorial luxury toward modern tech-luxury. The type scale needed recalibration — Bodoni's high contrast and narrow letterforms read larger at same px size than Space Grotesk's even strokes. Fluid clamp() targets were reduced accordingly.

### Token Naming Audit — Issue #27 (2026-04-11)

**Status:** ✅ CLEAN — No stale dark-theme tokens found. Issue can be closed.

**Full audit of `apps/web/`:**

1. **`aurora-cyan`, `aurora-purple`, `aurora-magenta`** — zero references in entire codebase. These were fully replaced during the Wave 1 light-theme migration (Issue #26). No rename needed.

2. **`globals.css`** — all 11 CSS custom properties use semantic names (`--aurora-bg`, `--aurora-gold`, `--aurora-navy`, `--aurora-sage`, etc.) with hex values. No stale OKLCH color tokens.

3. **`tailwind.config.ts`** — all color tokens are semantic: `aurora-bg`, `aurora-bg-light`, `aurora-bg-dark`, `aurora-text`, `aurora-text-muted`, `aurora-border`, `aurora-gold`, `aurora-navy`, `aurora-sage`, `aurora-success`, `aurora-error`. Names accurately describe their light-theme roles.

4. **`bg-gradient-aurora`** — used in ConciergeForm.tsx (line 126) and Testimonials.tsx (line 77) as decorative `h-px` dividers at 30% opacity. The underlying gradient is `linear-gradient(135deg, #c9a76a, #1a3a52, #7a8f7f)` — correct gold/navy/sage light-theme palette. No change needed.

5. **`oklch` references** — only one: `lift` shadow in tailwind.config.ts uses `oklch(0 0 0 / 0.35)` (neutral black). This is functionally identical to `rgba(0,0,0,0.35)` — not a stale dark-theme color. Minor inconsistency with other shadows (which use `rgba()`), but not a token naming issue.

6. **Component files** — all 10 component files checked. All className strings reference current semantic tokens (`aurora-text`, `aurora-gold`, `aurora-border`, etc.). No stale references.

**Note:** Build has a pre-existing TypeScript error in `experiences.ts` (missing `regions` property) — unrelated to token naming. Filed separately.

### Issue #136: Hero Planner Dropdown Styling (2026-04-11)

**Problem:** Two native `<select>` elements in the hero concierge discovery row rendered browser-default dropdown panels — completely breaking the luxury control bar aesthetic.

**Fix:** Replaced both native `<select>` with a custom `LuxeSelect` component (inline in Hero.tsx). The component uses:
- `bg-white/90 backdrop-blur-md` + `border-aurora-border` + `shadow-glass` + `rounded-lg` for the dropdown panel — matches the parent control bar's glass treatment
- Aurora gold highlight for the selected option (`text-aurora-gold font-semibold bg-aurora-gold/8`)
- `bg-aurora-bg-dark` hover/active state for keyboard navigation
- Animated chevron (rotate-180 on open) with `text-aurora-text-muted`
- Framer Motion `AnimatePresence` for smooth open/close transitions (opacity + subtle y-shift)

**Accessibility:** Full keyboard support — ArrowUp/Down, Enter/Space to select, Escape to close, Home/End. ARIA: `role="combobox"` on trigger, `role="listbox"` on panel, `role="option"` on items, `aria-expanded`, `aria-activedescendant`, `aria-selected`. Click-outside-to-close via mousedown listener.

**Test fix:** Hero tests were pre-existing failures (framer-motion mock missing `useReducedMotion`). Added inline `jest.mock('framer-motion')` to Hero.test.tsx with all needed exports. Also updated stale headline assertion. All 5 tests now pass.

**Key files:**
- `apps/web/app/components/Hero.tsx` — LuxeSelect component + Hero
- `apps/web/app/components/__tests__/Hero.test.tsx` — fixed framer-motion mock
- `apps/web/app/__mocks__/framer-motion.tsx` — added useReducedMotion + motion.ul/h1/p
