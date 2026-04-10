# Design Decisions — Issue #1 & #3 Fixes

**Author:** Mouse
**Date:** 2026-04-10
**Status:** Implemented

## 1. Featured Tier Border: Static, Not Animated

The `.animated-border::before` conic gradient no longer spins. The `@keyframes rotate` animation and its `prefers-reduced-motion` override have been removed.

**Rationale:** Continuous rotation violates "authority through restraint." The conic gradient (champagne gold → bordeaux → dusty rose → gold) is already a strong visual differentiator as a static border. Spinning draws the eye reflexively — the featured tier should command attention through presence, not movement. Luxury brands don't wave their arms.

**What's preserved:** The conic gradient itself, the glass backdrop, the 12px blur, and the mask-composite technique. The card still reads as distinctly "featured."

## 2. Destination Card Contrast: Dual-Scrim System

Replaced the single full-image gradient overlay with a three-layer scrim system:

1. **Full vignette** (`inset-0`, `from-aurora-dark/70 via-aurora-dark/20 to-transparent`) — general cinematic tone
2. **Bottom scrim** (`h-1/2`, `from-aurora-dark/80 via-aurora-dark/40 to-transparent`) — targeted text protection for title, region, tagline
3. **Top-right corner** (`w-2/3 h-1/3`, `from-aurora-dark/60 to-transparent diagonal`) — price text contrast without a badge

**Rationale:** Single-layer gradients distribute evenly across the full image height. On tall cards (featured 16:9) or bright imagery (Swiss Alps snow, Dubai skyline gold), the gradient becomes too diffuse to protect text at the extremes. Layered scrims let each text zone get the exact opacity it needs.

**Price text:** Opacity bumped from `/60` to `/80`. Combined with the corner scrim, this ensures WCAG AA (4.5:1) against any background. No badge or pill added — respects Decision #3 ("Price Display: Typographic, Not Badge").

**Region text:** Opacity bumped from `/60` to `/70` for better contrast on bright backgrounds while maintaining the subdued hierarchy below the title.

**All scrims use `pointer-events-none`** so hover states, click toggles, focus states, and keyboard navigation remain unaffected.

## Colors

All changes use `aurora-dark` (OKLCH) at various opacity stops. No new color tokens introduced. No hex/rgba.
