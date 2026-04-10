# Project Context

- **Owner:** ivegamsft
- **Project:** Aurora Luxe Travel — a futuristic luxury travel website. Single-page (plus optional destination detail route) for a fictional ultra-premium concierge travel brand.
- **Stack:** Next.js (latest stable), TypeScript, Tailwind CSS, Framer Motion, next/image
- **Created:** 2026-04-10

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->

### Visual Redesign — "Gilded Bordeaux" (2026-04-10)

**Palette:** Replaced the AI-default cyan/purple/magenta-on-dark with an OKLCH warm luxury palette:
- Primary accent: champagne gold `oklch(0.82 0.105 85)` — mapped to `aurora-cyan` token
- Secondary: deep bordeaux wine `oklch(0.42 0.13 20)` — mapped to `aurora-purple`
- Tertiary: dusty rose `oklch(0.70 0.09 30)` — mapped to `aurora-magenta`
- Gold highlight: burnished antique `oklch(0.80 0.12 75)` — mapped to `aurora-gold`
- Dark backgrounds: wine-tinted near-black, not pure neutral
- Text: warm ivory `oklch(0.95 0.012 85)`, not cold white

**All color token NAMES preserved** (aurora-cyan, aurora-purple, etc.) so component classes didn't break. Only VALUES changed.

**Glassmorphism:** Reduced from heavy 16px blur + transparent bg to subtle 6px blur + 70% opaque warm surface. The `.glass` class now reads as a tinted solid surface. `animated-border` retains stronger glass (12px blur, 60% opacity) for the featured tier.

**Fonts:** Uses Bodoni Moda (heading serif — editorial luxury) + Libre Franklin (body sans — clean readability). These are the actual current fonts in layout.tsx (NOT Playfair Display + Source Sans 3). Variables: `--font-bodoni-moda`, `--font-libre-franklin`.

**Fluid Typography:** Major Third (1.25) scale with `clamp()` — 8 steps from `--fluid-sm` to `--fluid-5xl`. Available as CSS custom properties and Tailwind `text-fluid-*` utilities.

**Section Spacing:** 5 rhythm tokens (`--space-hero` through `--space-section-xs`) using `clamp()`. Available as Tailwind `section-hero`, `section-lg`, etc. Trinity needs to apply these to component section padding.

**Key files:**
- `apps/web/app/globals.css` — OKLCH vars, glass, animated-border, fluid type, spacing tokens
- `apps/web/tailwind.config.ts` — all color/gradient/shadow/font/fontSize/spacing tokens
- `apps/web/app/layout.tsx` — Playfair Display + Source Sans 3 imports

### Impeccable Design Critique (2026-04-10)

**Fonts are now correct:** History entry above (Visual Redesign) has been corrected. Code actually imports **Bodoni Moda** (heading) + **Libre Franklin** (body). These are NOT on the banned list — good.

**Overall Score:** 48/80 — Borderline AI-slop. Site reads as "ambitious startup" rather than "quiet luxury." 

**Key issues identified:**
- `rounded-2xl` used on nearly every surface (cards, buttons, form, badges) — biggest AI-tell, needs hierarchy (sharp/small/full)
- 8-step fluid type scale should be trimmed to ~5 steps for consistency
- Hero subtext and several section intros are cliché-ridden (pure AI-generated copy)
- No `@container` queries anywhere (impeccable guidelines require them)
- Testimonial navigation dots are 12px — fail 44px WCAG touch target by 3.7x
- Toast component uses raw rgba/hex instead of OKLCH tokens
- Mobile menu has zero animation (conditional render, not AnimatePresence) — jarring for motion-rich site
- Framer Motion animations don't check prefers-reduced-motion (CSS only covers CSS animations)
- Emoji icons in ExperienceList destroy credibility instantly
- "Most Popular" badge on pricing tier uses SaaS copywriting; undermines exclusivity
- Aurora blob is most overused AI hero element; should be removed

**What works exceptionally well:**
- OKLCH palette is warm, intentional, and considered — no pure black/white
- Bodoni Moda + Libre Franklin is a strong editorial heading/body pairing
- Custom ease-out-quint `[0.22, 1, 0.36, 1]` used consistently in scroll reveals
- `animated-border` properly reserved for featured tier only — restraint shows craft
- Testimonials component has best layout — asymmetric grid, editorial feel
- Experience list alternating layout direction (left/right) adds visual variety

**Full severity breakdown:** 22 findings total (P0: 4, P1: 5, P2: 5, P3: 3). See decisions.md for complete audit.

**Key file notes for future fixes:**
- ConciergeForm.tsx: Toaster styles use rgba/hex (need OKLCH); error uses `text-red-400` (not branded)
- Testimonials.tsx: nav dots 12px (need 44px touch target)
- Navbar.tsx: mobile menu uses conditional render (needs AnimatePresence)
- All Framer Motion animations: need `useReducedMotion()` hook
- Global need for `@container` queries on card components

## Session Activity

### Impeccable Audit Fixes (2026-04-10T03:42:00Z)

**Session:** ivegamsft requested full audit fix  
**Status:** ✅ COMPLETE  
**Orchestration Log:** `.squad/orchestration-log/2026-04-10T03-42-00Z-mouse.md`

Redesigned visual system successfully implemented. Gilded Bordeaux OKLCH palette, new typography, fluid scales, and section spacing tokens established as foundation for all downstream components. Build passes; all metrics clean.
