# Aurora Luxe — Master Sprint Plan

> **Author:** Morpheus (Lead/Architect)
> **Date:** 2026-04-15
> **Status:** Active
> **Covers:** 24 specs (S1–S8), 13 open issues, 23 identified missing issues

---

## 1. Project Phases

### Phase 0 — Housekeeping (Week 1)
> Clean the foundation before building on it.

**Goal:** Resolve spec contradictions, recall team members, create skills, configure tooling.

**Why first:** Multiple specs contradict each other (3 security specs, 2 overlapping site specs, stale palette references). Building on conflicting specs guarantees rework. Fix the map before marching.

### Phase 1 — Foundation (Weeks 2–3)
> Nail down brand, types, data model, and design system.

**Goal:** Finalize the ServiceTier discriminated union, migrate static data, stabilize the design system, and have the type foundation that every component, API, and form depends on.

### Phase 2 — Core Build (Weeks 4–7)
> Frontend features, API scaffold, booking flows, content APIs.

**Goal:** Build the actual application — new components (ExperiencePortfolio, FeaturedPackages, expanded ConciergeForm), API service layer, booking state machines, and content endpoints.

### Phase 3 — Intelligence & Security (Weeks 8–10)
> AI features, authentication, RBAC, admin portal.

**Goal:** Add Entra ID auth, tier-based RBAC, AI excursion builder MVP, copilot planning agent MVP, and the admin portal shell.

### Phase 4 — Production Readiness (Weeks 11–13)
> Infrastructure, CI/CD, observability, back office, final QA.

**Goal:** Azure infrastructure provisioned, CI/CD pipeline complete, Application Insights instrumented, back-office CRM configured, comprehensive test coverage, production deployment.

---

## 2. Sprint Breakdown

---

### Phase 0: Housekeeping

#### Sprint 0.1 — Spec Cleanup & Team Setup (Week 1)

**Goal:** Eliminate spec contradictions and activate the full team.

| Work Item | Spec/Issue | Assignee | Notes |
|-----------|-----------|----------|-------|
| Consolidate S5.1+S5.2+S5.3 → single security spec | **NEW P0** | Dozer | Blocks all auth implementation |
| Consolidate S1.2+S1.3 → single site spec | **NEW P1** (absorbs #280, #281, #282) | Trinity | Resolves 3 open issues at once |
| Recall Mouse from reserve | #270 | Morpheus | Needed for Phase 2 components |
| Recall Neo from reserve | #271 | Morpheus | Needed for Phase 2 booking flows |
| Add @copilot as autonomous agent | #272 | Morpheus | For mechanical task pickup |
| Create git-workflow skill | #266 | Morpheus | Team-wide workflow consistency |
| Create a11y-checklist skill | #269 | Tank | Codify accessibility standards |
| Create booking-flow skill | #268 | Morpheus | Codify 3-tier transaction patterns |
| Create azure-container-apps skill | #267 | Dozer | ACA deployment patterns |
| Add security constraints to frontend-data-migration.md | #284 | Dozer | Cross-reference S5 |
| Add API versioning to frontend-data-migration.md | #283 | Dozer | Cross-reference S3.2 |
| Typography audit | #278 | Trinity (typeset skill) | Holistic type pass |

**Definition of Done:**
- ✅ Single canonical security spec exists (S5 consolidated)
- ✅ Single canonical site spec exists (S1.2+S1.3 merged)
- ✅ Mouse and Neo active on roster
- ✅ @copilot configured for mechanical issues
- ✅ All 4 skills created and readable by agents
- ✅ S2.1 updated with security + versioning cross-references
- ✅ Typography audit complete with P0/P1 fixes applied
- ✅ All 66 existing tests still pass

---

### Phase 1: Foundation

#### Sprint 1.1 — Type System & Data Model (Week 2)

**Goal:** Implement the architectural backbone — discriminated union types and migrated data.

| Work Item | Spec/Issue | Assignee | Notes |
|-----------|-----------|----------|-------|
| Implement ServiceTier discriminated union types | S2.4, **NEW P0** | Neo | `OneTimeEvent \| YearlySubscription \| GiftPurchase` |
| Create shared types package (`packages/shared/`) | S6.2 | Neo | Types consumed by web, api, admin |
| Migrate static data files to new tier model | S2.3, **NEW P0** | Trinity | 8 data files → new brand language |
| Update sample data pack | S2.3 | Trinity | Realistic test data per spec |
| Design system token validation | S1.4 | Mouse | Verify globals.css tokens match spec |

**Dependencies:** Sprint 0.1 must be complete (consolidated specs as source of truth).

**Definition of Done:**
- ✅ `ServiceTier` type exported from `packages/shared/`
- ✅ All data files use new types and brand language
- ✅ Sample data covers all 3 tiers (one-time, yearly, gift)
- ✅ No import errors; all existing tests updated and passing
- ✅ Design tokens in globals.css validated against design-system-update spec

#### Sprint 1.2 — Brand Finalization (Week 3)

**Goal:** Landing page reflects the party platform brand with new components.

| Work Item | Spec/Issue | Assignee | Notes |
|-----------|-----------|----------|-------|
| Build ExperiencePortfolio component | S1.1, **NEW P1** | Trinity | Replaces DestinationGrid |
| Build FeaturedPackages component | S1.1, **NEW P1** | Mouse | Replaces ExperienceList |
| Update Hero section for brand pivot | S1.1 | Trinity | New copy, new imagery direction |
| Update page.tsx composition | S1.1 | Trinity | Swap old → new components |

**Dependencies:** Sprint 1.1 (types and data must exist).

**Definition of Done:**
- ✅ Landing page shows party platform brand (not travel)
- ✅ ExperiencePortfolio renders with category filtering
- ✅ FeaturedPackages renders with tier-aware cards
- ✅ Hero copy aligned with brand-pivot spec
- ✅ All tests pass (existing updated + new component tests)

---

### Phase 2: Core Build

#### Sprint 2.1 — API Scaffold & Booking Flows (Weeks 4–5)

**Goal:** Backend exists — API app scaffolded, booking state machines implemented.

| Work Item | Spec/Issue | Assignee | Notes |
|-----------|-----------|----------|-------|
| Scaffold `apps/api/` in monorepo | S6.2, **NEW P1** | Dozer | Express/Fastify + TypeScript |
| Implement booking consultation APIs | S3.1, **NEW P1** | Dozer | 3 state machines, tier validation |
| Implement content API v1 endpoints | S3.2, **NEW P1** | Dozer | Serve static data through adapters |
| Expand ConciergeForm with progressive disclosure | S1.1, **NEW P1** | Neo | Tier-driven conditional fields |
| Build form state machine (frontend) | S3.1 | Neo | Client-side booking flow states |

**Dependencies:** Phase 1 complete (types, data, brand components).

**Definition of Done:**
- ✅ `apps/api/` exists with health endpoint, booking endpoints, content endpoints
- ✅ State machine handles: inquiry → planning → confirmed → executed → completed
- ✅ ConciergeForm shows different fields per tier selection
- ✅ API serves content matching current static data
- ✅ Integration tests cover happy path for all 3 tier flows

#### Sprint 2.2 — Frontend Integration & CMS (Weeks 6–7)

**Goal:** Frontend consumes real APIs; CMS foundations laid.

| Work Item | Spec/Issue | Assignee | Notes |
|-----------|-----------|----------|-------|
| Frontend data adapter migration (Phase 2) | S2.1 | Neo | Switch from static imports to API fetch |
| Content management system setup | S3.3 | Niobe | Headless CMS with content models |
| Implement i18n framework | S2.2, **NEW P2** | Neo | next-intl, extract strings, en-US base |
| Integration test scaffold | S8.1, **NEW P1** | Tank | API mock server, test database |
| Automated a11y testing in CI | S2.2, **NEW P1** | Tank | axe-core in Playwright + Jest |

**Dependencies:** Sprint 2.1 (APIs must exist to integrate).

**Definition of Done:**
- ✅ Frontend fetches from API (falls back to static if API unavailable)
- ✅ CMS content models created for experiences, specialists, venues
- ✅ i18n working with en-US locale (string extraction complete)
- ✅ Integration tests exist and run in CI
- ✅ axe-core a11y checks run on every PR

---

### Phase 3: Intelligence & Security

#### Sprint 3.1 — Authentication & RBAC (Weeks 8–9)

**Goal:** Secure the platform — auth for admin/staff, RBAC across services.

| Work Item | Spec/Issue | Assignee | Notes |
|-----------|-----------|----------|-------|
| Implement Entra ID authentication | S5 consolidated, **NEW P1** | Dozer | Admin + staff auth |
| Build admin portal scaffold (`apps/admin/`) | S6.2, **NEW P2** | Neo | Auth-gated routes, layout shell |
| Implement RBAC middleware | S5 consolidated | Dozer | Role-based access per consolidated spec |
| Security headers hardening | S5 consolidated | Dozer | CSP, HSTS, X-Frame-Options |

**Dependencies:** Consolidated security spec (Sprint 0.1), API scaffold (Sprint 2.1).

**Definition of Done:**
- ✅ Admin portal requires Entra ID login
- ✅ API endpoints enforce RBAC (admin, planner, client, viewer roles)
- ✅ Security headers configured per spec
- ✅ Auth integration tests pass

#### Sprint 3.2 — AI Features (Weeks 9–10)

**Goal:** AI-powered experience generation and planner assistance.

| Work Item | Spec/Issue | Assignee | Notes |
|-----------|-----------|----------|-------|
| AI excursion builder MVP | S4.1, **NEW P2** | Niobe | GPT-4 prompt + brand guardrails |
| Copilot planning agent MVP | S4.2, **NEW P2** | Niobe | Tier policy Q&A, client context summary |
| AI content safety integration | S4.1 | Niobe | Azure AI Content Safety API |

**Dependencies:** Azure infrastructure (Sprint 4.1 can run in parallel if AI services provisioned early), booking APIs (Sprint 2.1).

**Definition of Done:**
- ✅ Excursion builder generates brand-aligned proposals from client preferences
- ✅ Planning agent answers tier policy questions accurately
- ✅ Content safety filters active on all AI outputs
- ✅ AI responses respect tier-specific constraints

---

### Phase 4: Production Readiness

#### Sprint 4.1 — Infrastructure & CI/CD (Weeks 11–12)

**Goal:** Azure infrastructure live, CI/CD pipeline complete, observability instrumented.

| Work Item | Spec/Issue | Assignee | Notes |
|-----------|-----------|----------|-------|
| Azure infrastructure provisioning (IaC) | S6.1, **NEW P1** | Dozer | Bicep: Container Apps, PostgreSQL, App Insights, CDN |
| Implement CI/CD pipeline | S6.3, **NEW P1** | Dozer | GitHub Actions: build → test → deploy |
| Environment strategy configuration | S6.4 | Dozer | Dev/staging/prod with feature flags |
| Set up Application Insights | S6.5, **NEW P2** | Dozer | OpenTelemetry auto-instrumentation |
| Create observability skill | **NEW P2** | Dozer | Codify logging/metrics/tracing patterns |

**Dependencies:** APIs and frontend built (Phases 1–3).

**Definition of Done:**
- ✅ Dev environment running on Azure Container Apps
- ✅ CI/CD deploys to staging on merge to main
- ✅ Production deploy requires manual approval gate
- ✅ Application Insights receiving telemetry
- ✅ All three environments (dev/staging/prod) configured

#### Sprint 4.2 — Back Office & Final QA (Weeks 12–13)

**Goal:** Internal operations tooling live, comprehensive QA, production launch readiness.

| Work Item | Spec/Issue | Assignee | Notes |
|-----------|-----------|----------|-------|
| Back-office platform setup | S7.1, **NEW P2** | Niobe | Dynamics 365 CRM + Power Apps dashboard |
| Create content-model skill | **NEW P2** | Niobe | CMS schema patterns |
| End-to-end booking flow tests (all 3 tiers) | S8.1 | Tank | Full user journey validation |
| Performance audit | S8.1 | Tank | Lighthouse, bundle analysis |
| Security penetration testing | S5 consolidated | Tank | OWASP top 10, auth bypass attempts |
| Final a11y audit | S2.2 | Tank | Full WCAG 2.1 AA compliance check |

**Dependencies:** All prior phases complete.

**Definition of Done:**
- ✅ CRM configured with client entities and booking pipeline
- ✅ All 3 tier booking flows pass E2E tests
- ✅ Lighthouse performance score ≥ 90
- ✅ No critical/high security findings
- ✅ WCAG 2.1 AA compliance verified
- ✅ Production deployment successful

---

## 3. Dependency Graph

```
Phase 0 (Week 1)
├── Spec consolidation (S1 merge, S5 merge)
├── Team recall (Mouse, Neo, @copilot)
├── Skills creation (4 skills)
└── Spec patches (#278, #283, #284)
     │
     ▼
Phase 1 (Weeks 2-3)
├── Sprint 1.1: Types + Data ──────────┐
│   (ServiceTier types, data migration) │
└── Sprint 1.2: Brand Components ◄─────┘
     │   (ExperiencePortfolio, FeaturedPackages)
     │
     ▼
Phase 2 (Weeks 4-7)
├── Sprint 2.1: APIs + Booking ─────────┐
│   (API scaffold, state machines,      │
│    ConciergeForm expansion)           │
└── Sprint 2.2: Integration ◄──────────┘
     │   (Frontend↔API, CMS, i18n, tests)
     │
     ├────────────────┐
     ▼                ▼
Phase 3 (Weeks 8-10)         
├── Sprint 3.1: Auth/RBAC ──── Sprint 3.2: AI Features
│   (Entra ID, admin portal,    (Excursion builder,
│    RBAC middleware)             planning agent)
│        │                            │
         └────────────┬───────────────┘
                      ▼
Phase 4 (Weeks 11-13)
├── Sprint 4.1: Infrastructure
│   (Azure IaC, CI/CD, observability)
└── Sprint 4.2: Back Office + QA
    (CRM, final testing, launch)
```

**Critical Path:** Phase 0 → Sprint 1.1 → Sprint 1.2 → Sprint 2.1 → Sprint 2.2 → Sprint 3.1 → Sprint 4.1

**Parallelizable:**
- Sprint 3.2 (AI) can run alongside Sprint 3.1 (Auth) if Azure AI services provisioned early
- Sprint 4.2 (Back Office) starts as soon as APIs are stable (Week 12), doesn't block Sprint 4.1
- Skills creation (Phase 0) can run in parallel with spec consolidation
- Tank's testing work runs continuously from Phase 2 onward

---

## 4. Team Capacity Plan

### Active Roster (Phase 0)

| Agent | Role | Primary Focus |
|-------|------|---------------|
| **Morpheus** | Lead/Architect | Sprint planning, code review, team routing, spec consolidation decisions |
| **Trinity** | Frontend Dev | Site spec merge, brand components, data migration |
| **Tank** | Tester | Skills creation, test infrastructure, continuous QA |
| **Dozer** | Backend/Cloud | Security spec consolidation, API scaffold, Azure infra |
| **Niobe** | AI/Integration | CMS setup, AI features, back-office platform |

### Recall Schedule

| Agent | Recall | Phase | Justification |
|-------|--------|-------|---------------|
| **Mouse** | Week 1 (#270) | Phase 0 | FeaturedPackages component (Sprint 1.2), design system validation |
| **Neo** | Week 1 (#271) | Phase 0 | ServiceTier types (Sprint 1.1), ConciergeForm expansion (Sprint 2.1), admin portal (Sprint 3.1) |
| **@copilot** | Week 1 (#272) | Phase 0 | Mechanical tasks: scaffolding, dependency bumps, boilerplate, typo fixes |

### Agent Assignments Across Phases

| Agent | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|-------|---------|---------|---------|---------|---------|
| Morpheus | Spec decisions, team setup | Review, unblock | Review, unblock | Review, unblock | Review, launch |
| Trinity | Site spec merge, #278 | Brand components, data migration | — | — | — |
| Mouse | Design token validation | FeaturedPackages | UI polish | — | — |
| Neo | — | ServiceTier types | ConciergeForm, adapters, i18n | Admin portal | — |
| Dozer | Security spec, #283/#284 | — | API scaffold, booking APIs | Auth, RBAC | Azure IaC, CI/CD |
| Niobe | — | — | CMS setup | AI features | Back office |
| Tank | a11y skill | — | Integration tests, a11y CI | Security testing | Final QA |
| @copilot | — | Mechanical tasks | Mechanical tasks | Mechanical tasks | Mechanical tasks |

---

## 5. Risk Register

| # | Risk | Impact | Likelihood | Mitigation |
|---|------|--------|-----------|------------|
| R1 | **Security spec consolidation stalls** — 3 overlapping specs with contradictions | High — blocks all auth/RBAC work (Phase 3) | Medium | Dozer owns consolidation with Morpheus review. Timebox to 3 days. If stalled, Morpheus makes executive decisions on contradictions. |
| R2 | **ServiceTier type migration breaks existing tests** — 66 tests depend on current types | Medium — rework delays Phase 1 | High | Neo implements types alongside old types (additive migration). Old types deprecated, not deleted. Tests updated incrementally. |
| R3 | **API scaffold technology choice blocks progress** — Express vs Fastify vs Hono debate | Medium — delays Sprint 2.1 | Low | Morpheus decides upfront: Express (most team familiarity, largest ecosystem). No bikeshedding. |
| R4 | **Azure infrastructure costs exceed teaching-site budget** — full architecture is enterprise-grade | Low — cost only, not blocking | Medium | Start with dev-only tier (single region, 1 replica, B-series VMs). Production architecture documented but not deployed until needed. |
| R5 | **Brand pivot creates ongoing spec churn** — "party platform" definition keeps shifting | High — invalidates downstream work | Low | S1.1 (brand-pivot) is frozen after Phase 0. Any brand changes require Morpheus approval and impact analysis before proceeding. |
| R6 | **Team capacity bottleneck on Dozer** — Backend/Cloud owns API, security, and infrastructure | High — Dozer is on critical path for Phases 2–4 | High | Prioritize Dozer's work by phase. Phase 2: APIs only (no infra). Phase 3: security only. Phase 4: infrastructure. Neo can assist with API implementation if needed. |
| R7 | **CMS vendor selection delays** — Contentful vs Strapi vs custom | Medium — blocks content management | Medium | Phase 2 uses API-backed static data (no CMS dependency). CMS is additive in Sprint 2.2 — can slip to Phase 3 without blocking the critical path. |
| R8 | **AI features depend on Azure AI services provisioning** — GPT-4 deployment, Content Safety | Medium — delays Sprint 3.2 | Medium | Provision Azure AI services in Sprint 4.1 (infrastructure), but request early access/quota in Phase 0. AI MVP can use direct Azure OpenAI API before APIM gateway. |

### Biggest Uncertainty

**The three-tier transaction model is the project's architectural bet.** One Time, Yearly, and Gift are structurally different products — different data shapes, different state machines, different auth patterns, different billing. If the discriminated union pattern doesn't hold (e.g., a fourth tier type emerges, or tiers need to share more logic than expected), the ripple effect touches every subsystem. The architecture spike (S2.4) must be validated in code (Sprint 1.1) before downstream sprints assume it works.

---

## 6. Success Metrics

| Metric | Target | Measured When |
|--------|--------|---------------|
| Spec contradictions resolved | 0 conflicting specs | End of Phase 0 |
| Test coverage | ≥ 80% unit, full E2E for booking flows | End of Phase 2 |
| API response time | < 200ms p95 | End of Phase 4 |
| WCAG 2.1 AA compliance | 100% of interactive elements | End of Phase 4 |
| Lighthouse performance | ≥ 90 | End of Phase 4 |
| Production deployment | Zero-downtime blue-green | End of Phase 4 |
| Time to onboard new contributor | < 1 hour (README → first PR) | Continuous |
