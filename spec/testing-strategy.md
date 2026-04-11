# Cross-Platform Testing Strategy

## Testing Pyramid

```
        E2E Tests (10%)
         /           \
      Integration (25%)
       /               \
    Unit Tests (65%)
```

### Unit Tests (Jest)
- **Goal**: Fast feedback on individual functions/components
- **Coverage Target**: 80%+
- **Speed**: 0.1-1s per test
- **Tools**: Jest, React Testing Library

### Integration Tests
- **Goal**: Verify component interactions, API layer behavior
- **Coverage**: Happy path + error cases
- **Speed**: 1-5s per test
- **Tools**: Jest, React Testing Library (API mocks)

### E2E Tests (Playwright)
- **Goal**: User journeys, cross-browser compatibility
- **Coverage**: Critical flows (signup, event booking, redemption)
- **Speed**: 10-30s per test
- **Tools**: Playwright, headed browser mode

## Unit Testing Strategy (Jest)

### File Structure
```
src/
├── services/
│   ├── EventService.ts
│   └── EventService.test.ts
├── utils/
│   ├── formatDate.ts
│   └── formatDate.test.ts
└── components/
    ├── EventCard.tsx
    └── EventCard.test.tsx
```

### Example: Service Test
```typescript
// EventService.test.ts
describe('EventService', () => {
  it('fetches events via adapter', async () => {
    const mockAdapter = {
      getEvents: jest.fn().mockResolvedValue([
        { id: '1', title: 'Gala', tier: 'one-time' },
      ]),
    };
    
    const service = new EventService(mockAdapter);
    const events = await service.getEvents();
    
    expect(events).toHaveLength(1);
    expect(mockAdapter.getEvents).toHaveBeenCalled();
  });
});
```

## Integration Testing

### Test Scenarios by Tier

#### One Time Events
```typescript
describe('One Time Event Flow', () => {
  it('client can create single event', async () => {
    // Setup: authenticated as client
    // Action: POST /api/events
    // Assert: event created, client owns it
  });
  
  it('event data purged after 90 days', async () => {
    // Setup: create event, advance time
    // Action: query event DB
    // Assert: event data deleted
  });
  
  it('guest list visible to planner only', async () => {
    // Setup: create event with attendees
    // Action: GET /api/events/{id}/attendees (as event planner)
    // Assert: attendees returned
    // Action: same request as external user
    // Assert: 403 Forbidden
  });
});
```

#### Yearly Programs
```typescript
describe('Yearly Program Flow', () => {
  it('organization can create multiple events', async () => {
    // Setup: authenticated as org admin (yearly tier)
    // Action: POST /api/events (3 events)
    // Assert: all 3 created, linked to org
  });
  
  it('cross-event reporting available', async () => {
    // Setup: create 3 events with attendees
    // Action: GET /api/reports/attendance
    // Assert: aggregated data across all events
  });
});
```

#### Gift Programs
```typescript
describe('Gift Redemption Flow', () => {
  it('recipient sees gift without personal details', async () => {
    // Setup: create gift, load as gift recipient
    // Action: GET /api/gifts/{id}
    // Assert: title/description present, recipient PII redacted
  });
  
  it('redemption reveals experience details', async () => {
    // Setup: recipient redeems gift
    // Action: POST /api/gifts/{id}/redeem
    // Assert: event details + access credentials returned
  });
  
  it('gifter cannot access recipient identity pre-redemption', async () => {
    // Setup: create gift
    // Action: GET /api/gifts/{id}/recipient (as gifter)
    // Assert: 403 Forbidden
  });
});
```

## E2E Testing Strategy (Playwright)

### Critical User Journeys

#### Journey 1: Event Discovery → Booking
```typescript
test('user can discover and book one-time event', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Browse Events');
  await page.fill('[placeholder="Search"]', 'Gala');
  await page.click('text=Gala Event');
  
  // View event details
  expect(page.locator('text=April 15, 2024')).toBeVisible();
  
  // Book
  await page.click('text=Book Now');
  await page.fill('[name="email"]', 'guest@example.com');
  await page.click('text=Confirm Booking');
  
  // Assert booking confirmation
  expect(page.locator('text=Booking Confirmed')).toBeVisible();
});
```

#### Journey 2: Event Planner Setup (Yearly)
```typescript
test('event planner creates recurring event series', async ({ page }) => {
  await loginAs(page, 'planner@org.com', 'yearly');
  
  await page.goto('/admin/events/create');
  await page.fill('[name="title"]', 'Monthly Networking');
  await page.selectOption('[name="frequency"]', 'monthly');
  
  await page.click('text=Create Series');
  
  // Assert series created
  expect(page.locator('text=12 events scheduled')).toBeVisible();
});
```

#### Journey 3: Gift Redemption
```typescript
test('recipient redeems and attends gift experience', async ({ page }) => {
  const giftCode = await generateGiftCode();
  
  // Recipient discovers gift
  await page.goto(`/redeem?code=${giftCode}`);
  expect(page.locator('text=You\'ve been gifted')).toBeVisible();
  
  // Redeem
  await page.click('text=Redeem Gift');
  await page.fill('[name="email"]', 'recipient@example.com');
  await page.click('text=Confirm');
  
  // Verify access granted
  expect(page.locator('text=Check-in Instructions')).toBeVisible();
});
```

## API Testing

### Endpoint Coverage
```typescript
// tests/api/events.test.ts
describe('GET /api/events', () => {
  it('returns events filtered by tier', async () => {
    const res = await fetch('/api/events?tier=one-time');
    expect(res.status).toBe(200);
    
    const events = await res.json();
    expect(events.every(e => e.tier === 'one-time')).toBe(true);
  });
  
  it('requires authentication', async () => {
    const res = await fetch('/api/events');
    expect(res.status).toBe(401);
  });
  
  it('enforces tier-based access control', async () => {
    const res = await fetch('/api/events', {
      headers: { Authorization: `Bearer ${giftRecipientToken}` },
    });
    // Gift recipients see limited events
    expect(res.status).toBe(200);
  });
});
```

## CI/CD Integration

### GitHub Actions
```yaml
name: Tests
on: [push, pull_request]

jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run test:unit -- --coverage
      
  integration:
    runs-on: ubuntu-latest
    services:
      postgres: ...
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run test:integration
      
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test:e2e
```

## Test Coverage Goals

| Test Type | Target Coverage | Execution Time |
|-----------|-----------------|-----------------|
| Unit | 80%+ | < 30s |
| Integration | 60%+ | < 2min |
| E2E | Critical paths | < 5min |

## Teaching Value
- **TDD Mindset**: Tests written before features
- **Test Pyramid**: Why unit tests first
- **Tier-Specific Testing**: How business models affect test strategy
- **CI Best Practices**: Automated quality gates
