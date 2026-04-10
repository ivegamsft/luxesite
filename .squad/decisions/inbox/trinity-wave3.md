# Trinity Wave 3 Decisions

## Issues: #36, #39, #40, #43

### ConciergeForm (#36)

**Toast instead of full-page success state:** The previous success UI replaced the entire form with a "Thank you" panel. Switched to an auto-dismissing toast (6s) that shows above the form while resetting all fields. This keeps the form available for immediate reuse and is a lighter-weight interaction pattern. The toast includes `role="status"` for screen reader announcement.

**White inputs over aurora-bg-light:** Used `bg-white` (#fff) for inputs instead of `bg-aurora-bg-light` (#faf9f7). On the `bg-aurora-bg` form container, white inputs create clearer visual separation and make the form feel cleaner. The near-identical off-whites would otherwise blend together.

**Interest pill selected state text-white:** Changed selected interest pills from `text-aurora-text` (dark) to `text-white` to match the submit button's gold-bg-with-white-text pattern. Consistent contrast approach across all gold-background elements.

### Footer (#39)

**bg-aurora-navy instead of bg-aurora-bg-light:** The footer needs visual differentiation from the main content. `bg-aurora-navy text-white` creates a clear page terminus and matches the premium brand aesthetic. Using `bg-aurora-bg-light` would make the footer blend into adjacent sections.

**Inline footer data instead of shared navLinks:** Footer links are structurally different from nav links (grouped by category, include destinations and company pages). Using separate inline arrays avoids coupling and allows each to evolve independently.

### SEO (#40)

**Straight spec compliance.** Title, description, keywords, OG, and Twitter card all updated per spec. No creative interpretation needed.

### Section Order (#43)

**Spec-exact ordering.** TrustBar, WhyAurora, GuideGrid, PressAwards were already built by Neo. Just wired imports and placed in the specified order.
