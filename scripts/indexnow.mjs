import fs from 'node:fs';
import path from 'node:path';

const INDEXNOW_KEY = 'f6a9b4c8d1e2f3a4b5c6d7e8f9a0b1c2';
const HOST = 'jichangzhixuan.blog';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

// Collect all html files from dist
const distDir = path.resolve('dist');
if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist. Please run npm run build first.');
  process.exit(1);
}

function getAllUrls(dir, baseRoute = '') {
  let urls = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name !== '_astro') {
        urls = urls.concat(getAllUrls(path.join(dir, entry.name), `${baseRoute}/${entry.name}`));
      }
    } else if (entry.name === 'index.html') {
      const formattedRoute = baseRoute === '' ? '/' : `${baseRoute}/`;
      urls.push(`https://${HOST}${formattedRoute}`);
    }
  }
  return urls;
}

const allUrls = getAllUrls(distDir);
console.log(`Found ${allUrls.length} static URLs in dist directory.`);

const payload = {
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: KEY_LOCATION,
  urlList: allUrls
};

// Ensure reports directory exists
fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync('reports/indexnow-payload.json', JSON.stringify(payload, null, 2), 'utf8');

const isSubmit = process.argv.includes('--submit');

if (!isSubmit) {
  console.log('\n=== INDEXNOW DRY RUN (TEST MODE) ===');
  console.log(`Host: ${HOST}`);
  console.log(`Key: ${INDEXNOW_KEY}`);
  console.log(`KeyLocation: ${KEY_LOCATION}`);
  console.log(`Payload saved to: reports/indexnow-payload.json (${allUrls.length} URLs)`);
  console.log('\nTo submit to Bing & IndexNow official API, run: node scripts/indexnow.mjs --submit');
} else {
  console.log(`\nSubmitting ${allUrls.length} URLs to IndexNow API (https://api.indexnow.org/indexnow)...`);
  
  async function submit() {
    try {
      const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });
      
      const logEntry = `[${new Date().toISOString()}] Status: ${res.status} (${res.statusText})\nSubmitted ${allUrls.length} URLs\n`;
      fs.appendFileSync('reports/indexnow-submission.log', logEntry, 'utf8');
      
      console.log(`Response Status: ${res.status} ${res.statusText}`);
      if (res.status === 200 || res.status === 202) {
        console.log('✓ IndexNow submission successfully accepted!');
      } else {
        console.log(`Note: Response status ${res.status}. Detailed response logged.`);
      }
    } catch (err) {
      console.error('IndexNow network error:', err.message);
      fs.appendFileSync('reports/indexnow-submission.log', `[${new Date().toISOString()}] ERROR: ${err.message}\n`, 'utf8');
    }
  }

  submit();
}
