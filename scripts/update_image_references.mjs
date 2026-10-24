import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'src/data/menu.ts',
  'src/data/config.ts',
  'src/pages/HomePage.tsx',
  'src/pages/AboutPage.tsx',
  'src/components/Navbar.tsx',
  'src/components/PoweredByMavi.tsx',
  'src/components/ProductCard.tsx',
  'src/components/ProductModal.tsx',
];

for (const relPath of filesToUpdate) {
  const full = path.resolve(relPath);
  if (!fs.existsSync(full)) continue;
  let content = fs.readFileSync(full, 'utf8');
  
  // Replace references inside public/assets/images
  // e.g. /assets/images/...png or /assets/images/...jpg -> .webp
  const updated = content.replace(/\/assets\/images\/([^'"`\s\)\?]+)\.(png|jpg|jpeg)/gi, (match, name) => {
    // Check if webp exists
    const webpFile = path.resolve(`public/assets/images/${name}.webp`);
    if (fs.existsSync(webpFile)) {
      return `/assets/images/${name}.webp`;
    }
    return match;
  });

  if (updated !== content) {
    fs.writeFileSync(full, updated, 'utf8');
    console.log(`Updated image paths in ${relPath}`);
  }
}
