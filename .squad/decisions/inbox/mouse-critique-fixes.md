# Critique Fixes — Visual Rhythm & Passive Scroll

**Author:** Mouse  
**Date:** 2026-04-10  
**Status:** Implemented  

## Issue #20 — Testimonials Background Alternation

**Decision:** Testimonials section uses `bg-aurora-darker` to break visual monotony.

**Implementation:** Added `bg-aurora-darker` class to the `<section>` element in `Testimonials.tsx`.

**Rationale:** Tiers → Testimonials → ConciergeForm all shared the default aurora-dark background. Three consecutive same-background sections kill visual rhythm and make the lower page feel like a single continuous scroll. Alternating dark/darker/dark creates clear section boundaries without borders or dividers.

**Impact:** Lower page now has clear visual rhythm. Each section reads as a distinct content block.

---

## Issue #22 — Passive Scroll Listener on FloatingCTA

**Decision:** All scroll event listeners must use `{ passive: true }` when they don't call `preventDefault()`.

**Implementation:** Added `{ passive: true }` as third argument to `window.addEventListener('scroll', handleScroll)` in `FloatingCTA.tsx`.

**Rationale:** Hero.tsx already uses passive listeners correctly. FloatingCTA was an inconsistency. Passive listeners allow the browser to optimize scroll performance by guaranteeing no `preventDefault()` call will occur. This is a free performance win.

**Impact:** Consistent scroll listener pattern across all components. No performance penalty from non-passive scroll handling.
