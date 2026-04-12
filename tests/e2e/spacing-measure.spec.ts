import { test } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.resolve(__dirname, 'screenshots');

// Sections in page order with selectors
const sections = [
  { name: 'Hero', selector: '#hero' },
  { name: 'TrustBar', selector: 'main > div:has(> .max-w-7xl), #hero ~ div' },
  { name: 'WhyAurora', selector: '#why-aurora' },
  { name: 'DestinationGrid', selector: '#destinations' },
  { name: 'ExperienceList', selector: '#experiences' },
  { name: 'Testimonials', selector: '#testimonials' },
  { name: 'Interstitial', selector: '#testimonials ~ section:not([id])' },
  { name: 'Tiers', selector: '#membership' },
  { name: 'FAQ', selector: '#faq' },
  { name: 'ConciergeForm', selector: '#contact' },
  { name: 'Footer', selector: 'footer' },
];

interface Measurement {
  from: string;
  to: string;
  sectionABottom: number;
  sectionBTop: number;
  sectionBH2Top: number | null;
  gapSectionToSection: number;
  gapSectionToH2: number | null;
}

async function measurePage(page: import('@playwright/test').Page, viewportLabel: string): Promise<Measurement[]> {
  const measurements: Measurement[] = [];

  // Get all section bounding boxes
  const sectionBoxes: { name: string; box: { x: number; y: number; width: number; height: number } | null; h2Top: number | null }[] = [];

  for (const sec of sections) {
    let box = null;
    let h2Top = null;

    try {
      // Try multiple selectors for TrustBar which doesn't have an ID
      if (sec.name === 'TrustBar') {
        // TrustBar is a div (not section) right after #hero
        const trustBar = page.locator('#hero + div').first();
        box = await trustBar.boundingBox();
      } else if (sec.name === 'Interstitial') {
        // Interstitial is a section without id, after Testimonials
        // It has a background image with min-h-[50vh]
        const inter = page.locator('section.relative.min-h-\\[50vh\\]').first();
        box = await inter.boundingBox();
        if (!box) {
          // Fallback: find section elements and pick the one after testimonials
          const allSections = page.locator('main section');
          const count = await allSections.count();
          for (let i = 0; i < count; i++) {
            const id = await allSections.nth(i).getAttribute('id');
            if (!id) {
              const prevId = i > 0 ? await allSections.nth(i - 1).getAttribute('id') : null;
              if (prevId === 'testimonials') {
                box = await allSections.nth(i).boundingBox();
                break;
              }
            }
          }
        }
      } else {
        const el = page.locator(sec.selector).first();
        box = await el.boundingBox();
      }

      // Get H2 top if section has one
      if (box && sec.name !== 'Hero' && sec.name !== 'TrustBar' && sec.name !== 'Interstitial' && sec.name !== 'Footer') {
        try {
          const h2 = page.locator(`${sec.name === 'TrustBar' ? '#hero + div' : sec.selector} h2`).first();
          const h2Box = await h2.boundingBox();
          if (h2Box) h2Top = h2Box.y;
        } catch { /* no h2 */ }
      }
    } catch (e) {
      console.log(`[${viewportLabel}] Could not find ${sec.name}: ${e}`);
    }

    sectionBoxes.push({ name: sec.name, box, h2Top });
  }

  // Calculate gaps between consecutive sections
  for (let i = 0; i < sectionBoxes.length - 1; i++) {
    const a = sectionBoxes[i];
    const b = sectionBoxes[i + 1];

    if (!a.box || !b.box) {
      console.log(`[${viewportLabel}] Skipping ${a.name} → ${b.name}: missing bounding box`);
      continue;
    }

    const sectionABottom = Math.round(a.box.y + a.box.height);
    const sectionBTop = Math.round(b.box.y);
    const gapSectionToSection = sectionBTop - sectionABottom;

    let gapSectionToH2: number | null = null;
    if (b.h2Top !== null) {
      gapSectionToH2 = Math.round(b.h2Top) - sectionABottom;
    }

    measurements.push({
      from: a.name,
      to: b.name,
      sectionABottom,
      sectionBTop,
      sectionBH2Top: b.h2Top ? Math.round(b.h2Top) : null,
      gapSectionToSection,
      gapSectionToH2,
    });
  }

  return measurements;
}

function printTable(label: string, measurements: Measurement[]) {
  console.log(`\n${'='.repeat(90)}`);
  console.log(`  ${label}`);
  console.log(`${'='.repeat(90)}`);
  console.log(
    'From'.padEnd(18) +
    'To'.padEnd(18) +
    'A Bottom'.padEnd(10) +
    'B Top'.padEnd(10) +
    'B H2 Top'.padEnd(10) +
    'Gap(sec)'.padEnd(10) +
    'Gap(H2)'.padEnd(10)
  );
  console.log('-'.repeat(86));
  for (const m of measurements) {
    console.log(
      m.from.padEnd(18) +
      m.to.padEnd(18) +
      String(m.sectionABottom).padEnd(10) +
      String(m.sectionBTop).padEnd(10) +
      String(m.sectionBH2Top ?? 'N/A').padEnd(10) +
      String(m.gapSectionToSection).padEnd(10) +
      String(m.gapSectionToH2 ?? 'N/A').padEnd(10)
    );
  }
  console.log('');
}

test.describe('Spacing Audit — Measurements', () => {
  test('Measure section gaps at 1440px and 375px', async ({ browser }) => {
    const results: Record<string, Measurement[]> = {};

    // Desktop 1440px
    const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const desktopPage = await desktopCtx.newPage();
    await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(3000);
    results.desktop = await measurePage(desktopPage, 'Desktop 1440px');
    printTable('DESKTOP (1440px)', results.desktop);
    await desktopCtx.close();

    // Mobile 375px
    const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const mobilePage = await mobileCtx.newPage();
    await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(3000);
    results.mobile = await measurePage(mobilePage, 'Mobile 375px');
    printTable('MOBILE (375px)', results.mobile);
    await mobileCtx.close();

    // Save to JSON
    const outputPath = path.join(screenshotDir, 'spacing-measurements.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\nMeasurements saved to: ${outputPath}`);
  });
});
