# Accessibility & Internationalization Specification

## Accessibility (a11y) — WCAG 2.1 AA Compliance

### Semantic HTML

- Use correct heading hierarchy (`<h1>`, `<h2>`, etc.)
- Use `<button>` for interactive elements, not `<div>`
- Use `<nav>`, `<main>`, `<header>`, `<footer>` for page landmarks
- Use `<label>` with `for` attribute for form fields
- Use `<fieldset>` and `<legend>` for grouped inputs

### ARIA Patterns

**Navigation**:
- `aria-label` on icon-only buttons
- `aria-current="page"` on active nav link

**Forms**:
- `aria-invalid="true"` + `aria-describedby` for error messages
- `aria-required="true"` for mandatory fields

**Interactive Components**:
- `role="dialog"` for modals with `aria-labelledby`
- `aria-expanded` for expandable sections (FAQ, dropdowns)
- `aria-live="polite"` for dynamic content updates

**Media**:
- `alt` text for all images (not `alt=""` unless decorative)
- Captions for videos
- Transcripts for audio content

### Visual & Motor Accessibility

- Minimum 4.5:1 contrast ratio for text
- Focus indicators on all interactive elements (not removed)
- Keyboard navigation: Tab, Enter, Escape, arrow keys
- No auto-playing videos or sounds
- Click targets minimum 44×44 px

### Testing

- Lighthouse a11y audit as part of CI (target score: 90+)
- Screen reader testing (NVDA on Windows, VoiceOver on macOS)
- Keyboard-only navigation manual testing

## Internationalization (i18n)

### Architecture

Use `next-intl` library with Next.js 14+:
- Locale detection from `Accept-Language` header
- URL-based routing: `/en/...`, `/fr/...`, `/de/...`
- Fallback to `en` if unsupported locale

### Translation Files

```
locales/
├── en/
│   ├── common.json
│   ├── booking.json
│   └── errors.json
├── fr/
└── de/
```

**Format**: Nested JSON keys with variable substitution:
```json
{
  "booking": {
    "confirm_title": "Confirm your booking for {experienceName}",
    "error_payment": "Payment failed"
  }
}
```

### Implementation

- Wrap all user-facing strings in `useTranslation()` hook
- Dates use `Intl.DateTimeFormat` for locale-aware formatting
- Prices use `Intl.NumberFormat` with locale currency
- Email templates support translated content

### Supported Languages (Phase 1)

- English (en) — 100%
- French (fr) — placeholder keys ready
- German (de) — placeholder keys ready

**Future**: Add Spanish, Italian, Japanese based on user demand

### RTL Support (Future)

- Tailwind `dir="rtl"` utility classes for Arabic/Hebrew
- Not required in Phase 1, architecture ready for extension

## Testing

- a11y: Lighthouse + `jest-axe` in component tests
- i18n: Test translation keys exist for all locales
- Manual testing with screen readers and keyboard navigation

## Implementation Timeline

**Phase 1** (Sprint 3): Semantic HTML, ARIA basics, i18n structure, en + placeholders  
**Phase 2** (Sprint 4): Full translations (fr/de), RTL prep  
**Phase 3** (Sprint 5+): Advanced a11y (ARIA live regions), locale detection refinement
