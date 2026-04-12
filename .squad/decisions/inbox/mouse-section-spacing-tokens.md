# Decision: Rebalance Section Spacing Tokens

**Author:** Mouse
**Date:** 2026-04-12
**Status:** Proposed

## Context

Section spacing tokens (`--space-section-lg` through `--space-section-xs`) in `globals.css` were too generous. Because every section uses symmetric `py-section-*` padding, adjacent sections stack their bottom + top padding, producing combined gaps of 128-224px on desktop — nearly double the 80-120px industry standard.

## Decision

Reduce all four section spacing tokens so that stacked `py-section-lg` sections produce ~80-120px combined gaps on desktop, with tighter mobile/tablet values:

```css
--space-section-lg: clamp(1.75rem, 1.25rem + 2.5vw, 3.75rem);  /* 28→60px */
--space-section-md: clamp(1.25rem, 0.875rem + 2vw, 2.75rem);   /* 20→44px */
--space-section-sm: clamp(1rem, 0.625rem + 1.5vw, 2rem);       /* 16→32px */
--space-section-xs: clamp(0.75rem, 0.5rem + 1vw, 1.5rem);      /* 12→24px */
```

Hero spacing (`--space-hero`) is unchanged — it's intentionally cinematic.

## Rationale

- Stacked gaps now hit 80-120px on desktop (luxury standard)
- Mobile gaps are 32-56px — comfortable but not wasteful
- All 8 affected components reviewed: internal spacing (headings, grids, cards) is self-contained and unaffected
- Build passes cleanly

## Consequences

- Pages will feel more cohesive with tighter vertical rhythm
- If a future section needs extra breathing room, use `py-section-lg` + additional `mt-*` rather than inflating the token
