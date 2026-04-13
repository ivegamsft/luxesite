# Dozer — History & Learnings

## Work Log

### 2025-07-21 — Security Architecture Spec (Issue #187)
- Created `spec/security-architecture.md` — comprehensive security architecture covering threat model, auth, RBAC, API security, data protection, infra security, content security, monitoring, and phased implementation plan.
- Two-provider auth strategy: Azure AD B2C for customers, Azure AD (Entra) for staff.
- Five-role RBAC: Anonymous, Customer, Editor, Admin, System.
- Four implementation phases aligned to platform maturity (static site → backend → CMS → full infra).
- Teaching notes throughout explaining why each pattern matters.

### 2025-07-21 — Infrastructure Dependency Analysis (Sprint Planning)
- Analyzed 10 specs (APIs, security, infrastructure, CI/CD) and mapped backend/infra dependencies.
- **Key finding:** All API specs complete and implementable. Three tier types (one-time, yearly, gift) have distinct but well-specified booking workflows.
- **Critical decision:** Payment gateway provider selection needed ASAP — impacts Booking API contracts. Can use mock provider for Phase 1.
- **Build sequence:** Infrastructure (IaC + databases) → Auth API → Content API → Booking API → APIM → Production readiness. ~4 weeks for Sprint 4.
- **Monorepo recommendation:** Scaffold Turborepo structure this week (apps/web, apps/api, apps/admin) to avoid refactoring mid-sprint.
- **Risks:** (1) State machine complexity — test one-time tier first; (2) Payment integration unknowns; (3) Cosmos DB query perf — need early optimization.
- **Unblocks:** Frontend can integrate end of Week 3, AI team can access Content API end of Week 2.
- Deliverables: `infra-deps.md` (sprint roadmap), `inbox/dozer-infra-deps.md` (key decisions for Morpheus).

## Learnings

- Aurora Luxe is a teaching site: every architecture decision must be explainable to learners. Right-sized complexity, not enterprise bloat.
- Brand pivot (spec/brand-pivot.md) shifts from travel to experiential events. Primary PII collection point is the consultation form (name, email, budget, event details).
- Current stack is static Next.js on Vercel — no backend, no auth, no APIs yet. Security controls must be phased.
- Team decisions live in `.squad/decisions.md`. Design uses OKLCH color system, Space Grotesk + Inter typography, Tailwind CSS.
- **Architecture decision:** Two-provider auth (B2C for customers, Entra for staff) is locked in. Phase 1 uses local JWT + user table (teaching), Phase 2 integrates B2C.
- **Booking complexity:** Three tier types with separate state machines, validation, and payment touchpoints. Spec is complete; risk is state machine design validation.
- **Database polyglot:** PostgreSQL (transactional: bookings, payments, users) + Cosmos DB (content: experiences, FAQs, specialists). Separate for good reason — don't try to unify.
- **API versioning:** URL path versioning (/v1/, /v2/) not headers. Simpler for frontend and APIM routing.
- **Monorepo readiness:** Turborepo is the tool choice. Phase in: apps/web + apps/api (Sprint 4), then apps/admin (Sprint 5).
- **Security phasing:** No single blocker. Two-provider auth, MFA, encryption all have clear phasing. Token storage (memory + HttpOnly cookies) is a non-negotiable teaching pattern.
