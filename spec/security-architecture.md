# Security Architecture — Aurora Luxe

> **Issue:** #187  
> **Author:** Dozer (Backend/Cloud Architect)  
> **Status:** Draft  
> **Date:** 2025-07-21  
> **Scope:** Specs only — no code changes

---

## 1. Overview

This document defines the security architecture for Aurora Luxe — a luxury experiential events platform. It covers authentication, authorization, API security, data protection, infrastructure hardening, and monitoring.

**Important context:** Aurora Luxe is a teaching site. Every security decision here models production-grade patterns, but is right-sized — no enterprise bloat. A learner should be able to trace every control back to a specific threat and understand *why* it exists.

**Current state:** Static Next.js site with no backend, no auth, no APIs. This spec phases security controls so each layer arrives when the corresponding infrastructure does.

---

## 2. Threat Model

### 2.1 What Are We Protecting?

| Asset | Description | Sensitivity |
|---|---|---|
| **Public content** | Experience packages, categories, pricing, marketing copy | Public — no protection needed beyond integrity |
| **Consultation form data** | Name, email, event type, budget, guest count, free-text notes | **PII** — must be encrypted, access-controlled, retention-limited |
| **Staff accounts** | Editor and admin credentials, session tokens | **Privileged** — compromise grants content or system control |
| **AI service endpoints** | Any future AI-powered recommendation or concierge features | **Cost-sensitive** — abuse burns budget |
| **CMS content** | Draft experiences, unpublished packages, internal notes | **Internal** — premature exposure harms brand |
| **Infrastructure secrets** | API keys, connection strings, managed identity configs | **Critical** — compromise enables full access |

### 2.2 Threat Actors

| Actor | Motivation | Capability |
|---|---|---|
| **Script kiddie / bot** | Spam forms, scrape content, enumerate endpoints | Low — automated tooling |
| **Credential stuffer** | Reuse leaked passwords against staff accounts | Medium — credential lists + automation |
| **Abusive user** | Exploit AI endpoints for free compute, flood forms | Medium — persistent, creative |
| **Insider (disgruntled staff)** | Leak data, deface content, sabotage | High — has legitimate access |

### 2.3 STRIDE Summary

| Threat | Example | Primary Control |
|---|---|---|
| **Spoofing** | Attacker impersonates a staff member | MFA + Azure AD for staff, B2C with verified email for customers |
| **Tampering** | Attacker modifies consultation form submissions in transit | TLS everywhere, input validation, CSRF tokens |
| **Repudiation** | Admin denies deleting a published experience | Audit logging with immutable records |
| **Information Disclosure** | PII leaked via API response or logs | Data classification, field-level access, no PII in logs |
| **Denial of Service** | Bot floods consultation form or AI endpoint | Rate limiting, WAF rules, CAPTCHA on forms |
| **Elevation of Privilege** | Customer accesses admin CMS endpoints | RBAC with JWT claims, server-side authorization checks |

---

## 3. Authentication

### 3.1 Strategy: Two Identity Providers

```
┌──────────────────────┐     ┌──────────────────────┐
│   Azure AD B2C       │     │   Azure AD (Entra)   │
│   ─────────────      │     │   ────────────────    │
│   Customers          │     │   Staff (Editors,     │
│   (form submitters,  │     │    Admins, System)    │
│    future members)   │     │                       │
└──────────┬───────────┘     └──────────┬────────────┘
           │                            │
           ▼                            ▼
┌──────────────────────────────────────────────────────┐
│              Aurora Luxe API Gateway                  │
│         (validates JWT from either provider)          │
└──────────────────────────────────────────────────────┘
```

**Why two providers?**
- **Customers** need self-service sign-up, social login options, and password reset — Azure AD B2C provides this.
- **Staff** need corporate SSO, conditional access policies, and MFA enforcement — Azure AD (Entra ID) provides this.
- Both issue standard JWTs. The API validates tokens from either issuer.

> **Teaching note:** This is the standard pattern for B2C platforms with an internal back-office. Learners should understand that "one identity provider for everyone" is a common anti-pattern — customers and staff have fundamentally different trust levels and lifecycle needs.

### 3.2 Token Flow

```
Customer login:
  1. User clicks "Sign In" → redirected to B2C login page
  2. B2C authenticates (email/password or social provider)
  3. B2C issues: access_token (15 min) + refresh_token (24 hr)
  4. Frontend stores tokens in memory (NOT localStorage)
  5. API calls include Authorization: Bearer <access_token>
  6. Token refresh happens silently via hidden iframe or refresh_token

Staff login:
  1. Staff navigates to /admin → redirected to Azure AD login
  2. Azure AD authenticates (corporate credentials + MFA)
  3. Azure AD issues: access_token (1 hr) + refresh_token (8 hr)
  4. Admin SPA stores tokens in memory
  5. API calls include Authorization: Bearer <access_token>
```

### 3.3 Token Storage Rules

| Storage Method | Verdict | Reason |
|---|---|---|
| `localStorage` | ❌ Never | Accessible to XSS — any injected script can steal tokens |
| `sessionStorage` | ❌ No | Still XSS-accessible, lost on tab close |
| In-memory variable | ✅ Yes | Not accessible to XSS, cleared on page close |
| HttpOnly cookie | ✅ Yes (for refresh tokens) | Not accessible to JavaScript, sent automatically |

> **Teaching note:** Token storage is one of the most commonly botched patterns in SPAs. The rule is simple: *access tokens in memory, refresh tokens in HttpOnly secure cookies.* If you can access it from `document.cookie` or `window.localStorage`, so can an attacker's script.

### 3.4 MFA Requirements

| Role | MFA Required? | Method |
|---|---|---|
| Anonymous | N/A | No account |
| Customer | Optional (encouraged) | Email OTP or authenticator app via B2C |
| Editor | **Required** | Authenticator app via Azure AD |
| Admin | **Required** | Authenticator app + number matching via Azure AD |
| System (service) | N/A | Managed identity — no password to protect |

### 3.5 Session Management

- **Access token lifetime:** 15 minutes (customers), 1 hour (staff)
- **Refresh token lifetime:** 24 hours (customers), 8 hours (staff)
- **Idle timeout:** 30 minutes of inactivity triggers re-authentication
- **Absolute timeout:** 24 hours — even active sessions must re-authenticate
- **Concurrent sessions:** Allowed (max 5 per user, oldest revoked)
- **Logout:** Clears local tokens + calls `/logout` on identity provider to invalidate server-side session

---

## 4. Authorization (RBAC)

### 4.1 Role Definitions

| Role | Description | Identity Provider | Trust Level |
|---|---|---|---|
| **Anonymous** | Unauthenticated visitor browsing the public site | None | Untrusted |
| **Customer** | Authenticated user who has signed up / submitted consultation | Azure AD B2C | Low trust |
| **Editor** | Staff member who manages experience content and CMS | Azure AD | Medium trust |
| **Admin** | Staff member with full platform access | Azure AD | High trust |
| **System** | Service-to-service calls (e.g., AI pipeline, background jobs) | Managed Identity | High trust (scoped) |

### 4.2 Permission Matrix

| Resource / Action | Anonymous | Customer | Editor | Admin | System |
|---|---|---|---|---|---|
| **Public content** | | | | | |
| View published experiences | ✅ | ✅ | ✅ | ✅ | ✅ |
| View pricing / tiers | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Consultation forms** | | | | | |
| Submit consultation form | ✅ | ✅ | — | — | — |
| View own submissions | — | ✅ | — | ✅ | — |
| View all submissions | — | — | — | ✅ | ✅ |
| Export submission data | — | — | — | ✅ | — |
| **Content management** | | | | | |
| Create/edit draft experiences | — | — | ✅ | ✅ | — |
| Publish experiences | — | — | — | ✅ | — |
| Delete experiences | — | — | — | ✅ | — |
| **User management** | | | | | |
| View user list | — | — | — | ✅ | — |
| Assign roles | — | — | — | ✅ | — |
| **System** | | | | | |
| Access AI endpoints | — | — | — | ✅ | ✅ |
| View audit logs | — | — | — | ✅ | — |
| Manage API keys | — | — | — | ✅ | — |

> **Teaching note:** This matrix is the single source of truth for "who can do what." Every API endpoint must check this. The most dangerous security bugs come from *missing* authorization checks — where the developer forgot to ask "should this user be allowed to do this?"

### 4.3 How Roles Are Enforced

```
JWT claim structure (example):
{
  "sub": "user-uuid-here",
  "roles": ["Editor"],
  "iss": "https://login.microsoftonline.com/{tenant-id}/v2.0",
  "aud": "api://aurora-luxe",
  "exp": 1720000000
}
```

**Enforcement points:**
1. **API Gateway** — Validates JWT signature and expiration. Rejects expired/malformed tokens.
2. **Middleware** — Extracts `roles` claim. Matches against route-level role requirements.
3. **Handler** — For resource-level checks (e.g., "can this user see *this* submission?"), the handler checks ownership or role.

**Rule: Never trust the client.** Even if the frontend hides a button, the API must independently verify authorization. A user with browser dev tools can call any endpoint.

### 4.4 Resource-Based Access Control

Some permissions depend on the specific resource, not just the role:

- **Consultation submissions:** Customers can only see their own (`submission.userId === jwt.sub`). Admins can see all.
- **Draft content:** Editors can edit any draft. Published content requires Admin role to modify.
- **AI endpoints:** Rate-limited per user, with separate quotas per role.

---

## 5. API Security

### 5.1 Rate Limiting Strategy

| Endpoint Category | Anonymous | Customer | Editor | Admin |
|---|---|---|---|---|
| Public content (GET) | 100/min | 200/min | 500/min | Unlimited |
| Consultation form (POST) | 5/hr per IP | 10/hr per user | — | — |
| AI endpoints | Blocked | 20/hr per user | 50/hr per user | 200/hr |
| CMS write operations | Blocked | Blocked | 60/min | 120/min |
| Auth endpoints (login) | 10/min per IP | — | — | — |

**Implementation:** Azure API Management (APIM) policies or application-level middleware. Use sliding window algorithm.

**When limits are hit:** Return `429 Too Many Requests` with `Retry-After` header. Never reveal internal rate limit thresholds in error messages.

### 5.2 Input Validation

Every API endpoint validates inputs **server-side**, regardless of client-side validation.

| Validation | Pattern |
|---|---|
| **Schema validation** | Use Zod (or equivalent) to validate request bodies against a strict schema. Reject unknown fields. |
| **String length limits** | Name: 1–100 chars. Email: 5–254 chars. Notes: 1–2000 chars. No field is unbounded. |
| **Email format** | RFC 5322 regex + DNS MX check for form submissions |
| **Numeric ranges** | Guest count: 1–10,000. Budget: predefined enum values only. |
| **File uploads** | (Future) Max 10MB, allowed MIME types only, virus scan before storage |
| **SQL injection** | Parameterized queries only. Never interpolate user input into queries. |
| **NoSQL injection** | If using Cosmos DB: validate field names, reject `$`-prefixed operators in input |

> **Teaching note:** Client-side validation is for UX (fast feedback). Server-side validation is for security. They are not interchangeable. An attacker will bypass your React form and POST directly to the API.

### 5.3 CORS Policy

```
// Per environment:
Production:   origin: ["https://auroraluxe.com"]
Staging:      origin: ["https://staging.auroraluxe.com"]
Development:  origin: ["http://localhost:3000"]

// All environments:
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
headers: ["Authorization", "Content-Type"]
credentials: true
maxAge: 86400  // Preflight cache: 24 hours
```

**Rules:**
- Never use `origin: "*"` with `credentials: true` — browsers block this, and it signals misconfiguration.
- CORS origins are set per environment via environment variables. No hardcoded URLs.
- The API must also validate the `Origin` header server-side — CORS headers are enforced by browsers, not by `curl`.

### 5.4 API Key Management

| Service | Key Type | Storage | Rotation |
|---|---|---|---|
| Azure OpenAI (future AI features) | API key | Azure Key Vault | 90-day auto-rotation |
| Email service (SendGrid/Postmark) | API key | Azure Key Vault | 90-day auto-rotation |
| Image CDN (Unsplash/Cloudinary) | API key | Azure Key Vault | Annual (low-risk, read-only) |
| Internal service-to-service | Managed Identity | No key needed | N/A — identity is infra-managed |

**Rule: No secrets in code, config files, or environment variables.** All secrets live in Azure Key Vault. Application code reads them at startup via managed identity — the app never sees a Key Vault access key because the identity *is* the key.

> **Teaching note:** This is the "managed identity" pattern. Instead of storing a password to access the vault that stores passwords (turtles all the way down), the cloud platform attests the app's identity. No credentials to rotate, no secrets to leak.

### 5.5 OWASP Top 10 Mitigations

| # | Vulnerability | Mitigation |
|---|---|---|
| A01 | Broken Access Control | RBAC matrix (§4.2), server-side enforcement at every endpoint, resource-level checks |
| A02 | Cryptographic Failures | TLS 1.2+ everywhere, AES-256 at rest, no custom crypto |
| A03 | Injection | Parameterized queries, Zod schema validation, no string interpolation in queries |
| A04 | Insecure Design | Threat model (§2), defense-in-depth, least privilege |
| A05 | Security Misconfiguration | IaC-only deployments (no manual config), environment parity, CSP headers |
| A06 | Vulnerable Components | Dependabot alerts, `npm audit` in CI, lockfile-only installs |
| A07 | Auth Failures | Azure AD/B2C (no custom auth), MFA for staff, token best practices (§3.3) |
| A08 | Data Integrity Failures | Signed JWTs, SRI hashes on external scripts, CI/CD pipeline integrity |
| A09 | Logging Failures | Structured security logging (§8), audit trail for all admin actions |
| A10 | SSRF | No user-supplied URLs in server-side fetches. If needed: allowlist domains only |

---

## 6. Data Protection

### 6.1 Data Classification

| Classification | Examples | Handling Rules |
|---|---|---|
| **Public** | Experience packages, pricing, marketing copy, published testimonials | No restrictions. Cached at CDN. |
| **Internal** | Draft content, staff names, internal notes | Authenticated access only. Not cached publicly. |
| **Confidential (PII)** | Customer name, email, consultation details, budget | Encrypted at rest + in transit. Access logged. Retention-limited. |
| **Secret** | API keys, connection strings, certificates | Key Vault only. Never logged, displayed, or transmitted in plaintext. |

### 6.2 Encryption

| Layer | Standard | Implementation |
|---|---|---|
| **In transit** | TLS 1.2+ (TLS 1.3 preferred) | Enforced at load balancer / App Gateway. HSTS header with 1-year max-age. |
| **At rest** | AES-256 | Azure-managed encryption for all storage (Cosmos DB, Blob Storage, SQL). Customer-managed keys (CMK) not needed for a teaching site. |
| **Application-level** | N/A for now | If future requirements need field-level encryption (e.g., payment data), use Azure SDK's envelope encryption. |

### 6.3 PII Handling — Consultation Form Data

The consultation form is the primary PII collection point. Here's how we handle it:

| Principle | Implementation |
|---|---|
| **Minimize collection** | Only collect fields needed for consultation. No tracking pixels, no analytics on form data. |
| **Purpose limitation** | Data used solely for consultation follow-up. Not shared with third parties. Not used for marketing without explicit consent. |
| **Retention** | Active consultations: retained for 12 months. Completed/declined: anonymized after 6 months. Deleted after 24 months. |
| **Access** | Only Admin role can view raw PII. System role for automated processing. Editors never see PII. |
| **Deletion** | Customer can request deletion via email. Process within 30 days. Confirm via email. |
| **Logging** | Never log PII values. Log access events: "User X accessed submission Y at time Z." |

### 6.4 GDPR / Privacy (Teaching-Appropriate)

Aurora Luxe is a fictitious brand, but models real compliance:

- **Cookie consent:** Banner required before setting any non-essential cookies. Essential cookies (session) exempt.
- **Privacy policy:** Page explaining what data is collected, why, how long it's kept, and how to request deletion.
- **Consent records:** Store when/how consent was given. Consent must be affirmative (no pre-checked boxes).
- **Data portability:** Customer can request their data in JSON format.
- **Right to erasure:** Honored within 30 days.

> **Teaching note:** GDPR applies if you serve EU users — regardless of where your servers are. The key principles (minimize, purpose-limit, retain only as needed, delete on request) are good practice everywhere.

---

## 7. Infrastructure Security

### 7.1 Network Topology

```
┌─────────────────────────────────────────────────────────────┐
│  Internet                                                    │
│                                                              │
│  User → Azure Front Door (CDN + WAF)                        │
│              │                                               │
│              ▼                                               │
│  ┌─────────────────────────────┐                             │
│  │  VNet: aurora-luxe-vnet     │                             │
│  │                             │                             │
│  │  ┌───────────────────────┐  │                             │
│  │  │ Subnet: app           │  │                             │
│  │  │ Container Apps / App  │  │                             │
│  │  │ Service               │  │                             │
│  │  └───────────┬───────────┘  │                             │
│  │              │ Private       │                             │
│  │              │ Endpoints     │                             │
│  │  ┌───────────▼───────────┐  │                             │
│  │  │ Subnet: data          │  │                             │
│  │  │ Cosmos DB / Storage   │  │                             │
│  │  └───────────────────────┘  │                             │
│  │                             │                             │
│  │  ┌───────────────────────┐  │                             │
│  │  │ Subnet: services      │  │                             │
│  │  │ Key Vault / AI        │  │                             │
│  │  └───────────────────────┘  │                             │
│  └─────────────────────────────┘                             │
└─────────────────────────────────────────────────────────────┘
```

**Key principles:**
- All backend services live inside a VNet. No public endpoints on databases or Key Vault.
- Azure Front Door handles TLS termination, WAF, and CDN caching for static assets.
- Services communicate via private endpoints — traffic never leaves the Azure backbone.

### 7.2 Key Vault

- **One Key Vault per environment** (dev, staging, prod). No shared vaults.
- **Access policy:** Only managed identities of authorized services. No human access to prod secrets except via break-glass procedure.
- **Stored items:** API keys for external services, connection strings (if not using managed identity), TLS certificates.
- **Soft delete:** Enabled (90-day recovery window).
- **Purge protection:** Enabled in production.

### 7.3 Managed Identities

| Service | Identity Type | Accesses |
|---|---|---|
| Container App (API) | System-assigned | Key Vault (get secrets), Cosmos DB (read/write), Storage (read/write) |
| Container App (Admin) | System-assigned | Key Vault (get secrets), Cosmos DB (read/write) |
| CI/CD pipeline | Federated (OIDC) | Azure Resource Manager (deploy), Container Registry (push) |

**Rule: No stored credentials.** Every service authenticates via its managed identity. If a service needs a secret (e.g., SendGrid API key), it reads it from Key Vault *using its managed identity* — no access key chain.

### 7.4 Container Security (If Using Container Apps)

- **Base images:** Use Microsoft-maintained base images (`mcr.microsoft.com`). Pin to specific digests, not `:latest`.
- **Scanning:** Container images scanned by Defender for Containers on push to Azure Container Registry.
- **Runtime:** Containers run as non-root. Read-only filesystem where possible.
- **Secrets:** Injected via environment variables from Key Vault references — never baked into the image.
- **Networking:** Ingress restricted to Azure Front Door. No direct internet access to containers.

---

## 8. Content Security

### 8.1 Security Headers

Every response from the application must include these headers:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';     # Tailwind needs inline styles
  img-src 'self' https://images.unsplash.com data:;
  font-src 'self';
  connect-src 'self' https://*.auroraluxe.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';

Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

> **Teaching note:** CSP is the single most effective defense against XSS. The `script-src 'self'` directive means only scripts from your own domain can execute — an attacker who injects `<script src="evil.com/steal.js">` gets blocked by the browser. Start strict, loosen only when you must.

### 8.2 XSS Prevention

| Layer | Control |
|---|---|
| **Framework** | React auto-escapes JSX output by default. Never use `dangerouslySetInnerHTML`. |
| **CSP** | `script-src 'self'` blocks inline scripts and external script injection. |
| **Input** | Server-side sanitization of any user input that might be rendered (form notes, CMS content). Use a library like DOMPurify for rich text. |
| **Output** | Encode all dynamic values when rendering outside React (e.g., meta tags, SSR). |

### 8.3 CSRF Protection

- **SameSite cookies:** All cookies set with `SameSite=Strict` (or `Lax` for auth redirects).
- **CSRF token:** For any state-changing request (POST/PUT/DELETE), include a CSRF token. The token is generated server-side, embedded in the page, and validated on each request.
- **Double-submit pattern:** As a belt-and-suspenders approach: CSRF token in both a cookie and a request header. Server validates they match.

> **Teaching note:** SameSite cookies handle 90% of CSRF risk. The CSRF token handles the remaining edge cases (old browsers, cross-origin redirect flows). Always do both.

### 8.4 Subresource Integrity (SRI)

Any script or stylesheet loaded from a CDN must include an `integrity` attribute:

```html
<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-abc123..."
  crossorigin="anonymous"
></script>
```

Currently, Aurora Luxe loads all assets from its own domain (Next.js bundles), so SRI applies mainly to future CDN-hosted dependencies. The CI pipeline should generate SRI hashes for any externally hosted assets.

---

## 9. Monitoring & Incident Response

### 9.1 Security Logging

**What to log:**

| Event | Logged Fields |
|---|---|
| Login success | Timestamp, user ID, IP, provider (B2C/AD), MFA used |
| Login failure | Timestamp, attempted email (hashed), IP, failure reason |
| Authorization denial | Timestamp, user ID, requested resource, required role, actual role |
| PII access | Timestamp, user ID, resource accessed (submission ID), action |
| Admin action | Timestamp, user ID, action (create/update/delete), resource type, resource ID |
| Rate limit hit | Timestamp, IP, endpoint, current count |
| Token refresh | Timestamp, user ID, old token expiry |

**What NOT to log:**

| Never Log | Reason |
|---|---|
| Passwords or password hashes | Exposure risk — even hashes can be attacked offline |
| Full email addresses | PII — log a hash or the domain only |
| JWT token values | Bearer tokens in logs = credential leak |
| Request/response bodies with PII | Consultation form content is PII |
| API keys or secrets | Obvious — but surprisingly common in error logs |

> **Teaching note:** The biggest logging mistake isn't logging too little — it's logging too much. PII in logs creates a second copy of sensitive data that's often less protected than the primary store. Log *events*, not *data*.

### 9.2 Alert Triggers

| Alert | Condition | Severity | Action |
|---|---|---|---|
| Brute force detected | >20 failed logins from one IP in 5 min | High | Block IP for 1 hour, notify admin |
| Privilege escalation attempt | Authorization denial for admin-only resource from non-admin | High | Log + notify security |
| Rate limit storm | Any IP hitting rate limits on >3 endpoints simultaneously | Medium | Review for bot activity |
| Unusual data access | Admin exports >100 consultation records in 1 hour | Medium | Notify security lead |
| Certificate expiry | TLS cert expires in <30 days | Low | Auto-rotate or alert ops |
| Dependency vulnerability | Critical CVE in `npm audit` | High | Block deploy until patched |

### 9.3 Incident Response Runbook (Outline)

**Severity levels:**

| Level | Definition | Response Time |
|---|---|---|
| P1 — Critical | Active data breach, credential compromise, service fully down | 15 minutes |
| P2 — High | Suspected breach, auth system failure, data exposure risk | 1 hour |
| P3 — Medium | Vulnerability discovered, unusual access pattern, degraded service | 24 hours |
| P4 — Low | Policy violation, minor misconfiguration, non-urgent patching | 1 week |

**Response steps (all severity levels):**

1. **Detect** — Alert fires or user reports issue.
2. **Triage** — On-call engineer assesses severity using the table above.
3. **Contain** — Isolate affected system (revoke tokens, block IP, disable endpoint).
4. **Investigate** — Query logs to determine scope. What data was accessed? By whom? When?
5. **Remediate** — Fix the vulnerability. Rotate compromised credentials.
6. **Communicate** — Notify affected users if PII was exposed.
7. **Review** — Post-incident retrospective. Update runbook. Add detection for the specific vector.

---

## 10. Implementation Phases

### Phase 1: Frontend Security (Current — Static Site)

No backend exists yet. Apply what we can to the static Next.js site:

| Control | Implementation |
|---|---|
| Security headers | Configure in `next.config.js` — CSP, HSTS, X-Frame-Options, etc. |
| Form validation | Client-side Zod validation on ConciergeForm (UX, not security) |
| Dependency scanning | `npm audit` in CI pipeline. Dependabot enabled on GitHub. |
| SRI | Verify no external scripts are loaded without integrity hashes |
| HTTPS | Enforced by hosting platform (Vercel). Add HSTS header. |

### Phase 2: Authentication (When Backend Arrives)

| Control | Implementation |
|---|---|
| Azure AD B2C | Provision B2C tenant. Configure sign-up/sign-in user flows. |
| Azure AD | Configure staff app registration. Require MFA via Conditional Access. |
| Token handling | Access tokens in memory. Refresh tokens in HttpOnly cookies. |
| CORS | Lock origins to known domains per environment. |
| CSRF | Implement double-submit CSRF token pattern. |

### Phase 3: Authorization (When Admin/CMS Arrives)

| Control | Implementation |
|---|---|
| RBAC middleware | Express/Next.js middleware reads JWT `roles` claim, enforces permission matrix. |
| Resource-level checks | Consultation submissions filtered by user ID for customers. |
| Audit logging | All admin write operations logged to Application Insights. |
| PII access logging | Track who views consultation data and when. |

### Phase 4: Full Infrastructure (When Cloud Infra Is Live)

| Control | Implementation |
|---|---|
| VNet + private endpoints | All data stores and Key Vault on private endpoints. |
| Key Vault | Secrets migrated from environment variables. Managed identity access. |
| Azure Front Door + WAF | CDN caching for static assets. WAF rules for OWASP Top 10. |
| Monitoring | Application Insights for performance. Microsoft Sentinel for security. |
| Rate limiting | APIM policies or application middleware per §5.1. |
| Container hardening | Non-root containers, pinned base images, image scanning. |

---

## 11. Teaching Notes

### 11.1 What This Spec Demonstrates

| Pattern | Why It Matters |
|---|---|
| **Defense in depth** | No single control is the whole story. CSP *and* input validation *and* output encoding — all three stop XSS. |
| **Least privilege** | Every role has the minimum permissions needed. Editors can't see PII. Customers can't see drafts. |
| **Managed identities** | The modern alternative to storing credentials. The platform *is* the identity. |
| **Separation of identity providers** | Customers and staff have different trust models. One provider can't serve both well. |
| **Phased security** | You don't need everything on day one. But you do need a plan. |
| **Data classification** | Not all data needs the same protection. Public content and PII have different rules. |
| **Threat modeling** | Security starts with "what are we protecting and from whom?" — not with tools. |

### 11.2 Common Pitfalls This Avoids

| Pitfall | How We Avoid It |
|---|---|
| "We'll add security later" | Phased plan with Phase 1 controls on the static site today |
| Storing JWTs in localStorage | Explicit rule: access tokens in memory, refresh tokens in HttpOnly cookies |
| Client-only validation | Server-side validation is mandatory; client-side is UX only |
| Logging PII | Explicit deny-list for logged fields. Log events, not data. |
| Wildcard CORS | Per-environment origin allowlists. Never `*` with credentials. |
| Secrets in code | Key Vault + managed identities. No exceptions. |
| "Admin can do anything" | Even admins have a defined permission set. Break-glass is logged separately. |
| Rolling your own auth | Azure AD/B2C instead of custom password handling |

### 11.3 What Learners Should Pay Attention To

1. **The permission matrix (§4.2)** is the most important artifact. If you build nothing else, build this. Every authorization bug starts with an unclear or missing permission model.

2. **Token storage (§3.3)** — memorize these rules. Every SPA developer will face this decision, and the wrong choice creates a real vulnerability.

3. **The difference between authentication and authorization.** Auth*entication* = "who are you?" Auth*orization* = "what are you allowed to do?" They're different systems with different failure modes.

4. **Security headers (§8.1)** are free protection. Copy-paste these into your `next.config.js` and you've blocked entire classes of attacks before writing a line of application code.

5. **The logging deny-list (§9.1)** — the instinct to "log everything for debugging" will put PII in your logs. Be intentional about what you capture.

---

## Appendix A: Glossary

| Term | Definition |
|---|---|
| **Azure AD (Entra ID)** | Microsoft's enterprise identity platform. Used for staff authentication. |
| **Azure AD B2C** | Microsoft's customer-facing identity platform. Supports self-service sign-up and social login. |
| **CORS** | Cross-Origin Resource Sharing — browser mechanism controlling which domains can call your API. |
| **CSP** | Content Security Policy — HTTP header that controls which resources a page can load. |
| **CSRF** | Cross-Site Request Forgery — attack where a malicious site makes requests on behalf of an authenticated user. |
| **HSTS** | HTTP Strict Transport Security — header that forces browsers to use HTTPS. |
| **JWT** | JSON Web Token — signed token containing user claims (identity, roles, expiration). |
| **Managed Identity** | Azure feature that gives a service an automatic identity for accessing other Azure resources — no credentials needed. |
| **MFA** | Multi-Factor Authentication — requiring a second verification method beyond password. |
| **OWASP** | Open Web Application Security Project — maintains the Top 10 list of web security vulnerabilities. |
| **PII** | Personally Identifiable Information — data that can identify a specific person. |
| **RBAC** | Role-Based Access Control — granting permissions based on assigned roles, not individual identity. |
| **SRI** | Subresource Integrity — hash-based verification that CDN-loaded scripts haven't been tampered with. |
| **WAF** | Web Application Firewall — filters malicious traffic before it reaches your application. |
| **XSS** | Cross-Site Scripting — attack where malicious scripts are injected into a trusted website. |
