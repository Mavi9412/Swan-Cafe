import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const baseDir = path.resolve('public/assets/images');

function getFiles(dir, exts = ['.png', '.jpg', '.jpeg']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(full, exts));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (exts.includes(ext)) {
        results.push(full);
      }
    }
  }
  return results;
}

const allImages = getFiles(baseDir);
console.log(`Found ${allImages.length} images to optimize.`);

let totalOldSize = 0;
let totalNewSize = 0;

for (const imgPath of allImages) {
  const ext = path.extname(imgPath);
  const webpPath = imgPath.slice(0, -ext.length) + '.webp';
  const oldSize = fs.statSync(imgPath).size;
  totalOldSize += oldSize;

  const isProduct = imgPath.includes('products');
  const maxW = isProduct ? 500 : 1200;

  // Run ffmpeg
  const cmd = `ffmpeg -y -i "${imgPath}" -vf "scale='min(${maxW},iw)':-1" -c:v libwebp -quality 82 "${webpPath}"`;
  try {
    execSync(cmd, { stdio: 'ignore' });
    const newSize = fs.statSync(webpPath).size;
    totalNewSize += newSize;
    console.log(
      `✓ ${path.relative(baseDir, imgPath)}: ${(oldSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB (-${(
        (1 - newSize / oldSize) *
        100
      ).toFixed(0)}%)`
    );
  } catch (err) {
    console.error(`Failed on ${imgPath}:`, err.message);
  }
}

console.log('----------------------------------------------------');
console.log(`Initial total size: ${(totalOldSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Optimized total size: ${(totalNewSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(
  `Overall saving: ${(totalOldSize / (1024 * 1024) - totalNewSize / (1024 * 1024)).toFixed(2)} MB (-${(
    (1 - totalNewSize / totalOldSize) *
    100
  ).toFixed(0)}%)`
);
