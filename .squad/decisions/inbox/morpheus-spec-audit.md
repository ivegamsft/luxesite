# Spec Audit: Brand Pivot Compliance
**Author:** Morpheus (Lead/Architect)  
**Date:** 2026-04-15  
**Scope:** All 24 spec files in `spec/`  
**Finding:** 3 files need updates; 21 fully aligned

---

## Executive Summary

Aurora Luxe pivoted from luxury travel to luxury experiential party packages. I audited all 24 spec files for:
- Travel-era language ("destinations," "journeys," "flights," "itineraries")
- Old tier names (Silver, Black, Obsidian) vs. new (One Time, Yearly, Gift)
- Outdated pricing/tiers/terminology
- Color tokens/design references that don't match current palette (#f5f3f0, #c9a76a, #1a3a52, #7a8f7f)

**Status:**
- ✅ **21 aligned** — Properly use party/event/experience language; reference correct tiers and pricing
- ⚠️ **2 partially stale** — Minor terminology inconsistencies, but core models correct
- ❌ **1 fully stale** — References outdated dark-theme visual palette; contradicts frozen design system

---

## Audit Results Table

| File | Status | Key Finding | Priority |
|------|--------|------------|----------|
| `accessibility-i18n.md` | ✅ Aligned | Generic "experienceName" usage; no domain references | — |
| `ai-excursion-builder.md` | ✅ Aligned | "Event generation," "luxury excursion proposals," tier-aware constraints | — |
| `azure-architecture.md` | ✅ Aligned | "Experiences" container in Cosmos; no travel language | — |
| `backoffice-platform.md` | ✅ Aligned | One-Time, Yearly, Gift tiers explicit; "event coordination" framing | — |
| `booking-consultation-apis.md` | ✅ Aligned | Three separate APIs per tier type; correct pricing ($500K/$1.2M/$250K) | — |
| `brand-pivot.md` | ✅ Aligned | **Foundation spec** — comprehensive pivot documentation | — |
| `cicd-pipeline.md` | ✅ Aligned | Infrastructure neutral; no business domain | — |
| `content-apis.md` | ✅ Aligned | "Experiences" framing; tier-specific catalog | — |
| `content-management.md` | ✅ Aligned | "Experience" content model; event production language | — |
| `copilot-planning-agent.md` | ✅ Aligned | References "Aurora Luxe clients," tier policies, booking flow | — |
| `design-system-update.md` | ✅ Aligned | Refers to pivot spec; color tokens frozen (warm ivory, champagne gold) | — |
| `documentation-update.md` | ✅ Aligned | Explicitly frames "luxury experiential events brand"; teaches pivot | — |
| `environment-strategy.md` | ✅ Aligned | Infrastructure neutral; no business references | — |
| `frontend-data-migration.md` | ✅ Aligned | Generic "events" and "tiers"; schema-agnostic | — |
| `luxurysite.md` | ❌ **STALE** | References outdated dark palette (#0a0a0f, #00e5ff, neon gradients); contradicts frozen design system | **P1** |
| `monorepo-architecture.md` | ✅ Aligned | Infrastructure neutral | — |
| `observability.md` | ✅ Aligned | "Booking state transitions," event lifecycle logging | — |
| `sample-data-pack.md` | ⚠️ **PARTIAL** | Events aligned; specialist roles still reference "Destination Manager" (should be "Event Architect") | **P2** |
| `security-architecture-update.md` | ✅ Aligned | Three tier types + distinct RBAC models | — |
| `security-architecture.md` | ✅ Aligned | Opens with "luxury experiential events platform" | — |
| `site.md` | ❌ **STALE** | Says "party platform" but visual system is legacy dark-theme (glassmorphism, neon); contradicts design-system-update.md | **P1** |
| `testing-strategy.md` | ✅ Aligned | Generic testing patterns; references tier-specific state machines | — |
| `tier-architecture-spike.md` | ✅ Aligned | Explicitly documents three transaction types (One-Time, Yearly, Gift) | — |
| `unified-security-rbac.md` | ✅ Aligned | Three tier types with distinct role models | — |

---

## Stale References by Category

### ❌ CRITICAL: Visual Palette Contradictions (2 files)

**Files:** `luxurysite.md`, `site.md`

**Issue:** These specs reference a dark-theme visual system (aurora-dark #0a0a0f, aurora-cyan #00e5ff, aurora-purple #8b5cf6, neon gradients, glassmorphism) that contradicts the current **frozen design system** documented in `spec/design-system-update.md`.

**Current palette (frozen — per design-system-update.md):**
- Background: `#f5f3f0` (warm ivory)
- Accent: `#c9a76a` (champagne gold)
- Navy: `#1a3a52` (hero/tiers/footer)
- Sage: `#7a8f7f` (tertiary)
- Text: `#2c2620` (warm charcoal)

**Why this matters:** The design system is intentionally frozen to teach learners that a well-built system absorbs business pivots (travel → events) without visual rework. These two specs reintroduce the old, discarded dark palette, which will confuse implementation.

**Recommendation:**
- **`luxurysite.md`:** Rewrite visual section to use warm ivory + champagne gold palette; remove "futuristic luxury," "glassmorphism," "neon gradient" language; align to "editorial restraint" principle
- **`site.md`:** Same — rewrite visual system section to reflect current frozen palette; update color tokens to match globals.css

### ⚠️ PARTIAL: Specialist Role Terminology (1 file)

**File:** `sample-data-pack.md`

**Issue:** Sample specialist profiles use old travel-era titles:
- "Destination Manager" → should be "Event Architect" or "Celebration Director"
- "Experience Curator" is acceptable but could be more event-specific (e.g., "Celebration Curator")

**Also:** Sample tier names in testimonials section reference old labels; should explicitly use One-Time, Yearly, Gift.

**Recommendation:**
- Update specialist role titles to match current voice guidelines
- Ensure all sample tier labels use One-Time / Yearly / Gift terminology
- This is a **P2** fix (non-breaking, but affects test data consistency)

---

## Aligned Specs (21 files)

All of the following specs are properly aligned with the brand pivot:

**Core Business/Architecture:**
- `brand-pivot.md` — Foundation; explicitly states pivot and new tier model
- `tier-architecture-spike.md` — Documents three transaction types with data model differences
- `booking-consultation-apis.md` — Three separate APIs; correct pricing tiers
- `backoffice-platform.md` — References One-Time, Yearly, Gift throughout

**Platform/Infrastructure:**
- `azure-architecture.md`
- `cicd-pipeline.md`
- `environment-strategy.md`
- `monorepo-architecture.md`
- `observability.md`

**Content/API:**
- `content-apis.md` — Tier-specific "experiences" catalog
- `content-management.md` — "Experience" content model
- `ai-excursion-builder.md` — Event generation with tier-aware constraints
- `copilot-planning-agent.md` — Tier policies, booking flow
- `frontend-data-migration.md` — Schema-agnostic event/tier model

**Documentation/Design:**
- `design-system-update.md` — Frozen palette; refers to pivot spec
- `documentation-update.md` — Teaches the pivot
- `accessibility-i18n.md` — Generic experience/booking language
- `security-architecture.md` + `security-architecture-update.md` — Tier-based RBAC models
- `unified-security-rbac.md` — Three tier types with distinct permissions
- `testing-strategy.md` — Tier-specific state machine tests

---

## Implementation Plan

### P1 (Critical — Blocks Implementation)

**Action:** Rewrite visual palette sections in `luxurysite.md` and `site.md`

| File | Current | Action | Estimated Effort |
|------|---------|--------|------------------|
| `luxurysite.md` | Dark theme (neon, glass, aurora-dark palette) | Rewrite color tokens, remove futuristic/glassmorphic language, align to warm ivory/champagne gold | 2–3 hours |
| `site.md` | Dark theme (neon, glass, aurora-dark palette) | Rewrite color tokens, remove futuristic/glassmorphic language, align to warm ivory/champagne gold | 2–3 hours |

**Reason for priority:** These specs will be referenced during Phase 2 implementation. Implementation engineers will see conflicting design signals (warm vs. dark palette) and waste time reconciling.

### P2 (Nice-to-Have — Non-Blocking)

**Action:** Update specialist role titles in `sample-data-pack.md`

| File | Current | Action | Estimated Effort |
|------|---------|--------|------------------|
| `sample-data-pack.md` | "Destination Manager," "Experience Curator" | Rename to "Event Architect," "Celebration Curator"; ensure sample tier labels use One-Time/Yearly/Gift | 1 hour |

**Reason for priority:** Affects test data consistency; not blocking but improves onboarding clarity.

---

## Conclusion

**Status: Audit Complete ✅**

- **21 of 24 specs** (87.5%) are properly aligned with the brand pivot
- **2 critical visual palette specs** need section rewrites (4–6 hours total effort)
- **1 sample data spec** needs terminology updates (1 hour)

The team is ready to proceed with Phase 2 implementation after addressing the two critical visual palette specs. All core business logic, APIs, security, and infrastructure specs are properly aligned.

---

## Next Steps (Morpheus)

1. Create issues #211 (visual palette rewrite — `luxurysite.md`) and #212 (visual palette rewrite — `site.md`) with P1 priority
2. Create issue #213 (sample data terminology refresh — `sample-data-pack.md`) with P2 priority
3. Assign to Trinity (design) for visual system specs; Dozer (or owner of sample data) for spec #213
4. Gate Phase 2 implementation on completion of #211 and #212
