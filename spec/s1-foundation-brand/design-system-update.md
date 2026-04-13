# Design System Update Spec — Aurora Luxe Brand Pivot

> **Issue:** #196
> **Author:** Trinity (Frontend Developer)
> **Status:** Draft
> **Date:** 2026-04-11
> **Scope:** Specs only — no code changes
> **Input:** `spec/brand-pivot.md`, `.impeccable.md`, `apps/web/app/globals.css`, `apps/web/tailwind.config.ts`

---

## 1. Scope

### What Changes

- **`.impeccable.md`** — User persona, brand context, references, anti-references, and travel→party platform language
- **Component patterns** — New CSS patterns for ExperiencePortfolio, FeaturedPackages, category pills, expanded form fields
- **Icon system** — 6 new category icons
- **Motion** — Animation patterns for category hover, carousel, progressive disclosure
- **Typography** — New typographic pattern for category headers and package cards

### What's Frozen

- **Color palette** — All existing tokens stay (`aurora-bg`, `aurora-gold`, `aurora-navy`, etc.)
- **Typography system** — Space Grotesk + Inter, fluid clamp() scale, all 6 steps
- **Design principles** — All 5 unchanged
- **Corner radius hierarchy** — `rounded-sm` cards, `rounded-lg` buttons/inputs, `rounded-full` pills (Decision #3)
- **SVG icon approach** — Monoline, 24×24 viewBox, `currentColor` stroke, 1.5px weight
- **Spacing scale** — All `--space-*` tokens, all `--space-section-*` tokens
- **Shadows** — `subtle`, `medium`, `lift` unchanged
- **Base styles** — `globals.css` structure, scroll behavior, selection, reduced-motion support

### Why Freeze the Visual System

The brand pivot changes *what Aurora Luxe sells*, not *how it looks*. The warm-ivory editorial identity is brand equity. Changing content and components within the existing design system teaches learners the production pattern: a well-built design system absorbs business pivots without visual rework.

---

## 2. Color Palette

### Existing Tokens — No Changes

| Token | Value | Usage |
|---|---|---|
| `--aurora-bg` | `#f5f3f0` | Page background |
| `--aurora-bg-light` | `#faf9f7` | Card surfaces |
| `--aurora-bg-dark` | `#f0ebe5` | Alternate section backgrounds |
| `--aurora-gold` | `#c9a76a` | Primary accent |
| `--aurora-navy` | `#1a3a52` | Hero overlay, tiers, footer |
| `--aurora-text` | `#2c2620` | Body text, headings |
| `--aurora-text-muted` | `#6b6458` | Labels, captions |
| `--aurora-border` | `#e8e4df` | All borders |
| `--aurora-success` | `#5a8f4a` | Success states |
| `--aurora-error` | `#a85a4a` | Error states |

### Category Accent Colors — Not Adding

Each experience category does **not** get its own accent color. Rationale:

1. **Authority through restraint** — A 6-color category palette would turn the editorial layout into a children's party site. The champagne gold accent works for all categories.
2. **The icon + typography do the differentiation work** — Each category has a distinct icon and title. Color coding adds noise, not clarity.
3. **Teaching note** — This is a deliberate design decision: resist the urge to add category colors. Learners should see that a constrained palette scales.

**Exception: Category pills** use `aurora-navy` background with `aurora-bg-light` text — the same navy treatment used in the tier badges. This keeps category tagging visually consistent with existing badge patterns.

---

## 3. Typography

### Existing Scale — No Changes

| Step | Token | Range |
|---|---|---|
| `--fluid-sm` | 13px → 14px | Captions, metadata |
| `--fluid-base` | 15px → 16px | Body text |
| `--fluid-lg` | 20px → 28px | Card titles, section subheads |
| `--fluid-xl` | 24px → 36px | Section headings |
| `--fluid-2xl` | 28px → 48px | Major section headings |
| `--fluid-3xl` | 48px → 80px | Hero display |

### New Typographic Patterns

#### 3.1 Category Header (ExperiencePortfolio)

```
Font: Space Grotesk (font-heading)
Size: --fluid-xl (24px → 36px)
Weight: 700
Letter-spacing: -0.02em
Color: aurora-text
```

Category description below the header:

```
Font: Inter (font-sans)
Size: --fluid-base
Weight: 400
Line-height: 1.75
Color: aurora-text-muted
Max-width: 38rem (matches .section-intro)
```

#### 3.2 Package Card Title (FeaturedPackages)

```
Font: Space Grotesk (font-heading)
Size: --fluid-lg (20px → 28px)
Weight: 600
Letter-spacing: -0.01em
Color: aurora-text
```

#### 3.3 Package Card Metadata (duration, guests, location)

```
Font: Inter (font-sans)
Size: --fluid-sm (13px → 14px)
Weight: 500
Letter-spacing: 0.03em
Text-transform: uppercase
Color: aurora-text-muted
```

This echoes the metadata treatment on existing event cards — small, uppercase, muted. Consistent pattern.

#### 3.4 Price Display

Carries forward the existing "typographic, not badge" decision (Decision #4). Package prices use:

```
Font: Space Grotesk (font-heading)
Size: --fluid-base
Weight: 500
Color: aurora-gold
Opacity: 0.85
```

No pill. No background. The number speaks.

#### 3.5 Category Pill / Badge

```
Font: Inter (font-sans)
Size: --fluid-sm
Weight: 600
Letter-spacing: 0.04em
Text-transform: uppercase
Padding: 0.25rem 0.75rem (--space-xs horizontal, 4px vertical)
Background: aurora-navy
Color: aurora-bg-light (#faf9f7)
Border-radius: rounded-full (per Decision #3 — pills get full rounding)
```

---

## 4. Component Patterns

### 4.1 ExperiencePortfolio Card (replaces EventGrid)

**Layout:** 2-column grid on desktop (`md:`), single column on mobile. Cards have **varied heights** — the editorial hierarchy principle demands that no two cards feel structurally identical.

**Card anatomy:**

```
┌──────────────────────────────────┐
│  [Full-bleed image]              │  aspect-ratio: 4/3 (default)
│                                  │  aspect-ratio: 3/4 (tall variant, every 3rd card)
│  ┌──────────────────────────┐    │
│  │ Category icon (24×24)    │    │  Overlay: bottom gradient (navy→transparent)
│  │ CATEGORY TITLE           │    │  font-heading, --fluid-xl, white, weight 700
│  │ 2–3 sample package names │    │  font-sans, --fluid-sm, white/80
│  │ Explore →                │    │  font-sans, --fluid-sm, aurora-gold
│  └──────────────────────────┘    │
└──────────────────────────────────┘
```

**Hover behavior:**
- Image: `scale(1.03)` over `500ms ease-out` (subtle parallax, not zoom)
- Package titles: `opacity 0 → 1`, `translateY(8px) → 0` over `400ms ease-out`, staggered 50ms
- "Explore →" arrow: `translateX(0) → translateX(4px)` — reuses existing `bounceX` keyframe

**Container query:** At `@container (max-width: 480px)`, title drops to `--fluid-lg`, sample packages hide.

**Surface treatment:**
- Reuses `.surface-card` base (bg-light, border, subtle shadow)
- Image container gets `overflow-hidden rounded-sm` (card corners, per Decision #3)
- Bottom overlay: `linear-gradient(to top, rgba(26,58,82,0.85), transparent 60%)`

**Accessibility:**
- Each card is an `<article>` with `aria-label` describing the category
- "Explore" link is the only interactive element (no full-card click trap)
- Image has `alt=""` (decorative — the title carries the meaning)
- Touch: tap reveals package titles (existing hover→tap pattern from event cards)
- `tabIndex={0}` + `role="link"` on the explore action

### 4.2 FeaturedPackages Card & Carousel (replaces ExperienceList)

**Layout:** Horizontal scroll container with snap points. First card is **1.5× width** of subsequent cards (magazine spread feel per brand-pivot §7.3).

**Scroll container:**

```css
.featured-scroll {
  display: flex;
  gap: var(--space-lg);           /* 24px */
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-left: var(--space-xl);  /* 32px — left peek */
  padding: var(--space-lg) var(--space-xl);
}

.featured-scroll > * {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

**Card anatomy:**

```
┌──────────────────────────┐
│  [Image]                 │  aspect-ratio: 3/4
│                          │  rounded-sm, overflow-hidden
├──────────────────────────┤
│  [Category pill]         │  aurora-navy bg, uppercase
│  Package Title           │  font-heading, --fluid-lg, weight 600
│  Duration · Guest range  │  font-sans, --fluid-sm, muted, uppercase
│  From $12,000            │  font-heading, --fluid-base, aurora-gold
└──────────────────────────┘
```

**Card sizing:**
- Featured (first) card: `width: clamp(320px, 45vw, 480px)`
- Standard cards: `width: clamp(260px, 30vw, 340px)`

**Hover behavior:**
- Card: `shadow-subtle → shadow-medium` over `300ms ease-out`
- Image: `scale(1.02)` over `400ms ease-out`

**Scroll affordance:**
- Right edge peek (partial card visible) signals scrollability
- Reuse `.scrollbar-hide` utility from existing globals.css
- Mobile: touch scroll. Desktop: scroll buttons appear on hover (left/right chevrons, 44px touch targets)

**Accessibility:**
- Container: `role="region"` with `aria-label="Featured experience packages"`
- Cards: `<article>` elements
- Scroll buttons: `aria-label="Scroll left"` / `"Scroll right"`, hidden when at boundary
- `prefers-reduced-motion`: disable image scale, instant shadow transitions
- Keyboard: left/right arrow keys navigate between cards when container is focused

### 4.3 Category Pill / Badge

Reusable component for tagging packages, testimonials, and guides with their category.

```tsx
// Pattern — not implementation
<span className="
  inline-flex items-center
  rounded-full
  bg-aurora-navy text-aurora-bg-light
  px-3 py-1
  font-sans text-fluid-sm font-semibold
  uppercase tracking-wider
">
  {category.label}
</span>
```

**Variant: Outline pill** (for use on dark backgrounds like tiers/footer):

```
Border: 1px solid aurora-gold
Background: transparent
Color: aurora-gold
```

### 4.4 Tier Card Visual Differentiation

The three tiers are **different transaction types**, not levels of a hierarchy. Each tier card should communicate its distinct mindset through visual treatment while sharing the same structural anatomy.

**Shared anatomy (all tiers):**
```
┌──────────────────────────────────┐
│  Tier Name                       │  font-heading, --fluid-xl, weight 700
│  Tagline                         │  font-sans, --fluid-base, aurora-text-muted
│  Price                           │  font-heading, --fluid-lg, aurora-gold
│  ────────────────────────────    │  Divider: aurora-border
│  Perks list                      │  font-sans, --fluid-base
│  [CTA Button]                    │  Rounded-lg, tier-specific styling
└──────────────────────────────────┘
```

**Per-tier visual treatment:**

| Aspect | One Time | Yearly | Gift |
|---|---|---|---|
| **Mindset** | Bold, decisive, event-focused | Warm, relationship-oriented, subscription | Elegant, celebratory, gift-giving |
| **Card surface** | `aurora-navy` background, light text | `aurora-bg-light` background, featured flag, gold border-top | `aurora-bg-light` background, subtle gold shimmer border |
| **CTA label** | "Plan My Event" | "Start My Year" | "Send a Gift" |
| **CTA style** | Solid `aurora-gold` bg, `aurora-navy` text | Solid `aurora-navy` bg, `aurora-bg-light` text | Outline `aurora-gold` border, `aurora-gold` text |
| **Badge** | None | "Most Popular" — `aurora-gold` bg, `aurora-navy` text | "Gift Experience" — outline pill, `aurora-gold` |
| **Icon hint** | Single event calendar | Yearly cycle / family silhouette | Gift box / ribbon |

**Why not three radically different designs?** Authority through restraint. The shared anatomy keeps the tier section scannable. The differentiation is in color treatment and copy — not in structural divergence. Learners should see that a design system handles variation through tokens and variants, not through one-off layouts.

**Teaching note:** The One Time tier uses `aurora-navy` as its card background (the same navy used in the hero and footer). This is the "hero treatment" — it signals that One Time is the primary conversion path. The Yearly tier uses the `featured: true` flag to add a gold accent. The Gift tier's outline treatment signals a lighter commitment (buying for someone else).

### 4.5 Updated Form Field Patterns (ConciergeForm expansion)

**New field types needed:**

| Field | Pattern | Notes |
|---|---|---|
| Experience type | `<select>` dropdown | Reuse existing `LuxeSelect` pattern from Hero discovery row |
| Audience | `<select>` dropdown | Same pattern |
| Scale | `<select>` dropdown | Same pattern |
| Safety considerations | `<textarea>` | Same pattern as existing Notes field, 300 char max |
| Preferred location | `<input type="text">` with placeholder | Standard text input, no autocomplete needed |

**Progressive disclosure animation:**
- Fields reveal with `height: 0 → auto`, `opacity: 0 → 1` over `300ms ease-out`
- Uses existing `AnimatePresence` + `motion.div` pattern (per Decision #4, Trinity history)
- `prefers-reduced-motion`: instant reveal, no height animation

**Conditional field groups:**
- When "Junior Experience" selected: safety considerations group slides in at Step 2 position
- When "Production" or "Adventure" selected: scale dropdown appears in Step 2
- When "Bespoke" selected: all optional fields collapse, Notes textarea expands with placeholder "Tell us everything"

**No new styling tokens needed.** All form fields use existing patterns:
- `rounded-lg` corners (Decision #3)
- `bg-aurora-bg-light` background
- `border border-aurora-border` border
- `focus:ring-2 focus:ring-aurora-gold/30` focus ring
- `p-6 sm:p-8 md:p-10 lg:p-12` container padding (per Trinity history: form container padding)

---

## 5. Spacing & Layout

### Section Rhythm for New Sections

The existing section spacing tokens provide varied rhythm. New sections map as follows:

| Section | Spacing Token | Rationale |
|---|---|---|
| ExperiencePortfolio | `--space-section-lg` | Major content section — needs room to breathe, same weight as old EventGrid |
| FeaturedPackages | `--space-section-md` | Secondary content section — slightly tighter than portfolio |
| Between Portfolio → Packages | `--space-section-xs` | Tighter coupling — these are related content blocks |

### New Layout Patterns

**ExperiencePortfolio grid:**
```css
/* Desktop: 2-column with varied heights */
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: var(--space-lg);  /* 24px */

/* Mobile: single column */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
}
```

**FeaturedPackages scroll track:**
```css
/* Horizontal scroll with section-level padding */
padding-left: max(var(--space-xl), calc((100vw - 1440px) / 2 + var(--space-xl)));
padding-right: var(--space-xl);
```

This pattern ensures the first card aligns with the page's max-width container while allowing the scroll track to extend to the viewport edge — a common editorial pattern.

### Card Internal Spacing

| Element | Spacing | Token |
|---|---|---|
| Image → content area | `--space-lg` (24px) | Breathing room between image and text |
| Title → metadata | `--space-sm` (12px) | Tight coupling — related information |
| Metadata → price | `--space-md` (16px) | Slight separation for price emphasis |
| Category pill → title | `--space-sm` (12px) | Pill is a label for the title |
| Card padding (text area) | `--space-lg` (24px) | Matches existing surface-card internal padding |

---

## 6. Motion

### New Animation Patterns

All animations respect `prefers-reduced-motion` (existing pattern: CSS media query + `useReducedMotion()` for Framer Motion).

#### 6.1 Category Card Hover (ExperiencePortfolio)

| Property | From | To | Duration | Easing |
|---|---|---|---|---|
| Image scale | `1` | `1.03` | `500ms` | `ease-out` |
| Package titles opacity | `0` | `1` | `400ms` | `ease-out` |
| Package titles translateY | `8px` | `0` | `400ms` | `ease-out` |
| Package titles stagger | — | — | `50ms` per item | — |
| Arrow translateX | `0` | `4px` | `300ms` | `ease-out` (reuse `bounceX` keyframe) |

**Reduced motion:** Image scale stays `1`. Titles visible by default (no reveal). Arrow static.

#### 6.2 Carousel Scroll (FeaturedPackages)

No CSS animation on scroll — scroll behavior is native. Animations are on individual cards:

| Property | From | To | Duration | Easing |
|---|---|---|---|---|
| Card shadow (hover) | `shadow-subtle` | `shadow-medium` | `300ms` | `ease-out` |
| Card image scale (hover) | `1` | `1.02` | `400ms` | `ease-out` |

**Scroll buttons:** `opacity: 0 → 1` on container hover, `200ms ease-out`.

**Reduced motion:** No image scale. Instant shadow. Buttons always visible.

#### 6.3 Progressive Disclosure (ConciergeForm)

| Property | From | To | Duration | Easing |
|---|---|---|---|---|
| Field group height | `0` | `auto` | `300ms` | `ease-out` |
| Field group opacity | `0` | `1` | `300ms` | `ease-out` |
| Conditional field slide-in | `translateY(-8px)` | `translateY(0)` | `250ms` | `ease-out` |

Uses Framer Motion `AnimatePresence` + `motion.div` with `layout` prop for smooth reflow.

**Reduced motion:** Instant show/hide. No height or opacity animation.

#### 6.4 Category Pill Interaction

No animation on pills. They're labels, not buttons. Static presence reinforces their informational role.

---

## 7. Icon System

### Existing Approach — Unchanged

Inline monoline SVGs. 24×24 viewBox. `currentColor` stroke. 1.5px stroke-width. Keyed by ID via an icon map (existing `experienceIcons` pattern from ExperienceList).

### 6 New Category Icons

| Category | Icon Concept | Visual Description |
|---|---|---|
| **Voyages** | Compass rose | Four-point compass with a circle center. Directional, not geographic. |
| **Celebrations** | Champagne flute | Single elegant glass with bubbles (2–3 small circles rising). Not a party hat. |
| **Adventures** | Summit flag | Mountain peak silhouette with small flag at apex. Conveys aspiration. |
| **Productions** | Director's clapperboard | Classic film slate, slightly ajar. Signals cinematic scale. |
| **Junior** | Rocket ship | Simple rocket silhouette with exhaust trail. Playful but clean. |
| **Bespoke** | Diamond | Faceted gem outline. Communicates custom craftsmanship. |

**Style rules (carry forward from Decision #3):**
- Monoline only — no filled shapes
- `stroke="currentColor"` — inherits text color
- `strokeWidth="1.5"` — consistent across all icons
- `strokeLinecap="round"` and `strokeLinejoin="round"` — soft terminals
- `fill="none"` — outline only
- Sizing: 24×24 default, 32×32 variant for category cards (scaled via `w-8 h-8`)

**Icon map extension:**
```typescript
// Extend existing experienceIcons map
const categoryIcons: Record<ExperienceCategory, React.FC<SVGProps>> = {
  voyages: CompassIcon,
  celebrations: ChampagneIcon,
  adventures: SummitIcon,
  productions: ClapperboardIcon,
  junior: RocketIcon,
  bespoke: DiamondIcon,
};
```

---

## 8. Updates to `.impeccable.md`

Exact changes per brand-pivot.md §7.2. Line references are approximate — match on content, not line number.

### 8.1 User Persona Update

**Current (line ~6):**
```
Ultra-high-net-worth individuals and affluent travelers considering bespoke concierge travel services. They browse aspirationally — often in the evening on high-end devices (MacBook Pro, iPad Pro, iPhone Pro Max). Budget ranges span $5K to $100K+ per trip. They compare against Aman Resorts, Black Tomato, Scott Dunn, and Four Seasons Private Jet. They expect discretion, authority, and white-glove service reflected in every pixel.
```

**Replace with:**
```
Ultra-high-net-worth individuals and affluent experience-seekers considering bespoke luxury event planning — from landmark galas and milestone birthdays to year-round family celebrations and curated gift experiences. They browse aspirationally — often in the evening on high-end devices (MacBook Pro, iPad Pro, iPhone Pro Max). Budget ranges span $250,000 to $1,200,000+. They compare against elite event planners, luxury concierge services, and high-end production houses. They expect discretion, authority, and white-glove service reflected in every pixel.

Three transaction types, three mindsets:
- One Time ($500,000) — Decisive clients planning a single landmark event. They want bold vision and flawless execution.
- Yearly ($1,200,000/yr) — Families investing in a year of celebrations. They want a trusted partner who knows their children's names.
- Gift ($250,000) — Generous buyers gifting an experience to someone they love. They want elegance, surprise, and effortless giving.
```

### 8.2 Brand Context Update

**Current (line ~8):**
```
**Context**: Single-page marketing site. The job is to convert high-intent visitors into concierge requests. Secondary job: communicate exclusivity and build enough trust to justify $50K+ trip budgets.
```

**Replace with:**
```
**Context**: Single-page marketing site. The job is to convert high-intent visitors into event planning consultations. Secondary job: communicate exclusivity, creative range, and production capability — building enough trust to justify $250K–$1.2M experience commitments across three transaction types: One Time (single event), Yearly (subscription), and Gift (third-party purchase).
```

### 8.3 References Update

**Current (line ~22):**
```
- **References**: Aman Resorts (restraint, materials), Rolls-Royce (authority), Monocle (editorial hierarchy), Aesop (warm minimalism), Four Seasons (light luxury, dark hero overlays)
```

**Replace with:**
```
- **References**: Aman Resorts (restraint, materials), Rolls-Royce (authority), Monocle (editorial hierarchy), Aesop (warm minimalism), Four Seasons (light luxury, dark hero overlays), The Ritz-Carlton (service standard), Meow Wolf (immersive scale)
```

### 8.4 Anti-References Update

**Current (line ~21):**
```
- **Anti-references**: Generic AI-generated sites (cyan gradients, glass cards, neon-on-dark, 3-column icon+title+desc), cruise ship brochures, overly minimal SaaS landing pages, any site that screams "template"
```

**Replace with:**
```
- **Anti-references**: Generic AI-generated sites (cyan gradients, glass cards, neon-on-dark, 3-column icon+title+desc), generic event planning sites, children's party template sites, corporate retreat brochures, overly minimal SaaS landing pages, any site that screams "template"
```

### 8.5 Travel → Party Platform Language

Search-and-replace the following in `.impeccable.md`. Replace all travel-oriented language with party/event planning context.

| Find | Replace | Location |
|---|---|---|
| "Aurora Luxe Travel" | "Aurora Luxe" | Title |
| "concierge travel services" | "bespoke luxury event planning" | Users section |
| "affluent travelers" | "affluent experience-seekers" | Users section |
| "$5K to $100K+ per trip" | "$250,000 to $1,200,000+" | Users section |
| "$50K+ trip budgets" | "$250K–$1.2M experience commitments" | Context section |
| "concierge requests" | "event planning consultations" | Context section |
| "cruise ship brochures" | "generic event planning sites, children's party template sites, corporate retreat brochures" | Anti-references |

**Note:** The `.impeccable.md` updates also add a three-tier mindset section under Users to describe the One Time, Yearly, and Gift transaction types — see §8.1 for full replacement text.

---

## 9. Tailwind Token Changes

### New CSS Custom Properties

**No new color tokens.** (See §2 rationale.)

**No new spacing tokens.** Existing scale covers all new patterns.

**No new typography tokens.** Existing fluid scale covers all new text sizes.

### New CSS Utility Classes in `globals.css`

#### 9.1 Featured Scroll Container

```css
/* ── Featured Packages — horizontal scroll ───────────────────────── */
.featured-scroll {
  display: flex;
  gap: var(--space-lg);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-left: var(--space-xl);
  padding: var(--space-lg) var(--space-xl);
}

.featured-scroll > * {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

#### 9.2 Category Card Overlay

```css
/* ── Category Card — bottom gradient overlay ─────────────────────── */
.category-overlay {
  background: linear-gradient(
    to top,
    rgba(26, 58, 82, 0.85),
    transparent 60%
  );
}
```

#### 9.3 Container Query for ExperiencePortfolio

```css
/* Experience portfolio cards — adapt text at narrow containers */
@container (max-width: 480px) {
  .portfolio-card h3 { font-size: var(--fluid-lg); }
  .portfolio-card .package-list { display: none; }
}
```

### Tailwind Config Extensions

No changes to `tailwind.config.ts`. The existing theme extension covers all needed utilities. New patterns use existing tokens via CSS custom properties in `globals.css`.

**Rationale:** The config already mirrors globals.css tokens. Adding more config entries would create duplication. CSS-first is the pattern for Tailwind v4 (which uses `@theme inline` in globals.css as the source of truth).

---

## 10. Teaching Notes

### What This Spec Demonstrates About Design Systems

1. **Design system stability absorbs business pivots.** The entire visual system (colors, type, spacing, shadows, radii) is frozen. Only component patterns and content change. This is the payoff of investing in a token-based system — the business can pivot without a redesign.

2. **Restraint over expansion.** The instinct when adding 6 categories is to add 6 colors. This spec explicitly rejects that. Learners should understand that every token added is maintenance forever. The palette works as-is.

3. **Component patterns follow data shapes.** ExperiencePortfolio is designed around `CategoryMeta` (image + title + sub-items). FeaturedPackages is designed around `ExperiencePackage` (image + metadata + price). The component anatomy mirrors the TypeScript interface — this is how production teams align design and engineering.

4. **Motion has a budget.** Every animation is specified with exact duration, easing, and reduced-motion behavior. There's no "add some animations" — there's a precise motion spec. Learners see that motion is engineering, not decoration.

5. **Existing patterns before new patterns.** The spec reuses `surface-card`, `.scrollbar-hide`, `bounceX` keyframe, `LuxeSelect`, `AnimatePresence` patterns, and the editorial divider. New CSS classes are minimal. This teaches the production habit of checking "does this already exist?" before creating something new.

6. **Category pills as a design system primitive.** A pill/badge component appears across ExperiencePortfolio cards, FeaturedPackages cards, testimonials, and guides. Extracting it as a shared pattern (with a solid and outline variant) demonstrates how design systems grow organically from repeated usage.

7. **Progressive disclosure as a UX pattern.** The form field reveal animation isn't just eye candy — it reduces cognitive load by showing fewer fields initially. The conditional logic (Junior → show safety fields) shows how form UX responds to user intent. This is a pattern learners will use in every production form they build.

8. **`.impeccable.md` as living documentation.** Updating the design context doc alongside the code teaches that design specs aren't write-once artifacts — they evolve with the product. The exact search-replace table in §8.5 shows how to maintain design documentation systematically.

---

## Appendix A: File Impact Summary

| File | Change Type | Section Reference |
|---|---|---|
| `.impeccable.md` | Updated (5 edits per §8.1–8.5) | §8 |
| `apps/web/app/globals.css` | Add 3 new utility classes + update comment | §9.1–9.3, §8.5 |
| `apps/web/tailwind.config.ts` | No changes | §9 |
| New component: `ExperiencePortfolio.tsx` | Pattern spec only — built in Phase 4 | §4.1 |
| New component: `FeaturedPackages.tsx` | Pattern spec only — built in Phase 4 | §4.2 |
| New component: `CategoryPill.tsx` | Pattern spec only — built in Phase 1/4 | §4.3 |
| Icon files (6 new SVGs) | Pattern spec only — built in Phase 4 | §7 |

## Appendix B: Implementation Sequence

This spec feeds into the phases defined in `spec/brand-pivot.md` §8:

- **Phase 1:** `.impeccable.md` updates (§8), globals.css comment fix (§8.5), CategoryPill component
- **Phase 4:** ExperiencePortfolio (§4.1), FeaturedPackages (§4.2), category icons (§7), new CSS utilities (§9.1–9.3), motion implementation (§6)
- **Phase 3:** Form field patterns (§4.4), progressive disclosure motion (§6.3)

No design system changes block Phase 2 (data model migration) — that phase is pure TypeScript.
