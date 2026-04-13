# Environment Strategy Specification

> **Issue:** #193 · **Milestone:** Sprint 4 Infrastructure  
> **Author:** Dozer (Backend/Cloud) · **Status:** In Progress

---

## Overview

Three-tier environment model (dev, staging, production) with feature flags, promotion workflows, approval gates, and environment-specific configuration. Enables safe testing, progressive rollout, and quick rollback without code changes.

---

## 1. Environment Tiers

### Development (dev)

- **Purpose:** Continuous integration, rapid iteration
- **Lifecycle:** Resets daily from main branch
- **Data:** Synthetic test data, no real bookings
- **Replicas:** 1 (no HA)
- **Scale:** Single region (eastus2)
- **Retention:** 7 days
- **Access:** Team only, no external traffic
- **Cost:** ~$500/month

**Configuration:**
```yaml
DATABASE_URL: postgresql://user:pass@dev-postgres.database.azure.com/aurora_dev
COSMOS_ENDPOINT: https://aurora-dev.documents.azure.com:443/
FEATURE_FLAGS_SERVICE: dev-appconfig.azconfig.io
LOG_LEVEL: debug
CACHE_TTL: 5m (short for fast iteration)
```

---

### Staging

- **Purpose:** Pre-production testing, QA validation
- **Lifecycle:** Mirrors production (same schema, configs)
- **Data:** Anonymized production snapshots (weekly refresh)
- **Replicas:** 2–5 (autoscale)
- **Scale:** Single region (eastus2)
- **Retention:** 30 days
- **Access:** Team + QA partners
- **Cost:** ~$1,500/month

**Configuration:**
```yaml
DATABASE_URL: postgresql://user:pass@staging-postgres.database.azure.com/aurora_staging
COSMOS_ENDPOINT: https://aurora-staging.documents.azure.com:443/
FEATURE_FLAGS_SERVICE: staging-appconfig.azconfig.io
LOG_LEVEL: info
CACHE_TTL: 30m
```

---

### Production

- **Purpose:** Live services, real bookings
- **Lifecycle:** Continuous availability (99.9% SLA)
- **Data:** Real customer bookings, payments
- **Replicas:** 3–15 (autoscale)
- **Scale:** Multi-region (eastus2 primary + westus2 failover)
- **Retention:** 90 days (audit log)
- **Access:** Service accounts, restricted
- **Cost:** ~$4,500/month

**Configuration:**
```yaml
DATABASE_URL: postgresql://user:pass@prod-postgres.database.azure.com/aurora_prod
COSMOS_ENDPOINT: https://aurora-prod.documents.azure.com:443/
FEATURE_FLAGS_SERVICE: prod-appconfig.azconfig.io
LOG_LEVEL: warn
CACHE_TTL: 60m
```

---

## 2. Feature Flags (Azure App Configuration)

Feature flags enable safe rollout without redeployment.

### Flag Structure

```json
{
  "id": "booking-ai-assistant",
  "enabled": false,
  "description": "AI-powered booking recommendations",
  "targetAudience": {
    "environment": "staging",
    "percentageUsers": 50
  },
  "contexts": [
    {
      "name": "tierType",
      "values": ["yearly", "gift"]
    }
  ]
}
```

### Common Flags

| Flag | Dev | Staging | Prod | Purpose |
|------|-----|---------|------|---------|
| `new-booking-flow` | true | true | false | Test new consultation form |
| `gift-tier-enabled` | true | true | false | Roll out gift tier gradually |
| `payment-retry-exponential` | true | true | false | New payment retry logic |
| `cosmosdb-v2-queries` | true | true | false | Migration to new Cosmos queries |
| `ai-specialist-recommendations` | true | false | false | Beta: AI recommendations |
| `email-notification-async` | true | true | true | Async email delivery |

### Usage in Code

```typescript
// TypeScript example
import { getFeatureFlag } from '@aurora/feature-flags';

async function createBooking(req, res) {
  const useNewFlow = await getFeatureFlag('new-booking-flow', {
    environment: process.env.ENVIRONMENT,
    userId: req.user.id,
    tierType: req.body.tierType
  });

  if (useNewFlow) {
    return await newBookingFlow(req, res);
  } else {
    return await legacyBookingFlow(req, res);
  }
}
```

### Rollout Strategy

```
Phase 1 (dev):        100% enabled
Phase 2 (staging):    100% enabled
Phase 3 (prod):       10% of yearly + gift users (Monday AM)
Phase 4 (prod):       50% of all users (if no errors Wed)
Phase 5 (prod):       100% of users (if metrics stable Friday)
Rollback:             Any time if error rate > 0.1%
```

---

## 3. Configuration Management

### Environment Variables (Per Environment)

Stored in Azure Key Vault, injected at runtime:

```
# Database
DATABASE_URL                    # PostgreSQL connection
COSMOS_KEY                      # Cosmos DB primary key
COSMOS_ENDPOINT                 # Cosmos DB endpoint

# API
API_BASE_URL                    # APIM gateway URL
JWT_SECRET                      # JWT signing key
JWT_EXPIRY                      # Token TTL (e.g., 8h)

# External Services
STRIPE_API_KEY                  # Payment processor
SENDGRID_API_KEY                # Email service
SLACK_WEBHOOK                   # Notifications

# Observability
APPINSIGHTS_INSTRUMENTATION_KEY # Application Insights
LOG_LEVEL                       # debug | info | warn | error
SAMPLING_RATE                   # 100 (dev), 50 (staging), 10 (prod)

# Feature Flags
APPCONFIG_CONNECTION_STRING     # Azure App Configuration
```

### Environment-Specific Overrides

```bicep
// infra/main.bicep — example

param environment string
var config = {
  dev: {
    logLevel: 'debug'
    cacheTtl: 'PT5M'
    replicaCount: 1
    maxReplicas: 3
  }
  staging: {
    logLevel: 'info'
    cacheTtl: 'PT30M'
    replicaCount: 2
    maxReplicas: 5
  }
  prod: {
    logLevel: 'warn'
    cacheTtl: 'PT60M'
    replicaCount: 3
    maxReplicas: 15
  }
}
```

---

## 4. Secret Rotation Policy

### Quarterly Rotation

| Secret | Owner | Method | Impact |
|--------|-------|--------|--------|
| JWT_SECRET | Backend team | Generate new, update all services | Invalidates existing tokens (users log out) |
| STRIPE_API_KEY | Finance | Stripe dashboard | Transparent (API key), no impact |
| SENDGRID_API_KEY | DevOps | SendGrid dashboard | Transparent, backward compatible |
| DATABASE_PASSWORD | DBA | PostgreSQL password change | Brief connection pool refresh (~10s) |

### Rotation Process

```
1. Generate new secret in Key Vault (e.g., JWT_SECRET_NEW)
2. Deploy services with fallback logic:
   
   try {
     verifyJWT(token, newSecret)
   } catch {
     verifyJWT(token, oldSecret)  // graceful fallback
   }

3. Monitor error logs (look for verification failures)
4. After 24h with no issues, delete old secret
5. Remove fallback logic in next deployment
```

---

## 5. Promotion Workflow

### Workflow Steps

```
1. Feature Complete (dev)
   ↓ All unit tests pass
   ↓ Code review approved
   ↓ Merge to main
   ↓
2. Build & Test (GitHub Actions)
   ↓ Docker image built + security scanned
   ↓ Pushed to ACR
   ↓
3. Deploy to Staging (manual workflow trigger)
   ↓ Infrastructure updated (Bicep)
   ↓ Container app revision updated
   ↓ Smoke tests run
   ↓
4. QA Validation (team)
   ↓ Manual testing on staging
   ↓ Performance baselines checked
   ↓ Sign-off by QA lead
   ↓
5. Deploy to Production (manual + approval gate)
   ↓ Blue slot deployed
   ↓ 5 min health checks pass
   ↓ 15 min E2E tests pass
   ↓ Traffic switched to blue
   ↓ Monitor for 1 hour (if errors > threshold, rollback to green)
```

### Approval Gates

**Staging Gate:**
- All PR checks pass ✓
- Security scan clear (Snyk, Trivy) ✓
- Code review approval ✓

**Production Gate:**
- Staging QA validation passed ✓
- Tech lead approval (on-call engineer must acknowledge) ✓
- No deploy during incident windows (3–6 AM, midnight) ✓
- Feature flag strategy approved (rollout % defined) ✓

---

## 6. Data Isolation & Privacy

### Dev Environment

- Synthetic data only (no real PII)
- Weekly cleanup of old test data
- No connection to production systems

### Staging Environment

- Production data snapshot (weekly, anonymized)
- PII obfuscated: names → "Test User X", emails → "user-x@test.example.com"
- Read-only access from dev team
- No outbound calls to real payment processors (mock Stripe webhook responses)

### Production Environment

- Real customer data (encrypted at-rest)
- Audit logging (all data access logged)
- No direct SSH access (only via Azure Bastion)
- Automated backup (hourly snapshots to geo-redundant storage)

---

## 7. Configuration Validation

Pre-deployment checklist (run as GitHub Actions step):

```bash
#!/bin/bash

check_config() {
  local env=$1
  local config_file=$2

  # Required variables
  required=(
    "DATABASE_URL"
    "COSMOS_KEY"
    "JWT_SECRET"
    "STRIPE_API_KEY"
    "APPCONFIG_CONNECTION_STRING"
  )

  for var in "${required[@]}"; do
    if ! grep -q "^${var}=" "$config_file"; then
      echo "❌ Missing required variable: $var"
      return 1
    fi
  done

  # Validate secret format (no unencrypted secrets in logs)
  if grep -q "secret-value" "$config_file"; then
    echo "❌ Config contains plaintext secrets"
    return 1
  fi

  echo "✅ Config validation passed for $env"
  return 0
}

check_config "$ENVIRONMENT" "$CONFIG_FILE"
```

---

## 8. Monitoring & Alerts

### Metrics per Environment

```
Dev:
  ├─ Error rate (alert: > 5%)
  ├─ Latency (p95 < 500ms)
  └─ No SLA (best effort)

Staging:
  ├─ Error rate (alert: > 1%)
  ├─ Latency (p95 < 200ms)
  └─ 95% availability target

Prod:
  ├─ Error rate (alert: > 0.1%)
  ├─ Latency (p95 < 200ms, p99 < 500ms)
  ├─ Availability (99.9% SLA)
  └─ Auto-incident creation on threshold breach
```

### Alert Routing

| Alert | Dev | Staging | Prod |
|-------|-----|---------|------|
| High error rate | None | Slack #dev-team | PagerDuty + Slack #incidents |
| High latency | None | Slack #dev-team | PagerDuty + Slack #incidents |
| Database connection failure | Email | Email | PagerDuty + SMS |
| OOM (out of memory) | Slack | Slack | PagerDuty + Slack |

---

## 9. Rollback Strategy

### Automatic Rollback (Production)

```
If (E2E test failure) OR (Error rate > 0.1% for 5 min):
  → Switch traffic from blue to green
  → Alert on-call engineer
  → Create incident ticket
  → Pause new deployments for 1 hour
```

### Manual Rollback

```
$ # Switch traffic to green
$ az containerapp ingress traffic set \
    --resource-group aurora-luxe-prod \
    --name content-api \
    --traffic green=100

$ # Or, revert to previous container image
$ az containerapp update \
    --resource-group aurora-luxe-prod \
    --name content-api \
    --image auroraluxeprod.azurecr.io/content-api:v1.2.3
```

---

## 10. Success Criteria

- ✅ Dev environment resets daily without manual intervention
- ✅ Staging mirrors production (same DB schema, configs)
- ✅ All production secrets rotated quarterly
- ✅ Feature flags enable safe rollout (>50% users → 100% in < 1 week)
- ✅ Promotion workflow enforced (no code directly to prod)
- ✅ Zero downtime deployments (blue-green, < 30s switch)
- ✅ Automatic rollback triggers on error rate spike
