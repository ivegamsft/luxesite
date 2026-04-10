# Project Context

- **Owner:** ivegamsft
- **Project:** Aurora Luxe Travel — a futuristic luxury travel website. Single-page (plus optional destination detail route) for a fictional ultra-premium concierge travel brand.
- **Stack:** Next.js (latest stable), TypeScript, Tailwind CSS, Framer Motion, next/image
- **Created:** 2026-04-10

## Team Updates

- **Monorepo Structure (2026-04-10):** App code moved to `apps/web/` (by Morpheus). All CI/CD and test runs now target `apps/web/` path. Backend/API apps can be added to `apps/` in future. See `.squad/decisions/decisions.md` for full rationale.
- **Playwright E2E Suite (2026-04-10):** Tank set up Playwright with Chromium, covering 8 sections + full-page screenshot. All 9/9 tests pass. This audit discovered P0 (sections invisible below hero due to Framer Motion opacity gating) and P1 (navbar clipping). Both issues now fixed in Trinity's UI fixes and animation visibility work.

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
