import puppeteer from 'puppeteer-core';

async function test() {
  const b = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  const page = await b.newPage();
  await page.setViewport({ width: 1000, height: 700 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background: #130B07; display: flex; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }
        .bg-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(223, 155, 53, 0.25) 0%, rgba(20, 11, 6, 0) 70%);
        }
        .hero-img {
          position: relative;
          max-width: 650px;
          height: auto;
          -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 50%, transparent 88%);
          mask-image: radial-gradient(ellipse at 50% 50%, black 50%, transparent 88%);
        }
      </style>
    </head>
    <body>
      <div class="bg-glow"></div>
      <img class="hero-img" src="file:///d:/Swan%20Cafe/public/assets/images/hero-swan-splash.jpg" />
    </body>
    </html>
  `);
  await page.screenshot({ path: 'C:/Users/ZC/.gemini/antigravity/brain/a2678539-48b4-4dac-ae90-2616ab063156/test-radial-mask.png' });
  await b.close();
  console.log('Saved test-radial-mask.png');
}

test();
