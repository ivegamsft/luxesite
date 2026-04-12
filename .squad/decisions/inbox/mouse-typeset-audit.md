# Typography System Standards — Aurora Luxe

**Date:** 2026-04-15  
**Author:** Mouse (UI/Design Dev)  
**Context:** typeset skill audit and refinement  
**Status:** Implemented ✅

## Decision

Standardize typography hierarchy, weight strategy, and letter-spacing across the entire Aurora Luxe site to ensure intentional, consistent, readable type that reflects the brand's luxury editorial positioning.

## Rationale

The initial typography implementation was strong (Space Grotesk + Inter, fluid scale, good fundamentals) but had minor inconsistencies that undermined the editorial luxury feel:

1. **Weak H2 hierarchy**: Mixed use of `font-semibold` (600) vs `font-bold` (700) made section headings feel tentative rather than commanding
2. **Over-tracked labels**: `tracking-[0.2em]` on uppercase eyebrows felt aggressive, not elegant
3. **Tight body text**: Line-height of 1.6 was functional but not generous enough for long-form luxury content
4. **Display text tracking**: H1 at 36-56px needed tighter tracking for proper optical correction

## Typography Standards Established

### Hierarchy (Size + Weight)

- **H1 (Hero)**: `text-fluid-3xl` (36-56px) + `font-bold` (700) + `tracking-tighter` (-0.025em) + `leading-[1.1]`
- **H2 (Section headings)**: `text-fluid-2xl` (32-48px) + `font-bold` (700) + `tracking-tight` (-0.025em) + `leading-tight` (1.25)
- **H3 (Card titles)**: `text-fluid-xl` or `text-fluid-lg` + `font-semibold` (600) + `tracking-tight`
- **Body text**: `text-fluid-base` (16px) + `font-normal` (400) + `leading-[1.65]`
- **Captions/labels**: `text-sm` (14px) + `font-medium` (500)

### Letter-Spacing Strategy

- **Display text (≥32px)**: `tracking-tighter` (-0.025em) — optical correction for large sizes
- **Headings (22-30px)**: `tracking-tight` (-0.025em)
- **Uppercase labels**: `tracking-[0.15em]` (previously 0.2em — too wide)
- **Uppercase nav/footer**: `tracking-wide` (0.025em) — refined, not aggressive
- **Body text**: `tracking-normal` (0em) or `letter-spacing: 0.01em` for section intros
- **Tabular numbers**: `tabular-nums` on pricing and numeric data

### Line-Height Strategy

- **Display headings (H1)**: 1.1 (tight but legible)
- **Section headings (H2)**: 1.25 (`leading-tight`)
- **Body text**: 1.65 (generous for editorial luxury)
- **Section intros**: 1.75 (`leading-relaxed`)
- **Quotes**: 1.375 (`leading-snug` for display quotes)

### Max-Width for Readability

- **Hero subtext**: `max-w-[55ch]`
- **Section intros**: `max-w-[60ch]` (changed from `38rem` for content-based sizing)
- **Long-form content**: 45-75ch ideal line length

## Changes Made

### globals.css
- Body line-height: 1.6 → 1.65
- Section intro max-width: `38rem` → `60ch`

### Components Updated
- **Hero.tsx**: H1 tracking `tracking-tight` → `tracking-tighter`, line-height 1.08 → 1.1
- **All section headings** (7 components): `font-semibold` → `font-bold`
- **All uppercase eyebrows** (8 instances): `tracking-[0.2em]` → `tracking-[0.15em]`
- **Navbar**: Link tracking `tracking-wider` → `tracking-wide`
- **Footer**: Heading tracking `tracking-wider` → `tracking-wide`

## What We Kept (Intentional)

- **Font families**: Space Grotesk (headings) + Inter (body) — brand-specific choice, excellent pairing
- **Fluid scale**: Intentional compression at small viewports via `clamp()` — not a strict modular ratio
- **Tabular-nums**: Already correctly applied on pricing (Tiers, DestinationGrid)
- **TrustBar sizes**: Fixed text-sm/xs appropriate for compact utility bar
- **Varied line-heights**: Context-appropriate (tighter for headings, looser for body)

## Team Impact

- **Trinity (Full-Stack Lead)**: No token changes needed; all improvements at component level
- **Mouse (UI/Design Dev)**: Typography now more intentional, hierarchy clearer, better readability
- **Future components**: Follow these standards for consistency

## Verification

- ✅ Build clean (Next.js 16.2.3)
- ✅ All tests passing
- ✅ WCAG AA contrast maintained
- ✅ No breaking changes to existing functionality

## References

- `.impeccable.md`: Brand personality (commanding, discreet, bespoke)
- `globals.css`: Token definitions and fluid scale
- Typeset skill: Typography audit methodology
