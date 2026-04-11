# Work Routing

How to decide who handles what.

## Routing Table

| Work Type | Route To | Examples |
|-----------|----------|----------|
| Architecture & structure | Morpheus | Project scaffolding, folder structure, tech decisions, dependency graphs |
| Frontend components & UI | Trinity | React components, TypeScript, forms, data models, Next.js config |
| Azure infrastructure & APIs | Dozer | Container Apps, APIM, Cosmos DB, PostgreSQL, IaC (Bicep/Terraform), CI/CD pipelines |
| AI, agents & M365 integration | Niobe | Foundry AI, Copilot agents, Graph API, MCP, Power Platform, Dynamics 365 |
| Security architecture | Morpheus + Dozer | RBAC, identity, encryption, API security, compliance (collaborate) |
| Back-office platform | Niobe + Dozer | Power Apps, Power Automate, Document Intelligence (collaborate) |
| Content management | Trinity + Dozer | CMS frontend (Trinity), CMS APIs and workflow (Dozer) |
| Visual design & animation | Mouse *(reserve)* | Tailwind config, Framer Motion — recall when implementation starts |
| New frontend features | Neo *(reserve)* | Complex component builds — recall when implementation starts |
| Code review | Morpheus | Review PRs, check quality, suggest improvements |
| Testing & QA strategy | Tank | Test strategy, write tests, find edge cases, accessibility, verify builds |
| Scope & priorities | Morpheus | What to build next, trade-offs, decisions |
| Session logging | Scribe | Automatic — never needs routing |

## Issue Routing

| Label | Action | Who |
|-------|--------|-----|
| `squad` | Triage: analyze issue, assign `squad:{member}` label | Lead |
| `squad:{name}` | Pick up issue and complete the work | Named member |

### How Issue Assignment Works

1. When a GitHub issue gets the `squad` label, the **Lead** triages it — analyzing content, assigning the right `squad:{member}` label, and commenting with triage notes.
2. When a `squad:{member}` label is applied, that member picks up the issue in their next session.
3. Members can reassign by removing their label and adding another member's label.
4. The `squad` label is the "inbox" — untriaged issues waiting for Lead review.

## Rules

1. **Eager by default** — spawn all agents who could usefully start work, including anticipatory downstream work.
2. **Scribe always runs** after substantial work, always as `mode: "background"`. Never blocks.
3. **Quick facts → coordinator answers directly.** Don't spawn an agent for "what port does the server run on?"
4. **When two agents could handle it**, pick the one whose domain is the primary concern.
5. **"Team, ..." → fan-out.** Spawn all relevant agents in parallel as `mode: "background"`.
6. **Anticipate downstream work.** If a feature is being built, spawn the tester to write test cases from requirements simultaneously.
7. **Issue-labeled work** — when a `squad:{member}` label is applied to an issue, route to that member. The Lead handles all `squad` (base label) triage.
