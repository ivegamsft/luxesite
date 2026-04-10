# Decision: Monorepo Restructure — apps/web/

**Author:** Morpheus  
**Date:** 2026-04-10  
**Status:** Implemented  

## Context

User wants the Next.js web app to be self-contained so a backend/API app in another language can be added later. Also simplifies workflow isolation (CI/CD can target `apps/web/` specifically).

## Decision

Move the entire Next.js application into `apps/web/` with its own `package.json`, `node_modules`, and all config files. Root stays project-level only (README, spec/, .squad/, .github/).

**No npm workspaces at root** — the web app is fully self-contained. Workspaces can be added later if shared tooling is needed.

## Structure

```
luxesite/
├── apps/
│   └── web/          ← All Next.js code, configs, and dependencies
├── spec/             ← Project-wide specifications
├── .squad/           ← Team configuration
├── .github/          ← CI/CD workflows
├── .gitignore        ← Updated for nested paths
└── README.md         ← Project-level overview
```

## Verification

- ✅ Build passes (`npm run build` in `apps/web/`)
- ✅ All 24 tests pass (`npm test` in `apps/web/`)
- ✅ Git history preserved via `git mv`
- ✅ `.gitignore` updated with recursive patterns (no leading `/`)

## Future Considerations

- When adding `apps/api/` or `apps/backend/`, each app gets its own language tooling
- CI workflows can use `paths:` filters scoped to `apps/web/**`
- If shared JS/TS packages are needed later, introduce npm workspaces + a root `package.json`
