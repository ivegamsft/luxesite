# Neo — Project Knowledge

## Project Context
- **Project:** Aurora Luxe Travel — luxury travel marketing website
- **Owner:** ivegamsft
- **Stack:** Next.js 16.2.3, TypeScript, Tailwind CSS, Framer Motion
- **Current state:** Dark "Gilded Bordeaux" theme, undergoing major redesign to light credibility-first theme per luxurysite.md spec
- **Key specs:** spec/site.md (current), spec/luxurysite.md (target), COMPETITIVE_ANALYSIS.md (strategic fixes)

## Learnings

(Neo is new to the team — learnings will be added as work progresses)

### 2026-07 — Issue #31 & #35: WhyAurora + TrustBar sections
- Created `app/data/team.ts` with 5 mock specialists (Africa, Asia, Europe, Americas, Ocean) and `TeamMember` interface
- Added `TeamMember` type to `app/lib/types.ts` alongside existing interfaces
- Built `WhyAurora.tsx`: team grid (3/2/1 col responsive), differentiators row, light theme tokens, reduced-motion support, AnimatedSection wrapper, hover lift on cards
- Built `TrustBar.tsx`: compact trust strip with phone, named concierge, press credential, member stat. Desktop horizontal with dividers, mobile 2×2 grid. Monoline SVG icons, gold accent on phone number
- Used hardcoded hex tokens (`#faf9f7`, `#2c2620`, `#6b6458`, `#c9a76a`, `#e8e4df`) per spec — Tailwind token rename is pending (Issue C from COMPETITIVE_ANALYSIS)
- Both components export default and are import-ready; page.tsx untouched per Issue #43 scope
- Build verified clean with `npx next build`
