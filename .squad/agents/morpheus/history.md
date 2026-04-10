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
