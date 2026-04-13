# Copilot Instructions — Aurora Luxe

## Build, Test, Lint

All commands run from `apps/web/`:

```bash
npm run dev           # Dev server on localhost:3000
npm run build         # Production build (Next.js)
npm run lint          # ESLint (next core-web-vitals + typescript)
npm test              # Jest unit/integration tests
npm test -- Hero      # Run tests matching "Hero"
npm run test:e2e      # Playwright e2e (launches dev server automatically)
```

Playwright runs single-worker, Chromium-only, against `localhost:3000`. E2e tests live in `e2e/`, unit tests in `app/components/__tests__/`.

## Architecture

**Single-page luxury marketing site** — Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + Framer Motion. Not a SaaS product; this is a brand showcase that converts visitors into event consultation requests.

### Page Composition

The page follows a narrative "act" structure in `app/page.tsx`:

1. **Act 1** — First Impression: Hero → TrustBar
2. **Act 2** — Expertise: WhyAurora
3. **Act 3** — Discovery: DestinationGrid → ExperienceList
4. **Act 4** — Social Proof: Testimonials → Interstitial
5. **Act 5** — Commitment: Tiers → FAQ → ConciergeForm

Chrome components (Navbar, ScrollNav, Footer, BackToTop) wrap the main content. `SectionBreak` dividers separate acts.

### Data Layer

All content is static mock data in `app/data/` (destinations, experiences, testimonials, tiers, FAQs). No API calls, no database. Components import data directly.

### Three Service Tiers

The tiers are structurally different products, not pricing levels:
- **One Time** ($500K) — Single event booking
- **Yearly** ($1.2M/yr) — Annual subscription
- **Gift** ($250K) — Third-party purchase (buyer ≠ recipient)

See `spec/brand-pivot.md` for the full brand specification and `spec/tier-architecture-spike.md` for the discriminated union data model.

## Key Conventions

### Tailwind v4 Theming

`globals.css` uses `@theme inline` as the single source of truth for design tokens. Components use Tailwind utilities referencing these tokens (e.g., `bg-aurora-gold`, `text-aurora-text`, `text-fluid-xl`). Never hardcode hex values in components.

### Color Contrast

`aurora-gold` (#c9a76a) is a light accent color. Always pair it with dark text (`text-aurora-text`), never with white text — the contrast ratio against white is only ~2.4:1.

### Typography

- **Headings:** `font-heading` (Space Grotesk) via `next/font`
- **Body:** `font-sans` (Inter) via `next/font`
- **Fluid sizing:** `text-fluid-sm` through `text-fluid-3xl` using `clamp()` values from CSS custom properties

### Animation Pattern

All scroll-triggered animations use the `AnimatedSection` wrapper component (Framer Motion). Every animated component must:
- Check `useReducedMotion()` and skip animation when true
- Use `viewport={{ once: true }}` to animate only on first scroll-in

### Hover Pattern

Interactive cards use `hover:-translate-y-1` + shadow lift. Never use `hover:scale` on grid cards (causes layout jank).

### Spacing

- Cards/containers: `rounded-sm` (editorial sharpness)
- Buttons/inputs: `rounded-lg`
- Pills/badges: `rounded-full`
- Section padding uses CSS custom properties (`py-section-lg`, `py-section-md`, etc.)

### Component Structure

All section components are client components (`'use client'`) since they use Framer Motion. They follow a consistent pattern: section wrapper with `id` for scroll nav → max-width container → AnimatedSection content.

### Accessibility

- WCAG 2.1 AA target throughout
- Touch targets ≥ 44×44px
- Skip-to-content link in layout
- `prefers-reduced-motion` respected in both CSS and JS
- ARIA landmarks and semantic HTML

### ConciergeForm

The consultation form has an expandable "Share more details" section. Interest chips, travel dates, and budget fields are hidden until the user clicks to expand. Tests must click to expand before asserting on those fields.

## Specs & Planning

The `spec/` directory contains project specifications — these are the source of truth for planned features. Key specs:

- **`spec/brand-pivot.md`** — Current brand direction: luxury experiential party platform (pivoted from travel). Three service tiers are structurally different transaction types (discriminated union), not pricing levels.
- **`spec/tier-architecture-spike.md`** — Discriminated union data model: `ServiceTier = OneTimeEvent | YearlySubscription | GiftPurchase`. Dates are ISO strings, forms use progressive disclosure, APIs are separate per tier.
- **`spec/testing-strategy.md`** — Test pyramid: Jest unit → integration → Playwright E2E. Collocate tests, target 80%+ coverage, test tier-specific flows.
- **`spec/security-architecture.md`** — Memory-only access tokens + HttpOnly refresh tokens, strict RBAC, server-side auth checks, security headers.
- **`spec/frontend-data-migration.md`** — Migrate static data via adapter pattern (static → API → CMS) behind feature flags.
- **`spec/observability.md`** — Structured JSON logging, never log PII or payment info.
- **`spec/content-apis.md`** — URL-versioned APIs (`/v1`, `/v2`), tier-aware, cached, typed models.
- **`spec/azure-architecture.md`** — Container Apps + APIM + Cosmos DB + PostgreSQL; APIM is the only public ingress.

### Cross-Cutting Conventions from Specs

- Treat tier models as discriminated unions; never assume all tiers share one shape
- Keep all authorization server-side; never trust the client
- Use published/approved content only for AI-generated output
- Never emit PII or payment details in logs
- Prefer URL-path versioned APIs (`/v1/resource`)

## Squad Team

The `.squad/` directory contains AI team configuration. See `.squad/team.md` for roles. The `.agents/skills/impeccable/context.md` file defines the design context, brand personality, and aesthetic direction — reference it when making visual or copy decisions.
