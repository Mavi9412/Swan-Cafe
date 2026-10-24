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

const FRAMES_DIR = 'd:\\Swan Cafe\\temp_frames_mobile';
const OUTPUT_VIDEO = 'd:\\Swan Cafe\\swan_cafe_mobile_showcase.mp4';
const ARTIFACT_VIDEO = 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\swan_cafe_mobile_showcase.mp4';

if (fs.existsSync(FRAMES_DIR)) {
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
}
fs.mkdirSync(FRAMES_DIR, { recursive: true });

async function run() {
  console.log('Starting Mobile Showcase Recording (390x844)...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

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
      const progress = i / durationFrames;
      const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      const y = Math.round(currentY + diff * ease);
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await capture(1);
    }
  }

  // 1. Load Homepage
  console.log('1. Loading Mobile Homepage...');
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0' });
  await capture(25); // Hold on hero

  // 2. Smoothly scroll through Mobile Homepage
  console.log('2. Scrolling through Mobile Home...');
  await smoothScrollTo(550, 20); // Promo banner
  await capture(20);

  await smoothScrollTo(1050, 25); // Category Discovery
  await capture(20);

  await smoothScrollTo(1800, 30); // 3D Signature Favorites
  await capture(35); // Check pop-out products and hot/cold badges on mobile

  await smoothScrollTo(2700, 30); // More products & Bakery
  await capture(20);

  await smoothScrollTo(3600, 30); // Reviews & Visit Us
  await capture(25);

  // 3. Scroll back to top & test Mobile Drawer
  console.log('3. Returning to top & opening Mobile Menu...');
  await smoothScrollTo(0, 35);
  await capture(15);

  // Click Mobile Hamburger Menu
  await page.evaluate(() => {
    const hamburger = document.querySelector('button[aria-label="Toggle Navigation Menu"]');
    if (hamburger) hamburger.click();
  });
  await capture(25); // Show slide-down menu

  // Click Menu in drawer
  console.log('4. Navigating to Mobile Menu...');
  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('button'));
    const menuBtn = links.find(b => b.textContent && b.textContent.trim() === 'Menu');
    if (menuBtn) menuBtn.click();
  });
  await capture(20);

  // Scroll slightly down on Menu page
  await smoothScrollTo(280, 15);
  await capture(20);

  // Click Donuts & Sweets category
  console.log('5. Filtering Donuts on Mobile...');
  await page.evaluate(() => {
    const donutBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Donuts & Sweets'));
    if (donutBtn) donutBtn.click();
  });
  await capture(30);

  // Click Hot Filter
  console.log('6. Testing Hot filter on Mobile...');
  await page.evaluate(() => {
    const hotBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.trim().includes('Hot'));
    if (hotBtn) hotBtn.click();
  });
  await capture(30);

  // Tap first coffee to open Product Modal
  console.log('7. Opening Product Customizer Modal on Mobile...');
  await page.evaluate(() => {
    const firstH3 = document.querySelector('h3');
    if (firstH3) firstH3.click();
  });
  await capture(35);

  // Tap Add to Cart
  console.log('8. Adding to Cart & showing Mobile Cart Drawer...');
  await page.evaluate(() => {
    const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Add to Cart'));
    if (addBtn) addBtn.click();
  });
  await capture(35); // Mobile cart drawer with SWAN50 auto applied

  // Tap Proceed to Checkout
  console.log('9. Proceeding to Mobile Checkout...');
  await page.evaluate(() => {
    const checkoutBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Proceed to Checkout'));
    if (checkoutBtn) checkoutBtn.click();
  });
  await capture(40); // Mobile checkout summary

  await browser.close();

  console.log(`Captured ${frameCount} frames. Encoding Mobile MP4 video with ffmpeg...`);
  const ffmpegCmd = `ffmpeg -y -framerate 25 -i "${path.join(FRAMES_DIR, 'frame_%05d.jpg')}" -c:v libx264 -preset fast -pix_fmt yuv420p -crf 20 "${OUTPUT_VIDEO}"`;
  execSync(ffmpegCmd);

  fs.copyFileSync(OUTPUT_VIDEO, ARTIFACT_VIDEO);
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });

  const stats = fs.statSync(OUTPUT_VIDEO);
  console.log(`Mobile Video successfully created! Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Saved at: ${OUTPUT_VIDEO}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
