# Unified Security and RBAC Architecture

## Executive Summary
This document defines a unified RBAC model spanning all Aurora Luxe services (web app, API, admin portal). The model accommodates tier-based business logic while maintaining consistent security posture across microservices.

## RBAC Model

### Roles
1. **System Admin**: Platform-wide configuration, user lifecycle, billing
2. **Tier Admin**: Organization-level admin for one tier type
3. **Event Planner**: Event operations (create, schedule, guest management)
4. **Client**: Event orchestrator (owns commercial relationship)
5. **Event Staff**: Logistics, on-site support
6. **Gift Recipient**: Redeems and attends gifted experience
7. **Viewer**: Analytics/read-only reporting

### Permission Matrix

| Role | One Time | Yearly | Gift | Cross-Tier |
|------|----------|--------|------|-----------|
| System Admin | rwx | rwx | rwx | Full access |
| Tier Admin | rw* | rw* | rw* | Scoped to tier |
| Event Planner | rwx | rwx | rw | Within assigned events |
| Client | rwx | rw (mult.) | rw | Single event / tier-bound |
| Event Staff | rw | rw | r | Logistics only |
| Gift Recipient | r | - | r | Redemption + event access |
| Viewer | r | r | r | Aggregated reports only |

*Tier Admin can modify tier-specific settings but not cross-tier policies.

## Authentication Flows

### Production JWT Flow
```
User Login
  → POST /auth/login (email + password)
  → Validate against Azure AD B2C
  → Issue JWT (access + refresh tokens)
  → Store refresh token in HttpOnly cookie
  → Return tokens to client

API Request
  → Include JWT in Authorization header
  → Middleware validates JWT signature + scope
  → Extract tier_id, role, user_id from claims
  → Proceed or reject based on tier-context
```

### Teaching Site Flow
```
Developer Setup
  → Use API key from docs (clearly marked as teaching-only)
  → Include X-API-Key header in requests
  → Middleware resolves role from key-store (not production DB)
  → Proceed with simplified tier model
```

## Session Management

### Token Lifecycle
- **Access Token**: 15 minutes, stored in memory (client-side)
- **Refresh Token**: 7 days, stored in HttpOnly cookie (browser-managed)
- **Revocation**: Token blacklist checked on API (per request)
- **Logout**: Invalidate refresh token, clear cookie

### Concurrent Session Handling
- Max 3 active sessions per user
- New session revokes oldest if limit exceeded
- Multi-device support for Yearly/Gift tiers

## Azure AD B2C Integration

### Configuration
- **Tenant**: `aurora-luxe.onmicrosoft.com`
- **Signing Policy**: `B2C_1_signin`
- **User Attributes**: Email, DisplayName, TierType
- **Custom Attributes**: `tier_id`, `role_id`

### Claims Mapping
```
Azure AD B2C → JWT Claims
  objectId → sub
  email → email
  extension_tier_id → tier_id
  extension_role → role
```

### Teaching Pattern
- Mock B2C responses with hardcoded tier/role assignments
- Document how real apps integrate (production comparison)

## Service-to-Service Authentication

### API-to-Database
- Managed Identity (Azure AD) or connection string in Key Vault
- No hardcoded credentials

### Microservice Communication
- Mutual TLS (mTLS) or API key per service boundary
- Service principal for each microservice

## Audit and Compliance

### Audit Logging
- All authentication events logged (login, token refresh, API calls)
- PII scrubbed from logs (store user_id, not email)
- Logs retained per tier (90 days One Time, 1 year Yearly, 6 months Gift)

### Security Headers
- `Strict-Transport-Security` (HTTPS only)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Content-Security-Policy: default-src 'self'`

## Implementation Roadmap
- **Phase 1**: JWT + local user database (teaching site)
- **Phase 2**: Azure AD B2C integration (production)
- **Phase 3**: Service-to-service mTLS, advanced audit
