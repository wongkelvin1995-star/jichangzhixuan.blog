import fs from 'node:fs';

const brands = JSON.parse(fs.readFileSync('src/data/brands.json', 'utf8'));
const plans = JSON.parse(fs.readFileSync('src/data/plans.json', 'utf8'));
const options = JSON.parse(fs.readFileSync('src/data/options.json', 'utf8'));
const rankings = JSON.parse(fs.readFileSync('src/data/rankings.json', 'utf8'));

let errors = [];
let warnings = [];

// Check total counts
if (brands.length !== 18) errors.push(`Brands count is ${brands.length}, expected 18`);
if (plans.length !== 146) errors.push(`Plans count is ${plans.length}, expected 146`);
if (options.length !== 261) errors.push(`Options count is ${options.length}, expected 261`);

// Check rankings order
const expectedRanks = [
  { slug: 'lingdongyun', rank: 1, displayOrder: 1 },
  { slug: 'twilight', rank: 2, displayOrder: 2 },
  { slug: 'breezenet', rank: 3, displayOrder: 3 },
  { slug: 'feimaoyun', rank: 4, displayOrder: 4 },
  { slug: 'dalaoyun', rank: 5, displayOrder: 5 },
  { slug: 'flyv', rank: 6, displayOrder: 6 },
  { slug: 'wavenet', rank: 6, displayOrder: 7 },
  { slug: 'invisible', rank: 7, displayOrder: 8 },
  { slug: 'tiziyun', rank: 8, displayOrder: 9 },
  { slug: 'wuyou', rank: 9, displayOrder: 10 },
  { slug: 'firefly', rank: 10, displayOrder: 11 },
  { slug: 'quanqiuyun', rank: 11, displayOrder: 12 },
  { slug: 'v2yun', rank: 12, displayOrder: 13 },
  { slug: 'lingmao', rank: 13, displayOrder: 14 },
  { slug: 'flashleap', rank: 14, displayOrder: 15 },
  { slug: 'kuajieyun', rank: 15, displayOrder: 16 },
  { slug: 'sogoyun', rank: 16, displayOrder: 17 },
  { slug: 'u1s1', rank: 17, displayOrder: 18 }
];

expectedRanks.forEach((exp, idx) => {
  const b = brands[idx];
  if (!b || b.slug !== exp.slug) errors.push(`Brand index ${idx} is ${b?.slug}, expected ${exp.slug}`);
  if (b.rank !== exp.rank) errors.push(`Brand ${b.slug} rank is ${b.rank}, expected ${exp.rank}`);
  if (b.displayOrder !== exp.displayOrder) errors.push(`Brand ${b.slug} displayOrder is ${b.displayOrder}, expected ${exp.displayOrder}`);
});

// Check Lingdongyun specific values
const ldy = brands.find(b => b.slug === 'lingdongyun');
if (!ldy) {
  errors.push('lingdongyun not found');
} else {
  if (ldy.purchaseUrl !== 'https://varnexa.lingdongaff.com/#/?code=VeMln3TT') {
    errors.push(`Lingdongyun purchase URL mismatch: ${ldy.purchaseUrl}`);
  }
  if (ldy.minMonthlyPrice !== 20) errors.push(`Lingdongyun min monthly price: ${ldy.minMonthlyPrice}, expected 20`);
  if (ldy.minYearlyPrice !== 99) errors.push(`Lingdongyun min yearly price: ${ldy.minYearlyPrice}, expected 99`);
}

// Check Twilight specific values
const tw = brands.find(b => b.slug === 'twilight');
if (!tw) {
  errors.push('twilight not found');
} else {
  if (tw.minMonthlyPrice !== 20) errors.push(`Twilight min monthly price: ${tw.minMonthlyPrice}, expected 20`);
  if (tw.minYearlyPrice !== 109) errors.push(`Twilight min yearly price: ${tw.minYearlyPrice}, expected 109`);
}

// Check Breezenet specific values
const bz = brands.find(b => b.slug === 'breezenet');
if (!bz) {
  errors.push('breezenet not found');
} else {
  if (bz.minMonthlyPrice !== 25) errors.push(`Breezenet min monthly price: ${bz.minMonthlyPrice}, expected 25`);
  if (bz.minYearlyPrice !== 137) errors.push(`Breezenet min yearly price: ${bz.minYearlyPrice}, expected 137`);
}

// Check Dalaoyun URL
const dly = brands.find(b => b.slug === 'dalaoyun');
if (!dly) {
  errors.push('dalaoyun not found');
} else {
  if (dly.purchaseUrl !== 'https://vip.dalaocloud.com/') {
    errors.push(`Dalaoyun purchase URL mismatch: ${dly.purchaseUrl}`);
  }
}

// Check Lingmao quarterly small plan
const lmSmall = options.find(o => o.brandId === 'lingmao' && o.planName.includes('季付 Small') && o.totalPrice === 65);
if (!lmSmall) {
  errors.push('Lingmao 季付 Small (¥65) not found');
}

// Check Kuajieyun does not have one-time packages
const kjOnetime = options.filter(o => o.brandId === 'kuajieyun' && o.planType === 'onetime');
if (kjOnetime.length > 0) {
  errors.push(`Kuajieyun has unexpected onetime packages: ${kjOnetime.length}`);
}

console.log('=== DATA VALIDATION REPORT ===');
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);
if (errors.length > 0) {
  errors.forEach(e => console.error(`  [ERROR] ${e}`));
  process.exit(1);
} else {
  console.log('ALL DATA INTEGRITY CHECKS PASSED PERFECTLY!');
}
