# Decision: Remove SectionBreak, Standardize H2 Pattern

**Author:** Mouse  
**Date:** 2026-04-13  
**Issues:** #238-#246

## Decision

1. **SectionBreak removed from page.tsx.** Decorative gold-line dividers between sections have been removed. Sections now own their own spacing via `py-section-*` tokens. SectionBreak CSS remains in globals.css for potential future use but is no longer rendered on the homepage.

2. **Canonical section header pattern established:** Every section now follows eyebrow → H2 → body copy, using:
   - Eyebrow: `text-sm font-medium tracking-[0.2em] uppercase text-aurora-gold-accessible mb-3`
   - H2: `font-heading text-fluid-2xl font-semibold tracking-tight leading-tight text-aurora-text mb-4`
   - Body: `section-intro` class or `text-base text-aurora-text-muted leading-relaxed max-w-2xl`
   - On dark backgrounds (Tiers): eyebrow uses `text-aurora-gold`, H2 uses `text-white`

3. **All sections use `py-section-lg`** for consistent vertical rhythm. No more mixed `py-section-sm sm:py-section-lg` or `pt-section-sm sm:pt-section-lg pb-section-md` patterns.

## Rationale

SectionBreaks created dead zones between same-bg sections and bg mismatches at light→dark transitions. Removing them and letting sections own their spacing produces cleaner visual flow. The standardized H2 pattern ensures scannable hierarchy across the entire page.

## Impact

- **Trinity:** If adding new sections, follow the eyebrow/H2/body pattern above.
- **All agents:** SectionBreak component is unused. If re-introducing decorative dividers, build them as section-internal elements, not standalone components.
