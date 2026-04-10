# Neo — Wave 2 Decisions

## Issue #34 — Travel Guides (GuideGrid)

**Decision:** 6 guides with realistic travel content, 4:3 image cards in 3/2/1 responsive grid.

**Implementation:**
- `app/data/guides.ts`: 6 TravelGuide entries with Unsplash images, unique authors, 8-12 min read times
- `app/components/GuideGrid.tsx`: AnimatedSection heading + staggered Framer Motion cards, lazy-loaded images, read-time badge overlay, "Read Guide →" gold link, hover lift (-translate-y-1 + shadow-lg)
- `TravelGuide` interface added to `app/lib/types.ts`

**Rationale:** Follows spec §5.6 exactly. Same light-theme token set as WhyAurora/TrustBar (hardcoded hex — awaiting Tailwind token migration). Cards use `line-clamp` for consistent height without fixed heights. Component is import-ready; page.tsx untouched per Issue #43 scope.

---

## Issue #38 — Press & Awards (PressAwards)

**Decision:** Text-based logo treatment instead of image logos; 6 publications in horizontal row (desktop) or 2×3 grid (mobile).

**Implementation:**
- `app/data/awards.ts`: 6 PressAward entries with `logoText` field for text-based display
- `app/components/PressAwards.tsx`: Desktop flex row with 1px dividers, mobile grid with bordered cells, stat line with gold star rating, external links on all logos
- `PressAward` interface added to `app/lib/types.ts`

**Rationale:** Text logos avoid asset management overhead and render crisply at any size. The spec says "logo wall" but we use `logoText` with tracking-widest font-heading to approximate masthead typography. Easy to swap for SVG/PNG later. Hover-to-gold adds interactivity without clutter.

---

## Issue #33 — Destinations Expanded to 15

**Decision:** Added 9 destinations (Patagonia, Bali, Amalfi Coast, Santorini, Bora Bora, Marrakech, Iceland, Seychelles) to reach 15 total. New Zealand omitted — 15 cards fill the 3-col grid evenly (1 featured 2-col + 14 standard = 5 rows of 3).

**Implementation:**
- Extended `app/data/destinations.ts` with 9 new entries following existing schema
- Added "Learn More →" hover link to `DestinationGrid.tsx` (gold text, opacity 0→1 on group-hover)

**Rationale:** 15 cards in a 3-col grid with a featured first card (2-col span, 2-row span) fills naturally. New Zealand was the 9th candidate but 15 is a better grid fit than 16 (the featured card occupies 4 grid cells, so 15 standard + 1 featured = 16 cells = 5⅓ rows at 3-col... actually the featured takes row-span-2 + col-span-2 = 4 cells, remaining 14 fill cleanly). Prices follow the established range ($6,900–$18,900). All Unsplash images use consistent `w=1200&h=900&fit=crop` parameters.
