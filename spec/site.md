# AURORA LUXE - Reverse-Engineered UI Spec (Design-MD Style)

## 1) Product Summary

Aurora Luxe is a single-page, high-end luxury party and event platform marketing and lead-capture experience.

Primary goal:
- Convert high-intent visitors into consultation requests via section CTAs and a premium inquiry form.

Secondary goals:
- Communicate exclusivity, discretion, and bespoke service quality.
- Showcase curated experiences, signature offerings, and pricing tiers.

Current implementation scope:
- Single landing page composed of 8 stacked sections.
- No backend integration (client-only form submit success toast).

## 2) Experience Principles

Brand expression:
- Warm ivory editorial palette, champagne gold accents, restrained elegance.
- Editorial headline tone with concise premium copy.

Interaction principles:
- Motion supports clarity (entrance reveals, hover emphasis, scroll context).
- CTA path is always available (navbar button, hero actions, floating mobile CTA).
- Perceived quality through subtle depth, shadow lift, and animation timing.

## 3) Information Architecture

Section order (top to bottom):
1. Sticky Navbar
2. Hero
3. Experience Categories
4. Signature Offerings
5. Pricing Tiers
6. Testimonials
7. Consultation Form
8. Footer

Anchor map:
- #hero
- #experiences
- #offerings
- #tiers
- #testimonials
- #contact

Global navigation labels:
- Experiences
- Offerings
- Tiers
- Testimonials
- Contact

## 4) Visual System

Color tokens (CSS custom properties + Tailwind extension):
- aurora-bg: #f5f3f0 (warm ivory page background)
- aurora-bg-light: #faf9f7 (card surfaces)
- aurora-bg-dark: #f0ebe5 (alternate section backgrounds)
- aurora-gold: #c9a76a (primary accent, CTAs, hover states)
- aurora-navy: #1a3a52 (hero overlay, tiers, footer)
- aurora-sage: #7a8f7f (tertiary accent)
- aurora-text: #2c2620 (body text, headings)
- aurora-text-muted: #6b6458 (labels, captions)
- aurora-border: #e8e4df (all borders)

Typography:
- Heading: Space Grotesk (700 weight, fluid clamp() scale for headings)
- Body: Inter (400 weight, fixed 1rem)
- Headline usage: bold, restrained tracking, large scale in hero

Surfaces and elevation:
- Cards: warm ivory fill + subtle border + shadow lift on hover
- Shadows: subtle (resting), medium (hover), lift (interactive)
- Rounded geometry: sm for cards, lg for buttons/inputs, full for pills

## 5) Motion and Interaction System

Core motion patterns:
- Section reveal: fade-up on first viewport entry
- Grid stagger: child cards animate in sequence
- Hover lift: translateY(-4px) + shadow upgrade for cards and buttons

Hero-specific motion:
- Optional subtle parallax on desktop only (-15% offset)
- Content entrance fade on load

Special effects:
- Featured tier receives visual emphasis (scale, border treatment)
- Floating scroll indicator in hero

Reduced motion policy:
- Global respect for prefers-reduced-motion (near-zero animation duration, no animated border loop)

## 6) Responsive Behavior

Breakpoint strategy:
- Mobile-first layout with progressive enhancement at md/lg/xl/2xl.

Key adaptations:
- Navbar collapses to hamburger menu below md.
- CTA buttons stack vertically on small screens in hero.
- Experience/tier/testimonial grids collapse to single-column on small screens.
- Floating Request Consultation CTA appears on mobile only after passing hero height.

Touch/access sizing:
- Interactive controls target min-height of 44px across primary touch elements.

## 7) Section Specs

### 7.1 Navbar (Sticky Glass)

Purpose:
- Persistent orientation and quick jumps to page sections.

Behavior:
- Sticks to top with glass treatment.
- Active section highlighting is driven by IntersectionObserver.
- Desktop: inline nav + Request Consultation CTA.
- Mobile: toggle menu, section links, full-width CTA.

Actions:
- All nav links smooth-scroll to anchors.
- Request Consultation scrolls to #contact.

### 7.2 Hero

Content:
- H1: Architects of the Extraordinary.
- Luxury party design value proposition paragraph.
- Primary CTA: Plan an Experience
- Secondary CTA: Explore Categories

Visual layers:
- Remote full-bleed background image
- Animated subtle aurora overlay
- Noise texture overlay
- Large blurred aurora blob behind hero copy

Actions:
- Plan an Experience -> #contact
- Explore Categories -> #experiences

### 7.3 Experience Categories

Purpose:
- Showcase 6 curated experience categories.

Card content model:
- name
- category
- tagline
- price + currency (badge, "from ...")
- imageUrl
- quickFacts[] (shown on hover overlay)

Interactions:
- Card scale and glow on hover
- Full quick-facts overlay fades in on hover

Current behavior note:
- Cards are presentational only; no click-through route/modal currently implemented.

### 7.4 Signature Offerings

Purpose:
- Communicate breadth and uniqueness of party and event design services.

Item model:
- icon (emoji)
- title
- description

Layout:
- Responsive card grid with staggered reveal.

### 7.5 Pricing Tiers

Purpose:
- Present value ladder and promote engagement conversion.

Tiers:
- One Time ($500K)
- Yearly ($1.2M/yr, featured)
- Gift ($250K)

Tier model:
- name
- tagline
- price
- featured flag
- perks[]

Featured-state treatment:
- Yearly tier receives animated conic border, elevated scale, and "Most Popular" badge.

### 7.6 Testimonials

Purpose:
- Build trust and social proof with premium personas.

Item model:
- name
- role
- quote

Layout:
- Responsive card grid (2 columns from md upward in current implementation).

### 7.7 Consultation Form

Purpose:
- Capture high-value event and experience inquiry intent.

Fields:
- name (required)
- email (required + format validation)
- eventDate
- guestCount (number, min 1, max 500)
- experienceType (multi-select chip buttons)
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

ExperienceCategory:
- slug, name, category, tagline, price, currency, imageUrl, quickFacts[]

Offering:
- id, title, description, icon

PricingTier:
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
- Experience cards do not yet support keyboard-open details since no click action exists.

## 10) Media and Asset Strategy

Images:
- Remote-hosted Unsplash assets in hero and experience cards.

Allowed image domains configured:
- source.unsplash.com
- images.unsplash.com
- images.pexels.com

Credits:
- Footer displays Unsplash attribution link.

## 11) SEO and Metadata

Document metadata present:
- Title: Aurora Luxe | Architects of the Extraordinary
- Description and keyword list for luxury experiential events
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
- Add experience details modal/route with keyboard/focus trap support.
- Add explicit form success and error live regions for improved screen reader announcements.
- Add analytics events for CTA click funnels and form completion.
- Expand testimonial component into optional carousel mode on mobile.