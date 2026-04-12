# Decision: Bump `--fluid-2xl` for stronger H2 hierarchy

**Author:** Trinity
**Date:** 2026-04-12
**Issue:** #251
**Status:** Implemented

## Context

All 7 section H2s (WhyAurora, DestinationGrid, ExperienceList, Testimonials, Tiers, FAQ, ConciergeForm) use `text-fluid-2xl`. The old value `clamp(1.75rem, 1.4rem + 1.75vw, 2.5rem)` resolved to 28-40px — only 1.75x body text at mobile. Luxury sites need dramatic type hierarchy.

## Decision

Bumped `--fluid-2xl` from `clamp(1.75rem, 1.4rem + 1.75vw, 2.5rem)` (28-40px) to `clamp(2rem, 1.5rem + 2.5vw, 3rem)` (32-48px).

**Revised scale:**
| Token | Range | Ratio to body |
|-------|-------|---------------|
| sm | 13-14px | 0.8-0.875x |
| base | 16px | 1x |
| lg | 18-22px | 1.125-1.375x |
| xl | 22-30px | 1.375-1.875x |
| **2xl** | **32-48px** | **2-3x** |
| 3xl | 36-56px | 2.25-3.5x |

## What changed
- `apps/web/app/globals.css`: Updated `--fluid-2xl` clamp value and comment

## What did NOT change
- Hero heading (`text-fluid-3xl`) — untouched per constraint
- No component files changed — all H2s inherit via the CSS custom property
- H2s already use `font-heading` (Space Grotesk) and `font-semibold` — correct for hierarchy

## Risk
Low. Single token change. All 7 section H2s inherit automatically. Build passes.
