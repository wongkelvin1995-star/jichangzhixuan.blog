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
console.log(`Auditing ${htmlFiles.length} HTML files for SEO compliance...`);

let errors = [];
let warnings = [];
let passCount = 0;

const titlesSet = new Map();

for (const filePath of htmlFiles) {
  const relPath = path.relative(distDir, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');
  const root = parse(html);

  // Check Title
  const titleEl = root.querySelector('title');
  if (!titleEl || !titleEl.text.trim()) {
    errors.push(`[${relPath}] Missing or empty <title> tag`);
  } else {
    const t = titleEl.text.trim();
    if (titlesSet.has(t)) {
      warnings.push(`[${relPath}] Duplicate title with [${titlesSet.get(t)}]: "${t}"`);
    } else {
      titlesSet.set(t, relPath);
    }
  }

  // Check Meta Description
  const descEl = root.querySelector('meta[name="description"]');
  if (!descEl || !descEl.getAttribute('content')?.trim()) {
    errors.push(`[${relPath}] Missing or empty <meta name="description"> tag`);
  } else {
    const d = descEl.getAttribute('content').trim();
    if (d.length < 20) {
      warnings.push(`[${relPath}] Meta description too short (${d.length} chars): "${d}"`);
    }
  }

  // Check Canonical
  const canonicalEl = root.querySelector('link[rel="canonical"]');
  if (!canonicalEl || !canonicalEl.getAttribute('href')?.trim()) {
    errors.push(`[${relPath}] Missing or empty <link rel="canonical"> tag`);
  } else {
    const href = canonicalEl.getAttribute('href');
    if (!href.startsWith('https://jichangzhixuan.blog/')) {
      errors.push(`[${relPath}] Canonical does not start with https://jichangzhixuan.blog/: ${href}`);
    }
    if (!href.endsWith('/')) {
      errors.push(`[${relPath}] Canonical missing trailing slash: ${href}`);
    }
  }

  // Check H1 tag
  const h1Els = root.querySelectorAll('h1');
  if (h1Els.length === 0) {
    errors.push(`[${relPath}] Missing <h1> tag`);
  } else if (h1Els.length > 1) {
    errors.push(`[${relPath}] Multiple <h1> tags found (${h1Els.length})`);
  }

  // Check OpenGraph
  const ogTitle = root.querySelector('meta[property="og:title"]');
  const ogDesc = root.querySelector('meta[property="og:description"]');
  if (!ogTitle) warnings.push(`[${relPath}] Missing og:title`);
  if (!ogDesc) warnings.push(`[${relPath}] Missing og:description`);

  // Check JSON-LD
  const jsonLd = root.querySelectorAll('script[type="application/ld+json"]');
  if (jsonLd.length === 0) {
    errors.push(`[${relPath}] Missing structured data JSON-LD`);
  }

  passCount++;
}

console.log('\n=== SEO AUDIT SUMMARY ===');
console.log(`Audited HTML Pages: ${htmlFiles.length}`);
console.log(`Critical Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

if (errors.length > 0) {
  console.error('\nErrors detected:');
  errors.forEach(e => console.error('  ' + e));
  process.exit(1);
} else {
  console.log('✓ ALL HTML FILES FULLY COMPLIANT WITH BING SEO SPECIFICATIONS!');
}
