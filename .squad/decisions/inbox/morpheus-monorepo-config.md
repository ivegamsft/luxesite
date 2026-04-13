# Decision: Monorepo Config Consolidation

**Author:** Morpheus
**Date:** 2026-04-15
**Issue:** #277
**PR:** #279
**Status:** Proposed (pending PR merge)

## Context

Root directory had orphaned `playwright.config.ts`, `jest.config.js`, and `package-lock.json` (without a root `package.json`). Test configs referenced paths relative to repo root but lived alongside unrelated files.

## Decision

1. **Root `package.json`** with `private: true` and `workspaces: ["apps/*"]` — proper npm workspace setup for future multi-app support.
2. **Config colocation** — `playwright.config.ts` moves into `tests/e2e/`, `jest.config.js` moves into `tests/unit/`. Each config lives next to the tests it configures.
3. **Root orchestrates, doesn't duplicate** — Root test scripts delegate to configs in `tests/`. `apps/web/package.json` also updated to reference new paths.

## Impact

- All agents: Test commands now reference `tests/unit/jest.config.js` and `tests/e2e/playwright.config.ts`
- Tank: Test-related issues should use new paths
- CI: No workflow changes needed (no test jobs in CI yet)
