# Trinity: P2+P3 Polish Fixes

**Author:** Trinity  
**Date:** 2026-04-10  
**Status:** Implemented  

## Changes

1. **Removed `animate-aurora-pulse`** from Hero gradient overlay — static gradient, no infinite pulse.
2. **Replaced `animate-float` with `animate-scroll-hint`** on scroll indicator — one-shot nudge after 2s delay instead of infinite bounce.
3. **Differentiated hover behavior** across card types:
   - DestinationGrid: kept `hover:-translate-y-1` (lift to reveal)
   - ExperienceList: `hover:brightness-110 hover:border-aurora-cyan/30` (subtle glow)
   - Tiers non-featured: `hover:border-aurora-cyan/40` (border highlight, no lift)
4. **Added visible focus ring** to desktop nav links: `focus:ring-2 focus:ring-aurora-cyan/50 focus:ring-offset-2`.
5. **Removed unused `2xl: 2560px` breakpoint** from tailwind.config.ts.
6. **Replaced `hover:scale-105`** on FloatingCTA with `hover:-translate-y-0.5` (scale was banned).

## Rationale

Luxury sites should feel confident and still, not restless. Infinite animations on decorative elements (gradient overlays, scroll indicators) add visual noise without value. Varied hover responses give each card type its own personality instead of a uniform mechanical lift.

Build verified: `next build` passes cleanly.
