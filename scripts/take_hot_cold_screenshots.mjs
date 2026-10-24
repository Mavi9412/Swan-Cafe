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
  await page.setViewport({ width: 1440, height: 950 });

  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Curated Coffees with Hot / Cold badges
  await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Curated Coffee Selection'));
    if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollBy(0, 750);
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\screenshot-curated-hot-cold.png',
    fullPage: false
  });
  console.log('Saved screenshot-curated-hot-cold.png');

  // 2. Menu Page with Hot / Cold filters and cards
  await page.evaluate(() => {
    const menuBtn = Array.from(document.querySelectorAll('button, a')).find(b => b.textContent && b.textContent.trim() === 'Menu');
    if (menuBtn) menuBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  await page.evaluate(() => {
    window.scrollBy(0, 320);
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\screenshot-menu-hot-cold.png',
    fullPage: false
  });
  console.log('Saved screenshot-menu-hot-cold.png');

  // Click on a coffee to open Product Modal and check Hot badge
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h3'));
    const coffeeHeading = headings.find(h => h.textContent && h.textContent.includes('Arabic Coffee'));
    if (coffeeHeading) coffeeHeading.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\screenshot-modal-hot-badge.png',
    fullPage: false
  });
  console.log('Saved screenshot-modal-hot-badge.png');

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
