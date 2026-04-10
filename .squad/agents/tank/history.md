# Project Context

- **Owner:** ivegamsft
- **Project:** Aurora Luxe Travel — a futuristic luxury travel website. Single-page (plus optional destination detail route) for a fictional ultra-premium concierge travel brand.
- **Stack:** Next.js (latest stable), TypeScript, Tailwind CSS, Framer Motion, next/image
- **Created:** 2026-04-10

## Team Updates

- **Monorepo Structure (2026-04-10):** App code moved to `apps/web/` (by Morpheus). All tests, builds, and dev server now run from `apps/web/` context. Update your paths in test runs and CI workflows. See `.squad/decisions/decisions.md` for full details.

## Learnings

- **Test Colocation (2026-04-10):** Tests moved from `__tests__/components/` to `app/components/__tests__/`, mocks from `__mocks__/` to `app/__mocks__/`. Improves project hygiene and keeps tests near components. No config changes needed — `next/jest` auto-discovers.
- **Playwright E2E Setup (2026-04-10):** Installed `@playwright/test` with Chromium-only for speed. Config at `apps/web/playwright.config.ts` with webServer auto-start, screenshot-on-every-test, and output to `e2e/screenshots/`. Tests in `apps/web/e2e/homepage.spec.ts` cover all 8 sections + full-page. Use `scrollIntoViewIfNeeded()` + `waitForTimeout(1000)` to let Framer Motion animations settle before screenshotting. Use `{ exact: true }` on `getByText` when text is a substring of other elements (e.g., "AURORA LUXE" in footer also matches copyright line).
- **UI Issues Discovered (2026-04-10):** Screenshots revealed two major problems: (1) Framer Motion scroll-triggered animations leave all below-fold sections at `opacity: 0` on initial/static render — full-page screenshot is blank after hero. (2) Sticky navbar has no scroll-margin-top compensation, so section headings get clipped when navigating to anchors. Filed to `.squad/decisions/inbox/tank-ui-issues-found.md`.
