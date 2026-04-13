# Content APIs Specification

> **Issue:** #180 · **Milestone:** Sprint 4 Infrastructure  
> **Author:** Dozer (Backend/Cloud) · **Status:** In Progress

---

## Overview

The Content APIs provide versioned, secure, multilingual access to tier-specific content—experiences, packages, specialist profiles, and FAQs. Hosted behind the Azure API Management gateway with per-tier content filtering, automatic caching, and developer portal support.

---

## 1. API Versioning Strategy

All endpoints use **URL path versioning** for stability and clarity:

```
GET /api/v1/tiers
GET /api/v2/tiers/{tierType}/catalog
```

### Versioning Rules

- **v1:** Current stable (tier-name, static content, no tier-type discrimination)
- **v2+:** Tier-type-aware responses, extended catalog filters
- Clients specify version in URL path, never headers
- Sunset policy: older versions supported for 12 months minimum
- Breaking changes (response shape, field removal) require new version
- Non-breaking additions (new fields, optional params) don't require version bump

---

## 2. REST Endpoints

### 2.1 Tier Endpoints

```http
GET /v1/tiers
  Response: { tiers: MembershipTier[] }
  Cache: 1 hour
  Description: All tiers (static tier cards, current shape)

GET /v2/tiers
  Response: { tiers: ServiceTier[] }
  Cache: 1 hour
  Description: All tiers with tier-type discrimination (one-time, yearly, gift)

GET /v2/tiers/{tierType}
  Params: tierType ∈ {one-time, yearly, gift}
  Response: ServiceTier
  Cache: 1 hour
  Description: Single tier detail with type-specific fields

GET /v2/tiers/{tierType}/catalog
  Params: tierType ∈ {one-time, yearly, gift}
  Query: ?limit=50&offset=0&language=en
  Response: { 
    experiences: Experience[],
    pagination: { total, limit, offset, hasMore }
  }
  Cache: 30 minutes
  Description: Curated experiences available for this tier type
  Note: Gift tier returns curated subset (high-value, gift-appropriate)
```

### 2.2 Experience Endpoints

```http
GET /v2/experiences
  Query: ?tierType=one-time&featured=true&limit=20&language=en
  Response: { 
    experiences: Experience[],
    pagination: { total, limit, offset }
  }
  Cache: 30 minutes
  Description: All experiences, filterable by tier type and featured status

GET /v2/experiences/{experienceId}
  Response: Experience (full detail, including tier-specific pricing)
  Cache: 30 minutes
  Description: Single experience with all tiers and availability

GET /v2/experiences/{experienceId}/reviews
  Query: ?limit=10&offset=0
  Response: { 
    reviews: Review[],
    avgRating: number,
    totalCount: number
  }
  Cache: 15 minutes
  Description: Aggregated reviews (tier-filtered if requested)
```

### 2.3 Specialist Endpoints

```http
GET /v2/specialists
  Query: ?expertise=event-design&language=en&limit=20
  Response: { 
    specialists: SpecialistProfile[],
    pagination: { total, limit, offset }
  }
  Cache: 1 hour
  Description: Searchable specialist profiles by expertise area

GET /v2/specialists/{specialistId}
  Response: SpecialistProfile (full bio, availability, rates by tier)
  Cache: 1 hour
  Description: Single specialist with portfolio and testimonials
```

### 2.4 FAQ Endpoints

```http
GET /v2/faqs
  Query: ?category=gifting&language=en
  Response: { 
    faqs: FAQ[],
    categories: string[]
  }
  Cache: 2 hours
  Description: Tier-aware FAQs (gift tier sees gift-specific Q&A)

GET /v2/faqs/{faqId}
  Response: FAQ (full with cross-links)
  Cache: 2 hours
  Description: Single FAQ with related questions
```

---

## 3. Per-Tier Content Filtering

### Gift Tier Content Restrictions

- **Experiences:** Curated, high-value, gift-appropriate only
- **Pricing:** Simplified, presented as "gift value" not subscription cost
- **Specialists:** Filtered to gift-familiar practitioners
- **FAQs:** Gift-specific, excludes yearly renewal questions

### Yearly Tier Content Restrictions

- Yearly-specific experiences (recurring, calendar-compatible)
- Recurring pricing models
- Specialists with availability for multiple bookings
- FAQs exclude one-time event logistics

### One-Time Tier Content

- Full catalog access (no restrictions)
- All specialists visible
- Event-centric FAQs

---

## 4. Data Models

```typescript
// Content Tier (static for rendering)
interface MembershipTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  featured: boolean;
  perks: string[];
  perTrip?: string;
}

// Tier-Aware Response (v2)
interface ServiceTier extends MembershipTier {
  tierType: 'one-time' | 'yearly' | 'gift';
  contentScope: 'full' | 'curated' | 'curated';
  restrictedCatalogs?: string[];
}

// Experience
interface Experience {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  tierAvailability: {
    tierType: 'one-time' | 'yearly' | 'gift';
    basePrice: number;
    currency: string;
    availableForTier: boolean;
  }[];
  durationMinutes: number;
  maxGuests: number;
  specialistIds: string[];
  rating: number;
  reviewCount: number;
}

// Specialist
interface SpecialistProfile {
  id: string;
  name: string;
  title: string;
  bio: string;
  expertiseAreas: string[];
  photoUrl: string;
  verified: boolean;
  experienceYears: number;
  languages: string[];
  availability: AvailabilitySlot[];
  ratesByTier: {
    tierType: 'one-time' | 'yearly' | 'gift';
    hourlyRate: number;
    minimumEngagement: string;
  }[];
  testimonials: Testimonial[];
}

// FAQ
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  applicableTiers: ('one-time' | 'yearly' | 'gift')[];
  order: number;
  lastUpdated: string;
}
```

---

## 5. Caching Strategy

| Endpoint | TTL | Invalidation |
|----------|-----|--------------|
| /v2/tiers | 1h | Manual (tier changes rare) |
| /v2/tiers/:tierType/catalog | 30m | On experience add/remove |
| /v2/experiences | 30m | On price/availability change |
| /v2/experiences/:id | 30m | On detail update |
| /v2/experiences/:id/reviews | 15m | New review published |
| /v2/specialists | 1h | On profile update |
| /v2/specialists/:id | 1h | On availability change |
| /v2/faqs | 2h | Manual (infrequent updates) |

**Invalidation Pattern:** APIM sends cache-bust event to Redis on CMS publish. Cache keys include language code (`en-us_tiers_v2`).

---

## 6. Rate Limiting & Security

### Rate Limits (per APIM policy)

```
Tier             Requests/min    Requests/day
─────────────────────────────────────────────
Free (unauthenticated)    20          10,000
Developer (key)          100          100,000
Production (service)    1,000        10,000,000
```

### Authentication

- **Unauthenticated:** Public endpoints (tiers, experiences, faqs) with rate limit ceiling
- **Authenticated:** Developer key required for unlimited tier catalog queries
- **Service-to-service:** Azure AD + managed identity for inter-service calls

---

## 7. Multilingual Support

- **Query parameter:** `?language=en` (default: en)
- **Supported:** en, es, fr, de, ja (extensible)
- **Fallback:** Missing translations default to English
- **Content model:** Cosmos DB stores translations as nested documents per language

---

## 8. Response Format

All responses follow a standard envelope:

```json
{
  "success": true,
  "data": { /* endpoint-specific */ },
  "meta": {
    "version": "v2",
    "timestamp": "2026-04-15T09:30:00Z",
    "language": "en",
    "cacheAge": 245
  },
  "errors": null
}
```

Error responses include error code and message for developer clarity.

---

## 9. Deployment Target

- **Gateway:** Azure API Management (APIM)
- **Storage:** Cosmos DB (content collection with language partitioning)
- **Cache:** Redis (APIM co-located)
- **CDN:** Azure CDN for static assets (images, videos)
- **Monitoring:** Application Insights (latency, error rates, tier-specific metrics)

---

## 10. Success Criteria

- ✅ v1 and v2 endpoints live alongside existing tier cards
- ✅ All endpoints cacheable and responding under 200ms (p99)
- ✅ Tier-specific filtering enforced server-side (no client-side filtering)
- ✅ Gift tier sees no yearly-specific content
- ✅ Rate limits enforced per APIM policies
