# Aurora Luxe — Project Evolution

A narrative of architectural decisions and brand transformation from April 2026 through today.

---

## Phase 1: Foundation (April 10, 2026)

**Project Origin:** Created as a teaching site for production-grade Next.js + React 19 + TypeScript architecture. The original concept was a luxury travel platform—ultra-premium concierge experiences.

**Initial Stack:**
- Next.js 14+ (App Router), React, TypeScript
- Tailwind CSS with custom aurora theme (OKLCH color space)
- Framer Motion for scroll-triggered animations
- Unsplash imagery
- Static mock data (no backend)

**Early Architecture Decisions:**
- Single-page site with 8 sections: Hero → TrustBar → Categories → Offerings → Testimonials → Interstitial → Pricing → FAQ
- Test colocation: components + their unit tests live together
- Root-level config files only (jest.config.js, tsconfig.json)
- WCAG 2.1 AA accessibility as non-negotiable baseline

**Team Formation:** Squad AI team assembled (Morpheus: Lead/Architect, Trinity: Design/QA, Dozer: Backend/Cloud, Niobe: Content, Tank: DevOps). Each agent owns domain decisions documented in spec/ directory.

---

## Phase 2: Design Polish & Brand Discipline (April 10-11)

**Problem:** Initial design drifted toward "AI-generated" aesthetics—uniform rounding, generic layouts, clichéd copy.

**Solution — Design Polish Decision (#133, #178):**
- Implemented **radius hierarchy:** `rounded-sm` (cards/sharp), `rounded-lg` (buttons), `rounded-full` (badges only)
- Replaced emoji with monoline SVG icon system (24×24, `currentColor` stroke)
- Rewrote Hero copy to atmospheric fragments: "Private shores. Unmarked airstrips. Tables that don't take reservations."
- Typographic pricing (Bodoni Moda) instead of badge pills
- Removed decorative blob gradients; let photography carry mood
- Each section given unique heading/subtitle treatment (no formulaic repetition)
- Introduced warm bordeaux `aurora-error` color (not generic red)

**Impact:** Site read as intentional editorial product, not template.

---

## Phase 3: Accessibility & Component Hardening (April 10-11)

**Accessibility Audit (Trinity QA):**
- Touch target failures: Testimonial nav dots were 12px (failed 44px WCAG)
- Copy issues: "Most Popular" badge on tiers (SaaS pattern, didn't fit luxury brand)
- Animation bugs: parallax and carousel didn't respect `prefers-reduced-motion`
- Focus management: keyboard navigation not visible on interactive elements

**Fixes Applied (#232–#235):**
- Wrapped all carousel dots in 44×44px touch zones (visual unchanged)
- Removed SaaS copy; animated border differentiation was sufficient
- Added `useReducedMotion()` hook to all 6 Framer Motion components
- Container queries (@container) for responsive text sizing on narrow viewports
- Mobile menu animation: slide-down with ease-out-quint easing

**Test Structure Formalized:**
- Unit tests at `tests/unit/` at repo root
- E2E tests with Playwright at `tests/e2e/`
- jest.config.js, playwright.config.ts at repo root (standard tooling)
- All tests passing; accessibility-first approach embedded

---

## Phase 4: Monorepo Restructure (April 10)

**Decision:** Move all Next.js code to `apps/web/` with self-contained `package.json` and `node_modules`. Root becomes project-level only (README, spec/, .squad/, .github/).

**Rationale:** Prepare for multi-app monorepo (backend/API apps in other languages).

**Changes:**
- All code moved to `apps/web/`
- npm commands: `cd apps/web && npm run dev`
- Config files follow app (inside `apps/web/`)
- .gitignore patterns changed from root-anchored (`/node_modules`) to recursive (`node_modules/`)

**Team Directive:** User preference for clean project root—non-config, non-source directories removed.

---

## Phase 5: Three-Tier Transaction Model Architecture (April 12)

**Critical Insight:** PR #202 renamed tiers, but the real change ran deeper.

**Problem:** Old model was a linear privilege hierarchy (Silver < Black < Obsidian — three levels of the same thing). New model: three **fundamentally different transaction types**:
- **One Time** ($500K) — Single bespoke event booking
- **Yearly** ($1.2M/yr) — Annual subscription for family celebrations
- **Gift** ($250K) — Third-party purchase (buyer ≠ recipient)

**Architecture Spike (#210):** Documented discriminated union pattern:
```typescript
type ServiceTier = OneTimeEvent | YearlySubscription | GiftPurchase
```

Each has different data shapes, consultation flows, API endpoints, and access patterns. This architectural decision cascaded through 8 dependent specs.

**Impact Audit (#203–#210):** 
- Identified ~80 stale references across spec/ and README
- Created issue cascade: tier data model, security RBAC, API design, content model all affected
- Established critical path: architecture spike → brand rewrite → downstream specs

---

## Phase 6: Brand Pivot — Travel to Experiential Events (April 11-14)

**Decision:** Pivot from luxury travel platform to luxury experiential events platform. This wasn't a rename—it was a fundamental business model change.

**New Brand Positioning:**
> **Aurora Luxe: Architects of the Extraordinary.**  
> We don't plan parties. We produce events that rewrite what's possible.

**Brand Pivot Spec (#203, `spec/brand-pivot.md`):**
- Redefined positioning, target customer, service model
- New content voice: luxurious + imaginative + professional + intentionally fictional
- Believability guardrails: real prices, real venues, real feasibility (no "AI magic")
- Fictional testimonials only; no false claims
- Implementation phased into 4 mergeable phases:
  1. Copy rewrite (content layer)
  2. Data model migration (types, tiers)
  3. Consultation flow expansion (form logic)
  4. New components (ExperiencePortfolio, FeaturedPackages)

**Content Rewrite (#225):** 
- Removed all legacy travel language
- Rewrote hero, experience descriptions, testimonials for events
- Added party/celebration/event framing throughout
- Maintained Unsplash imagery (recontextualized for events)

---

## Phase 7: Documentation Governance (April 11)

**Documentation Spec (#183, `spec/documentation-update.md`):**

Established standards for teaching site framing:
1. **All docs explicitly frame Aurora Luxe as educational**—this is a teaching project
2. **Content voice guardrails:**
   - Luxurious + imaginative + professional + intentionally fictional
   - Believability-anchored (prices feasible, destinations real)
   - Fictional testimonials only; no hype
3. **Code documentation standards:**
   - JSDoc explains "why" not just "what"
   - Comments on non-obvious logic only
   - Teaching annotations on complex patterns (auth, animation gating, a11y)
4. **Spec directory as source of truth**—one spec per major feature, decision records live in spec/

---

## Phase 8: Sprint Planning & Sequencing (April 12)

**Sprint Plan Created:** 4-sprint roadmap (8 weeks) sequencing 37 open issues with clear dependencies.

**Sprint 1 (Week 1–2): Foundation & Architecture**
- Critical path: #210 (architecture spike) → #203 (brand rewrite)
- Output: Data model diagram, API shape, tier flows

**Sprint 2 (Week 3–4): Spec Foundation Layer**
- All tier-impact specs (#204–#209) + security RBAC + Azure architecture
- Parallelizable after #203 complete
- Output: RACI matrix, security matrix, cloud architecture

**Sprint 3 (Week 5–6): API, Content, Back-Office Specs**
- Content APIs (#180, versioning/i18n), back-office (#186, #188), AI agents (#185, #189)
- Output: API contracts, back-office orchestration, AI prompt strategy

**Sprint 4 (Week 7–8): Implementation Strategy & Quality**
- Data migration plan (#191), CI/CD (#192), environments (#193), test strategy (#197)
- Output: Phase 2 implementation backlog

---

## Phase 9: Production-Grade Quality & Visual Polish (April 12-14)

**Typography Audit (#251):** 
- Fluid type scale refined with viewport-responsive clamp() functions
- H2 bumped from 28-40px to 32-48px for luxury editorial tone
- Body text fixed at 1rem (never fluid—always readable)

**Spacing Rebalance:**
- Section tokens tuned so stacked spacing = 80-120px vertical rhythm on desktop
- Reduced monotony of uniform 2rem gaps
- Created breathing room via purposeful variable spacing

**Visual Sweep (#238–#246):**
- Contrast fixes: text + interactive elements now ≥ 7:1 contrast ratio
- Imagery refresh: replaced duplicate placeholder images
- Footer redesign: added fictional site disclaimer + links
- 404 page: "Return Home" button for missing routes
- ConciergeForm: date picker + flexibility dropdown for event dates
- Mobile menu: hamburger collapse at lg breakpoint (1024px)

**Test Hygiene:**
- Moved screenshot files out of public/ (not build artifacts)
- Stale E2E tests cleaned up
- Playwright tests stabilized for CI reliability

---

## Phase 10: Current State (April 14+)

**Production-Ready Status:**
- ✅ Single-page marketing site with mock data
- ✅ WCAG 2.1 AA accessibility
- ✅ Production-grade component architecture
- ✅ Comprehensive spec foundation (24 specs across platform, security, content, ops)
- ✅ Squad AI team with clear decision authority
- ✅ Teaching-site framing explicit throughout

**Next Frontier (Phase 2):**
- Backend APIs (content, booking, consultation)
- Authentication & authorization (OAuth2, RBAC)
- CMS integration (content management, draft/publish)
- AI concierge builder (LLM-powered experience design)
- Azure infrastructure (App Service, Key Vault, API Management)
- Observability & monitoring (Application Insights telemetry)

---

## Key Learnings

1. **Architecture precedes code** — The three-tier transaction model architecture spike (#210) prevented rework across 8+ downstream specs. Time spent on architecture saves time on implementation.

2. **Brand is architecture** — The pivot from travel to events required no code changes—only content. This happened because the data model was generic enough. Foundation-layer decisions matter.

3. **Accessibility is non-negotiable** — WCAG 2.1 AA wasn't added as a polish phase; it was embedded from day one. Touch targets, motion respecting, focus management—these must be architectural, not bolted on.

4. **Design discipline kills AI aesthetics** — Intentional hierarchy (radius, spacing, typography) reads as editorial. Formula prevents "AI-generated" feel. Every detail must have a reason.

5. **Teaching requires transparency** — Every architectural decision documented with rationale. JSDoc explains "why"—no magic. Learners trace patterns back to threat models or user needs.

6. **Squad structure scales** — Clear role definition (Morpheus: architecture, Trinity: design/QA, Dozer: backend, Niobe: content, Tank: ops) allows parallel work with minimal sync overhead. Decisions documented in spec/ prevent bottlenecks.

---

## File Manifest

**Core Site:**
- `README.md` — Project overview, stack, architecture, design system
- `apps/web/` — Next.js application (components, data, lib, public)
- `apps/web/globals.css` — Design tokens, fluid type scale, spacing, OKLCH color palette

**Specifications (Source of Truth):**
- `spec/brand-pivot.md` — Brand positioning, voice guidelines, implementation phases
- `spec/design-system-update.md` — Design language, token strategy, visual discipline
- `spec/tier-architecture-spike.md` — Three-tier transaction model deep dive
- `spec/security-architecture.md` — Auth, API security, threat model, RBAC
- `spec/content-apis.md` — Versioned REST endpoints, contracts
- `spec/testing-strategy.md` — Jest + Playwright approach
- `spec/azure-architecture.md` — Cloud deployment strategy
- `spec/cicd-pipeline.md` — GitHub Actions workflows

**Team & Decisions:**
- `.squad/team.md` — Squad roles and responsibilities
- `.squad/decisions.md` — Approved architectural decisions
- `.squad/agents/morpheus/history.md` — Architecture decisions, learnings

**Testing & Validation:**
- `tests/unit/` — Jest collocated tests
- `tests/e2e/` — Playwright E2E tests
- `jest.config.js`, `playwright.config.ts` — Test runner configs at repo root

---

**Project Created:** April 10, 2026  
**Current Phase:** Production-ready marketing site; Phase 2 specs written  
**Next Phase:** Backend APIs, authentication, CMS, AI concierge, Azure deployment
