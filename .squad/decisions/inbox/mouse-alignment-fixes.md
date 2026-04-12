# Decision: Section Container Width Standardization

**Author:** Mouse
**Date:** 2026-04-13
**Issues:** #249, #250, #252
**Status:** Implemented

## Context

FAQ and Testimonials sections used narrower containers (`max-w-5xl` and `max-w-4xl`) than other sections (`max-w-7xl`), causing their H2 headings to be visually misaligned. Footer lacked sufficient top spacing from ConciergeForm.

## Decision

1. **All sections must use `max-w-7xl mx-auto` for their outer container.** This ensures horizontal alignment of headings across the page. Content within sections may use narrower containers if needed, but the heading wrapper must be at standard width.

2. **Section header divs should use `mb-12 md:mb-16`** as the standard bottom margin pattern (matching WhyAurora, DestinationGrid, Tiers).

3. **AnimatedSection wrapping headers should include `variant="fade-up"`** for consistent entrance animation.

4. **Footer uses `pt-section-lg`** (not `pt-section-md`) with a `border-t border-white/10` visual separator to create a distinct zone break from the preceding section.

## Files Changed

- `apps/web/app/components/FAQ.tsx` — container `max-w-5xl` → `max-w-7xl`, header margin normalized, fade-up added
- `apps/web/app/components/Testimonials.tsx` — container `max-w-4xl` → `max-w-7xl`, header margin normalized, fade-up added
- `apps/web/app/components/Footer.tsx` — `pt-section-md` → `pt-section-lg`, added top border separator
