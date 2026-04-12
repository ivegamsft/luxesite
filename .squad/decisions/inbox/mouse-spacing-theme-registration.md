# Decision: Register All Custom Spacing Tokens in @theme inline

**Author:** Mouse  
**Date:** 2026-04-13  
**Status:** Implemented  

## Context

Tailwind v4 uses `@theme inline` as the authoritative token registry for utility class generation. Custom spacing tokens defined only in `:root` (or only in `tailwind.config.ts`) are **silently ignored** — no error, no CSS output. This caused all `py-section-*` and `pt-section-*` utilities to produce zero padding, making sections stack with no vertical spacing.

## Decision

**Every custom spacing token used as a Tailwind utility MUST be registered in the `@theme inline` block using the `--spacing-*` namespace.**

Example pattern:
```css
:root {
  --space-section-lg: clamp(2rem, 1.5rem + 2.5vw, 3.75rem);
}

@theme inline {
  --spacing-section-lg: var(--space-section-lg);
}
```

This enables `py-section-lg`, `pt-section-lg`, `pb-section-lg`, `mt-section-lg`, etc. to all generate valid CSS.

## Tokens Registered

| @theme token | References | Utility examples |
|---|---|---|
| `--spacing-section-lg` | `var(--space-section-lg)` | `py-section-lg` |
| `--spacing-section-md` | `var(--space-section-md)` | `py-section-md`, `pt-section-md` |
| `--spacing-section-sm` | `var(--space-section-sm)` | `py-section-sm` |
| `--spacing-section-xs` | `var(--space-section-xs)` | `py-section-xs` |
| `--spacing-hero` | `var(--space-hero)` | `py-hero` |

## Revised Spacing Values

Mobile minimums bumped up for luxury feel (no cramped sections):

| Token | Old | New | Stacked desktop |
|---|---|---|---|
| `section-lg` | 28→60px | 32→60px | ≈64-120px |
| `section-md` | 20→44px | 24→44px | ≈48-88px |
| `section-sm` | 16→32px | 20→32px | ≈40-64px |
| `section-xs` | 12→24px | 16→24px | ≈32-48px |

## Consequence

Any future custom spacing token added to `:root` MUST also be added to `@theme inline` as `--spacing-<name>: var(--space-<name>)` or the corresponding Tailwind utility will silently fail.
