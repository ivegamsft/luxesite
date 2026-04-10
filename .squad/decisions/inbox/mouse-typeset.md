# Typography System Decisions
**Author:** Mouse  
**Date:** 2026-04-10  
**Status:** Implemented  

## Decisions Made

### 1. Heading Size Hierarchy
- **Display (Hero h1):** `text-fluid-3xl` — the only element at this size
- **Section h2s:** `text-fluid-2xl` — clear step down from display
- **Subsection h3s:** `text-fluid-xl` (tier names) or `text-fluid-lg` (card titles)
- **Rationale:** Previously Hero and all section h2s shared `text-fluid-3xl`. No visual hierarchy existed between page-level and section-level headings.

### 2. Line-Height Scales Inversely with Size
- Display (3xl): `leading-[1.1]`
- Section (2xl): `leading-tight` (1.25)
- Pull quotes (xl–2xl): `leading-snug` (1.375)
- Body: `line-height: 1.7` (globals.css) — extra breathing room for light-on-dark
- **Rationale:** At 6.5rem, Tailwind's default 1.5 line-height produces nearly 10rem of leading — visually absurd for display type.

### 3. Font Weight Roles
- Display: `font-bold` (700)
- Section headings: `font-semibold` (600)
- Subsection headings: `font-medium` (500)
- Body: Regular (400)
- Buttons: `font-semibold` (600)
- **Rationale:** Weight should reinforce hierarchy, not be arbitrary. Each level gets exactly one weight.

### 4. Letter-Spacing by Size
- `text-fluid-3xl` and `text-fluid-2xl`: `tracking-tight` (-0.025em)
- Uppercase wordmarks/labels: `tracking-wider` or `tracking-widest`
- Body and small text: default
- **Rationale:** Large letterforms need tighter tracking. Small uppercase needs open tracking. Standard typographic practice.

### 5. Tabular Numerals for Prices
- All price displays use Tailwind's `tabular-nums` class
- **Rationale:** Prices displayed in columns (tier cards) or repeated patterns (destination badges) need consistent numeral width for visual alignment.

### 6. Ch-Based Text Measure
- Prose max-widths use `ch` units (`max-w-[65ch]`, `max-w-[75ch]`)
- Layout containers keep `max-w-*` (px-based)
- **Rationale:** `ch` units adapt to the actual font being rendered. 65ch ≈ optimal reading line length regardless of font-size or font-family.

### 7. OpenType Features
- `font-kerning: normal` on body
- Kept `uppercase` text-transform on labels (Google Fonts subsetting may strip small-caps)
- **Rationale:** Explicit kerning ensures consistent letterspacing. Small-caps deferred until font file verification possible.

### 8. Body Line-Height for Dark Theme
- `line-height: 1.7` on body — slightly above standard 1.5–1.625
- **Rationale:** Light text on dark backgrounds appears lighter weight. Additional leading compensates and improves readability.

## Files Changed
- `globals.css` — body line-height, font-kerning
- `Hero.tsx` — leading, button weights, subtitle max-w
- `DestinationGrid.tsx` — heading size/weight/tracking/leading, price tabular-nums, subtitle max-w
- `ExperienceList.tsx` — heading size/weight/tracking/leading, h3 weight
- `Tiers.tsx` — heading size/weight/tracking/leading, h3 weight, price tabular-nums, button weight, subtitle max-w
- `ConciergeForm.tsx` — heading size/weight/tracking/leading, subtitle max-w
- `Testimonials.tsx` — pull quote leading/tracking/max-w, active quote leading
- `Navbar.tsx` — button weights
- `FloatingCTA.tsx` — button weight
