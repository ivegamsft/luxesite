# Decision: WhyAurora + TrustBar New Sections

**Author:** Neo  
**Date:** 2026-07  
**Status:** Implemented  
**Issues:** #31 (Why Aurora), #35 (TrustBar)

## Data Layer

- `TeamMember` interface added to `app/lib/types.ts` (canonical type location)
- `app/data/team.ts` holds 5 mock specialists with Unsplash placeholder portraits
- Average experience across team: 13 years (matches "12+ years" differentiator claim)

## WhyAurora Component

- Light section bg `#faf9f7` per luxurysite.md §2 `bg-light` token
- Team grid: 3-col lg / 2-col md / 1-col sm with white cards, `#e8e4df` borders
- Card hover: `-translate-y-1` + medium shadow (spec §2 hover lift)
- Differentiators below team grid, separated by top border
- Monoline SVG icons in gold accent circles (consistent with ExperienceList icon pattern)
- `useReducedMotion()` disables all motion (consistent with Decision #4)

## TrustBar Component

- Addresses COMPETITIVE_ANALYSIS Issue E: "zero trust architecture visible"
- Compact horizontal strip with 4 credibility signals
- Desktop: flex row with `w-px` dividers; Mobile: 2×2 grid
- Phone number gold-highlighted as primary trust signal
- `role="complementary"` + `aria-label` for accessibility

## Design Token Strategy

- Used hardcoded hex values (`#faf9f7`, `#2c2620`, `#6b6458`, `#c9a76a`, `#e8e4df`) directly
- Rationale: Tailwind token rename (COMPETITIVE_ANALYSIS Issue C) is pending; hardcoded values match spec §2 exactly and won't break during rename
- When token rename lands, these can be migrated to semantic class names

## Integration Note

- Neither component is wired into `page.tsx` — that is scoped to Issue #43
- Both export default and can be imported directly
