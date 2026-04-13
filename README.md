# Aurora Luxe

A production-grade, luxury experiential party platform built as a teaching site. Architects of the extraordinary—we design and produce bespoke celebrations for UHNW individuals and families.

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion  
**Status:** Single-page marketing site with mock data (no backend/APIs yet)

---

## About Aurora Luxe

Aurora Luxe is a **fictional luxury brand** demonstrating production-grade architecture, accessibility, and design discipline. Every technical decision was chosen as a teaching pattern—simpler alternatives exist; these patterns earn their complexity.

**The three service tiers** reflect three fundamentally different transaction models:
- **One Time** ($500K) — Single bespoke event production
- **Yearly** ($1.2M/yr) — Annual subscription for family milestone celebrations
- **Gift** ($250K) — Third-party purchase of an experience for someone else

## Project Structure

```
luxesite/
├── apps/web/                  ← Next.js marketing site
│   ├── app/
│   │   ├── components/        ← UI components (Hero, Tiers, FAQ, etc.)
│   │   ├── data/              ← Mock data (experiences, testimonials, tiers)
│   │   ├── lib/               ← Types, utilities
│   │   ├── layout.tsx         ← Root layout + fonts
│   │   ├── page.tsx           ← Homepage (8-section page)
│   │   ├── [detail]/page.tsx  ← Dynamic detail pages
│   │   └── globals.css        ← Design tokens (colors, spacing, typography)
│   ├── public/                ← Imagery
│   ├── e2e/                   ← Playwright tests
│   ├── package.json
│   └── next.config.ts
├── spec/                      ← Project specifications
│   ├── brand-pivot.md         ← Brand strategy, content voice, implementation phases
│   ├── design-system-update.md ← Design language, token strategy
│   ├── tier-architecture-spike.md ← Three-tier data model deep dive
│   ├── security-architecture.md ← Auth, API security, threat model
│   ├── content-apis.md        ← Versioned API endpoints
│   ├── backoffice-platform.md ← Admin/editor workflows
│   ├── testing-strategy.md    ← Jest + Playwright approach
│   ├── observability.md       ← Monitoring and telemetry
│   ├── azure-architecture.md  ← Cloud deployment strategy
│   └── cicd-pipeline.md       ← GitHub Actions workflows
├── tests/
│   ├── unit/                  ← Jest unit tests (collocated with components)
│   ├── e2e/                   ← Playwright e2e tests
│   └── jest.setup.ts          ← Jest configuration
├── .squad/                    ← Squad team configuration
├── .github/workflows/         ← CI/CD automation
└── This README + docs/repo-story.md
```

## Getting Started

### Development

```bash
cd apps/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
cd apps/web
npm run build
npm start
```

### Testing

```bash
cd apps/web
npm test                    # Jest unit tests (tests/unit/)
npm run test:watch        # Watch mode
npm run e2e                # Playwright e2e (tests/e2e/)
npm run lint              # ESLint
```

Test configs are at repo root (`jest.config.js`, `playwright.config.ts`) — standard tooling. Tests live in `tests/` at repo root for clean project structure.

## Page Architecture

The homepage comprises **8 carefully composed sections**:

1. **Hero** – Atmospheric imagery, restrained headline, scroll parallax
2. **TrustBar** – Client credential counter (data-driven authority signal)
3. **WhyAurora** – 3-card editorial grid (expertise + scale + exclusivity)
4. **DestinationGrid** – Featured venues/locations with glassmorphic overlays
5. **ExperienceList** – Curated 6 offerings (galas, voyages, celebrations, etc.) with monoline SVG icons
6. **Testimonials** – Animated carousel of fictional client reviews (WCAG 44px touch targets)
7. **Interstitial** – Full-bleed breathing space (editorial pause before CTA)
8. **Tiers** – Three service tiers with animated borders and tier-specific pricing
9. **FAQ** – Collapsible disclosure accordion
10. **ConciergeForm** – Consultation form with validation, progressive disclosure by tier

Plus chrome:
- **Navbar** – Logo + mobile hamburger (collapses at lg breakpoint)
- **ScrollNav** – Sticky section jump navigation
- **BackToTop** – Scroll-triggered return button
- **Footer** – Fictional disclaimer + links

## Design System

### Typography (Fluid Scale)

**Font Stack:**
- Headings: Space Grotesk (geometric, futuristic)
- Body: Inter (maximum legibility)
- Via `next/font` for zero-CLS performance

**Fluid Scale** (clamp() with viewport scaling):
```css
--fluid-sm: clamp(0.8125rem, 0.78rem + 0.16vw, 0.875rem);    /* 13-14px */
--fluid-lg: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);          /* 18-22px */
--fluid-2xl: clamp(2rem, 1.5rem + 2.5vw, 3rem);               /* 32-48px */
```

Body text fixed at 1rem (16px) — never fluid, always readable.

### Color Palette

**Aurora Theme** (OKLCH perceptually uniform):
- `--aurora-bg: #f5f3f0` (warm neutral)
- `--aurora-gold: #c9a76a` (champagne — primary accent)
- `--aurora-navy: #1a3a52` (secondary accent)
- `--aurora-text: #2c2620` (headings + body)
- `--aurora-error: #a85a4a` (warm bordeaux — not cold red)

All colors registered in `@theme inline` for Tailwind v4 utility generation.

### Spacing Hierarchy

**Base Grid:** 8px (0.5rem unit)  
**Section Spacing** (stacked for 80-120px vertical rhythm on desktop):
```css
--space-section-lg: clamp(2rem, 1.5rem + 2.5vw, 3.75rem);     /* 32→60px */
--space-section-md: clamp(1.5rem, 1rem + 2vw, 2.75rem);       /* 24→44px */
--space-section-sm: clamp(1.25rem, 0.75rem + 1.5vw, 2rem);    /* 20→32px */
```

### Radius Hierarchy

- `rounded-sm` – Cards/containers (editorial sharpness)
- `rounded-lg` – Buttons/inputs (touchable medium)
- `rounded-full` – Pills/badges (full rounding only)

**Why:** Uniform rounding is the #1 AI-generated aesthetic tell. Intentional hierarchy reads as editorial.

### Animations

- **Scroll reveals:** Framer Motion `useInView()` triggers
- **Parallax:** RAF-based background offset (disabled on `prefers-reduced-motion`)
- **Menu:** Slide-down with ease-out-quint easing
- **Transitions:** All respect `useReducedMotion()` hook

## Accessibility

- **WCAG 2.1 AA** target throughout
- **Touch targets:** ≥ 44×44px (buttons, carousel dots, nav links)
- **Color contrast:** ≥ 7:1 on primary interactive elements
- **Semantic HTML:** Proper heading hierarchy, ARIA landmarks, button semantics
- **Reduced motion:** Parallax and animations disable on `prefers-reduced-motion`
- **Images:** All via `next/image` with alt text
- **Forms:** Labels, error messages, validation feedback
- **Focus:** Visible keyboard navigation on all interactive elements

## Data & Content

**Mock data** (static TypeScript files in `apps/web/app/data/`):
- `destinations.ts` – 14 venue records
- `experiences.ts` – 8 experience types
- `tiers.ts` – 3 tier definitions
- `testimonials.ts` – 7 fictional client reviews
- `team.ts` – 5 specialist profiles
- `navigation.ts` – Nav + ScrollNav config
- `guides.ts` – FAQ responses
- `awards.ts` – Trust bar credentials

**Content voice** (per `spec/s1-foundation-brand/documentation-update.md`):
- Luxurious + imaginative + professional + intentionally fictional
- Believability-anchored (real prices, real destinations, real feasibility)
- No false claims or AI hype
- Teaching annotations in code explain "why" not just "what"

## What's Next

See `spec/` directory for priorities:

### Platform & Architecture
- **Content APIs** (`spec/s3-apis-content/content-apis.md`) — Versioned REST endpoints for experience packages, tier data, specialist profiles
- **Backend Phase 1** (`spec/s3-apis-content/booking-consultation-apis.md`) — Consultation booking flow, event details capture, tier-specific fields
- **Monorepo Expansion** (`spec/s6-infrastructure-devops/monorepo-architecture.md`) — Backend services (Node/Python), shared types, API contracts

### Security & Identity
- **Authentication** (`spec/s5-security-auth/security-architecture.md`) — OAuth2/OIDC for staff, JWT session tokens, two-party identity for Gift tier
- **API Security** — Rate limiting, content filtering, PII encryption, admin RBAC
- **Infrastructure** (`spec/s6-infrastructure-devops/azure-architecture.md`) — Azure App Service, Key Vault, API Management gateway, VNet isolation

### Content & AI
- **Content Management** (`spec/s3-apis-content/content-management.md`) — Headless CMS integration, draft/publish workflow, content versioning
- **AI Concierge** (`spec/s4-ai-intelligence/ai-excursion-builder.md`) — LLM-powered experience builder, prompt engineering, guardrails
- **Internationalization** (`spec/s2-frontend-data/accessibility-i18n.md`) — i18n for 5+ languages, locale-aware pricing, cultural adaptation

### Operations & Quality
- **Testing Strategy** (`spec/s8-testing/testing-strategy.md`) — Jest unit + Playwright e2e, accessibility testing, screenshot regression
- **Observability** (`spec/s6-infrastructure-devops/observability.md`) — Application Insights telemetry, error tracking, performance monitoring
- **CI/CD** (`spec/s6-infrastructure-devops/cicd-pipeline.md`) — GitHub Actions, automated tests, staging/production environments
- **Sample Data Pack** (`spec/s2-frontend-data/sample-data-pack.md`) — Import scripts, realistic fixture data for testing

## Learning Patterns

This project demonstrates:

1. **Type-Driven Architecture** — Discriminated unions for the three tier transaction models  
2. **Design System Discipline** — Fluid typography, OKLCH color space, intentional radius hierarchy  
3. **Accessibility First** — WCAG 2.1 AA throughout; motion-respecting animations  
4. **Test Colocation** — Unit tests live with components in `tests/unit/`  
5. **Teaching Code** — JSDoc explains architectural patterns; no "magic" without rationale  
6. **Production Constraints** — Single-page site with zero framework bloat; every feature justified  

## Imagery

All photography from [Unsplash](https://unsplash.com) under the Unsplash License. Images optimized via `next/image` for responsive delivery and Lighthouse performance.

## Squad Team

Built and maintained by the Squad AI team. See [.squad/team.md](.squad/team.md) for roles and [.squad/decisions.md](.squad/decisions.md) for architectural decisions.

## License

Demonstration/portfolio project. Free to use as reference.
