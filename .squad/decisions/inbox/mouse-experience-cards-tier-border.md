# Experience Cards + Featured Tier Border Refinement

**Author:** Mouse  
**Date:** 2026-04-10  
**Issues:** #110, #108, #103

## Decisions

### 1. Experience Cards — Image-Forward Overlay Layout
Rest cards are now full-bleed image cards with text overlaid via layered scrims. No more split image/text-body layout. Cards are taller (h-56/sm:h-64 vs h-36) so each experience feels aspirational. Region tags use glass-style on the image rather than opaque pills below.

### 2. Featured Tier — Solid Gold Border (No Conic Gradient)
The `gradient-border` class now uses a simple 1.5px solid gold border (`oklch(0.80 0.12 75)`) with a subtle gold glow shadow. The conic-gradient `::before` pseudo-element has been fully removed. Conic gradients — even static ones — read as AI-aesthetic. A solid gold line is how luxury brands actually differentiate premium tiers.

### 3. ExperienceList Eyebrow Removed
The "Curated by Our Specialists" eyebrow was removed. The heading "Signature Experiences" is sufficient. Follows the section intro variety principle — not every section needs eyebrow + heading + subtitle.
