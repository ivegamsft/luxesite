# Project Context

- **Owner:** ivegamsft
- **Project:** Aurora Luxe Travel — a futuristic luxury travel website. Single-page (plus optional destination detail route) for a fictional ultra-premium concierge travel brand.
- **Stack:** Next.js (latest stable), TypeScript, Tailwind CSS, Framer Motion, next/image
- **Created:** 2026-04-10

## Learnings

- **Test Colocation (2026-04-10):** Tests moved from `__tests__/components/` to `app/components/__tests__/`, mocks from `__mocks__/` to `app/__mocks__/`. Improves project hygiene and keeps tests near components. No config changes needed — `next/jest` auto-discovers.
