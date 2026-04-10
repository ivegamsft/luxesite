# UI Issues Found — Playwright Screenshot Audit

**Author:** Tank (Tester)
**Date:** 2026-04-10
**Severity:** P0–P1
**Evidence:** `apps/web/e2e/screenshots/`

---

## P0 — Sections invisible in full-page render

**Screenshot:** `full-page.png`

The full-page screenshot shows the Hero section rendering correctly, then the entire rest of the page is a dark void — Destinations, Experiences, Tiers, Testimonials, ConciergeForm, and Footer all appear as blank dark areas. However, individual section screenshots (taken after `scrollIntoViewIfNeeded`) DO show the content.

**Root cause (likely):** Framer Motion `AnimatedSection` / `StaggerChildren` wrappers start elements at `opacity: 0` with a Y-offset, and only animate in on scroll/viewport intersection. In a full-page screenshot capture (no actual scroll events fired), all below-the-fold content stays invisible.

**Impact:** Any user with JS issues, slow connections, or screen readers relying on initial paint sees a blank page below the hero. Also breaks SEO — crawlers may see empty sections.

**Recommendation:** Add a CSS fallback or `prefers-reduced-motion` media query so content is visible by default and animated only as enhancement. e.g., `@media (prefers-reduced-motion: reduce) { .animated-section { opacity: 1; transform: none; } }`

---

## P1 — Section headings clipped by sticky navbar

**Screenshots:** `section-destinations.png`, `section-experiences.png`, `section-tiers.png`, `section-testimonials.png`, `section-concierge-form.png`

When scrolling to sections, the sticky navbar overlaps section headings. Visible in:
- **Destinations** — "Curated Destinations" h2 is partially behind the nav bar
- **Experiences** — "Signature Experiences" h2 collides with nav
- **Tiers** — "Membership" h2 hidden behind nav; "Most Popular" badge overlaps nav
- **Testimonials** — "What Our Members Say" h2 completely hidden; cards start right at nav
- **Concierge Form** — "Design Your Journey" h2 completely missing; form starts at Name field

**Root cause:** Sections lack `scroll-margin-top` or `scroll-padding-top` to account for the sticky navbar height (~64px). When anchor links jump to `#destinations`, `#testimonials`, etc., the top of the section sits under the nav.

**Recommendation:** Add `scroll-margin-top: 5rem` (or navbar height) to each section, or set `html { scroll-padding-top: 5rem; }` globally.

---

## P1 — Footer missing brand text

**Screenshot:** `section-footer.png`

The "AURORA LUXE" brand/logo text is not visible in the footer screenshot. Only the nav links, horizontal rule, copyright, and Unsplash credit appear. The brand text may be hidden or rendering outside the visible area.

---

## Summary for team

The site content all *exists* in the DOM (tests pass — elements are findable and assertable), but the **visual presentation is broken** in two key ways:
1. Scroll-triggered Framer Motion animations make all below-fold content invisible on initial/static render
2. Sticky navbar clips section headings on scroll navigation

These are **Trinity** (implementation) fixes. Recommend addressing P0 first since it makes the site appear empty below the hero.
