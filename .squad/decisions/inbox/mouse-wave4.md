# Mouse Wave 4 Decisions — Issues #44, #48, #50, #51

## Decision 1: PressAwards hover handlers → Tailwind classes
**Context:** PressAwards.tsx used `onMouseEnter`/`onMouseLeave` to toggle inline `style.color` for hover effects, which excluded keyboard/focus users entirely.
**Decision:** Replaced all inline style-based hover with Tailwind `hover:text-aurora-gold focus:text-aurora-gold` classes. This simultaneously solves Issue #44 (a11y focus) and Issue #48 (token normalization) in one change.
**Trade-off:** None — strictly better. Tailwind handles hover+focus natively, no JS handlers needed.

## Decision 2: DestinationGrid focus-within → group-focus-within
**Context:** The overlay had `focus-within:opacity-100` but focus lives on the parent card (which has `tabIndex={0}`), not inside the overlay itself. So keyboard focus never revealed the quick facts.
**Decision:** Changed to `group-focus-within:opacity-100` since the card is the `group` element. When the card receives focus, `group-focus-within` triggers on descendants.

## Decision 3: Testimonials heading semantics
**Context:** `<h2>` was styled as tiny eyebrow text (text-fluid-sm), while `<p>` below was styled as a large heading (text-fluid-2xl). Screen readers would announce the small text as a heading.
**Decision:** Swapped elements — the eyebrow is now `<p>`, the visual heading is now `<h2>`. Preserves exact visual appearance while fixing semantic hierarchy.

## Decision 4: layout.tsx main landmark restructure
**Context:** `<main>` was in layout.tsx wrapping `{children}`, but skip-nav needs `#main-content` to target content after navbar. The navbar should be outside `<main>`.
**Decision:** Moved `<main id="main-content">` to page.tsx, wrapping sections between Navbar and Footer. Navbar and Footer sit outside `<main>` where they semantically belong.

## Decision 5: StaggerChildren reduced-motion
**Context:** StaggerChildren only used `motion` for stagger delay but didn't respect prefers-reduced-motion.
**Decision:** Added `useReducedMotion` hook — when reduced motion is preferred, stagger delay is set to 0 (all children appear simultaneously). The `hidden` variant was also explicitly added for cleaner framer-motion behavior.

## Decision 6: Phone number standardization
**Context:** TrustBar showed `+1 (212) 555-0190` (looks like a test number), Footer showed `+1 (888) 200-LUXE` (vanity number matching the brand).
**Decision:** Standardized both to `+1 (888) 200-LUXE` per Issue #51 spec. The vanity number is more memorable and on-brand.
