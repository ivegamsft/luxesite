# Card Overlay Zone Redesign (#256)

**Author:** Mouse
**Date:** 2026-04-14
**Status:** Implemented

## Decision

Replace the absolute-positioned dual-overlay system in DestinationGrid cards with a flexbox zone architecture that prevents text/panel collisions and guarantees WCAG AA contrast on any background image.

## Implementation

**Structure:** Single `absolute inset-0 flex flex-col` overlay with three zones:
1. **Top zone** (`flex-shrink-0`): Price badge — `bg-black/50 backdrop-blur-sm` pill
2. **Middle zone** (`flex-1 min-h-0`): Quick facts panel — `bg-black/70 backdrop-blur-sm rounded-sm`, scrollable, only visible when card is expanded
3. **Bottom zone** (`flex-shrink-0`): Title + subtitle + CTA — always visible

**Scrim:** `bg-gradient-to-t from-black/70 via-black/40 to-transparent` replaces the previous `aurora-text/78` gradient. Black at 70% opacity gives ≥7:1 contrast for white text regardless of image brightness.

## Rationale

- **Zone collisions:** The old design used two independent absolute containers (quick facts pinned top-to-bottom-28, text pinned bottom-0). On featured cards (2-row span) or varying content length, these zones overlapped. Flexbox's intrinsic sizing eliminates this class of bug entirely.
- **Contrast failure:** `aurora-text` (#2c2620, dark brown) at 78% opacity produces ~3.8:1 contrast on bright images — below WCAG AA's 4.5:1 threshold. Pure black at 70% exceeds 7:1.
- **Quick facts containment:** The previous panel had no boundary and bled past the title area. The new `rounded-sm` panel with `mx-4` margin gives it a visually distinct floating card-within-card appearance.

## Conventions Established

- Card overlays must use **flexbox zone layout**, not stacked absolutes, when mixing persistent and toggled content
- Scrim gradients must use **black** base (not theme color) at ≥60% opacity for text contrast
- `aurora-gold` is safe as accent text on scrims ≥50% black opacity
- Quick facts panels should use `backdrop-blur-sm` for depth separation from the image
