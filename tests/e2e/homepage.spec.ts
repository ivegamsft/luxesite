import { test, expect } from '@playwright/test';
import path from 'path';

const screenshotDir = path.resolve(__dirname, 'screenshots');

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
      path: path.join(screenshotDir, 'full-page.png'),
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

    await nav.screenshot({ path: path.join(screenshotDir, 'section-navbar.png') });
  });

  test('Hero — visible with heading and CTA', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    // Main heading
    const heading = hero.locator('h1');
    await expect(heading).toContainText('Extraordinary Celebrations for Every Age');

    // CTA buttons
    await expect(hero.getByText('Request Consultation')).toBeVisible();
    await expect(hero.getByText('Explore Celebrations')).toBeVisible();

    // Wait for all hero animations to complete
    await page.waitForTimeout(1500);
    await hero.screenshot({ path: path.join(screenshotDir, 'section-hero.png') });
  });

  test('Destinations — section visible with cards', async ({ page }) => {
    const section = page.locator('#destinations');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    // Section heading
    const heading = section.locator('h2');
    await expect(heading).toContainText('Celebration Spaces');

    // Venue cards (should have multiple h3 elements)
    const cards = section.locator('h3');
    await expect(cards.first()).toBeVisible();
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);

    await section.screenshot({ path: path.join(screenshotDir, 'section-destinations.png') });
  });

  test('Experiences — section visible with items', async ({ page }) => {
    const section = page.locator('#experiences');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    // Section heading
    const heading = section.locator('h2');
    await expect(heading).toContainText('Productions, Not Parties');

    // Experience cards
    const cards = section.locator('h3');
    await expect(cards.first()).toBeVisible();
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);

    await section.screenshot({ path: path.join(screenshotDir, 'section-experiences.png') });
  });

  test('Tiers — section visible with tier cards', async ({ page }) => {
    const section = page.locator('#membership');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    // Section heading
    const heading = section.locator('h2');
    await expect(heading).toContainText('Tiers');

    // Tier cards with CTA buttons
    const ctaButtons = section.getByText('Begin a Conversation');
    await expect(ctaButtons.first()).toBeVisible();
    const tierCount = await ctaButtons.count();
    expect(tierCount).toBeGreaterThan(0);

    await section.screenshot({ path: path.join(screenshotDir, 'section-tiers.png') });
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

    await section.screenshot({ path: path.join(screenshotDir, 'section-testimonials.png') });
  });

  test('Concierge Form — section visible with form fields', async ({ page }) => {
    const section = page.locator('#contact');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    // Section heading
    const heading = section.locator('h2');
    await expect(heading).toContainText('Request a Consultation');

    // Form exists
    const form = section.locator('form');
    await expect(form).toBeVisible();

    // Required fields
    await expect(section.locator('#name')).toBeVisible();
    await expect(section.locator('#email')).toBeVisible();

    // Notes field — always visible (not inside expandable section)
    await expect(section.locator('#notes')).toBeVisible();

    // Optional fields — hidden by default, expand first
    const detailsToggle = section.getByText('Share more details (optional)');
    await detailsToggle.click();
    await page.waitForTimeout(300);
    await expect(section.locator('#eventDate')).toBeVisible();
    await expect(section.locator('#expectedGuests')).toBeVisible();
    await expect(section.locator('#budget')).toBeVisible();

    // Submit button
    await expect(section.getByText('Request Consultation')).toBeVisible();

    await section.screenshot({ path: path.join(screenshotDir, 'section-concierge-form.png') });
  });

  test('Footer — visible with brand and links', async ({ page }) => {
    const footer = page.getByRole('contentinfo');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(footer).toBeVisible();

    // Brand text
    await expect(footer.getByText('AURORA LUXE', { exact: true })).toBeVisible();

    // Copyright
    await expect(footer.getByText(/© 2026 Aurora Luxe Events/)).toBeVisible();

    // Navigation links
    const links = footer.locator('a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);

    await footer.screenshot({ path: path.join(screenshotDir, 'section-footer.png') });
  });

  test('FAQ — accordion with clickable items', async ({ page }) => {
    const section = page.locator('#faq');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    const heading = section.locator('h2');
    await expect(heading).toContainText('Common Questions');

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

    await section.screenshot({ path: path.join(screenshotDir, 'section-faq.png') });
  });

  test('WhyAurora — specialist grid with team members', async ({ page }) => {
    const section = page.locator('#why-aurora');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    const heading = section.locator('h2');
    await expect(heading).toContainText('Designed by Specialists');

    // Team member cards (article elements)
    const cards = section.locator('article');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);

    // First card should have a name
    await expect(cards.first()).toBeVisible();

    await section.screenshot({ path: path.join(screenshotDir, 'section-whyaurora-carousel.png') });
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

    await page.screenshot({ path: path.join(screenshotDir, 'interaction-backtotop.png') });

    // Click it and wait for smooth scroll to finish
    await backToTop.click();
    await page.waitForTimeout(2000);

    // Should be back at or near the top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(500);
  });

  test('Venue hover — title stays visible during hover', async ({ page }) => {
    const section = page.locator('#destinations');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Get the first venue card
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

    await section.screenshot({ path: path.join(screenshotDir, 'interaction-venue-hover.png') });
  });

  test('Tier CTA — Join button scrolls to contact form', async ({ page }) => {
    const tiersSection = page.locator('#membership');
    await tiersSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Click the first "Join" button
    const joinButton = tiersSection.getByText('Begin a Conversation').first();
    await expect(joinButton).toBeVisible();
    await joinButton.click();
    await page.waitForTimeout(1500);

    // Contact form should now be in view
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();

    await page.screenshot({ path: path.join(screenshotDir, 'interaction-tier-cta.png') });
  });
});
