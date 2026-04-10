# Trinity Critique Fixes

**Author:** Trinity  
**Date:** 2026-04-10  
**Status:** Implemented

## Changes Made

### Issue #17 (P0) — Duplicate h1 → span
Navbar `<h1>` changed to `<span>` with identical className. Single `<h1>` now only in Hero. Fixes WCAG heading hierarchy and SEO.

### Issue #18 (P1) — CTA label unification
All primary CTAs unified to "Design My Trip":
- Navbar desktop + mobile: "Request Itinerary" → "Design My Trip"
- FloatingCTA button + aria-label: "Request Itinerary" → "Design My Trip"
- ConciergeForm submit: "Send Request" → "Send My Request"

### Issue #19 (P1) — Post-submission confirmation panel
Replaced `react-hot-toast` with inline confirmation panel showing:
- Personalized thank-you with first name
- "What happens next" (24-hour curator response)
- Privacy assurance
- "Submit another request" reset link

Added privacy note above submit button. Removed `react-hot-toast` import and `<Toaster>` component. Updated test file to match new behavior.

### Issue #21 (P2) — Inline onBlur validation
Added `validateField()` function with `onBlur` handlers on name and email inputs. Errors clear on `onChange` for immediate feedback. Validation still also runs on submit.

### Issue #23 (P3) — aria-pressed on interest toggles
Added `aria-pressed={isSelected}` to all interest toggle buttons for screen reader support. Added test coverage for this attribute.

## Files Changed
- `apps/web/app/components/Navbar.tsx`
- `apps/web/app/components/FloatingCTA.tsx`
- `apps/web/app/components/ConciergeForm.tsx`
- `apps/web/app/components/__tests__/ConciergeForm.test.tsx`
