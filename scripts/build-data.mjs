import fs from 'node:fs';
import path from 'node:path';

const sourceDir = path.resolve('source-data/airports-md');

// Editorial configuration matching prompt specifications
const BRAND_CONFIGS = [
  {
    rank: 1,
    displayOrder: 1,
    slug: 'lingdongyun',
    name: '灵动云',
    englishName: 'LingDongYun',
    fileKeyword: '灵动云',
    seoTitle: '灵动云机场怎么样？2026套餐价格、性价比与理性选购分析｜机场智选',
    tagline: 'IEPL/IPLC 专线与 BGP 智能调度，多档周期与私人定制服务',
    badge: '编辑推荐 TOP 01',
    isTop3: true,
  },
  {
    rank: 2,
    displayOrder: 2,
    slug: 'twilight',
    name: '暮光加速',
    englishName: 'Twilight',
    fileKeyword: '暮光加速',
    seoTitle: '暮光加速机场怎么样？套餐价格、流量与购买建议｜机场智选',
    tagline: '月付入门与轻量年付 IPLC 专线，覆盖 15+ 地区出口',
    badge: '编辑推荐 TOP 02',
    isTop3: true,
  },
  {
    rank: 3,
    displayOrder: 3,
    slug: 'breezenet',
    name: '微风网络',
    englishName: 'BreezeNet',
    fileKeyword: '微风网络',
    seoTitle: '微风网络机场怎么样？全部套餐与实际成本分析｜机场智选',
    tagline: '平价月付与全节点 1.0 倍率，主流影音流媒体与 AI 优化',
    badge: '编辑推荐 TOP 03',
    isTop3: true,
  },
  {
    rank: 4,
    displayOrder: 4,
    slug: 'feimaoyun',
    name: '飞猫云',
    englishName: 'FlyCat Cloud',
    fileKeyword: '飞猫云',
    seoTitle: '飞猫云机场介绍 - 学生年付、月付套餐及选购分析｜机场智选',
    tagline: '高性价比月付流量与学生优惠年付，覆盖亚太及欧美出口',
    badge: '高性价比精选',
    isTop3: false,
  },
  {
    rank: 5,
    displayOrder: 5,
    slug: 'dalaoyun',
    name: '大佬云',
    englishName: 'DalaoCloud',
    fileKeyword: '大佬云',
    seoTitle: '大佬云机场怎么样？套餐价格与不同预算购买指南｜机场智选',
    tagline: '低价 IEPL 专线，全节点 1.0 倍率与不限设备连接',
    badge: '低价专线精选',
    isTop3: false,
  },
  {
    rank: 6,
    displayOrder: 6,
    slug: 'flyv',
    name: 'FLYV',
    englishName: 'FlyV',
    fileKeyword: 'FlyV',
    seoTitle: 'FLYV机场介绍 - 全部套餐、付款周期及性价比分析｜机场智选',
    tagline: '并列第六推荐，弹性周期覆盖与基础提速双线布局',
    badge: '并列第 06 位',
    isTop3: false,
  },
  {
    rank: 6,
    displayOrder: 7,
    slug: 'wavenet',
    name: '浪网',
    englishName: 'WaveNet',
    fileKeyword: '浪网',
    seoTitle: '浪网机场怎么样？大流量套餐与实际使用成本｜机场智选',
    tagline: '并列第六推荐，平价月付与买断制一次性流量包设计',
    badge: '并列第 06 位',
    isTop3: false,
  },
  {
    rank: 7,
    displayOrder: 8,
    slug: 'invisible',
    name: '隐形人',
    englishName: 'Invisible Man',
    fileKeyword: '隐形人',
    seoTitle: '隐形人机场套餐价格、流量及理性选购指南｜机场智选',
    tagline: '多节点冗余备份与隐私保护机制，流媒体与 AI 解锁兼备',
    badge: '冗余容灾精选',
    isTop3: false,
  },
  {
    rank: 8,
    displayOrder: 9,
    slug: 'tiziyun',
    name: '梯子云',
    englishName: 'TiZi Cloud',
    fileKeyword: '梯子云',
    seoTitle: '梯子云机场怎么样？年付与不限时套餐成本分析｜机场智选',
    tagline: '长周期优惠年付与多档不限时流量包，多设备均衡配置',
    badge: '长周期优选',
    isTop3: false,
  },
  {
    rank: 9,
    displayOrder: 10,
    slug: 'wuyou',
    name: '无忧连接',
    englishName: 'WorryFree',
    fileKeyword: '无忧连接',
    seoTitle: '无忧连接机场介绍 - 低价年付与月付套餐对比｜机场智选',
    tagline: '低价平民化年付与弹性月付，新手低门槛入门体验',
    badge: '平民低价优选',
    isTop3: false,
  },
  {
    rank: 10,
    displayOrder: 11,
    slug: 'firefly',
    name: 'Firefly',
    englishName: 'Firefly',
    fileKeyword: 'Firefly',
    seoTitle: 'Firefly机场怎么样？年付、月付与性价比分析｜机场智选',
    tagline: '轻量化套餐与多平台配置，适合日常网页浏览与轻度办公',
    badge: '轻量实用品牌',
    isTop3: false,
  },
  {
    rank: 11,
    displayOrder: 12,
    slug: 'quanqiuyun',
    name: '全球云',
    englishName: 'QuanQiu Cloud',
    fileKeyword: '全球云',
    seoTitle: '全球云机场介绍 - 套餐价格、流量及购买建议｜机场智选',
    tagline: '国际多地区节点覆盖，多设备使用与中高档流量梯次',
    badge: '国际节点覆盖',
    isTop3: false,
  },
  {
    rank: 12,
    displayOrder: 13,
    slug: 'v2yun',
    name: '唯兔云',
    englishName: 'V2Yun',
    fileKeyword: '唯兔云',
    seoTitle: '唯兔云V2云怎么样？低预算套餐及实际成本分析｜机场智选',
    tagline: '百元以内低价年付与多档轻量套餐，低预算备用连接',
    badge: '低预算备选',
    isTop3: false,
  },
  {
    rank: 13,
    displayOrder: 14,
    slug: 'lingmao',
    name: '灵猫网络',
    englishName: 'LingMao Net',
    fileKeyword: '灵猫网络',
    seoTitle: '灵猫网络机场介绍 - 月付、季付与年付套餐对比｜机场智选',
    tagline: '支持新增季付 Small 套餐与不限时买断流量包，灵活周期',
    badge: '灵活计费精选',
    isTop3: false,
  },
  {
    rank: 14,
    displayOrder: 15,
    slug: 'flashleap',
    name: '闪跃 FlashLeap',
    englishName: 'FlashLeap',
    fileKeyword: '闪跃',
    seoTitle: '闪跃FlashLeap机场怎么样？全部套餐及购买指南｜机场智选',
    tagline: '高档年付与大容量月度梯次，含一次性流量包规格说明',
    badge: '大容量梯次',
    isTop3: false,
  },
  {
    rank: 15,
    displayOrder: 16,
    slug: 'kuajieyun',
    name: '跨界云',
    englishName: 'KuaJie Cloud',
    fileKeyword: '跨界云',
    seoTitle: '跨界云机场介绍 - 大流量套餐与性价比分析｜机场智选',
    tagline: '大流量月付与百元年付版，最高提供 1.8TB/月海量吞吐',
    badge: '海量吞吐优选',
    isTop3: false,
  },
  {
    rank: 16,
    displayOrder: 17,
    slug: 'sogoyun',
    name: 'Sogo云',
    englishName: 'Sogo Cloud',
    fileKeyword: 'Sogo云',
    seoTitle: 'Sogo云机场怎么样？年付与不限时流量选购指南｜机场智选',
    tagline: '多档长周期年付与一次性流量包，适配多客户端配置',
    badge: '长效实用品牌',
    isTop3: false,
  },
  {
    rank: 17,
    displayOrder: 18,
    slug: 'u1s1',
    name: 'U1S1（有一说一）',
    englishName: 'U1S1',
    fileKeyword: 'U1S1',
    seoTitle: 'U1S1有一说一机场介绍 - 套餐价格与理性购买建议｜机场智选',
    tagline: '透明化套餐梯次与平价轻量月付，适合预算敏感型用户',
    badge: '亲民透明品牌',
    isTop3: false,
  }
];

function parseNumericPrice(str) {
  if (!str) return null;
  const cleaned = str.replace(/[¥,，/月/年/季/半年]/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function parseTrafficInGB(str) {
  if (!str) return null;
  const s = str.toUpperCase();
  if (s.includes('TB')) {
    const m = s.match(/([\d.]+)\s*TB/);
    if (m) return parseFloat(m[1]) * 1024;
  }
  const m = s.match(/([\d.]+)\s*GB/);
  if (m) return parseFloat(m[1]);
  return null;
}

function extractSectionContent(content, secNum, nextSecNum) {
  const pattern = new RegExp(`## ${secNum}\\.[\\s\\S]*?(?=## ${nextSecNum}\\.|$)`);
  const match = content.match(pattern);
  return match ? match[0].trim() : '';
}

function extractKeyValue(sectionText, key) {
  const pattern = new RegExp(`-[\\s]*${key}[：:](.*)`);
  const match = sectionText.match(pattern);
  return match ? match[1].trim() : '';
}

function parseMarkdownTable(tableText) {
  const lines = tableText.split('\n').map(l => l.trim()).filter(l => l.startsWith('|') && l.endsWith('|'));
  if (lines.length < 2) return [];
  const headers = lines[0].split('|').slice(1, -1).map(c => c.trim());
  const rows = [];
  for (let i = 2; i < lines.length; i++) {
    const cells = lines[i].split('|').slice(1, -1).map(c => c.trim());
    if (cells.length === headers.length) {
      const rowObj = {};
      headers.forEach((h, idx) => {
        rowObj[h] = cells[idx];
      });
      rows.push(rowObj);
    }
  }
  return rows;
}

const allBrands = [];
const allPlans = [];
const allOptions = [];

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.md'));

for (const config of BRAND_CONFIGS) {
  const matchedFile = files.find(f => f.includes(config.fileKeyword));
  if (!matchedFile) {
    console.error(`FATAL: File matching ${config.fileKeyword} not found!`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(path.join(sourceDir, matchedFile), 'utf8');

  // Parse Section 01
  const s01 = extractSectionContent(rawContent, '01', '02');
  const chineseName = extractKeyValue(s01, '中文名称') || config.name;
  const englishName = extractKeyValue(s01, '英文名称') || config.englishName;
  const aliases = extractKeyValue(s01, '品牌别名');

  // Parse Section 02
  const s02 = extractSectionContent(rawContent, '02', '03');
  const introduction = extractKeyValue(s02, '品牌简介');
  const coreServices = extractKeyValue(s02, '核心服务');
  const positioning = extractKeyValue(s02, '品牌定位');
  const targetAudience = extractKeyValue(s02, '主要服务人群');

  // Parse Section 03
  const s03 = extractSectionContent(rawContent, '03', '04');
  let officialUrl = extractKeyValue(s03, '官方网站');
  // clean up extra note
  const offMatch = officialUrl.match(/(https?:\/\/[^\s（(]+)/);
  if (offMatch) officialUrl = offMatch[1];
  
  let purchaseUrl = extractKeyValue(s03, '本站专属 AFF 购买链接') || extractKeyValue(s03, '购买链接');
  const affMatch = purchaseUrl.match(/(https?:\/\/[^\s（(]+)/);
  if (affMatch) {
    purchaseUrl = affMatch[1];
  } else {
    // If no AFF url provided (like 大佬云)
    purchaseUrl = officialUrl;
  }

  // Parse Section 04: Plans and Prices
  const s04 = extractSectionContent(rawContent, '04', '05');
  const priceRecordedAt = extractKeyValue(s04, '套餐价格记录日期');
  const sourceLevel = extractKeyValue(s04, '来源层级');
  const dataConflict = extractKeyValue(s04, '资料冲突');

  // Extract regular plans table
  const regTableMatch = s04.match(/\| 套餐名称 \|[\s\S]*?(?=###|$)/);
  const regularRows = regTableMatch ? parseMarkdownTable(regTableMatch[0]) : [];

  // Extract one-time plans table
  const onetimeMatch = s04.match(/### 不限时及一次性流量套餐[\s\S]*?(?=###|$)/);
  const onetimeRows = onetimeMatch ? parseMarkdownTable(onetimeMatch[0]) : [];

  // Extract custom plans table
  const customMatch = s04.match(/### 独享及私人定制套餐[\s\S]*?(?=- 价格币种|$)/);
  const customRows = customMatch ? parseMarkdownTable(customMatch[0]) : [];

  // Parse Section 05: Validity & Reset
  const s05 = extractSectionContent(rawContent, '05', '06');
  // Parse Section 06: Reset & Multipliers
  const s06 = extractSectionContent(rawContent, '06', '07');
  const resetRule = extractKeyValue(s06, '流量重置日期') || '按账单周期/购买日重置';
  const trafficCarryOver = extractKeyValue(s06, '流量是否可以结转');
  const trafficMultiplier = extractKeyValue(s06, '是否存在流量倍率') || extractKeyValue(s06, '不同节点倍率') || '以官方节点列表倍率为准';

  // Parse Section 07: Regions
  const s07 = extractSectionContent(rawContent, '07', '08');
  const regionLines = s07.split('\n').filter(l => l.trim().startsWith('-'));
  const regions = regionLines.map(l => {
    const parts = l.replace(/^-\s*/, '').split('：');
    return {
      name: parts[0]?.trim() || '',
      note: parts[1]?.trim() || ''
    };
  }).filter(r => r.name);

  // Parse Section 08: Networks & Protocols
  const s08 = extractSectionContent(rawContent, '08', '09');
  const networkTypes = [];
  if (s08.includes('BGP')) networkTypes.push('BGP智能调度');
  if (s08.includes('IPLC')) networkTypes.push('IPLC专线');
  if (s08.includes('IEPL')) networkTypes.push('IEPL专线');
  if (networkTypes.length === 0) networkTypes.push('优质公网/混合线路');

  const protocols = [];
  if (s08.includes('Shadowsocks') || s08.includes('SS')) protocols.push('Shadowsocks');
  if (s08.includes('VLESS')) protocols.push('VLESS');
  if (s08.includes('VMess')) protocols.push('VMess');
  if (s08.includes('Trojan')) protocols.push('Trojan');
  if (s08.includes('Hysteria')) protocols.push('Hysteria');
  if (protocols.length === 0) protocols.push('以官方配置为准');

  // Parse Section 09: Clients & Compatibility
  const s09 = extractSectionContent(rawContent, '09', '10');
  const clientRows = parseMarkdownTable(s09);

  // Parse Section 10: Third-Party Subscription Policy
  const s10 = extractSectionContent(rawContent, '10', '11');
  const subPolicy = {
    provided: extractKeyValue(s10, '是否提供第三方订阅链接'),
    needApply: extractKeyValue(s10, '是否需要联系客服申请'),
    supportedPlans: extractKeyValue(s10, '哪些套餐支持'),
    minAmount: extractKeyValue(s10, '最低购买金额要求'),
    mustOfficialClient: extractKeyValue(s10, '是否必须使用官方客户端'),
    restrictions: extractKeyValue(s10, '特殊使用限制'),
    recordedDate: extractKeyValue(s10, '政策记录日期')
  };

  // Parse Section 11: AI Support
  const s11 = extractSectionContent(rawContent, '11', '12');
  const aiRows = parseMarkdownTable(s11);

  // Parse Section 12: Streaming Support
  const s12 = extractSectionContent(rawContent, '12', '13');
  const streamingRows = parseMarkdownTable(s12);

  // Parse Section 13: Device Limits
  const s13 = extractSectionContent(rawContent, '13', '14');
  const deviceLimits = {
    maxOnline: extractKeyValue(s13, '最大同时在线设备数量') || '未严格限制或以官方说明为准',
    loginLimit: extractKeyValue(s13, '是否限制登录设备'),
    familyShare: extractKeyValue(s13, '是否允许家庭共享'),
    speedLimit: extractKeyValue(s13, '是否限制连接速度'),
    p2pAllowed: extractKeyValue(s13, '是否限制 P2P 下载'),
    campusSupport: extractKeyValue(s13, '是否支持校园网'),
    publicWifiSupport: extractKeyValue(s13, '是否支持公共 Wi-Fi'),
    otherLimits: extractKeyValue(s13, '其他使用限制')
  };

  // Parse Section 14: Establishment
  const s14 = extractSectionContent(rawContent, '14', '15');
  const establishedTime = extractKeyValue(s14, '品牌成立时间') || '品牌历史资料可追溯';

  // Parse Section 15: Advantages
  const s15 = extractSectionContent(rawContent, '15', '16');
  const advantages = s15.split('\n')
    .filter(l => l.match(/^\d+\.\s*/))
    .map(l => l.replace(/^\d+\.\s*/, '').trim());

  // Parse Section 16: Limitations
  const s16 = extractSectionContent(rawContent, '16', '17');
  const limitations = s16.split('\n')
    .filter(l => l.match(/^\d+\.\s*/))
    .map(l => l.replace(/^\d+\.\s*/, '').trim());

  // Parse Section 17: Suitable Users
  const s17 = extractSectionContent(rawContent, '17', '18');
  const suitableUsers = s17.split('\n')
    .filter(l => l.trim().startsWith('-'))
    .map(l => l.replace(/^-\s*/, '').trim());

  // Parse Section 18: Unsuitable Users
  const s18 = extractSectionContent(rawContent, '18', '19');
  const unsuitableUsers = s18.split('\n')
    .filter(l => l.match(/^\d+\.\s*/))
    .map(l => l.replace(/^\d+\.\s*/, '').trim());

  // Parse Section 19: Refund & Upgrade
  const s19 = extractSectionContent(rawContent, '19', '20');
  const refundPolicy = {
    supportRefund: extractKeyValue(s19, '是否支持退款') || '未取得统一无条件退款承诺，需联系客服',
    conditions: extractKeyValue(s19, '退款申请条件'),
    supportChange: extractKeyValue(s19, '是否支持更换套餐'),
    supportUpgrade: extractKeyValue(s19, '是否支持补差价升级'),
    supportTrial: extractKeyValue(s19, '是否支持免费试用'),
    otherAfterSales: extractKeyValue(s19, '其他售后限制')
  };

  // Parse Section 20: Coupons
  const s20 = extractSectionContent(rawContent, '20', '21');
  const couponRows = parseMarkdownTable(s20);

  // Parse Section 21: Support Channels
  const s21 = extractSectionContent(rawContent, '21', '22');
  const supportChannels = {
    onlineSupport: extractKeyValue(s21, '在线客服'),
    ticketSystem: extractKeyValue(s21, '工单系统'),
    telegram: extractKeyValue(s21, 'Telegram'),
    email: extractKeyValue(s21, '邮件客服'),
    hours: extractKeyValue(s21, '客服服务时间')
  };

  // Parse Section 22: Logo
  const s22 = extractSectionContent(rawContent, '22', '23');
  const brandColor = extractKeyValue(s22, '品牌主色');

  // Parse Section 23: Sources
  const s23 = extractSectionContent(rawContent, '23', '');
  const sources = {
    official: extractKeyValue(s23, '官方资料来源'),
    pricing: extractKeyValue(s23, '套餐价格来源'),
    clientPolicy: extractKeyValue(s23, '客户端政策来源'),
    recordedDate: extractKeyValue(s23, '资料收集日期') || '2026-11-24',
    updatedDate: extractKeyValue(s23, '最后更新日期') || '2026-11-24'
  };

  // Now process all plans
  const brandPlans = [];
  let planIndex = 1;

  // Process regular plans
  for (const row of regularRows) {
    const planName = row['套餐名称'];
    if (!planName || planName.includes('公开资料未列') || planName.includes('未找到可逐项') || planName.includes('未列独立套餐')) {
      continue;
    }

    const trafficStr = row['每月流量'] || '';
    const monthlyTrafficGB = parseTrafficInGB(trafficStr);

    const periods = [
      { name: '月付', months: 1, key: '月付' },
      { name: '季付', months: 3, key: '季付' },
      { name: '半年付', months: 6, key: '半年付' },
      { name: '年付', months: 12, key: '年付' },
      { name: '两年付', months: 24, key: '两年付' },
      { name: '三年付', months: 36, key: '三年付' },
    ];

    const pricingOptions = [];
    for (const p of periods) {
      if (row[p.key] && row[p.key] !== '—') {
        const priceNum = parseNumericPrice(row[p.key]);
        if (priceNum !== null) {
          const monthlyCost = Number((priceNum / p.months).toFixed(2));
          const unitCostPerGB = monthlyTrafficGB ? Number((monthlyCost / monthlyTrafficGB).toFixed(4)) : null;

          const optionItem = {
            optionId: `${config.slug}-p${planIndex}-${p.key}`,
            brandId: config.slug,
            brandName: config.name,
            planName: planName,
            planType: 'periodic',
            periodName: p.name,
            periodMonths: p.months,
            totalPrice: priceNum,
            rawPriceString: row[p.key],
            monthlyCost: monthlyCost,
            monthlyTrafficGB: monthlyTrafficGB,
            trafficText: trafficStr,
            unitCostPerGB: unitCostPerGB,
            recordedAt: priceRecordedAt,
            purchaseUrl: purchaseUrl
          };

          pricingOptions.push(optionItem);
          allOptions.push(optionItem);
        }
      }
    }

    if (pricingOptions.length > 0) {
      const planItem = {
        planId: `${config.slug}-plan-${planIndex++}`,
        brandId: config.slug,
        brandName: config.name,
        planName: planName,
        planType: 'periodic',
        trafficText: trafficStr,
        monthlyTrafficGB: monthlyTrafficGB,
        pricingOptions: pricingOptions,
        resetRule: resetRule,
        notes: `${config.name} ${planName}，月度额度 ${trafficStr}`
      };
      brandPlans.push(planItem);
      allPlans.push(planItem);
    }
  }

  // Process one-time plans
  for (const row of onetimeRows) {
    const planName = row['套餐名称'];
    if (!planName || planName.includes('公开资料未列') || planName.includes('未找到可逐项') || planName.includes('未列独立套餐') || planName.includes('公开资料未列独立一次性包')) {
      continue;
    }

    const priceNum = parseNumericPrice(row['购买价格']);
    const totalTrafficGB = parseTrafficInGB(row['总流量']);
    const validity = row['有效期'] || '不限时/用完为止';
    const limitNote = row['使用限制'] || '';

    if (priceNum !== null) {
      const unitCostPerGB = totalTrafficGB ? Number((priceNum / totalTrafficGB).toFixed(4)) : null;
      const optionItem = {
        optionId: `${config.slug}-p${planIndex}-onetime`,
        brandId: config.slug,
        brandName: config.name,
        planName: planName,
        planType: 'onetime',
        periodName: '一次性购买',
        periodMonths: 0, // non-monthly
        totalPrice: priceNum,
        rawPriceString: row['购买价格'],
        monthlyCost: null,
        monthlyTrafficGB: null,
        totalTrafficGB: totalTrafficGB,
        trafficText: row['总流量'],
        validity: validity,
        limitNote: limitNote,
        unitCostPerGB: unitCostPerGB,
        recordedAt: priceRecordedAt,
        purchaseUrl: purchaseUrl
      };

      allOptions.push(optionItem);

      const planItem = {
        planId: `${config.slug}-plan-${planIndex++}`,
        brandId: config.slug,
        brandName: config.name,
        planName: planName,
        planType: 'onetime',
        trafficText: row['总流量'],
        totalTrafficGB: totalTrafficGB,
        validity: validity,
        limitNote: limitNote,
        pricingOptions: [optionItem],
        resetRule: '一次性总量扣减，不按月重置',
        notes: limitNote || '不限时流量包'
      };
      brandPlans.push(planItem);
      allPlans.push(planItem);
    }
  }

  // Process custom plans
  for (const row of customRows) {
    const planName = row['套餐名称'];
    if (!planName || planName.includes('公开资料未列') || planName.includes('未找到可逐项') || planName.includes('未列独立套餐')) {
      continue;
    }

    const priceNum = parseNumericPrice(row['价格']);
    const trafficStr = row['流量'] || '';
    const monthlyTrafficGB = parseTrafficInGB(trafficStr);
    const serviceFeature = row['服务特点'] || '';

    if (priceNum !== null) {
      const monthlyCost = priceNum;
      const unitCostPerGB = monthlyTrafficGB ? Number((monthlyCost / monthlyTrafficGB).toFixed(4)) : null;

      const optionItem = {
        optionId: `${config.slug}-p${planIndex}-custom`,
        brandId: config.slug,
        brandName: config.name,
        planName: planName,
        planType: 'custom',
        periodName: '月付定制',
        periodMonths: 1,
        totalPrice: priceNum,
        rawPriceString: row['价格'],
        monthlyCost: monthlyCost,
        monthlyTrafficGB: monthlyTrafficGB,
        trafficText: trafficStr,
        serviceFeature: serviceFeature,
        unitCostPerGB: unitCostPerGB,
        recordedAt: priceRecordedAt,
        purchaseUrl: purchaseUrl
      };

      allOptions.push(optionItem);

      const planItem = {
        planId: `${config.slug}-plan-${planIndex++}`,
        brandId: config.slug,
        brandName: config.name,
        planName: planName,
        planType: 'custom',
        trafficText: trafficStr,
        monthlyTrafficGB: monthlyTrafficGB,
        serviceFeature: serviceFeature,
        pricingOptions: [optionItem],
        resetRule: '按月定制重置',
        notes: serviceFeature
      };
      brandPlans.push(planItem);
      allPlans.push(planItem);
    }
  }

  // Calculate entry prices
  let minMonthlyPrice = null;
  let minMonthlyTraffic = null;
  let minYearlyPrice = null;
  let minYearlyTraffic = null;

  for (const opt of allOptions.filter(o => o.brandId === config.slug)) {
    if (opt.periodName === '月付' || opt.periodMonths === 1) {
      if (minMonthlyPrice === null || opt.totalPrice < minMonthlyPrice) {
        minMonthlyPrice = opt.totalPrice;
        minMonthlyTraffic = opt.trafficText;
      }
    }
    if (opt.periodName === '年付' || opt.periodMonths === 12) {
      if (minYearlyPrice === null || opt.totalPrice < minYearlyPrice) {
        minYearlyPrice = opt.totalPrice;
        minYearlyTraffic = opt.trafficText;
      }
    }
  }

  const brandObj = {
    id: config.slug,
    slug: config.slug,
    rank: config.rank,
    displayOrder: config.displayOrder,
    name: chineseName,
    englishName: englishName,
    aliases: aliases,
    seoTitle: config.seoTitle,
    tagline: config.tagline,
    badge: config.badge,
    isTop3: config.isTop3,
    minMonthlyPrice: minMonthlyPrice,
    minMonthlyTraffic: minMonthlyTraffic,
    minYearlyPrice: minYearlyPrice,
    minYearlyTraffic: minYearlyTraffic,
    officialUrl: officialUrl,
    purchaseUrl: purchaseUrl,
    affiliateDisclosure: purchaseUrl === officialUrl 
      ? '该品牌未提供专属推广返利链接，使用官方公开导航入口；本站未擅自生成推荐码。'
      : '本站含有该品牌的专属推荐链接，通过该链接购买可能为本站带来一定的服务器与运营维持佣金，但不影响客观资料展示。',
    introduction: introduction,
    coreServices: coreServices,
    positioning: positioning,
    targetAudience: targetAudience,
    regions: regions,
    networkTypes: networkTypes,
    protocols: protocols,
    clients: clientRows,
    subPolicy: subPolicy,
    aiSupport: aiRows,
    streamingSupport: streamingRows,
    deviceLimits: deviceLimits,
    establishedTime: establishedTime,
    advantages: advantages,
    limitations: limitations,
    suitableUsers: suitableUsers,
    unsuitableUsers: unsuitableUsers,
    refundPolicy: refundPolicy,
    coupons: couponRows,
    supportChannels: supportChannels,
    brandColor: brandColor,
    sources: sources,
    priceRecordedAt: priceRecordedAt,
    dataConflict: dataConflict,
    plansCount: brandPlans.length,
    optionsCount: allOptions.filter(o => o.brandId === config.slug).length
  };

  allBrands.push(brandObj);
}

// Ensure output directories exist
fs.mkdirSync('src/data', { recursive: true });

// Write data files
fs.writeFileSync('src/data/brands.json', JSON.stringify(allBrands, null, 2), 'utf8');
fs.writeFileSync('src/data/plans.json', JSON.stringify(allPlans, null, 2), 'utf8');
fs.writeFileSync('src/data/options.json', JSON.stringify(allOptions, null, 2), 'utf8');

// Build rankings.json
const rankings = allBrands.map(b => ({
  rank: b.rank,
  displayOrder: b.displayOrder,
  id: b.id,
  name: b.name,
  englishName: b.englishName,
  slug: b.slug,
  badge: b.badge,
  isTop3: b.isTop3,
  tagline: b.tagline,
  minMonthlyPrice: b.minMonthlyPrice,
  minMonthlyTraffic: b.minMonthlyTraffic,
  minYearlyPrice: b.minYearlyPrice,
  minYearlyTraffic: b.minYearlyTraffic,
  purchaseUrl: b.purchaseUrl,
  networkTypes: b.networkTypes,
  protocols: b.protocols,
  plansCount: b.plansCount,
  optionsCount: b.optionsCount,
  advantages: b.advantages.slice(0, 3),
  limitations: b.limitations.slice(0, 2)
}));

fs.writeFileSync('src/data/rankings.json', JSON.stringify(rankings, null, 2), 'utf8');

console.log('=== BUILD DATA FINISHED SUCCESSFULLY ===');
console.log(`Total Brands: ${allBrands.length}`);
console.log(`Total Plans: ${allPlans.length} (Target: 146)`);
console.log(`Total Options: ${allOptions.length} (Target: 261)`);
