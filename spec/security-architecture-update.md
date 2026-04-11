# Security Architecture Update

## Overview
Aurora Luxe implements a tier-based security model supporting three business models: One Time ($500K), Yearly ($1.2M/yr), and Gift ($250K). This document outlines authentication, authorization, and data protection strategies tailored to each tier's operational needs.

## Tier-Based Access Model

### One Time Events
- **Stakeholders**: Client (event organizer), Event Planners (staff), Attendees
- **Access Pattern**: Time-bound (event-specific), high audit requirements
- **Key Requirement**: Complete event data isolation post-event

### Yearly Programs
- **Stakeholders**: Organization Admin, Event Planners (recurring), Clients (multiple events)
- **Access Pattern**: Persistent, role-based across calendar year
- **Key Requirement**: Cross-event data aggregation and reporting

### Gift Programs
- **Stakeholders**: Gifter, Gift Recipient, Event Planner, Client
- **Access Pattern**: Time-limited redemption window, privacy-first
- **Key Requirement**: Recipient privacy (minimal personal data collection)

## RBAC Roles and Permissions

### Admin
- Tier-wide permissions (can modify service-level configs)
- User management (create/suspend accounts)
- Audit logs access
- Billing integration

### Event Planner
- Create and manage events within assigned tier
- Access attendee data for event logistics
- Generate reports (tier-specific views)
- Cannot modify tier-wide settings

### Client (Per Tier)
- **One Time**: Full event management for single event
- **Yearly**: Manage multiple events within calendar year
- **Gift**: Create gift campaigns, view redemption status
- Attendee communication (tier-limited)

### Gift Recipient
- View gift details (if unredeemed)
- Complete redemption flow
- Access personal experience data only

## API Authentication Strategy

### Production
- **JWT Tokens**: 15-minute expiry, refresh tokens (7-day)
- **Bearer Token**: `Authorization: Bearer <token>`
- **Scope**: `read:events write:events admin:tier-config`

### Teaching Site
- **API Keys**: Shared teaching credentials (clearly marked as non-production)
- **Key Header**: `X-API-Key: <teaching-key>`
- **Note**: Demonstrates pattern without production ceremony

### Token Claims
```json
{
  "sub": "user_id",
  "tier_id": "tier_code",
  "role": "event_planner",
  "scope": ["read:events", "write:events"],
  "exp": 1234567890
}
```

## Data Protection Per Tier

### One Time Events
- **PII Storage**: Event-specific encrypted database partition
- **Retention**: 90 days post-event (purged automatically)
- **Access**: Client + Event Planners only during event window

### Yearly Programs
- **PII Storage**: Organization-level encrypted partition
- **Retention**: Full calendar year + 30-day archive
- **Access**: Cross-event aggregation allowed for authorized roles

### Gift Programs
- **Recipient Privacy**: Minimal PII collection (email + name only)
- **Gift Data**: Encrypted end-to-end for unredeemed gifts
- **Redemption**: Recipient identity verified, gift data revealed only post-redemption
- **Retention**: 6 months post-redemption

## Implementation Notes
- All tier data stored in separate database schemas for isolation
- Encryption at rest using Azure Key Vault
- API enforces tier-context in every request
- Audit logging captures all role-based actions
