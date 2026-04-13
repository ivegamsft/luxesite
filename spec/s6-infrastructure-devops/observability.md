# Observability Specification

## Overview

Aurora Luxe implements structured observability across logging, metrics, and tracing to ensure production visibility and rapid incident response.

## Application Insights Setup

- **Service**: Azure Application Insights
- **Instrumentation**: Next.js auto-instrumentation via `@opentelemetry/auto` or Application Insights SDK
- **Sampling**: 100% in dev/staging, 20% in production (configurable by event type)
- **Data Retention**: 30 days hot, 90 days archived

## Structured Logging

All logs follow JSON format with consistent fields:

```
{
  "timestamp": "2026-04-11T14:30:00Z",
  "level": "INFO|WARN|ERROR|CRITICAL",
  "logger": "booking-service",
  "message": "...",
  "userId": "...",
  "requestId": "...",
  "duration": 234,
  "metadata": { ... }
}
```

**Key Patterns**:
- Log booking state transitions (inquiry → confirmed → completed)
- Log payment gateway events with sanitized details
- Log email send successes and failures
- **Never** log full payment info or PII

## Health Endpoints

- `GET /api/health` — 200 OK with system status
- `GET /api/health/db` — Database connectivity check
- `GET /api/health/external` — Third-party service status (email, payments)

Response format:
```json
{
  "status": "healthy|degraded|down",
  "timestamp": "...",
  "checks": {
    "database": "ok",
    "payment_gateway": "ok",
    "email_service": "degraded"
  }
}
```

## Error Tracking

- Capture all unhandled exceptions with stack traces
- Tag errors by severity: user-facing, operational, critical
- Include request context (URL, method, user ID)
- Attach logs from 30 seconds before error occurred

## Key Metrics

- **Booking funnel**: inquiry → confirmation → completion rates
- **API latency**: p50, p95, p99 response times by endpoint
- **Error rate**: exceptions per 10k requests
- **Payment success rate**: accepted/declined transactions
- **Email delivery**: sent, bounced, opened counts

## Alerts

- High error rate (>5% in 5 min window)
- Database unavailable (health check fails 2x in 5 min)
- Payment gateway timeout (>3 sec latency)
- Email send failures (>20% bounce rate)

**On-call**: Notify team via Slack #aurora-alerts channel

## Implementation Timeline

**Phase 1**: Application Insights SDK, basic logging, health endpoints (Sprint 3)
**Phase 2**: Advanced metrics, error context enrichment (Sprint 4)
**Phase 3**: Automated alerts, dashboards (Sprint 5)
