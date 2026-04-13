# Key Findings: Backend/Infrastructure Dependency Analysis
**From:** Dozer (Backend/Cloud Architect)  
**To:** Morpheus (Sprint Planner)  
**Date:** 2025-07-21

---

## Executive Summary

All API specs are **complete and implementable**. Three tier types (one-time, yearly, gift) have distinct booking workflows, but specs are detailed enough to code. **No blockers** for starting backend work — but **timing on payment gateway integration is critical.**

**Dependency flow:** Infrastructure (IaC + databases) → Auth API → Content API → Booking API → APIM → Production readiness.

**Estimated Sprint 4:** 4 weeks (infrastructure, auth, content, booking v1, APIM, CI/CD).

---

## Critical Decisions Needed NOW

### 1. Payment Gateway Selection & Contract
**Status:** Spec mentions "payment integration touchpoints" but does not name a provider (Stripe, Square, etc.).

**Decision needed:** Which payment provider? By when?

**Why it matters:** 
- Booking API depends on payment state transitions (deposit calculation at planning → confirmed state)
- Can't finalize booking API endpoint contracts until we know payment API shape
- Implementation can't start until SDK is available + mock implementation ready

**Recommendation:**
- Decide on provider this week
- Week 1 Sprint 4: Create mock payment service (in-memory, deterministic)
- Week 3 Sprint 4: Integrate real provider (if ready)
- Fallback: Defer real integration to Sprint 5

**Owner:** Niobe (if AI-powered pricing) or Dozer (if standard Stripe/Square)

---

### 2. Multi-Language Support Scope (Phase 1 vs Future)
**Status:** Content APIs spec includes `?language=en` param, but Phase 1 doesn't specify supported languages or fallback behavior.

**Decision needed:** English-only for MVP, or support French/German/Spanish too?

**Why it matters:**
- Impacts CMS schema (need language field on every experience/specialist record)
- Content seeding effort increases 5x if multi-language in Phase 1
- API caching strategy changes (cache by language)

**Recommendation:**
- **Phase 1 MVP:** English only (drop language param, hardcode en)
- **Phase 2 Sprint 5:** Introduce language field + fallback logic
- **Implementation complexity:** Low (just a filtering dimension)

**Owner:** Dozer + Trinity (frontend needs to know what's available)

---

### 3. Monorepo Migration Timing
**Status:** Spec recommends Turborepo multi-app structure (apps/web, apps/api, apps/admin), but current state is single Next.js app.

**Decision needed:** Migrate immediately, or phase it in?

**Why it matters:**
- If we start API code in single app, migration mid-sprint is painful
- If we set up monorepo now, slightly higher setup overhead but cleaner later

**Recommendation:**
- **Week 0 (before Sprint 4):** Scaffold Turborepo structure + move web app into apps/web, create empty apps/api
- **Week 1:** Implement Auth API in apps/api
- **Week 3:** Create apps/admin skeleton (for CMS portal in Sprint 5)
- **Effort:** ~2 days upfront, saves 1–2 weeks of refactoring later

**Owner:** Dozer + Tank (Tank owns monorepo tooling for testing)

---

## Three Critical Risks

### Risk 1: State Machine Complexity ⚠️
Three booking workflows (one-time, yearly, gift) are **spec'd but untested**. If domain logic is wrong, Booking API needs major refactor.

**Mitigation:**
- Implement one-time state machine first (most detailed in spec)
- Unit test every state transition before touching yearly/gift
- Pair with domain expert (Morpheus?) to validate state diagram matches business

**Timeline impact:** +3–5 days if state machine redesign needed

---

### Risk 2: Payment Integration Unknowns
Booking API can't be completed without payment provider decision. Mocking helps but real integration will reveal edge cases.

**Mitigation:**
- Finalize payment contract this week (what amounts, currencies, error codes?)
- Mock payment service deployed by end of Week 1
- Real integration scheduled for Week 3 (not a blocker if delayed to Sprint 5)

**Timeline impact:** +1 week if payment provider not ready

---

### Risk 3: Cosmos DB Query Performance
Content API makes frequent Cosmos DB queries (experience catalog, specialist search). Slow queries will bottleneck development.

**Mitigation:**
- Populate test data in Cosmos DB Week 1
- Run perf tests on common queries (latency target: <100ms p99)
- Index strategy finalized before Content API implementation

**Timeline impact:** +1–2 days if indexing not optimized early

---

## Build Sequence (Sprint 4 Roadmap)

### Week 1: Foundation
- [ ] Bicep IaC (resource group, VNet, Key Vault, ACR, App Insights) — **2 days**
- [ ] PostgreSQL provisioning + migrations (users, bookings, payments) — **2 days**
- [ ] Cosmos DB setup (experiences, faqs, specialists) + seed data — **2 days**
- [ ] Monorepo scaffolding (Turborepo, apps structure) — **1 day**

### Week 2: Auth & Content APIs
- [ ] Auth API (login, logout, refresh + JWT middleware) — **3 days**
- [ ] Content API (tier, experience, specialist, FAQ endpoints) — **3 days**
- [ ] Integration tests (both APIs) — **1 day**

### Week 3: Booking API v1 & Gateway
- [ ] Booking API (one-time tier) — **4 days**
- [ ] APIM gateway configuration (routing, caching, rate limiting) — **2 days**
- [ ] End-to-end testing — **1 day**

### Week 4: Production Readiness
- [ ] Observability (App Insights logging, health endpoints, dashboards) — **2 days**
- [ ] CI/CD pipelines (PR validation, build, staging deploy) — **2 days**
- [ ] Security hardening (headers, secrets, CORS) — **2 days**
- [ ] Booking API v2 (yearly tier) — **2 days**

**Total: 4 weeks for Sprint 4 (infrastructure + APIs + production setup)**

---

## What Unblocks Frontend & AI Teams

| Team | Unblocked By | Timeline | What They Can Build |
|------|-------------|----------|-------------------|
| **Trinity (Frontend)** | Content API + Booking API | End of Week 3 | Catalog pages, consultation form, state display |
| **Niobe (AI Builder)** | Content API (data source) | End of Week 2 | Excursion recommendations, specialist matching |
| **Morpheus (Admin)** | CMS API spec finalized | End of Week 2 | Admin portal design, content workflows |
| **Tank (Testing)** | Backend APIs deployed | End of Week 3 | Integration tests, payment flow tests |

---

## Infrastructure Layers (Dependency Graph)

```
Tier 1: Networking & Secrets (Day 1)
  ├─ Resource Group
  ├─ VNet + Subnets
  ├─ Key Vault (JWT key, DB credentials)
  └─ Container Registry

Tier 2: Data (Day 2–3)
  ├─ PostgreSQL (aurora_bookings, aurora_transactions, aurora_users)
  └─ Cosmos DB (experiences, faqs, specialists)

Tier 3: APIs (Day 4–18)
  ├─ Auth API (port 3003)
  ├─ Content API (port 3001)
  └─ Booking API (port 3002)

Tier 4: Public Gateway (Day 19–20)
  └─ APIM (public entry point, rate limiting, caching)

Tier 5: Operations (Day 21–22)
  ├─ Application Insights (observability)
  └─ GitHub Actions (CI/CD)
```

---

## API Contracts Finalized ✅

All endpoints are specified, versioned, and ready to implement:

| Tier Type | Endpoints | State Machine | Auth |
|-----------|-----------|---------------|------|
| **One-Time Event** | POST /v2/bookings/one-time, GET /{id}, PUT /{id}, GET /{id}/timeline | inquiry → planning → confirmed → executed → completed | Customer (B2C) + Admin (Entra) |
| **Yearly Subscription** | POST /v2/bookings/yearly, renewal flow | active → renewal → paused → canceled | Customer (B2C) + Admin (Entra) |
| **Gift Purchase** | POST /v2/bookings/gift, redemption | pending → redeemed → expired | Gifter (B2C) + Recipient (B2C) + Admin (Entra) |
| **Content (Public)** | GET /v2/tiers, /v2/experiences, /v2/specialists, /v2/faqs | N/A (reads only) | Anonymous (cache only) |

All specs include validation rules, error codes, and state transition diagrams.

---

## Authentication Architecture Decision ✅

Two-provider model (B2C for customers, Entra for staff) is locked in:
- **Phase 1 (Sprint 4):** Local JWT + user table (teaching site)
- **Phase 2 (Sprint 5):** Azure AD B2C integration
- **Phase 3 (Sprint 6+):** mTLS for service-to-service

No blockers — implement with teaching pattern first, real integration later.

---

## Security Decisions ✅

All decided and ready to implement:
- **Token storage:** Access tokens in memory, refresh in HttpOnly cookies
- **MFA:** Staff required, customers optional
- **Data encryption:** PII encrypted at rest (Key Vault key)
- **Audit logging:** All auth, data access, admin actions logged immutably
- **Rate limiting:** 100 req/sec per API key (APIM)
- **CORS:** Frontend origin whitelisted

No design decisions blocking implementation.

---

## Unknowns That Can Be Deferred

These don't block Sprint 4:
1. **Multi-language support** — Defer to Phase 2
2. **AI-powered scheduling** — Defer to Sprint 5
3. **Email notification service** — Can be mock in Phase 1
4. **Back-office integrations** (Dynamics 365, Slack) — Defer to Sprint 5
5. **Advanced analytics** — Defer to Phase 2

---

## Bottom Line for Morpheus

✅ **Specs are ready** — No gaps, can start coding immediately.

✅ **Dependencies are clear** — Linear path: infrastructure → auth → content → booking → gateway.

⚠️ **One decision needed:** Payment gateway provider selection (impacts booking API contracts).

⚠️ **One risk:** State machine complexity (one-time tier is detailed, yearly/gift need validation).

✅ **Monorepo:** Recommend scaffolding this week (saves refactor work later).

🟢 **Unblocks:** Frontend and AI teams can start integration testing end of Week 2/3.

**Recommendation:** Start Sprint 4 with infrastructure + Auth API. Payment decision can happen in parallel without blocking.
