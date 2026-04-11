# Spec: Foundry-Powered Excursion Builder (#185)

## Overview
Azure AI Foundry–powered experience generation engine that transforms client preferences into curated, teachable luxury excursion proposals. Combines generative AI with guardrails to ensure brand-aligned, content-safe, and pedagogically sound experiences for Aurora Luxe clients.

## Problem Statement
Planners currently spend 8–15 hours per client relationship manually curating experiences. AI-powered generation with safety controls can:
- Reduce planning overhead 60–70%
- Ensure consistent brand voice across tiers
- Maintain teaching-quality narrative in experience descriptions
- Automatically surface responsible AI considerations (accessibility, inclusivity)

## Technical Architecture

### Core Components
1. **Azure AI Foundry Deployment**
   - Fine-tuned GPT-4 model with Aurora Luxe brand guidelines
   - Prompt engineering optimized for luxury/experiential narratives
   - Temperature: 0.7 (creative but bounded)

2. **Content Safety & Guardrails**
   - Azure AI Content Safety API for filtering (hate speech, violence, etc.)
   - Custom brand voice validator: lexicon matching, tone analysis
   - Tier-based content constraints (One-Time ≠ Gift ≠ Yearly)
   - Accessibility checker: event descriptions audited for inclusive language

3. **Input Processing**
   - Client preference schema: {budget, date, party_size, themes, constraints}
   - Existing experiences database (vector search via Azure AI Search)
   - Specialist availability & credentials
   - Venue/partner integrations (map boundaries)

4. **Proposal Generation**
   - Multi-prompt orchestration:
     * Concept generator (experience arc, theme mashups)
     * Narrative writer (client-facing story)
     * Specialist matcher (qualifications, availability)
     * Budget optimizer (tier-appropriate costs)
   - Candidate ranking: brand alignment score, feasibility, novelty

5. **Human Review Loop**
   - Planner dashboard highlights AI suggestions
   - One-click approve/edit/reject with feedback
   - Feedback loop trains future proposals (RLHF signals)

## Integration Points

### Booking Flow
- Excursion builder accessed at lead qualification stage
- Seamless handoff from proposal to booking contract (Dynamics 365)
- Client messaging pre-filled with AI-generated narratives

### CMS & Content Library
- Reads from content-management system for partner/venue descriptions
- Respects editorial versioning (only "published" content in generation)

### Dynamics 365
- Client tier, budget, history visible in builder context
- Proposal tied to Opportunity record

## Responsible AI Considerations

- **Transparency**: All proposals flagged as "AI-assisted" in planner UI
- **Bias mitigation**: Training data audited for accessibility, cultural representation
- **Hallucination prevention**: Ground all venue/specialist references in live database
- **Teaching quality**: Narrative tone checked for pedagogical alignment
- **Appeal path**: Clients can request planner review if experience seems inappropriate

## Acceptance Criteria
1. Builder generates 5 proposal concepts in <10s
2. 95% of proposals pass content safety checks
3. Planner usability test: avg. 3 edits per proposal (down from 8 manual steps)
4. Brand voice consistency validated by stakeholder audit
5. Accessibility checklist auto-generated for each proposal

## Success Metrics
- Planner time-to-proposal: 15 min → 5 min
- Proposal acceptance rate: >75%
- Client satisfaction with AI-assisted proposals: ≥8/10
- Brand alignment scores: ≥0.92 (0–1 scale)

## Future Enhancements
- Seasonal/event-specific fine-tuning
- Real-time pricing from partner APIs
- Video proposal generation with specialist introductions
