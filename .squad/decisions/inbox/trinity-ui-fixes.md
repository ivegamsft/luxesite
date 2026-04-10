# UI Fixes — Trinity (2026-04-10)

## What Was Broken

### 1. `sm` Breakpoint Override (Critical)
**File:** `tailwind.config.ts`
**Issue:** `extend.screens` had `sm: '375px'`, overriding Tailwind's default `sm: 640px`. Every `sm:` class across all components (Hero CTA layout, Navbar padding, text sizing) triggered at phone width instead of tablet width, breaking responsive layouts site-wide.
**Fix:** Removed `sm` from custom screens. Also removed redundant `md: 768px` and `lg: 1024px` that matched defaults.

### 2. Selection Styling Invisible
**File:** `globals.css`
**Issue:** `::selection` used `background: linear-gradient(...)` with `background-clip: text`. CSS gradients are unsupported in `::selection`, and `background-clip: text` made the highlight invisible. Users couldn't see selected text.
**Fix:** Replaced with solid `background: #00e5ff` (aurora-cyan).

### 3. Sections Hidden Behind Sticky Navbar
**File:** `globals.css`
**Issue:** Clicking nav links scrolled sections to viewport top, but the 80px sticky navbar covered the section headers.
**Fix:** Added `scroll-padding-top: 5rem` on `html` and `scroll-margin-top: 5rem` on `section[id]`.

### 4. Native Form Controls Had Light Styling
**File:** `globals.css`
**Issue:** Missing `color-scheme: dark` caused browser-native form controls (select dropdowns, number spinners) to render with light OS defaults on the dark background.
**Fix:** Added `color-scheme: dark` to `html`.

### 5. Featured Tier Card Overflow
**File:** `Tiers.tsx`
**Issue:** Featured tier had `scale-105 md:scale-110` as resting state, causing it to overflow its grid cell and overlap adjacent cards (the 10% scale exceeded the `gap-8` spacing).
**Fix:** Reduced to `scale-[1.02] md:scale-105` and added `z-10` for proper stacking.

## Verification
- ✅ `npm run build` — clean, no errors
- ✅ `npm test` — 24/24 tests pass
- ✅ TypeScript — no type errors
