# Dozer — History & Learnings

## Work Log

### 2025-07-21 — Security Architecture Spec (Issue #187)
- Created `spec/security-architecture.md` — comprehensive security architecture covering threat model, auth, RBAC, API security, data protection, infra security, content security, monitoring, and phased implementation plan.
- Two-provider auth strategy: Azure AD B2C for customers, Azure AD (Entra) for staff.
- Five-role RBAC: Anonymous, Customer, Editor, Admin, System.
- Four implementation phases aligned to platform maturity (static site → backend → CMS → full infra).
- Teaching notes throughout explaining why each pattern matters.

## Learnings

- Aurora Luxe is a teaching site: every architecture decision must be explainable to learners. Right-sized complexity, not enterprise bloat.
- Brand pivot (spec/brand-pivot.md) shifts from travel to experiential events. Primary PII collection point is the consultation form (name, email, budget, event details).
- Current stack is static Next.js on Vercel — no backend, no auth, no APIs yet. Security controls must be phased.
- Team decisions live in `.squad/decisions.md`. Design uses OKLCH color system, Space Grotesk + Inter typography, Tailwind CSS.
