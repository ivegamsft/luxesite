# Design Polish — Kill AI Aesthetics

**Author:** Mouse  
**Date:** 2026-04-10  
**Status:** Implemented  

## Decisions Made

### 1. Corner Radius Hierarchy (replaces uniform rounded-2xl)
- **Cards/containers:** `rounded-sm` — sharp, editorial authority
- **Buttons:** `rounded-lg` — medium, touchable
- **Inputs:** `rounded-lg` — matches buttons
- **Pills/badges:** `rounded-full` — only these get full rounding
- **Rationale:** Uniform `rounded-2xl` was the #1 AI aesthetic tell. Hierarchy creates visual intention.

### 2. SVG Icon System for ExperienceList
- Inline monoline SVGs replace emoji. 24×24 viewBox, `currentColor` stroke, 1.5px weight.
- Icons keyed by experience ID via `experienceIcons` map.
- **Rationale:** Emoji destroys premium credibility. Monoline SVGs read as editorial illustration.

### 3. Hero Copy Direction
- Subtext: "Private shores. Unmarked airstrips. Tables that don't take reservations."
- Fragmented, atmospheric, under 15 words. No "curated", "discerning", "pinnacle", "luxury".
- **Rationale:** The brand name says luxury. Copy should evoke, not describe.

### 4. Price Display: Typographic, Not Badge
- Destination prices shown in Bodoni Moda at reduced opacity. No gradient background, no pill.
- **Rationale:** SaaS pricing pills undermine editorial tone. The number speaks for itself.

### 5. No Aurora Blob in Hero
- Removed floating gradient blob. Added bottom vignette for text readability.
- **Rationale:** Blurred gradient circles are the most common AI hero element. Photography carries the mood.

### 6. Section Intro Variety System
- Each section uses a different heading/subtitle treatment. No two sections structurally identical.
- **Rationale:** Formulaic repetition reads as template. Editorial layout demands compositional variety.

### 7. Branded Error Color
- `aurora-error: oklch(0.65 0.20 25)` — warm bordeaux-adjacent red, not cold Tailwind red-400.
- **Rationale:** Every visible color should belong to the OKLCH brand system.
