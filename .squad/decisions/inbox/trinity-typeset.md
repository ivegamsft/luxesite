# Typography Normalization: Award Styles & Minimum Text Sizes

**Date:** 2026-04-12  
**Agent:** Trinity  
**Category:** Design System — Typography

## Decision

1. **Press Award Typography:** Normalize to at most 2 style variants
   - **Serif italic** for editorial/lifestyle brands (e.g., Condé Nast, Vogue)
   - **Sans-semibold** for everything else (event brands, trust signals, trade press)
   - **Banned:** font-light (too thin for readability), extreme tracking values beyond `tracking-wide`

2. **Section Heading Requirement:** All major content sections MUST have an h2 heading
   - Pattern: `font-heading text-fluid-2xl font-bold`
   - Include a brief intro paragraph for context
   - Pattern applies to: DestinationGrid, WhyAurora, Differentiators, ExperienceList, etc.

3. **Minimum Text Size:** Reserve `text-xs` for supplementary content only
   - **Promote to text-sm:** Navigation labels, disclaimers with legal/brand importance, secondary info that users actively read
   - **Keep text-xs:** Truly supplementary labels (e.g., TrustBar sublabels, decorative badges)

## Rationale

**Award Typography:**
- Prior state: Each award had completely custom typography (font-serif, font-light, tracking-[0.35em], tracking-[0.2em], etc.) creating visual chaos
- Effect: Felt like 6 different brands competing for attention, not a cohesive "As Featured In" section
- Solution: 2 variants (serif italic for prestige editorial, sans for everything else) balance variety with consistency

**Section Headings:**
- Differentiators section lacked an h2, weakening visual hierarchy and hurting accessibility (WCAG 2.4.6 Headings and Labels)
- Effect: Users scanning the page couldn't identify what the 3-icon grid represented without reading the fine print
- Solution: Added h2 + intro paragraph following the pattern used in 6 other sections

**Text Size Floor:**
- text-xs (Tailwind default: 0.75rem/12px) is below WCAG recommended minimum for body text and navigation
- Footer disclaimer and ScrollNav labels are actively read content, not decorative
- Solution: Promote to text-sm (0.875rem/14px) for improved readability and accessibility

## Impact

- **Components affected:** PressAwards, Differentiators, Footer, ScrollNav
- **Backward compatibility:** No breaking changes — purely visual refinement
- **Accessibility:** Improved WCAG 2.4.6 (headings) and 1.4.12 (text spacing/readability)

## Examples

**PressAwards (awards.ts):**
```typescript
// Before:
'award-virtuoso': 'text-base lg:text-lg font-heading font-light tracking-[0.35em]'
'award-event-design': 'text-sm lg:text-base font-heading font-bold tracking-[0.3em]'

// After:
'award-virtuoso': 'text-sm lg:text-base font-heading font-semibold tracking-wide'
'award-event-design': 'text-sm lg:text-base font-heading font-semibold tracking-wide'
```

**Differentiators (Differentiators.tsx):**
```tsx
// Before: no section heading, straight to 3-column grid

// After:
<h2 className="font-heading text-fluid-2xl font-bold text-aurora-text mb-4">
  The Aurora Difference
</h2>
<p className="text-aurora-text-muted max-w-2xl mx-auto leading-relaxed">
  Bespoke event production backed by unparalleled expertise...
</p>
```

**ScrollNav (ScrollNav.tsx):**
```tsx
// Before:
className="text-xs font-medium tracking-wide..."

// After:
className="text-sm font-medium tracking-wide..."
```

## Team Notes

- This aligns with the broader typography audit completed for Aurora Luxe
- Other typography improvements (H2 scale bump from 28-40px to 32-48px) already completed in commit 085c808
- Design system now has clear guardrails: 2 award variants max, h2 required for sections, text-sm minimum for navigation/important content
