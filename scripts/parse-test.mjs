import fs from 'node:fs';
import path from 'node:path';

const dir = 'source-data/airports-md';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

console.log(`Found ${files.length} markdown files.`);

let totalPricedPlans = 0;
let totalPurchaseOptions = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  console.log(`\n=== Analyzing: ${file} ===`);
  
  // Find section 04
  const s04Match = content.match(/## 04\. 全部套餐及价格([\s\S]*?)(?=## 05\.|$)/);
  if (!s04Match) {
    console.log('No section 04 found!');
    continue;
  }
  
  const s04 = s04Match[1];
  const lines = s04.split('\n');
  
  let currentTable = '';
  let inTable = false;
  let headers = [];
  let brandPricedPlans = 0;
  let brandOptions = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      if (!inTable) {
        inTable = true;
        headers = cells;
        continue;
      }
      if (cells.every(c => c.match(/^:?-+:?$/))) {
        // separator row
        continue;
      }
      // data row!
      const planName = cells[0];
      // Check if it is a placeholder like "公开资料未列独立定制套餐"
      if (planName.includes('公开资料未列') || planName.includes('未找到可逐项') || planName.includes('未列独立套餐')) {
        continue;
      }
      
      // Count options
      let pricedInRow = 0;
      for (let c = 1; c < cells.length; c++) {
        const val = cells[c];
        if (val.includes('¥') || (val.match(/\d+/) && (headers[c].includes('付') || headers[c].includes('价格')))) {
          pricedInRow++;
        }
      }
      
      if (pricedInRow > 0) {
        brandPricedPlans++;
        brandOptions += pricedInRow;
      }
    } else {
      inTable = false;
    }
  }
  
  console.log(`  Priced plans: ${brandPricedPlans}, Priced options: ${brandOptions}`);
  totalPricedPlans += brandPricedPlans;
  totalPurchaseOptions += brandOptions;
}

console.log(`\n================================`);
console.log(`TOTAL Priced Plans: ${totalPricedPlans}`);
console.log(`TOTAL Purchase Options: ${totalPurchaseOptions}`);
