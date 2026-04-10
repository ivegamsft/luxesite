# Decision: Simplify motion system to opacity-only fades

**Author:** Trinity  
**Date:** 2026-04-10  
**Issues:** #24, #29  
**Status:** Implemented  

## Context

The motion system used translateY slide-ups, parallax scrolling, and decorative overlays (aurora gradient, noise texture). These added visual complexity that competed with editorial content and the luxury aesthetic.

## Decisions

### 1. Opacity-only animation (no translateY)

All scroll-triggered and page-load animations now use `opacity: 0 → 1` only. No vertical translation. Duration standardized to 600ms with `easeOut` easing.

**Rationale:** Slide-up animations create a "presentation deck" feel. Opacity-only reads as editorial — content materializes without bouncing.

### 2. Remove parallax scroll effect from Hero

Deleted the ref-based parallax system (3 useRefs, useCallback, rAF scroll listener). Hero content is now static within the viewport.

**Rationale:** Parallax added 25 lines of imperative code for a subtle effect that fought the left-aligned editorial layout. The simplicity gain outweighs the visual loss.

### 3. Remove decorative overlays (aurora gradient, noise texture)

Hero retains only the background image and bottom vignette. The `bg-gradient-aurora-subtle` overlay and SVG noise texture overlay are removed.

**Rationale:** Photography carries the mood (per Mouse's design direction). Extra overlays diluted the image and added AI aesthetic noise.

### 4. Remove unused keyframe animations from Tailwind

Deleted `aurora-pulse`, `shimmer`, and `float` keyframes and their animation utilities. Only `scroll-hint` remains.

**Rationale:** No component references these animations after the simplification. Dead CSS bloats the bundle and confuses future developers.

### 5. AnimatedSection trigger at 80% viewport visibility

Changed from `margin: '-100px'` to `amount: 0.8`. Sections animate when 80% visible.

**Rationale:** Percentage-based triggering is more predictable across viewport sizes than fixed pixel offsets.

## Impact

- Hero.tsx: 141 lines → 102 lines (28% reduction)
- AnimatedSection.tsx: Unchanged line count, cleaner animation config
- tailwind.config.ts: 3 keyframes + 3 animations removed
- Build passes clean
