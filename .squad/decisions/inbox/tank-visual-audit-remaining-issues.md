# Visual Audit: 4 Remaining Issues Post-Trinity Fix

**Author:** Tank  
**Date:** 2026-04-12  
**Priority:** P0 (contrast), P1 (imagery, spacing), P2 (typography)

## Summary

Screenshots confirm Trinity's commit 7dc22ae partially addressed issues #232–#235, but 4 problems remain visible on the live site.

## Issues Requiring Action

### 1. P0 — `text-aurora-gold` Contrast Failures (19+ instances)

Trinity correctly added `aurora-gold-accessible` (#7a6532, 5.34:1) but only applied it in WhyAurora and Testimonials. The original `text-aurora-gold` (#c9a76a, **2.16:1** on light backgrounds) persists in:

| File | Line | Element | Context |
|------|------|---------|---------|
| Hero.tsx | 330 | "Discuss with a specialist →" | Interactive text on bg-aurora-bg-light |
| Hero.tsx | 182 | Selected dropdown option | Text on bg-aurora-bg-light |
| Navbar.tsx | 79, 156 | Active nav link | Interactive text on white |
| Tiers.tsx | 74 | "✓" checkmarks | Meaningful symbol on bg-aurora-bg-light |
| FAQ.tsx | 42 | Chevron icon | Interactive indicator on bg-aurora-bg-dark |

**Fix:** Replace all non-decorative `text-aurora-gold` on light backgrounds with `text-aurora-gold-accessible`. SVG icons with `aria-hidden="true"` can stay as-is (decorative).

### 2. P1 — Hero Image Contains Wine/Champagne Glasses

`photo-1519671482749-fd09be7ccebf` clearly shows people toasting with wine glasses. Contradicts "Every Age" brand positioning. Also used in OG metadata (`layout.tsx:38,49`).

**Fix:** Replace with a celebration photo that's inclusive of all ages — balloons, confetti, sparklers, or a multi-generational party scene.

### 3. P1 — Section Spacing Still Excessive

Trinity reduced min values (~35% cut), but max values remain enormous:
- `section-lg`: max 12rem (192px) — ~252px total gap at 1440px
- `section-md`: max 10rem (160px) — ~208px total gap
- Plus SectionBreak components add ~80px decorative gaps

Desktop full-page screenshot shows sections floating in vast empty space.

**Fix:** Cut max values by ~50%: `section-lg` max→6rem, `section-md` max→5rem, `section-sm` max→3.5rem. Consider removing or reducing SectionBreak padding.

### 4. P2 — Testimonials h2 Same Size as Quote on Mobile

`Testimonials.tsx:60` uses `text-fluid-xl` for h2, same as the quote text (line 89) at mobile width. Only differentiates at `sm:` breakpoint via `sm:text-fluid-2xl`. Low priority since the section label "WHAT OUR CLIENTS SAY" provides hierarchy.

**Fix:** Change h2 to `text-fluid-2xl` unconditionally, or add `text-fluid-2xl` at mobile.
