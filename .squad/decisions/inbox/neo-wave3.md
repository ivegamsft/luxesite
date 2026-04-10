# Neo — Wave 3 Decisions

## Issue #37: Testimonials enhancement

**Decision: Keep carousel pattern, enhance card content**
- Kept the existing carousel + sidebar-dot navigation rather than switching to a 2-col card grid. The carousel works well for testimonials (focus on one voice at a time) and the sidebar dots scale fine to 7 items.
- Added StarRating as a small local component (not extracted) since it's only used here.
- All 7 testimonials have rating: 5 — realistic for a curated luxury brand that would only showcase top reviews.
- 4 of 7 have Trustpilot sourceLinks (spec asked for ≥3).

**Decision: Trip-specific roles replace job titles**
- Original data had corporate titles ("CEO, Nordic Capital Group"). Replaced with trip descriptors ("Anniversary — Private Island, Greece") per spec. This better communicates the breadth of Aurora's offerings.

## Issue #42: Experiences redesign

**Decision: Emoji icons over SVGs**
- Replaced the hand-drawn SVG icon map with emoji icons from data. Simpler, no icon-to-id coupling, and the emojis render well at the 4xl size used in the card design. The old SVG map would have needed 3 new icons added.

**Decision: Grid over alternating horizontal cards**
- Switched from the alternating left/right horizontal layout to a proper 3/2/1 responsive grid per spec. The grid is better for 8 cards and matches the destination grid pattern used elsewhere on the site.

**Decision: Region pills styling**
- Used `rounded-full` pills (not `rounded-sm` like cards) to visually differentiate tags from card containers. Kept them subdued (aurora-bg-light bg, aurora-border border, text-xs) so they inform without competing with the description.
