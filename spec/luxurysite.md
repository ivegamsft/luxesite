# AURORA LUXE - Optimized UI Spec

## 1) Core

**Type:** Single-page, light-theme luxury party and event platform marketing site  
**Goal:** Convert visitors → consultation requests via credibility-first design  
**Content-first approach:** Substance over visual effects

---

## 2) Visual System

### Colors (Hex tokens)

| Token | Hex | Usage |
|-------|-----|-------|
| bg | #f5f3f0 | primary background |
| bg-light | #faf9f7 | alt sections |
| bg-dark | #f0ebe5 | form container |
| text | #2c2620 | body text, headings |
| text-muted | #6b6458 | labels, captions |
| border | #e8e4df | all borders |
| gold | #c9a76a | accent, CTA, hover |
| navy | #1a3a52 | secondary accent |
| sage | #7a8f7f | tertiary |
| success | #5a8f4a | form success |
| error | #a85a4a | form error |

### Typography

| Element | Size | Height | Weight | Letter-spacing |
|---------|------|--------|--------|-----------------|
| h1 | 48px/3rem | 1.2 | 700 | -0.5px |
| h2 | 36px/2.25rem | 1.3 | 700 | -0.25px |
| h3 | 28px/1.75rem | 1.4 | 700 | 0 |
| Body | 16px/1rem | 1.6 | 400 | 0 |
| Small | 14px/0.875rem | 1.5 | 400 | 0.5px |
| Tiny | 12px/0.75rem | 1.5 | 400 | 0.5px |

**Fonts:** Space Grotesk (headings), Inter (body)

### Spacing (8px baseline)

xs: 8px | sm: 12px | md: 16px | lg: 24px | xl: 32px | 2xl: 48px | 3xl: 64px

**Button:** 12px v × 24px h  
**Card:** 24px padding, 16px gap  
**Section:** 48px top/bottom, 16px mobile / 24px tablet / 32px desktop sides  

### Borders & Shadows

- **Standard border:** 1px #e8e4df
- **Focus border:** 2px #c9a76a
- **Radius:** 8px standard, 12px large
- **Subtle shadow:** `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)`
- **Medium shadow:** `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)`
- **Hover lift:** translateY(-4px), swap to medium shadow

---

## 3) Motion

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Fade-in (sections) | 600ms | ease-out | scroll 80% viewport |
| Card hover | 200ms | ease-out | hover |
| Button hover | 150ms | ease-out | hover |
| Input focus | 150ms | ease-out | focus |
| Page load | 300ms | ease-out | load |

**Easing:** ease-out: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | ease-in-out: `cubic-bezier(0.42, 0, 0.58, 1)`

**Delete:** animated conic border, glow effects, pulsing blobs, glassmorphism  
**Parallax (optional):** hero content -15% offset on scroll, desktop only  
**Reduced motion:** all animations → 0ms duration

---

## 4) Responsive

| Breakpoint | Width | Grids | Hero h1 | Section h |
|------------|-------|-------|---------|-----------|
| sm | 640px | 1 col | 32px | 22px |
| md | 768px | 2 col | 40px | 28px |
| lg | 1024px | 3 col | 48px | 32px |
| xl | 1280px | 3 col | 48px | 36px |

**Touch targets:** min 44px height/width  
**Section padding:** sm: 16px, md: 24px, lg: 32px  
**Form width:** 100% mobile, 80% tablet, 60% desktop (max-width: 600px)

---

## 5) Sections (In Order)

### 5.1 Navbar
- Sticky, aurora-bg-light bg, subtle bottom border
- Active section: gold underline via IntersectionObserver
- Mobile: hamburger → vertical nav
- Desktop: inline nav + "Request Consultation" CTA
- All links smooth-scroll to anchors

### 5.2 Hero
**Content:**
- H1: "Award-Winning Event Architects Designing Bespoke Experiences"
- Subhead: "Hand-curated productions. 24/7 event support. Celebrations tailored to you alone."
- CTA 1: "Request Consultation" → #contact
- CTA 2: "Explore Experiences" → #experiences

**Visual:**
- Full-bleed 1920×1080 image (16:9 aspect), 4:3 on tablet, 1:1 on mobile
- Semi-transparent white overlay (15% opacity) for text contrast
- Dark text (aurora-text-dark)
- Optional: subtle parallax scroll (desktop only, -15% offset)

### 5.3 Why Aurora (New: Team + Expertise)
**Structure:**
- Team section: 4-6 cards (photo, name, title, years exp, bio, specialties)
- 3-col lg / 2-col md / 1-col sm
- Differentiators: 3-column grid with icon + headline + 1-2 sentences
  - "24/7 Event Support" — Always available
  - "Hand-Curated" — Every experience designed fresh
  - "Architects" — 12+ years avg expertise

**Background:** aurora-gold-light

### 5.4 Experience Categories
- 12-15 cards (expand from 6)
- Image: 640×480 (4:3), lazy-loaded, WebP + JPG
- Fields: name, category, tagline, price badge, quickFacts (3-4), "Learn More" link
- Hover: lift 4px, shadow medium
- Layout: 3-col lg / 2-col md / 1-col sm

### 5.5 Signature Offerings
- 8 cards: title, description (1-2 sentences), icon, categories
- Examples: Bespoke Productions, Voyages, Celebrations, Adventures, Junior Experiences, Creative Collaborations
- Layout: 3-col lg / 2-col md / 1-col sm

### 5.6 Event Guides (New: Authority)
- 6-8 cards: title, excerpt, read time, featured image, "Read Guide" link
- Image: 640×480 (4:3), lazy-loaded
- Fade-in on scroll
- Layout: 3-col lg / 2-col md / 1-col sm

### 5.7 Testimonials
- 5-8 cards: name, location, role, quote (specific event details), date, optional avatar, optional reference link
- Include 3+ with third-party source verification
- Layout: 2-col lg / 1-col md/sm

### 5.8 Press & Awards (New: Credibility)
- Logo wall: 4-8 logos (major publications, award bodies, etc.)
- Stats below: "Trusted by 1,200+ families and organizations" or similar
- Horizontal scroll mobile, grid desktop
- All links to source

### 5.9 Consultation Form (Request)
**Context above form:**
- Headline: "Ready to Start Planning?"
- Subtitle: "A specialist will reach out within 24 hours to discuss your vision."
- Trust badge: "✓ Trusted by 1,200+ clients" or "✓ 500+ extraordinary experiences designed"

**Fields:**

| Field | Type | Required | Rules | Error Message |
|-------|------|----------|-------|---------------|
| Full Name | text | yes | min 2, max 100 chars | "Enter full name (min 2 chars)" |
| Email | email | yes | RFC 5322 valid | "Enter valid email" |
| Event Date | date/text | no | if filled, future date | "Enter future date" |
| Guest Count | number | no | 1–500 | "1–500 guests" |
| Experience Type | multi-chip | no | 8 options | — |
| Budget | select | no | 4 tiers | — |
| Notes | textarea | no | max 500 chars | "Max 500 characters" |

**Buttons:**
- Submit: aurora-gold bg, white text, bold, 44px min height, full-width mobile
- Reset (desktop only): white bg, border, aurora-text-dark

**Submission:**
- Client-side only (no backend)
- Success toast: "Request received! A specialist will be in touch within 24 hours."
  - Background: aurora-success, white text, top-right desktop / top-center mobile, 5s auto-dismiss
  - Form resets
- Errors: red border (aurora-error), inline error text 4px below field, aria-invalid="true"
- aria-live region: announce form state (polite)

**Form styling:**
- Container: aurora-bg, 1px aurora-border, 8px radius, 32px padding (desktop), 24px (tablet), 20px (mobile)
- Inputs: white bg, 1px aurora-border, focus 2px aurora-gold
- Labels: 16px above field, 8px gap to input
- Textarea: 120px min height, 300px max, scrollable

### 5.10 Footer
- Logo (left)
- Quick links: Experiences, Guides, About, Contact
- Contact: phone + email
- Optional: social links
- Copyright + image credits
- Background: aurora-bg-light or aurora-navy

---

## 6) Images

### Dimensions & Specs

| Image | Width × Height | Aspect | Format | Max Size | Count |
|-------|---|---|---|---|---|
| Hero | 1920×1080 | 16:9 | JPG/WebP | 300KB | 1–2 |
| Destination card | 640×480 | 4:3 | JPG/WebP | 150KB | 12–15 |
| Guide featured | 640×480 | 4:3 | JPG/WebP | 150KB | 6–8 |
| Team headshot | 400×400 | 1:1 | JPG/WebP | 100KB | 4–6 |
| Testimonial avatar | 64×64 or 120×120 | 1:1 | JPG/PNG | 30KB | optional |
| Press/Award logo | 150–250w | varies | PNG/SVG | 50KB | 4–8 |

**All images:**
- Compressed (TinyPNG, ImageOptim, etc.)
- WebP primary + JPG fallback
- Responsive srcset (640w, 1024w, 1920w)
- Lazy loading (loading="lazy") for below-fold
- Alt text (descriptive, not keyword-stuffed)
- Attribution in footer (Unsplash, photographer, etc.)

**Sourcing:**
- Hero: commission OR premium stock (Shutterstock, iStock) OR curated Unsplash/Pexels
- Destinations: commission OR tourism boards OR stock OR high-quality free sources
- Team: professional photographer (required for credibility)
- Other: Unsplash/Pexels OK with attribution

---

## 7) Data Models

### Team Member
```json
{ "id": "team-001", "name": "Sarah Chen", "title": "Africa Specialist", 
  "bio": "14 years...", "photoUrl": "/img/team/sarah.jpg", 
  "yearsExperience": 14, "specialties": ["Botswana", "Kenya", ...] }
```

### Destination
```json
{ "id": "dest-001", "slug": "okavango-delta", "name": "Okavango Delta", 
  "region": "Botswana", "tagline": "Big Five Safaris at Dawn", 
  "imageUrl": "/img/dest/okavango.jpg", "fromPrice": 8500, "currency": "USD",
  "quickFacts": ["Best time: April–October", "4–7 days", ...] }
```

### Travel Guide
```json
{ "id": "guide-001", "title": "Complete Botswana Safari Guide", 
  "excerpt": "...", "readTime": "12 min read", "imageUrl": "/img/guides/bot.jpg", 
  "link": "/guides/botswana", "author": "Sarah Chen" }
```

### Testimonial
```json
{ "id": "testimonial-001", "name": "James & Margaret", "location": "NY", 
  "role": "Honeymoon Kenya/Tanzania", "quote": "Sarah designed...", 
  "date": "2024-01-15", "rating": 5, "sourceLink": "https://trustpilot..." }
```

### Experience
```json
{ "id": "exp-001", "title": "Wildlife Safaris", "description": "Led by...", 
  "icon": "safari-binoculars", "regions": ["Botswana", "Kenya", ...] }
```

### Press/Award
```json
{ "id": "award-001", "name": "Condé Nast Traveler", 
  "logo": "/img/awards/conde-nast.png", "link": "https://..." }
```

---

## 8) Accessibility

✅ Semantic HTML (nav, section, article with IDs)  
✅ Color contrast ≥4.5:1 (WCAG AA)  
✅ Focus styles (gold underline or border)  
✅ Keyboard-navigable (all interactive elements)  
✅ aria-label on icon buttons, aria-expanded on mobile menu  
✅ aria-invalid + aria-live on form errors  
✅ Reduced motion support (prefers-reduced-motion: all animations → 0ms)  

---

## 9) SEO & Metadata

**Document meta:**
- Title: "Aurora Luxe | Award-Winning Event Architects & Experience Designers"
- Description: "Bespoke luxury events and experiences by architects. Curated productions, 24/7 event support, celebrations designed for you alone."
- Keywords: luxury events, bespoke experiences, party planning, event design, experience architects, [categories]
- OG: title, description, image (1200×630), type (website)
- Twitter: summary_large_image

**Structured data:**
- Schema.org LocalBusiness (name, phone, address, hours, reviews)
- Schema.org BreadcrumbList (future: multi-page)

---

## 10) Content Checklist (Before Launch)

- [ ] 4–6 team bios with photos (professional headshots)
- [ ] 12–15 destinations with high-quality images, taglines, quickFacts
- [ ] 5–8 testimonials (names, dates, specific details, Trustpilot links if available)
- [ ] 6–8 travel guides (title, excerpt, featured image, link)
- [ ] Credibility claims documented (avg years exp, awards, certifications)
- [ ] 4–8 press logos with source links (Condé Nast, Forbes, etc.)
- [ ] Hero image (1920×1080, high quality)
- [ ] All images optimized & compressed

---

## 11) Implementation Notes

**Components:**
- Navbar (sticky, light)
- Hero (image-centric)
- TeamGrid, WhyUs, DestinationGrid, ExperienceGrid, GuideGrid, TestimonialGrid, AwardsSection, Form, Footer

**Styling:**
- Tailwind config: extend with aurora color tokens, shadows (subtle), radius (8px default)
- globals.css: theme vars, spacing scale, typography, reduced-motion
- No custom animations (fade-in/hover lift only)

**Scroll behavior:**
- smooth-scroll on nav links (browser native or Intersection Observer)
- IntersectionObserver for active nav highlighting
- Fade-in on scroll for sections (Intersection Observer + opacity animation)

---

## 12) Future Phases

**Phase 2:** Destination detail pages, expanded guides, testimonial videos, blog, backend integration, analytics  
**Phase 3:** Interactive itinerary builder, personalized recommendations, live chat, client portal