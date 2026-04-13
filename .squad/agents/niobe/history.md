# Niobe Project History & Learnings

## Session: Sprint Planning – AI/Integration Scope Assessment
**Date**: Per sprint planning cycle  
**Task**: Review S4 & S7 specs; produce scope, dependencies, and build order for Morpheus master plan

### Specs Reviewed
1. **spec/s4-ai-intelligence/ai-excursion-builder.md** (80 lines)
   - Foundry-powered proposal generation (4-prompt orchestration)
   - Content safety (Azure AI + custom brand voice validator)
   - Planner dashboard for approval/edit/reject workflow
   - RLHF feedback loop for continuous improvement

2. **spec/s4-ai-intelligence/copilot-planning-agent.md** (173 lines)
   - GPT-4 (128K context) Teams chat + web portal + Outlook add-in
   - MCP tool server (5 tools: client profile, specialist availability, venue options, conflict check, recommendations)
   - Microsoft Graph integration (Calendar, Mail, Teams, OneDrive)
   - Conversational grounding: no hallucinations on live data

3. **spec/s7-back-office/backoffice-platform.md** (129 lines)
   - Dynamics 365 CRM (unified client DB, tier segmentation, opportunity history)
   - Power Apps dashboard + Power Automate workflows + Logic Apps integrations
   - Field Service mobile + Document Intelligence contract processing
   - Data backbone for all AI features

### Key Findings Stored

#### Foundational Insights
- **Copilot & Excursion Builder are independent yet complementary**: Copilot MVP (Week 4) can ship solo; Excursion Builder integrates as optional context (Week 6).
- **Back-office is the data backbone**: All AI grounding depends on Dynamics 365 schema + booking APIs being mature. Back-office Phase 1 must complete by Week 2 to unblock Niobe Phase 1.
- **Build order is sequential with parallelizable windows**:
  - Weeks 1–2: Booking API contracts + Azure AI Foundry quota approval (blocks everything)
  - Weeks 2–4: MCP tool server + Copilot LLM core (can parallelize with Dozer API work)
  - Weeks 5–8: Proposal generation + full Copilot features (depends on back-office data live)
  - Weeks 9–12: RLHF training + optional Phase 3 features

#### Critical Risks Identified
1. **Azure AI Quota approval delay** (Medium probability, High impact): Could slip entire Excursion Builder. Recommend request TODAY; spike with GPT-3.5 fallback.
2. **Content Safety false-positive rate** (Medium probability, High impact): If >5% of legitimate proposals flagged, planner trust breaks. Requires Week 5 spike before Phase 2.
3. **Vector DB grounding quality unknown** (Medium probability, Medium impact): "No hallucination" depends on CMS data quality + semantic search performance. May need 1–2 week data cleanup.
4. **RLHF feedback signals sparse** (Medium probability, Medium impact): Depends 100% on Trinity's feedback UI design (<1 click required). Low adoption → poor training → feature fails.
5. **Specialist availability tool becomes bottleneck** (Low–Medium probability, Medium impact): Graph Calendar API rate limits + Dynamics schema maturity. Plan for caching + async lookups.

#### Unknowns Flagged for Early Spikes
- Week 4: Vector DB precision/recall test (50 sample experiences)
- Week 5: Content Safety multi-category performance (1,000 samples)
- Week 5: Email summarization accuracy on real Aurora Luxe threads
- Week 5: Proposal generation load test (5 concurrent requests under GPT-4)
- Week 2: Graph Calendar API performance stress test (20 concurrent users)

#### Dependencies Mapped
- **Niobe → Dozer**: Booking API contracts, specialist availability schema, Dynamics opportunity structure
- **Niobe → Trinity**: Planner dashboard feedback UI, Copilot web portal chat UI, Excursion Builder proposal card design
- **Niobe → Morpheus**: Azure AI quota approval, Graph app registration, back-office sync cadence
- **Niobe → Back-Office**: Must wait for Dynamics 365 + Power Automate + Power Apps deployment (Week 2)

#### Team Responsibilities (RACI)
- **Niobe**: R/A for all AI/integration features (LLM, MCP, content safety, audit logging)
- **Dozer**: R/A for booking APIs + Dynamics schema; C for MCP tool testing
- **Trinity**: R/A for all planner-facing UX (dashboard, feedback UI, chat portal, Excursion Builder cards); C for AI feature validation
- **Morpheus**: A/C for quota approval, app registration, cross-team orchestration
- **Back-Office Team**: R for Power Platform implementation; I on AI feature needs
- **Security**: A for auth scopes, audit retention policy, content safety guardrails

### Deliverables Produced
1. **F:\Git\luxesite\.squad\agents\niobe\ai-scope.md** (comprehensive scope + build order + risk register)
2. **F:\Git\luxesite\.squad\decisions\inbox\niobe-ai-scope.md** (15 key findings + decision items for Morpheus)

### Next Steps
- Morpheus reviews scope assessment + key findings; makes Go/No-Go decisions on:
  - Azure AI quota request
  - Copilot Phase 1 scope (solo vs. bundled with Excursion Builder)
  - Back-office Phase 1 sync point (Week 2 lock?)
  - RLHF training frequency (weekly vs. monthly)
- Week 1 kickoff: integrate decisions into master sprint plan
- Weekly sync: Monday 10am (Niobe, Dozer, Trinity, Morpheus, back-office lead, security)

### Conventions & Patterns Established
- **Scope Assessment Format**: AI Features Inventory (complexity tiers S/M/L/XL), Integration Points (topology map), Prerequisites, Build Order (phased with blockers), Back-Office Dependencies, Risks (with probability/impact/mitigation), Team RACI, Success Criteria, Effort Estimate
- **Risk Register**: Probability × Impact classification (🔴 Critical, 🟡 High, 🟢 Medium) + mitigation + early spikes
- **Phase 1 / Phase 2 / Phase 3**: Clear milestone gates (AC criteria required before advancement)
- **MCP Tool Server**: Assumed architectural pattern for all agent integrations (Copilot + future agents)
- **Audit Logging**: Compliance-first (Log Analytics + Dynamics 365, 30-day retention, queryable dashboard)
