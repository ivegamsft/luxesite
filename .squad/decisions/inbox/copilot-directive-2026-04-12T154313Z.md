### 2026-04-12T15:43:13Z: User directive
**By:** Israel Vega (via Copilot)
**What:** The workflow is: issue first → plan → work in worktrees → test → PR → merge. No direct commits to main. No working on main branch. Always use the issue→worktree→PR pipeline.
**Why:** User request — captured for team memory. Previous sessions violated this by committing directly to local main, causing 18 stranded commits that couldn't be pushed due to branch protection.
