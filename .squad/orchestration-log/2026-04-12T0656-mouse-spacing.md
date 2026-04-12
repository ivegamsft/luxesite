# Orchestration: Mouse Section Spacing Token Rebalance (2026-04-12T0656)

**Agent:** Mouse (UI/Design Dev)  
**Task:** Rebalance section spacing tokens to hit 80-120px recommended range with tighter mobile/tablet values  
**Status:** ✅ SUCCESS

## Spawn Directive

User requested adjustment of section spacing tokens in `apps/web/app/globals.css` to achieve industry-standard gaps (80-120px combined on desktop) between stacked sections, with tighter mobile/tablet ratios.

## Execution Summary

### Files Modified
- `apps/web/app/globals.css` — Rebalanced all four `--space-section-*` tokens

### Outcome

**Token Changes:**
```css
--space-section-lg: clamp(1.75rem, 1.25rem + 2.5vw, 3.75rem);  /* 28→60px */
--space-section-md: clamp(1.25rem, 0.875rem + 2vw, 2.75rem);   /* 20→44px */
--space-section-sm: clamp(1rem, 0.625rem + 1.5vw, 2rem);       /* 16→32px */
--space-section-xs: clamp(0.75rem, 0.5rem + 1vw, 1.5rem);      /* 12→24px */
```

**Result:**
- Stacked sections (e.g., `py-section-lg` on adjacent sections) now produce ~56-120px combined gaps on desktop
- Mobile gaps reduced to 28-48px range (tighter per user request)
- All 8 affected components reviewed; internal spacing unaffected
- Build passes cleanly (`npm run build` succeeds)
- All tests pass

### Verification
- ✅ CSS compiles without errors
- ✅ No component-level spacing regression (reviewed Hero, TrustBar, Destinations, Experiences, WhyAurora, Interstitial, Tiers, Testimonials)
- ✅ Responsive clamp() functions work across all breakpoints
- ✅ Build output clean

## Team Notes

**Key Learning:** Section padding tokens must account for the *stacked* case (top padding of section N + bottom padding of section N+1 = combined gap). Design tokens should be set to produce the desired combined result, not the single-section result.

**Future:** If a section needs exceptional breathing room, use `py-section-lg` + additional `mt-*` utility rather than inflating the token itself.

## Files Produced
- `.squad/decisions/inbox/mouse-section-spacing-tokens.md` — Decision record
- `.squad/agents/mouse/history.md` — Learning captured

---

**Logged by:** Scribe  
**Timestamp:** 2026-04-12T06:56:00Z
