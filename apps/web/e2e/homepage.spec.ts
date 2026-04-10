import { test, expect } from '@playwright/test';

test.describe('Homepage — Visual & Content Audit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded and hydrated
    await page.waitForLoadState('networkidle');
  });

  test('full page screenshot', async ({ page }) => {
    // Small delay for animations to settle
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: 'e2e/screenshots/full-page.png',
      fullPage: true,
    });
  });

  test('Navbar — visible with brand and navigation', async ({ page }) => {
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    // Brand text (rendered as a span)
    await expect(nav.getByText('Aurora Luxe').first()).toBeVisible();

    // Navigation links present (desktop)
    const navLinks = nav.locator('a[href^="#"]');
    await expect(navLinks.first()).toBeVisible();

    // CTA button
    await expect(nav.getByText('Request Consultation').first()).toBeVisible();

    await nav.screenshot({ path: 'e2e/screenshots/section-navbar.png' });
  });

  test('Hero — visible with heading and CTA', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    // Main heading
    const heading = hero.locator('h1');
    await expect(heading).toContainText('Award-Winning Travel Specialists');

    // CTA buttons
    await expect(hero.getByText('Request Consultation')).toBeVisible();
    await expect(hero.getByText('Explore Destinations')).toBeVisible();

    await hero.screenshot({ path: 'e2e/screenshots/section-hero.png' });
  });

  test('Destinations — section visible with cards', async ({ page }) => {
    const section = page.locator('#destinations');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    // Section heading
    const heading = section.locator('h2');
    await expect(heading).toContainText('Curated Destinations');

    // Destination cards (should have multiple h3 elements)
    const cards = section.locator('h3');
    await expect(cards.first()).toBeVisible();
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);

    await section.screenshot({ path: 'e2e/screenshots/section-destinations.png' });
  });

  test('Experiences — section visible with items', async ({ page }) => {
    const section = page.locator('#experiences');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    // Section heading
    const heading = section.locator('h2');
    await expect(heading).toContainText('Signature Experiences');

    // Experience cards
    const cards = section.locator('h3');
    await expect(cards.first()).toBeVisible();
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);

    await section.screenshot({ path: 'e2e/screenshots/section-experiences.png' });
  });

  test('Tiers — section visible with tier cards', async ({ page }) => {
    const section = page.locator('#membership');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    // Section heading
    const heading = section.locator('h2');
    await expect(heading).toContainText('One Standard');

    // Tier cards with join buttons
    const joinButtons = section.getByText(/^Join /);
    await expect(joinButtons.first()).toBeVisible();
    const tierCount = await joinButtons.count();
    expect(tierCount).toBeGreaterThan(0);

    await section.screenshot({ path: 'e2e/screenshots/section-tiers.png' });
  });

  test('Testimonials — section visible with quotes', async ({ page }) => {
    const section = page.locator('#testimonials');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    // Section heading
    const heading = section.locator('h2');
    await expect(heading).toBeVisible();

    // Testimonial quotes (blockquote or paragraph content)
    const quotes = section.locator('p');
    await expect(quotes.first()).toBeVisible();
    const quoteCount = await quotes.count();
    expect(quoteCount).toBeGreaterThan(0);

    await section.screenshot({ path: 'e2e/screenshots/section-testimonials.png' });
  });

  test('Concierge Form — section visible with form fields', async ({ page }) => {
    const section = page.locator('#contact');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    // Section heading
    const heading = section.locator('h2');
    await expect(heading).toContainText('Ready to Start Planning');

    // Form exists
    const form = section.locator('form');
    await expect(form).toBeVisible();

    // Required fields
    await expect(section.locator('#name')).toBeVisible();
    await expect(section.locator('#email')).toBeVisible();

    // Optional fields
    await expect(section.locator('#travelDates')).toBeVisible();
    await expect(section.locator('#travelers')).toBeVisible();
    await expect(section.locator('#budget')).toBeVisible();
    await expect(section.locator('#notes')).toBeVisible();

    // Submit button
    await expect(section.getByText('Request Consultation')).toBeVisible();

    await section.screenshot({ path: 'e2e/screenshots/section-concierge-form.png' });
  });

  test('Footer — visible with brand and links', async ({ page }) => {
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(footer).toBeVisible();

    // Brand text
    await expect(footer.getByText('AURORA LUXE', { exact: true })).toBeVisible();

    // Copyright
    await expect(footer.getByText(/© 2026 Aurora Luxe Travel/)).toBeVisible();

    // Navigation links
    const links = footer.locator('a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);

    await footer.screenshot({ path: 'e2e/screenshots/section-footer.png' });
  });

  test('FAQ — accordion with clickable items', async ({ page }) => {
    const section = page.locator('#faq');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    const heading = section.locator('h2');
    await expect(heading).toContainText('Frequently Asked Questions');

    // Accordion buttons
    const accordionButtons = section.locator('button[aria-expanded]');
    const count = await accordionButtons.count();
    expect(count).toBeGreaterThan(0);

    // Click the first accordion item to expand it
    const firstButton = accordionButtons.first();
    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    // Verify the answer panel appeared
    const firstAnswerId = await firstButton.getAttribute('aria-controls');
    if (firstAnswerId) {
      await expect(page.locator(`#${firstAnswerId}`)).toBeVisible();
    }

    await section.screenshot({ path: 'e2e/screenshots/section-faq.png' });
  });

  test('WhyAurora — carousel with arrows and dots', async ({ page }) => {
    const section = page.locator('#why-aurora');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    const heading = section.locator('h2');
    await expect(heading).toContainText('Our Specialists');

    // Carousel arrow buttons
    const nextButton = section.locator('button[aria-label="Next team member"]');
    await expect(nextButton).toBeVisible();

    // Dot indicators
    const dots = section.locator('button[role="tab"]');
    const dotCount = await dots.count();
    expect(dotCount).toBeGreaterThan(1);

    // First dot should be selected initially
    await expect(dots.first()).toHaveAttribute('aria-selected', 'true');

    // Click next arrow and verify the active dot changes
    await nextButton.click();
    await page.waitForTimeout(500);
    await expect(dots.nth(1)).toHaveAttribute('aria-selected', 'true');

    await section.screenshot({ path: 'e2e/screenshots/section-whyaurora-carousel.png' });
  });

  test('BackToTop — appears after scrolling and returns to top', async ({ page }) => {
    const backToTop = page.locator('button[aria-label="Back to top"]');

    // Should not be visible at the top
    await expect(backToTop).not.toBeVisible();

    // Scroll far down (past 150vh threshold)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Should now be visible
    await expect(backToTop).toBeVisible();

    await page.screenshot({ path: 'e2e/screenshots/interaction-backtotop.png' });

    // Click it and wait for smooth scroll to finish
    await backToTop.click();
    await page.waitForTimeout(2000);

    // Should be back at or near the top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(500);
  });

  test('Destination hover — title stays visible during hover', async ({ page }) => {
    const section = page.locator('#destinations');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Get the first destination card
    const card = section.locator('[role="button"]').first();
    await expect(card).toBeVisible();

    // Get the card's title (h3) text
    const title = card.locator('h3');
    await expect(title).toBeVisible();

    // Hover over the card
    await card.hover();
    await page.waitForTimeout(500);

    // Title should remain visible during hover
    await expect(title).toBeVisible();

    await section.screenshot({ path: 'e2e/screenshots/interaction-destination-hover.png' });
  });

  test('Tier CTA — Join button scrolls to contact form', async ({ page }) => {
    const tiersSection = page.locator('#membership');
    await tiersSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Click the first "Join" button
    const joinButton = tiersSection.getByText(/^Join /).first();
    await expect(joinButton).toBeVisible();
    await joinButton.click();
    await page.waitForTimeout(1500);

    // Contact form should now be in view
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();

    await page.screenshot({ path: 'e2e/screenshots/interaction-tier-cta.png' });
  });
});
