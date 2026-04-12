import { test } from '@playwright/test';
import path from 'path';

const screenshotDir = path.resolve(__dirname, 'screenshots');

test.describe('Spacing Audit — Screenshots', () => {
  test('Desktop 1440px full page screenshot', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: path.join(screenshotDir, 'spacing-audit-desktop.png'),
      fullPage: true,
    });
    await context.close();
  });

  test('Mobile 375px full page screenshot', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: path.join(screenshotDir, 'spacing-audit-mobile.png'),
      fullPage: true,
    });
    await context.close();
  });
});
