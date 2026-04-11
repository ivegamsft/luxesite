# Decision: Tier Architecture — Discriminated Union + Per-Tier APIs

**Author:** Morpheus  
**Date:** 2026-04-12  
**Issue:** #210 · **PR:** #212  
**Status:** Proposed — pending team review

## Decision

Adopt a **discriminated union** (`ServiceTier = OneTimeEvent | YearlySubscription | GiftPurchase`) as the canonical backend/API type for tier data. The three tier types are fundamentally different transaction models, not levels of the same thing.

## Key Points

1. **Current `MembershipTier` stays** for static frontend rendering — it's the right shape for tier cards.
2. **`ServiceTier` union** adds per-tier fields (event dates, subscription lifecycle, gift buyer/recipient).
3. **Booking API uses separate POST endpoints** per tier type — different request bodies, different validation.
4. **Gift redemption converts to One Time** — no special event type downstream.
5. **Gift uses code-based activation** — no pre-created recipient accounts.
6. **ConciergeForm uses progressive disclosure** — one form with tier-conditional fieldsets.

## Rationale

The old Silver/Black/Obsidian model was a linear hierarchy. The new One Time/Yearly/Gift model represents three distinct transaction types. Treating them as the same shape (with lots of optional fields) would create a confusing API and lose TypeScript's ability to catch missing cases at compile time.

## Impact

- Specs #203, #204, #205, #206, #208 need tier-type-aware updates (see spike §5)
- Sample data (#190) needs 10 records across lifecycle states
- Security (#208) needs gift code generation + two-party identity model

## Teaching Value

Discriminated unions, progressive disclosure, and RESTful resource modeling are patterns every TypeScript developer should know. This architecture creates natural opportunities to teach all three.
