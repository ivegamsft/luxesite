# Decision: Section Heading Variety

**Author:** Mouse  
**Date:** 2026-04-11  
**Issue:** #145  
**Status:** Implemented  

## Context

The gold uppercase eyebrow → large h2 → muted subtitle pattern was mechanically repeated in 6+ sections. This is the #1 AI-template tell — human designers create variety while maintaining hierarchy.

## Decision

Each section gets a heading treatment matched to its purpose:

| Section Type | Treatment | Example |
|---|---|---|
| **Discovery** (Destinations, Experiences) | Full eyebrow + heading | Gold uppercase label + fluid-2xl h2 |
| **Utility** (FAQ) | Understated label | Left-aligned fluid-xl, medium weight, muted |
| **Pricing** (Tiers) | Inline label + tagline | Flex row, heading left, tagline right — cards lead |
| **Form** (ConciergeForm) | Conversational line | Mixed-weight prose sentence, sr-only h2 |
| **Social proof** (Testimonials) | Editorial quote | No heading — content speaks directly |

## Rules

1. **Max 2–3 sections** may use the full eyebrow+heading pattern on any page
2. Screen reader heading structure must always exist (use `sr-only` if visually hidden)
3. New sections should consult this table before defaulting to the eyebrow pattern

## Files Changed

- `apps/web/app/components/FAQ.tsx`
- `apps/web/app/components/Tiers.tsx`
- `apps/web/app/components/ConciergeForm.tsx`
