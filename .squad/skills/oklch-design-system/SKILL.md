# Skill: OKLCH Design System

## When to Use
When building or redesigning a color palette for a dark-mode luxury brand. Avoids the "AI slop" look by using OKLCH color space with intentional warm tinting.

## Pattern

### 1. Use OKLCH for All Colors
OKLCH provides perceptual uniformity — lightness values map predictably to visual brightness. Format: `oklch(L C H)` or `oklch(L C H / alpha)`.

- **L** (lightness): 0–1, where 0.15 is a rich dark, 0.95 is a light ivory
- **C** (chroma): 0–0.4+, higher = more saturated. Keep backgrounds <0.02, accents 0.09–0.15
- **H** (hue): 0–360. Pick 2-3 related hues for coherence.

### 2. Tint Your Neutrals
Never use pure grays (#0a0a0a, #f0f0f0). Add a subtle hue to both dark and light ends:
```css
--dark: oklch(0.15 0.015 50);   /* warm brown tint, not pure black */
--light: oklch(0.95 0.012 85);  /* warm ivory tint, not pure white */
```

### 3. Glass Done Right
Glassmorphism should be purposeful, not universal:
- **Solid surfaces (cards, forms):** High opacity (0.65-0.8), low blur (4-8px)
- **Floating overlays (navbar, modals):** Medium opacity (0.5-0.65), medium blur (10-14px)
- **Feature accents only:** Lower opacity (0.4-0.55), higher blur (14-20px)

### 4. Fluid Typography Scale
Use Major Third (1.25) ratio with `clamp()` for responsive type:
```css
--fluid-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--fluid-xl: clamp(1.563rem, 1.25rem + 1.56vw, 2.25rem);
```

### 5. Token Names ≠ Token Values
Keep semantic token names stable across palette changes. Components reference `aurora-cyan` (a name), not the actual cyan color. This allows full palette swaps without touching components.

## Example
See `apps/web/app/globals.css` and `apps/web/tailwind.config.ts` for the "Gilded Bordeaux" implementation.
