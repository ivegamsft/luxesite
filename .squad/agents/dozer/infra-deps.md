# Backend & Infrastructure Dependency Analysis
**Prepared by:** Dozer (Backend/Cloud Architect)  
**Date:** 2025-07-21  
**Purpose:** Sprint planning — identify build order, prerequisites, and blockers

---

## 1. Prerequisites (Must Exist Before Backend Work Starts)

### 1.1 Data Model Decisions ✅
- **Booking state machines** — THREE separate flows (one-time, yearly, gift) with unique validation, payment, and lifecycle rules
  - **Impact:** Requires entity design for each tier type; cannot be unified until business rules solidify
  - **Status:** Spec complete (s3-apis-content/booking-consultation-apis.md); proceed
  
- **Content taxonomy** — Experiences, Specialists, Venues, FAQs with tier-specific availability
  - **Impact:** Must design Cosmos DB schema for experiences + PostgreSQL schema for transactional data
  - **Status:** Models defined in s3-apis-content/content-management.md; ready
  
- **User/Authorization model** — Two identity providers (B2C for customers, Entra for staff); seven roles (anonymous, customer, editor, admin, tier admin, event planner, event staff, gift recipient)
  - **Impact:** JWT claims structure, role-to-permission mapping, database schema for audit
  - **Status:** Defined in s5-security-auth/unified-security-rbac.md; ready

### 1.2 Security Architecture Decisions ✅
- **Authentication:** Two-provider model (Azure AD B2C + Azure AD Entra)
  - **Decision needed:** MFA enforcement timeline (staff required immediately; customers encouraged)
  - **Status:** Complete; Phase 1 uses local JWT + user table (teaching), Phase 2 integrates B2C
  
- **Token storage:** Access tokens in memory, refresh tokens in HttpOnly cookies
  - **Decision needed:** When to migrate from teaching-only local JWT to B2C/Entra
  - **Status:** Complete; affects API middleware implementation
  
- **Data encryption:** PII (consultation form data) must be encrypted at rest
  - **Decision needed:** Encryption key strategy (Key Vault rotation policy)
  - **Status:** Requires Key Vault setup before production deployment
  
- **Rate limiting & DDoS protection:** APIM throttling + WAF rules
  - **Decision needed:** Threshold tuning per endpoint (e.g., 100 req/sec, per-user limits)
  - **Status:** Spec complete; APIM policies ready to deploy

### 1.3 API Contract Definitions ✅
**Frontend, AI, and back-office teams DEPEND on these:**

| API | Endpoints | Status | Blocks |
|-----|-----------|--------|--------|
| **Content APIs** | GET /v2/tiers, /v2/experiences, /v2/specialists, /v2/faqs | ✅ Spec complete | Frontend catalog; AI training data |
| **Booking APIs** | POST /v2/bookings/{tier-type}, state transitions, timeline | ✅ Spec complete | Frontend consultation form; payment flow |
| **Auth APIs** | POST /auth/login, /auth/refresh, /auth/logout | ✅ Spec complete | All protected endpoints |
| **Admin CMS APIs** | Content publish workflow, versioning, media upload | 🔶 Partial spec | Back-office integration |

**Critical:** All three tier types (one-time, yearly, gift) have separate API shapes. Specs are complete.

### 1.4 Infrastructure Readiness
- **Azure Resource Group & networking** — VNet, subnets, NSGs must exist before Container Apps
- **Key Vault setup** — Secrets for DB credentials, API keys, encryption keys
- **Container Registry** — Azure Container Registry for Docker images
- **CI/CD foundational pipelines** — GitHub Actions workflows for PR validation, build, test

---

## 2. Build Order (Sequence for Backend Services)

### Phase 1: Foundation (Weeks 1–2)
**Goal:** Core infrastructure and auth layer ready; unblocks API development

#### 1.1 Infrastructure-as-Code (Bicep)
- **Deliverable:** Resource group, VNet, subnets, NSGs, Key Vault, Container Registry, Application Insights
- **Dependencies:** Azure subscription with permissions
- **Timeline:** 1 week
- **Outputs:** Resource IDs, connection strings for services
- **Blocks:** Everything downstream (APIs, databases, CI/CD)

**Artifacts:**
```
infra/bicep/
  ├── main.bicep              # Entry point
  ├── resource-group.bicep
  ├── networking.bicep        # VNet, subnets
  ├── key-vault.bicep
  ├── container-registry.bicep
  ├── application-insights.bicep
  └── parameters/
      ├── dev.json
      ├── staging.json
      └── prod.json
```

#### 1.2 Databases (PostgreSQL + Cosmos DB)
- **PostgreSQL (transactional):** Bookings, payments, users, audit logs
  - Databases: `aurora_bookings`, `aurora_transactions`, `aurora_users`
  - High Availability: Zone-redundant, 7-day backup
  - Connection pooling: pgBouncer
  - Status: Ready to provision
  
- **Cosmos DB (content):** Experiences, FAQs, specialists
  - Collections: experiences (partition /category), faqs (partition /language), specialist_profiles (partition /tierType)
  - Autoscale 400–20,000 RU/s
  - Single-region (eastus2) with failover to westus2
  - Status: Ready to provision
  
- **Timeline:** 1 week (parallel with Bicep)
- **Outputs:** Connection strings, schemas, initial indices
- **Blocks:** API development, Content API

**Schema artifacts:**
```
infra/schemas/
  ├── postgres/
  │   ├── migrations/       # Alembic or Flyway
  │   ├── 001_users.sql
  │   ├── 002_bookings.sql
  │   └── 003_payments.sql
  └── cosmos/
      ├── experiences.json  # Sample document
      ├── faqs.json
      └── specialist_profiles.json
```

### Phase 2: API Core Layer (Weeks 3–4)
**Goal:** Three core APIs deployable and testable; frontend can start integration

#### 2.1 Auth API (Priority 1 — Unblocks Everything)
- **Endpoints:** 
  - `POST /auth/login` (email/password + teaching API key)
  - `POST /auth/refresh` (refresh token rotation)
  - `POST /auth/logout` (invalidate session)
  
- **Implementation:**
  - JWT generation + validation middleware
  - Local user table (Phase 1) → B2C integration (Phase 2, future)
  - Token blacklist for logout
  - MFA placeholder (Phase 2)
  
- **Dependencies:** PostgreSQL users table, Key Vault for signing keys
- **Timeline:** 1 week
- **Tests:** Unit (token generation), integration (login flow)
- **Blocks:** All other APIs (require auth middleware)

**Structure:**
```
apps/api/src/
  ├── routes/auth.ts
  ├── middleware/auth.ts       # JWT validation
  ├── services/auth-service.ts # Token logic
  ├── models/user.ts
  └── __tests__/auth.test.ts
```

#### 2.2 Content API (Priority 1.5 — Required for Frontend)
- **Endpoints:**
  - `GET /v2/tiers` — Tier catalog
  - `GET /v2/experiences?tierType=one-time` — Tier-specific catalog
  - `GET /v2/experiences/{id}` — Experience detail
  - `GET /v2/specialists?expertise=event-design` — Specialist search
  - `GET /v2/faqs?category=gifting` — FAQ lookup
  
- **Implementation:**
  - Query Cosmos DB for content
  - Cache responses (30 min TTL) in APIM
  - Tier-based response filtering (don't return draft content)
  - Multilingual support (language query param)
  
- **Dependencies:** Cosmos DB populated with seed data, APIM routing policy
- **Timeline:** 1 week
- **Tests:** Integration with Cosmos DB, caching validation
- **Blocks:** Frontend catalog page, AI excursion builder data source

**Structure:**
```
apps/api/src/
  ├── routes/content.ts
  ├── services/cosmos-service.ts
  ├── models/Experience.ts
  ├── middleware/cache.ts
  └── __tests__/content.test.ts
```

#### 2.3 Booking API (Priority 2 — Core Business Logic)
- **Endpoints:**
  - `POST /v2/bookings/one-time` — Create inquiry
  - `PUT /v2/bookings/{id}` — State transition
  - `GET /v2/bookings/{id}/timeline` — Milestone tracking
  - (Yearly and Gift variants)
  
- **Implementation:**
  - State machine validation for each tier type
  - Consultation slot scheduling (future: AI-powered)
  - Deposit payment validation (integrate with payment gateway)
  - Email notifications (async, via queue)
  
- **Dependencies:** PostgreSQL bookings schema, Auth API, payment gateway integration
- **Timeline:** 2 weeks (more complex)
- **Tests:** State machine tests, payment flow tests, validation tests
- **Blocks:** Frontend consultation form, payment processing

**Structure:**
```
apps/api/src/
  ├── routes/bookings.ts
  ├── services/booking-service.ts
  ├── models/Booking.ts
  ├── state-machines/
  │   ├── one-time.ts
  │   ├── yearly.ts
  │   └── gift.ts
  ├── validators/booking.ts
  └── __tests__/booking.test.ts
```

### Phase 3: Production-Readiness (Weeks 5–6)
**Goal:** Observability, security hardening, CI/CD automation in place

#### 3.1 APIM Gateway Setup
- **Policies:**
  - Request throttling (100 req/sec default, per-tier overrides)
  - JWT validation
  - Response caching (per endpoint TTL)
  - API versioning routes (/v1/ → legacy, /v2/ → current)
  
- **Dependencies:** Auth API live, backend services deployed
- **Timeline:** 1 week
- **Blocks:** Public API access, developer portal

#### 3.2 Observability (Application Insights)
- **Logging:** Structured JSON logs to App Insights
  - Booking state transitions
  - Payment events
  - Email delivery
  - No PII in logs (use user_id, not email)
  
- **Metrics:**
  - Booking funnel (inquiry → confirmation → completion)
  - API latency (p50, p95, p99)
  - Error rate (per endpoint)
  - Payment success rate
  
- **Alerts:**
  - High error rate (>5% in 5 min)
  - Database unavailable
  - Payment gateway timeout
  
- **Dependencies:** Application Insights SDK in APIs, health endpoints
- **Timeline:** 1 week
- **Blocks:** Production deployment

#### 3.3 CI/CD Pipeline (GitHub Actions)
- **Workflows:**
  - PR validation: lint, type-check, unit tests, security scan
  - Build & push: Docker build, push to ACR
  - Deploy staging: Manual approval, integration tests
  - Deploy production: Blue-green, manual approval
  
- **Dependencies:** GitHub Actions setup, ACR, Bicep automation
- **Timeline:** 1 week
- **Blocks:** Automated releases

**Structure:**
```
.github/workflows/
  ├── pr-validation.yml      # Lint, test, security scan
  ├── build-push.yml         # Docker build, ACR push
  ├── deploy-staging.yml     # Bicep deploy to staging
  └── deploy-prod.yml        # Blue-green to production
```

---

## 3. Infrastructure Layers (Azure Resource Provisioning Order)

```
Dependency Flow:
┌─────────────────────┐
│ Resource Group      │ (foundational)
│ VNet + Subnets      │
├─────────────────────┤
│ Key Vault           │ (secrets + encryption keys)
│ Container Registry  │
│ Application Insights│
├─────────────────────┤
│ PostgreSQL (HA)     │ (transactional data)
│ Cosmos DB           │ (content data)
├─────────────────────┤
│ Container Apps      │ (auth, content, booking)
│ (private networking)│
├─────────────────────┤
│ APIM (gateway)      │ (public entry point)
│ CDN (for static)    │ (optional, future)
└─────────────────────┘
```

### Layer 1: Networking & Secrets (Must Exist First)
- **Azure Resource Group**
- **VNet (10.0.0.0/16)** with subnets:
  - Container Apps subnet (10.0.1.0/24)
  - Database subnet (10.0.2.0/24)
  - Private endpoints (10.0.3.0/24)
- **Network Security Groups (NSGs):**
  - Ingress: Only APIM → Container Apps
  - Egress: Container Apps → databases only
- **Azure Key Vault:**
  - DB connection strings
  - API signing keys
  - Payment gateway credentials
  - Encryption keys

### Layer 2: Data Layer
- **PostgreSQL (Standard_B4ms, Zone-redundant HA)**
  - Databases: aurora_bookings, aurora_transactions, aurora_users
  - Backup: 7-day retention
  - Connection pool: pgBouncer (500 connections)
  - DNS: aurora-prod-postgres.postgres.database.azure.com
  
- **Cosmos DB (Single-region eastus2 + failover westus2)**
  - Collections: experiences, faqs, specialist_profiles
  - Autoscale: 400–20,000 RU/s
  - TTL: 30 days for cached content
  - DNS: aurora-prod.documents.azure.com

### Layer 3: Application Layer (Container Apps)
- **Auth API (3003)**
  - Replicas: 2–6 (prod), 1 (dev)
  - CPU: 0.5–2, Memory: 1–4 Gi
  - Scaling: CPU >70%, memory >80%
  
- **Content API (3001)**
  - Replicas: 2–10 (prod), 1 (dev)
  - Cache: 30 min TTL responses
  
- **Booking API (3002)**
  - Replicas: 3–15 (prod), 1 (dev)
  - More replicas for transaction load

All services: Private VNet integration, no public IPs.

### Layer 4: Public Gateway
- **APIM (Single instance, Standard tier)**
  - Rate limiting: 100 req/sec per API key
  - Developer portal for API testing
  - Request/response logging → App Insights
  - Caching: Redis co-hosted, 30 min TTL
  
- **Azure CDN (optional, future)**
  - Static frontend assets
  - Experience image gallery

---

## 4. API Contracts (Must Be Defined First)

**Status:** All specs complete; ready for implementation

### 4.1 Content APIs (Public, No Auth Required)
```
GET /v2/tiers
  → MembershipTier[]
  Cache: 1 hour

GET /v2/tiers/{tierType}
  → ServiceTier (with tier-specific fields)
  
GET /v2/tiers/{tierType}/catalog?limit=50&offset=0&language=en
  → { experiences: Experience[], pagination }
  Cache: 30 minutes
  Note: Gift tier returns curated high-value subset

GET /v2/experiences?tierType=one-time&featured=true
  → { experiences: Experience[], pagination }
  Cache: 30 minutes

GET /v2/experiences/{experienceId}
  → Experience (full detail, tier-specific pricing)
  Cache: 30 minutes

GET /v2/specialists?expertise=event-design&language=en
  → { specialists: SpecialistProfile[], pagination }
  Cache: 1 hour

GET /v2/faqs?category=gifting&language=en
  → { faqs: FAQ[], categories: string[] }
```

### 4.2 Booking APIs (Protected, Customer/Admin Auth)
```
POST /v2/bookings/one-time
  Body: {
    tierType: "one-time",
    eventBrief, eventDate, guestCount, venuePreferences,
    budgetRange: { min, max, currency },
    specialRequirements
  }
  Response: { bookingId, status: "inquiry", consultationSlots, nextSteps }
  Status: 201 Created
  State: inquiry → (after consultant call) → planning → confirmed → executed → completed

PUT /v2/bookings/{bookingId}
  Body: { status, eventDetails }
  Response: Booking (updated)
  State transitions: inquiry→planning→confirmed→executed→completed

GET /v2/bookings/{bookingId}/timeline
  Response: { current, milestones, nextDeadline }

POST /v2/bookings/yearly (similar, but subscription flow)
POST /v2/bookings/gift (similar, but gifting flow)
```

### 4.3 Auth APIs (Protected, All Users)
```
POST /auth/login
  Body: { email, password }
  Response: { accessToken, refreshToken, expiresIn }
  Cookie: Set-Cookie: refresh_token=... (HttpOnly, Secure)

POST /auth/refresh
  Body: { (refresh token in cookie) }
  Response: { accessToken, expiresIn }

POST /auth/logout
  Response: { status: "logged out" }
  Cookie: Clear refresh_token
```

### 4.4 Admin CMS APIs (Protected, Editors/Admins Only)
```
GET /admin/content/experiences (list drafts + published)
POST /admin/content/experiences (create draft)
PUT /admin/content/experiences/{id} (update draft)
POST /admin/content/experiences/{id}/publish (move to published)
DELETE /admin/content/experiences/{id}/draft (discard draft)

GET /admin/content/experiences/{id}/versions (revision history)
POST /admin/content/experiences/{id}/rollback (revert to version)

POST /admin/media/upload (drag-drop images/PDFs)
GET /admin/bookings (list all bookings)
GET /admin/audit-log (compliance log)
```

### 4.5 Middleware Requirements
**All protected endpoints must validate:**
- JWT signature (via Key Vault public key)
- Token expiration
- Role claims (via RBAC matrix)
- Rate limits (via APIM)

---

## 5. Security Prerequisites

### 5.1 Before Coding Backend APIs
- [ ] **Azure AD B2C tenant provisioned** (for customer auth)
- [ ] **Azure AD (Entra) configured** (for staff auth)
- [ ] **Key Vault secrets created:**
  - JWT signing key
  - DB connection strings
  - Payment gateway API keys
  - Encryption key for PII
- [ ] **PostgreSQL users table schema** (for Phase 1 teaching)
- [ ] **CORS policy defined** (frontend origin whitelisted)
- [ ] **HTTPS/TLS enforced** (all APIs)

### 5.2 Before Production Deployment
- [ ] **Encryption at rest** — PII in PostgreSQL + Cosmos DB encrypted via Key Vault
- [ ] **Rate limiting policies** — APIM configured per endpoint
- [ ] **WAF rules** — Azure Application Gateway or Front Door WAF
- [ ] **Audit logging** — All auth, data access, and admin actions logged immutably
- [ ] **Security headers** — Strict-Transport-Security, CSP, X-Frame-Options, X-Content-Type-Options
- [ ] **MFA enforcement** — Staff required, customers optional (encouraged)
- [ ] **Token rotation** — Refresh token invalidation on logout
- [ ] **PII data classification** — Consultation form data, payment details, email redacted in logs

### 5.3 During Development
- [ ] **Input validation** — All booking fields validated server-side
- [ ] **SQL injection prevention** — Parameterized queries only
- [ ] **CSRF tokens** — On form submissions
- [ ] **No hardcoded secrets** — All credentials from Key Vault
- [ ] **Dependency scanning** — npm audit, Snyk integration in CI

---

## 6. Risks & Blockers

### 🔴 Critical Risks

#### Risk 1: State Machine Complexity
**Problem:** Three tier types (one-time, yearly, gift) each have unique booking flows with payment integration touchpoints. Different validation rules, milestone tracking, and event scheduling logic.

**Impact:** If state machine design isn't nailed down, Booking API will need major refactoring mid-sprint.

**Mitigation:**
- Booking spec is complete and detailed (state diagrams included)
- Recommend pair-programming first state machine (one-time) with domain expert validation before starting yearly/gift
- Early unit tests for state transitions

**Timeline:** 1 week design sprint before implementation

---

#### Risk 2: Payment Gateway Integration Timing
**Problem:** Booking API requires payment processing (deposit calculation, charge triggers, refund logic). Payment provider SDK integration adds complexity and external dependency.

**Impact:** If payment gateway isn't available/tested early, Booking API is blocked at 50%.

**Mitigation:**
- Define payment API contract NOW (amounts, currencies, error codes)
- Mock payment gateway for dev/staging (don't depend on real payment provider during development)
- Separate payment service from booking state machine (cleaner testing)
- Week 1: Finalize payment contract
- Week 2: Mock payment service deployed
- Week 3: Real payment gateway integration (optional for Phase 1)

**Dependency:** Payment provider must be selected + API docs reviewed

---

#### Risk 3: Cosmos DB vs PostgreSQL Schema Design
**Problem:** Content is split between Cosmos DB (experiences, FAQs — schema-flexible, globally distributed) and PostgreSQL (bookings, payments — transactional, ACID). If schemas aren't coordinated, API layer will have impedance mismatch.

**Impact:** Slow queries, data inconsistency, Complex ORM/query layer.

**Mitigation:**
- Week 1: Finalize Cosmos DB document schemas (experiences, specialists, faqs)
- Week 1: Finalize PostgreSQL schemas (bookings, payments, users, audit)
- Create sample documents + SQL migrations in Git NOW
- Test query performance before API implementation

**Deliverable:** `infra/schemas/` populated with `.json` (Cosmos) and `.sql` (Postgres) files

---

### 🟡 Major Risks

#### Risk 4: Multi-Language Support in APIs
**Spec mentions:** `?language=en` query param on Content APIs.

**Problem:** If frontend requests `?language=fr` but Cosmos DB doesn't have French experience descriptions, what's the fallback? API spec doesn't say.

**Mitigation:**
- Clarify spec: What languages are supported in Phase 1? (English-only for MVP?)
- Define fallback: Return English if requested language missing?
- Implement content language validation in CMS workflow

---

#### Risk 5: APIM Caching & Cache Invalidation
**Problem:** Content API caches responses (30 min TTL). But when editors publish new experience in CMS, customers might see stale data for 30 minutes.

**Mitigation:**
- CMS publish workflow triggers APIM cache purge webhook
- Or: Use shorter cache TTL during early phases (5 min), increase later
- Document cache behavior in API docs so frontend devs understand

---

### 🟢 Minor Risks

#### Risk 6: Monorepo vs Multi-Repo Decision
**Spec recommends:** Turborepo monorepo structure (apps/web, apps/api, apps/admin, packages/shared).

**Problem:** Migration from current single-app to multi-app is a big refactor. Timing?

**Mitigation:**
- Phase 1 (weeks 1–3): Build Booking + Content APIs in separate `apps/api` app (keep apps/web as-is)
- Week 3: Migrate shared types to `packages/shared`, update both apps
- Week 4+: Build admin portal as `apps/admin`

---

#### Risk 7: Test Data & Seeding
**Problem:** Dev, staging, prod need seed data (experiences, specialists, venues, tier definitions).

**Mitigation:**
- Create seed scripts in Week 1
- Experiences: Load from JSON file into Cosmos DB
- Bookings: Synthetic test data only (no production bookings in dev)
- Respect retention policies (dev 7 days, staging 30 days, prod 90 days)

---

## 7. Sprint Planning Recommendations

### Sprint 4 (Infrastructure & Foundation)
**Weeks 1–2:**
- [ ] Bicep IaC for resource group, VNet, Key Vault, ACR, App Insights
- [ ] PostgreSQL provisioning (schemas + migrations)
- [ ] Cosmos DB setup (collections, seed data)
- [ ] Auth API implementation + local user table
- [ ] CI/CD pipeline setup (PR validation, build, test)

**Weeks 3–4:**
- [ ] Content API implementation (query Cosmos DB)
- [ ] Booking API v1 (one-time tier only)
- [ ] APIM gateway configuration
- [ ] Observability: App Insights logging, health endpoints
- [ ] Integration testing

**Blockers resolved:**
- Frontend can start integrating Content + Booking APIs
- AI team has data source for excursion builder
- Payment gateway contract finalized (ready for Phase 2)

### Sprint 5 (Production Readiness & Expansion)
- Booking API v2 (yearly tier)
- Booking API v3 (gift tier)
- Payment integration (mock → real)
- Security hardening: MFA, audit logging, encryption at rest
- Load testing + performance tuning
- CMS admin portal design

### Sprint 6+ (Feature Expansion)
- AI-powered consultation scheduling
- Email notification service
- Back-office integrations (Dynamics 365, Slack)
- Multi-language support
- Analytics dashboards

---

## 8. Key Deliverables Checklist

### End of Sprint 4
- [ ] Three Container Apps deployed (auth, content, booking)
- [ ] PostgreSQL + Cosmos DB populated + tested
- [ ] Auth API fully functional (login, logout, refresh)
- [ ] Content API queryable (tiers, experiences, specialists, FAQs)
- [ ] Booking API in "inquiry" state (POST → GET works)
- [ ] APIM gateway public endpoint live
- [ ] CI/CD pipelines automated (PR → build → staging)
- [ ] App Insights dashboards configured
- [ ] API specs published (developer portal ready)
- [ ] Test coverage >80%

### Risks Mitigated
- [ ] Payment gateway contract finalized (decision point)
- [ ] State machine tests passing (unit + integration)
- [ ] Cosmos DB queries optimized (latency < 100ms p99)
- [ ] PostgreSQL connection pooling verified
- [ ] Security headers configured

---

## 9. Dependency Summary Table

| Component | Depends On | Owner | Timeline | Blocks |
|-----------|-----------|-------|----------|--------|
| **Bicep IaC** | Azure subscription | Dozer | Week 1 | All infrastructure |
| **PostgreSQL** | Bicep, Key Vault | Dozer | Week 1 | Auth API, Booking API |
| **Cosmos DB** | Bicep, Key Vault | Dozer | Week 1 | Content API |
| **Auth API** | PostgreSQL, JWT logic | Dozer | Week 1 | All protected endpoints |
| **Content API** | Cosmos DB, Auth API | Dozer | Week 2 | Frontend catalog, AI training |
| **Booking API** | PostgreSQL, state machines | Dozer | Week 2–3 | Frontend forms, payment flow |
| **APIM Gateway** | Auth API, all three services | Dozer | Week 3 | Public API access |
| **Observability** | App Insights SDK | Dozer | Week 3 | Production readiness |
| **CI/CD Pipelines** | GitHub Actions, Bicep | Dozer | Week 1 | Automated releases |
| **Payment Integration** | Booking API, external provider | Dozer + Niobe | Week 4+ | Checkout flow (Trinity) |
| **CMS Admin Portal** | Content API, Auth API | Tank | Week 5+ | Editorial workflow |
| **AI Integration** | Content API (data source) | Niobe | Week 4+ | Excursion builder |

---

## Appendix: References

**Spec Files Analyzed:**
1. `spec/s3-apis-content/booking-consultation-apis.md` — Booking state machines, tier types
2. `spec/s3-apis-content/content-apis.md` — API versioning, endpoints, caching
3. `spec/s3-apis-content/content-management.md` — CMS workflow, content models
4. `spec/s5-security-auth/security-architecture.md` — Auth providers, threat model, RBAC
5. `spec/s5-security-auth/unified-security-rbac.md` — Role definitions, permission matrix
6. `spec/s6-infrastructure-devops/azure-architecture.md` — Container Apps, databases, APIM
7. `spec/s6-infrastructure-devops/cicd-pipeline.md` — GitHub Actions workflows, deployment
8. `spec/s6-infrastructure-devops/environment-strategy.md` — Dev/staging/prod configs
9. `spec/s6-infrastructure-devops/observability.md` — Logging, metrics, alerts
10. `spec/s6-infrastructure-devops/monorepo-architecture.md` — Turborepo structure, build config
