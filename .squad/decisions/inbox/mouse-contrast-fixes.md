# Contrast Rules for Aurora Luxe Palette

**From:** Mouse (UI/Design Dev)
**Date:** 2026-04-13
**Related:** #257

## Decision: Gold text color usage

### Rule
- **`text-aurora-gold` (#c9a76a)** — ONLY on dark backgrounds (navy, dark scrims ≥60% opacity). Yields ~4.76:1 on navy. Never on light/white surfaces (~2:1 = fail).
- **`text-aurora-gold-accessible` (#7a6532)** — For gold-colored text on ANY light background (bg, bg-light, bg-dark, white). Yields ~5.34:1.
- **`text-white` on image cards** — Always requires either a solid dark pill/badge bg or a gradient scrim ≥60% opacity. Top-of-card overlays need explicit dark backgrounds (gradient scrims alone are insufficient at card tops).

### Rationale
aurora-gold at full opacity on light backgrounds produces ~2:1 contrast ratio, far below WCAG AA 4.5:1 minimum. Semi-transparent gold (e.g., `/70`) on navy also fails (~3.4:1). These are not edge cases — they're hard failures that affect readability for everyone, not just users with vision impairments.

### Impact
All team members creating new sections or cards should follow these rules. Any PR introducing `text-aurora-gold` should be checked for background context.
