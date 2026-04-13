# Spec: Back-Office Platform (#186)

## Overview
Integrated back-office operations platform using Microsoft Power Platform and Dynamics 365 to orchestrate booking confirmations, event coordination, client relationship management, and internal communications. Designed for 20–30 internal staff (operations, planners, field coordinators) managing 100+ active client relationships across three tiers.

## Problem Statement
Current operations fragmented across email, spreadsheets, and manual tracking:
- Booking confirmations delayed 1–2 days
- Specialist scheduling conflicts undetected
- Client comms inconsistent across tiers
- On-site coordination ad-hoc (phone/text only)
- No unified view of client lifecycle

## Architecture

### Core Platform Components

1. **Dynamics 365 CRM**
   - Unified client database (contacts, accounts, opportunity history)
   - Tier segmentation (One-Time, Yearly, Gift) with tier-specific workflows
   - Relationship tracking: planner ownership, interaction history, preferences
   - Pipeline analytics: lead → proposal → booked → completed → renewal

2. **Power Apps – Operations Dashboard**
   - Real-time view of active bookings (by status: pending → confirmed → completed)
   - Specialist availability heatmap (capacity planning)
   - Revenue dashboard by tier & planner
   - Client communication history (email, Teams, calls)
   - Alerts: overdue confirmations, scheduling conflicts, SLA violations

3. **Power Automate – Workflow Automation**
   - **Booking confirmation flow**:
     * Trigger: booking created in Dynamics
     * Action: email client + internal confirmation within 2 hours
     * Track: open rates, response time
   - **Reminder sequence**:
     * 30-day pre-event: experience overview to client
     * 7-day pre-event: logistics checklist + specialist intro
     * Day-before: final headcount, dietary restrictions, location details
     * Post-event: feedback survey + thank-you note
   - **Specialist scheduling**:
     * Match available specialists to confirmed bookings
     * Auto-block calendars (no double-bookings)
     * Escalate conflicts to operations manager

4. **Logic Apps – System Integration**
   - Bridge with booking database (sync confirmed events)
   - Partner/venue API integrations (availability, pricing)
   - Azure AI Foundry webhook (proposal generation status)
   - Slack/Teams alerts for critical ops events

5. **Document Intelligence – Contract Processing**
   - Auto-extract key terms from client contracts
   - Validate tier compliance (spend limits, service levels)
   - Flag manual review items (custom riders, waivers)
   - Populate Dynamics with structured contract data

6. **Teams Integration**
   - Dedicated channels per client relationship (multi-tier)
   - Internal #operations channel with workflow alerts
   - Planner-specialist coordination channel
   - Pinned contracts, SOWs, vendor contacts

7. **Field Service – On-Site Coordination**
   - Mobile app for day-of event coordination
   - Checklist management (setup, guest arrival, special requests)
   - Real-time location tracking (specialists, vendors)
   - Photo documentation & incident logging
   - Post-event sign-off & handoff

## Data Flow

```
Booking Created (Web App) 
  → Dynamics 365 Opportunity
  → Power Automate Trigger
  → Email Confirmation + Internal Alert
  → Power Apps Dashboard Updated
  → Logic Apps sync to operational systems
  → Field Service dispatch (T-7 days)
```

## Integration Points

- **Web app**: Booking submission → Dynamics 365
- **AI Excursion Builder**: Proposals → Opportunities
- **CMS**: Experience descriptions pulled into confirmations & reminders
- **Slack/Teams**: Real-time alerts & comms
- **External vendors**: Availability & pricing lookups via Logic Apps

## Role-Based Access

| Role | Permissions |
|------|-------------|
| Planner | View assigned clients, create opportunities, access proposals |
| Operations | Full dashboard access, confirmation/reminder management, escalations |
| Field Coordinator | Mobile Field Service app, task list, photo logging |
| Admin | CRM config, user management, reporting setup |
| Client (Viewer) | Limited portal: booking status, event day details, resource downloads |

## Acceptance Criteria
1. Booking confirmation sent within 2 hours of creation
2. Specialist scheduling conflicts detected & flagged within 1 hour
3. Dashboard load time: <3s for 100+ active events
4. Teams integration delivery: ≤1h end-to-end for critical alerts
5. Document Intelligence contract extraction accuracy: ≥95%

## Success Metrics
- Time-to-confirmation: 24h → 2h (91% improvement)
- Booking conflicts: 0 (from current ~5/month)
- Planner productivity (bookings per week): +40%
- Client satisfaction (comms timing/clarity): 8.5+/10
- Reduced email volume: 60% decrease in ops email traffic

## Phase 1 (MVP)
- Dynamics 365 + Power Apps dashboard
- Power Automate confirmation & 7-day reminder flows
- Manual specialist scheduling

## Phase 2
- Document Intelligence contract processing
- Logic Apps full vendor integration
- Field Service mobile coordination

## Phase 3
- Real-time analytics & forecasting
- Advanced scheduling optimization (ML)
- Client self-service portal
