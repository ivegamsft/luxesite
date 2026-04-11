# Monorepo Architecture Evolution

## Current State

### Structure
```
luxesite/
├── apps/
│   └── web/              # Single Next.js app (all-in-one)
├── spec/
└── package.json
```

### Characteristics
- Monolithic frontend
- Static data + API routes in same app
- Shared dependencies in root `package.json`
- Works for MVP, not scalable

## Future State: Multi-App Monorepo

### Target Structure
```
luxesite/
├── apps/
│   ├── web/              # Customer-facing frontend (Next.js)
│   ├── api/              # Backend API (Node.js or Express)
│   └── admin/            # Internal admin portal (Next.js)
├── packages/
│   ├── shared/           # Shared types, utilities
│   ├── design-tokens/    # Design system (Tailwind config, tokens)
│   └── ui-components/    # Reusable React components
├── turbo.json or nx.json # Monorepo config
└── package.json          # Root workspace
```

## Tool Choice: Turborepo vs Nx

### Turborepo (Recommended)
- **Strengths**: Simple config, fast incremental builds, great for Next.js
- **Best for**: Multiple apps sharing utilities
- **Learning curve**: Minimal
- **Example**: Vercel's internal monorepo

### Nx
- **Strengths**: Full IDE support, code generators, workspace analysis
- **Best for**: Large enterprises, complex scaffolding
- **Learning curve**: Steeper
- **Example**: Angular's monorepo

**Recommendation**: Start with Turborepo (simpler, faster setup).

## Migration Plan

### Phase 1: Extract Shared Packages
```
Create:
  packages/shared/
    ├── types/              # TypeScript interfaces (Event, Tier, User)
    ├── utils/              # Shared helpers (formatDate, etc.)
    └── package.json

Update:
  apps/web/package.json    # Add dependency: "@aurora/shared"
```

### Phase 2: Separate Backend
```
Create:
  apps/api/
    ├── src/routes/
    ├── src/middleware/
    ├── package.json
    └── tsconfig.json

Move:
  API routes from apps/web/pages/api → apps/api/src/routes/
```

### Phase 3: Admin Portal
```
Create:
  apps/admin/              # New Next.js app
    ├── pages/
    ├── components/
    └── package.json
```

## Turborepo Configuration

### turbo.json
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false
    },
    "lint": {
      "outputs": []
    },
    "type-check": {
      "outputs": []
    }
  }
}
```

### Root package.json (workspaces)
```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check"
  }
}
```

## Shared Resources

### Shared Types (packages/shared/types)
```typescript
// Define once, import everywhere
export interface Event {
  id: string;
  title: string;
  tier: 'one-time' | 'yearly' | 'gift';
}

export interface Tier {
  id: string;
  name: string;
  price: number;
}
```

### Design Tokens (packages/design-tokens)
```javascript
// Export Tailwind config, color palette, spacing
export const colors = {
  primary: '#1a1a1a',
  accent: '#d4af37',
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
};
```

### UI Components (packages/ui-components)
```typescript
// Button, Card, Modal, etc.
// Used by web, admin, marketing site
export { Button } from './Button';
export { Card } from './Card';
```

## Benefits

### For Development
- **DRY**: Write types, utils, components once
- **Consistency**: All apps use same design tokens
- **Speed**: Incremental builds (only rebuild changed packages)

### For Teams
- **Ownership**: Clear package boundaries
- **Scaling**: New apps don't duplicate code
- **Onboarding**: Shared patterns, fewer decisions

## Build Performance

### Before (Single App)
- Full rebuild: 2 minutes
- Any change rebuilds everything

### After (Monorepo with Turborepo)
- Full build: 3-4 minutes (includes all apps)
- Changed app only: 20-30 seconds
- Caching reduces subsequent builds to seconds

## Deployment Strategy

### CI/CD with Monorepo
```bash
# Detect changed packages
turbo run build --filter=...

# Only deploy changed apps
yarn deploy --app=web
yarn deploy --app=api
```

## Teaching Perspective
- Shows how real companies organize polyglot projects
- Demonstrates dependency graph and caching
- Prepares students for enterprise-scale development
