import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];

let executablePath = edgePaths.find(p => fs.existsSync(p));

const FRAMES_DIR = 'd:\\Swan Cafe\\temp_frames_desktop';
const OUTPUT_VIDEO = 'd:\\Swan Cafe\\swan_cafe_desktop_showcase.mp4';
const ARTIFACT_VIDEO = 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\swan_cafe_desktop_showcase.mp4';

if (fs.existsSync(FRAMES_DIR)) {
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
}
fs.mkdirSync(FRAMES_DIR, { recursive: true });

async function run() {
  console.log('Starting Desktop Showcase Recording...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  let frameCount = 0;
  async function capture(count = 1) {
    const shot = await page.screenshot({ type: 'jpeg', quality: 90 });
    for (let i = 0; i < count; i++) {
      const filename = path.join(FRAMES_DIR, `frame_${String(frameCount).padStart(5, '0')}.jpg`);
      fs.writeFileSync(filename, shot);
      frameCount++;
    }
  }

  async function smoothScrollTo(targetY, durationFrames = 25) {
    const currentY = await page.evaluate(() => window.scrollY);
    const diff = targetY - currentY;
    for (let i = 1; i <= durationFrames; i++) {
      // Ease in-out
      const progress = i / durationFrames;
      const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      const y = Math.round(currentY + diff * ease);
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await capture(1);
    }
  }

  // 1. Load Homepage
  console.log('1. Loading Homepage...');
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0' });
  await capture(30); // Hold 1.2s on hero

  // 2. Smoothly scroll down page
  console.log('2. Scrolling through HomePage sections...');
  await smoothScrollTo(600, 20); // Promo banner
  await capture(20);

  await smoothScrollTo(1150, 25); // Categories
  await capture(20);

  await smoothScrollTo(1850, 30); // 3D Signature Products
  await capture(35); // Hold to appreciate 3D pop-out and hot/cold badges

  await smoothScrollTo(2600, 25); // Fresh Bakery Craft
  await capture(20);

  await smoothScrollTo(3200, 25); // Guest Reviews
  await capture(25);

  await smoothScrollTo(3800, 25); // Visit Us & Footer
  await capture(25);

  // 3. Scroll back to top
  console.log('3. Returning to top & navigating to Menu...');
  await smoothScrollTo(0, 35);
  await capture(15);

  // Click on "Menu" in floating capsule
  await page.evaluate(() => {
    const menuBtn = Array.from(document.querySelectorAll('button, a')).find(b => b.textContent && b.textContent.trim() === 'Menu');
    if (menuBtn) menuBtn.click();
  });
  await capture(20);

  // 4. Menu Showcase
  console.log('4. Showcasing Menu page & Filters...');
  await smoothScrollTo(320, 15);
  await capture(20);

  // Click Donuts & Sweets filter tab
  await page.evaluate(() => {
    const donutBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Donuts & Sweets'));
    if (donutBtn) donutBtn.click();
  });
  await capture(30); // Show floating donuts with craft napkins

  // Click Hot filter button
  await page.evaluate(() => {
    const hotBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.trim().includes('Hot'));
    if (hotBtn) hotBtn.click();
  });
  await capture(30); // Show hot coffees with hot badges

  // Click on first coffee to open Product Customization Modal
  console.log('5. Opening Product Modal...');
  await page.evaluate(() => {
    const firstProduct = document.querySelector('h3');
    if (firstProduct) firstProduct.click();
  });
  await capture(35); // Show modal with 3D cup and customization

  // Click Add to Cart
  console.log('6. Adding to Cart & showing Drawer with SWAN50...');
  await page.evaluate(() => {
    const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Add to Cart'));
    if (addBtn) addBtn.click();
  });
  await capture(35); // Show Cart Drawer with pre-applied SWAN50

  // Click Proceed to Checkout
  console.log('7. Proceeding to Checkout...');
  await page.evaluate(() => {
    const checkoutBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Proceed to Checkout'));
    if (checkoutBtn) checkoutBtn.click();
  });
  await capture(40); // Show Checkout page summary

  await browser.close();

  console.log(`Captured ${frameCount} frames. Encoding MP4 video with ffmpeg...`);
  // Encode MP4 video with ffmpeg
  const ffmpegCmd = `ffmpeg -y -framerate 25 -i "${path.join(FRAMES_DIR, 'frame_%05d.jpg')}" -c:v libx264 -preset fast -pix_fmt yuv420p -crf 20 "${OUTPUT_VIDEO}"`;
  execSync(ffmpegCmd);

  // Copy to brain artifact directory
  fs.copyFileSync(OUTPUT_VIDEO, ARTIFACT_VIDEO);

  // Clean temp frames
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });

  const stats = fs.statSync(OUTPUT_VIDEO);
  console.log(`Desktop Video successfully created! Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Saved at: ${OUTPUT_VIDEO}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
