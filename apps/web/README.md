# Aurora Luxe Web App

The main Next.js marketing and booking application for Aurora Luxe—a luxury experiential party platform.

## Directory Structure

```
apps/web/
├── app/                    # Next.js App Router directory
│   ├── components/         # React components (UI, form, layout)
│   ├── __mocks__/          # Mock data for components
│   ├── data/               # Static data (awards, experiences, etc.)
│   ├── lib/                # Utility functions and helpers
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   └── icon.svg            # App icon
├── public/                 # Static assets (images, SVGs, screenshots)
│   └── screenshots/        # Design reference screenshots
├── e2e/                    # End-to-end tests (Playwright)
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.mjs      # PostCSS configuration
├── jest.config.js          # Jest test configuration
├── jest.setup.ts           # Jest setup
├── eslint.config.mjs       # ESLint configuration
└── package.json            # Dependencies and scripts
```

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run e2e tests
npm run e2e

# Lint code
npm run lint
```

## Key Features

- **Landing Page**: Hero, venues, experiences, event tiers
- **Booking System**: Concierge form integration
- **Responsive Design**: Mobile-first Tailwind CSS
- **Animations**: Smooth scroll effects and transitions
- **Testing**: Unit tests (Jest) and e2e tests (Playwright)

## Asset Management

- **Icons & SVGs**: `public/` for production assets
- **Screenshots**: `public/screenshots/` for design reference (not in build)
- **Component Assets**: Component-specific images imported via `import`

## Environment

Development uses Next.js 14+ with TypeScript and Tailwind CSS.
