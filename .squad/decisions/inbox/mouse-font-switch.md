# Decision: Switch Typography to Space Grotesk + Inter

**Author:** Mouse  
**Date:** 2026-04-10  
**Issue:** #28  
**Status:** Implemented  

## Context

The site migrated to a light theme. The existing serif/sans pairing (Bodoni Moda headings + Libre Franklin body) was chosen for an editorial dark-luxury aesthetic. The luxurysite.md spec calls for Space Grotesk + Inter — a modern geometric sans pairing better suited to the light, refined direction.

## Decision

Replace Bodoni Moda + Libre Franklin with Space Grotesk + Inter across all typography configuration.

### Font Roles
- **Space Grotesk** (headings, `--font-heading`): Geometric sans with personality — distinctive `a`, `g`, `R` forms. Weights 400–700.
- **Inter** (body, `--font-sans`): Highly optimized for screen readability. Weights 300–600.

### Type Scale Recalibration
Kept fluid `clamp()` approach but adjusted targets to match spec:
- h1: 48px (3rem), h2: 36px (2.25rem), h3: 28px (1.75rem)
- Body: 16px (1rem), Small: 14px (0.875rem)
- Body line-height reduced from 1.7 to 1.6 (sans-serif reads more open than serif at same leading)

### Spacing Baseline
Added 8px baseline spacing tokens: xs(8px), sm(12px), md(16px), lg(24px), xl(32px), 2xl(48px), 3xl(64px).

## Files Changed
- `apps/web/app/layout.tsx` — Font imports and CSS variable names
- `apps/web/app/globals.css` — @theme block, body fallback, type scale, spacing tokens
- `apps/web/tailwind.config.ts` — fontFamily fallbacks, spacing tokens

## Rationale

Space Grotesk + Inter is a contemporary pairing that reads as "modern precision" rather than "editorial tradition." Both fonts are Google Fonts with excellent CLS scores via `next/font`. The geometric character of Space Grotesk provides heading distinction without requiring a serif — cleaner on light backgrounds where serif stroke contrast can feel heavy.

## Impact

All `font-heading` and `font-sans` references across components continue to work unchanged — only the underlying font variable values changed. Build verified clean.
