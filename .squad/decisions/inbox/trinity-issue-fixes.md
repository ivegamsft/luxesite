# Trinity Issue Fixes — Issues #2, #4, #8
**Author:** Trinity
**Date:** 2026-04-10
**Status:** Implemented

## Changes

### Issue #2 — Currency EUR → USD
- `tiers.ts`: All three tier prices changed from € to $ (Silver $25k, Black $75k, Obsidian $200k). Obsidian perk "valued at €50,000" → "$50,000".
- `destinations.ts`: All 6 destinations changed `currency: '€'` → `currency: '$'`.
- `ConciergeForm.tsx`: Budget range dropdown options changed from € to $.

### Issue #4 — Budget Dropdown Readability + Class Typo
- **Select styling:** Replaced transparent `bg-aurora-glass` with solid `bg-[oklch(0.15_0.015_50)]` on the `<select>` element. Added `[&>option]:bg-[oklch(0.15_0.015_50)] [&>option]:text-[oklch(0.95_0.012_85)]` for explicit option styling. Removed per-option `className="bg-aurora-dark"` in favor of parent-level utility.
- **Class typo fix:** `rounded-lgpx-4` → `rounded-lg px-4` across 5 form inputs (name, email, travelDates, travelers, budget). The missing space caused both `rounded-lg` and `px-4` to silently fail.

### Issue #8 — Submit Button Affordance
- Added `cursor-pointer` for interaction feedback.
- Added `active:scale-[0.98]` for press state.
- Changed `text-aurora-dark` → `text-aurora-white` to fix WCAG AA contrast failure on gradient's bordeaux midpoint.
- Added `focus:ring-offset-2 focus:ring-offset-aurora-dark` for proper focus ring visibility.

## Decisions
- All colors remain in OKLCH system.
- Native `<select>` options get solid backgrounds, not glass — browsers ignore transparency on native dropdowns.
- Button text on gradient backgrounds defaults to light (aurora-white) unless all gradient stops are above oklch L=0.65.

## Build Status
✅ `next build` passes clean. No type errors.
