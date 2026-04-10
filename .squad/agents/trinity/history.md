# Project Context

- **Owner:** ivegamsft
- **Project:** Aurora Luxe Travel — a futuristic luxury travel website. Single-page (plus optional destination detail route) for a fictional ultra-premium concierge travel brand.
- **Stack:** Next.js (latest stable), TypeScript, Tailwind CSS, Framer Motion, next/image
- **Created:** 2026-04-10

## Team Updates

- **Monorepo Structure (2026-04-10):** App code moved to `apps/web/` (by Morpheus). All CI/CD and test runs now target `apps/web/` path. Backend/API apps can be added to `apps/` in future. See `.squad/decisions/decisions.md` for full rationale.

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->

- **Broken `sm` breakpoint (2026-04-10):** `tailwind.config.ts` had `sm: '375px'` in `extend.screens`, overriding the default 640px. All `sm:` responsive classes fired at phone widths instead of tablet. Only add truly custom screens (like `xs`) to extend — don't re-declare defaults unless you mean to override them.
- **`::selection` can't use gradients (2026-04-10):** CSS `::selection` only supports solid `background` colors. Applying `background-clip: text` to selection makes the highlight invisible. Use a flat accent color instead.
- **Sticky nav scroll offset (2026-04-10):** The 80px sticky navbar hides section headers when `scrollIntoView` fires. Fix with `scroll-margin-top` on target sections AND `scroll-padding-top` on html for belt-and-suspenders coverage.
- **`color-scheme: dark` matters (2026-04-10):** Without it, native form controls (select, number input, date picker) render with light OS defaults on the dark background. One line in globals.css fixes all of them.
- **Tier card scale overflow (2026-04-10):** `scale-110` on a grid child overflows its cell and overlaps neighbors when the gap is smaller than the scaled overflow. Keep featured card scale modest (≤105%) and add `z-10` for proper stacking.
