# Decisions

**Project:** luxesite  
**Last Updated:** 2026-04-12T09:30:00Z

## Active Decisions

### Animations Must Never Gate Content Visibility (2026-04-10)

**Author:** Trinity  
**Status:** Implemented  
**Commit:** (see Playwright E2E session)

#### Context

All sections below Hero were invisible on initial render, SSR, full-page screenshots, and for users with JS disabled. Root cause: Framer Motion's `initial={{ opacity: 0 }}` on `AnimatedSection` and card variants, which relied on `whileInView` (IntersectionObserver) to reveal content. Since the observer only fires on scroll, content stayed invisible in any non-interactive context.

#### Decision

**Scroll animations must be progressive enhancement — never a visibility gate.**

- The `hidden` (initial) state of any animation variant must keep `opacity: 1`. Content is always visible.
- Motion effects should be limited to positional transforms (`y`, `scale`) that don't hide content.
- Pattern: `hidden: { opacity: 1, y: 20 }` → `visible: { opacity: 1, y: 0 }` gives a nice slide-up without ever making content invisible.
- `prefers-reduced-motion` is respected automatically by Framer Motion.

#### Applies To

- `AnimatedSection` component (`initial` prop)
- All `cardVariants` objects in `DestinationGrid`, `ExperienceList`, `Tiers`, `Testimonials`
- `StaggerChildren` and any future scroll-triggered animation wrapper
- Any new component using `whileInView`

#### Rationale

- SSR must render visible content for SEO crawlers
- Full-page screenshots (Playwright, Lighthouse) must capture all sections
- Users on slow connections or with JS disabled must see content
- Accessibility: content hidden behind JS-only triggers fails WCAG

---

### UI Fixes — Critical Responsive & Accessibility Issues (2026-04-10)

**Author:** Trinity  
**Status:** Implemented  
**Verification:** Build clean, 24/24 Jest pass, 9/9 Playwright pass

#### Issues and Fixes

**1. Broken `sm` Breakpoint Override (Critical)**
- **File:** `tailwind.config.ts`
- **Problem:** `extend.screens` had `sm: '375px'`, overriding Tailwind's default 640px. Every `sm:` class across all components (Hero CTA, Navbar, text sizing) triggered at phone width, breaking responsive layouts site-wide.
- **Fix:** Removed `sm` from custom screens. Also removed redundant `md: 768px` and `lg: 1024px`.

**2. Selection Styling Invisible**
- **File:** `globals.css`
- **Problem:** `::selection` used `background: linear-gradient(...)` with `background-clip: text`. CSS gradients unsupported in `::selection`; `background-clip: text` made highlight invisible.
- **Fix:** Replaced with solid `background: #00e5ff` (aurora-cyan).

**3. Sections Hidden Behind Sticky Navbar**
- **File:** `globals.css`
- **Problem:** Sticky navbar (80px) had no scroll offset. Section headers clipped when scrolling to anchors.
- **Fix:** Added `scroll-padding-top: 5rem` on `html` and `scroll-margin-top: 5rem` on `section[id]`.

**4. Light Form Controls on Dark Background**
- **File:** `globals.css`
- **Problem:** Missing `color-scheme: dark` caused browser-native form controls to render with light OS defaults.
- **Fix:** Added `color-scheme: dark` to `html`.

**5. Featured Tier Card Overflow**
- **File:** `Tiers.tsx`
- **Problem:** Featured tier had `scale-105 md:scale-110` as resting state, causing overflow and overlap of adjacent cards.
- **Fix:** Reduced to `scale-[1.02] md:scale-105` and added `z-10` for proper stacking.

---

### Audit Code Fixes — Structural & Accessibility (2026-04-10)

**Author:** Trinity  
**Status:** Implemented  
**Context:** Decisions from Impeccable design audit, now formalized

#### Decisions

1. **Gradient text banned on headings.** Replaced `bg-gradient-aurora bg-clip-text text-transparent` with `text-aurora-white` on all heading/logo text. Gradients still OK for decorative elements (badges, dividers, buttons).

2. **Hero scroll handler uses refs + rAF.** Parallax transforms applied via DOM ref, throttled with `requestAnimationFrame`. Zero React re-renders on scroll.

3. **DestinationGrid cards are now interactive.** Cards accept click/tap (mobile toggle), keyboard Enter/Space, and expose `role="button"` + `aria-expanded`. Quick Facts overlay also responds to `focus-within`.

4. **Form errors are screen-reader accessible.** Added `aria-live="polite"` region, `aria-describedby` per input, unique error `id`s.

5. **Body text capped at 65ch.** Testimonial quotes and experience descriptions now have `max-w-[65ch]` for comfortable reading width.

6. **`::selection` uses OKLCH values.** Aligned with Mouse's OKLCH palette migration.

---

### Monorepo Restructure — apps/web/ (2026-04-10)

**Author:** Morpheus  
**Status:** Implemented  
**Commit:** 03072d0  

#### Context

User wants the Next.js web app to be self-contained so a backend/API app in another language can be added later. Also simplifies workflow isolation (CI/CD can target `apps/web/` specifically).

#### Decision

Move the entire Next.js application into `apps/web/` with its own `package.json`, `node_modules`, and all config files. Root stays project-level only (README, spec/, .squad/, .github/).

**No npm workspaces at root** — the web app is fully self-contained. Workspaces can be added later if shared tooling is needed.

#### Structure

```
luxesite/
├── apps/
│   └── web/          ← All Next.js code, configs, and dependencies
├── spec/             ← Project-wide specifications
├── .squad/           ← Team configuration
├── .github/          ← CI/CD workflows
├── .gitignore        ← Updated for nested paths
└── README.md         ← Project-level overview
```

#### Verification

- ✅ Build passes (`npm run build` in `apps/web/`)
- ✅ All 24 tests pass (`npm test` in `apps/web/`)
- ✅ Git history preserved via `git mv`
- ✅ `.gitignore` updated with recursive patterns (no leading `/`)

#### Future Considerations

- When adding `apps/api/` or `apps/backend/`, each app gets its own language tooling
- CI workflows can use `paths:` filters scoped to `apps/web/**`
- If shared JS/TS packages are needed later, introduce npm workspaces + a root `package.json`

---

### User Directive: Monorepo Foundation (2026-04-10)

**Captured By:** Copilot (ivegamsft)  
**Timestamp:** 2026-04-10T03:04:00Z  

App code must be self-contained in its own directory. The repo will be a monorepo — a backend or API app in another language may be added later. Isolation also helps with CI/CD workflow targeting.

**Rationale:** User request — captured for team memory

---

### Design Critique: Aurora Luxe Travel — Impeccable Evaluation (2026-04-10)

**Author:** Mouse  
**Agent:** Impeccable  
**Timestamp:** 2026-04-10T04:00:00Z  
**Status:** Findings integrated

#### Overall Assessment

**Score: 48/80** — Borderline AI-slop. Aurora Luxe reads as "ambitious startup" rather than "quiet luxury" (Aman-tier). The site successfully communicates aspiration but lacks the human curation and restraint of premium luxury.

**Emotional Resonance:** Mixed
- Aspiration: Partial (clichés undercut intent)
- Trust: Weak (no real social proof beyond fabricated testimonials)
- Desire: Undercut by UI treatment despite strong photography
- Exclusivity: Actively undermined by "Most Popular" badge and SaaS-style pricing table

#### Dimensional Scores

| Dimension | Score | Status |
|---|---|---|
| Typography | 6.5 | 8-step fluid scale too deep; centered headings on 2 consecutive sections |
| Color & Palette | 7.5 | OKLCH system intentional; Toast component breaks it; error color not branded |
| Layout & Space | 6.0 | Formulaic section intros; zero `@container` queries; uniform patterns |
| Visual Details | 5.5 | Emoji icons destroy credibility; gradient pills SaaS-like; `rounded-2xl` everywhere |
| Motion & Animation | 6.5 | `animate-float` restless; mobile menu instant; Framer Motion ignores prefers-reduced-motion |
| Interaction Design | 6.5 | Testimonial dots 12px (fail 44px touch target); uniform hover lift mechanical |
| Responsive Design | 5.0 | No `@container` queries; 2xl breakpoint unused |
| UX Writing & Copy | 4.5 | Hero subtext cliché; "Most Popular" badge SaaS; section subtitles formulaic |

#### Critical Findings (P0) — 4 items

1. **Emoji icons in ExperienceList** — Destroys premium credibility instantly. Replace with custom SVG icons or photographic elements. *(Visual Details)*

2. **Testimonial nav dots 12px** — `w-3 h-3` fails 44px WCAG touch target by 3.7x. Inaccessible on mobile. *(Interaction Design)*

3. **"Most Popular" badge on pricing tier** — No luxury brand uses this SaaS copywriting. Replace with "Recommended" or remove entirely. *(UX Writing)*

4. **Hero subtext cliché** — "Experience the pinnacle of luxury travel... every journey is curated to perfection for the world's most discerning travelers." Rewrite completely. *(UX Writing)*

#### High Priority (P1) — 5 items

5. **`rounded-2xl` uniformity** — Used on destination cards, experience cards, tier cards, form container, buttons, inputs, interest pills, price badges, floating CTA. Introduce hierarchy: sharp corners for editorial authority, small radius on inputs, rounded-full only for pills. *(Visual Details)*

6. **No `@container` queries** — Impeccable guidelines explicitly require container queries. Zero usage across site. Cards should adapt based on container width. *(Responsive)*

7. **Mobile menu has no animation** — Conditional render instead of AnimatePresence. Menu appears/disappears instantly. For a motion-rich site, this is jarring. *(Motion)*

8. **Framer Motion ignores prefers-reduced-motion** — CSS media query covers CSS animations only. Framer Motion entrance, parallax, testimonial carousel all ignore the preference. Need `useReducedMotion()` hook. *(Motion / Accessibility)*

9. **8-step fluid type scale** — Guidelines specify ~5 steps with 1.25+ ratio. Current 8 steps (sm through 5xl) creates inconsistent usage. Trim to: base, lg, xl, 2xl, 3xl. *(Typography)*

#### Medium Priority (P2) — 5 items

10. **Toast component uses rgba/hex** — ConciergeForm Toaster uses `rgba(255,255,255,0.1)` and `#f0f0f5`, breaking OKLCH-only color system. *(Color)*

11. **Section intros are formulaic** — Every section: `<h2>` → `<p class="text-aurora-white/60 mb-12 max-w-2xl">`. Same opacity, max-width, margin. Vary treatment. *(Layout)*

12. **Centered headings on Membership and ConciergeForm** — Guidelines prefer left-aligned for editorial feel. Two consecutive centered sections feel template-like. *(Typography / Layout)*

13. **Error messages use Tailwind's `text-red-400`** — Not part of OKLCH brand system. Create branded error color in OKLCH. *(Color)*

14. **Hero aurora blob** — Most overused AI hero element. Remove entirely and let photography + noise texture carry atmosphere. *(Visual Details)*

15. **Gradient pill price badges** — `bg-gradient-aurora rounded-full` badges look like SaaS UI. For luxury, use understated text treatment (price in heading font at reduced opacity). *(Visual Details)*

#### Low Priority (P3) — 3 items

16. **`animate-float` on scroll indicator** — Infinite looping bounce feels restless on luxury site. Single downward nudge more appropriate. *(Motion)*

17. **Hover lift on every card** — `hover:-translate-y-1` on destination, experience, and non-featured tier cards. Uniform hover behavior feels mechanical. *(Interaction Design)*

18. **No 2xl breakpoint usage** — Defined in config (`2xl: 2560px`) but never used. Either use it or remove. *(Responsive)*

19. **History.md references wrong fonts** — Stated "Playfair Display + Source Sans 3" but code uses **Bodoni Moda + Libre Franklin**. *(Maintenance)*

20. **Aurora blob `animate-aurora-pulse` loops forever** — Continuous scale(1.05) + opacity oscillation on background adds noise. Should be single entrance or static. *(Motion)*

21. **Token naming mismatch** — `aurora-cyan` maps to champagne gold, `aurora-purple` maps to bordeaux. Semantically confusing for future contributors. *(Maintenance)*

22. **`focus:outline-none` on nav links without ring** — Navbar links use `focus:text-aurora-cyan focus:underline` but no visible focus ring. May be insufficient for keyboard users. *(Accessibility)*

#### What Works Well

- **OKLCH palette is warm and intentional** — No pure black/white; champagne gold + bordeaux + dusty rose feels considered
- **Bodoni Moda + Libre Franklin** — Strong heading/body pairing with editorial credibility
- **Custom ease-out-quint** — `[0.22, 1, 0.36, 1]` used consistently in scroll reveals
- **`animated-border` restraint** — Properly reserved for featured tier only; strong visual emphasis
- **Testimonials layout** — Asymmetric grid, editorial feel, editorial rhythm
- **Experience list alternation** — Alternating layout direction (left/right) adds variety

#### Team Action Items

- **Trinity (Frontend):** Wire up `useReducedMotion()` from Framer Motion, add AnimatePresence to mobile menu, implement `@container` queries on card components, fix Toast and error colors, trim type scale to 5 steps
- **Mouse (Design):** Create corner-radius system (sharp/small/full hierarchy), design custom SVG icons for experiences, redesign price badges, fix token naming semantics
- **Copywriter/Team:** Full rewrite of hero subtext, section subtitles, tier taglines, "Most Popular" → "Recommended" or remove

#### Intake Plan

22 SQL todos created by Coordinator for team backlog allocation. P0 and P1 items ready for immediate sprint intake.

---

### Trinity: P2+P3 Polish Fixes (2026-04-10)

**Author:** Trinity  
**Date:** 2026-04-10  
**Status:** Implemented  
**Commit:** 1ea6ccb

#### Changes

1. **Removed `animate-aurora-pulse`** from Hero gradient overlay — static gradient, no infinite pulse.
2. **Replaced `animate-float` with `animate-scroll-hint`** on scroll indicator — one-shot nudge after 2s delay instead of infinite bounce.
3. **Differentiated hover behavior** across card types:
   - DestinationGrid: kept `hover:-translate-y-1` (lift to reveal)
   - ExperienceList: `hover:brightness-110 hover:border-aurora-cyan/30` (subtle glow)
   - Tiers non-featured: `hover:border-aurora-cyan/40` (border highlight, no lift)
4. **Added visible focus ring** to desktop nav links: `focus:ring-2 focus:ring-aurora-cyan/50 focus:ring-offset-2`.
5. **Removed unused `2xl: 2560px` breakpoint** from tailwind.config.ts.
6. **Replaced `hover:scale-105`** on FloatingCTA with `hover:-translate-y-0.5` (scale was banned).

#### Rationale

Luxury sites should feel confident and still, not restless. Infinite animations on decorative elements (gradient overlays, scroll indicators) add visual noise without value. Varied hover responses give each card type its own personality instead of a uniform mechanical lift.

**Build verified:** `next build` passes cleanly.

---

### Critique Fixes — Visual Rhythm & Passive Scroll (2026-04-10)

**Author:** Mouse  
**Date:** 2026-04-10  
**Status:** Implemented  
**Issues:** #20, #22  

#### Issue #20 — Testimonials Background Alternation

**Decision:** Testimonials section uses `bg-aurora-darker` to break visual monotony.

**Implementation:** Added `bg-aurora-darker` class to the `<section>` element in `Testimonials.tsx`.

**Rationale:** Tiers → Testimonials → ConciergeForm all shared the default aurora-dark background. Three consecutive same-background sections kill visual rhythm and make the lower page feel like a single continuous scroll. Alternating dark/darker/dark creates clear section boundaries without borders or dividers.

**Impact:** Lower page now has clear visual rhythm. Each section reads as a distinct content block.

#### Issue #22 — Passive Scroll Listener on FloatingCTA

**Decision:** All scroll event listeners must use `{ passive: true }` when they don't call `preventDefault()`.

**Implementation:** Added `{ passive: true }` as third argument to `window.addEventListener('scroll', handleScroll)` in `FloatingCTA.tsx`.

---

### User Directive — Teaching Site Framing (2026-04-11)

**Author:** Ivan (via Copilot)  
**Date:** 2026-04-11T15-23-47  
**Status:** Approved  

#### Context

Aurora Luxe is a teaching/demo site. Code must be simple and readable. Site content is fictitious (fake brand, fake data). However, architecture must be production-grade — real CI/CD, real RBAC, real observability, real testing. Teaching mechanics of real production systems using a fake site. Not vibe-coded. Not over-engineered. Right-sized production patterns learners can follow.

#### Decision

All code must balance simplicity with production authenticity:
- **Code:** Simple, readable, well-commented for learners
- **Content:** Fictitious brand, fictitious data, clearly fake
- **Architecture:** Production-grade patterns (CI/CD, RBAC, observability, testing)
- **Processes:** Real PR workflow, real branch protection, real code review
- **Complexity:** Teach production mechanics without over-engineering

#### Implications

This foundational framing decision shapes every spec and implementation choice. It means we never sacrifice quality for novelty, and never add complexity for its own sake. The code is the curriculum.

---

### User Directive — Teaching Site Framing (Expanded) (2026-04-11)

**Author:** Ivan (via Copilot)  
**Date:** 2026-04-11T15-24-17  
**Status:** Approved  
**Relates To:** User Directive — Teaching Site Framing

#### Addendum

Aurora Luxe is a teaching/demo site where code is simple and readable, content is fictitious, but architecture is production-grade. Teaching the mechanics of real production systems using a fake site.

---

### Brand Pivot Specification (2026-04-11)

**Author:** Morpheus  
**Date:** 2026-04-11  
**Status:** Proposed  
**Issue:** #181  

#### Context

Specification for pivoting Aurora Luxe from luxury travel concierge to luxury experiential events brand. Full spec at `spec/brand-pivot.md` (~680 lines).

#### Key Decisions

1. **Additive migration, not big-bang rewrite.** New types (`ExperiencePackage`, `CategoryMeta`) created alongside existing types. Old types removed only in Phase 2 after new data is in place.

2. **Four-phase rollout.** Copy/IA → Data model → Consultation flow → New components. Each phase merges independently. No cross-phase blocking dependencies.

3. **Visual identity frozen.** Colors, typography, design principles, and `.impeccable.md` aesthetic direction unchanged. Only content references to "travel" updated.

4. **Two new components replace two old ones.** `ExperiencePortfolio` replaces `DestinationGrid`. `FeaturedPackages` replaces `ExperienceList`. Old components retained in codebase but removed from `page.tsx`.

5. **ConciergeForm expanded, not replaced.** New fields (experience type, audience, scale, safety) added via progressive disclosure. Existing tier pre-fill CustomEvent pattern preserved.

6. **Six-category taxonomy.** Voyages, Celebrations, Adventures, Productions, Junior, Bespoke. Travel becomes one category among many.

#### Impact

- Touches ~25 files across 4 phases
- No infrastructure changes
- No new dependencies
- Test suite updated per phase

#### Teaching Value

Demonstrates spec-first brand pivot, additive schema migration, phased rollout, and progressive form disclosure — all production patterns learners need to see.

**Rationale:** Hero.tsx already uses passive listeners correctly. FloatingCTA was an inconsistency. Passive listeners allow the browser to optimize scroll performance by guaranteeing no `preventDefault()` call will occur. This is a free performance win.

**Impact:** Consistent scroll listener pattern across all components. No performance penalty from non-passive scroll handling.

---

### Critique Fixes — Accessibility & Form Polish (2026-04-10)

**Author:** Trinity  
**Date:** 2026-04-10  
**Status:** Implemented  
**Issues:** #17, #18, #19, #21, #23  

#### Issue #17 — Duplicate h1 Tags (P0)

**Problem:** Navbar and Hero both had `<h1>` tags, violating WCAG heading hierarchy and confusing SEO.

**Solution:** Navbar `<h1>` changed to `<span>` with identical className. Single semantic `<h1>` now only in Hero.

**Impact:** Single clear heading hierarchy per page; SEO compliance; WCAG pass.

#### Issue #18 — CTA Label Unification (P1)

**Problem:** Primary call-to-action buttons used inconsistent labels across the site: "Request Itinerary", "Send Request", "Design My Trip".

**Solution:** All primary CTAs unified to "Design My Trip":
- Navbar desktop + mobile: "Request Itinerary" → "Design My Trip"
- FloatingCTA button + aria-label: "Request Itinerary" → "Design My Trip"
- ConciergeForm submit: "Send Request" → "Send My Request" (secondary, distinct)

**Impact:** Consistent, recognizable call-to-action across entire user flow.

#### Issue #19 — Post-submission Confirmation (P1)

**Problem:** Form submissions showed `react-hot-toast` notifications, which disappear quickly and don't reassure users.

**Solution:** Replaced `react-hot-toast` with inline confirmation panel showing:
- Personalized thank-you with first name
- "What happens next" (24-hour curator response expectation)
- Privacy assurance
- "Submit another request" reset link

**Implementation:** Removed `react-hot-toast` dependency and `<Toaster>` component. Updated test suite to match new behavior.

**Impact:** Better user reassurance post-submission; clear expectations; improved form completion confidence.

#### Issue #21 — Inline onBlur Validation (P2)

**Problem:** Form validation only occurred on submit, leaving users uncertain about field correctness during input.

**Solution:** Added `validateField()` function with `onBlur` handlers on name and email inputs. Errors clear on `onChange` for immediate user feedback. Submit-time validation retained as safety net.

**Impact:** Earlier error feedback loop; improved form usability; better UX on slow connections.

#### Issue #23 — aria-pressed on Interest Toggles (P3)

**Problem:** Interest toggle buttons in ConciergeForm lacked semantic accessibility markup for screen readers.

**Solution:** Added `aria-pressed={isSelected}` to all interest toggle buttons. Screen reader now announces toggle state correctly.

**Impact:** Full accessibility for screen reader users; toggles semantically correct; added test coverage.

#### Files Modified
- `apps/web/app/components/Navbar.tsx`
- `apps/web/app/components/FloatingCTA.tsx`
- `apps/web/app/components/ConciergeForm.tsx`
- `apps/web/app/components/__tests__/ConciergeForm.test.tsx`

---

### Decision: Section Reduction — Merge GuideGrid into WhyAurora

**Author:** Morpheus  
**Date:** 2026-04-10  
**Status:** Implemented  
**Issue:** #147 (P0)  
**Commit:** 8e69200

#### Context

The page had 11 content sections creating a monolithic scroll wall. WhyAurora (team carousel) and GuideGrid (travel guides) both showcased people, creating redundancy. UHNW luxury brands (Aman, Rolls-Royce) use 3-4 editorial sections with generous breathing room.

#### Decision

1. **WhyAurora** refactored from horizontal carousel → 3-card editorial grid with "Meet all specialists" CTA
2. **GuideGrid** removed from page composition (component file retained for future use)
3. **PressAwards** removed from page composition (component file retained)
4. **Interstitial** added — full-bleed Unsplash image with overlay quote, placed before Tiers for visual breathing room
5. **ScrollNav** updated to remove Guides entry

#### Result

Page reduced from 11 → 8 sections: Hero, TrustBar, Destinations, Experiences, WhyAurora, Testimonials, Interstitial, Tiers, FAQ, ConciergeForm (8 content + structural nav/footer).

#### Trade-offs

- Guide content is no longer immediately visible on the homepage; it can be re-introduced on a dedicated `/guides` route later
- PressAwards likewise available for a press/about page
- All data files and components preserved — no data loss

---

### Decision: Section Heading Variety

**Author:** Mouse  
**Date:** 2026-04-10  
**Status:** Implemented  
**Issue:** #145 (P2)  
**Commit:** 6ddcf0c

#### Context

The gold uppercase eyebrow → large h2 → muted subtitle pattern was mechanically repeated in 6+ sections. This is the #1 AI-template tell — human designers create variety while maintaining hierarchy.

#### Decision

Each section gets a heading treatment matched to its purpose:

| Section Type | Treatment | Example |
|---|---|---|
| **Discovery** (Destinations, Experiences) | Full eyebrow + heading | Gold uppercase label + fluid-2xl h2 |
| **Utility** (FAQ) | Understated label | Left-aligned fluid-xl, medium weight, muted |
| **Pricing** (Tiers) | Inline label + tagline | Flex row, heading left, tagline right — cards lead |
| **Form** (ConciergeForm) | Conversational line | Mixed-weight prose sentence, sr-only h2 |
| **Social proof** (Testimonials) | Editorial quote | No heading — content speaks directly |

#### Rules

1. **Max 2–3 sections** may use the full eyebrow+heading pattern on any page
2. Screen reader heading structure must always exist (use `sr-only` if visually hidden)
3. New sections should consult this table before defaulting to the eyebrow pattern

#### Files Changed

- `apps/web/app/components/FAQ.tsx`
- `apps/web/app/components/Tiers.tsx`
- `apps/web/app/components/ConciergeForm.tsx`

---

**Follow-Up Logs:**  
- Orchestration (Morpheus): `.squad/orchestration-log/2026-04-10T19-55-00Z-morpheus.md`  
- Orchestration (Mouse): `.squad/orchestration-log/2026-04-10T19-55-00Z-mouse.md`  
- Session Log: `.squad/log/2026-04-10T19-55-00Z-p0-architecture-batch.md`

---

### Experience Cards + Featured Tier Border Refinement

**Author:** Mouse  
**Date:** 2026-04-10  
**Status:** Implemented  
**Issues:** #110, #108, #103  
**Commits:** 9317b10

#### Decisions

**1. Experience Cards — Image-Forward Overlay Layout**

Experience cards redesigned from split image/text-body layout to full-bleed image cards with text overlaid via layered scrims. Cards are taller (h-56/sm:h-64 vs h-36) so each experience feels aspirational and premium. Region tags now use glass-style overlay on the image rather than opaque pills below the card.

**2. Featured Tier — Solid Gold Border (No Conic Gradient)**

The `gradient-border` class replaced: `gradient-border` (conic-gradient `::before` pseudo-element) → simple 1.5px solid gold border (`oklch(0.80 0.12 75)`) with subtle gold glow shadow. Conic gradients — even static ones — read as AI-aesthetic. A solid gold line is how actual luxury brands differentiate premium tiers. Cleaner, more refined, more human.

**3. ExperienceList Eyebrow Removed**

The "Curated by Our Specialists" eyebrow was removed from ExperienceList. The heading "Signature Experiences" is sufficient and provides necessary hierarchy. Follows the section heading variety principle (#145) — not every section needs eyebrow + heading + subtitle.

#### Files Changed

- `apps/web/app/components/ExperienceList.tsx`
- `apps/web/app/components/Tiers.tsx`
- `apps/web/app/styles/components.css` (gradient-border class)

---

### Decision: Tier Restructure from Travel to Event Planning (2026-04-11)

**Date:** 2026-04-11  
**Status:** Implemented  
**Decided by:** Ivan (Product Owner)  
**Implemented by:** Trinity (Frontend Developer)

#### Context

Aurora Luxe was originally positioned as a luxury travel membership service with three tiers (Silver, Black, Obsidian) at relatively accessible price points ($25k-$200k/year). The business model needed to pivot to ultra-high-end event planning services with dramatically increased pricing.

#### Decision

Restructured the entire tier system from travel memberships to event planning services:

##### New Tier Structure

1. **One Time** (from $500,000)
   - Single event/experience planning engagement
   - Dedicated event curator, venue scouting across 50+ countries
   - Custom coordination, day-of concierge team, memory book

2. **Yearly** (from $1,200,000/year) — **FEATURED**
   - Annual subscription covering up to 12 events per year
   - Personal family event strategist who knows your family
   - Handles all events: birthdays, holidays, graduations
   - Seasonal surprise boxes, priority rebooking

3. **Gift** (from $250,000)
   - Beautifully packaged gift experience card
   - Recipient chooses from curated event catalog
   - Valid for 18 months

##### Pricing Philosophy

All pricing increased ~10-20x to "absurdly expensive" levels:
- Destinations: $69,000 - $189,000 (previously $6,900 - $18,900)
- Budget ranges: $100k - $1M+ per event (previously $25k - $100k+ per journey)
- Minimum entry point: $250,000 (previously $5,000)

The goal: "So much that you may mortgage your house."

#### Rationale

- Shifts positioning from travel concierge to ultra-premium event planning
- "Yearly" as the money-maker (cradle to pre-teen family event subscription)
- Price points create exclusivity and filter for ultra-high-net-worth clients
- Gift tier provides entry point and gift-giving option

#### Implementation

##### Files Changed

- `apps/web/app/data/tiers.ts` — Tier IDs, names, taglines, prices, perks
- `apps/web/app/data/destinations.ts` — All destination prices multiplied by 10x
- `apps/web/app/components/ConciergeForm.tsx` — Budget ranges and tier mapping
- `apps/web/app/components/FAQ.tsx` — Tier and pricing FAQ answers
- `apps/web/app/components/__tests__/Tiers.test.tsx` — Test expectations
- `apps/web/app/components/__tests__/DestinationGrid.test.tsx` — Price expectations

##### Testing

- All 43 Jest tests pass
- Next.js production build successful
- Dynamic rendering in `Tiers.tsx` handles price splitting correctly

#### Consequences

##### Positive
- Clear service positioning around event planning
- Subscription model (Yearly) creates recurring revenue
- Ultra-premium pricing signals extreme quality
- Gift tier opens up corporate gifting market

##### Negative
- Radically different business model from original travel focus
- May require marketing/copy updates beyond component level
- Pricing may be perceived as satirical or too extreme

#### Notes

- Kept tier IDs as kebab-case: 'one-time', 'yearly', 'gift'
- Made "Yearly" the featured tier (it's the revenue driver)
- Price splitting logic in `Tiers.tsx` still works (splits on `/` for yearly pricing)
- E2E tests likely still pass (they reference button text, not tier names)


---

## Tier Restructure Analysis (2026-04-12, PR #202 → Issues #203–#210)

# Decision: Tier Restructure Is a Model Change, Not a Rename

**Author:** Morpheus
**Date:** 2026-04-12
**Status:** Proposed
**Triggered by:** PR #202 tier restructure analysis

## Decision

The One Time / Yearly / Gift tier restructure (PR #202) is treated as a **business model change**, not a terminology update. All downstream specs, issues, and architecture decisions must account for three fundamentally different transaction types rather than three levels of the same membership.

## Rationale

| Old Model | New Model | Difference |
|-----------|-----------|------------|
| Silver/Black/Obsidian | One Time/Yearly/Gift | Not levels — different transaction types |
| Linear privilege hierarchy | Three distinct access patterns | No escalation path |
| Single enrollment funnel | Per-tier consultation flows | Gift has buyer + recipient |
| Subscription-only | Transactional + Subscription + Gift | Mixed revenue model |

### Implications for specs and architecture:
1. **Gift tier** introduces a two-party identity model (buyer ≠ recipient) — affects security, forms, and APIs
2. **One Time** is event-scoped — access expires after completion
3. **Yearly** needs subscription lifecycle — renewal, lapse, grace period
4. Consultation flow (ConciergeForm) may need per-tier branching
5. API design (#180, #195) must handle three transaction types, not three privilege levels

## Impact

- 8 issues created (#203–#210) covering specs, docs, existing issues, and architecture
- All agents should treat tier references as model-level changes when updating their domains
- `.squad/decisions.md` historical references are fine (append-only log)

## Teaching Site Note

Keep implementations right-sized. The Gift tier recipient model is a great teaching opportunity for multi-party identity patterns — but implement the simplest version that demonstrates the concept.

---

## Recent Decisions (2026-04-11+)

### Dark Text on Gold Buttons (2026-04-11)

**Author:** Trinity  
**Date:** 2026-04-11  
**Status:** Implemented  

#### Context

All `bg-aurora-gold text-white` buttons failed WCAG AA contrast. Gold (#c9a76a) has ~0.38 relative luminance — white text only achieves ~2.4:1 ratio (needs 4.5:1 for normal text, 3:1 for large).

#### Decision

Use `text-aurora-text` (#2c2620) on all `bg-aurora-gold` elements. This achieves ~5.7:1 contrast ratio, passing WCAG AA and AAA for large text.

**Rule:** Any element with `bg-aurora-gold` must use `text-aurora-text` (dark), never `text-white`.

#### Affected Components

Hero, Navbar, DestinationGrid, ConciergeForm, Tiers — all CTA buttons and active state pills.

---

### Tier Architecture — Discriminated Union + Per-Tier APIs (2026-04-12)

**Author:** Morpheus  
**Date:** 2026-04-12  
**Issue:** #210 · **PR:** #212  
**Status:** Proposed — pending team review

#### Decision

Adopt a **discriminated union** (`ServiceTier = OneTimeEvent | YearlySubscription | GiftPurchase`) as the canonical backend/API type for tier data. The three tier types are fundamentally different transaction models, not levels of the same thing.

#### Key Points

1. **Current `MembershipTier` stays** for static frontend rendering — it's the right shape for tier cards.
2. **`ServiceTier` union** adds per-tier fields (event dates, subscription lifecycle, gift buyer/recipient).
3. **Booking API uses separate POST endpoints** per tier type — different request bodies, different validation.
4. **Gift redemption converts to One Time** — no special event type downstream.
5. **Gift uses code-based activation** — no pre-created recipient accounts.
6. **ConciergeForm uses progressive disclosure** — one form with tier-conditional fieldsets.

#### Rationale

The old Silver/Black/Obsidian model was a linear hierarchy. The new One Time/Yearly/Gift model represents three distinct transaction types. Treating them as the same shape (with lots of optional fields) would create a confusing API and lose TypeScript's ability to catch missing cases at compile time.

#### Impact

- Specs #203, #204, #205, #206, #208 need tier-type-aware updates (see spike §5)
- Sample data (#190) needs 10 records across lifecycle states
- Security (#208) needs gift code generation + two-party identity model

#### Teaching Value

Discriminated unions, progressive disclosure, and RESTful resource modeling are patterns every TypeScript developer should know. This architecture creates natural opportunities to teach all three.

---

### Sprint Reorder Directive (2026-04-11)

**Source:** User directive (via Copilot)  
**By:** Ivan  
**Date:** 2026-04-11  
**Status:** Captured for team memory

#### Request

Reorder sprints so design/frontend work is done first before moving on to harder backend stuff.

#### Rationale

User preference — prioritize visible, testable UI work before tackling backend architecture and integration work.

---

### Dual Gold Color Tokens for WCAG AA Compliance (2026-04-11)

**Author:** Trinity  
**Date:** 2026-04-11  
**Status:** Implemented  
**Commit:** 7dc22ae

#### Context

`text-aurora-gold` (#c9a76a) on light backgrounds (aurora-bg-light #faf9f7, aurora-bg #f5f3f0, aurora-bg-dark #f0ebe5) produces ~2.3:1 contrast ratio, failing WCAG AA (4.5:1 for normal text).

#### Decision

Added `aurora-gold-accessible` (#7a6532) as a new design token registered in both `globals.css @theme inline` and `tailwind.config.ts`. This achieves ~4.5:1 contrast on the lightest background.

**Usage rules:**
- `text-aurora-gold-accessible` — ALL text on light backgrounds (labels, links, accent text)
- `text-aurora-gold` — text on dark backgrounds (aurora-navy), decorative borders, background fills
- Never use `text-aurora-gold` for readable text on any aurora-bg-* surface

#### Impact

All team members creating components with gold text on light backgrounds must use `text-aurora-gold-accessible` instead of `text-aurora-gold`.

---

### Decision: Rebalance Section Spacing Tokens (2026-04-12)

**Author:** Mouse  
**Date:** 2026-04-12  
**Status:** Implemented

#### Context

Section spacing tokens (`--space-section-lg` through `--space-section-xs`) in `globals.css` were too generous. Because every section uses symmetric `py-section-*` padding, adjacent sections stack their bottom + top padding, producing combined gaps of 128-224px on desktop — nearly double the 80-120px industry standard.

#### Decision

Reduce all four section spacing tokens so that stacked `py-section-lg` sections produce ~80-120px combined gaps on desktop, with tighter mobile/tablet values:

```css
--space-section-lg: clamp(1.75rem, 1.25rem + 2.5vw, 3.75rem);  /* 28→60px */
--space-section-md: clamp(1.25rem, 0.875rem + 2vw, 2.75rem);   /* 20→44px */
--space-section-sm: clamp(1rem, 0.625rem + 1.5vw, 2rem);       /* 16→32px */
--space-section-xs: clamp(0.75rem, 0.5rem + 1vw, 1.5rem);      /* 12→24px */
```

Hero spacing (`--space-hero`) is unchanged — it's intentionally cinematic.

#### Rationale

- Stacked gaps now hit 80-120px on desktop (luxury standard)
- Mobile gaps are 32-56px — comfortable but not wasteful
- All 8 affected components reviewed: internal spacing (headings, grids, cards) is self-contained and unaffected
- Build passes cleanly

#### Consequences

- Pages will feel more cohesive with tighter vertical rhythm
- If a future section needs extra breathing room, use `py-section-lg` + additional `mt-*` rather than inflating the token

---

### Decision: Remove SectionBreak, Standardize H2 Pattern (2026-04-13)

**Author:** Mouse  
**Date:** 2026-04-13  
**Issues:** #238-#246

#### Decision

1. **SectionBreak removed from page.tsx.** Decorative gold-line dividers between sections have been removed. Sections now own their own spacing via `py-section-*` tokens. SectionBreak CSS remains in globals.css for potential future use but is no longer rendered on the homepage.

2. **Canonical section header pattern established:** Every section now follows eyebrow → H2 → body copy, using:
   - Eyebrow: `text-sm font-medium tracking-[0.2em] uppercase text-aurora-gold-accessible mb-3`
   - H2: `font-heading text-fluid-2xl font-semibold tracking-tight leading-tight text-aurora-text mb-4`
   - Body: `section-intro` class or `text-base text-aurora-text-muted leading-relaxed max-w-2xl`
   - On dark backgrounds (Tiers): eyebrow uses `text-aurora-gold`, H2 uses `text-white`

3. **All sections use `py-section-lg`** for consistent vertical rhythm. No more mixed `py-section-sm sm:py-section-lg` or `pt-section-sm sm:pt-section-lg pb-section-md` patterns.

#### Rationale

SectionBreaks created dead zones between same-bg sections and bg mismatches at light→dark transitions. Removing them and letting sections own their spacing produces cleaner visual flow. The standardized H2 pattern ensures scannable hierarchy across the entire page.

#### Impact

- **Trinity:** If adding new sections, follow the eyebrow/H2/body pattern above.
- **All agents:** SectionBreak component is unused. If re-introducing decorative dividers, build them as section-internal elements, not standalone components.

---

### Decision: Guest-count tier → numeric mapping for ConciergeForm (2026-07)

**Issue:** #247  
**Author:** Neo  
**Date:** 2026-07

#### Context

The hero-discovery custom event sends a guest-count tier string (`intimate`, `medium`, `grand`, `spectacular`) to the ConciergeForm. Previously this was only injected into the notes textarea as display text — the `expectedGuests` numeric field was never updated.

#### Decision

Map each tier to a **sensible default** at the low end of its range:
- `intimate` → 12 (midpoint of 1–25)
- `medium` → 25 (floor of 25–100)
- `grand` → 100 (floor of 100–500)
- `spectacular` → 500 (floor of 500+)

Using the floor value was chosen over midpoint because:
1. Lower values are a safer default — users can always increase
2. For open-ended ranges like "500+", a midpoint doesn't exist
3. Consistent logic across all tiers

#### Impact

- ConciergeForm `handleHeroDiscovery` handler now sets `expectedGuests` alongside `interests` and `notes`
- Manual edits to Expected Guests still work and persist (no bidirectional tier re-mapping — that would be overengineered)
- No new state variables needed; uses existing `formData.expectedGuests`

---

### User Directive: Test File Structure (2026-04-12T03:55:32Z)

**Captured By:** Copilot (ivegamsft)  
**Status:** Approved

Tests should be in a separate folder outside of the app code. No test files inside `apps/web/app/`.

**Why:** User request — captured for team memory

---

### Decision: Section Container Width Standardization (2026-04-12)

**Author:** Mouse  
**Date:** 2026-04-12  
**Issues:** #249, #250, #252  
**Status:** Implemented  
**Commit:** 2f351e8

#### Context

FAQ and Testimonials sections used narrower containers (`max-w-5xl` and `max-w-4xl`) than other sections (`max-w-7xl`), causing their H2 headings to be visually misaligned. Footer lacked sufficient top spacing from ConciergeForm.

#### Decision

1. **All sections must use `max-w-7xl mx-auto` for their outer container.** This ensures horizontal alignment of headings across the page. Content within sections may use narrower containers if needed, but the heading wrapper must be at standard width.

2. **Section header divs should use `mb-12 md:mb-16`** as the standard bottom margin pattern (matching WhyAurora, DestinationGrid, Tiers).

3. **AnimatedSection wrapping headers should include `variant="fade-up"`** for consistent entrance animation.

4. **Footer uses `pt-section-lg`** (not `pt-section-md`) with a `border-t border-white/10` visual separator to create a distinct zone break from the preceding section.

#### Files Changed

- `apps/web/app/components/FAQ.tsx` — container `max-w-5xl` → `max-w-7xl`, header margin normalized, fade-up added
- `apps/web/app/components/Testimonials.tsx` — container `max-w-4xl` → `max-w-7xl`, header margin normalized, fade-up added
- `apps/web/app/components/Footer.tsx` — `pt-section-md` → `pt-section-lg`, added top border separator

#### Verification

- ✅ All H2 headings horizontally aligned across page
- ✅ Footer visually distinct with top padding and border
- ✅ Build passes, tests pass

---

### Decision: Bump `--fluid-2xl` for stronger H2 hierarchy (2026-04-12)

**Author:** Trinity  
**Date:** 2026-04-12  
**Issue:** #251  
**Status:** Implemented  
**Commit:** 085c808

#### Context

All 7 section H2s (WhyAurora, DestinationGrid, ExperienceList, Testimonials, Tiers, FAQ, ConciergeForm) use `text-fluid-2xl`. The old value `clamp(1.75rem, 1.4rem + 1.75vw, 2.5rem)` resolved to 28-40px — only 1.75x body text at mobile. Luxury sites need dramatic type hierarchy.

#### Decision

Bumped `--fluid-2xl` from `clamp(1.75rem, 1.4rem + 1.75vw, 2.5rem)` (28-40px) to `clamp(2rem, 1.5rem + 2.5vw, 3rem)` (32-48px).

**Revised typography scale:**
| Token | Range | Ratio to body |
|-------|-------|---------------|
| sm | 13-14px | 0.8-0.875x |
| base | 16px | 1x |
| lg | 18-22px | 1.125-1.375x |
| xl | 22-30px | 1.375-1.875x |
| **2xl** | **32-48px** | **2-3x** |
| 3xl | 36-56px | 2.25-3.5x |

#### What changed

- `apps/web/app/globals.css`: Updated `--fluid-2xl` clamp value and comment

#### What did NOT change

- Hero heading (`text-fluid-3xl`) — untouched per constraint
- No component files changed — all H2s inherit via the CSS custom property
- H2s already use `font-heading` (Space Grotesk) and `font-semibold` — correct for hierarchy

#### Risk

Low. Single token change. All 7 section H2s inherit automatically. Build passes.

---

### Decision: Register All Custom Spacing Tokens in @theme inline (2026-04-13)

**Author:** Mouse  
**Date:** 2026-04-13  
**Status:** Implemented

#### Context

Tailwind v4 uses `@theme inline` as the authoritative token registry for utility class generation. Custom spacing tokens defined only in `:root` (or only in `tailwind.config.ts`) are **silently ignored** — no error, no CSS output. This caused all `py-section-*` and `pt-section-*` utilities to produce zero padding, making sections stack with no vertical spacing.

#### Decision

**Every custom spacing token used as a Tailwind utility MUST be registered in the `@theme inline` block using the `--spacing-*` namespace.**

Example pattern:
```css
:root {
  --space-section-lg: clamp(2rem, 1.5rem + 2.5vw, 3.75rem);
}

@theme inline {
  --spacing-section-lg: var(--space-section-lg);
}
```

This enables `py-section-lg`, `pt-section-lg`, `pb-section-lg`, `mt-section-lg`, etc. to all generate valid CSS.

#### Tokens Registered

| @theme token | References | Utility examples |
|---|---|---|
| `--spacing-section-lg` | `var(--space-section-lg)` | `py-section-lg` |
| `--spacing-section-md` | `var(--space-section-md)` | `py-section-md`, `pt-section-md` |
| `--spacing-section-sm` | `var(--space-section-sm)` | `py-section-sm` |
| `--spacing-section-xs` | `var(--space-section-xs)` | `py-section-xs` |
| `--spacing-hero` | `var(--space-hero)` | `py-hero` |

#### Consequence

Any future custom spacing token added to `:root` MUST also be added to `@theme inline` as `--spacing-<name>: var(--space-<name>)` or the corresponding Tailwind utility will silently fail.

---

### Spacing Pixel Measurements Audit (2026-04-12)

**Author:** Tank  
**Date:** 2026-04-12  
**Status:** Completed

#### Summary

Playwright-measured actual pixel distances between all homepage sections at 1440px desktop and 375px mobile. Screenshots and JSON data saved to `tests/e2e/screenshots/`.

#### Key Finding: Spacing is NOT as extreme as CSS math suggested

Previous audit calculated `section-lg` padding at ~126px per side at 1440px based on clamp max values. **Actual measured computed padding is 60px per side** (3.75rem). The clamp() preferred value at 1440px viewport is well below the max — the 12rem max only applies at ~2500px+ viewports.

#### Desktop (1440px) Measurements

| Transition | CSS gap (pb+pt) | Visual gap (content→H2) |
|---|---|---|
| TrustBar → WhyAurora | 60px (0+60) | 117px |
| WhyAurora → DestinationGrid | 120px (60+60) | 176px |
| DestinationGrid → ExperienceList | 120px (60+60) | 152px |
| ExperienceList → Testimonials | 120px (60+60) | 152px |
| Testimonials → Interstitial | 60px (60+0) | N/A |
| Interstitial → Tiers | 60px (0+60) | 116px |
| Tiers → FAQ | 120px (60+60) | 128px |
| FAQ → ConciergeForm | 120px (60+60) | 152px |

#### Mobile (375px) Measurements

| Transition | CSS gap (pb+pt) | Visual gap (content→H2) |
|---|---|---|
| TrustBar → WhyAurora | 33px (0+33) | 90px |
| WhyAurora → DestinationGrid | 66px (33+33) | 123px |
| DestinationGrid → ExperienceList | 57px (33+24) | 89px |
| ExperienceList → Testimonials | 57px (24+33) | 89px |
| Interstitial → Tiers | 33px (0+33) | 89px |
| Tiers → FAQ | 66px (33+33) | 75px |
| FAQ → ConciergeForm | 66px (33+33) | 99px |

#### Recommendation

The 120px combined CSS gap (60+60) between major sections at 1440px desktop is generous but not extreme for a luxury brand site. If the team still feels sections are too spread out, the fix should target **the preferred value in the clamp formula** — not the max. Reducing the `section-lg` preferred value by ~20% (e.g., from the current slope to yield ~48px at 1440px instead of 60px) would bring combined gaps to ~96px, which is more typical for premium sites.

However, the original complaint may have been about **perceived crowding** (too tight), not excessive spacing. At 60px padding per side, sections have breathing room. The real visual issue might be that heading margins (56–116px from section top to H2) add extra visual weight on top of padding, making some transitions feel uneven.

#### Files

- `tests/e2e/screenshots/spacing-audit-desktop.png` — Full-page desktop screenshot
- `tests/e2e/screenshots/spacing-audit-mobile.png` — Full-page mobile screenshot
- `tests/e2e/screenshots/spacing-measurements.json` — Raw measurement data
- `tests/e2e/screenshots/run-spacing-audit.mjs` — Reusable measurement script

