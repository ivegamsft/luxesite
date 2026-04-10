# Trinity Wave 4 Decisions

## Decision: Custom event pattern for Hero → ConciergeForm data flow

**Issue:** #45 — Hero discovery selects discarded on CTA click  
**Chosen:** `CustomEvent('hero-discovery')` dispatched from Hero, listened in ConciergeForm via `useEffect`  
**Alternatives considered:**
- URL hash params (`#contact?dest=maldives&timing=next-month`) — fragile, pollutes URL, requires parsing
- React context / shared state — overkill for two components on same page, adds provider boilerplate
- Prop drilling via page.tsx — would require lifting state to root and threading through unrelated components

**Rationale:** Custom events keep both components fully independent (no shared imports, no prop drilling). The pattern is lightweight, browser-native, and works perfectly for same-page scroll-to-form flows. Easy to extend if more components need to listen.

**Pre-fill strategy:** Map destination to interest tags where possible (maldives → "Beach & Islands"), timing to travelDates, and always write a human-readable summary to notes as fallback. Gold-tinted banner confirms pre-fill visually.

---

## Decision: Region tab filtering with gated "View All" for DestinationGrid

**Issue:** #47 — 14 destinations in a flat grid = overload  
**Chosen:** Horizontal pill-style tab bar with "All" + per-region tabs, counts in labels, "All" tab gates to 6 with expand button  
**Alternatives considered:**
- Dropdown select for region — less discoverable, hides the breadth of regions
- Sidebar filter panel — too heavy for a single filter dimension
- Pagination — breaks the luxury browsing feel

**Rationale:** Tabs are the lightest progressive disclosure for a single categorical dimension. Showing counts (e.g. "Indian Ocean (2)") communicates breadth without requiring clicks. The "View All" button on the default tab prevents grid overload while filtered views show everything (small enough sets don't need gating).

**Featured card behavior:** `index === 0` of the *visible* set always gets `col-span-2 row-span-2`. This means the featured card changes per region — intentional, as it promotes the first destination in each region as that region's hero.

**Animation:** `AnimatePresence mode="wait"` with opacity crossfade (250ms). Respects `useReducedMotion`. No layout shift — grid dimensions stay consistent.
