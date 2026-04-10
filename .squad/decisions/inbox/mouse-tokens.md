# Decision: Token Naming Audit — Issue #27

**Agent:** Mouse (UI/Design)  
**Date:** 2026-04-11  
**Status:** No action required — close issue

## Context

Issue #27 asked to rename old dark-theme token names (`aurora-cyan` → `aurora-champagne`, `aurora-purple` → `aurora-bordeaux`, `aurora-magenta` → `aurora-rose`) to semantic names matching the light-theme palette.

## Finding

All three old token names were already removed during the Wave 1 light-theme migration (Issue #26). The current token naming is fully semantic:

| Token | Value | Role |
|-------|-------|------|
| `aurora-gold` | `#c9a76a` | Primary accent (was `aurora-cyan`) |
| `aurora-navy` | `#1a3a52` | Secondary accent (was `aurora-purple`) |
| `aurora-sage` | `#7a8f7f` | Tertiary accent (was `aurora-magenta`) |
| `aurora-bg` | `#f5f3f0` | Page background |
| `aurora-bg-light` | `#faf9f7` | Card/surface background |
| `aurora-bg-dark` | `#f0ebe5` | Alternating section background |
| `aurora-text` | `#2c2620` | Body text |
| `aurora-text-muted` | `#6b6458` | Captions/labels |
| `aurora-border` | `#e8e4df` | All borders |
| `aurora-success` | `#5a8f4a` | Success states |
| `aurora-error` | `#a85a4a` | Error states |

## Decision

**Close Issue #27 as completed.** The rename was effectively done as part of Issue #26. No stale references remain.

## Minor observation

The `lift` shadow token uses `oklch(0 0 0 / 0.35)` while all other shadows use `rgba()`. Not a bug — just a format inconsistency. Could normalize to `rgba(0,0,0,0.35)` in a future cleanup pass if desired.
