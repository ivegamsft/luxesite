# Decision Record: Master Sprint Plan v2

> **Author:** Morpheus
> **Date:** 2026-04-15
> **Status:** Proposed
> **Scope:** Full project planning — 24 specs, 13 open issues, 23 new issues identified

---

## Context

Conducted comprehensive planning exercise reviewing all 24 specs across 8 subsystems and 13 open GitHub issues. This supersedes the earlier sprint plan from 2026-04-12 which covered 37 issues in 4 sprints. The project has evolved: specs are now organized into subsystems, the brand pivot is stable, and the team has grown.

## Key Decisions

### D1: Spec consolidation is Phase 0 priority
**Decision:** Consolidate S5.1+S5.2+S5.3 into single security spec AND S1.2+S1.3 into single site spec before any implementation begins.
**Rationale:** Three contradictory security specs will cause Dozer to build the wrong thing. Two overlapping site specs mean Trinity fixes the same doc three times (issues #280, #281, #282 are all patching luxurysite.md).
**Impact:** Blocks Phase 1 start by ~3 days. Worth it — prevents weeks of rework.

### D2: ServiceTier types are the critical path
**Decision:** Neo implements the discriminated union `ServiceTier = OneTimeEvent | YearlySubscription | GiftPurchase` as the first implementation task (Sprint 1.1).
**Rationale:** Every component, API, form, and test depends on these types. Delaying type implementation means building on the old flat `MembershipTier` interface and migrating later — guaranteed rework.
**Impact:** Neo recalled in Phase 0, starts coding in Week 2.

### D3: Additive migration, not big-bang rewrite
**Decision:** New types coexist with old types during migration. Old types deprecated but not deleted until all consumers migrated.
**Rationale:** 66 passing tests is a significant safety net. Breaking them all at once creates a multi-day recovery sprint. Additive migration keeps tests green throughout.
**Impact:** Slightly more code during transition, but zero regression risk.

### D4: Express for API scaffold
**Decision:** Use Express for `apps/api/` (not Fastify, Hono, or Koa).
**Rationale:** Largest ecosystem, most team familiarity, best documentation for teaching site. This is a teaching project — accessibility of patterns matters more than raw performance.
**Impact:** No debate needed. Dozer starts scaffolding in Sprint 2.1.

### D5: Dozer bottleneck mitigation
**Decision:** Sequence Dozer's critical-path work across phases: APIs (Phase 2) → Security (Phase 3) → Infrastructure (Phase 4). Never ask Dozer to do all three simultaneously.
**Rationale:** Dozer owns backend, security, and cloud — all on the critical path. Overloading causes everything to slip.
**Impact:** Neo assists with API implementation if needed. CMS work delegated to Niobe.

### D6: Brand pivot frozen after Phase 0
**Decision:** S1.1 (brand-pivot.md) is frozen after Phase 0 spec cleanup. Any brand changes require Morpheus impact analysis.
**Rationale:** The brand has pivoted once already. Every spec in S2–S8 depends on stable brand language, tier names, and pricing. Changing the brand mid-build invalidates completed work.
**Impact:** Marketing/creative feedback must arrive before Phase 1.

### D7: Mouse and Neo recalled immediately
**Decision:** Both reserve agents activated in Week 1 (Phase 0).
**Rationale:** Mouse is needed for FeaturedPackages in Sprint 1.2. Neo is needed for ServiceTier types in Sprint 1.1. Waiting until Phase 2 to recall them wastes a week of Phase 1 capacity.
**Impact:** Team grows from 5 to 7 active agents + @copilot for mechanical tasks.

### D8: 23 new issues identified
**Decision:** 23 work items identified as missing from the issue tracker. Covers: 2 spec consolidations, 4 data model tasks, 3 API tasks, 4 frontend tasks, 2 auth tasks, 4 infra tasks, 2 testing tasks, 2 AI tasks, 1 back-office task, 2 skill creation tasks.
**Rationale:** Systematic spec review revealed significant implementation work not yet tracked. Without these issues, Phase 2+ work would be discovered ad-hoc, causing schedule surprise.
**Impact:** Full issue list in `.squad/agents/morpheus/sprint-plan-issues.md`. To be filed as GitHub issues after review.

## Deliverables

1. **Missing issues document:** `.squad/agents/morpheus/sprint-plan-issues.md` (23 issues)
2. **Master sprint plan:** `docs/sprint-plan.md` (5 phases, 9 sprints, 13 weeks)
3. **This decision record**

## Review Required

- [ ] ivegamsft: Approve overall plan structure and phase sequencing
- [ ] Dozer: Validate security consolidation approach and API technology choice
- [ ] Trinity: Validate site spec merge approach and brand component assignments
- [ ] Tank: Validate testing infrastructure timeline and a11y automation approach
