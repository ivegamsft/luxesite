# Decision: Section Reduction — Merge GuideGrid into WhyAurora

**Author:** Morpheus
**Date:** 2026-04-10
**Status:** Implemented
**Issue:** #147

## Context

The page had 11 content sections creating a monolithic scroll wall. WhyAurora (team carousel) and GuideGrid (travel guides) both showcased people, creating redundancy. UHNW luxury brands (Aman, Rolls-Royce) use 3-4 editorial sections with generous breathing room.

## Decision

1. **WhyAurora** refactored from horizontal carousel → 3-card editorial grid with "Meet all specialists" CTA
2. **GuideGrid** removed from page composition (component file retained for future use)
3. **PressAwards** removed from page composition (component file retained)
4. **Interstitial** added — full-bleed Unsplash image with overlay quote, placed before Tiers for visual breathing room
5. **ScrollNav** updated to remove Guides entry

## Result

Page reduced from 11 → 8 sections: Hero, TrustBar, Destinations, Experiences, WhyAurora, Testimonials, Interstitial, Tiers, FAQ, ConciergeForm (8 content + structural nav/footer).

## Trade-offs

- Guide content is no longer immediately visible on the homepage; it can be re-introduced on a dedicated `/guides` route later
- PressAwards likewise available for a press/about page
- All data files and components preserved — no data loss
