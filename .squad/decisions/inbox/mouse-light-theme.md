# Decision: Light Color Theme Migration

**Author:** Mouse
**Date:** 2026-04-10
**Issues:** #25 (P0), #26 (P1)
**Status:** Implemented

## Summary

Migrated the entire visual system from dark OKLCH to light hex. Removed all glow shadows and SaaS visual patterns. Site is now fully light-themed with warm neutral backgrounds, champagne gold accents, and dark text.

## Color Token Changes

| Old Token | New Token | Old Value | New Value |
|-----------|-----------|-----------|-----------|
| aurora-dark | aurora-bg | oklch(0.15 0.015 50) | #f5f3f0 |
| aurora-darker | aurora-bg-dark | oklch(0.11 0.01 50) | #f0ebe5 |
| — | aurora-bg-light | — | #faf9f7 |
| aurora-white | aurora-text | oklch(0.95 0.012 85) | #2c2620 |
| — | aurora-text-muted | — | #6b6458 |
| aurora-cyan | aurora-gold | oklch(0.82 0.105 85) | #c9a76a |
| aurora-purple | aurora-navy | oklch(0.42 0.13 20) | #1a3a52 |
| aurora-magenta | aurora-sage | oklch(0.70 0.09 30) | #7a8f7f |
| aurora-glass | aurora-bg-light | oklch(0.95 0.01 85 / 0.04) | #faf9f7 |
| aurora-glass-border | aurora-border | oklch(0.95 0.01 85 / 0.07) | #e8e4df |
| aurora-error | aurora-error | oklch(0.65 0.20 25) | #a85a4a |
| — | aurora-success | — | #5a8f4a |

## Shadow Token Changes

| Old Token | New Token | Purpose |
|-----------|-----------|---------|
| glow | REMOVED | Was neon-style glow — SaaS pattern |
| glow-purple | REMOVED | Was colored glow — SaaS pattern |
| — | lift | Primary hover elevation |
| — | subtle | Light card elevation |
| — | medium | Hover/active elevation |
| glass | glass (updated) | Reduced opacity for light theme |

## Key Decisions

1. **Photo overlays use neutral black, not theme colors.** Hero and DestinationGrid scrims use `from-black/XX` instead of `from-aurora-bg/XX`. Photography requires dark scrims regardless of page theme.

2. **Hero text stays white.** On dark photographic backgrounds, text must be light. Only page-chrome components follow the light text/dark background inversion.

3. **CTA buttons use solid gold, not gradient.** `bg-aurora-gold text-aurora-text` replaces `bg-gradient-aurora text-aurora-white`. Dark text on #c9a76a passes WCAG AA at ~5.5:1.

4. **Glass utility simplified.** Removed all backdrop-blur and transparency. Now a solid surface (#faf9f7) with subtle border (#e8e4df). Glassmorphism doesn't read well on light backgrounds.

5. **Animated border preserved.** Conic gradient updated to gold/navy/sage palette. Still serves as featured tier distinction without animation.

## Files Changed

- `tailwind.config.ts` — all color/shadow/gradient tokens
- `globals.css` — CSS variables, glass, animated-border, selection, color-scheme
- `layout.tsx` — body classes
- `Navbar.tsx`, `Hero.tsx`, `DestinationGrid.tsx`, `ExperienceList.tsx`, `Tiers.tsx`, `Testimonials.tsx`, `ConciergeForm.tsx`, `Footer.tsx`, `FloatingCTA.tsx` — all color class references

## Build Status

✅ `next build` passes with zero errors.
