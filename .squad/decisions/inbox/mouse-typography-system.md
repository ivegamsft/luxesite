# Typography System Overhaul

**Date:** 2026-04-12  
**Agent:** Mouse (UI/Design Dev)  
**Status:** Implemented ✅

## Problem

Typeset audit revealed systematic typography issues:
1. Body text (`--fluid-base`) scaled below 16px at mobile (readability violation)
2. Display heading (`--fluid-3xl`) scaled to 80px max (excessive, not refined)
3. Testimonials h2 same size as quote text on mobile (hierarchy collapse)
4. FAQ arbitrary font sizes (`text-[1.0625rem]`, `text-[0.9375rem]`) off the scale
5. Breakpoint-based type jumps (`text-2xl md:text-3xl lg:text-4xl`) instead of fluid scale
6. Unused Inter weight 300 loaded (performance cost)
7. Inconsistent heading weights (h2s used bold, semibold, medium randomly)

## Decision

**Fluid Type Scale (globals.css):**
- `--fluid-base`: **1rem fixed** (not fluid — per typography reference: "Body text should be fixed")
- `--fluid-3xl`: Cap at 56px max (not 80px — more refined for luxury brand)
- Wider ratios between steps for clearer hierarchy at all viewports

**Typography Hierarchy:**
- h1/hero: `font-bold` (700) + `text-fluid-3xl` (36-56px)
- h2/section: `font-semibold` (600) + `text-fluid-2xl` (28-40px)
- h3/card: `font-semibold` (600) + `text-fluid-xl` (22-30px)
- Subheadings/lead: `text-fluid-lg` (18-22px)
- Body text: `font-normal` (400) + `text-fluid-base` (16px fixed)
- Labels/overlines: `font-medium` (500) + `text-sm` or `text-xs`

**All breakpoint-based type → fluid scale:**
- Interstitial, Navbar, Tiers, GuideGrid converted to use scale tokens

**Font weights cleanup:**
- Removed unused Inter weight 300
- Standardized all h2s to `font-semibold`

## Rationale

1. **Body text must be readable:** 16px is the minimum for body copy. Fluid scaling below this fails accessibility.
2. **Headings should scale, not body:** Display text benefits from viewport adaptation. Body text differences (15px → 16px) are too small to justify complexity.
3. **Clear hierarchy at ALL breakpoints:** If h2 and quote text are the same size at mobile, the hierarchy fails when it's needed most (small screens, scanning content).
4. **Modular scale prevents drift:** Arbitrary pixel values (`text-[1.0625rem]`) break the system and accumulate over time. Every size should map to a scale token.
5. **Performance matters:** Loading a font weight that's never used wastes bandwidth.

## Impact

- ✅ All body text now 16px minimum (readability)
- ✅ Heading max sizes capped at refined levels (56px, not 80px)
- ✅ Clear hierarchy at mobile, tablet, desktop (no same-size h2/quote collapses)
- ✅ No arbitrary off-scale sizes (everything on the modular scale)
- ✅ Consistent weights (h2s all semibold, h1s all bold)
- ✅ Smaller font bundle (Inter 300 removed)

## Files Modified

- `apps/web/app/globals.css` — fluid type scale redesign
- `apps/web/app/layout.tsx` — remove Inter weight 300
- `apps/web/app/components/Testimonials.tsx` — fix h2 vs quote hierarchy
- `apps/web/app/components/FAQ.tsx` — replace arbitrary sizes
- `apps/web/app/components/Interstitial.tsx` — breakpoint → fluid
- `apps/web/app/components/Navbar.tsx` — breakpoint → fluid
- `apps/web/app/components/Tiers.tsx` — breakpoint → fluid
- `apps/web/app/components/WhyAurora.tsx` — h2 bold → semibold
- `apps/web/app/components/GuideGrid.tsx` — breakpoint → fluid

## Testing

- ✅ Build: `npx next build` passed
- ✅ Tests: All 43 tests passed
- ✅ Visual verification: No body text below 16px, headings use fluid scale, clear hierarchy at all breakpoints

## Cross-References

- Addresses typeset audit findings (comprehensive typography review)
- Follows typography reference: "Body text should be fixed even on marketing pages"
- Aligns with Aurora Luxe visual refinement goals (not excessive, not AI-slop)
