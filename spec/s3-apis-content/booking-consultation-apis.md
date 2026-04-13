# Booking & Consultation APIs Specification

> **Issue:** #195 · **Milestone:** Sprint 4 Infrastructure  
> **Author:** Dozer (Backend/Cloud) · **Status:** In Progress

---

## Overview

Three distinct consultation flows (one-time event, yearly subscription, gift purchase) with separate state machines, booking lifecycle tracking, and payment integration touchpoints. Each tier type has unique API endpoints, validation rules, and data requirements reflecting the core business model divergence.

---

## 1. One-Time Event Flow

### Lifecycle

```
inquiry → planning → confirmed → executed → completed
```

### API Endpoints

```http
POST /v2/bookings/one-time
  Request: {
    tierType: "one-time",
    eventBrief: string,           // "Corporate gala for 150, luxury aesthetic"
    eventDate: ISO8601,            // "2026-06-15T18:00:00Z"
    guestCount: number,            // 150
    venuePreferences: string,       // "Hotel Grand Ballroom or outdoor estate"
    budgetRange: {
      min: number,  currency: "USD"  // 50000
      max: number   currency: "USD"  // 75000
    },
    specialRequirements: string    // "Vegan catering, live jazz band"
  }
  Response: {
    bookingId: string (UUID),
    status: "inquiry",
    consultationSlots: { datetime[], specialistId[] },
    nextSteps: string[]
  }
  201 Created

GET /v2/bookings/{bookingId}
  Response: OneTimeEvent (full record)
  200 OK

PUT /v2/bookings/{bookingId}
  Request: { status, eventDetails }  // Move from inquiry → planning
  Response: OneTimeEvent (updated)
  200 OK

GET /v2/bookings/{bookingId}/timeline
  Response: {
    current: { phase, lastUpdated },
    milestones: [
      { date: "2026-03-15", description: "Initial consultation" },
      { date: "2026-04-01", description: "Contract signed" },
      { date: "2026-05-15", description: "Final walkthrough" }
    ],
    nextDeadline: ISO8601
  }
  200 OK
```

### State Machine

```
┌─────────┐
│ inquiry │  ← POST /one-time
└────┬────┘
     │ PUT { status: "planning" }  (after consultant call)
     ▼
┌─────────────┐
│  planning   │  ← Requires payment of 25% deposit
└────┬────────┘
     │ PUT { status: "confirmed" }  (contract + 25% paid)
     ▼
┌──────────────┐
│ confirmed    │  ← Full deposit required, finalization 2 weeks before
└────┬─────────┘
     │ POST /payments/charge { amount: 50% of total }
     ▼
┌──────────────┐
│  executed    │  ← Event happens
└────┬─────────┘
     │ (automatic: 24h after eventDate)
     ▼
┌──────────────┐
│ completed    │  ← Final invoice, feedback collection
└──────────────┘
```

### Validation Rules

```typescript
// One-Time Booking Validation

function validateOneTimeBooking(booking: OneTimeEvent): ValidationError[] {
  const errors: ValidationError[] = [];

  // Date must be 30+ days in future
  if (new Date(booking.eventDate) < addDays(now(), 30)) {
    errors.push('Event date must be at least 30 days from today');
  }

  // Budget range sanity checks
  if (booking.budgetRange.max < 25000) {
    errors.push('Minimum event budget is $25,000');
  }
  if (booking.budgetRange.max - booking.budgetRange.min > 100000) {
    errors.push('Budget range cannot exceed $100,000 spread');
  }

  // Guest count reasonable for tier
  if (booking.guestCount < 50 || booking.guestCount > 1000) {
    errors.push('Event must have 50–1,000 guests');
  }

  // Event brief required
  if (!booking.eventBrief || booking.eventBrief.length < 50) {
    errors.push('Event brief must be at least 50 characters');
  }

  return errors;
}
```

---

## 2. Yearly Subscription Flow

### Lifecycle

```
needs-assessment → active → paused → cancelled | expired → completed
```

### API Endpoints

```http
POST /v2/bookings/yearly
  Request: {
    tierType: "yearly",
    familySize: number,            // 4
    childrenAges: number[],        // [5, 8, 12]
    interestAreas: string[],       // ["milestone celebrations", "family adventures"]
    annualDates: {
      date: string (MM-DD),        // Important dates for events
      description: string
    }[],
    dietaryRestrictions: string,   // "nut allergies, vegetarian"
    preferredRegions: string[]     // ["Pacific Northwest", "California"]
  }
  Response: {
    bookingId: string (UUID),
    status: "needs-assessment",
    subscriptionStart: ISO8601,
    subscriptionEnd: ISO8601,
    eventsIncluded: 12,
    eventsUsed: 0,
    nextSteps: string[]
  }
  201 Created

GET /v2/bookings/{bookingId}
  Response: YearlySubscription (full record)
  200 OK

GET /v2/bookings/{bookingId}/events
  Query: ?used=true&limit=12
  Response: {
    events: BookedEvent[],
    pagination: { total, limit, offset }
  }
  200 OK

PUT /v2/bookings/{bookingId}/pause
  Request: { reason: string, durationMonths: number }
  Response: YearlySubscription { status: "paused" }
  200 OK

PUT /v2/bookings/{bookingId}/resume
  Response: YearlySubscription { status: "active" }
  200 OK

POST /v2/bookings/{bookingId}/cancel
  Request: { reason: string }
  Response: YearlySubscription { status: "cancelled" }
  200 OK

GET /v2/bookings/{bookingId}/calendar
  Response: {
    calendar: [
      {
        month: "June",
        events: [
          { date: "2026-06-15", type: "milestone", description: "Summer adventure" }
        ]
      }
    ]
  }
  200 OK
```

### State Machine

```
┌────────────────────┐
│ needs-assessment   │  ← POST /yearly
└────┬───────────────┘
     │ PUT { status: "active" }  (after needs call + annual payment)
     ▼
┌────────────────────┐
│     active         │  ← Subscription begins, events can be booked
├─────┬──────────────┤
│     │              │
│     │ (event used) │  Max 12/year
│     │              │
├─────▼──────────────┤  ← Can pause/resume throughout year
│ paused (optional)  │
└────┬───────────────┘
     │
     ├─ (year ends) → auto-renewal decision
     │
     ├─ PUT /cancel → cancelled
     │
     └─ (12 months elapsed) → expired
          ↓
     ┌──────────────┐
     │  expired     │  ← Offer renewal
     └──────────────┘
```

### Validation Rules

```typescript
function validateYearlyBooking(booking: YearlySubscription): ValidationError[] {
  const errors: ValidationError[] = [];

  // Family size 2–10 people
  if (booking.familySize < 2 || booking.familySize > 10) {
    errors.push('Family size must be 2–10 people');
  }

  // Children ages 0–18 only
  booking.childrenAges.forEach((age, idx) => {
    if (age < 0 || age > 18) {
      errors.push(`Child ${idx} age must be 0–18`);
    }
  });

  // At least 1 interest area
  if (!booking.interestAreas || booking.interestAreas.length === 0) {
    errors.push('Select at least one interest area');
  }

  // Max 12 annual dates
  if (booking.annualDates.length > 12) {
    errors.push('Cannot have more than 12 annual event dates');
  }

  return errors;
}
```

---

## 3. Gift Tier Flow

### Lifecycle (Buyer)

```
purchase → delivered → (awaiting recipient activation)
```

### Lifecycle (Recipient)

```
(receives code) → activated → (converts to one-time booking)
```

### API Endpoints

```http
POST /v2/bookings/gift
  Request: {
    tierType: "gift",
    buyerName: string,
    buyerEmail: string,
    buyerPhone: string,
    recipientName: string,
    recipientEmail: string,
    occasion: string,              // "30th birthday"
    message: string,
    deliveryMethod: "email" | "physical" | "surprise",
    giftValue: { amount: 250000, currency: "USD" }
  }
  Response: {
    bookingId: string (UUID),
    status: "purchased",
    giftCode: string (6-char alphanumeric, URL-safe),
    expiresAt: ISO8601 (18 months from now),
    giftUrl: string (recipient-facing link)
  }
  201 Created

POST /v2/bookings/gift/redeem
  Request: {
    giftCode: string,
    recipientName: string,
    recipientEmail: string,
    password: string  // Create recipient account on first redeem
  }
  Response: {
    giftId: string,
    status: "activated",
    oneTimeBookingId: string (newly created),
    nextSteps: ["Complete event brief", "Schedule consultation"]
  }
  200 OK

GET /v2/bookings/gift/{giftCode}
  Description: Lookup gift status by code (no auth required)
  Response: {
    occasion: string,
    message: string,
    expiresAt: ISO8601,
    redeemed: boolean,
    status: "purchased" | "delivered" | "activated" | "expired"
  }
  200 OK | 404 Not Found

GET /v2/bookings/{bookingId}
  Response: GiftPurchase (full record for buyer/recipient)
  200 OK
```

### State Machine (Buyer)

```
┌────────────┐
│ purchased  │  ← POST /gift
└────┬───────┘
     │ Email sent to buyer with confirmation
     ▼
┌────────────┐
│ delivered  │  ← Email/physical delivery to recipient
└────┬───────┘
     │
     └─ (recipient activates) → CONVERTED TO ONE-TIME BOOKING
            ↓
     ┌──────────────┐
     │  activated   │  ← Recipient now in one-time workflow
     └──────────────┘
```

### Validation Rules

```typescript
function validateGiftPurchase(gift: GiftPurchase): ValidationError[] {
  const errors: ValidationError[] = [];

  // Buyer email ≠ recipient email (should not gift to self)
  if (gift.buyer.email === gift.recipient.email) {
    errors.push('Buyer and recipient must be different people');
  }

  // Recipient email not already an active user
  const recipientExists = await findActiveUser(gift.recipient.email);
  if (recipientExists) {
    errors.push('Recipient already has an account. Gift codes cannot be redeemed to existing accounts.');
  }

  // Occasion string required
  if (!gift.occasion || gift.occasion.length < 10) {
    errors.push('Occasion must be at least 10 characters');
  }

  // Valid delivery method
  if (!['email', 'physical', 'surprise'].includes(gift.deliveryMethod)) {
    errors.push('Invalid delivery method');
  }

  return errors;
}

function validateGiftRedeem(code: string, email: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // Code must be valid and not expired
  const gift = await findGiftByCode(code);
  if (!gift) {
    errors.push('Invalid gift code');
    return errors;
  }

  if (new Date(gift.expiresAt) < now()) {
    errors.push('This gift has expired (18 months from purchase)');
  }

  if (gift.status === 'activated') {
    errors.push('This gift has already been redeemed');
  }

  // Recipient email must match
  if (gift.recipient.email !== email) {
    errors.push('Email does not match gift recipient');
  }

  return errors;
}
```

---

## 4. Payment Integration Touchpoints

### One-Time Payment Flow

```
inquiry → [25% deposit due] → planning → [50% balance due] → confirmed → executed → [final invoice]
```

**Touchpoints:**
- `POST /api/payments/create-intent` (after planning, collect 25%)
- `POST /api/payments/confirm` (webhook from Stripe)
- `POST /api/payments/refund` (if cancelled during planning)

### Yearly Payment Flow

```
needs-assessment → [Annual subscription cost due] → active
```

**Touchpoints:**
- `POST /api/payments/subscribe` (initial annual payment)
- `POST /api/payments/renew` (auto-renewal yearly, 30 days before expiry)

### Gift Payment Flow

```
gift purchase → [Full gift value charged] → delivered → redeemed (no new charge)
```

**Touchpoints:**
- `POST /api/payments/charge-gift` (full amount at purchase time)

---

## 5. Data Models

```typescript
// Base booking
interface Booking {
  id: string;
  tierType: 'one-time' | 'yearly' | 'gift';
  userId: string;
  createdAt: ISO8601;
  updatedAt: ISO8601;
  notes: string[];
}

// One-Time Event
interface OneTimeEvent extends Booking {
  tierType: 'one-time';
  eventBrief: string;
  eventDate: ISO8601;
  guestCount: number;
  venuePreferences: string;
  budgetRange: { min, max, currency };
  specialRequirements: string;
  status: 'inquiry' | 'planning' | 'confirmed' | 'executed' | 'completed';
  assignedSpecialist?: string;
  depositPaid: boolean;
  totalCost: number;
}

// Yearly Subscription
interface YearlySubscription extends Booking {
  tierType: 'yearly';
  familySize: number;
  childrenAges: number[];
  interestAreas: string[];
  annualDates: { date: string, description: string }[];
  dietaryRestrictions: string;
  preferredRegions: string[];
  status: 'needs-assessment' | 'active' | 'paused' | 'cancelled' | 'expired';
  subscriptionStart: ISO8601;
  subscriptionEnd: ISO8601;
  eventsIncluded: number;
  eventsUsed: number;
  annualCost: number;
}

// Gift Purchase
interface GiftPurchase extends Booking {
  tierType: 'gift';
  buyer: ContactInfo;
  recipient: ContactInfo;
  occasion: string;
  message: string;
  deliveryMethod: 'email' | 'physical' | 'surprise';
  giftCode: string;
  giftValue: number;
  status: 'purchased' | 'delivered' | 'activated' | 'redeemed' | 'expired';
  redeemed: boolean;
  redeemedAt?: ISO8601;
  expiresAt: ISO8601;
  convertedToOneTimeId?: string;  // One-time booking created on redeem
}

interface ContactInfo {
  name: string;
  email: string;
  phone?: string;
}
```

---

## 6. Error Handling

```typescript
// Standard error responses

interface APIError {
  code: string;
  message: string;
  details?: object;
  timestamp: ISO8601;
}

// Examples:
{
  "code": "BOOKING_EXPIRED",
  "message": "This gift has expired (18 months from purchase)",
  "timestamp": "2026-04-15T09:30:00Z"
}

{
  "code": "VALIDATION_ERROR",
  "message": "Booking validation failed",
  "details": {
    "errors": [
      { "field": "eventDate", "message": "Event date must be 30+ days from today" },
      { "field": "guestCount", "message": "Guest count must be 50–1,000" }
    ]
  }
}

{
  "code": "PAYMENT_FAILED",
  "message": "Payment processing failed",
  "details": { "stripeErrorCode": "card_declined" }
}
```

---

## 7. Success Criteria

- ✅ Each booking type has separate endpoints (no messy union types)
- ✅ State machines enforce valid transitions (no inquiry → completed without planning)
- ✅ Validation rules per tier type (50 guest min for one-time, but no guest count for yearly)
- ✅ Payment integration touchpoints defined (no actual payment processing in this spec)
- ✅ Gift tier two-party flow supported (buyer ≠ recipient)
- ✅ All endpoints respond under 500ms
- ✅ Comprehensive error messages for developers
