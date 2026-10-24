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
  // iPad Viewport: 768 x 1024
  await page.setViewport({ width: 768, height: 1024 });

  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\tablet-home-hero.png',
    fullPage: false
  });

  // Check horizontal overflow
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`Tablet scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}. Has overflow: ${scrollWidth > clientWidth}`);

  await browser.close();
  console.log('Tablet tests completed.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
