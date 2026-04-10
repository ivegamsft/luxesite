# Trinity Wave 2 — Light Theme Navbar, Hero Redesign, FloatingCTA Removal

**Author:** Trinity  
**Date:** 2026-04-10  
**Status:** Implemented  

## Issue #30 — Navbar Light Theme

**Decision:** Replace dark glass navbar with light frosted-glass design using explicit light-theme color tokens.

**Implementation:**
- `glass` → `bg-white/90 backdrop-blur-sm border-b border-[#e8e4df]`
- Nav links: `uppercase tracking-wider text-xs font-medium text-[#2c2620]`
- Active: gold text + underline (`text-[#c9a76a]`), hover: `hover:text-[#c9a76a]`
- CTA: "Request Consultation" with `bg-[#c9a76a] text-white`
- Mobile menu: solid `bg-white`, dark text, same gold accents

**Rationale:** Light theme requires explicit color swaps — the `glass` utility was dark-themed. White/90 with backdrop-blur maintains the frosted-glass feel on scroll.

## Issue #32 — Hero Light Redesign

**Decision:** Replace dark hero overlay with light approach; new copy; add concierge discovery row.

**Implementation:**
- Removed dark vignette + image opacity dimming
- Added `bg-white/15` full-screen overlay for subtle readability
- Dark text (`text-[#2c2620]`) throughout
- New headline/subhead emphasizing bespoke service
- Concierge discovery: inline `[Where? ▾] [When? ▾] [Discuss →]` row, md+ only
- CTAs: "Request Consultation" (gold fill) + "Explore Destinations" (dark outline)

**Rationale:** Dark vignettes are wrong for a light theme. The white overlay preserves photo vibrancy while giving dark text enough contrast. The concierge row provides progressive disclosure — a quick entry point for users who know where/when they want to go.

## Issue #41 — FloatingCTA Removal

**Decision:** Remove the floating mobile CTA button entirely.

**Implementation:** Deleted `FloatingCTA.tsx`, removed from `page.tsx`.

**Rationale:** With the navbar CTA now labeled "Request Consultation" and always visible (sticky), the floating button was redundant and cluttered the mobile viewport. The navbar CTA serves the same scroll-to-contact function.
