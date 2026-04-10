# AURORA LUXE TRAVEL - Reverse-Engineered UI Spec (Design-MD Style)

## 1) Product Summary

Aurora Luxe Travel is a single-page, high-end luxury travel marketing and lead-capture experience.

Primary goal:
- Convert high-intent visitors into concierge requests via section CTAs and a premium intake form.

Secondary goals:
- Communicate exclusivity, discretion, and bespoke service quality.
- Showcase curated destinations, signature experiences, and membership tiers.

Current implementation scope:
- Single landing page composed of 8 stacked sections.
- No backend integration (client-only form submit success toast).

## 2) Experience Principles

Brand expression:
- Futuristic luxury, low-light palette, glassmorphism surfaces, neon gradient accents.
- Editorial headline tone with concise premium copy.

Interaction principles:
- Motion supports clarity (entrance reveals, hover emphasis, scroll context).
- CTA path is always available (navbar button, hero actions, floating mobile CTA).
- Perceived quality through subtle depth, blur, glow, and animation timing.

## 3) Information Architecture

Section order (top to bottom):
1. Sticky Navbar
2. Hero
3. Destinations
4. Signature Experiences
5. Membership
6. Testimonials
7. Concierge Form
8. Footer

Anchor map:
- #hero
- #destinations
- #experiences
- #membership
- #testimonials
- #contact

Global navigation labels:
- Destinations
- Experiences
- Membership
- Testimonials
- Contact

## 4) Visual System

Color tokens (CSS custom properties + Tailwind extension):
- aurora-dark: #0a0a0f
- aurora-darker: #050508
- aurora-cyan: #00e5ff
- aurora-purple: #8b5cf6
- aurora-magenta: #d946ef
- aurora-gold: #fbbf24
- aurora-white: #f0f0f5
- aurora-glass: rgba(255,255,255,0.05)
- aurora-glass-border: rgba(255,255,255,0.1)

Gradients:
- Primary aurora gradient: cyan -> purple -> magenta
- Subtle overlay gradient variant for hero atmosphere

Typography:
- Heading: Space Grotesk
- Body: Inter
- Headline usage: bold, high tracking discipline, large scale in hero

Surfaces and elevation:
- Glass cards: translucent fill + backdrop blur + thin border
- Glow shadows on hover/focus for premium affordance
- Rounded geometry standardized around xl/2xl radii

## 5) Motion and Interaction System

Core motion patterns:
- Section reveal: fade-up on first viewport entry
- Grid stagger: child cards animate in sequence
- Hover lift: slight translate/scale for cards and buttons
- Glow intensification: hover/active focus on key interactive elements

Hero-specific motion:
- Background atmospheric pulse loop
- Foreground content parallax-like transform based on scrollY
- Content opacity reduction with scroll for cinematic fade

Special effects:
- Conic animated border utility for featured/priority surfaces
- Floating scroll indicator in hero

Reduced motion policy:
- Global respect for prefers-reduced-motion (near-zero animation duration, no animated border loop)

## 6) Responsive Behavior

Breakpoint strategy:
- Mobile-first layout with progressive enhancement at md/lg/xl/2xl.

Key adaptations:
- Navbar collapses to hamburger menu below md.
- CTA buttons stack vertically on small screens in hero.
- Destination/experience/tier/testimonial grids collapse to single-column on small screens.
- Floating Request Itinerary CTA appears on mobile only after passing hero height.

Touch/access sizing:
- Interactive controls target min-height of 44px across primary touch elements.

## 7) Section Specs

### 7.1 Navbar (Sticky Glass)

Purpose:
- Persistent orientation and quick jumps to page sections.

Behavior:
- Sticks to top with glass treatment.
- Active section highlighting is driven by IntersectionObserver.
- Desktop: inline nav + Request Itinerary CTA.
- Mobile: toggle menu, section links, full-width CTA.

Actions:
- All nav links smooth-scroll to anchors.
- Request Itinerary scrolls to #contact.

### 7.2 Hero

Content:
- H1: Beyond First Class.
- Luxury concierge value proposition paragraph.
- Primary CTA: Design My Trip
- Secondary CTA: Explore Destinations

Visual layers:
- Remote full-bleed background image
- Animated subtle aurora overlay
- Noise texture overlay
- Large blurred aurora blob behind hero copy

Actions:
- Design My Trip -> #contact
- Explore Destinations -> #destinations

### 7.3 Destinations

Purpose:
- Showcase 6 curated destination products.

Card content model:
- name
- region
- tagline
- price + currency (badge, "from ...")
- imageUrl
- quickFacts[] (shown on hover overlay)

Interactions:
- Card scale and glow on hover
- Full quick-facts overlay fades in on hover

Current behavior note:
- Cards are presentational only; no click-through route/modal currently implemented.

### 7.4 Signature Experiences

Purpose:
- Communicate breadth and uniqueness of concierge offerings.

Item model:
- icon (emoji)
- title
- description

Layout:
- Responsive card grid with staggered reveal.

### 7.5 Membership

Purpose:
- Present value ladder and promote premium conversion.

Tiers:
- Silver
- Black (featured)
- Obsidian

Tier model:
- name
- tagline
- price (yearly)
- featured flag
- perks[]

Featured-state treatment:
- Black tier receives animated conic border, elevated scale, and "Most Popular" badge.

### 7.6 Testimonials

Purpose:
- Build trust and social proof with premium personas.

Item model:
- name
- role
- quote

Layout:
- Responsive card grid (2 columns from md upward in current implementation).

### 7.7 Concierge Form

Purpose:
- Capture high-value travel request intent.

Fields:
- name (required)
- email (required + format validation)
- travelDates
- travelers (number, min 1, max 20)
- interests (multi-select chip buttons)
- budget (select)
- notes (textarea)

Validation rules:
- Name must be non-empty.
- Email must be non-empty and regex-valid.

Submission behavior:
- Client-only submit.
- Success toast: "Request received" message.
- Form reset on successful validation.

Error behavior:
- Inline error text for name/email.
- aria-invalid applied on invalid inputs.

### 7.8 Footer

Content:
- Brand mark text
- Repeated nav links
- Copyright
- Image source credit (Unsplash)

## 8) Data Contracts

Destination:
- slug, name, region, tagline, price, currency, imageUrl, quickFacts[]

Experience:
- id, title, description, icon

MembershipTier:
- id, name, tagline, price, featured, perks[]

Testimonial:
- id, name, role, quote, optional avatar

NavLink:
- label, href

## 9) Accessibility and UX Quality

Implemented strengths:
- Semantic sectioning with explicit IDs for navigation.
- Focus styles on key controls.
- Keyboard-usable buttons/links.
- aria-label and aria-expanded on mobile menu control.
- Reduced motion support.

Known gaps/opportunities:
- Form errors are not announced via aria-live region.
- Footer nav links currently use anchor href only (no smooth scroll handler there).
- Destination cards do not yet support keyboard-open details since no click action exists.

## 10) Media and Asset Strategy

Images:
- Remote-hosted Unsplash assets in hero and destination cards.

Allowed image domains configured:
- source.unsplash.com
- images.unsplash.com
- images.pexels.com

Credits:
- Footer displays Unsplash attribution link.

## 11) SEO and Metadata

Document metadata present:
- Title: Aurora Luxe Travel | Beyond First Class
- Description and keyword list for luxury travel intent
- Open Graph title/description/siteName/type
- Twitter summary_large_image metadata

## 12) Implementation Map

Primary composition:
- app/page.tsx orchestrates section components in final order.

Shared animation primitive:
- AnimatedSection component provides reusable viewport fade-up reveal.

Styling architecture:
- globals.css defines theme variables, glass and animated-border utilities, reduced-motion handling.
- tailwind.config.ts extends palette, gradients, shadows, keyframes, and custom breakpoints.

## 13) Future Iteration Backlog (Spec-Level)

High-value enhancements:
- Add destination details modal/route with keyboard/focus trap support.
- Add explicit form success and error live regions for improved screen reader announcements.
- Add analytics events for CTA click funnels and form completion.
- Expand testimonial component into optional carousel mode on mobile.