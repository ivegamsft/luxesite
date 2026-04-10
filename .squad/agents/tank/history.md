# Project Context

- **Owner:** ivegamsft
- **Project:** Aurora Luxe Travel — a futuristic luxury travel website. Single-page (plus optional destination detail route) for a fictional ultra-premium concierge travel brand.
- **Stack:** Next.js (latest stable), TypeScript, Tailwind CSS, Framer Motion, next/image
- **Created:** 2026-04-10

## Team Updates

- **Monorepo Structure (2026-04-10):** App code moved to `apps/web/` (by Morpheus). All tests, builds, and dev server now run from `apps/web/` context. Update your paths in test runs and CI workflows. See `.squad/decisions/decisions.md` for full details.
- **UI Fixes & Animation Visibility (2026-04-10):** Trinity fixed 5 critical UI issues (broken sm breakpoint, selection styling, navbar clipping, form controls, tier overflow). Also changed all Framer Motion animations to keep opacity:1 on initial render — content always visible, animations are progressive enhancement. This fixed the P0 issue of sections being invisible on full-page screenshots.

## Learnings

- **Test Colocation (2026-04-10):** Tests moved from `__tests__/components/` to `app/components/__tests__/`, mocks from `__mocks__/` to `app/__mocks__/`. Improves project hygiene and keeps tests near components. No config changes needed — `next/jest` auto-discovers.
- **Playwright E2E Setup (2026-04-10):** Installed `@playwright/test` with Chromium-only for speed. Config at `apps/web/playwright.config.ts` with webServer auto-start, screenshot-on-every-test, and output to `e2e/screenshots/`. Tests in `apps/web/e2e/homepage.spec.ts` cover all 8 sections + full-page. Use `scrollIntoViewIfNeeded()` + `waitForTimeout(1000)` to let Framer Motion animations settle before screenshotting. Use `{ exact: true }` on `getByText` when text is a substring of other elements (e.g., "AURORA LUXE" in footer also matches copyright line).
- **UI Issues Discovered (2026-04-10):** Screenshots revealed two major problems: (1) Framer Motion scroll-triggered animations leave all below-fold sections at `opacity: 0` on initial/static render — full-page screenshot is blank after hero. (2) Sticky navbar has no scroll-margin-top compensation, so section headings get clipped when navigating to anchors. Filed to `.squad/decisions/inbox/tank-ui-issues-found.md`. **UPDATE (2026-04-10T03:18):** Both issues now fixed by Trinity. Full-page screenshot shows all sections visible; section headings no longer clipped.
- **Design Audit Test Coverage (2026-04-10):** Wrote 15 new tests across 5 files to verify Trinity's accessibility and visual fixes from the Impeccable design audit. All 39 tests pass (7 suites). Key test locations and patterns:
  - `ConciergeForm.test.tsx` — 4 new a11y tests: `aria-invalid`, `aria-describedby` → error ID linkage, `aria-live` region for screen reader announcements, unique error IDs.
  - `DestinationGrid.test.tsx` — 5 new touch/keyboard tests: `role="button"`, `tabIndex={0}`, Enter/Space key toggles `aria-expanded`, click toggle.
  - `Hero.test.tsx` — 2 new tests: scroll indicator present, smoke render test.
  - `Footer.test.tsx` — 1 new test: asserts `bg-clip-text` is absent from logo (gradient text removal).
  - `Testimonials.test.tsx` — 3 new tests (new file): heading render, quote presence, `bg-clip-text` absent from heading.
  - Pattern: use `.closest('[role="button"]')` to traverse from text node to interactive card wrapper. Use `fireEvent.keyDown` with `{ key: 'Enter' }` / `{ key: ' ' }` for keyboard tests. Check className with `.not.toMatch(/bg-clip-text/)` for CSS regression tests.
