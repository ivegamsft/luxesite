# Key Findings: AI/Integration Scope Assessment
**For**: Morpheus (Master Sprint Plan)  
**From**: Niobe (AI/Integration Architect)  
**Date**: Per sprint planning cycle  
**Status**: 🟡 Awaiting Decisions

---

## 1. Critical Path Blocker: Azure AI Foundry Quota

**Finding**: Excursion Builder cannot start development without confirmed GPT-4 deployment capacity. Global model demand is high; procurement may take 2–4 weeks.

**Recommendation**:
- Request quota TODAY: minimum 50K TPM (tokens per minute)
- Spike alternative: prototype with GPT-3.5-turbo (cheaper, 128K context available) to validate UX flow while awaiting GPT-4 approval
- If approval delayed >3 weeks, parallel-track Phase 1 (Copilot agent) with GPT-3.5 to maintain sprint velocity

**Owner**: Morpheus (escalate to Azure ops by EOD tomorrow)

---

## 2. Booking API Contracts Are Foundational

**Finding**: Every AI feature depends on Booking API contracts. MCP tools, excursion builder specialist matching, copilot availability checks, back-office automation—all hang on these 5 endpoints.

**Recommendation**:
- Dozer & Morpheus define contracts (input/output schemas) by EOW (Week 1)
- Niobe can mock responses and test AI logic in parallel
- Do NOT wait for backend implementation; contracts + OpenAPI spec sufficient
- Add to Morpheus' critical path (blocks Niobe, Trinity, and back-office teams)

**Owner**: Dozer (with Morpheus oversight)

---

## 3. Back-Office Must Complete Phase 1 by Week 2

**Finding**: Niobe's MCP tools need live Dynamics data (client profiles, specialist calendars, tier policies). Back-office team must deploy Dynamics 365 + Power Apps dashboard + Power Automate basic flows by Week 2 to unblock Niobe's Week 3–4 work.

**Recommendation**:
- Stagger sprint: back-office Phase 1 (Weeks 1–2), Niobe Phase 1 (Weeks 2–4, overlapping)
- Morpheus coordinate: weekly integration sync (Mon 10am) to sync data model assumptions
- If back-office delays, Niobe falls to Weeks 3–5 (cascades downstream)

**Owner**: Morpheus (orchestrate cross-team dependencies)

---

## 4. Copilot Agent Can Ship Phase 1 Without Excursion Builder

**Finding**: Teams chat + web portal + calendar coordination are independent of proposal generation. Can deliver planner value with Copilot Phase 1 solo (client lookup, specialist recommendations, email summary, calendar holds).

**Recommendation**:
- De-risk by shipping Copilot MVP first (Week 4)
- Excursion Builder integrates as optional context later (Week 6)
- Maintains momentum; unblocks planner feedback gathering (for RLHF)

**Implication**: Early planner adoption may start on schedule (Week 5); Phase 2 waits for Excursion Builder safety validation.

---

## 5. Content Safety Must Be Validated Early (Week 5 Spike)

**Finding**: Azure AI Content Safety API will filter 95% of proposals (AC#2). If false-positive rate >5%, planner trust erodes; feature fails adoption.

**Recommendation**:
- Week 5: Run spike with 1,000 sample luxury proposal narratives (real or synthetic)
- Measure precision/recall on hate speech, violence, sexual content categories
- Tune thresholds **before** Phase 2 sign-off; plan 1-week iteration buffer
- If accuracy insufficient, may need custom classifier (delays Phase 2 by 1 week)

**Owner**: Niobe + Morpheus (security review)

---

## 6. Vector DB Grounding Quality Is Unknown

**Finding**: Excursion Builder and Copilot both rely on "no hallucination" principle. This assumes vector search over CMS (experiences, specialists, venues) returns relevant results with high precision. We haven't validated this yet.

**Recommendation**:
- Week 4 spike: sample 50 client preferences; run semantic search for matching experiences/specialists
- Measure recall (correct matches found?) and precision (noise in results?)
- If poor, may need:
  - Data cleaning / CMS enrichment (additional effort)
  - Hybrid search (keyword + vector combination)
  - Custom ranker (AI score + business rules)

**Impact**: Could add 1–2 weeks to Phase 2 if data quality is poor.

---

## 7. RLHF Training Frequency Uncertain

**Finding**: Excursion Builder AC#4 requires "training future proposals from planner feedback." Unclear whether weekly retraining is feasible or too expensive. Foundry fine-tuning costs + latency unknown.

**Recommendation**:
- Week 5: Cost out Foundry fine-tuning job (hourly duration, TPM cost, QPS impact)
- Decision needed: weekly (aggressive, expensive) vs. monthly (cheaper, slower improvement)
- Default to monthly; upgrade frequency if adoption feedback justifies cost

**Owner**: Niobe + Morpheus (Azure cost negotiation)

---

## 8. Planner Feedback UI Is Critical

**Finding**: RLHF feedback loop depends entirely on planner willingness to flag edits/rejections. If feedback capture requires >1 click, signal will be sparse (low adoption → poor training data → no improvement).

**Recommendation**:
- Trinity must design feedback UI as 1-click modal in planner dashboard (not buried in settings)
- Measure feedback capture rate: target ≥50% of proposals (suggest start with 20%)
- Weekly review: if <20% after Week 2, UX iteration required before Phase 2 sign-off

**Owner**: Trinity (with Niobe input on training signal requirements)

---

## 9. Graph Mail API Summarization May Be Ambiguous

**Finding**: Copilot promises "email context summaries in real-time." Email threads are messy (multiple topics, unclear decisions). LLM summaries may omit critical details or misinterpret intent.

**Recommendation**:
- Week 3 spike: test email summarization on 20 real Aurora Luxe threads (volunteers)
- Measure: planner satisfaction ("Is this summary accurate?"), recall (key info preserved?)
- If accuracy <85%, restrict feature to "extract action items" (simpler task) rather than open summarization
- Set AC: Copilot email summary acc ≥85% or flag [UNCERTAIN] for planner review

**Owner**: Niobe + Morpheus

---

## 10. Specialist Availability Requires Calendar Integration at Scale

**Finding**: MCP tool `get_specialist_availability(date_range, skills)` must cross-reference specialist calendars, preferences, rate cards, and tier eligibility. If Graph Calendar API rate-limited or Dynamics specialist schema immature, this tool becomes a bottleneck.

**Recommendation**:
- Week 2: finalize specialist schema (Dozer); test Graph Calendar performance under load (20 concurrent calendar checks)
- Plan for local caching: 1-hour TTL on availability to reduce API calls
- If Graph rate limits hit, implement queue + async availability lookups (acceptable latency: <2s still)

**Owner**: Dozer (specialist schema) + Niobe (Graph optimization)

---

## 11. Audit Logging at Scale: 10M Events/Month Expected

**Finding**: Back-office handles 100+ active bookings with 20–30 staff + field teams. Audit logging (all MCP calls, approvals, proposal feedback) could easily exceed 10M events/month. Dynamics audit trail may not scale; Log Analytics pricing may spike.

**Recommendation**:
- Week 1: finalize audit schema + storage strategy with Dozer + Security
- Consider partitioning: real-time queries (last 7 days in Dynamics) vs. archive (Log Analytics, older)
- Budget for Log Analytics ingestion costs (estimate: $2K–5K/month at scale)
- Compliance: confirm 30-day retention policy acceptable to audit/legal

**Owner**: Security + Niobe (schema design) + Dozer (Dynamics implementation)

---

## 12. Outlook Add-in Can Slip to Phase 3 Without Risk

**Finding**: Outlook add-in (Phase 2) offers modest value ("email reply suggestions") and may be underestimated (Outlook SDK integration complexity). Teams + web portal already cover primary use cases.

**Recommendation**:
- Defer to Phase 3 (Week 10+) to maintain Phase 2 momentum
- If Phase 1–2 momentum strong + planner feedback positive, prioritize add-in
- Otherwise, accept "email must be checked in Teams or web portal" as Phase 2 limitation

**Owner**: Morpheus (Phase 2 scope decision)

---

## 13. Phase 1 Adoption Target: 40% Baseline

**Finding**: Copilot MVP (Teams chat, client lookup, specialist recommendations) is conservative feature set. Adoption may be lower than Phase 2 targets (60%) because value is mostly time-savings, not new capabilities.

**Recommendation**:
- Set Phase 1 adoption target: ≥40% of planner team within Week 5 (MVP deployed Week 4)
- Use adoption metrics to validate UX before Phase 2 (proposal generation, RLHF)
- If <40%, conduct UX interviews before greenlight on Phase 2; may need simplification

**Owner**: Morpheus + Trinity (track adoption, survey planners)

---

## 14. Risk: GPT-4 Latency Under Concurrent Load

**Finding**: Excursion Builder promise: "5 proposals in <10s." Under peak load (5 planners requesting proposals simultaneously), GPT-4 throughput may degrade, pushing latency to 12–15s (breaks AC#1).

**Recommendation**:
- Week 1: reserve 50K TPM **minimum** with priority QoS guarantee
- Week 5: load test proposal generation (5 concurrent requests) before Phase 2 sign-off
- Contingency: implement proposal caching (dedupe requests, serve pre-computed results for common inputs)

**Owner**: Morpheus (Azure negotiation) + Niobe (load test)

---

## 15. Handoff to Trinity: Copilot Web Portal UI

**Finding**: Niobe delivers streaming LLM endpoint + audit logging. Trinity owns chat UI (adaptive cards, context panels, slash command rendering, conversation history).

**Recommendation**:
- Week 3: design review (Trinity, Niobe, Morpheus) on chat UX + MCP tool output formatting
- Trinity should assume MCP tool responses may be slow (~2–5s) or uncertain (confidence score <80%); design UX accordingly (loading states, confidence badges)
- Establish contract: Niobe provides JSON responses; Trinity formats for display

**Owner**: Trinity (with Niobe consultation)

---

## Decision Items for Morpheus

1. ✅ **Azure AI Quota**: Approved for GPT-4 50K TPM + budget ceiling?
2. ✅ **Back-Office Sync**: Week 1–2 Dynamics + Power Apps deployment locked in?
3. ✅ **Copilot Phase 1 Scope**: Ship without Excursion Builder (Weeks 1–4) or bundle together?
4. ✅ **Phase 2 Gate**: Require AC#2 (content safety) spiked + validated before Phase 2 start?
5. ✅ **RLHF Training Frequency**: Weekly (expensive) or monthly (cheaper)?
6. ✅ **Outlook Add-in Defer**: Slip to Phase 3, or attempt in Phase 2?
7. ✅ **Planner Feedback UI Owner**: Trinity confirmed responsible for 1-click feedback design?

---

**Prepared by**: Niobe  
**Review cycle**: Integrate with Morpheus master plan  
**Next update**: Post-decision (Week 1 kickoff)
