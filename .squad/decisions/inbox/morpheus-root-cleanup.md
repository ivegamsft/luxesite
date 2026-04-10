# Decision: Colocate Tests with Components

**Author:** Morpheus
**Date:** 2026-04-09
**Status:** Implemented

## Context

Root directory had `__tests__/` and `__mocks__/` directories that cluttered the project root alongside standard config files. User requested a clean root.

## Decision

- Component tests moved from `__tests__/components/` → `app/components/__tests__/`
- Mock files moved from `__mocks__/` → `app/__mocks__/`
- Config files (`jest.config.js`, `jest.setup.ts`) stay at root — they're standard tooling configs like `tsconfig.json`
- No changes to `jest.config.js` were needed — `next/jest` auto-discovers tests via glob

## Rationale

Colocation keeps tests near the code they exercise. The `@/` alias means import paths don't change regardless of test file location. Root stays reserved for config-only files.

## Verification

All 24 tests across 6 suites pass after the move. No configuration changes required.
