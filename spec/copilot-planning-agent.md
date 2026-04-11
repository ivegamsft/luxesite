# Spec: Copilot Planning Agent (#189)

## Overview
Conversational AI planning assistant built with Azure OpenAI + Microsoft Graph integration, designed for Aurora Luxe planners. Understands client history, event logistics, and internal operations. Provides real-time recommendations, calendar coordination, and email context—accessible via Teams chat, web interface, and Outlook.

## Problem Statement
Planners juggle:
- Client relationship history (buried in emails, CRM)
- Specialist availability (manual calendar checks)
- Venue logistics (separate research each time)
- Email context-switching (miss threads, miss details)
- Planning time: 8–12 hours per client from lead → booking

Agent can:
- Synthesize client context in seconds
- Auto-suggest specialists based on availability + skills
- Coordinate calendar (planners, specialists, venues)
- Summarize relevant emails in real-time
- Answer domain questions (tier policies, booking flow, SLAs)
- Reduce planning overhead 40–50%

## Technical Architecture

### Core Components

1. **Azure OpenAI LLM**
   - GPT-4 with extended context (128K tokens)
   - Fine-tuned system prompt: Aurora Luxe planning domain, tier policies, SLAs
   - Temperature: 0.5 (factual grounding, low hallucination)
   - Response time: <5s (streaming)

2. **Microsoft Graph Integration**
   - **Calendar API**: planner/specialist schedules, venue availability
   - **Mail API**: client email threads (last 30 days), search context
   - **OneDrive API**: access client files, proposals, contracts
   - **Teams API**: channel history, @mentions in planning channels
   - Delegated auth (user context, no cross-user data leakage)

3. **MCP (Model Context Protocol) Server**
   - Exposes booking APIs as tools:
     * `get_client_profile()` → Dynamics 365 contact + tier + history
     * `get_specialist_availability(date_range, skills)` → calendar + rate card
     * `get_venue_options(date, capacity, themes)` → CMS + availability
     * `check_booking_conflicts(date, duration)` → calendar conflict detection
     * `get_experience_recommendations(client_tier, themes)` → CMS + AI suggestions
   - Tool calling: agent invokes tools to ground responses in live data
   - MCP endpoints secured (OAuth, IP allowlist)

4. **Conversational Interface**

   **Teams Chat**
   - Mention @AuroraLuxeAgent in Teams
   - Conversation thread with multi-turn context
   - Adaptive cards for quick actions (approve specialist, block calendar)
   - Slash commands: `/plan <client>`, `/check-conflicts`, `/summarize-emails`

   **Web Portal**
   - Sidebar chat widget in planner dashboard
   - Full-screen conversation mode for deep planning
   - Context panel: current client, event details, timeline

   **Outlook Add-in** (future)
   - Email reply suggestions (booking confirmations, follow-ups)
   - Meeting invite auto-analysis

5. **Conversation State & Grounding**
   - Session context: client ID, event date, task in progress
   - Conversation history stored (24h retention)
   - Never hallucinate: every recommendation checked against live APIs
   - Confidence scoring: flag uncertain recommendations

6. **Safety & Guardrails**
   - Tier-aware policies: don't suggest out-of-tier experiences
   - Booking conflict prevention: calendar checks before recommendations
   - Email privacy: only access sender's own mailbox
   - Rate limiting: 10 requests/min per planner (prevent abuse)
   - Audit log: all agent actions logged (who, what, when, why)

## Example Workflows

### Workflow 1: New Lead Planning
```
Planner: "Help me plan an event for Acme Corp"
Agent: [retrieves Acme from Dynamics via MCP]
       "Acme is a Yearly tier client, budget $150K. Last event was Q2 2024.
        Preferred specialists: Alice Chen (wellness), Bob Lee (culinary).
        Available dates: July 15-20 (checked 3 calendars).
        I recommend: Nature retreat + cooking class. Cost estimate: $145K.
        Calendar hold? (quick action button)"
```

### Workflow 2: Email Context
```
Planner: "What did Acme email about last week?"
Agent: [retrieves 5 emails via Graph API]
       "3 emails about dietary restrictions (2 vegan, 1 gluten-free).
        1 question about parking (resolved by ops).
        1 reminder: confirm headcount by Friday.
        Heads up: Alice Chen unavailable July 15–17 (on calendar).
        Recommend: offer July 18–20 or substitute specialist."
```

### Workflow 3: Calendar Coordination
```
Planner: "Can we block July 18, 2–6pm?"
Agent: [checks all stakeholder calendars via Graph]
       "Conflicts found:
        - Bob Lee (culinary): overlaps 4–5pm (lunch prep elsewhere)
        - Venue A: available
        - Venue B: available but 6pm changeover tight.
        Recommendation: Use Venue B, start 2pm (4h buffer), confirm Alice OK?"
```

## Data Flow & Security

```
Planner Message (Teams/Web)
  → Copilot Agent (Azure OpenAI)
  → MCP Tool Router
  → Booking APIs / Microsoft Graph (delegated auth)
  → Live data returned
  → Agent reasoning + response
  → Adaptive card / streaming chat reply
  [Audit log: all interactions]
```

- **Auth**: User signs in once; Graph tokens scoped to (mail, calendar, teams)
- **Data residency**: All data within Azure region (no external APIs)
- **Logging**: Conversation history + MCP calls retained 30 days (compliance)

## Acceptance Criteria
1. Response time: <5s for 95th percentile
2. Hallucination rate: <2% (fact-checked responses)
3. Calendar conflict detection: 100% accuracy
4. Planner adoption rate: ≥60% within 30 days
5. Avg planning time reduction: 40% (8h → 5h per client)

## Success Metrics
- Avg. time to specialist selection: 20 min → 5 min
- Planner satisfaction: 8+/10
- Agent-assisted bookings: 70% of new events
- Calendar conflicts eliminated: 100%
- Planner emails reduced (routine context-swaps): 50% fewer emails

## Integration Points
- **Dynamics 365**: Client profiles, booking data
- **Microsoft Graph**: Calendar, mail, Teams, OneDrive
- **CMS**: Experience/specialist/venue data
- **Back-Office Platform**: Specialist availability, booking status
- **AI Excursion Builder**: Retrieve proposals as context

## Limitations & Future
- Doesn't auto-execute (only suggests; planner confirms)
- Email summarization only (not generation of drafts)
- No external vendor APIs yet (direct integration future phase)

## Phase 1 (MVP)
- Teams chat + web portal
- Client lookup, specialist recommendations
- Calendar conflict detection
- Email thread summary

## Phase 2
- Outlook add-in
- Advanced scheduling optimization (ML-driven availability matching)
- Multi-client comparison (best specialists for 3 simultaneous events)
- Predictive churn analysis (client satisfaction signals)

## Phase 3
- Autonomous email drafting (booking confirmations, reminders)
- Real-time proposal scoring (predict acceptance probability)
- Cross-tier recommendations (upsell opportunities)
