# Neo — Project Knowledge

## Project Context
- **Project:** Aurora Luxe Travel — luxury travel marketing website
- **Owner:** ivegamsft
- **Stack:** Next.js 16.2.3, TypeScript, Tailwind CSS, Framer Motion
- **Current state:** Dark "Gilded Bordeaux" theme, undergoing major redesign to light credibility-first theme per luxurysite.md spec
- **Key specs:** spec/site.md (current), spec/luxurysite.md (target), COMPETITIVE_ANALYSIS.md (strategic fixes)

## Learnings

(Neo is new to the team — learnings will be added as work progresses)

### 2026-07 — Issue #31 & #35: WhyAurora + TrustBar sections
- Created `app/data/team.ts` with 5 mock specialists (Africa, Asia, Europe, Americas, Ocean) and `TeamMember` interface
- Added `TeamMember` type to `app/lib/types.ts` alongside existing interfaces
- Built `WhyAurora.tsx`: team grid (3/2/1 col responsive), differentiators row, light theme tokens, reduced-motion support, AnimatedSection wrapper, hover lift on cards
- Built `TrustBar.tsx`: compact trust strip with phone, named concierge, press credential, member stat. Desktop horizontal with dividers, mobile 2×2 grid. Monoline SVG icons, gold accent on phone number
- Used hardcoded hex tokens (`#faf9f7`, `#2c2620`, `#6b6458`, `#c9a76a`, `#e8e4df`) per spec — Tailwind token rename is pending (Issue C from COMPETITIVE_ANALYSIS)
- Both components export default and are import-ready; page.tsx untouched per Issue #43 scope
- Build verified clean with `npx next build`

### 2026-07 — Issue #34: Travel Guides section (GuideGrid)
- Created `app/data/guides.ts` with 6 mock guides (Botswana, Maldives, Japan ryokans, Patagonia, Marrakech, Alpine wellness) with `TravelGuide` interface
- Added `TravelGuide` type to `app/lib/types.ts`
- Built `GuideGrid.tsx`: 3/2/1 col responsive grid, 4:3 image cards, lazy-loaded images, read-time badge, author line, "Read Guide →" gold link, hover lift + shadow, light theme tokens, AnimatedSection + staggered Framer Motion, reduced-motion support
- Cards: white bg, `#e8e4df` border, `rounded-sm`, `line-clamp-3` for excerpt, `line-clamp-2` for title

### 2026-07 — Issue #38: Press & Awards section (PressAwards)
- Created `app/data/awards.ts` with 6 entries (Condé Nast Traveler, Travel + Leisure, Forbes Travel Guide, Trustpilot, Virtuoso, Feefo) using text-based logos
- Added `PressAward` type to `app/lib/types.ts`
- Built `PressAwards.tsx`: headline stat, desktop row with dividers between text logos, mobile 2×3 grid, each logo links externally, stat line ("★ 4.9/5 on Trustpilot · 2,471 verified reviews"), hover color change to gold, reduced-motion support

### 2026-07 — Issue #33: Expand Destinations to 15 cards
- Added 9 new destinations to `app/data/destinations.ts`: Patagonia, Bali, Amalfi Coast, Santorini, Bora Bora, Marrakech, Iceland, Seychelles (total now 15)
- Each follows existing data structure with slug, name, region, tagline, price (USD), currency, imageUrl (Unsplash), quickFacts (4 items)
- Updated `DestinationGrid.tsx`: added "Learn More →" text link that appears on hover (gold, opacity transition)
- Grid naturally handles 15 cards — first card remains featured (2-col span), rest fill 3-col grid
- Build verified clean with `npx next build`

### 2026-07 — Issue #37: Enhance Testimonials with rich data
- Updated `Testimonial` type in `app/lib/types.ts`: added `location`, `date`, `rating?`, `sourceLink?` fields
- Expanded `app/data/testimonials.ts` from 4 → 7 testimonials with location, date, rating (all 5★), specific trip roles, and Trustpilot sourceLinks on 4 entries
- Enhanced `Testimonials.tsx`: star rating display (★★★★★), location line, date line, trip-role line, "Verified on Trustpilot →" link when sourceLink exists, kept carousel+sidebar nav pattern
- Build verified clean

### 2026-07 — Issue #42: Enhance Experiences with regions
- Updated `Experience` type in `app/lib/types.ts`: added `regions: string[]` field
- Rewrote `app/data/experiences.ts` from 5 → 8 spec-aligned categories: Wildlife Safaris, Cultural Immersion, Beach & Islands, Mountain & Ski, Food & Wine, Adventure, Family Journeys, Honeymoon & Romance — each with 4 region strings and emoji icons
- Redesigned `ExperienceList.tsx`: replaced alternating horizontal cards with 3-col lg / 2-col md / 1-col sm grid, emoji icon top, region pills at bottom (rounded-full, aurora-bg-light bg, aurora-border border), white card bg, hover shadow-lift, removed old SVG icon map
- Build verified clean

### 2026-07 — Issue #46: Break layout monotony across sections
- **ExperienceList.tsx**: Replaced uniform 3-col grid with 2-col featured layout. Left column = tall featured card (Wildlife Safaris), right column = 2×4 compact card grid. Animation changed from stagger fade-up to slide-from-left for featured + simple opacity fade for rest.
- **GuideGrid.tsx**: Replaced uniform 3-col grid with magazine editorial layout. First guide renders as full-width 2-col hero card (image left, content right). Remaining 5 guides in standard 3-col grid below. Animation changed from stagger fade-up to slide-from-left for featured + simple opacity fade for rest.
- **WhyAurora.tsx**: Replaced 3-col team grid with horizontal scroll strip. First 2 members get larger cards (300-340px), remaining 3 get smaller cards (260-280px). Added snap-scroll, right-edge fade gradient. Removed all motion animation from team and differentiators (credibility section — animation not needed).
- DestinationGrid and Tiers kept as grids per instructions.
- Build verified clean

### 2026-07 — Issue #49: Replace emoji icons with SVGs in Experiences
- Updated `experiences.ts`: changed `icon` field from emoji strings (🦁🏛️🏝️ etc.) to semantic ID strings ('wildlife', 'cultural', 'beach', 'mountain', 'food-wine', 'adventure', 'family', 'romance')
- Created `experienceIcons` record in `ExperienceList.tsx` mapping 8 IDs → inline JSX SVG elements (viewBox 24×24, fill="none", stroke="currentColor", strokeWidth="1.5")
- Icons: binoculars (wildlife), temple columns (cultural), palm tree + waves (beach), mountain peaks + sun (mountain), wine glass (food-wine), compass rose (adventure), hot air balloon (family), heart (romance)
- SVGs rendered with `w-8 h-8 text-aurora-gold` styling and `aria-hidden="true"`
- Build verified clean

### 2026-07 — Issues #150, #155, #156: Luxury positioning overhaul
- **page.tsx (#150):** Reordered sections for credibility-first flow: Hero → TrustBar → WhyAurora → Destinations → Experiences → Testimonials → Interstitial → Tiers → FAQ → ConciergeForm. Added `SectionBreak` component with gold gradient vertical rule between major acts.
- **globals.css:** Added three new CSS classes: `.editorial-divider` (3rem gold rule, 50% opacity), `.section-intro` (38rem max-width, muted color, 1.75 line-height), `.section-break` (centered vertical gold gradient line with fluid padding). All additive — no existing tokens modified.
- **ExperienceList.tsx (#156):** Replaced generic heading with editorial intro block (divider + heading + descriptive paragraph). Changed featured badge from pill/border style to minimal uppercase tracking text. Changed card corners from `rounded-lg` to `rounded-sm` per design decisions. Removed `group-hover:scale-105` image zoom (SaaS pattern). Increased grid gap from 6→8/10, overlay padding from 5→6, region pill tracking added. More generous whitespace throughout.
- **DestinationGrid.tsx (#155):** Upgraded section heading area: increased bottom margin (8→12/16), added `.editorial-divider` rule, added `.section-intro` paragraph describing curation philosophy, tightened tracking on kicker label to `tracking-[0.2em]`.
- Key principle: editorial variety per Decision #6 — Destinations uses kicker-above-heading pattern, Experiences uses divider-above-heading pattern. No two sections structurally identical.

### 2026-07 — Issue #247: Guest-count sync fix
- **Bug:** `handleHeroDiscovery` event handler received `guestCount` tier (e.g. 'grand') but only wrote it to `notes` text — never updated `formData.expectedGuests`, so the field stayed at default 50
- **Fix:** Added `guestDefaults` map (intimate→12, medium→25, grand→100, spectacular→500) and wired it into `setFormData` call to update `expectedGuests` alongside interests and notes
- **Tests:** Added 4 new tests covering: hero-discovery → guests sync, intimate tier default, manual edit persistence, successive tier overrides
- **Infrastructure:** Fixed `jest.config.js` — added `moduleDirectories: ['node_modules', '<rootDir>/node_modules']` so tests can resolve `framer-motion` from `apps/web/node_modules`
- Build and all 16 ConciergeForm tests verified passing
