import { test, expect } from '@playwright/test';
import path from 'path';

const screenshotDir = path.resolve(__dirname, '../public/screenshots/hover');

test.describe('Hover State Audit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    // Dismiss any animations by waiting
    await page.waitForTimeout(2000);
  });

  test('Destination cards hover', async ({ page }) => {
    // Scroll to destinations section
    await page.locator('#destinations').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const cards = page.locator('.destination-card');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);

    // Screenshot first card default state
    const firstCard = cards.first();
    await firstCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await firstCard.screenshot({ path: path.join(screenshotDir, '01-destination-card-default.png') });

    // Hover over first card
    await firstCard.hover();
    await page.waitForTimeout(500);
    await firstCard.screenshot({ path: path.join(screenshotDir, '02-destination-card-hover.png') });

    // Also screenshot the second card (non-featured) 
    if (cardCount > 1) {
      const secondCard = cards.nth(1);
      await secondCard.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await secondCard.screenshot({ path: path.join(screenshotDir, '03-destination-card2-default.png') });
      await secondCard.hover();
      await page.waitForTimeout(500);
      await secondCard.screenshot({ path: path.join(screenshotDir, '04-destination-card2-hover.png') });
    }
  });

  test('Experience cards hover', async ({ page }) => {
    await page.locator('#experiences').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Featured card 
    const featured = page.locator('#experiences .group').first();
    await featured.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await featured.screenshot({ path: path.join(screenshotDir, '05-experience-featured-default.png') });
    await featured.hover();
    await page.waitForTimeout(500);
    await featured.screenshot({ path: path.join(screenshotDir, '06-experience-featured-hover.png') });

    // A regular experience card
    const restCards = page.locator('#experiences .group');
    if (await restCards.count() > 1) {
      const card = restCards.nth(1);
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await card.screenshot({ path: path.join(screenshotDir, '07-experience-card-default.png') });
      await card.hover();
      await page.waitForTimeout(500);
      await card.screenshot({ path: path.join(screenshotDir, '08-experience-card-hover.png') });
    }
  });

  test('Tier cards hover', async ({ page }) => {
    await page.locator('#membership').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const cards = page.locator('.tier-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 3); i++) {
      const card = cards.nth(i);
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await card.screenshot({ path: path.join(screenshotDir, `09-tier-card-${i}-default.png`) });
      await card.hover();
      await page.waitForTimeout(400);
      await card.screenshot({ path: path.join(screenshotDir, `10-tier-card-${i}-hover.png`) });
    }
  });

  test('FAQ items hover', async ({ page }) => {
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const items = page.locator('#faq .border.rounded-lg');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    // First FAQ item
    const first = items.first();
    await first.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await first.screenshot({ path: path.join(screenshotDir, '11-faq-default.png') });
    
    // Hover on the button area
    const btn = first.locator('button').first();
    await btn.hover();
    await page.waitForTimeout(400);
    await first.screenshot({ path: path.join(screenshotDir, '12-faq-hover.png') });
  });

  test('WhyAurora specialist cards hover', async ({ page }) => {
    await page.locator('#why-aurora').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const cards = page.locator('#why-aurora article');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    const first = cards.first();
    await first.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await first.screenshot({ path: path.join(screenshotDir, '13-whyaurora-card-default.png') });
    await first.hover();
    await page.waitForTimeout(400);
    await first.screenshot({ path: path.join(screenshotDir, '14-whyaurora-card-hover.png') });
  });
});
