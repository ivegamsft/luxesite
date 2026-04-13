# Missing Issues — Aurora Luxe Sprint Plan

> **Author:** Morpheus (Lead/Architect)
> **Date:** 2026-04-15
> **Context:** Gap analysis after reviewing all 24 specs (S1–S8) against 13 open issues

---

## Spec Consolidation

### 1. Consolidate S1.2 (site.md) + S1.3 (luxurysite.md) into single site spec
- **Subsystem:** S1 — Foundation & Brand
- **Description:** INDEX.md already flags these as overlapping. Both describe the same single-page marketing site from different angles (site.md is structure-first, luxurysite.md is UI-first). Merge into one canonical spec to eliminate contradictions and reduce maintenance burden. Issues #280/#281/#282 are all patching luxurysite.md — consolidation would resolve all three at once.
- **Dependencies:** #280, #281, #282 (these become sub-tasks of the merge)
- **Suggested assignee:** Trinity
- **Priority:** P1

### 2. Consolidate S5.1 + S5.2 + S5.3 into single security spec
- **Subsystem:** S5 — Security & Auth
- **Description:** Three overlapping security specs (security-architecture.md, security-architecture-update.md, unified-security-rbac.md) cover the same territory from different dates. They contain contradictions (S5.1 is pre-pivot, S5.2 is post-pivot, S5.3 is RBAC-focused). Merge into one authoritative security spec so Dozer has a single source of truth for implementation.
- **Dependencies:** S1.1 (brand-pivot must be final), S2.4 (tier model)
- **Suggested assignee:** Dozer
- **Priority:** P0 (blocks all auth/security implementation)

---

## Data Model & Types Implementation

### 3. Implement discriminated union ServiceTier types
- **Subsystem:** S2 — Frontend & Data
- **Description:** The tier-architecture-spike (S2.4) defines `ServiceTier = OneTimeEvent | YearlySubscription | GiftPurchase` as a discriminated union, but this hasn't been implemented in code. Current `types.ts` still uses the flat `MembershipTier` interface. This is the critical type foundation every downstream component, API, and form depends on.
- **Dependencies:** S2.4 (spec must be finalized)
- **Suggested assignee:** Neo
- **Priority:** P0 (blocks booking flows, API contracts, form state machines)

### 4. Migrate static data files to new tier model
- **Subsystem:** S2 — Frontend & Data
- **Description:** All 8 data files in `apps/web/app/data/` use legacy types. Migrate destinations.ts → experiences/events, tiers.ts → new 3-tier model, and update testimonials/team/navigation to reference new brand language. This is the data layer companion to the type implementation (#3).
- **Dependencies:** Issue #3 (ServiceTier types), S2.3 (sample-data-pack spec for reference data)
- **Suggested assignee:** Trinity
- **Priority:** P0

---

## API Scaffolding

### 5. Scaffold API app in monorepo
- **Subsystem:** S6 — Infrastructure
- **Description:** S6.2 (monorepo-architecture) defines `apps/api/` as the backend API service, but it doesn't exist yet. Scaffold the Express/Fastify app with TypeScript, basic health endpoint, and shared types package (`packages/shared/`). This is the container all API specs (S3.1, S3.2) deploy into.
- **Dependencies:** S6.2 (monorepo spec)
- **Suggested assignee:** Dozer
- **Priority:** P1

### 6. Implement booking consultation API endpoints
- **Subsystem:** S3 — APIs & Content
- **Description:** S3.1 defines three separate booking flows with state machines (inquiry → planning → confirmed → executed → completed for one-time; onboarding → active → renewal for yearly; purchase → delivery → redemption for gift). Implement the API endpoints, state machine logic, and tier-specific validation rules.
- **Dependencies:** #5 (API scaffold), #3 (ServiceTier types), S5 consolidated security spec
- **Suggested assignee:** Dozer
- **Priority:** P1

### 7. Implement content API endpoints
- **Subsystem:** S3 — APIs & Content
- **Description:** S3.2 defines versioned content APIs (GET /api/v1/tiers, GET /api/v2/tiers/{tierType}/catalog) with multilingual support, caching, and APIM integration. Implement v1 endpoints serving current static data through the adapter pattern, then v2 with tier-type-aware responses.
- **Dependencies:** #5 (API scaffold), #3 (ServiceTier types)
- **Suggested assignee:** Dozer
- **Priority:** P1

---

## Frontend Implementation

### 8. Build ExperiencePortfolio component
- **Subsystem:** S2 — Frontend & Data
- **Description:** S1.1 (brand-pivot) specifies ExperiencePortfolio as the replacement for DestinationGrid — a category-filtered, card-based grid showcasing event types. Includes category pill navigation, hover animations, and responsive layout. This is a primary conversion pathway on the landing page.
- **Dependencies:** #4 (migrated data), S1.4 (design-system-update for component patterns)
- **Suggested assignee:** Trinity
- **Priority:** P1

### 9. Build FeaturedPackages component
- **Subsystem:** S2 — Frontend & Data
- **Description:** S1.1 specifies FeaturedPackages as the replacement for ExperienceList — curated, tier-aware package cards with pricing, inclusions, and CTA to consultation form. Must handle three visually distinct tier card treatments.
- **Dependencies:** #4 (migrated data), #3 (ServiceTier types)
- **Suggested assignee:** Mouse
- **Priority:** P1

### 10. Expand ConciergeForm with progressive disclosure
- **Subsystem:** S2 — Frontend & Data
- **Description:** S1.1 specifies ConciergeForm expansion: tier selection drives conditional field visibility (one-time shows event date/guest count, yearly shows family details/calendar, gift shows recipient info/occasion). Implement progressive disclosure pattern with form state machine.
- **Dependencies:** #3 (ServiceTier types), #268 (booking-flow skill for guidance)
- **Suggested assignee:** Neo
- **Priority:** P1

### 11. Implement i18n framework
- **Subsystem:** S2 — Frontend & Data
- **Description:** S2.2 (accessibility-i18n) defines multilingual patterns but no i18n framework exists in code. Set up next-intl or similar, extract hardcoded strings from all 10+ components, create en-US base locale, and add locale switching. Required before content APIs go multilingual.
- **Dependencies:** S2.2 (spec), current component inventory stable
- **Suggested assignee:** Neo
- **Priority:** P2

---

## Auth & Security Implementation

### 12. Implement authentication with Entra ID
- **Subsystem:** S5 — Security & Auth
- **Description:** S5.1 defines phased auth: Phase 1 is security headers (already on static site), Phase 2 is Entra ID authentication for admin/staff, Phase 3 is client-facing OAuth. Implement Phase 2 auth — Entra ID integration for the admin portal, session management, and token handling.
- **Dependencies:** #2 (consolidated security spec), #5 (API scaffold), admin portal scaffold
- **Suggested assignee:** Dozer
- **Priority:** P1

### 13. Build admin portal scaffold
- **Subsystem:** S6 — Infrastructure
- **Description:** S6.2 defines `apps/admin/` as the internal admin portal (Next.js). Scaffold the app with auth-gated routes, basic layout shell, and shared types from `packages/shared/`. The admin portal is where content management (S3.3), booking management, and staff tools live.
- **Dependencies:** #5 (API scaffold), #12 (auth)
- **Suggested assignee:** Neo
- **Priority:** P2

---

## Infrastructure & DevOps

### 14. Azure infrastructure provisioning (IaC)
- **Subsystem:** S6 — Infrastructure
- **Description:** S6.1 defines the full Azure target architecture (Container Apps, APIM, Cosmos DB, CDN, App Insights). Create Bicep/Terraform templates for the dev environment: Container Apps Environment, Container App for API, PostgreSQL Flexible Server, Application Insights instance, and CDN profile.
- **Dependencies:** S6.1 (azure-architecture spec), S6.4 (environment-strategy)
- **Suggested assignee:** Dozer
- **Priority:** P1

### 15. Implement CI/CD pipeline
- **Subsystem:** S6 — Infrastructure
- **Description:** S6.3 defines GitHub Actions workflows for PR validation, staging deploy, and production deploy with approval gates. Currently only basic workflows exist. Implement the full pipeline: build → test → lint → security scan → deploy staging → integration test → deploy prod.
- **Dependencies:** #14 (Azure infra), #5 (API scaffold to deploy)
- **Suggested assignee:** Dozer
- **Priority:** P1

### 16. Set up Application Insights observability
- **Subsystem:** S6 — Infrastructure
- **Description:** S6.5 defines structured logging, metrics, and tracing with Application Insights. Instrument the Next.js frontend and API backend with OpenTelemetry auto-instrumentation, custom booking metrics, and structured JSON logging.
- **Dependencies:** #14 (Azure infra for App Insights instance), #5 (API to instrument)
- **Suggested assignee:** Dozer
- **Priority:** P2

---

## Testing Infrastructure

### 17. Integration test scaffold and booking flow tests
- **Subsystem:** S8 — Testing
- **Description:** S8.1 defines a testing pyramid (65% unit, 25% integration, 10% E2E) but integration tests don't exist yet. Scaffold integration test infrastructure (API mock server, test database setup) and write first integration tests for booking state machines across all three tiers.
- **Dependencies:** #6 (booking APIs to test), S8.1 (testing-strategy spec)
- **Suggested assignee:** Tank
- **Priority:** P1

### 18. Automated a11y testing in CI
- **Subsystem:** S8 — Testing
- **Description:** S2.2 defines WCAG 2.1 AA requirements but automated a11y testing is manual only. Add axe-core integration to Playwright E2E tests and Jest component tests. Run on every PR via CI. This makes the a11y-checklist skill (#269) enforceable, not just advisory.
- **Dependencies:** #269 (a11y-checklist skill for rules), #15 (CI pipeline)
- **Suggested assignee:** Tank
- **Priority:** P1

---

## AI & Intelligence

### 19. AI excursion builder MVP
- **Subsystem:** S4 — AI & Intelligence
- **Description:** S4.1 defines the Azure AI Foundry–powered experience generator. MVP: prompt template that takes client preferences (budget, date, party size, themes) and generates a curated event proposal using GPT-4 with brand voice guardrails. No fine-tuning in MVP — rely on system prompt and few-shot examples.
- **Dependencies:** S4.1 (spec), #14 (Azure infra for AI services), S3.1 (booking APIs for data)
- **Suggested assignee:** Niobe
- **Priority:** P2

### 20. Copilot planning agent MVP
- **Subsystem:** S4 — AI & Intelligence
- **Description:** S4.2 defines the planner assistant with Graph integration. MVP: Teams-accessible chatbot that answers tier policy questions, summarizes client context from CRM data, and suggests specialists based on availability. No calendar coordination in MVP.
- **Dependencies:** S4.2 (spec), #14 (Azure infra), S7.1 (back-office CRM for data)
- **Suggested assignee:** Niobe
- **Priority:** P2

---

## Back Office

### 21. Back-office platform initial setup
- **Subsystem:** S7 — Back Office
- **Description:** S7.1 defines Dynamics 365 CRM + Power Apps dashboard for internal operations. Initial setup: configure Dynamics 365 trial/dev instance, create client entity with tier segmentation, set up basic booking pipeline view (lead → proposal → booked → completed). This is the operational backbone for planners.
- **Dependencies:** #6 (booking APIs for data flow), #12 (auth for staff access)
- **Suggested assignee:** Niobe
- **Priority:** P2

---

## Skills

### 22. Create observability skill for Dozer
- **Subsystem:** S6 — Infrastructure
- **Description:** S6.5 defines logging, metrics, and tracing patterns that Dozer will implement repeatedly across services. Create `.squad/skills/observability/SKILL.md` codifying structured log format, custom metric patterns, trace correlation, and App Insights SDK setup. Prevents re-discovery across sessions.
- **Dependencies:** S6.5 (observability spec)
- **Suggested assignee:** Dozer
- **Priority:** P2

### 23. Create content-model skill for CMS implementation
- **Subsystem:** S3 — APIs & Content
- **Description:** S3.3 defines structured content models (Experience, Specialist, Venue, Tier) with versioning and approval workflows. Create `.squad/skills/content-model/SKILL.md` codifying the content type schemas, relationship patterns, and webhook integration points. Guides both CMS setup and content API implementation.
- **Dependencies:** S3.3 (content-management spec), #3 (ServiceTier types)
- **Suggested assignee:** Niobe
- **Priority:** P2
