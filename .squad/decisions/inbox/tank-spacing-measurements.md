# Tank — Spacing Pixel Measurements (2026-04-12)

## Summary

Playwright-measured actual pixel distances between all homepage sections at 1440px desktop and 375px mobile. Screenshots and JSON data saved to `tests/e2e/screenshots/`.

## Key Finding: Spacing is NOT as extreme as CSS math suggested

Previous audit calculated `section-lg` padding at ~126px per side at 1440px based on clamp max values. **Actual measured computed padding is 60px per side** (3.75rem). The clamp() preferred value at 1440px viewport is well below the max — the 12rem max only applies at ~2500px+ viewports.

## Desktop (1440px) Measurements

| Transition | CSS gap (pb+pt) | Visual gap (content→H2) |
|---|---|---|
| TrustBar → WhyAurora | 60px (0+60) | 117px |
| WhyAurora → DestinationGrid | 120px (60+60) | 176px |
| DestinationGrid → ExperienceList | 120px (60+60) | 152px |
| ExperienceList → Testimonials | 120px (60+60) | 152px |
| Testimonials → Interstitial | 60px (60+0) | N/A |
| Interstitial → Tiers | 60px (0+60) | 116px |
| Tiers → FAQ | 120px (60+60) | 128px |
| FAQ → ConciergeForm | 120px (60+60) | 152px |

## Mobile (375px) Measurements

| Transition | CSS gap (pb+pt) | Visual gap (content→H2) |
|---|---|---|
| TrustBar → WhyAurora | 33px (0+33) | 90px |
| WhyAurora → DestinationGrid | 66px (33+33) | 123px |
| DestinationGrid → ExperienceList | 57px (33+24) | 89px |
| ExperienceList → Testimonials | 57px (24+33) | 89px |
| Interstitial → Tiers | 33px (0+33) | 89px |
| Tiers → FAQ | 66px (33+33) | 75px |
| FAQ → ConciergeForm | 66px (33+33) | 99px |

## Recommendation

The 120px combined CSS gap (60+60) between major sections at 1440px desktop is generous but not extreme for a luxury brand site. If the team still feels sections are too spread out, the fix should target **the preferred value in the clamp formula** — not the max. Reducing the `section-lg` preferred value by ~20% (e.g., from the current slope to yield ~48px at 1440px instead of 60px) would bring combined gaps to ~96px, which is more typical for premium sites.

However, the original complaint may have been about **perceived crowding** (too tight), not excessive spacing. At 60px padding per side, sections have breathing room. The real visual issue might be that heading margins (56–116px from section top to H2) add extra visual weight on top of padding, making some transitions feel uneven.

## Files

- `tests/e2e/screenshots/spacing-audit-desktop.png` — Full-page desktop screenshot
- `tests/e2e/screenshots/spacing-audit-mobile.png` — Full-page mobile screenshot
- `tests/e2e/screenshots/spacing-measurements.json` — Raw measurement data
- `tests/e2e/screenshots/run-spacing-audit.mjs` — Reusable measurement script
