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

  // Scroll down slightly past the hero
  await page.evaluate(() => {
    window.scrollBy(0, 680);
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\screenshot-home-after-removal.png',
    fullPage: false
  });
  console.log('Saved screenshot-home-after-removal.png');

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
