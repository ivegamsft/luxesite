# Aurora Luxe Travel — Architecture Decisions
**Author:** Morpheus  
**Date:** 2024  
**Status:** Approved  

## Overview
Production-ready, luxury travel website with futuristic aesthetic. Next.js 14+ App Router, TypeScript, Tailwind CSS, Framer Motion.

## Key Technical Decisions

### 1. Project Structure
```
/app
  layout.tsx          # Root layout with fonts, metadata
  page.tsx            # Home page (assembles all sections)
  globals.css         # Tailwind imports + custom CSS
  /components         # All UI components
  /data              # Mock data (destinations, experiences, tiers, testimonials)
  /lib               # Utilities (cn helper, types)
  /destinations      # Optional detail pages [slug]
```

**Rationale:** App Router convention. Clear separation of concerns. Components stay flat (no deep nesting). Data layer is pure TypeScript — no backend.

### 2. Styling Strategy
- **Tailwind CSS** with custom theme extension
- Custom colors: `aurora-cyan`, `aurora-purple`, `aurora-magenta`, `aurora-gold`
- Custom gradients for hero, borders, CTAs
- Glass morphism utilities: `backdrop-blur-xl`, custom `glass` class
- Animation utilities via Tailwind + Framer Motion for orchestrated reveals
- Mobile-first responsive design with breakpoints at `sm:640`, `md:768`, `lg:1024`, `xl:1280`, `2xl:1536`

**Rationale:** Tailwind provides rapid iteration. Custom theme keeps brand consistency. Avoid inline style objects; keep utility-first approach.

### 3. Typography
- **Headings:** Space Grotesk (futuristic, modern, wide aperture)
- **Body:** Inter (clean, readable, professional)
- Load via `next/font/google` for optimal performance (self-hosted, no layout shift)
- Scale: `text-xs` to `text-7xl` with clear hierarchy

**Rationale:** Google Fonts via Next.js font optimization. Space Grotesk pairs with luxury tech aesthetic. Inter ensures readability.

### 4. Image Strategy
- **Source:** Unsplash Source API (remote URLs, no API key required)
- **Delivery:** `next/image` with `remotePatterns` config for `source.unsplash.com`
- **Optimization:** Automatic WebP conversion, lazy loading, blur placeholders
- **Fallback:** If Unsplash Source is unstable, provide alternative Pexels URLs
- **Credits:** Footer includes "Images via Unsplash Source" with link

**Rationale:** No copyrighted assets in repo. Next.js image optimization handles formats, sizes, lazy loading. Unsplash Source is stable enough for demo/production.

### 5. Animation & Interactivity
- **Library:** Framer Motion for scroll-triggered reveals and micro-interactions
- **Patterns:**
  - Scroll-based `InView` variants for section entrance (stagger children)
  - CSS transitions for hover effects (lift, glow, tilt)
  - Animated gradient blobs via CSS `animate-` utilities
  - Conic gradient borders on CTAs and cards
- **Performance:** Use `will-change` sparingly, prefer `transform` and `opacity` for 60fps

**Rationale:** Framer Motion integrates cleanly with React. Scroll reveals add premium feel without hurting performance. CSS transitions for simple hovers keep bundle lean.

### 6. Data Model
All mock data in `/app/data/*.ts`:

```typescript
// destinations.ts
export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: string;
  tagline: string;
  priceFrom: number;
  currency: string;
  imageUrl: string;
  quickFacts: string[];
}

// experiences.ts
export interface Experience {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji or lucide-react icon name
  imageUrl?: string;
}

// tiers.ts
export interface MembershipTier {
  id: string;
  name: string;
  tagline: string;
  pricePerYear: number;
  perks: string[];
  featured: boolean;
}

// testimonials.ts
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}
```

**Rationale:** Typed data ensures type safety across components. Single source of truth. Easy to extend to API later. Mock data is realistic and on-brand.

### 7. Form Handling
- Client-side validation with React Hook Form (lightweight) or native controlled state
- Budget options: Enum/select dropdown
- Interests: Multi-select chips (toggle state)
- On submit: Show success toast (react-hot-toast or native), no backend POST
- Accessibility: proper labels, aria-describedby for errors, focus management

**Rationale:** No backend required. Client validation sufficient for demo. Form state is straightforward; no need for heavy libraries unless form complexity grows.

### 8. State Management
- **Global State:** None required (all data is static)
- **Local State:** React `useState` for modals, form inputs, carousel index
- **Server State:** N/A (no API calls)

**Rationale:** Over-engineering state management for a static site is unnecessary. Keep it simple with local component state.

### 9. Responsive Design
- **Breakpoints:** Tailwind defaults (`sm`, `md`, `lg`, `xl`, `2xl`)
- **Mobile-first:** Base styles for mobile, progressively enhance for larger screens
- **Key patterns:**
  - Navbar: hamburger menu on mobile, horizontal nav on `md:` and up
  - Destination grid: 1 col mobile → 2 col tablet → 3 col desktop
  - Hero text: smaller on mobile, larger on desktop
  - Floating CTA button on mobile only
- **Touch targets:** Minimum 44x44px for buttons on mobile

**Rationale:** Mobile-first ensures baseline experience. Tailwind's responsive utilities make breakpoints declarative.

### 10. Performance Budget
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3s
- **Bundle size:** Keep `_app.js` under 200KB gzipped
- **Image optimization:** WebP, responsive sizes, lazy loading for below-fold images
- **Animations:** 60fps target, use `transform` and `opacity` only

**Rationale:** Luxury brand = fast, smooth experience. Next.js handles code splitting. Framer Motion is the only animation library; keep it lean.

### 11. Accessibility Standards
- **WCAG 2.1 AA compliance target**
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Heading hierarchy (`h1` → `h6` in order)
- Focus indicators on all interactive elements
- `aria-label` for icon-only buttons
- `alt` text for all images
- Keyboard navigation (Tab, Enter, Escape for modals)
- Color contrast: 4.5:1 for normal text, 3:1 for large text

**Rationale:** Premium brand must be inclusive. Tank will audit with axe-core and manual keyboard testing.

### 12. SEO & Metadata
- Page title: "Aurora Luxe Travel — Beyond First Class"
- Meta description: <160 chars pitch
- OpenGraph tags for social sharing (og:title, og:description, og:image)
- Twitter card metadata
- Favicon: Simple SVG mark (aurora symbol or "A" lettermark)
- Sitemap (optional, but easy to add)

**Rationale:** Discoverable, shareable. Next.js Metadata API makes this declarative. SVG favicon scales well.

### 13. Testing Strategy
- **Unit tests:** Not required for static components (low ROI)
- **Integration tests:** Form validation logic
- **E2E tests:** Key user flows (navigate, open modal, submit form) with Playwright
- **Accessibility tests:** axe-core via @axe-core/react or Playwright
- **Visual regression:** Optional (Percy/Chromatic if budget allows)

**Rationale:** Focused testing where it matters. Tank prioritizes E2E and a11y audits over exhaustive unit tests.

### 14. Deployment
- **Platform:** Vercel (optimal Next.js support)
- **Environment:** Production + Preview branches
- **CI/CD:** GitHub Actions for build checks (lint, type-check, build)
- **Domain:** Custom domain (configure in Vercel dashboard)

**Rationale:** Vercel is zero-config for Next.js. Automatic preview deployments for PRs. Edge network for fast global delivery.

---

## Non-Goals (Explicitly Out of Scope)
- No backend / database (all mock data)
- No user authentication
- No payment processing
- No CMS integration
- No multi-language support (English only)
- No blog or content pages beyond landing page

---

## Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Unsplash Source API instability | Images fail to load | Provide Pexels fallback URLs; document in README |
| Heavy animations degrade performance | Poor mobile experience | Performance audit in Sprint 3; throttle animations on low-end devices |
| Accessibility gaps | Non-compliance | Tank conducts a11y audit in Sprint 3 with axe-core |
| Scope creep (e.g., "add booking backend") | Timeline slip | Clearly document non-goals; PRD is locked |

---

## Success Criteria
1. ✅ Runs locally (`npm run dev`) and builds successfully (`npm run build`)
2. ✅ Looks "finished" (Apple-level polish, no placeholder content)
3. ✅ Responsive on iPhone SE → 4K desktop
4. ✅ Lighthouse score: 90+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
5. ✅ All PRD requirements implemented (navbar, hero, 6 sections, form, footer)
6. ✅ README documents setup, image credits, how to run

---

## Revision History
- **2024-01-XX:** Initial architecture v1.0 (Morpheus)
