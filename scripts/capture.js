import puppeteer from 'puppeteer-core';

async function run() {
  console.log('Launching browser with Chrome...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Desktop Home
  console.log('Capturing Desktop Home...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot-desktop-home.png', fullPage: false });

  // 2. Mobile Home
  console.log('Capturing Mobile Home...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot-mobile-home.png', fullPage: false });

  // 3. Desktop Menu
  console.log('Capturing Desktop Menu...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const menuBtn = buttons.find(b => b.textContent && b.textContent.includes('Menu & Ordering'));
    if (menuBtn) menuBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshot-desktop-menu.png', fullPage: false });

  // 4. Cart Drawer
  console.log('Opening Cart...');
  await page.evaluate(() => {
    const addBtns = Array.from(document.querySelectorAll('button'));
    const addBtn = addBtns.find(b => b.textContent && b.textContent.includes('Add to Cart'));
    if (addBtn) addBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshot-cart.png', fullPage: false });

  // 5. Checkout
  console.log('Navigating to Checkout...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const checkoutBtn = btns.find(b => b.textContent && b.textContent.includes('Proceed to Checkout'));
    if (checkoutBtn) checkoutBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshot-checkout.png', fullPage: false });

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
