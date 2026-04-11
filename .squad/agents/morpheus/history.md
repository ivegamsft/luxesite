# Project Context

- **Owner:** ivegamsft
- **Project:** Aurora Luxe Travel — a futuristic luxury travel website. Single-page (plus optional destination detail route) for a fictional ultra-premium concierge travel brand.
- **Stack:** Next.js (latest stable), TypeScript, Tailwind CSS, Framer Motion, next/image
- **Created:** 2026-04-10

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->

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
