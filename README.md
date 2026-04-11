# Aurora Luxe

A futuristic luxury party and event platform for the world's most discerning hosts. Built as a fictional brand showcase featuring ultra-premium experiential offerings.

## The Project

**Aurora Luxe** is a single-page, ultra-premium party and event design brand. Every detail—from the editorial typography to the OKLCH aurora color palette—reflects a commitment to restraint and precision. This is not a SaaS product; this is a luxury brand.

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion  
**Design Language:** Glassmorphism, editorial restraint, aurora color palette (cyan, magenta, purple, gold)

## Project Structure

```
luxesite/
├── apps/web/           ← Next.js application
│   ├── app/
│   │   ├── components/ ← UI components (8 sections + chrome)
│   │   ├── data/       ← Mock data: destinations, experiences, testimonials
│   │   └── lib/        ← Utilities
│   ├── public/         ← Icons, imagery
│   └── package.json
├── spec/               ← Project specifications
├── .squad/             ← Squad team configuration (see .squad/team.md)
└── .github/            ← CI/CD workflows
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
npm test              # Unit + integration tests with Jest
npm run test:watch   # Watch mode
npm run test:e2e     # End-to-end tests with Playwright
```

## Page Sections

The page comprises 8 carefully composed sections (post-P0 consolidation):

1. **Hero** – Atmospheric imagery with restrained copy and ambient scroll parallax
2. **Trust Bar** – Client logos + credential count (data-driven authority)
3. **Experience Categories** – Featured luxury experiences with pricing, imagery, and glassmorphic overlays
4. **Offering List** – 6 curated offerings (bespoke productions, voyages, celebrations, etc.) with monoline SVG icons
5. **Why Aurora** – 3-card editorial grid; refined alternative to carousel
6. **Testimonials** – Animated carousel of premium client reviews with dot navigation (WCAG 44px targets)
7. **Interstitial** – Full-bleed breathing space; editorial pause before final CTA push
8. **Pricing Tiers** – 3 engagement levels with animated borders and tiered pricing
9. **FAQ** – Collapsed disclosure accordion
10. **Consultation Form** – Contact form with validation and toast notifications

Plus:
- **Navbar** – Logo + scroll-aware mobile menu with slide animation
- **ScrollNav** – Sticky section jump nav (mobile-friendly)
- **BackToTop** – Scroll-triggered button

## Design System

### Typography

- **Headings:** Space Grotesk (geometric, futuristic authority)
- **Body:** Inter (maximum legibility)
- Sourced via `next/font` for optimal performance

### Color Palette

Aurora theme built on OKLCH (perceptually uniform):
- **Primary:** Cyan, magenta, purple gradients
- **Accents:** Gold (`aurora-gold`)
- **Error:** Warm bordeaux (`aurora-error`), not cold red
- **Surface:** Glassmorphic overlays with backdrop blur

### Spacing & Radius Hierarchy

- **Cards/Containers:** `rounded-sm` (editorial sharpness)
- **Buttons/Inputs:** `rounded-lg` (touchable medium)
- **Pills/Badges:** `rounded-full` (only full rounding)
- **Spacing:** 4-unit grid (4px base), consistent with Tailwind

### Animations

- Scroll-triggered reveals via Framer Motion
- Mobile menu slide-down with ease-out-quint easing
- `useReducedMotion()` respected throughout (WCAG prefers-reduced-motion)
- Parallax effects disabled when motion is reduced

## Imagery

All photography from [Unsplash](https://unsplash.com) under the Unsplash License. Images are optimized via `next/image` for responsive delivery and Lighthouse performance.

## Accessibility

- WCAG 2.1 AA target
- Semantic HTML5 with ARIA landmarks
- Touch targets ≥ 44×44px (buttons, nav dots)
- Color contrast ≥ 7:1 on primary interactive elements
- Reduced motion respected
- Focus visible on keyboard navigation

## Squad Team

This project is built and maintained by the Squad AI team. See [.squad/team.md](.squad/team.md) for team roles and [.squad/decisions.md](.squad/decisions.md) for architectural decisions.

## License

Demonstration/portfolio project. Free to use as reference.
