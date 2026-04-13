# Spec: Content Management System (#188)

## Overview
Centralized editorial platform for managing Aurora Luxe experience descriptions, specialist profiles, venue partnerships, educational content, and tier-specific materials. Supports collaborative authoring, versioning, role-based approval workflows, and seamless integration with marketing, AI generation, and booking systems.

## Problem Statement
Content currently scattered:
- Experience descriptions in spreadsheets & Confluence
- Specialist bios in outdated docs
- Marketing copy duplicated across web, email, PDFs
- No versioning (can't rollback bad edits)
- CMS-less: changes require developer intervention
- No content reuse (copypasta → inconsistency)

## Architecture

### Core Components

1. **Headless CMS (Contentful / Strapi alternative)**
   - Structured content models: Experiences, Specialists, Venues, Tiers
   - JSON APIs for frontend (web, mobile, AI generation)
   - Webhooks: trigger on publish (update AI training data, sync caches)
   - Media library: CDN-backed images, PDFs, videos

2. **Content Models**

   **Experience**
   - Title, slug, description, pedagogy focus, themes (array)
   - Tier(s) it's available in
   - Included specialists (role, count)
   - Venues, capacity, duration
   - Price tier override (if different by tier)
   - Media: hero image, gallery, video URL
   - Metadata: search tags, target audience, seasonality

   **Specialist Profile**
   - Name, bio, credentials, avatar
   - Specialties (multi-select: culinary, wellness, art, logistics)
   - Tier availability (One-Time, Yearly, Gift)
   - Availability calendar (linked to ops system)
   - Testimonials/reviews (readonly, sourced from bookings)
   - Rate card (base, tier-specific overrides)

   **Venue**
   - Location, capacity range, outdoor/indoor
   - Amenities (catering, AV, parking)
   - Booking/lead times
   - Contact, terms, insurance requirements
   - Rate card (per hour, per event)
   - Photos/floor plans

   **Tier Definition**
   - Name, price point range, value props
   - Included experiences, specialist caps
   - Service level (response time, customization, exclusivity)
   - Onboarding/renewal terms

3. **Editorial Workflow: Draft → Review → Publish**
   - Draft state: author editing, no visibility to frontend
   - Submitted: flagged for reviewer(s)
   - In Review: stakeholder feedback (comments, suggested edits)
   - Approved: ready to publish
   - Published: live on web/APIs
   - Archived: hidden from search, retained for history

4. **Version Control & Rollback**
   - Every publish creates immutable version snapshot
   - Diff viewer: see what changed (text, media, metadata)
   - One-click rollback to prior published version
   - Audit log: who changed what, when, why (review comments)

5. **Role-Based Access**
   - **Editor**: create/edit content (not publish)
   - **Reviewer**: approve drafts, suggest changes, publish
   - **Admin**: user management, workflow config, media library
   - **Viewer** (planners, marketing): read-only access to published content
   - **Contributor** (specialists): self-service bio updates (submitted for review)

6. **Media Asset Management**
   - Drag-drop upload (images, PDFs, videos)
   - Auto-resize/optimize for web
   - CDN distribution (fast global delivery)
   - Reusability: track which content uses each asset
   - Metadata tagging (alt text, keywords)
   - Expiry management (archive old media)

7. **Integration Points**

   **Frontend Web App**
   - Query published content via GraphQL/REST
   - Revalidate on-demand (ISR/webhook on publish)
   - Auto-generate sitemap from content

   **AI Excursion Builder**
   - Pulls published experiences & specialists
   - Only references "approved" content (no drafts)
   - Notified on new experiences/specialists (training refresh)

   **Back-Office Platform (Dynamics 365)**
   - Sync specialist rates & availability
   - Populate experience descriptions in confirmations

   **Marketing**
   - Export published content to email templates
   - Generate social media captions (API)
   - Multi-language support (future)

## Workflow Example: New Experience

1. Planner drafts experience in CMS (title, description, themes, specialists)
2. AI-suggested descriptions reviewed/tweaked
3. Submitted for editor review (brand voice, pedagogy)
4. Reviewer approves or requests changes (comments)
5. Published; webhook triggers:
   - Web frontend revalidates
   - AI builder training data updated
   - Specialist availability linked
6. Live in 2–5 minutes; marketing notified via Slack

## Acceptance Criteria
1. Content publish latency: <5 min (end-to-end)
2. Rollback time: <2 min (one-click)
3. Media upload: <30s for 10MB file
4. Workflow notifications: 100% delivery within 1 min
5. Version history retention: ≥12 months, searchable
6. Role-based access: granular (can restrict by tier/type)

## Success Metrics
- Time-to-publish new experience: 1h → 15 min
- Content reuse (linked references): 80% of experiences
- Editor time/week managing content: 6h → 3h
- Quality: zero brand-voice inconsistencies post-launch
- Marketing campaign turnaround: 5 days → 1 day

## Technology Choices
- **CMS**: Contentful (headless, scalable, webhooks)
- **Media**: Cloudinary (CDN, auto-optimization)
- **Versioning**: Native CMS versioning + DynamoDB audit log
- **Review workflow**: CMS built-in + Slack notifications

## Future Enhancements
- Multi-language content (translations + SEO)
- A/B testing framework (experience descriptions)
- AI-suggested metadata (tagging automation)
- Scheduled publishing (date/time-based)
- Content recommendations (related experiences)
