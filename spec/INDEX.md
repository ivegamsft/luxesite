# Aurora Luxe — Spec Index

Organized by subsystem. Numbered for tracking. Dependency order: S1 → S2 + S4 → S3 → S5 → S6 → S7. S8 is cross-cutting.

---

## S1 — Foundation & Brand

| ID | Spec | Summary |
|----|------|---------|
| S1.1 | [brand-pivot.md](s1-foundation-brand/brand-pivot.md) | Brand pivot to luxury experiential party platform — language, data model, flow changes |
| S1.2 | [site.md](s1-foundation-brand/site.md) | Single-page marketing site structure & consultation conversion flow |
| S1.3 | [luxurysite.md](s1-foundation-brand/luxurysite.md) | Reverse-engineered landing page UI & lead-capture experience |
| S1.4 | [design-system-update.md](s1-foundation-brand/design-system-update.md) | CSS patterns, icons, motion, typography for brand pivot |
| S1.5 | [documentation-update.md](s1-foundation-brand/documentation-update.md) | Content governance & writing standards |

**Notes:** S1.2 and S1.3 overlap significantly — candidates for merging into a single site spec.

---

## S2 — Frontend & Data

| ID | Spec | Summary |
|----|------|---------|
| S2.1 | [frontend-data-migration.md](s2-frontend-data/frontend-data-migration.md) | Phased migration from static data files to API-backed content |
| S2.2 | [accessibility-i18n.md](s2-frontend-data/accessibility-i18n.md) | WCAG 2.1 AA accessibility + multilingual/i18n patterns |
| S2.3 | [sample-data-pack.md](s2-frontend-data/sample-data-pack.md) | Realistic test/demo data for events, subscriptions, gifts |
| S2.4 | [tier-architecture-spike.md](s2-frontend-data/tier-architecture-spike.md) | Three-tier transaction model (One Time / Yearly / Gift) & data implications |

**Notes:** S2.4 is exploratory — feeds into S3.1 (booking APIs) and S2.1 (data migration).

---

## S3 — APIs & Content

| ID | Spec | Summary |
|----|------|---------|
| S3.1 | [booking-consultation-apis.md](s3-apis-content/booking-consultation-apis.md) | Booking APIs, state machines, tier validation rules |
| S3.2 | [content-apis.md](s3-apis-content/content-apis.md) | Versioned, multilingual content APIs with caching & gateway integration |
| S3.3 | [content-management.md](s3-apis-content/content-management.md) | CMS for experiences, specialists, venues, editorial workflows |

**Depends on:** S1 (brand), S2.4 (tier model)

---

## S4 — AI & Intelligence

| ID | Spec | Summary |
|----|------|---------|
| S4.1 | [ai-excursion-builder.md](s4-ai-intelligence/ai-excursion-builder.md) | Azure AI Foundry engine for generating curated experience proposals |
| S4.2 | [copilot-planning-agent.md](s4-ai-intelligence/copilot-planning-agent.md) | Copilot assistant for planner coordination (clients, calendars, logistics) |

**Depends on:** S1 (brand), S3 (APIs for data)

---

## S5 — Security & Auth

| ID | Spec | Summary |
|----|------|---------|
| S5.1 | [security-architecture.md](s5-security-auth/security-architecture.md) | Phased security: authentication, authorization, API hardening, monitoring |
| S5.2 | [security-architecture-update.md](s5-security-auth/security-architecture-update.md) | Tier-based security model update post-pivot |
| S5.3 | [unified-security-rbac.md](s5-security-auth/unified-security-rbac.md) | Unified RBAC across web, API, and admin surfaces |

**Notes:** Three overlapping security specs — strong candidate for consolidation into a single canonical security spec.

---

## S6 — Infrastructure & DevOps

| ID | Spec | Summary |
|----|------|---------|
| S6.1 | [azure-architecture.md](s6-infrastructure-devops/azure-architecture.md) | Azure production target: Container Apps, APIM, Cosmos DB, CDN, observability |
| S6.2 | [monorepo-architecture.md](s6-infrastructure-devops/monorepo-architecture.md) | Multi-app monorepo evolution from single Next.js app |
| S6.3 | [cicd-pipeline.md](s6-infrastructure-devops/cicd-pipeline.md) | GitHub Actions CI/CD: testing, security scans, approval gates, blue-green deploy |
| S6.4 | [environment-strategy.md](s6-infrastructure-devops/environment-strategy.md) | Dev/staging/prod environments, feature flags, promotion flows |
| S6.5 | [observability.md](s6-infrastructure-devops/observability.md) | Structured logging, metrics, tracing with Azure Application Insights |

**Depends on:** S3 (APIs to deploy), S5 (security to enforce)

---

## S7 — Back Office

| ID | Spec | Summary |
|----|------|---------|
| S7.1 | [backoffice-platform.md](s7-back-office/backoffice-platform.md) | Power Platform & Dynamics 365 for bookings, client CRM, internal ops |

**Depends on:** S3 (APIs), S5 (auth/RBAC)

---

## S8 — Testing (Cross-Cutting)

| ID | Spec | Summary |
|----|------|---------|
| S8.1 | [testing-strategy.md](s8-testing/testing-strategy.md) | Testing pyramid & standards for unit, integration, and E2E testing |

**Applies to:** All subsystems

---

## Consolidation Candidates

| Issue | Specs | Recommendation |
|-------|-------|---------------|
| Overlapping site specs | S1.2 + S1.3 | Merge into single `site.md` |
| Three security specs | S5.1 + S5.2 + S5.3 | Consolidate into single canonical security spec |

## Implementation Priority (Suggested)

1. **S1** — Foundation must be solid before building on it
2. **S2** — Frontend data & accessibility (current site work)
3. **S8** — Testing strategy applies from day one
4. **S3** — APIs once data model is stable
5. **S4** — AI features after APIs exist
6. **S5** — Security before production deployment
7. **S6** — Infrastructure for production readiness
8. **S7** — Back office last (depends on everything)
