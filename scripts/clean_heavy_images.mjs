import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('public/assets/images');
const keepList = ['logo.png', 'logo-transparent.png', 'mavitech-logo.png'];

function cleanOldImages(dir) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      cleanOldImages(full);
    } else {
      const ext = path.extname(file).toLowerCase();
      if ((ext === '.png' || ext === '.jpg' || ext === '.jpeg') && !keepList.includes(file)) {
        const webpFile = full.slice(0, -ext.length) + '.webp';
        if (fs.existsSync(webpFile)) {
          fs.unlinkSync(full);
          console.log(`Deleted heavy source: ${file}`);
        }
      }
    }
  }
}

cleanOldImages(baseDir);
console.log('Cleanup finished.');
