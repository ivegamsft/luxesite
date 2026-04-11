# Azure Target Architecture

> **Issue:** #184 · **Milestone:** Sprint 4 Infrastructure  
> **Author:** Dozer (Backend/Cloud) · **Status:** In Progress

---

## Overview

Aurora Luxe production architecture on Azure: distributed services (Container Apps), versioned APIs (APIM), scalable data (Cosmos DB + PostgreSQL), edge delivery (CDN), and observability (Application Insights). This architecture teaches multi-service deployment, database polyglot patterns, and enterprise gateway practices.

---

## 1. Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                   Azure CDN (Edge)                          │
│              Static Frontend + Assets Caching               │
└────────────────────────┬────────────────────────────────────┘
                         │
┌─────────────────────────▼────────────────────────────────────┐
│        Azure API Management (APIM) Gateway                   │
│  - Request throttling, routing, auth, versioning             │
│  - Developer portal, API versioning policies                 │
│  - Cache (Redis) for responses                               │
└──────┬──────────────────────┬──────────────────┬─────────────┘
       │                      │                  │
       ▼                      ▼                  ▼
 ┌──────────────┐      ┌──────────────┐  ┌──────────────┐
 │ Content API  │      │ Booking API  │  │  Auth API    │
 │  Container   │      │  Container   │  │  Container   │
 │   App        │      │   App        │  │   App        │
 └──────┬───────┘      └──────┬───────┘  └──────┬───────┘
        │                     │                 │
        └─────────────────────┼─────────────────┘
                              │
        ┌─────────────────────┼─────────────────┐
        │                     │                 │
        ▼                     ▼                 ▼
 ┌────────────────┐ ┌─────────────────┐ ┌──────────────┐
 │  Cosmos DB     │ │  PostgreSQL     │ │ Azure Key    │
 │ (Content)      │ │ (Transactions)  │ │ Vault        │
 │ - Experiences │ │ - Bookings      │ │ (Secrets)    │
 │ - FAQs         │ │ - Payments      │ │              │
 │ - Multilingual │ │ - Users         │ │              │
 └────────────────┘ └─────────────────┘ └──────────────┘
        │                     │
        └─────────────────────┼──────────┐
                              │          │
                              ▼          ▼
                      ┌──────────────────────────┐
                      │  Application Insights    │
                      │  - Logging, Tracing      │
                      │  - Performance Metrics   │
                      │  - Alerts & Analytics    │
                      └──────────────────────────┘
```

---

## 2. Core Components

### 2.1 Azure Container Apps

**Purpose:** Host microservices with automatic scaling, built-in networking, and zero-infrastructure overhead.

**Services:**

| Service | Port | Purpose | Replicas |
|---------|------|---------|----------|
| Content API | 3001 | Tier-aware content delivery | 2–10 |
| Booking API | 3002 | Consultation + transaction flows | 3–15 |
| Auth API | 3003 | JWT + session management | 2–6 |

**Configuration:**

```yaml
# Container App Properties
cpu: 0.5–2 CPU
memory: 1–4 Gi
minReplicas: 2 (prod), 1 (staging), 1 (dev)
maxReplicas: 10, 15, 6 (per service)
scalingRules:
  - metricType: cpu
    threshold: 70%
  - metricType: memory
    threshold: 80%
  - metricType: http_request_rate
    threshold: 1000 req/min
```

**Network:** Private VNet integration, internal DNS, no public IP.

---

### 2.2 Azure API Management (APIM)

**Purpose:** Single entry point, request routing, throttling, versioning, developer portal.

**Capabilities:**

- **Request Throttling:** 100 req/sec per API key (configurable)
- **Versioning:** URL path (`/v1/`, `/v2/`) routing to backend versions
- **Authentication:** API keys, Azure AD (B2C for external developers)
- **Caching:** Redis co-hosted, 30min–2hr TTLs per endpoint
- **Developer Portal:** Auto-generated docs, API testing, key management
- **Logging:** All requests → Application Insights

**Policies Applied:**

```xml
<!-- Rate Limiting -->
<rate-limit-by-key calls="100" renewal-period="60" counter-key="@(context.Request.Headers.GetValueOrDefault("X-API-Key"))" />

<!-- Response Caching -->
<cache-lookup vary-by-developer="true" vary-by-developer-groups="true" />

<!-- Backend Routing (v1 → legacy, v2 → new) -->
<choose>
  <when condition="@(context.Request.Url.Path.StartsWith("/v1/"))">
    <set-backend-service base-url="https://content-api-v1.app.azurecontainers.io" />
  </when>
  <when condition="@(context.Request.Url.Path.StartsWith("/v2/"))">
    <set-backend-service base-url="https://content-api-v2.app.azurecontainers.io" />
  </when>
</choose>
```

---

### 2.3 Azure Cosmos DB

**Purpose:** Globally distributed, schema-flexible content storage (experiences, FAQs, specialist profiles).

**Configuration:**

```
Database: aurora-luxe-prod
Container: experiences
  - Partition Key: /category
  - TTL: 2,592,000 seconds (30 days) for cached views
  - Indexing: All paths (default)
  - Throughput: Autoscale 400–20,000 RU/s

Container: faqs
  - Partition Key: /language
  - Throughput: Autoscale 400–4,000 RU/s

Container: specialist_profiles
  - Partition Key: /tierType
  - Throughput: Autoscale 400–10,000 RU/s
```

**Replication:** Single-region (eastus2, primary); failover to westus2 for HA.

---

### 2.4 Azure PostgreSQL

**Purpose:** Transactional data (bookings, payments, subscriptions, user accounts).

**Configuration:**

```
SKU: Standard_B4ms (4 vCore, 16 GB RAM)
High Availability: Zone-redundant (3 AZs)
Backup: 7-day retention, automated daily
Scaling: Vertical (CPU/memory), not horizontal
Connection pooling: pgBouncer (max 500 connections)
Storage: 256 GB, autogrow to 1 TB
```

**Databases:**

- `aurora_bookings`: Consultation flows, booking records
- `aurora_transactions`: Payments, refunds, invoices
- `aurora_users`: Accounts, auth, profiles

---

### 2.5 Azure Key Vault

**Purpose:** Centralized secrets, API keys, certificates, connection strings.

**Stored Secrets:**

```
azure-db-connection-string    PostgreSQL conn string
azure-cosmos-key               Cosmos DB primary key
jwt-secret                     JWT signing key
stripe-api-key                 Payment processor key
sendgrid-api-key               Email service key
cdn-origin-key                 CDN authentication token
```

**Access:** Container Apps via managed identity (no keys in env vars).

---

### 2.6 Azure CDN

**Purpose:** Global edge caching for frontend assets (HTML, CSS, JS, images).

**Configuration:**

```
Profile: Standard (Microsoft edge network)
Endpoint: aurora-luxe.azureedge.net
Origin: Container Apps (frontend service)
Caching Rules:
  - *.html         → 5 min (must revalidate)
  - *.js, *.css    → 24 hours
  - /assets/images → 30 days
  - /api/*         → No cache (origin-only)
```

**Compression:** gzip enabled for text (HTML, JSON, JS).

---

### 2.7 Application Insights

**Purpose:** Full observability—logs, traces, metrics, errors.

**Instrumentation:**

```
SDK: Application Insights SDK (Node.js / .NET)
Collection:
  - HTTP request/response (duration, status, headers)
  - Exceptions and stack traces
  - Performance counters (CPU, memory)
  - Custom events (booking created, payment processed)
  - Dependency tracking (Cosmos, PostgreSQL, APIM calls)
  - User sessions and page views

Sampling: 100% in prod for first 1 month, then adaptive (50% normal, 100% on errors)
Retention: 90 days (default)
```

**Dashboards:**

- Request volume + latency (p50, p95, p99)
- Error rate + exception breakdown
- Database query duration
- Container App CPU/memory utilization
- API gateway throttle events

---

## 3. Deployment Topology

### 3.1 Environments

| Environment | Region | Replicas | Autoscale | Backup |
|-------------|--------|----------|-----------|--------|
| **prod** | eastus2 (primary) + westus2 (failover) | 3–15 | Yes | Hourly + geo-redundant |
| **staging** | eastus2 | 1–5 | Yes | Daily |
| **dev** | eastus2 | 1 | No | None |

### 3.2 Networking

All resources deployed in private VNet (`10.0.0.0/16`):

```
Subnets:
  - Container Apps subnet (10.0.1.0/24)
  - Database subnet (10.0.2.0/24)
  - APIM subnet (10.0.3.0/24)

Ingress:
  - Public: APIM only (frontend → APIM → backend services)
  - Internal: Container-to-container via Azure DNS

Egress:
  - Outbound to payment APIs, email service via NAT Gateway
  - No direct internet access (security boundary)
```

---

## 4. Data Flow Example: Booking Creation (One Time)

```
1. Client: POST /api/v2/bookings/one-time { eventBrief, eventDate, guestCount }
   ↓
2. APIM: Auth check (API key), rate limit check, cache lookup
   ↓
3. APIM routes → Booking API Container (Round-robin load balance)
   ↓
4. Booking API:
   - Validate input
   - Query PostgreSQL: SELECT * FROM tiers WHERE tierType = 'one-time'
   - Query Cosmos: SELECT specialists WHERE expertise = 'event-design'
   - Create booking record in PostgreSQL
   - Emit event: BookingCreated → Application Insights
   ↓
5. Response: { bookingId, status: 'inquiry', specialist recommendations }
   ↓
6. APIM: Cache response (TTL: 15 min), log to Application Insights
   ↓
7. Client receives bookingId + next steps
```

---

## 5. Scalability & Performance

### Container Scaling (Autoscale Policies)

```
Content API:
  Min: 2 replicas (always-on)
  Max: 10 replicas
  Target: 70% CPU, 1000 req/min per replica

Booking API:
  Min: 3 replicas (higher baseline)
  Max: 15 replicas
  Target: 70% CPU, 500 req/min per replica (heavier transactions)
```

### Database Optimization

**Cosmos:** Autoscale RU/s (400–20k), partition by category (prevents hot partitions).

**PostgreSQL:** Read replicas in secondary region (failover), connection pooling via pgBouncer.

---

## 6. Disaster Recovery

| Component | RTO | RPO | Strategy |
|-----------|-----|-----|----------|
| Container Apps | 5 min | < 1 min | Auto-failover to secondary region |
| Cosmos DB | 15 min | < 5 sec | Geo-replication (eventual consistency) |
| PostgreSQL | 30 min | < 5 min | Zone-redundant HA + daily backup |
| CDN | 2 min | < 1 min | Origin failover to backup storage |

---

## 7. Security Posture

- **Network:** Private VNet, no public IPs, egress via NAT Gateway
- **Auth:** Azure AD + JWT, API key rotation quarterly
- **Secrets:** Key Vault with RBAC, no hardcoded credentials
- **Data:** Encryption at-rest (Cosmos, PostgreSQL) + TLS in-transit
- **Monitoring:** All API calls logged, suspicious patterns alerted (DDoS, enumeration attacks)

---

## 8. Estimated Monthly Cost

```
Component             Estimate (USD)
────────────────────────────────────
Container Apps        $2,000
APIM                  $1,500 (developer tier + requests)
Cosmos DB             $800
PostgreSQL            $600
CDN                   $300
Key Vault             $100
Application Insights  $200
─────────────────────────────────
TOTAL (prod)          ~$5,500/month
```

---

## 9. Success Criteria

- ✅ All services respond under 200ms (p99)
- ✅ 99.9% uptime across all components
- ✅ Auto-failover between regions in < 5 minutes
- ✅ Full audit trail (all API calls logged to Application Insights)
- ✅ Zero secrets in code or container images
