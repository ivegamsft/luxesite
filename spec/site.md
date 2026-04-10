Create a production-ready, visually stunning website with a **futuristic luxury travel** theme.

GOAL
Build a single-page (plus optional “Destination” detail route) website for a fictional brand:
**“AURORA LUXE TRAVEL”** — ultra-premium, concierge-level trips.

TECH STACK (use exactly this unless something breaks)
- Next.js (latest stable) + TypeScript
- Tailwind CSS
- Framer Motion (for scroll/entrance animations)
- next/image for optimized images
- No backend required (mock data in code)

DESIGN DIRECTION
- Futuristic luxury: dark mode, glassmorphism, neon accents, subtle animated gradients, premium typography.
- Palette: near-black background, icy white text, accent gradients (cyan ↔ purple ↔ magenta), soft gold highlights used sparingly.
- Add tasteful micro-interactions: hover lift, glow rings, animated borders, smooth section reveal, parallax-like hero.
- Must be responsive: mobile-first, looks excellent on iPhone + 4K desktop.
- Accessibility: good contrast, focus states, keyboard nav, semantic headings, aria labels.
- Performance: avoid heavy libraries; keep animations smooth; lazy-load imagery.

PAGES / SECTIONS
1) Sticky glass navbar (logo + sections + “Request Itinerary” CTA).
2) HERO
   - Big headline (“Beyond First Class.”)
   - Subtext (luxury concierge pitch)
   - Primary CTA: “Design My Trip”
   - Secondary CTA: “Explore Destinations”
   - A cinematic hero background image with an animated gradient overlay + subtle noise.
3) DESTINATIONS (grid of 6)
   - Each card: name, region, 1-line vibe, “from €X,XXX” (mock)
   - Hover: shimmer + slight tilt + reveal quick facts
   - Clicking opens a modal or navigates to /destinations/[slug] (optional).
4) SIGNATURE EXPERIENCES (3–5)
   - e.g., private jet hops, yacht week, Michelin trails, desert stargazing, alpine retreat.
5) MEMBERSHIP TIERS (3 tiers)
   - “Silver / Black / Obsidian” with perks.
6) TESTIMONIALS (carousel or simple cards)
7) CONCIERGE FORM
   - Fields: name, email, dates, travelers, interests (chips), budget (select), notes
   - Validate on client; on submit show “Request received” toast (no backend).
8) FOOTER
   - Minimal, premium; include image credits.

IMAGERY (IMPORTANT)
Use attractive photos **from the web** that are safe to use. Prefer **Unsplash Source** (no API key) and/or Pexels free images.
Implementation requirement:
- Use remote images (do NOT commit copyrighted assets).
- Configure Next.js to allow the remote image domains.
- Provide a small “Image Credits” list in the footer (“Images via Unsplash Source / Pexels”).
Use these remote image URLs (stable enough) for backgrounds/cards:
- Hero: https://source.unsplash.com/featured/2400x1400?luxury,travel
- Destinations:
  1) https://source.unsplash.com/featured/1200x900?maldives,resort
  2) https://source.unsplash.com/featured/1200x900?tokyo,night,skyline
  3) https://source.unsplash.com/featured/1200x900?switzerland,alps,luxury
  4) https://source.unsplash.com/featured/1200x900?dubai,luxury,hotel
  5) https://source.unsplash.com/featured/1200x900?safari,lodge,luxury
  6) https://source.unsplash.com/featured/1200x900?yacht,mediterranean
(If any URL fails, pick alternatives from Unsplash Source with similar keywords.)

FEATURE POLISH (make it feel premium)
- Use two Google fonts (e.g., Space Grotesk for headings + Inter for body).
- Add a subtle animated “aurora” gradient blob behind the hero text.
- Add a thin animated border (conic gradient) around key CTAs and cards.
- Add scroll-based section reveal (Framer Motion).
- Add “active section” highlight in navbar while scrolling.
- Add a floating “Request Itinerary” button on mobile.
- Add SEO metadata (title, description, OpenGraph) and a nice favicon (simple SVG mark is fine).

PROJECT STRUCTURE
- /app with layout, page, components folder
- components: Navbar, Hero, DestinationGrid, ExperienceList, Tiers, Testimonials, ConciergeForm, Footer
- data: destinations + experiences (typed)
- utilities: classnames helper
- Tailwind config with custom colors, gradients, shadows
- Clean code, no unused deps.

DELIVERABLES
1) A complete repo that runs:
   - npm install
   - npm run dev
   - npm run build
2) A README.md with:
   - What it is
   - How to run
   - Where images come from + credits note
3) Ensure it looks “finished”: spacing, typography scale, consistent radii (rounded-2xl), shadows, transitions.

QUALITY BAR
This must look like a high-end luxury brand landing page (Apple-level polish). No template-y feel. No placeholder Lorem Ipsum except where absolutely necessary.

Now implement it end-to-end.