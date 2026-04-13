# Frontend Data Migration Strategy

## Overview
Aurora Luxe currently serves static content from TypeScript files. This document outlines a phased migration to API-backed content, demonstrating how real applications evolve from static to dynamic architectures while maintaining teaching clarity.

## Current State: Static Files (Phase 1)

### Structure
```
apps/web/src/data/
  ├── events.ts (hardcoded event listings)
  ├── tiers.ts (tier descriptions)
  ├── testimonials.ts (static reviews)
```

### Limitations
- Manual data updates require code changes
- No personalization or real-time updates
- Doesn't scale to concurrent users
- Ties data to deployment cycle

## Phase 2: API Layer

### Approach
Introduce API abstraction layer without changing UI.

### Data Adapter Pattern
```typescript
// apps/web/src/services/EventService.ts
export interface EventAdapter {
  getEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event>;
}

// Static adapter (Phase 1 fallback)
export class StaticEventAdapter implements EventAdapter {
  async getEvents(): Promise<Event[]> {
    return STATIC_EVENTS; // from events.ts
  }
}

// API adapter (Phase 2)
export class APIEventAdapter implements EventAdapter {
  async getEvents(): Promise<Event[]> {
    const res = await fetch('/api/events');
    return res.json();
  }
}
```

### Gradual Rollout
- Feature flag: `USE_API_EVENTS`
- Can flip per page or component
- Fallback to static if API fails

### API Endpoints (Phase 2)
```
GET /api/events                    # List all events
GET /api/events/{id}               # Single event detail
GET /api/tiers                     # Tier listings
GET /api/testimonials              # User testimonials
```

## Phase 3: CMS-Backed Content

### Architecture
```
Frontend (Next.js)
  ↓
Data Adapter Pattern
  ↓
CMS API (Hygraph or Sanity)
  ↓
Database
```

### Key Benefits
- Non-technical content management
- Scheduled content updates
- Multi-language support (i18n)
- A/B testing capabilities

### Adapter Extension
```typescript
export class CMSEventAdapter implements EventAdapter {
  async getEvents(): Promise<Event[]> {
    const query = gql`query { events { id title description } }`;
    const data = await cmsClient.request(query);
    return data.events;
  }
}
```

## Migration Steps

### Step 1: Create Adapters (Week 1)
- Write `EventAdapter` interface
- Implement `StaticEventAdapter` (wraps Phase 1 files)
- Inject adapter into components via React Context

### Step 2: Build API (Week 2-3)
- Create Next.js API routes (`/api/events`, etc.)
- Connect to mock database (PostgreSQL)
- Implement `APIEventAdapter`

### Step 3: Gradual Rollout (Week 4)
- Deploy with feature flag disabled (API adapter in code, not active)
- Enable per-route or user segment
- Monitor metrics, rollback if needed

### Step 4: CMS Integration (Future)
- Replace mock DB with real CMS
- Sync content to cache layer (Redis)
- Implement revalidation strategy

## Teaching Value

This demonstrates:
- **Design Patterns**: Adapter pattern for extensibility
- **Decoupling**: UI logic from data source
- **Feature Flags**: Safe deployment of large changes
- **Real-world Evolution**: How startups scale from static to dynamic
- **Testing**: Mockable data layer improves test coverage

## Data Transformation

### Mapping Layer (handles API differences)
```typescript
// Raw API response might differ from static format
function mapAPIEventToUI(apiEvent: APIEvent): UIEvent {
  return {
    id: apiEvent.id,
    title: apiEvent.name, // API uses 'name', UI uses 'title'
    description: apiEvent.description,
  };
}
```

## Implementation Notes
- Cache API responses (stale-while-revalidate strategy)
- Implement error boundaries for failed API calls
- Use React Query or SWR for data fetching
- Log adapter type used (debugging/analytics)
