# Custom Dropdown Pattern for Aurora Luxe

**Author:** Mouse  
**Date:** 2026-04-11  
**Status:** Implemented  

## Decision

Native `<select>` elements are replaced with custom `LuxeSelect` dropdowns in the hero concierge bar. The pattern uses aurora design tokens (`bg-white/90 backdrop-blur-md`, `border-aurora-border`, `shadow-glass`) for visual consistency with the glass control bar.

## Why

Browser-native `<select>` dropdown panels cannot be styled — they break the luxury aesthetic by rendering OS-default chrome. Any future select/dropdown in the control bar or similar glass surfaces should follow this same pattern.

## Accessibility Contract

- `role="combobox"` trigger + `role="listbox"` panel + `role="option"` items
- Full keyboard: ArrowUp/Down, Enter/Space, Escape, Home/End
- `aria-expanded`, `aria-activedescendant`, `aria-selected`
- Click-outside-to-close via document mousedown listener
- Focus returns to trigger on close

## Scope

Currently only in Hero.tsx. If more custom selects are needed, extract `LuxeSelect` to a shared component.
