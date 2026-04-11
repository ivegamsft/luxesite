# Decision: Tier Restructure from Travel to Event Planning

**Date:** 2025-01-XX  
**Status:** Implemented  
**Decided by:** Ivan (Product Owner)  
**Implemented by:** Trinity (Frontend Developer)

## Context

Aurora Luxe was originally positioned as a luxury travel membership service with three tiers (Silver, Black, Obsidian) at relatively accessible price points ($25k-$200k/year). The business model needed to pivot to ultra-high-end event planning services with dramatically increased pricing.

## Decision

Restructured the entire tier system from travel memberships to event planning services:

### New Tier Structure

1. **One Time** (from $500,000)
   - Single event/experience planning engagement
   - Dedicated event curator, venue scouting across 50+ countries
   - Custom coordination, day-of concierge team, memory book

2. **Yearly** (from $1,200,000/year) — **FEATURED**
   - Annual subscription covering up to 12 events per year
   - Personal family event strategist who knows your family
   - Handles all events: birthdays, holidays, graduations
   - Seasonal surprise boxes, priority rebooking

3. **Gift** (from $250,000)
   - Beautifully packaged gift experience card
   - Recipient chooses from curated event catalog
   - Valid for 18 months

### Pricing Philosophy

All pricing increased ~10-20x to "absurdly expensive" levels:
- Destinations: $69,000 - $189,000 (previously $6,900 - $18,900)
- Budget ranges: $100k - $1M+ per event (previously $25k - $100k+ per journey)
- Minimum entry point: $250,000 (previously $5,000)

The goal: "So much that you may mortgage your house."

## Rationale

- Shifts positioning from travel concierge to ultra-premium event planning
- "Yearly" as the money-maker (cradle to pre-teen family event subscription)
- Price points create exclusivity and filter for ultra-high-net-worth clients
- Gift tier provides entry point and gift-giving option

## Implementation

### Files Changed

- `apps/web/app/data/tiers.ts` — Tier IDs, names, taglines, prices, perks
- `apps/web/app/data/destinations.ts` — All destination prices multiplied by 10x
- `apps/web/app/components/ConciergeForm.tsx` — Budget ranges and tier mapping
- `apps/web/app/components/FAQ.tsx` — Tier and pricing FAQ answers
- `apps/web/app/components/__tests__/Tiers.test.tsx` — Test expectations
- `apps/web/app/components/__tests__/DestinationGrid.test.tsx` — Price expectations

### Testing

- All 43 Jest tests pass
- Next.js production build successful
- Dynamic rendering in `Tiers.tsx` handles price splitting correctly

## Consequences

### Positive
- Clear service positioning around event planning
- Subscription model (Yearly) creates recurring revenue
- Ultra-premium pricing signals extreme quality
- Gift tier opens up corporate gifting market

### Negative
- Radically different business model from original travel focus
- May require marketing/copy updates beyond component level
- Pricing may be perceived as satirical or too extreme

## Notes

- Kept tier IDs as kebab-case: 'one-time', 'yearly', 'gift'
- Made "Yearly" the featured tier (it's the revenue driver)
- Price splitting logic in `Tiers.tsx` still works (splits on `/` for yearly pricing)
- E2E tests likely still pass (they reference button text, not tier names)
