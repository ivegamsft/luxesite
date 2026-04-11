# Why Aurora Luxe Looks Cheaper Than Competitors — Diagnosis & Plan

> **Executive summary:** The underlying palette and fonts have already been corrected. The site looks cheap not because of color, but because of composition, trust architecture, animation posture, and surface treatment. These are fixable. This document names every cause with file-level evidence and defines the work queue.

---

## What the Competitors Are Doing That We Aren't

From the two accessible competitor references (JamesEdition, VillasOfDistinction) plus `.impeccable.md` reference brands (Aman, Rolls-Royce, Monocle, Aesop):

| Signal | Competitor Execution | Aurora Luxe |
|---|---|---|
| Authority credential | Phone number + specialist hours prominently displayed; "award-winning concierge travel specialists" | None visible |
| Social proof | "710,000+ LISTINGS" stat; named client travel stories | No stats, no named testimonials with photos |
| Discovery moment | Hero search form ("Find Your Perfect Villa") — concierge ritual begins immediately | Scroll-to-form button — passive |
| Editorial structure | Each section structurally distinct — hero, then editorial statement, then offset grid, then quote break | Likely hero → grid → tiers → form (SaaS landing pattern) |
| Copy register | "Where will your story begin?" / sensory narrative ("turquoise waters… azure skies") | "Beyond First Class." (good) + "Private shores. Unmarked airstrips. Tables that don't take reservations." (reads as a bullet list, not a sentence) |
| Navigation posture | ALL-CAPS nav links + category entry points styled as navigation | Standard mixed-case navbar |
| Negative space | Both competitors use generous white space as a luxury signal | Unknown — see section layout |
| Exclusivity frame | "Invite only," "application required," "limited to X families" language | Not present |

---

## Root Cause Diagnosis: Eight Specific Issues

### 1. Glow Box-Shadows — Still Active

**File:** `apps/web/tailwind.config.ts`  
**Evidence:**
```ts
boxShadow: {
  glow: "0 0 20px oklch(0.82 0.105 85 / 0.3)",
  "glow-purple": "0 0 20px oklch(0.42 0.13 20 / 0.3) ...",
}
```
**File:** `apps/web/app/components/Tiers.tsx`, line ~55:
```tsx
className={`... shadow-glow-purple`}    // featured tier card
// and:
'... hover:shadow-glow ...'             // featured CTA button
```
**Why it's cheap:** "Glow" shadows are the signature aesthetic of SaaS product pages, gaming UIs, and Figma templates. No luxury hospitality brand uses glow shadows. Aman uses no shadows. Rolls-Royce uses fine architectural drop shadows at <10% opacity. The warm oklch values don't change the glow's essential character.  
**Fix:** Delete `glow` and `glow-purple` from `tailwind.config.ts`. Replace featured card elevation with a `box-shadow: 0 2px 24px oklch(0 0 0 / 0.35)` fine architectural shadow.

---

### 2. Multi-Stop Gradient on CTA Button

**File:** `apps/web/app/components/Tiers.tsx`, line ~103:
```tsx
'bg-gradient-aurora text-aurora-dark hover:shadow-glow hover:-translate-y-0.5'
```
**Why it's cheap:** A three-stop gradient button (gold → bordeaux → dusty rose) on the featured membership CTA reads as "landing page template." Aman's primary buttons are solid black on white or solid white on black. Rolls-Royce uses a solid beveled dark treatment. A gradient button signals that copy alone couldn't sell the tier.  
**Fix:** Replace `bg-gradient-aurora` with `bg-aurora-champagne` (solid champagne gold) on the button. The gradient can remain in decorative elements like the `.animated-border` ring — just not on a button.

---

### 3. Staggered Card Entry Animations — Landing Page Energy

**File:** `apps/web/app/components/Tiers.tsx`, lines ~33–50:
```tsx
variants={{
  visible: {
    transition: {
      staggerChildren: prefersReducedMotion ? 0 : 0.15,
    },
  },
}}
```
**Why it's cheap:** Orchestrated stagger-in animations are the most recognizable calling card of template landing pages. Every Elementor theme, every Framer template, every Webflow template does this. Aman's site content simply *exists* — it doesn't perform its entrance. The animation says "someone thought about animating this" rather than "this is already here, waiting for you."  
**Fix:** Remove the stagger. Cards fade in at `opacity: 0 → 1` together, over 400ms, triggered by scroll intersection. No slide, no stagger. Optionally: no scroll animation at all on tiers — just render them.

---

### 4. Featured Tier Scale-105 — Pricing Page Pattern

**File:** `apps/web/app/components/Tiers.tsx`, line ~54:
```tsx
tier.featured
  ? 'animated-border scale-[1.02] md:scale-105 z-10 shadow-glow-purple'
```
**Why it's cheap:** Scaling the middle card up is *the* canonical SaaS pricing page pattern, used by every startup from 2014–2024. A private members' club would never "highlight" a tier this way — they'd use typographic weight, border treatment, or negative space. The scale effect signals template thinking.  
**Fix:** Remove `scale-[1.02] md:scale-105`. Distinguish the featured tier through the existing `.animated-border` conic gradient ring (already warm and tasteful) plus a slightly different background depth and a small "Recommended" or "Most Selected" text badge.

---

### 5. Center-Aligned Hero — Generic Composition

**File:** `apps/web/app/components/Hero.tsx` (lines 1–100 confirmed)  
**Evidence:** `text-center` on the content container.  
**Why it's cheap:** Center-aligned full-screen hero + centered headline + centered CTAs is the universal default layout. JamesEdition, VillasOfDistinction, Aman, Rolls-Royce, Monocle — all left-aligned or asymmetric. Center alignment signals the layout was not designed; it was defaulted. Editorial luxury requires deliberate composition: content left-anchored, large whitespace right, or a deliberate asymmetric offset.  
**Fix:** Left-align the headline and subhead. Anchor the content block to `max-w-[50%]` on desktop, full-width on mobile. This single change has outsized impact on perceived premium quality.

---

### 6. No Trust Architecture — Zero Credentials Visible

**Issue:** No phone number. No named specialists. No award badges. No member count. No "by application" or exclusivity signal. No founding date. No press mentions.  
**Why it's cheap:** Ultra-HNWI clients are exposed to fraud, scam operators, and low-prestige resellers. The credentialing layer — a phone number, a named specialist's photo, an award from a recognized travel body — is not decoration. It is the product. VillasOfDistinction leads with "Award-winning concierge travel specialists" and publishes their phone number and office hours in the hero viewport. Aurora Luxe asks for trust without any basis for trust.  
**Fix (new component):** A trust bar below the hero containing: a London/NY/HK phone number, one named lead concierge with a photo and title, one award or press credential ("As featured in: Financial Times, Condé Nast Traveller"), and optionally a discreet member count ("Trusted by 1,200 families worldwide").

---

### 7. No Concierge Discovery Moment — Passive Hero

**Why it's cheap:** The hero's primary CTA is "Design Your Trip" which scrolls to a generic contact form. VillasOfDistinction places a functional search (destination type, dates, guests) directly in the hero. This is not just functional — it's a ritual. The client begins designing their journey immediately, in the first viewport. Aurora asks clients to scroll down, read more, and eventually fill out a form.  
**Fix:** Replace or supplement the "Design Your Trip" scroll-CTA with a 3-part concierge inquiry entry: `[Destination type ▾] [Approximate dates ▾] [Discuss with a specialist →]`. This can be a styled `<select>` row — no JavaScript complexity required. The ritual of beginning the booking journey in the first 10 seconds is the experiential signal that separates "private travel service" from "a website."

---

### 8. Token Naming Disconnect — Technical Debt & Designer Confusion

**File:** `apps/web/tailwind.config.ts`, `apps/web/app/globals.css`  
**Evidence:**
```ts
"aurora-cyan": "oklch(0.82 0.105 85)",  // actually champagne gold (hue 85)
"aurora-purple": "oklch(0.42 0.13 20)", // actually deep bordeaux wine
"aurora-magenta": "oklch(0.70 0.09 30)",// actually dusty rose
```
**Why it matters:** The values were correctly updated to warm Gilded Bordeaux in a prior pass. But the names still say `cyan`, `purple`, `magenta`. When a component author writes `hover:border-aurora-cyan` intending to hover-highlight a checkmark in champagne gold, they're using a name that looks wrong to every reviewer. More critically, any future contributor will think "aurora-cyan" means cyan and try to introduce cold blue-tinted colors to "match" it. The naming will drift the design back toward the AI template aesthetic.  
**Fix (rename):** Global find-replace across all `.tsx` files:
- `aurora-cyan` → `aurora-champagne`
- `aurora-purple` → `aurora-bordeaux`  
- `aurora-magenta` → `aurora-rose`
- `gradient-aurora` → `gradient-gilded`
- `gradient-aurora-subtle` → `gradient-gilded-subtle`
- `shadow-glow` → `shadow-lift`
- `shadow-glow-purple` → `shadow-lift-bordeaux`

---

## What's Already Been Fixed (Acknowledge the Prior Work)

The codebase is in a mid-refactor state. Several significant fixes are already complete:

| Item | Status | Notes |
|---|---|---|
| Palette values | ✅ Fixed | All OKLCH values updated to warm Gilded Bordeaux (gold hue 85, bordeaux hue 20, dusty rose hue 30) |
| Fonts | ✅ Fixed | Bodoni Moda (heading) + Libre Franklin (body) — both appropriate for editorial luxury |
| Fluid type scale | ✅ Fixed | `clamp()` with Major Third ratio implemented throughout |
| Spinning border | ✅ Fixed | `.animated-border` is now a static conic gradient ring, not an animation |
| Reduced motion | ✅ Fixed | `useReducedMotion` respected in Hero and Tiers; CSS fallback in globals |
| Copy voice | ✅ Good | "Beyond First Class." / "Tables that don't take reservations." — authoritative tone |
| Glass utility | ✅ Improved | `.glass` is now 70% opacity with warm hue-50 tint — solid-ish surface, not full frosted glass |
| Bodoni heading in Tiers | ✅ Fixed | `font-heading` applied to tier names |

---

## Priority Change Queue

### P0 — Immediate Visual Impact (Low effort, high signal change)

| # | File | Change | What it removes |
|---|---|---|---|
| 1 | `tailwind.config.ts` | Delete `glow` and `glow-purple` from `boxShadow` | Gaming/SaaS shadow energy |
| 2 | `Tiers.tsx` | Remove `scale-[1.02] md:scale-105` from featured card | SaaS pricing page pattern |
| 3 | `Tiers.tsx` | Remove `staggerChildren` variant; replace with single-fade | Landing page animation energy |
| 4 | `Tiers.tsx` | Replace `bg-gradient-aurora` on button with `bg-aurora-champagne` | Template gradient button |
| 5 | `Hero.tsx` | Change `text-center` → `text-left` on content block | Generic center-align composition |

### P1 — Strategic Impact (Medium effort)

| # | File | Change | What it adds |
|---|---|---|---|
| 6 | All `.tsx` files | Global rename: `aurora-cyan/purple/magenta` → `aurora-champagne/bordeaux/rose` | Semantic clarity, drift prevention |
| 7 | New component: `TrustBar.tsx` | Phone + named specialist + press credential, below hero | Authority and trust architecture |
| 8 | `Hero.tsx` | Replace "Design Your Trip" scroll-CTA with 3-part concierge entry row | Discovery ritual, immediate engagement |
| 9 | `Tiers.tsx` | Replace featured card `shadow-glow-purple` with fine architectural drop shadow | Removes last glow remnant |

### P2 — Editorial Quality (Higher effort, higher payoff)

| # | Area | Change | What it achieves |
|---|---|---|---|
| 10 | Section layout (`page.tsx`) | Introduce structural variation: not every section uses the same grid pattern | Editorial magazine-spread quality |
| 11 | `Testimonials.tsx` | Named clients with photos, specific trip details, not generic quotes | HNWI social proof standard |
| 12 | Navbar | Consider ALL-CAPS navigation links (competitor signal: JamesEdition, Aman) | Typographic authority |
| 13 | `Hero.tsx` | Replace Unsplash stock photo with curated editorial imagery | Prestige imagery standard |
| 14 | New section | Exclusivity/application framing — "By introduction or application" | Scarcity as luxury signal |

---

## New GitHub Issues to File

These are net-new strategic issues not covered by the existing 13:

**Issue A: Remove glow box-shadows across all components**  
Token deletion in `tailwind.config.ts` + removal in `Tiers.tsx`. P0. ~30 min.

**Issue B: Hero editorial left-alignment**  
`text-center` → `text-left` + `max-w-[50%]` desktop content block. 1–2 hours.

**Issue C: Rename warm palette tokens to semantic names**  
Global find-replace: `aurora-cyan/purple/magenta` → `aurora-champagne/bordeaux/rose`. 1–2 hours. Prevents future contributors from re-introducing cold AI colors.

**Issue D: Featured tier — remove scale + replace gradient CTA button**  
Two focused changes in `Tiers.tsx`. P0. ~1 hour.

**Issue E: Build TrustBar component**  
New component: phone number, named lead concierge (photo + name + title), one award/press credential, member count. Insert below Hero. P1. ~3 hours.

**Issue F: Concierge discovery entry in hero viewport**  
3-part inline selector row (destination type, dates, CTA) as alternative entry point in Hero. P1. ~2 hours.

**Issue G: Remove staggered entry animations from Tiers**  
Replace orchestrated stagger with single-viewport fade-in. P0. ~30 min.

---

## Relationship to Existing 13 Issues

Cross-reference so work doesn't overlap:

| Existing Issue | Topic Area | Relationship to This Plan |
|---|---|---|
| #1 | (check repo) | Likely covered — verify before filing Issue A |
| #8–#11 | Animation / Scroll performance | Issues G and potentially D address these; verify |
| #13, #14 | Form / CTA interactions | Issue F extends this work — coordinate |
| #16 | (check repo) | Verify no overlap with Issue C rename |

> **Recommended:** Before filing Issues A–G, scan the 13 open issues for overlap. Assign Issues A, D, G as sprint-next (P0 fixes achievable in a single session). Issues B, C, E, F as sprint-following (P1 strategic).

---

## The One-Sentence Summary for Your Next Design Session

> **Remove the glow shadows, un-center the hero, flatten the gradient button, and add a phone number — those four changes will close 60% of the gap with competitors in under a day.**

The palette and fonts are already correct. The problem now is posture: Aurora Luxe still *poses* like a template and *omits* the authority signals that luxury clients need to feel safe spending €50,000.
