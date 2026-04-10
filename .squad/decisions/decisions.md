# Decisions

**Project:** luxesite  
**Last Updated:** 2026-04-10T03:18:00Z

**Project:** luxesite  
**Last Updated:** 2026-04-10T03:18:00Z

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
