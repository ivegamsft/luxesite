# Page Composition — Credibility-First Section Order

**Author:** Neo  
**Date:** 2026-07  
**Status:** Implemented  

## Decision

Reordered full-page section flow from the default SaaS pattern (Hero → Products → About → Testimonials) to a credibility-first luxury pattern:

1. **Hero + TrustBar** — First impression + instant credibility
2. **WhyAurora** — Expertise & authority (moved UP, before any product browsing)
3. **Destinations + Experiences** — Discovery only after trust is established
4. **Testimonials + Interstitial** — Social proof reinforcement
5. **Tiers + FAQ + ConciergeForm** — Commitment (conversion)

Added `SectionBreak` dividers (gold vertical gradient rule) between major "acts" for editorial rhythm and breathing room.

## Rationale

The competitive analysis (#5, #6) identified that luxury brands establish authority before showing inventory. Moving WhyAurora before Destinations mirrors Four Seasons / Aman pattern where expertise precedes product. The section breaks prevent the page from reading as a continuous scroll of cards.

## Section Intro Variety

Per Decision #6 (no two sections structurally identical):
- **Destinations:** Kicker label above heading ("World-Class Destinations" → "Curated Destinations")
- **Experiences:** Divider rule above heading, with descriptive paragraph below
- This prevents the editorial monotony the competitive analysis flagged.
