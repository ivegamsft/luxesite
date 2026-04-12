# Decision: Guest-count tier → numeric mapping for ConciergeForm

**Issue:** #247
**Author:** Neo
**Date:** 2026-07

## Context
The hero-discovery custom event sends a guest-count tier string (`intimate`, `medium`, `grand`, `spectacular`) to the ConciergeForm. Previously this was only injected into the notes textarea as display text — the `expectedGuests` numeric field was never updated.

## Decision
Map each tier to a **sensible default** at the low end of its range:
- `intimate` → 12 (midpoint of 1–25)
- `medium` → 25 (floor of 25–100)
- `grand` → 100 (floor of 100–500)
- `spectacular` → 500 (floor of 500+)

Using the floor value was chosen over midpoint because:
1. Lower values are a safer default — users can always increase
2. For open-ended ranges like "500+", a midpoint doesn't exist
3. Consistent logic across all tiers

## Impact
- ConciergeForm `handleHeroDiscovery` handler now sets `expectedGuests` alongside `interests` and `notes`
- Manual edits to Expected Guests still work and persist (no bidirectional tier re-mapping — that would be overengineered)
- No new state variables needed; uses existing `formData.expectedGuests`
