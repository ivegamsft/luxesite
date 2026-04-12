# Decision: Specialists Section — Carousel + Content Pivot

**Author:** Trinity  
**Date:** 2026-04-12  
**Issue:** #255

## Context

The Specialists (WhyAurora) section regressed to a static 3-card grid showing only 3 of 5 team members. Content didn't reflect the brand pivot to luxury experiential celebrations.

## Decision

1. **Carousel with Framer Motion:** Replaced static grid with paginated carousel using `AnimatePresence mode="wait"` and horizontal slide transitions. Responsive: 3 cards desktop, 2 tablet, 1 mobile. Prev/next arrows + dot indicators. Touch swipe support on mobile.

2. **7 Specialists with pivot-aligned roles:** Expanded from 5 generic profiles to 7 specialists with luxury experiential titles (Creative Director, Production Director, Immersive Design Lead, Culinary Experience Director, Entertainment Curator, Concierge Lead, Floral & Environmental Designer). Each has 4 unique skill tags — no repetition across cards.

3. **Initials-based avatars:** Replaced external Unsplash image URLs with gradient-background initials avatars. Eliminates external dependency, loads instantly, maintains brand aesthetic with warm gold/navy gradients.

4. **Detail page updated:** Specialist detail pages (`/specialists/[id]`) also use initials avatars instead of `next/image` with empty URLs.

## Rationale

- Carousel exposes all 7 specialists without overwhelming the viewport
- Framer Motion already in the project — no new dependencies
- Initials avatars are more reliable than placeholder image services
- 44px min touch targets on all interactive elements (WCAG 2.5.5)
- `useReducedMotion` respected throughout

## Impact

- `apps/web/app/data/team.ts` — 7 specialists, new titles/bios/tags
- `apps/web/app/components/WhyAurora.tsx` — full rewrite to carousel
- `apps/web/app/specialists/[id]/page.tsx` — initials avatars
- Build verified clean
