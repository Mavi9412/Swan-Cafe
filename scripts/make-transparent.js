import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function processImage() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  // Read base64 of the image
  const imgBuffer = fs.readFileSync('d:\\Swan Cafe\\public\\assets\\images\\hero-swan-splash.jpg');
  const base64Img = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`;

  const pngBase64 = await page.evaluate(async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Chroma key out dark black background with smooth feathering
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = Math.max(r, g, b);

          // Threshold for black background
          if (brightness <= 15) {
            data[i + 3] = 0; // completely transparent
          } else if (brightness < 45) {
            // Smooth feathering
            const factor = (brightness - 15) / 30;
            data[i + 3] = Math.round(data[i + 3] * factor);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = dataUrl;
    });
  }, base64Img);

  const base64Data = pngBase64.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('d:\\Swan Cafe\\public\\assets\\images\\hero-swan-splash.png', Buffer.from(base64Data, 'base64'));
  console.log('Successfully generated hero-swan-splash.png!');

  await browser.close();
}

processImage().catch(console.error);
