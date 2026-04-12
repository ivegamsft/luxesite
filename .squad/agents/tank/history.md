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

## Session Activity

### Impeccable Audit Fixes (2026-04-10T03:42:03Z)

**Session:** ivegamsft requested full audit fix  
**Status:** ✅ COMPLETE  
**Orchestration Log:** `.squad/orchestration-log/2026-04-10T03-42-03Z-tank.md`

Added 15 new accessibility and visual regression tests covering audit fixes (keyboard navigation, aria attributes, gradient text removal, layout changes). Test count: 39 → 41 total. All 41 tests pass; comprehensive coverage ensures audit findings remain resolved.

### Brand Pivot E2E Test Fixes (2026-04-10)

**Session:** ivegamsft requested fix for 4 failing Playwright e2e tests after brand pivot.  
**Status:** ✅ COMPLETE  

Fixed 5 assertions in `apps/web/e2e/homepage.spec.ts` to match post-pivot content:
- Hero h1: `"Celebrations Written in Light"` → `"Extraordinary Celebrations for Every Age"`
- Hero CTA: `"Explore Experiences"` → `"Explore Celebrations"`
- Destinations h2: `"Curated Destinations"` → `"Celebration Spaces"`
- Experiences h2: `"Signature Experiences"` → `"Signature Celebrations"`
- Concierge Form details: Updated field IDs (`#travelDates` → `#eventDate`, `#travelers` → `#expectedGuests`), moved `#notes` assertion before the expandable toggle (it's always visible now), fixed toggle button text to `"Share more details (optional)"`.

All 19 Playwright tests pass. Screenshots regenerated.

## Learnings

- **Brand Pivot Content Changes:** The brand pivot renamed travel-themed content to celebration-themed content throughout. Key mapping: Destinations → Celebration Spaces, Experiences → Signature Celebrations, travel dates → event dates, travelers → expected guests. The `#notes` field moved from inside the expandable details section to always-visible. The expandable toggle text changed from `"Share more details"` to `"Share more details (optional)"`.
- **ConciergeForm Structure Post-Pivot:** The form has `#name`, `#email`, `#notes` always visible. The expandable "Share more details (optional)" section contains `#eventDate` (text), `#expectedGuests` (number input), interests (toggle buttons), and `#budget` (select dropdown).

### E2E Test Suite Refresh (2026-04-11T23:20:15Z)

**Session:** Post-brand-pivot content validation  
**Status:** ✅ COMPLETE  
**Orchestration Log:** `.squad/orchestration-log/2026-04-11T23-20-15Z-tank.md`

Ran full E2E suite to validate post-pivot content. All 19 Playwright tests pass. Screenshots regenerated to reflect:
- Hero heading update
- Destinations/Celebration Spaces heading
- Experiences/Signature Celebrations heading
- ConciergeForm field ID stability

This validated that tier references (One Time/Yearly/Gift model) are stable across the test suite. See `.squad/decisions/decisions.md` for tier architecture changes.

### Issues #232–#235 Verification (2026-04-12)

**Session:** Verify Trinity's commit 7dc22ae fixing issues #232–#235  
**Status:** ✅ ALL VERIFIED

**Results:**
- **Tests:** 43/43 passed (7 suites), no regressions
- **Build:** Next.js 16.2.3 production build clean, all routes generated
- **#232 Typography hierarchy:** Fluid scale at 375px: h1=38.1px, h2=29.1px, h3=22.8px. Ratios 1.31x and 1.28x — clear differentiation ✅
- **#233 Content cleanup:** Zero matches for "cocktail reception", "cocktail lounge", "adult gala" across entire codebase ✅
- **#234 Spacing reduction:** section-lg min=4rem (was 6rem), section-md min=3rem (was 5rem) — ~35% reduction confirmed ✅
- **#235 Contrast fix:** `aurora-gold-accessible` (#7a6532) registered in globals.css and tailwind.config.ts. Contrast ratio 5.34:1 on #faf9f7 — WCAG AA pass ✅

All four issues closed via `gh issue close`.

## Learnings

- **Fluid Type Verification Math:** At 375px viewport, 1vw = 3.75px. For `clamp(min, base + slope*vw, max)`, compute preferred = (base_rem * 16) + (slope * 3.75), then clamp between min and max in px. Useful for verifying responsive typography without a browser.
- **WCAG Contrast Formula:** Use relative luminance formula with sRGB linearization, then ratio = (L_lighter + 0.05) / (L_darker + 0.05). #7a6532 on #faf9f7 = 5.34:1, comfortably above 4.5:1 AA threshold.
