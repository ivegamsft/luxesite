# Sample Data Pack Specification

## Overview

The teaching site requires realistic sample data across all event types and customer segments. This pack ensures the booking flow, email notifications, and reporting UI work correctly end-to-end.

## Event Records (3+ each)

### One-Time Events
1. **Inquiry Stage**: "Enchanted Garden Gala" — 12 guests, inquiry submitted 2 days ago, awaiting confirmation email
2. **Booked Stage**: "Yacht Night Celebration" — 8 guests, confirmed, payment received, trip in 5 days
3. **Completed Stage**: "Mountaintop Dinner" — 6 guests, completed last week, awaiting review/testimonial

### Yearly Subscriptions  
1. **Active**: Premium subscriber, joined 3 months ago, $8,500/year, renewal in 9 months
2. **Renewal Due**: Yearly member, renewal due in 7 days, sends renewal reminder email
3. **Expired**: Gold tier, expired 2 weeks ago, displays upgrade/reactivate messaging

### Gift Purchases
1. **Purchased**: Gift card for $2,000, buyer: john@example.com, recipient: jane@example.com (unopened)
2. **Redeemed**: $1,500 gift used for "Beach Bonfire" event booking
3. **Expired**: $500 gift card, 1 year old, displays expiration notice

## Specialist Profiles (3+)

- **Head of Production**: Sophie, 8+ years luxury events, bio, professional photo
- **Event Architect**: Marcus, specialist in large-scale celebrations and galas
- **Celebration Curator**: Aisha, expert in culinary/gastronomic experiences

*Each includes: name, title, bio (100 chars), photo, specialization tags*

## Experience Catalog Entries (5+)

- Enchanted garden gala (outdoor venue transformation)
- Private yacht celebration under the stars
- Mountaintop dinner party for intimate gatherings
- Cultural immersion evening with live performances
- Adventure experience — helicopter arrival + surprise reveal

*Each includes: title, description, price range, duration, region, 2-3 imagery URLs, capacity*

## Testimonials (5+)

- High-value client (Yearly tier): "Aurora transformed our anniversary into unforgettable memories."
- Corporate event organizer: "Seamless from booking to execution."
- Repeat customer (One Time tier): "Finally, an event production team that understands luxury."
- Young professional: "Worth every penny."
- International client: "Exceptional attention to detail."

*Each includes: author name, tier level, quote, date, optional photo*

## FAQs (8+)

- How far in advance should I book?
- What's included in membership tiers?
- Can I customize experiences?
- Cancellation and refund policy?
- How do gift cards work?
- Privacy and data handling?
- International experience support?
- Group vs. individual bookings?

## Usage

All sample data is **non-production** and should be clearly marked in the admin panel. When deploying to staging or production, replace with real data following the same schema.

**Retention**: Keep sample data in version control under `spec/sample-data/` as JSON/CSV for reference.
