import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const distDir = path.resolve('dist');

function getAllHtmlFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name !== '_astro') {
        files = files.concat(getAllHtmlFiles(path.join(dir, entry.name)));
      }
    } else if (entry.name.endsWith('.html')) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`Checking internal links across ${htmlFiles.length} HTML files...`);

// Build a set of all valid routes generated
const validRoutes = new Set();
for (const f of htmlFiles) {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  if (rel === 'index.html') {
    validRoutes.add('/');
  } else if (rel.endsWith('/index.html')) {
    validRoutes.add('/' + rel.replace(/\/index\.html$/, '/'));
  } else {
    validRoutes.add('/' + rel);
  }
}

// Add static assets in dist
const staticAssets = fs.readdirSync(distDir);
staticAssets.forEach(a => validRoutes.add('/' + a));
if (fs.existsSync(path.join(distDir, 'images'))) {
  fs.readdirSync(path.join(distDir, 'images')).forEach(a => validRoutes.add('/images/' + a));
}
if (fs.existsSync(path.join(distDir, 'og'))) {
  fs.readdirSync(path.join(distDir, 'og')).forEach(a => validRoutes.add('/og/' + a));
}

let brokenLinks = [];
let totalLinksChecked = 0;

for (const filePath of htmlFiles) {
  const relPath = path.relative(distDir, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');
  const root = parse(html);

  const aTags = root.querySelectorAll('a');
  for (const a of aTags) {
    const href = a.getAttribute('href');
    if (!href) continue;

    // Ignore anchors, external links, mailto, tel, javascript
    if (href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      continue;
    }

    totalLinksChecked++;
    let cleanPath = href.split('?')[0].split('#')[0];
    if (!cleanPath) cleanPath = '/';

    // Normalize path
    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }

    if (!validRoutes.has(cleanPath)) {
      brokenLinks.push({
        source: relPath,
        target: href,
        cleanPath: cleanPath
      });
    }
  }
}

console.log(`Total Internal Links Checked: ${totalLinksChecked}`);
console.log(`Broken Internal Links: ${brokenLinks.length}`);

if (brokenLinks.length > 0) {
  console.error('\nBroken links found:');
  brokenLinks.forEach(b => console.error(`  In ${b.source} -> "${b.target}" (Normalized: ${b.cleanPath})`));
  process.exit(1);
} else {
  console.log('✓ ZERO BROKEN INTERNAL LINKS FOUND! All navigation and links are 100% valid.');
}
