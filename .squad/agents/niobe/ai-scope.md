# Niobe AI/Integration Scope Assessment
**Sprint Planning Reference** | Generated for Morpheus master plan  
**Specs Reviewed**: S4 AI Excursion Builder, S4 Copilot Planning Agent, S7 Back-Office Platform

---

## 1. AI Features Inventory

### Core AI Capabilities

| Feature | Scope | Complexity | Blocker | Notes |
|---------|-------|-----------|---------|-------|
| **Excursion Builder – Proposal Generation** | Foundry GPT-4 fine-tuning + multi-prompt orchestration | **XL** | Model access | Concept → narrative → specialist matching → budget optimization (4 sequential prompts) |
| **Excursion Builder – Content Safety** | Azure AI Content Safety API + custom brand validator + tier constraints | **L** | Safety API quota | Hate/violence filtering + lexicon matching + accessibility checker |
| **Excursion Builder – Planner Dashboard** | Approval/edit/reject UI + feedback loop for RLHF training | **M** | Frontend (Trinity) | Depends on Trinity's dashboard; Niobe handles feedback signal architecture |
| **Copilot Planning Agent – LLM Core** | GPT-4 (128K context) + system prompt fine-tuning + streaming responses | **M** | Model access | Domain-specific prompt eng for tier policies, SLAs |
| **Copilot – MCP Tool Server** | 5 custom MCP tools (client profile, specialist availability, venue options, conflict check, recommendations) | **L** | Booking API contracts | Tools ground agent in live data; no hallucination allowed |
| **Copilot – Teams Integration** | @mention chat + adaptive cards + slash commands | **M** | Teams API (M365) | Delegated auth required; requires Graph calendar/mail access |
| **Copilot – Web Portal Chat** | Sidebar widget + full-screen conversation + context panel | **M** | Frontend (Trinity) | Niobe handles LLM backend; Trinity handles UI/UX |
| **Copilot – Outlook Add-in** (Phase 2) | Email reply suggestions + meeting auto-analysis | **M** | Graph Mail API, Outlook SDK | Future phase—deferred |

### Safety & Governance Features

| Feature | Scope | Complexity | Blocker | Notes |
|---------|-------|-----------|---------|-------|
| **Responsible AI Transparency** | "AI-assisted" flags in UI + bias audit logging | **S** | Content review | Audit trail for all proposals; stakeholder sign-off required |
| **Guardrails – Tier Policies** | Hardcoded tier limits (One-Time ≠ Yearly) in agent rules | **S** | Dynamics tier schema | Prevents out-of-tier upsells |
| **Guardrails – Hallucination Prevention** | Vector DB grounding + live API calls for every recommendation | **M** | CMS vector index + booking APIs | Confidence scoring on all responses |
| **Audit Logging** | All agent actions, MCP calls, approvals logged to Dynamics | **M** | Dynamics schema + Log Analytics | 30-day retention policy |

---

## 2. Integration Points

### External Systems Matrix

```
┌─────────────────────────────────────────────────────────────────┐
│                    INTEGRATION TOPOLOGY                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Copilot Agent ←→ Microsoft Graph (Mail, Calendar, Teams)       │
│       ↓                                                           │
│  MCP Tool Server ←→ Booking APIs / Dynamics 365                  │
│       ↓                                                           │
│  Excursion Builder ←→ Azure AI Content Safety                    │
│       ↓                 ↓                                         │
│  Azure AI Foundry  Vector DB (CMS)                               │
│  (GPT-4 Fine-tune) ↓                                             │
│       ↓             Azure AI Search                              │
│  RLHF Feedback     ↓                                             │
│       Loop    ←──  Planner Dashboard (Trinity)                   │
│                                                                   │
│  Back-Office ←→ Power Automate (workflow triggers)               │
│  Platform       ↓                                                 │
│       ↓    Logic Apps (vendor sync)                              │
│  Dynamics 365   ↓                                                 │
│       ↓    Document Intelligence (contract processing)           │
│       └──────────────────────────────────────────────────────────┘
```

### Detailed Integration Points

#### **Azure AI Services**
- **Azure AI Foundry**: GPT-4 model deployment, fine-tuning data ingestion, prompt versioning
- **Azure OpenAI**: Copilot agent LLM backend, 128K context window
- **Azure AI Content Safety**: Multi-category filtering (hate, violence, self-harm, sexual)
- **Azure AI Search**: Vector search over CMS (experiences, venues, specialists)

#### **Microsoft 365 / Power Platform**
- **Microsoft Graph**: Calendar (availability), Mail (context), Teams (chat), OneDrive (documents)
- **Dynamics 365 CRM**: Client profiles, booking opportunities, tier segmentation, opportunity history
- **Power Automate**: Workflow triggers from booking events; potential webhook for Foundry proposals
- **Logic Apps**: System integration (vendor APIs, Slack/Teams alerts)
- **Power Apps**: Planner dashboard (not Niobe's domain—Trinity handles)

#### **Content & Data Systems**
- **CMS**: Experience descriptions, partner/venue metadata (must be published=true for generation)
- **Vector DB / Azure AI Search**: Semantic search over experiences (dedupe, similarity matching)
- **Booking Database**: Live specialist availability, calendar holds, conflict detection

#### **Cross-Service Contracts**
- **Copilot ↔ Excursion Builder**: Agent can retrieve & reference proposals as context ("Here are 3 options AI already generated")
- **Back-Office ↔ Excursion Builder**: Proposals tie to Dynamics Opportunities; feedback loop trains future proposals
- **Booking API ↔ MCP Tools**: Custom tools expose client, specialist, venue, conflict, recommendation endpoints

---

## 3. Prerequisites

### Must-Have Before AI Work Starts

| Prerequisite | Owner | Dependency | Timeline Impact |
|--------------|-------|-----------|-----------------|
| **Dynamics 365 Schema Finalized** | Dozer + Trinity | CRM data model (contacts, opportunities, tiers) | 🔴 **Critical Path** – defines agent tool inputs |
| **Booking API Contracts Defined** | Dozer + Trinity | REST/GraphQL endpoints (client lookup, availability, conflicts) | 🔴 **Critical Path** – MCP tools depend on these |
| **Azure AI Foundry Access & Quota** | Morpheus + Azure ops | GPT-4 model deployment (at least 50K TPM for peak load) | 🔴 **Critical Path** – Excursion Builder blocked without this |
| **Azure AI Content Safety API Quota** | Morpheus + Azure ops | Safe API access (multi-tenant, rate limits negotiated) | 🟡 **High** – Excursion Builder AC#2 depends on this |
| **Microsoft Graph App Registration** | Morpheus + Microsoft ops | OAuth 2.0 app (delegated scope: mail, calendar, teams) | 🟡 **High** – Copilot auth depends on this |
| **CMS Content & Vector Indexing** | Trinity + content ops | Experience descriptions published; vector embeddings computed | 🟡 **High** – Agent grounding depends on indexed content |
| **Specialist/Venue Database Schema** | Dozer + Trinity | Structured data (credentials, availability, tier pricing) | 🟡 **High** – Specialist matcher + venue recommendations blocked |
| **Tier Policy Rules Document** | Product + Legal | Hard constraints (spend limits, SLAs, exclusions per tier) | 🟡 **High** – Guardrails engine needs policy codebook |
| **Brand Voice Guidelines** | Product + Marketing | Lexicon, tone examples, accessibility checklist | 🟡 **High** – Custom brand validator needs input |
| **Data Residency / Compliance Signed-Off** | Security + Legal | EU/US data handling agreed; audit retention policy | 🟡 **High** – Graph + Foundry contract review |

### Conditional Prerequisites (Can Parallelize)

- **RLHF Training Pipeline**: Optional for MVP (can defer); needed for Phase 2
- **Outlook Add-in SDK Setup**: Deferred to Phase 2
- **Predictive Churn Models**: Deferred to Phase 2

---

## 4. Build Order – Recommended Sequencing

### Phase 1: Foundation (Weeks 1–4)
**Goal**: Deployable AI core + basic agent operational

1. **Booking API Contracts** (Dozer, Week 1)
   - Define 5 MCP tool endpoints
   - Niobe: review, propose input/output schemas
   - **Blockers**: None
   - **Velocity Gain**: Unblocks all MCP tools

2. **Azure AI Foundry Setup** (Morpheus + Niobe, Weeks 1–2)
   - Request GPT-4 deployment (50K TPM minimum)
   - Set up prompt versioning, safety settings
   - Create base system prompt (before fine-tuning)
   - **Blockers**: Azure quota approval
   - **Deliverable**: Foundry project + deployment URI

3. **Copilot Agent LLM Core** (Niobe, Week 2)
   - Fine-tune system prompt for domain (tier policies, SLAs, booking flow)
   - Implement streaming response handler
   - Test temperature 0.5 (factuality)
   - **Blockers**: GPT-4 deployment live
   - **Deliverable**: Endpoint-ready agent backend

4. **MCP Tool Server Implementation** (Niobe + Dozer, Weeks 2–3)
   - Implement 5 tools:
     - `get_client_profile()` → Dynamics lookup
     - `get_specialist_availability()` → calendar + rate card
     - `get_venue_options()` → CMS query
     - `check_booking_conflicts()` → calendar intersection
     - `get_experience_recommendations()` → vector search + AI ranker
   - OAuth + IP allowlist security
   - **Blockers**: Booking API contracts, Graph auth app registration
   - **Deliverable**: MCP server (Docker or Azure Container Apps)

5. **Teams Integration (MVP)** (Niobe + Trinity, Week 3)
   - @mention webhook handler
   - Slash commands (`/plan`, `/check-conflicts`, `/summarize-emails`)
   - Adaptive cards for quick actions
   - **Blockers**: MCP tool server live, Graph auth working
   - **Deliverable**: Teams bot registered + Teams channel test

6. **Copilot Web Portal Backend** (Niobe + Trinity, Week 4)
   - Conversation state management (session context, client ID, event date)
   - LLM streaming endpoint
   - Audit logging to Dynamics
   - **Blockers**: LLM core, MCP tools live
   - **Deliverable**: Chat API endpoint ready for Trinity's UI

**Phase 1 Exit Criteria**:
- ✅ Agent responds to Teams @mention in <5s
- ✅ MCP tools ground all recommendations in live APIs
- ✅ Zero hallucinations on client data
- ✅ Audit log complete for all agent actions

---

### Phase 2: Excursion Builder + Advanced Copilot (Weeks 5–8)
**Goal**: Proposal generation + full Copilot feature set

7. **Excursion Builder – Proposal Generation** (Niobe, Weeks 5–6)
   - Implement 4-prompt orchestration:
     1. Concept generator (theme + experience arc)
     2. Narrative writer (client-facing story)
     3. Specialist matcher (qualifications → availability)
     4. Budget optimizer (tier constraints)
   - Candidate ranking (brand alignment, feasibility, novelty)
   - Template-based output (for planner review)
   - **Blockers**: Booking API (specialist availability), CMS content indexed, Foundry deployment
   - **Velocity Gain**: Enables planner dashboard integration
   - **Deliverable**: Generation endpoint (input: client prefs, output: 5 ranked proposals in <10s)

8. **Excursion Builder – Content Safety** (Niobe + Morpheus, Week 5)
   - Azure AI Content Safety filtering (multi-category)
   - Custom brand voice validator:
     - Lexicon matching (tone analysis)
     - Tier-appropriate language (One-Time ≠ Yearly)
   - Accessibility checker (WCAG 2.1 AA compliance for narrative)
   - **Blockers**: Content Safety API quota approved, brand guidelines finalized
   - **Deliverable**: Safety scoring pipeline (accept/flag/reject decisions)

9. **Excursion Builder – Planner Dashboard** (Trinity + Niobe, Week 6)
   - Approval/edit/reject workflow
   - Feedback capture (for RLHF)
   - One-click approve → Dynamics opportunity creation
   - **Blockers**: Proposal generation live, Dynamics schema supports feedback
   - **Deliverable**: Dashboard UI + Niobe feedback signal handler

10. **Copilot – Microsoft Graph Integration** (Niobe + Morpheus, Weeks 6–7)
    - Mail API: retrieve & summarize email threads (30-day window)
    - Calendar API: real-time availability checks across stakeholders
    - Teams API: channel history, @mention context
    - OneDrive API: document retrieval for client context
    - **Blockers**: Graph app registration + scopes approved, user auth flow tested
    - **Deliverable**: Graph tool implementations in MCP server

11. **Copilot – Calendar Coordination** (Niobe, Week 7)
    - Multi-stakeholder calendar conflict detection (100% accuracy)
    - Conflict resolution recommendations (alternatives, time shifts)
    - Calendar hold execution (write-back to specialist calendars)
    - **Blockers**: Graph Calendar API scoped + delegated auth proven
    - **Deliverable**: Calendar conflict AC criterion verified

12. **Audit Logging & Compliance** (Niobe + Security, Week 8)
    - Log all agent actions, MCP calls, approvals to Dynamics + Log Analytics
    - 30-day retention + GDPR compliance
    - Dashboard for compliance review
    - **Blockers**: Dynamics audit schema finalized
    - **Deliverable**: Audit trail queryable; compliance report generated

**Phase 2 Exit Criteria**:
- ✅ Excursion Builder generates 5 proposals in <10s
- ✅ 95% of proposals pass content safety checks (AC#2)
- ✅ Copilot planner usability: 3 edits/proposal (down from 8 manual steps) (AC#3)
- ✅ Calendar conflicts: 100% detection rate (AC#4, Copilot)
- ✅ Planner adoption: ≥60% within 30 days (AC#4, Copilot)

---

### Phase 3: RLHF Training + Predictive Models (Weeks 9–12)
**Goal**: Continuous improvement + advanced recommendations

13. **RLHF Training Pipeline** (Niobe, Weeks 9–10)
    - Feedback loop: planner edits → training signal
    - Fine-tuning trigger (weekly re-training)
    - A/B testing framework for prompt versions
    - **Blockers**: Feedback capture working (Phase 2), Foundry fine-tuning API access
    - **Deliverable**: Training pipeline operational; proposal quality trending upward

14. **Copilot – Outlook Add-in** (Niobe + Trinity, Week 10)
    - Email reply suggestions (booking confirmations, follow-ups)
    - Meeting auto-analysis (attendees, duration, subject context)
    - **Blockers**: Outlook SDK integration, Graph Mail API mature
    - **Deliverable**: Add-in installed; feedback collection

15. **Predictive Models** (Niobe + Data Science?, Weeks 11–12)
    - Churn prediction (client satisfaction signals)
    - Proposal acceptance likelihood (pre-ranking)
    - Real-time pricing optimization (cross-tier)
    - **Blockers**: Historical data labeled + model training infrastructure
    - **Deliverable**: Model endpoints integrated into agent recommendations

**Phase 3 Exit Criteria**:
- ✅ Proposal acceptance rate: >75% (AC#4, Excursion Builder)
- ✅ Client satisfaction (AI-assisted proposals): ≥8/10 (AC#5, Excursion Builder)
- ✅ Planner satisfaction: 8+/10 (Success metric, Copilot)

---

## 5. Back-Office Dependencies – What Power Platform Needs

### From Niobe (AI/Integration Side)

| Deliverable | Needed By | Purpose | Timing |
|-------------|-----------|---------|--------|
| **Booking API Contracts (JSON schema)** | Back-office Power Apps dashboard | Power Automate triggers + Power Apps data connectivity | 🔴 **Week 1** |
| **Dynamics 365 Opportunity Schema** | Excursion Builder feedback loop | Storing proposals + planner feedback | 🔴 **Week 1** |
| **Client Profile MCP Tool** | Power Automate confirmation flows | Lookup client tier, contact, preferences | 🟡 **Week 2** |
| **Proposal Generation Endpoint** | Power Automate booking workflow | Auto-generate 3 options at booking creation (optional) | 🟡 **Week 5** |
| **Audit Log Schema** | Power Apps compliance dashboard | Queryable audit trail for operations | 🟡 **Week 8** |
| **Specialist Availability API** | Power Apps capacity heatmap | Real-time specialist scheduling conflicts | 🟡 **Week 6** |

### What Back-Office Enables for AI

| Capability | Provided By | Enables |
|------------|------------|---------|
| **Unified Client Database** | Dynamics 365 (Dozer) | Copilot client profile lookups; context grounding |
| **Booking Status Workflow** | Power Automate (Back-office team) | Copilot can answer "Is this booked?" with live status |
| **Specialist Availability Calendar** | Power Apps / Dynamics (Back-office team) | MCP specialist availability tool; conflict detection |
| **Tier Policy Enforcement** | Dynamics + Power Automate rules (Back-office team) | Guardrails in agent recommendations |
| **Email Confirmation Audit Trail** | Power Automate logs (Back-office team) | Audit compliance + AI decision transparency |

### Sequential Dependency Graph

```
Week 1:    Booking API ←─ Dynamics schema finalized
           ↓
Week 2–3:  MCP tools live ←─ back-office dashboard data populating
           ↓
Week 5–6:  Excursion Builder ←─ proposal → Dynamics opportunity (Power Automate trigger)
           ↓
Week 8:    Audit logging ←─ back-office confirmation email audit trail live
```

**Key Insight**: Back-office (Power Platform, Dynamics) is the **data backbone** for all AI features. Niobe's API contracts and integrations are **data consumers**. Back-office moves slightly ahead; Niobe consumes its outputs. Morpheus should schedule back-office Phase 1 to complete by end of Week 2 to unblock Niobe's MCP tool development.

---

## 6. Risks – Biggest Unknowns for AI/Integration

### 🔴 Critical Risks (Could Delay Phase 1)

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| **Azure AI Foundry quota approval takes >2 weeks** | Blocks Excursion Builder entire Phase | Medium (org procurement) | Start quota request TODAY; escalate to Morpheus |
| **GPT-4 model capacity exhausted or pricing exceeds budget** | Proposal generation cost prohibitive; agent latency >5s | Medium (global model demand) | Negotiate reserved capacity; spike test with smaller model first (GPT-3.5) |
| **Microsoft Graph API rate limits too restrictive** (10 req/s per user) | Copilot agent stalls under concurrent planner load (20–30 users) | Low–Medium | Pre-request elevated quota; batch calendar checks; local caching (1h TTL) |
| **Dynamics 365 schema not finalized** | MCP tools have no input/output contract | Medium (depends on Dozer) | Weekly sync with Dozer; mock schema by Week 1 |
| **Content Safety API has high false-positive rate** | >5% of legitimate proposals flagged as unsafe; planner trust erodes | Medium (depends on training data) | Benchmark with 10K sample proposals first; tune thresholds before Phase 2 |

### 🟡 High Risks (Could Delay Phase 2)

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| **Vector DB embedding quality poor** | Specialist/venue recommendations hallucinate or retrieve irrelevant results | Medium (depends on CMS data quality) | Validate 50-example sample before Phase 2; measure recall/precision |
| **RLHF feedback signals sparse** | Proposal generation doesn't improve; stuck at baseline quality | Medium (planner adoption depends on UX) | Design feedback UI for <1-click capture; measure feedback rate weekly |
| **Copilot hallucination rate >2% despite grounding** | Agent makes false claims about availability/tier limits; planner loses trust | Medium (LLM reliability) | Implement confidence scoring + manual review for low-confidence outputs; monitor AC#2 closely |
| **Back-office delays unblock AI** | Booking API contracts slip; MCP tools have no data source | Medium (cross-team dependencies) | Define contracts in isolation; mock API responses for testing |
| **Brand voice guidelines too vague** | Custom validator can't score proposals reliably; stakeholder rejects AC#4 | Low–Medium (depends on marketing clarity) | Get explicit lexicon + 10 tone examples by Week 4 |

### 🟢 Medium Risks (Managed in Phase 2+)

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| **Outlook Add-in SDK integration underestimated** | Phase 2 Week 10 slips; deferred to Phase 3 | Medium (Outlook SDK complexity) | Spike & prototype by Week 7; budget 2 weeks if blocked |
| **Predictive models have low accuracy** | Churn/upsell recommendations not adopted; feature ROI questioned | Medium (depends on data labeling) | Start with simple heuristics (e.g., booking frequency); train ML models iteratively |
| **Copilot's 128K context window insufficient for complex cases** | Agent struggles with 50+ email threads; context truncation loses critical info | Low (128K handles most luxury planning cases) | Summarize old threads; implement sliding window (last 30 days only) |
| **Agent latency drifts >5s under load** | Planner frustration; adoption drops | Medium (depends on LLM throughput + MCP tool latency) | Load test by Week 6; profile each tool; optimize slowest (likely DB queries) |

### ⚠️ Unknowns to Research / Spike Early

1. **Content Safety API Multi-Category Performance**: Test hate/violence/sexual categories on 100 sample proposals; measure precision/recall before committing to AC#2.
2. **Graph Calendar API Conflict Detection Accuracy**: Verify 100% accuracy on overlapping bookings; check for edge cases (all-day events, recurring conflicts).
3. **Vector Similarity Quality**: Run 20-sample precision test on "find similar experiences" before Phase 2.
4. **RLHF Training Efficiency**: How much feedback needed to improve proposal quality measurably? Can we train weekly without redeploying?
5. **Dynamics 365 Audit Trail Scalability**: Log 10M+ audit events/month? Need schema/index strategy upfront.

---

## 7. Team Responsibilities (RACI Matrix)

| Task | Niobe | Dozer | Trinity | Morpheus | Back-Office | Security |
|------|-------|-------|---------|----------|------------|----------|
| Azure AI Foundry setup | **R** | | | **A** (approval) | | **C** |
| Booking API contracts | **C** | **R/A** | **C** | | | |
| Copilot LLM fine-tuning | **R/A** | | | **C** | | |
| MCP tool implementation | **R/A** | **C** (API owner) | | | | **C** (security review) |
| Teams bot integration | **R/A** | | **C** (adaptive cards) | | | |
| Copilot web portal | **R** (backend) | | **R** (frontend) | | | |
| Excursion Builder proposal engine | **R/A** | **C** | **C** (UI) | | | |
| Content Safety setup | **R/A** | | | **C** | | **A** (policy review) |
| Graph integration | **R/A** | | **C** (Teams UI) | **C** (app registration) | | **A** (auth scopes) |
| Audit logging | **R/A** | **C** (Dynamics schema) | | | **C** (compliance dashboard) | **A** (retention policy) |
| RLHF pipeline | **R/A** | **C** (data source) | **C** (feedback UI) | | | |

**Legend**: R=Responsible, A=Accountable, C=Consulted, I=Informed

---

## 8. Success Criteria Summary

### Phase 1 (MVP) – Go-Live Ready
- ✅ Copilot Agent responds in Teams chat <5s (95th percentile)
- ✅ MCP tools ground all responses; zero hallucinations on client data
- ✅ Audit log complete for all agent actions (ready for compliance review)
- ✅ Planner adoption: ≥40% of team testing within 2 weeks

### Phase 2 – Full Feature Set
- ✅ Excursion Builder generates 5 ranked proposals in <10s
- ✅ 95% of proposals pass content safety checks
- ✅ Planner workflow optimized: 3 edits/proposal (vs. 8 manual steps before)
- ✅ Calendar conflicts detected with 100% accuracy
- ✅ Copilot adoption: ≥60% of planners within 30 days

### Phase 3 – Continuous Improvement
- ✅ RLHF training running weekly; proposal quality trending +15%
- ✅ Proposal acceptance rate: >75%
- ✅ Client satisfaction (AI-assisted): ≥8/10
- ✅ Planner time savings: 8h → 5h per client (40% reduction)

---

## 9. Estimated Effort & Timeline

### Niobe Capacity Plan (1 FTE assumed)

| Phase | Tasks | Weeks | Notes |
|-------|-------|-------|-------|
| **Phase 1** | LLM core, MCP tools (5), Teams bot, web portal backend | **4 weeks** | Parallelizable with Dozer (API contracts); Graph app reg dependency |
| **Phase 2** | Proposal orchestration (4 prompts), content safety, Graph integration, calendar coordination, audit logging | **4 weeks** | Blocked by Excursion Builder feedback loop readiness (Trinity) |
| **Phase 3** | RLHF pipeline, Outlook add-in, predictive models | **4 weeks** | Optional; can defer or parallelize with Phase 2 if data ready |
| **Total** | | **12 weeks** | Assumes full FTE + 1 consultant for spike (quota, Graph scopes) |

**Suggested Allocation**:
- **Week 1–2**: Niobe + consultant spike on Azure AI Foundry quota, Graph app registration
- **Week 2–4**: Core LLM + MCP tools (can work in parallel with Dozer API contract finalization)
- **Week 5–8**: Proposal generation + safety guardrails + Graph integration (depends on back-office Phase 1 complete)
- **Week 9–12**: RLHF + optional Phase 3 features (can slip if Phase 2 features need polish)

---

## 10. Key Decisions Needed from Morpheus

1. **Azure AI Quota**: Secure GPT-4 deployment (minimum 50K TPM) or accept slower proposal generation?
2. **Graph API Scopes**: Approve delegated scopes (mail, calendar, teams); notify Security + Compliance teams.
3. **Back-Office Sync Point**: Confirm back-office Phase 1 ends by Week 2 to unblock MCP tools.
4. **RLHF Data Retention**: How long to retain feedback signals? (impacts Foundry fine-tuning schedule)
5. **Phase 2 Go/No-Go**: Gated on Phase 1 AC criteria; decision by end of Week 4.

---

**Report prepared by**: Niobe (AI/Integration Architect)  
**Date**: Per sprint planning cycle  
**Next sync**: Weekly integration standup (Mondays 10am)
