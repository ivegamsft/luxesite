# Squad Decisions

## Active Decisions

### 1. Aurora Luxe Travel — Architecture Decisions
**Author:** Morpheus  
**Date:** 2024  
**Status:** Approved  

Production-ready, luxury travel website with futuristic aesthetic. Next.js 14+ App Router, TypeScript, Tailwind CSS, Framer Motion.

**Key Technical Points:**
- Project structure: `/app` with components, data, lib, destinations subdirs
- Styling: Tailwind CSS with custom aurora theme (cyan, purple, magenta, gold)
- Typography: Space Grotesk (headings), Inter (body) via next/font
- Images: Unsplash Source API with next/image optimization
- Animation: Framer Motion for scroll-triggered reveals
- Data: All mock data in `/app/data/*.ts` (no backend)
- State: Local React useState only (no global state needed)
- Responsive: Mobile-first with Tailwind breakpoints
- Testing: E2E and a11y focus, skip unit tests on static components
- Deployment: Vercel with GitHub Actions CI/CD

See `.squad/decisions/morpheus-architecture.md` for full details.

---

### 2. Colocate Tests with Components
**Author:** Morpheus  
**Date:** 2026-04-09  
**Status:** Implemented  

Component tests moved from `__tests__/components/` → `app/components/__tests__/`  
Mock files moved from `__mocks__/` → `app/__mocks__/`  
Config files (`jest.config.js`, `jest.setup.ts`) stay at root — standard tooling configs like `tsconfig.json`  

All 24 tests pass. Colocation keeps tests near the code they exercise. Root stays clean and config-only.

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
