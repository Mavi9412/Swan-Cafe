import puppeteer from 'puppeteer-core';
import fs from 'fs';

const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];

let executablePath = edgePaths.find(p => fs.existsSync(p));

async function run() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // Mobile viewport: 390 x 844 (iPhone 12/13/14)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  console.log('Testing Mobile Viewport (390x844)...');

  // 1. Home Page Hero & Curated
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\mobile-home-hero.png',
    fullPage: false
  });

  // Scroll to Curated Coffee
  await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Curated Coffee Selection'));
    if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollBy(0, 750);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\mobile-home-curated.png',
    fullPage: false
  });

  // Scroll to Signature items
  await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Signature Favorites'));
    if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollBy(0, 1600);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\mobile-home-signatures.png',
    fullPage: false
  });

  // 2. Menu Page
  await page.evaluate(() => {
    const menuBtn = Array.from(document.querySelectorAll('button, a')).find(b => b.textContent && b.textContent.includes('Order Online') || b.textContent && b.textContent.includes('Explore Menu'));
    if (menuBtn) menuBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\mobile-menu-page.png',
    fullPage: false
  });

  // Check horizontal overflow on window
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`Mobile Menu scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}. Has horizontal overflow: ${scrollWidth > clientWidth}`);

  await browser.close();
  console.log('Mobile tests completed.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
