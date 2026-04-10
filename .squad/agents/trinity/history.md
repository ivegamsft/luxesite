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
