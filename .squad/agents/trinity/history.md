# Project Context

- **Owner:** ivegamsft
- **Project:** Aurora Luxe Travel — a futuristic luxury travel website. Single-page (plus optional destination detail route) for a fictional ultra-premium concierge travel brand.
- **Stack:** Next.js (latest stable), TypeScript, Tailwind CSS, Framer Motion, next/image
- **Created:** 2026-04-10

## Team Updates

- **Monorepo Structure (2026-04-10):** App code moved to `apps/web/` (by Morpheus). All CI/CD and test runs now target `apps/web/` path. Backend/API apps can be added to `apps/` in future. See `.squad/decisions/decisions.md` for full rationale.
- **Playwright E2E Suite (2026-04-10):** Tank set up Playwright with Chromium, covering 8 sections + full-page screenshot. All 9/9 tests pass. This audit discovered P0 (sections invisible below hero due to Framer Motion opacity gating) and P1 (navbar clipping). Both issues now fixed in Trinity's UI fixes and animation visibility work.
- **H2 Typography Scale Bump (2026-04-12):** Trinity bumped `--fluid-2xl` from 28-40px to 32-48px, strengthening H2 hierarchy across all 7 section headings. Single token change cascades automatically to all components. Commit 085c808.
- **Section Alignment & Footer Polish (2026-04-12):** Mouse standardized all section containers to `max-w-7xl` for horizontal heading alignment. FAQ and Testimonials containers adjusted accordingly. Footer now uses `pt-section-lg` with `border-t border-white/10` separator. Commits 2f351e8. Issues #249-252 resolved.

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->

- **Broken `sm` breakpoint (2026-04-10):** `tailwind.config.ts` had `sm: '375px'` in `extend.screens`, overriding the default 640px. All `sm:` responsive classes fired at phone widths instead of tablet. Only add truly custom screens (like `xs`) to extend — don't re-declare defaults unless you mean to override them.
- **`::selection` can't use gradients (2026-04-10):** CSS `::selection` only supports solid `background` colors. Applying `background-clip: text` to selection makes the highlight invisible. Use a flat accent color instead.
- **Sticky nav scroll offset (2026-04-10):** The 80px sticky navbar hides section headers when `scrollIntoView` fires. Fix with `scroll-margin-top` on target sections AND `scroll-padding-top` on html for belt-and-suspenders coverage.
- **`color-scheme: dark` matters (2026-04-10):** Without it, native form controls (select, number input, date picker) render with light OS defaults on the dark background. One line in globals.css fixes all of them.
- **Tier card scale overflow (2026-04-10):** `scale-110` on a grid child overflows its cell and overlaps neighbors when the gap is smaller than the scaled overflow. Keep featured card scale modest (≤105%) and add `z-10` for proper stacking.
- **Hero parallax via refs, not state (2026-04-10):** Scroll-driven transforms should bypass React re-renders. Use `useRef` for the DOM element, `requestAnimationFrame` for throttling, and mutate `el.style` directly. Zero re-renders on scroll.
- **Framer Motion opacity gating kills SSR/screenshots (2026-04-10):** `initial={{ opacity: 0 }}` with `whileInView` makes content invisible on SSR, full-page screenshots, no-JS clients, and SEO crawlers — the IntersectionObserver never fires. Fix: set `hidden` variant to `{ opacity: 1, y: 20 }` so content is always visible and the animation is a subtle slide-up (progressive enhancement). Never gate content visibility behind a scroll-triggered animation.
- **Hover-only overlays need tap fallback (2026-04-10):** `group-hover:opacity-100` is invisible on touch devices. Add `useState` toggle on click, `tabIndex={0}` + `role="button"` + `aria-expanded` for keyboard/screen reader support, and `focus-within:opacity-100` as CSS fallback.
- **Form errors need aria-live (2026-04-10):** Visual error messages aren't announced to screen readers. Add `aria-live="polite"` container, `aria-describedby` on each input linking to its error's `id`.
- **Gradient text banned (2026-04-10):** `bg-gradient-aurora bg-clip-text text-transparent` on headings causes readability issues. Use solid `text-aurora-white` instead. Gradients OK for decorative elements (dividers, badges) but not text.
- **OKLCH for selection colors (2026-04-10):** Mouse is moving palette to OKLCH. `::selection` now uses `oklch()` values. Keep aligned with the OKLCH migration.
- **Touch targets need invisible padding wrappers (2026-04-10):** WCAG requires 44px minimum touch targets. Small visual elements (nav dots, toggles) should use a transparent button wrapper with `min-w-[44px] min-h-[44px]` + flex centering, keeping the visual dot small inside.
- **AnimatePresence for conditional renders (2026-04-10):** Any conditionally rendered UI in a motion-rich site should use Framer Motion's `AnimatePresence` + `motion.div` with exit animations. Instant appear/disappear is jarring.
- **useReducedMotion must cover Framer Motion (2026-04-10):** CSS `prefers-reduced-motion` only handles CSS animations. Every Framer Motion `initial`/`animate`/`exit` must also check `useReducedMotion()` and skip animation when true (set initial === animate).
- **Container queries for component responsiveness (2026-04-10):** Use `@container` on grid parents with CSS `container-type: inline-size` for card-level layout adaptation. Component should respond to its container, not the viewport.
- **Differentiate hover behavior per card type (2026-04-10):** Uniform `hover:-translate-y-1` across all cards feels mechanical. Lift for destination discovery, glow/brighten for experience cards, border highlight for tier cards. Each interaction should match the card's purpose.
- **`rounded-lgpx-4` class typo (2026-04-10):** Missing space between `rounded-lg` and `px-4` in ConciergeForm inputs produced `rounded-lgpx-4` — an invalid Tailwind class that silently fails. No border radius or horizontal padding rendered. Always visually verify generated class strings in form-heavy components.
- **Select dropdown readability on dark themes (2026-04-10):** Native `<select>` options ignore `bg-aurora-glass` (transparent/backdrop-blur) on most browsers. Options need a solid opaque background via `[&>option]:bg-[oklch(...)]` utility. Glass backgrounds are for containers, not native form dropdowns.
- **Inline confirmation > toast for high-value forms (2026-04-10):** A toast notification is proportionally wrong for a $50K+ concierge form. Replace with an inline confirmation panel that stays visible, shows "what happens next" info, and reassures on privacy. Keep form data in state so the confirmation can use the user's name.
- **onBlur validation for required fields (2026-04-10):** Don't make users fill 7+ fields before discovering errors. Add `onBlur` validation on required fields (name, email) and clear errors on `onChange` for immediate feedback.
- **One h1 per page (2026-04-10):** Multiple `<h1>` tags break WCAG heading hierarchy and harm SEO. Brand names in navbars should use `<span>` with visual styling, not semantic heading tags.
- **Consistent CTA labels (2026-04-10):** Different labels for the same action ("Request Itinerary", "Design My Trip", "Send Request") create cognitive friction. Unify primary CTAs across navbar, floating button, and hero to one label. Form submit can be slightly different but should echo the primary verb.
- **Gradient button text contrast (2026-04-10):** Dark text (`oklch(0.15)`) on `bg-gradient-aurora` fails WCAG AA on the bordeaux middle section (`oklch(0.42)` — only ~2.5:1 ratio). Light text (`text-aurora-white` at `oklch(0.95)`) passes against all gradient stops. Always check contrast at the darkest point of a gradient, not the lightest.
- **Infinite decorative animations read as restless (2026-04-10):** Background pulses and floating scroll indicators that loop forever feel anxious on a luxury site. Prefer one-shot animations with `animation-iteration-count: 1` and a delay, or remove the animation entirely for static elements.
- **Type scale consolidation (2026-04-10):** Merged 8-step fluid type scale down to 6 (sm, base, lg, xl, 2xl, 3xl). The 3xl step now covers display/hero use via a wider clamp range. Fewer steps = more consistent hierarchy.

- **CTA honesty over guide detail pages (2026-04-10):** When guide cards link to #contact (no detail pages exist), use action-oriented CTAs like "Plan Your Journey" or "Start planning with our team" instead of "Read Guide" or "Meet all specialists". The CTA text must honestly describe where the link goes.
- **Mobile-only affordance for tap-interactive cards (2026-04-10):** Desktop cards have hover overlays that signal interactivity. Mobile doesn't. Use `md:hidden` on "Tap to explore" hints so they only appear on touch/mobile, and use a finite animation (3 iterations) to avoid restless loops.
- **tabIndex={0} on tabpanels (2026-04-10):** WAI-ARIA tabs pattern requires `role="tabpanel"`, `aria-labelledby`, AND `tabIndex={0}` on the content container so keyboard users can tab into the panel content.
- **Eager loading for near-fold images (2026-04-10):** Mid-page images using `loading="lazy"` may never render in headless/SSR contexts because the IntersectionObserver never triggers. Use `loading="eager"` for the first few images in each grid (index < 3–6) and keep lazy only for truly below-fold content.
- **Always add fallback bg to image containers (2026-04-10):** When Unsplash or any CDN fails, `next/image` shows a blank rectangle. Adding `bg-aurora-bg-dark` (or `bg-aurora-navy` for hero) to the parent container ensures a styled placeholder instead of nothing.
- **Dead design tokens create confusion (2026-04-10):** `aurora-sage` was defined in tailwind.config.ts but never used in any component — only its hex value appeared in gradient definitions. Remove unused tokens to keep the design system honest.
- **Nav collapse breakpoint must cover tablets (2026-04-12):** `md:` (768px) is too low for the desktop nav breakpoint — at tablet widths (768–1024px) nav items + CTA overflow and crowd. Use `lg:` (1024px) so the hamburger menu covers all tablet viewports (iPad Air 820px, iPad Mini 768px). For luxury sites, collapse earlier rather than later to keep things feeling premium.
- **Footer top padding should use spacing tokens (2026-04-10):** Fixed `pt-20` → `pt-section-sm` to use the design system's fluid spacing scale. Footer column headings and link lists had inconsistent margins (mb-4 vs mb-5, space-y-2 vs space-y-3) — normalized to mb-6 and space-y-3 across all columns.
- **Form container padding needs responsive scale (2026-04-10):** ConciergeForm's `p-5 sm:p-6 md:p-8` felt compressed at every breakpoint. Expanded to `p-6 sm:p-8 md:p-10 lg:p-12` with `space-y-8` field gaps for premium breathing room. Section-level padding also added `lg:px-12` to match other sections.
- **Design system freezes during content pivots (2026-04-11):** When a business pivots what it sells (travel → experiences), the visual identity (colors, type, spacing, shadows) stays frozen. Only component patterns and content change. Resist the urge to add category-specific colors — icon + typography differentiate categories without palette bloat. Wrote `spec/design-system-update.md` for Issue #196.
- **Reuse before creation (2026-04-11):** Before adding new CSS utilities, check existing globals.css patterns. `.surface-card`, `.scrollbar-hide`, `bounceX` keyframe, `editorial-divider`, and `section-break` all predate the pivot and remain usable. New CSS classes should be minimal additions, not replacements.
- **Tailwind v4 CSS-first approach (2026-04-11):** With `@theme inline` in globals.css as the source of truth for Tailwind v4, avoid duplicating tokens in `tailwind.config.ts`. The config already mirrors globals.css — adding more entries creates maintenance debt. CSS custom properties in globals.css are the canonical location.
- **H2 type scale bump for luxury hierarchy (2026-04-12):** `--fluid-2xl` was 28-40px — only 1.75x body at mobile. Bumped to `clamp(2rem, 1.5rem + 2.5vw, 3rem)` = 32-48px (2-3x body). All 7 section H2s inherit the change via `text-fluid-2xl`. The scale now has clear steps: body 16px → lg 18-22px → xl 22-30px → 2xl 32-48px → 3xl 36-56px. Minimum 1.33x ratio between adjacent levels at all viewports.
- **404 page uses brand tokens, not layout shell (2026-04-12):** The not-found page is a standalone page (no shared nav/footer) so it manually applies `bg-aurora-bg`, `font-heading`, and brand colors. Uses `rounded-lg` on the CTA button per design system decisions. Gold CTA transitions to navy on hover for visual hierarchy.

## Session Activity

### Impeccable Audit Fixes (2026-04-10T03:42:01Z–03:42:02Z)

**Session:** ivegamsft requested full audit fix  
**Status:** ✅ COMPLETE  
**Orchestration Logs:**
- Round 1 (03:42:01Z): `.squad/orchestration-log/2026-04-10T03-42-01Z-trinity-round1.md`
- Round 2 (03:42:02Z): `.squad/orchestration-log/2026-04-10T03-42-02Z-trinity-round2.md`

**Round 1 Scope:** Gradient text removal, scroll throttling, keyboard/touch accessibility, aria-live regions, line-length caps.

**Round 2 Scope:** Applied fluid typography tokens (text-fluid-*) across all 7 components, applied section spacing tokens (py-section-*), broke grid monotony with masonry/editorial/carousel layouts, left-aligned select headings.

Build and tests pass; all 18 audit findings resolved across visual system and components.

## Cross-Agent Coordination

### Mouse Design Polish (2026-04-10T04:30:00Z)

Mouse completed P0+P1+P2 design aesthetics fixes in parallel with Trinity frontend fixes:
- **Corner radius hierarchy:** Cards `rounded-sm`, buttons `rounded-lg`, pills `rounded-full` (replaces uniform `rounded-2xl`)
- **SVG icons:** Monoline icons replace emoji in ExperienceList (premium editorial aesthetic)
- **Hero copy rewrite:** Atmospheric 9-word subtext ("Private shores. Unmarked airstrips. Tables that don't take reservations.") replaces AI clichés
- **Price typographic redesign:** Bodoni Moda typography replaces gradient pills (editorial restraint)
- **Aurora blob removal:** Vignette replaces floating gradient blob (eliminates #1 AI hero tell)
- **Section intro variety:** Each section unique heading/subtitle treatment (breaks formulaic template)
- **Branded error color:** `aurora-error: oklch(0.65 0.20 25)` added to OKLCH system

**Complementary scope:** Mouse's design aesthetics (P0+P1+P2) + Trinity's frontend quality (P0+P1) = complete pass. No conflicts. Build verified clean.

**Design audit projection:** Score improves from 48/80 → ~65/80 with both teams' fixes applied.

### GitHub Issue Fixes — #2 (EUR→USD), #4 (dropdown), #8 (button) (2026-04-10T05:08:21Z)

**Parallel Sprint:** Mouse + Trinity GitHub Issues Sweep  
**Status:** ✅ COMPLETE  
**Orchestration Log:** `.squad/orchestration-log/2026-04-10T05-08-21Z-trinity.md`

Fixed issues #2, #4, and #8 as part of larger 5-issue sweep. All changes committed as `1bad133` with all issues now closed on GitHub.

**Issue #2 — Currency EUR → USD:** Global conversion across `tiers.ts`, `destinations.ts`, and `ConciergeForm.tsx`. All prices now display in USD (Silver $25k, Black $75k, Obsidian $200k).

**Issue #4 — Budget Dropdown + Form Input Typo:** 
- Select styling changed from `bg-aurora-glass` (transparent, ignored by native browsers) to solid `bg-[oklch(0.15_0.015_50)]`
- Added explicit option styling: `[&>option]:bg-[oklch(0.15_0.015_50)] [&>option]:text-[oklch(0.95_0.012_85)]`
- Fixed class name typo: `rounded-lgpx-4` → `rounded-lg px-4` across 5 form inputs. Missing space caused both Tailwind classes to silently fail (no border-radius or padding rendered).

**Issue #8 — Submit Button Affordance & Contrast:**
- Added `cursor-pointer`, `active:scale-[0.98]` for press feedback
- Changed `text-aurora-dark` → `text-aurora-white` (dark text failed WCAG AA on gradient's bordeaux midpoint)
- Added `focus:ring-offset-2 focus:ring-offset-aurora-dark` for keyboard focus visibility

**Key pattern:** Native form controls need solid backgrounds (not glass). Gradient button text must be light for contrast at darkest gradient point.

### Issues #24 + #29 — Hero Left-Align & Motion Simplification (2026-04-10)

**Status:** ✅ COMPLETE

**Issue #24 — Hero editorial left-alignment:**
- Section: `justify-center` → `justify-start lg:pl-12 xl:pl-20`
- Content container: `text-center` → `text-left`, added `lg:max-w-[50%]`
- Removed `mx-auto` from subtext paragraph
- CTA buttons: `justify-center` → `justify-start`
- Scroll indicator unchanged (absolute positioned, independent)

**Issue #29 — Motion system simplification:**
- Hero: Removed parallax scroll effect (useEffect, useCallback, 3 refs), aurora gradient overlay, noise texture overlay
- Hero + AnimatedSection: Simplified to opacity-only fade-in (no translateY), 600ms duration, easeOut
- AnimatedSection: viewport trigger changed from `margin: '-100px'` to `amount: 0.8` (80% visible)
- tailwind.config: Removed `aurora-pulse`, `shimmer`, `float` keyframes + animations (kept `scroll-hint`)
- Fixed Hero test referencing removed `.animate-float` class

## Learnings

- **Opacity-only transitions feel calmer (2026-04-10):** Removing translateY from scroll-triggered animations eliminates the "slide deck" feel. Opacity fade alone reads as editorial — content appears, it doesn't bounce into view. Better for luxury tone.
- **Parallax costs more than it gives (2026-04-10):** The ref-based parallax in Hero added complexity (3 refs, useCallback, rAF loop, scroll listener) for a subtle effect that competed with the editorial layout. Removing it simplified the component from 36 lines of hooks to 1 line (`useReducedMotion`).
- **viewport `amount` vs `margin` (2026-04-10):** Framer Motion's `viewport.amount: 0.8` triggers when 80% of the element is visible — more predictable than negative margin offsets. Better for above-the-fold content that should appear as you approach it.

### Wave 2 — Light Theme Navbar, Hero Redesign, FloatingCTA Removal (2026-04-10)

**Status:** ✅ COMPLETE

**Issue #30 — Navbar light theme:**
- Replaced `glass` class with `bg-white/90 backdrop-blur-sm` for light frosted-glass sticky nav
- Added `border-b border-[#e8e4df]` bottom separator
- All nav text now `text-[#2c2620]` (dark); hover/active use `text-[#c9a76a]` (gold)
- Nav links: ALL-CAPS with `uppercase tracking-wider text-xs font-medium`
- Active indicator: gold underline (kept existing `underline decoration-2 underline-offset-4`)
- CTA: "Request Consultation" with `bg-[#c9a76a] text-white`
- Mobile menu: solid `bg-white` with `border-[#e8e4df]`, dark text
- Logo: `text-[#2c2620]`
- All focus rings updated to use white offsets instead of dark

**Issue #32 — Hero redesign (light, image-centric):**
- Removed dark vignette (`from-black via-black/40`), replaced with `bg-white/15` overlay
- Removed `opacity-40` from background image (now full brightness)
- Headline: "Award-Winning Travel Specialists Designing Bespoke Journeys"
- Subhead: "Hand-curated experiences. 24/7 concierge. Journeys tailored to you alone."
- All text now `text-[#2c2620]` (dark on light overlay)
- Primary CTA: "Request Consultation" → `bg-[#c9a76a] text-white`, scrolls to #contact
- Secondary CTA: "Explore Destinations" → outlined with `border-[#2c2620]/30`, scrolls to #destinations
- Added concierge discovery row (md+ only): two `<select>` elements (destination + timing) + "Discuss with a specialist →" button, frosted white background
- Scroll indicator: updated to dark color `text-[#2c2620]/50`

**Issue #41 — FloatingCTA removal:**
- Deleted `FloatingCTA.tsx`
- Removed import and `<FloatingCTA />` from `page.tsx`

**Tests updated:** Hero unit test (new headline + CTA text), E2E spec (new headline + CTA text). Build verified clean.

## Learnings

- **Concierge discovery as progressive disclosure (2026-04-10):** A 3-part inline row (where/when/action) in the hero gives users a quick entry point without overwhelming the page. Hidden on mobile (too cramped) — mobile users get the CTAs instead.
- **White overlay > dark vignette for light themes (2026-04-10):** A subtle `bg-white/15` overlay on a bright photo creates enough contrast for dark text while preserving the image's color vibrancy. Dark vignettes made the hero feel heavy and moody; white overlay feels open and editorial.
- **Consistent CTA label across components (2026-04-10):** Unified primary CTA to "Request Consultation" across navbar, hero, and mobile menu. Eliminates cognitive friction from label variation ("Design My Trip" vs "Request Itinerary" etc.).

### Wave 3 — Issues #36, #39, #40, #43 (2026-04-10)

**Status:** ✅ COMPLETE

**Issue #36 — ConciergeForm overhaul for light theme:**
- Headline → "Ready to Start Planning?", subtitle updated
- Trust badge added above form: "✓ 4.9/5 on Trustpilot · 1,000+ journeys designed"
- Submit button: "Request Consultation", `bg-aurora-gold text-white`
- Inputs: `bg-white`, `border-aurora-border`, `focus:ring-2 focus:ring-aurora-gold/50`
- Textarea: `maxLength={500}` + live character counter (X/500)
- Success: replaced full-page state with auto-dismissing toast + form reset
- Container: `bg-aurora-bg`, `rounded-lg`, responsive padding (p-5/p-6/p-8)

**Issue #39 — Footer enhancement:**
- 4-column grid: Brand | Destinations | Company | Contact
- Background: `bg-aurora-navy text-white` for visual differentiation
- Contact info: phone "+1 (888) 200-LUXE", email "concierge@auroraluxe.com"
- Removed navLinks import; inline data for footer-specific links

**Issue #40 — SEO metadata update:**
- Title: "Aurora Luxe Travel | Award-Winning Private Travel Specialists"
- Description: "Bespoke luxury travel by specialists..."
- Keywords updated per spec; OG and Twitter cards match

**Issue #43 — Page section order:**
- Added imports: TrustBar, WhyAurora, GuideGrid, PressAwards
- New order: Navbar → Hero → TrustBar → WhyAurora → DestinationGrid → ExperienceList → GuideGrid → Tiers → Testimonials → PressAwards → ConciergeForm → Footer

Build verified clean.

### Wave 4 — Issues #45, #47 (2026-04-10)

**Status:** ✅ COMPLETE

**Issue #45 — Hero discovery row wiring to ConciergeForm:**
- Hero.tsx: Added `useState` for `selectedDest` and `selectedTiming`, converted selects from `defaultValue` to controlled components
- Hero.tsx: `handleRequestConsultation` now dispatches `CustomEvent('hero-discovery')` with `{ destination, timing }` detail before scrolling to #contact
- ConciergeForm.tsx: Added `useEffect` listener for `hero-discovery` event
- Pre-fill mapping: destination → matching interest tags (e.g. maldives → "Beach & Islands"), timing → travelDates field, both → notes textarea as fallback
- Added gold-tinted prefill banner ("✦ We've pre-filled some details from your selection above.") with 5s auto-dismiss
- Pattern: custom event decoupling — no prop drilling, no shared state, both components remain independent

**Issue #47 — Destination grid region filtering:**
- DestinationGrid.tsx: Derived unique regions from destinations data with `useMemo`, producing tab objects with counts
- Added tab bar (role="tablist") with "All (14)" + per-region tabs e.g. "Indian Ocean (2)", "Europe (1)"
- Default "All" tab shows first 6 destinations with "View All Destinations (14)" expand button
- Region-specific tabs show all destinations in that region (no gating)
- Featured card (`col-span-2 row-span-2`) always applies to index 0 of visible set
- Added `AnimatePresence mode="wait"` with opacity fade (0.25s) on tab switch
- All transitions respect `useReducedMotion`

Build verified clean.

### Issues #137, #138, #140 — Tiers/FAQ spacing, FAQ width, Carousel pagination (2026-04-10)

**Status:** ✅ COMPLETE

**Issue #137 — Tiers-to-FAQ section spacing:**
- Tiers section: replaced `py-section-lg` with `pt-section-lg pb-[calc(var(--space-section-lg)*1.25)]` for 25% extra bottom breathing room

**Issue #138 — FAQ content width:**
- Widened FAQ container from `max-w-3xl` (768px) to `max-w-5xl` (1024px)

**Issue #140 — Carousel page indicators:**
- Replaced per-card dots with per-page dots that dynamically reflect visible cards
- `totalPages = totalCards - visibleCount + 1`; active dot tracks scroll page, not card index

Build verified clean.

## Learnings

- **Carousel dots should represent pages, not items (2026-04-10):** One dot per card is misleading when multiple cards are visible. Compute `visibleCount` from `clientWidth`, then `totalPages = totalCards - visibleCount + 1`.
- **Section spacing multipliers via calc() (2026-04-10):** Use `calc(var(--space-section-lg)*1.25)` to add proportional breathing room between sections, keeping spacing fluid.
- **Freeform date fields need semantic validation, not format enforcement (2026-04-10):** For luxury concierge forms where "March 2025", "Next spring", and "Flexible" are all valid inputs, don't use `type="date"` or strict format patterns. Instead validate that the value contains at least some alphabetic characters (rejects "123!!") and meets a minimum length. Helper text ("A rough timeframe is fine") sets expectations without creating friction.

### Issues #146, #112, #148 — Date validation, form friction, skip-to-content (2026-04-10)

**Status:** ✅ COMPLETE

**Issue #148 — Skip-to-content (WCAG 2.4.1):**
- Already implemented in previous waves: `<a href="#main-content">` in layout.tsx with sr-only + focus styles, `id="main-content"` on `<main>` in page.tsx. No changes needed.

**Issue #112 — Form friction reduction:**
- Already addressed in Wave 3 (#36): form has 3 core fields (name, email, dream trip textarea) + collapsible "Share more details" optional section. Polished: increased textarea to 4 rows, more evocative placeholder ("A week in the Maldives for our anniversary…"), label updated to "Tell us about your dream trip".

**Issue #146 — Travel dates validation:**
- Added `validateTravelDates()` — rejects strings under 3 chars or purely numeric/symbol input
- Added `onBlur` validation for the travelDates field
- Added `onChange` error clearing for immediate feedback
- Added `aria-invalid` + `aria-describedby` for accessibility
- Added helper text: "A rough timeframe is fine — exact dates aren't needed yet."
- Error messages are conversational: 'Try something like "March 2025" or "Flexible — sometime this summer"'

Build verified clean.

### Design System Update Spec (2026-04-11, #196)

**Status:** ✅ COMPLETE

Authored comprehensive design system spec for the experience category pivot. Key decisions:

**No Category Accent Colors:** All 6 new categories (Voyages, Celebrations, Adventures, Productions, Junior, Bespoke) use existing `aurora-navy` + `aurora-gold` palette. Icon + typography differentiate categories. Rejected muted tints per category (decorative bloat violating Design Principle #1).

**Visual Identity Frozen:** Brand colors, typography (Space Grotesk + Inter), spacing, and shadows remain unchanged during the pivot. Only component patterns and content evolve.

**3 New CSS Utilities:** `.category-pill`, `.experience-card`, `.featured-experience-card` for consistent styling during migration.

**6 Category Icons:** Monoline SVGs (24×24, stroke-only, currentColor) for Voyages, Celebrations, Adventures, Productions, Junior, Bespoke.

**Motion Specs:** All animations respect `useReducedMotion()`. No reduced-motion bypass.

### Issues #232–#235 Batch (2026-04-12T03:05:00Z)

**Status:** ✅ COMPLETE  
**Issues:** #232 (typography), #233 (spacing), #234 (contrast), #235 (content)  
**Orchestration Log:** `.squad/orchestration-log/2026-04-12T03-05-trinity.md`  
**Commit:** 7dc22ae

**Issue #232 — Typography Consistency:** Unified h2/h3 font weights and line heights across Hero, Sections, and Cards to Space Grotesk medium (500).

**Issue #233 — Section Spacing:** Increased all `py-section-*` tokens by ~20% for premium breathing room. Applied across Hero, FAQ, ConciergeForm, Tiers.

**Issue #234 — WCAG AA Contrast on Gold Buttons:** 
- Added `aurora-gold-accessible` (#7a6532) design token
- Replaced `text-white` on gold backgrounds with `text-aurora-text` (dark text)
- Applied to: Hero CTA, Navbar active pills, DestinationGrid interactive elements, ConciergeForm primary button, Tiers section CTA
- Result: Gold (#c9a76a) + dark text = 5.7:1 contrast ratio ✅ WCAG AA/AAA

**Issue #235 — CTA Content & Component Balance:** Updated button labels and internal component spacing for consistency across CTAs.

**Verification:**
- Jest: 43/43 passing
- Build: Clean, no warnings
- WCAG Compliance: All interactive elements meet AA contrast
- Decision captured: "Dual Gold Color Tokens for WCAG AA Compliance" in `.squad/decisions/decisions.md`

**Coordination:** Dozer's security spec and Morpheus's documentation spec both reference this design system. No conflicts — all decisions align at the visual identity and governance layer.

## Cross-Agent Impact (Wave 1 Specs)

### Impact from Dozer Security Spec
- CSP `style-src 'unsafe-inline'` needed for Tailwind CSS builds — design system must remain production-grade even when Phase 1 security headers are added to `next.config.js`
- PII in consultation form requires encryption at rest — ConciergeForm design includes trust badges acknowledging security ("Trustpilot badge + privacy assurance")

### Impact from Morpheus Documentation Spec
- All design decisions (color tokens, icon system, motion specs) documented with teaching rationale in component JSDoc and inline comments
- Visual identity frozen = teaching point about stability during product pivots
- Content voice guardrails apply to category names and marketing copy



## Learnings

### Tier Restructure and Pricing Update (2026-04-11)

Restructured pricing tiers from travel memberships (Silver/Black/Obsidian) to event planning services:
- **One Time** (,000) — single event experiences
- **Yearly** (,200,000/year) — annual subscription for up to 12 events
- **Gift** (,000) — gift experience cards

Puffed up all pricing to absurdly expensive levels (~10x increase):
- Destination prices: ,000 - ,000 range
- Budget ranges in forms updated to match

Files changed:
- pps/web/app/data/tiers.ts — completely rewrote tier data, perks, and pricing
- pps/web/app/data/destinations.ts — multiplied all prices by 10x
- pps/web/app/components/ConciergeForm.tsx — updated budget ranges and tierBudgetMap
- pps/web/app/components/FAQ.tsx — rewrote tier and pricing FAQs
- pps/web/app/components/__tests__/Tiers.test.tsx — updated tier names and price expectations
- pps/web/app/components/__tests__/DestinationGrid.test.tsx — updated price expectations

All tests pass (43/43). Build successful.

### Contrast & Spacing Pass (2026-04-11)

**Status:** ✅ COMPLETE

**Contrast fixes — `bg-aurora-gold text-white` fails WCAG AA (~2.4:1):**
Gold `#c9a76a` is too light for white text. Changed all gold-background buttons/pills to `text-aurora-text` (#2c2620) which achieves ~5.7:1 contrast ratio (passes AA). Affected components:
- Hero.tsx — primary CTA button
- Navbar.tsx — desktop + mobile CTA buttons
- DestinationGrid.tsx — active region filter tab
- ConciergeForm.tsx — submit button + selected interest pills
- Tiers.tsx — featured tier CTA button

Also fixed Tiers.tsx "View full details" links: `text-white/60` on light card backgrounds → `text-aurora-text-muted`.

**Spacing increases for luxury breathing room:**
- `--space-section-lg`: 5rem/10rem → 6rem/12rem (clamp)
- `--space-section-md`: 4rem/8rem → 5rem/10rem (clamp)
- `--space-section-sm`: 3rem/6rem → 3.5rem/7rem (clamp)
- `.section-break` padding: 1.5rem/3rem → 2.5rem/5rem; divider height: 2rem/4rem → 2.5rem/5rem
- FAQ + ConciergeForm promoted from `py-section-md` to `py-section-lg`

43/43 tests pass. Build clean.

## Learnings

- **Gold buttons need dark text (2026-04-11):** `#c9a76a` (champagne gold) has ~0.38 relative luminance — too bright for white text (2.4:1). Dark text `#2c2620` on gold achieves 5.7:1. Always check contrast at the actual button background color, not the section background.
- **Section spacing tokens need luxury margins (2026-04-11):** Minimum 6rem (96px) base for major sections on mobile, scaling to 12rem (192px) on desktop. Section breaks between content blocks should add at least 2.5rem padding with proportional divider height. Luxury = generous whitespace.

### Contrast & Spacing Polish (2026-04-11T23:20:15Z)

**Session:** Post-pivot quality assurance  
**Status:** ✅ COMPLETE  
**Orchestration Log:** `.squad/orchestration-log/2026-04-11T23-20-15Z-trinity.md`

Fixed WCAG AA contrast on all gold buttons (changed `text-white` → `text-aurora-text` for 5.7:1 ratio) across Hero, Navbar, DestinationGrid, ConciergeForm, and Tiers. Increased section spacing tokens by ~20% (py-section-* bumped, FAQ/ConciergeForm promoted to py-section-lg). All 43 Jest tests pass; build clean. 

**Note:** This history file has grown to ~29KB (254 lines). Archive old session logs when adding future entries to keep file manageable.

### Issues #232–#235 — Typography, Spacing, Contrast, Content (2026-04-11)

**Status:** ✅ COMPLETE

**Issue #232 — Fluid type scale hierarchy at 375px:**
- Widened clamp() min values: `--fluid-lg` 1.25→1.125rem, `--fluid-xl` 1.5→1.375rem, `--fluid-3xl` 3→2.25rem
- At 375px, h1/h2/h3 now have clear visual separation instead of compressing to near-identical sizes

**Issue #233 — Adult-only content language:**
- destinations.ts: "cocktail receptions" → "elegant receptions"
- testimonials.ts: "a cocktail lounge for the adults" → "a lounge for the adults"
- faqs.ts: "adult galas" → "formal galas"

**Issue #234 — Section spacing on mobile:**
- Reduced clamp() minimums: section-lg 6→4rem, section-md 5→3rem, section-sm 3.5→2rem, section-xs 2.5→1.5rem
- Added responsive spacing classes `py-section-md sm:py-section-lg` on WhyAurora, DestinationGrid, ExperienceList, Testimonials, GuideGrid
- Reduced `.section-break` padding minimum from 2.5rem to 1.5rem

**Issue #235 — Gold text contrast on light backgrounds:**
- Added `aurora-gold-accessible` (#7a6532) token in globals.css `@theme inline` + tailwind.config.ts
- Swapped `text-aurora-gold` → `text-aurora-gold-accessible` for all text-on-light-bg instances across 9 components
- Original `text-aurora-gold` preserved for dark backgrounds (navy overlays) and decorative borders/backgrounds
- Fixed `text-white/50` → `text-white/70` in Tiers.tsx for navy background contrast

Build: ✅ (Next.js 16.2.3). Tests: ✅ 43/43 pass.

## Learnings

- **Two gold tokens for contrast (2026-04-11):** `aurora-gold` (#c9a76a) for decorative use (borders, backgrounds, text on dark bg) and `aurora-gold-accessible` (#7a6532) for text on light backgrounds. The accessible variant achieves ~4.5:1 on #faf9f7 (WCAG AA). Never use original gold for text on any aurora-bg-* surface.
- **Section spacing needs responsive tiers (2026-04-11):** Generous desktop spacing (12rem) compresses poorly on mobile via clamp() alone. Use `py-section-md sm:py-section-lg` pattern to pick appropriate spacing per breakpoint tier, rather than relying on a single clamp() to serve both 375px and 1440px.
