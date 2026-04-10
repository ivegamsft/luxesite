# Neo — Wave 4 Decisions

## Issue #46: Break layout monotony

**Decision: Changed 3 of 5 grid sections, kept 2 as-is**
- Changed ExperienceList, GuideGrid, WhyAurora — the three sections that were identical 3-col grids with stagger fade-up.
- Kept DestinationGrid (featured + grid already works well) and Tiers (pricing grid is standard UX) unchanged per instructions.

**Decision: ExperienceList → featured + compact grid**
- Chose 2-column layout (featured left, 2×4 grid right) over horizontal scroll. The 8-card dataset is too large for scroll on desktop, and the featured card emphasizes "Wildlife Safaris" as the flagship experience. Mobile stacks naturally (featured on top, grid below).

**Decision: GuideGrid → magazine editorial hero + grid**
- First guide renders as a side-by-side hero card (image left, content right) with a "Featured Guide" label. This immediately signals editorial curation vs AI generation. Remaining 5 guides stay in the standard card grid below — they already have images so the visual interest is natural.

**Decision: WhyAurora → horizontal scroll strip**
- Replaced the stagger-animated 3-col grid with a static horizontal scroll strip. Rationale: (1) team sections in luxury travel sites use this pattern (cf. LinkedIn, Virtuoso), (2) the asymmetric card sizing (first 2 larger) adds visual interest, (3) removing animation from a credibility section is intentional — trust content shouldn't bounce in.

**Decision: Animation diversity**
- ExperienceList featured card: slide-from-left (x: -32). Compact cards: simple opacity fade with minimal stagger (0.04s). No vertical motion.
- GuideGrid featured: slide-from-left. Remaining cards: simple opacity fade.
- WhyAurora: No Framer Motion animation at all — static render. Differentiators also static (removed AnimatedSection wrapper).
- This breaks the "everything stagger-fades-up" pattern that was the #1 AI tell.

## Issue #49: Replace emoji with SVGs

**Decision: Icon map in component, IDs in data**
- Kept the icon map (`experienceIcons` record) in ExperienceList.tsx rather than a separate file. There are only 8 icons and they're tightly coupled to this component. If reused elsewhere later, extraction is trivial.

**Decision: Stroke-only 24×24 SVGs**
- All icons use `fill="none" stroke="currentColor" strokeWidth="1.5"` to match the existing differentiator icons in WhyAurora. This gives a consistent monoline look across the site.

**Decision: `text-aurora-gold` coloring**
- Icons render in the brand gold via `text-aurora-gold` Tailwind class (inherited via `stroke="currentColor"`). This replaces the previous `text-4xl` emoji sizing with a more controllable `w-8 h-8` SVG sizing.
