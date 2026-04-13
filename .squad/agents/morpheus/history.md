# Project Context

- **Owner:** ivegamsft
- **Project:** Aurora Luxe Travel — a futuristic luxury travel website. Single-page (plus optional destination detail route) for a fictional ultra-premium concierge travel brand.
- **Stack:** Next.js (latest stable), TypeScript, Tailwind CSS, Framer Motion, next/image
- **Created:** 2026-04-10

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->

- **Documentation governance (2026-04-11, #183):** Created `spec/documentation-update.md` — a comprehensive spec for post-pivot documentation standards. Key principles: (1) Teaching site framing explicit in all docs; (2) Content voice = luxurious + imaginative + professional + intentionally fictional; (3) JSDoc explains "why" not "what"; (4) Believability guardrails prevent AI-slop (price anchoring, real-world feasibility, no false claims); (5) Test colocation documented as teaching pattern; (6) Content guardrails: fictional testimonials only, safety language for adventure/kids, no real people/brands without framing. Spec includes checklists for content PR review and implementation roadmap across 8 document categories (README, data, types, forms, tests, specs).

- **Test colocation (2026-04-09):** Component tests live at `app/components/__tests__/*.test.tsx`. Mock files at `app/__mocks__/`. Root stays clean — only standard config files (jest.config.js, jest.setup.ts, tsconfig, etc.) belong there.
- **Jest auto-discovery:** `next/jest` discovers `**/*.test.tsx` anywhere under the project — no explicit `testMatch` needed in jest.config.js.
- **Mock strategy:** `jest.setup.ts` handles all mocking inline (framer-motion, next/image). The `app/__mocks__/` file-based mocks are kept for reference but are overridden by the setup file's factory mocks.
- **User preference:** ivegamsft wants a clean project root. Non-config, non-source directories should not clutter root.
- **Monorepo restructure (2026-04-10):** All Next.js code moved to `apps/web/` with its own `package.json` and `node_modules`. Root is project-level only (README, spec/, .squad/, .github/). No npm workspaces — each app is self-contained. User plans to add backend/API apps in other languages.
- **Path updates for monorepo:** Tests now at `apps/web/app/components/__tests__/`. Config files at `apps/web/` root. All `cd apps/web` before running npm commands.
- **`.gitignore` pattern:** Changed from root-anchored (`/node_modules`) to recursive (`node_modules/`) patterns to cover any nested app directories.
- **Section consolidation (#147):** Page reduced from 11 to 8 sections. GuideGrid and PressAwards removed from page.tsx (components retained). WhyAurora refactored from carousel to 3-card editorial grid. Interstitial.tsx added as a full-bleed breathing break. ScrollNav updated to match. UHNW editorial restraint: fewer sections, more breathing room.
- **Brand pivot spec (#181, 2026-04-11):** Comprehensive spec written at `spec/brand-pivot.md`. Pivots Aurora Luxe from luxury travel to luxury experiential events. Key architecture decisions: (1) Additive data model migration — new `ExperiencePackage` and `CategoryMeta` types coexist with old types during transition. (2) Four-phase rollout: copy → data model → consultation flow → new components. Each phase independently mergeable. (3) Visual identity frozen — only content layer changes. (4) Two new components: `ExperiencePortfolio` (replaces DestinationGrid) and `FeaturedPackages` (replaces ExperienceList). (5) ConciergeForm expansion with progressive disclosure and conditional fields based on experience type.
- **Current data model inventory:** 8 data files in `apps/web/app/data/`: destinations.ts (14 records), experiences.ts (8), tiers.ts (3), testimonials.ts (7), team.ts (5), navigation.ts (6), guides.ts (6), awards.ts (6). Types in `apps/web/app/lib/types.ts`. All static — no API/backend.
- **Current page composition (as of #147):** Hero → TrustBar → WhyAurora → DestinationGrid → ExperienceList → Testimonials → Interstitial → Tiers → FAQ → ConciergeForm. 8 sections + nav chrome.

### Documentation Governance Spec (2026-04-11, #183)

**Status:** ✅ COMPLETE

Authored comprehensive documentation governance spec defining content voice, code documentation standards, and teaching methodology. Key decisions:

**Teaching Site Positioning:** All docs explicitly frame Aurora Luxe as an educational project. Architecture decisions include teaching rationale. No "magic" patterns without explanation.

**Content Voice Guardrails:**
- Luxurious + imaginative + professional + intentionally fictional
- Believability-anchored to reality (prices feasible, destinations real)
- Fictional testimonials only; no false claims or hype

**Code Documentation Standards:**
- JSDoc explains "why" not just "what"
- Comments on non-obvious logic only; omit state-the-obvious comments
- Teaching annotations on complex patterns (auth, animation gating, accessibility)

**Spec Directory as Source of Truth:** One spec per major feature. Decision records live in `spec/`, not scattered across README/docs. Enables team consensus and clear ownership.

**Implementation Checklist:** Covers README, type definitions, test structure, data files, and component documentation. Ensures consistency across codebase.

## Cross-Agent Impact (Wave 1 Specs)

### Impact from Trinity Design System Spec
- Design system decisions (no category accent colors, frozen visual identity, motion specs) documented with teaching rationale in `spec/design-system-update.md`
- Component patterns (category icons, CSS utilities) include JSDoc explaining restraint-driven decisions
- Documentation spec requires all component changes to reference design system decisions

### Impact from Dozer Security Spec
- Security architecture decisions documented with teaching annotations in `spec/security-architecture.md`
- Phase 1 (security headers on static site) documented before backend arrives — no surprises during architecture evolution
- PII handling and encryption specifications inform ConciergeForm documentation and data layer JSDoc

### Tier Restructure Impact Analysis (2026-04-12, PR #202 → Issues #203–#210)

**Status:** ✅ ISSUES CREATED

After PR #202 merged the One Time / Yearly / Gift tier model into code, analyzed all specs and docs for stale references to the old Silver/Black/Obsidian membership model. Created 8 issues:

- **#203 (P0):** `spec/brand-pivot.md` — foundation spec, ~28 stale refs, full business model rewrite needed
- **#204 (P1):** `spec/site.md` — core site structure, ~13 stale refs
- **#205 (P1):** `spec/design-system-update.md` + `.impeccable.md` — design layer, tier styling specs
- **#206 (P1):** `README.md` + `spec/documentation-update.md` + `spec/luxurysite.md` — docs layer
- **#207 (P2):** `docs/competitive-analysis.md` — competitive set changes with business model
- **#208 (P2):** `spec/security-architecture.md` — tier RBAC model, Gift tier two-party identity
- **#209 (P1):** Retitle/update existing issues (#142, #141, #139, etc.) that reference old model
- **#210 (P1):** Architecture spike — downstream data model, API, and flow impacts of the model change

**Key insight:** This isn't a terminology rename. The old model was a linear privilege hierarchy (Silver < Black < Obsidian). The new model is three fundamentally different transaction types: transactional (One Time), subscription (Yearly), third-party purchase (Gift). This affects data model, consultation flows, API design, and access patterns.

### Sprint Plan — Complete Sequencing (2026-04-12)

**Status:** ✅ COMPLETE — Written to `.squad/decisions/inbox/morpheus-sprint-plan.md`

Sequenced all 37 open issues into 4 sprints (8 weeks) with clear dependencies and parallelization:

**Sprint 1 (Week 1–2): Foundation & Architecture**
- Critical path: #210 (architecture spike) → #203 (P0 brand rewrite)
- Output: Data model diagram, API shape, tier transaction type flows
- Gate: Blocks all downstream specs in Sprint 2

**Sprint 2 (Week 3–4): Spec Foundation Layer**
- All tier-impact specs (#204–#209) + security RBAC + Azure target architecture
- Parallelizable: #204, #205, #206 run together after #203
- Output: RACI matrix, security matrix, cloud architecture

**Sprint 3 (Week 5–6): API, Content, Back-Office Specs**
- Content APIs (#180, versioning/i18n), back-office (#186, #188), AI agents (#185, #189)
- Parallel: All downstream specs after #184 (Azure) + #187 (security impl) gated
- Output: API contracts, back-office orchestration, AI prompt strategy

**Sprint 4 (Week 7–8): Implementation Strategy & Quality**
- Data migration plan (#191), CI/CD (#192), environments (#193), test strategy (#197)
- UI bugs (#151–#173) can parallelize during spec phases
- Output: Phase 2 implementation backlog, no surprises

**Team assignments:** Morpheus (7 specs), Trinity (8 specs + QA), Dozer (9 specs), Niobe (4 specs), Tank (1 spec lead + spot-check)

**Key decisions:**
1. #210 is true critical path — must complete before #203 starts
2. Three tier types (One Time / Yearly / Gift) are fundamentally different transaction models, not cosmetic changes
3. Gift tier requires two-party identity (purchaser + recipient) — affects auth architecture
4. All specs written before Phase 2 implementation — no surprises for coders
5. Teaching-site framing: all decisions annotated with rationale for learners
6. No specs closed; #139/#141/#142 retitled in #209 (not closed)

### Documentation Audit & Refresh (#260, 2026-04-14)

**Status:** ✅ COMPLETE

Audited and refreshed core site documentation to align with current implementation and brand pivot.

**Changes:**
- Updated `README.md` with current stack (Next.js 16, React 19, Tailwind v4, Framer Motion), architectural clarity, and teaching-site framing
- Documented brand pivot from travel-only to experiential party packages (three tier transaction types)
- Added comprehensive section architecture overview (8-section page: Hero → TrustBar → WhyAurora → DestinationGrid → ExperienceList → Testimonials → Interstitial → Tiers → FAQ → ConciergeForm → Footer)
- Included design system documentation: fluid typography (clamp()-based), OKLCH color palette, spacing hierarchy, radius discipline, accessibility
- Clarified test structure at repo root (jest.config.js, playwright.config.ts, tests/unit/, tests/e2e/)
- Created "What's Next" section mapping to spec priorities: Platform APIs, Security & Identity, Content & AI, Operations & Quality
- Created `docs/repo-story.md` — 12KB narrative of project evolution from April 2026 foundation through current state
  - 10 phases documented: Foundation, Design Polish, A11y Hardening, Monorepo Restructure, Architecture Spike, Brand Pivot, Documentation Governance, Sprint Planning, Visual Polish, Current State
  - Key learnings captured: architecture precedes code, brand is architecture, A11y non-negotiable, design discipline kills AI aesthetics, teaching requires transparency, Squad structure scales

**Acceptance Criteria:**
- ✅ Core docs updated for current stack, section architecture, pivoted brand
- ✅ Documentation structure consistent and easy to navigate
- ✅ No stale screenshot references found
- ✅ "What's Next" maps spec priorities across 4 categories (platform, security, content, ops)
- ✅ docs/repo-story.md exists at repo root with 10-phase narrative, 1-2 page format

**Impact:**
- Future team members can onboard via narrative (docs/repo-story.md) then dive into spec/ for details
- README now reflects current reality (party platform, three tiers, experiential focus) instead of legacy travel framing
- Design system documentation explicit in README — new contributors understand token strategy without hunting globals.css
- "What's Next" aligns marketing docs with engineering roadmap (24 specs across Sprint 2-4)

### Spec Audit: Brand Pivot Compliance (#214, 2026-04-15)

**Status:** ✅ COMPLETE — Audit findings written to `.squad/decisions/inbox/morpheus-spec-audit.md`

Conducted comprehensive audit of all 24 spec files for stale travel-era references post-brand pivot (travel → party platform, tiers renamed to One Time / Yearly / Gift, pricing updated to $500K / $1.2M / $250K).

**Key Findings:**
- ✅ 21 of 24 specs (87.5%) fully aligned with pivot
- ⚠️ 1 spec (`sample-data-pack.md`) has minor terminology inconsistencies (specialist role titles still reference "Destination Manager")
- ❌ 2 specs (`luxurysite.md`, `site.md`) contradict frozen design system by referencing outdated dark-theme palette (neon, glassmorphism, #0a0a0f colors) instead of current warm ivory + champagne gold

**Critical Issue:** The two visual palette specs will confuse implementation engineers during Phase 2. Design system is intentionally frozen (warm ivory, champagne gold, editorial restraint) to teach learners that business pivots don't require visual rework. These specs reintroduce old dark palette — must be rewritten.

**Recommendations:**
- **P1 (Critical):** Rewrite visual sections in `luxurysite.md` and `site.md` to use current frozen palette (4–6 hours)
- **P2 (Nice-to-have):** Update specialist role terminology in `sample-data-pack.md` (1 hour)

**Impact on downstream work:**
- Ready to proceed with Phase 2 implementation after P1 fixes
- No blocking issues with core business logic, APIs, security, or infrastructure specs
- All tier-specific language (One-Time, Yearly, Gift) consistent across content/booking/security specs

**What the audit teaches:** Keeping a frozen design system across a business pivot is a deliberate pattern. It demonstrates to learners that architecture (semantic structure, types, APIs) and visual identity (colors, typography) are separate concerns. Business pivots change the former; good design systems absorb those changes in the content layer without visual churn.

### Monorepo Config Consolidation (#277, PR #279)

**Status:** ✅ COMPLETE

Restructured test configuration for proper monorepo hygiene:

- **Root `package.json` added:** `private: true`, `workspaces: ["apps/*"]`, test scripts delegating to `tests/` configs
- **`playwright.config.ts` → `tests/e2e/playwright.config.ts`:** Updated `testDir` to `.`, `outputDir`/`reportFolder` relative to new location, `webServer.cwd` to `../../apps/web`
- **`jest.config.js` → `tests/unit/jest.config.js`:** Updated `webRoot` resolution to `../../apps/web`, `setupFilesAfterEnv` to `<rootDir>/../jest.setup.ts`, `roots` to `<rootDir>` (now inside `tests/unit/`)
- **`apps/web/package.json`:** Test scripts updated to reference new config paths
- **`package-lock.json`:** Regenerated from new root `package.json` with workspaces

**Verification:** 47/47 unit tests passed, 19/19 e2e tests passed.

**Key pattern:** Config files live next to what they configure. `tests/e2e/` owns its Playwright config; `tests/unit/` owns its Jest config. Root `package.json` is the orchestrator — it delegates, never duplicates.

