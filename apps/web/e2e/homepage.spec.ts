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

    // Brand text
    const brand = nav.locator('h1');
    await expect(brand).toContainText('Aurora Luxe');

    // Navigation links present (desktop)
    const navLinks = nav.locator('a[href^="#"]');
    await expect(navLinks.first()).toBeVisible();

    // CTA button
    await expect(nav.getByText('Request Itinerary').first()).toBeVisible();

    await nav.screenshot({ path: 'e2e/screenshots/section-navbar.png' });
  });

  test('Hero — visible with heading and CTA', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    // Main heading
    const heading = hero.locator('h1');
    await expect(heading).toContainText('Beyond First Class');

    // CTA buttons
    await expect(hero.getByText('Design My Trip')).toBeVisible();
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
    await expect(heading).toContainText('Membership');

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
    await expect(heading).toContainText('What Our Members Say');

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
    await expect(heading).toContainText('Design Your Journey');

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
    await expect(section.getByText('Send Request')).toBeVisible();

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
    await expect(footer.getByText(/© 2025 Aurora Luxe Travel/)).toBeVisible();

    // Navigation links
    const links = footer.locator('a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);

    await footer.screenshot({ path: 'e2e/screenshots/section-footer.png' });
  });
});
