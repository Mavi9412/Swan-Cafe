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
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // Scroll to footer
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 1000));

  // Capture footer on desktop
  const footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.screenshot({
      path: 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\screenshot-footer-mavi.png'
    });
    console.log('Saved screenshot-footer-mavi.png');
  }

  // Check link details
  const details = await page.evaluate(() => {
    const link = document.querySelector('a[href*="mavipos.tech"]');
    if (!link) return { found: false };
    const img = link.querySelector('img');
    return {
      found: true,
      href: link.getAttribute('href'),
      target: link.getAttribute('target'),
      text: link.innerText.trim(),
      imgSrc: img ? img.getAttribute('src') : null,
      imgComplete: img ? img.complete : false,
      naturalWidth: img ? img.naturalWidth : 0
    };
  });
  console.log('Footer link info:', JSON.stringify(details, null, 2));

  // Also open Cart drawer and capture
  const cartBtn = await page.$('button[aria-label="Open shopping cart"]');
  if (cartBtn) {
    // Add item first to have cart footer
    await page.evaluate(() => {
      const addBtns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent && b.textContent.includes('Add'));
      if (addBtns[0]) addBtns[0].click();
    });
    await new Promise(r => setTimeout(r, 800));
    await cartBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({
      path: 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\screenshot-cart-mavi.png'
    });
    console.log('Saved screenshot-cart-mavi.png');
  }

  // Mobile screenshot of footer
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 1000));
  const mobileFooter = await page.$('footer');
  if (mobileFooter) {
    await mobileFooter.screenshot({
      path: 'C:\\Users\\ZC\\.gemini\\antigravity\\brain\\a2678539-48b4-4dac-ae90-2616ab063156\\screenshot-footer-mavi-mobile.png'
    });
    console.log('Saved screenshot-footer-mavi-mobile.png');
  }

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
