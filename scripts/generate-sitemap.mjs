import fs from 'node:fs';
import path from 'node:path';

const HOST = 'https://jichangzhixuan.blog';
const distDir = path.resolve('dist');

function getAllRoutes(dir, baseRoute = '') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name !== '_astro') {
        routes = routes.concat(getAllRoutes(path.join(dir, entry.name), `${baseRoute}/${entry.name}`));
      }
    } else if (entry.name === 'index.html') {
      const formattedRoute = baseRoute === '' ? '/' : `${baseRoute}/`;
      routes.push(formattedRoute);
    }
  }
  return routes;
}

const routes = getAllRoutes(distDir);
console.log(`Generating sitemap for ${routes.length} routes...`);

function getPriority(route) {
  if (route === '/') return '1.0';
  if (route === '/smart-match/' || route === '/airports/' || route === '/ranking/' || route === '/compare/') return '0.9';
  if (route.startsWith('/airports/')) return '0.85';
  if (route.startsWith('/tools/')) return '0.8';
  if (route.startsWith('/articles/')) return '0.75';
  if (route === '/about/' || route === '/methodology/' || route === '/privacy/' || route === '/terms/') return '0.5';
  return '0.7';
}

const today = '2026-11-24';

const xmlItems = routes.map(route => `  <url>
    <loc>${HOST}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${getPriority(route)}</priority>
  </url>`).join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;

// Write to both dist/sitemap.xml and public/sitemap.xml
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemapXml, 'utf8');

console.log(`✓ Sitemap successfully generated with ${routes.length} URLs!`);
