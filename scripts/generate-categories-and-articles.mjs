import fs from 'node:fs';
import path from 'node:path';

const brands = JSON.parse(fs.readFileSync('src/data/brands.json', 'utf8'));
const options = JSON.parse(fs.readFileSync('src/data/options.json', 'utf8'));

// Define the Category Pages with their unique content, SEO metadata, and data filtering logic
const CATEGORY_PAGES = [
  {
    path: 'src/pages/recommend/index.astro',
    title: '2026机场推荐指南｜18家优质机场品牌与性价比套餐精选｜机场智选',
    description: '2026专业机场推荐核心指南。汇集灵动云、暮光加速、微风网络等18家品牌，根据预算、流量配额、专线稳定性及客户端兼容性，为您客观筛选值得考虑的机场服务。',
    breadcrumbs: [{ name: '机场推荐', url: '/recommend/' }],
    headline: '2026 机场推荐：如何理性选择适合自己的机场？',
    subline: '不盲从测速跑分，不为虚高流量买单。从真实套餐数据与实际使用场景出发，找到稳定与性价比的黄金平衡点。',
    filterFn: (opt) => opt.monthlyCost && opt.monthlyCost <= 30,
    contentSections: [
      {
        h2: '一、2026年机场选购的核心认知：告别跑分与噱头',
        p: '很多初次选购机场的用户往往容易陷入两个误区：一是被商家所谓的“千兆跑分”或“8K秒开”所吸引；二是被极低价格的年付（如二三十元年付）所诱惑。但在实际体验中，网络代理属于高动态性服务，影响体验的关键在于晚高峰（20:00-23:00）的国际出口骨干网冗余、BGP智能调度能力以及日常客服响应时效。'
      },
      {
        h2: '二、编辑推荐梯次解析',
        p: '根据全站数据库整理，灵动云以其丰富的套餐梯度（从¥20/月拂风到¥99年付穿云，以及至尊私人定制）排在首位推荐；暮光加速在¥20/月提供了120GB充足配额，且具备¥109/年的轻量IPLC专线包；微风网络则以¥25/月200GB的大容量和全节点1.0倍率受到多设备用户欢迎。用户应结合自身月度流量消耗进行对比。'
      },
      {
        h2: '三、买前三项必查指南',
        p: '1. 查客户端兼容性：特别需要使用Clash或Shadowrocket等第三方开源软件的用户，必须核查该品牌是否无门槛开放订阅直链；2. 查节点倍率：避免选购标称100GB但常用节点倍率为2x-3x导致实际流量折半的套餐；3. 优先选择月付：新用户切勿首单直接购买长期年付，先月付验证本地宽带与晚高峰连接质量。'
      }
    ]
  },
  {
    path: 'src/pages/cheap-airports/index.astro',
    title: '2026便宜机场推荐｜低预算平价机场套餐与避坑指南｜机场智选',
    description: '低预算用户的理性选购专区。收录月付20元以内及百元以内年付的高性价比便宜机场，分析低价背后的线路差异与潜在风险，杜绝廉价套路。',
    breadcrumbs: [{ name: '便宜机场', url: '/cheap-airports/' }],
    headline: '2026 便宜机场选购指南：低预算如何买到可靠服务？',
    subline: '便宜不等于劣质，但极端低价往往伴随风险。为你筛选月付¥15-¥25及百元内真正具有可用价值的平价机场。',
    filterFn: (opt) => (opt.monthlyCost && opt.monthlyCost <= 20) || (opt.periodName === '年付' && opt.totalPrice <= 120),
    contentSections: [
      {
        h2: '一、便宜机场的真实定义：拒绝“几元钱年付”骗局',
        p: '市面上存在大量售价仅需几元或十几元的年付机场，这类服务大多采用廉价的公网转发或超售严重的小VPS搭建。一旦遇到国际出口波动或严查，极易出现大面积失联甚至商家关站跑路。机场智选定义的“便宜机场”，是指在保证基础BGP中继或轻量专线可用性的前提下，月付在 ¥15-¥25 之间，或正规年付在 ¥90-¥120 之间的良性平价产品。'
      },
      {
        h2: '二、精选平价代表套餐推荐',
        p: '在大佬云中，财云·福利版月付仅需 ¥19.99 即可获得 100GB IEPL 专线流量；灵动云的灵动·拂风套餐提供 ¥20/月 100GB，且支持月付随时启停；暮光加速提供了 ¥20/月 120GB 配额。若预算有限且属于轻度使用，灵动云灵动·穿云（¥99/年，70GB/30天重置）与大佬云年付活动包（¥96/年，60GB/月）是非常稳健的百元年付选择。'
      },
      {
        h2: '三、便宜机场的使用边界与建议',
        p: '平价机场更适合日常查阅文献、网页资讯、使用 ChatGPT 等 AI 文本工具。如果您的需求是全天候 4K 蓝光流媒体或对延迟极其敏感的跨国在线游戏，建议适当提升预算关注中高阶专线。'
      }
    ]
  },
  {
    path: 'src/pages/stable-airports/index.astro',
    title: '2026稳定机场选购指南｜晚高峰不卡顿的专线机场评测｜机场智选',
    description: '追求稳定与低延迟用户的专业指南。深入解析IEPL专线、IPLC内网专线与BGP智能调度的抗干扰原理，筛选晚高峰持续稳定的优质机场。',
    breadcrumbs: [{ name: '稳定机场选购', url: '/stable-airports/' }],
    headline: '稳定机场选购攻略：如何保障晚高峰流畅不卡顿？',
    subline: '晚高峰丢包与断流是影响体验的最大元凶。从内网专线（IEPL/IPLC）、多线BGP冗余到节点负载控制，全面解析稳定背后的技术支撑。',
    filterFn: (opt) => {
      const b = brands.find(x => x.slug === opt.brandId);
      return b && (b.networkTypes.includes('IEPL专线') || b.networkTypes.includes('IPLC专线') || b.networkTypes.includes('BGP智能调度'));
    },
    contentSections: [
      {
        h2: '一、为什么专线机场通常比普通公网隧道更稳定？',
        p: '普通机场的流量直接走公网国际出口，在晚高峰（20:00-23:00）骨干网拥塞时，丢包率往往激增至 15%-30% 以上，导致视频频繁缓冲。而 IPLC（国际私有租用线路）与 IEPL（国际以太网私网专线）采用企业级陆缆或海缆点对点直连，数据不过公网防火墙审查，具有极低的丢包率与持续稳定的物理抖动控制。'
      },
      {
        h2: '二、主流专线品牌架构对标',
        p: '灵动云主打 IEPL/IPLC 专线优化与 BGP 智能调度，穿云年付与至尊私人定制均具备专线架构支持；大佬云全节点采用 IEPL 专线接入，并坚持 1.0x 倍率不设套路扣费；暮光加速在部分年付与进阶月付中配备了 IPLC 轻量专线，节点覆盖超过 15 个国家和地区。'
      },
      {
        h2: '三、理性看待稳定性：不存在绝对 100% 不断网的机场',
        p: '任何网络代理服务都可能受到上游光缆割接、机房电力故障或运营商政策突变的影响。理性的做法是：选择有长期运维记录的成熟品牌，同时常备一个小额度买断的不限时流量包作为备用双保险，确保关键业务不断联。'
      }
    ]
  },
  {
    path: 'src/pages/premium-airports/index.astro',
    title: '2026高端机场与独享定制服务推荐｜机场智选',
    description: '面向跨国跨境电商、企业团队及重度出海业务的高端机场与私人定制网络服务评测。提供独享公网IP、专属带宽与独立客服支持。',
    breadcrumbs: [{ name: '高端机场', url: '/premium-airports/' }],
    headline: '高端机场与独享定制服务：专为严苛业务场景打造',
    subline: '普通共享节点难以满足跨境电商防关联、企业独立网络办公及超高吞吐需求。深入解析高端定制机场的专属价值。',
    filterFn: (opt) => opt.totalPrice >= 100 || opt.planType === 'custom',
    contentSections: [
      {
        h2: '一、什么是真正的高端与私人定制机场？',
        p: '普通消费级机场通常由成百上千名用户共享相同的节点出口 IP。在亚马逊、eBay 或特定金融风控场景下，共享 IP 极易引发连锁风控。高端定制服务（如灵动云至尊私人定制，¥680/月）则为用户配置专属公网 IP、独立端口与保障带宽，享有最高优先级调度和专属客服通道。'
      },
      {
        h2: '二、什么用户真正需要购买高端套餐？',
        p: '如果您的核心业务涉及：跨境电商品牌运营、海外独立站多店铺管理、跨国音视频实时会议，或需要每月消耗 1TB-2TB 以上海量数据且对晚高峰延迟有书面级要求的团队，高端定制产品才具有真实的投入产出比。普通个人用户日常上网无需过度消费。'
      }
    ]
  },
  {
    path: 'src/pages/value-airports/index.astro',
    title: '2026高性价比机场推荐｜单价与实用性的最佳平衡｜机场智选',
    description: '性价比不是买得最便宜，而是把钱花在刀刃上。基于流量利用率与月均成本，为您筛选2026年最具性价比的优质机场套餐。',
    breadcrumbs: [{ name: '高性价比机场', url: '/value-airports/' }],
    headline: '2026 高性价比机场推荐：聪明消费，杜绝浪费',
    subline: '打破“名义单价低就是性价比高”的营销谎言。从实际使用单价出发，找到价格适中、额度充足、线路过硬的黄金方案。',
    filterFn: (opt) => opt.unitCostPerGB && opt.unitCostPerGB <= 0.18 && opt.monthlyCost && opt.monthlyCost <= 35,
    contentSections: [
      {
        h2: '一、重新定义机场的“真实性价比”',
        p: '真正的性价比遵循一条核心法则：<strong>整期实付可控 + 额度切合需求 + 节点无虚高倍率 + 线路晚高峰不跳水</strong>。微风网络 ¥25/月 配备 200GB（单价仅 ¥0.125/GB）且全节点 1.0x 倍率，就是极具性价比的典范。'
      },
      {
        h2: '二、兼顾价格与质量的代表套餐',
        p: '灵猫网络季付 Small（¥65/季，150GB/月）折合约 ¥21.6/月；闪跃 FlashLeap 闪动 Flicker（¥24/月，150GB）；飞猫云月付 ¥15 入门套餐，都属于预算在 25 元左右、但体验显著优于廉价公网的优质选择。'
      }
    ]
  },
  {
    path: 'src/pages/clash-airports/index.astro',
    title: '2026 Clash机场推荐与第三方订阅开放政策分析｜机场智选',
    description: '支持Clash、Mihomo、Shadowrocket、Sing-box的机场推荐。重点核实各品牌是否开放通用订阅直链、是否有申请门槛及导入教程。',
    breadcrumbs: [{ name: 'Clash机场', url: '/clash-airports/' }],
    headline: 'Clash 机场推荐与第三方客户端订阅开放政策全解析',
    subline: '喜欢使用开源 Clash、Mihomo 或 Shadowrocket 客户端？选购前务必核查第三方订阅链接开放政策，避开强制使用专有客户端的限制。',
    filterFn: (opt) => {
      const b = brands.find(x => x.slug === opt.brandId);
      return b && b.clients.some((c) => c['操作系统或客户端'].includes('Clash'));
    },
    contentSections: [
      {
        h2: '一、支持 Clash 协议不等于可以直接导入 Clash！',
        p: '这是最容易被新手忽略的陷阱。部分服务商在后台虽然采用 Shadowsocks 或 VLESS 协议，但出于安全和合规策略，并不直接在网页前端生成通用的订阅 URL，而是强制要求用户下载其定制的 Windows/macOS/Android 安装包。'
      },
      {
        h2: '二、重点品牌的第三方订阅政策盘点',
        p: '以灵动云为例，2026-11-24 客服说明其通用第三方订阅需要订单金额达到约 ¥200 门槛方可申请特殊服务，低价套餐默认主推官方客户端及 iOS Nextin；而灵猫网络在 2026-11-05 曾发布公告暂停了第三方订阅支持。偏好开源客户端的用户在付款前必须仔细核对本站品牌详情页的第十节说明。'
      }
    ]
  },
  {
    path: 'src/pages/proxy-airports/index.astro',
    title: '2026翻墙机场选购与科学上网科普指南｜机场智选',
    description: '系统梳理科学上网代理技术原理。对比VPN与代理机场的本质差异，指导合规使用、线路识别及新手选购决策。',
    breadcrumbs: [{ name: '翻墙机场指南', url: '/proxy-airports/' }],
    headline: '2026 翻墙机场与科学上网选购理性指南',
    subline: '从基础网络协议、BGP中继、内网专线到合规边界，帮助出海从业者与科研人员全面建立机场选购的专业认知。',
    filterFn: (opt) => opt.monthlyCost && opt.monthlyCost <= 40,
    contentSections: [
      {
        h2: '一、机场与传统 VPN 的本质区别',
        p: '传统 VPN（如 OpenVPN、WireGuard）属于全局网络层封装，原本用于跨国企业内网通信，由于特征明显极易被防火墙深度报文检测（DPI）阻断；而现代“机场”基于 Shadowsocks、VLESS、Trojan 等应用层分流代理协议，配合伪装技术（如 TLS 加密、WebSocket、gRPC），具有更高的吞吐效率与抗干扰能力。'
      },
      {
        h2: '二、合规合法使用红线声明',
        p: '我们坚决要求所有用户严格遵守国家法律法规。代理工具应当仅仅用于合法的跨境贸易往来、海外科研学术论文检索、国际技术开源社区协作等正当工作场景，绝不可利用网络从事任何危害公共安全与社会稳定的违法活动。'
      }
    ]
  },
  {
    path: 'src/pages/monthly-airports/index.astro',
    title: '2026月付机场推荐｜低门槛按月计费机场套餐大全｜机场智选',
    description: '汇集18家品牌中所有支持纯月付购买的套餐。起步价仅15-20元/月，支持支付宝等便捷支付，按月续费无资金沉没风险。',
    breadcrumbs: [{ name: '月付机场', url: '/monthly-airports/' }],
    headline: '2026 月付机场推荐：低门槛、随用随停的理性之选',
    subline: '不愿承担大额预付款风险？精选支持纯按月支付的优质机场套餐，给你的每一次选择保留充分的自由度。',
    filterFn: (opt) => opt.periodName === '月付' || opt.periodMonths === 1,
    contentSections: [
      {
        h2: '一、为什么我们始终建议新用户优先月付？',
        p: '网络代理服务的体验具有高度的“本地差异性”。同一家机场，在电信、联通或移动网络下的表现可能大相径庭；甚至在不同的省份或城市，晚高峰延迟也各不相同。月付套餐让你只需付出 ¥15-¥25 的极低成本，就能在真实的个人生活与工作网络环境下进行全方位测试。'
      },
      {
        h2: '二、热门月付套餐横向对比',
        p: '灵动云·灵动拂风（¥20/月，100GB）、暮光加速（¥20/月，120GB）、微风网络（¥25/月，200GB）、飞猫云（¥15/月，大流量），构成了目前市场上最具竞争力的月付第一梯队。'
      }
    ]
  },
  {
    path: 'src/pages/annual-airports/index.astro',
    title: '2026年付机场推荐｜高折扣轻量年付套餐与避坑指南｜机场智选',
    description: '精选百元内及主流年付机场套餐。分析折合月价优势，提醒预付款风险与服务商长期运营考核标准。',
    breadcrumbs: [{ name: '年付机场', url: '/annual-airports/' }],
    headline: '2026 年付机场推荐：折合超低月价与风险防范',
    subline: '年付通常享有 15%-30% 的价格优惠，但必须防范商家跑路与线路劣化风险。教你如何安全选购优质年付机场。',
    filterFn: (opt) => opt.periodName === '年付' || opt.periodMonths === 12,
    contentSections: [
      {
        h2: '一、年付机场的核心优势与潜在陷阱',
        p: '年付的最大优势在于“折算后月均极低”。例如 ¥99/年的灵动云穿云套餐，折合每月不到 ¥8.3；但年付的隐患在于：一旦商家中途调整订阅政策、出现持续故障甚至关停，用户几乎无法拿回剩余预付款。'
      },
      {
        h2: '二、高性价比年付套餐精选',
        p: '灵动云·穿云（¥99/年，70GB/30天重置，IPLC专线）、大佬云年付活动包（¥96/年，60GB/月，IEPL专线）、暮光加速轻量年付（¥109/年，70GB/月）、微风网络年付（¥137/年，100GB/月）都是百元出头、经受过长期市场检验的成熟年付产品。'
      }
    ]
  },
  {
    path: 'src/pages/unlimited-airports/index.astro',
    title: '2026不限时流量机场推荐｜买断制一次性流量包大全｜机场智选',
    description: '无需按月清零！收录灵猫网络、闪跃、灵动云、大佬云等品牌的不限时买断流量包，适合出差备用、低频访问与多设备备用连接。',
    breadcrumbs: [{ name: '不限时机场', url: '/unlimited-airports/' }],
    headline: '不限时流量机场推荐：买断制、用完为止的极佳备用方案',
    subline: '没有月底清零的焦虑，适合轻度出差、偶尔查阅学术论文或作为第二条备用网络。全库真实一次性流量包盘点。',
    filterFn: (opt) => opt.planType === 'onetime',
    contentSections: [
      {
        h2: '一、不限时流量包与周期套餐的本质区别',
        p: '普通周期套餐每个月按期重置配额，当月用不完自动清零；而不限时流量包属于一次性买断制（流量用完为止），没有固定有效期截止日。虽然其名义每GB单价通常高于月付，但对于每月仅消耗 5-10GB 的低频用户而言，综合总支出反而远远低于每个月持续续费。'
      },
      {
        h2: '二、真实不限时流量包价目精选',
        p: '灵猫网络不限时 Small（¥100，100GB）；闪跃 FlashLeap 不限时包（¥150，100GB，注意查看订单说明）；灵动云闲云小流量包（¥199，150GB）；大佬云闲云随心包（¥268，200GB）。用户可根据自身备用预算进行选择。'
      }
    ]
  },
  {
    path: 'src/pages/beginner/index.astro',
    title: '机场新手理性选购与入门避坑全攻略｜机场智选',
    description: '专为刚接触代理机场的新手用户编写。从基础概念、节点选择、客户端安装到防坑策略，手把手教你如何第一单不踩雷。',
    breadcrumbs: [{ name: '新手选购指南', url: '/beginner/' }],
    headline: '新手如何挑选第一款机场？零基础防坑与选购指南',
    subline: '面对眼花缭乱的专有名词与套餐价格不知所措？这篇系统、通俗的指南将帮你迅速理清选购核心要点。',
    filterFn: (opt) => opt.monthlyCost && opt.monthlyCost <= 25,
    contentSections: [
      {
        h2: '一、新手入坑最常犯的三个错误',
        p: '1. 一上来就买三年付甚至永久套餐：任何声称“永久有效且无需再付费”的服务商，往往因后期缺乏现金流维持服务器而在数月后失联；2. 以为节点越多网速就越快：实际常用的往往只有香港、日本、新加坡等 3-5 个低延迟核心节点；3. 不懂客户端兼容性，买了无法在自己的 iPhone 或 Mac 上使用。'
      },
      {
        h2: '二、新手推荐第一套方案',
        p: '首单强烈建议选择提供官方傻瓜式一键客户端、且支持月付（¥20左右）的品牌。例如灵动云或暮光加速，下载官方提供的安装包登录即可使用，无需复杂的节点规则配置，待熟悉后再探索 Clash 开源软件。'
      }
    ]
  },
  {
    path: 'src/pages/long-term/index.astro',
    title: '长期稳定机场选购指南｜老牌成熟机场推荐｜机场智选',
    description: '适合希望长期稳定使用、不想频繁更换机场的用户。分析服务商运营资历、抗风险能力与长期订阅策略。',
    breadcrumbs: [{ name: '长期稳定机场', url: '/long-term/' }],
    headline: '长期机场如何挑选？老牌稳定服务商的衡量维度',
    subline: '不想隔三差五到处找新机场？从运营历史、退款信用、客服工单效率到多线冗余，筛选可以长期相伴的可靠品牌。',
    filterFn: (opt) => opt.periodName === '年付' && opt.totalPrice >= 90,
    contentSections: [
      {
        h2: '一、长期机场的三大立足支柱',
        p: '能够长期持续稳定运营的机场品牌，通常具备：1. 合理的定价模型，不搞击穿成本的恶性低价倾销；2. 拥有专业的全职技术运维与冗余带宽储备；3. 畅通的客服渠道，遇到国际光缆故障时能够第一时间发布公告并及时切换备用出口。'
      }
    ]
  },
  {
    path: 'src/pages/ai-airports/index.astro',
    title: '2026 AI工具机场推荐｜ChatGPT与Claude专用节点选购｜机场智选',
    description: '针对OpenAI ChatGPT、Anthropic Claude、Midjourney等AI平台的节点要求。筛选干净原生IP、低阻断率的优质机场。',
    breadcrumbs: [{ name: 'AI机场推荐', url: '/ai-airports/' }],
    headline: 'ChatGPT & Claude 用户如何选择专用代理机场？',
    subline: '频繁遇到“Access Denied”或“Country not supported”？深入剖析 AI 工具对出口 IP 纯净度与地区策略的特殊要求。',
    filterFn: (opt) => {
      const b = brands.find(x => x.slug === opt.brandId);
      return b && b.aiSupport && b.aiSupport.length > 0;
    },
    contentSections: [
      {
        h2: '一、AI 平台对网络节点的严苛风控逻辑',
        p: 'OpenAI 与 Anthropic 接入了极其严格的 Cloudflare 防滥用与欺诈检测系统。大量数据中心机房（Data Center IP）被批量列入黑名单，或者当同一节点在短时间内产生过多并发请求时，就会触发验证码死循环甚至账户被封。'
      },
      {
        h2: '二、选购建议：首选美区/日区住宅级或优质专线节点',
        p: '选择在品牌档案中明确对 AI 工具进行了针对性优化、且具备丰富美国、日本、新加坡等非阻断地区节点的套餐。灵动云、微风网络等在常规宣传中均配置了针对 AI 的连通策略。'
      }
    ]
  },
  {
    path: 'src/pages/streaming-airports/index.astro',
    title: '2026流媒体机场推荐｜YouTube 4K与Netflix解锁套餐｜机场智选',
    description: '追求极致高清影音体验？精选对YouTube、Netflix、Disney+等主流流媒体平台适配优良、大带宽低丢包的机场。',
    breadcrumbs: [{ name: '流媒体机场', url: '/streaming-airports/' }],
    headline: '流媒体机场选购指南：畅享 YouTube 4K 与 Netflix 区域解锁',
    subline: '看高清视频频繁转圈？全面解析流媒体平台对出口带宽吞吐量、丢包率与本地 IP 区域锁定的核心要求。',
    filterFn: (opt) => opt.monthlyTrafficGB && opt.monthlyTrafficGB >= 150,
    contentSections: [
      {
        h2: '一、流媒体流畅播放的三大硬件指标',
        p: '观看 YouTube 4K 超高清视频，单连接瞬时吞吐带宽需稳定在 40Mbps-80Mbps 以上，且丢包率必须低于 1%。任何普通公网跳跃都会导致缓冲卡顿。微风网络、灵动云驭浪/破晓套餐的大容量配置非常适合影音爱好者。'
      }
    ]
  },
  {
    path: 'src/pages/multi-device/index.astro',
    title: '2026多设备与家庭共享机场推荐｜不限在线设备机场｜机场智选',
    description: '针对家庭多成员、工作室及个人多终端协同需求。盘点不限同时在线设备数或设备上限宽松的优质机场套餐。',
    breadcrumbs: [{ name: '多设备机场', url: '/multi-device/' }],
    headline: '多设备协同与家庭共享机场：如何规避并发限制？',
    subline: '手机、电脑、平板、软路由同时连网，会不会被系统踢下线？精选设备限制宽松、支持多端并发的机场服务。',
    filterFn: (opt) => {
      const b = brands.find(x => x.slug === opt.brandId);
      return b && (b.deviceLimits.maxOnline.includes('不限') || b.deviceLimits.maxOnline.includes('未严格'));
    },
    contentSections: [
      {
        h2: '一、并发连接限制：不可忽视的使用条款',
        p: '部分机场在后台设置了严格的“同时在线设备数”检测，一般限制为 2 台或 3 台。一旦超出限制，后续设备可能无法连接。大佬云在套餐资料中明确宣称“全节点 1x 倍率且不限制在线设备数”，非常适合家庭或多设备极客使用。'
      }
    ]
  },
  {
    path: 'src/pages/budget/index.astro',
    title: '机场预算选购中心｜按月均支出精准筛选套餐｜机场智选',
    description: '预算分级选购入口。提供20元以内、30元以内、30-60元及百元以内年付等完整梯度导航，帮您根据财务承受力理性消费。',
    breadcrumbs: [{ name: '预算选购', url: '/budget/' }],
    headline: '机场预算梯度选购中心：量入为出，理性消费',
    subline: '无论您的预算是每月 10 元、30 元还是 100 元，我们都能为您找到对应区间内最具性价比与稳定性的真实套餐。',
    filterFn: (opt) => true,
    contentSections: [
      {
        h2: '一、建立健康的个人网络预算观念',
        p: '在个人数字化生活开销中，网络代理属于基础辅助工具，月均支出建议控制在 20-40 元以内即可满足绝大部分科研、工作与娱乐需求。我们强烈反对任何超出自身经济承受力的冲动大额预付款。'
      }
    ]
  },
  {
    path: 'src/pages/budget/under-20/index.astro',
    title: '月付20元及以下机场推荐｜学生与新手低成本入门｜机场智选',
    description: '月付20元以内的极低预算精选。收录灵动云、暮光加速、大佬云等品牌的亲民套餐，价格低廉且支持随时按月启停。',
    breadcrumbs: [{ name: '预算选购', url: '/budget/' }, { name: '20元及以下', url: '/budget/under-20/' }],
    headline: '月付 ¥20 及以下平价机场：新手极佳低成本试错方案',
    subline: '单月实付不超过二十元，没有任何大额预付款负担。适合学生党、轻度查阅资料及短期测试用户。',
    filterFn: (opt) => (opt.periodName === '月付' || opt.periodMonths === 1) && opt.totalPrice <= 20,
    contentSections: [
      {
        h2: '一、月付 20 元以内的核心选择',
        p: '灵动云·灵动拂风（¥20/月，100GB）、暮光加速（¥20/月，120GB）、大佬云财云福利版（¥19.99/月，100GB）是目前该区间的绝对主力，单月体验成本极低。'
      }
    ]
  },
  {
    path: 'src/pages/budget/under-30/index.astro',
    title: '月付30元以内机场推荐｜主流均衡档位套餐对比｜机场智选',
    description: '30元月付预算是绝大多数用户的黄金选择区间。流量充沛（150-200GB），线路质量过硬，适配主流4K与AI工具。',
    breadcrumbs: [{ name: '预算选购', url: '/budget/' }, { name: '30元以内', url: '/budget/under-30/' }],
    headline: '月付 ¥30 以内机场：主流用户的最佳综合平衡点',
    subline: '在这个预算区间内，服务商通常能提供更充裕的带宽冗余和更大的月度流量配额，是品质与价格的平衡点。',
    filterFn: (opt) => (opt.periodName === '月付' || opt.periodMonths === 1) && opt.totalPrice <= 30,
    contentSections: [
      {
        h2: '一、30元以内的标杆套餐分析',
        p: '微风网络月付 ¥25 独享 200GB；闪跃 FlashLeap 闪动 ¥24/月 配备 150GB；灵猫网络月付 Small ¥25/月 配备 150GB。这个区间的套餐足以支撑每天 2 小时以上的 1080P/4K 视频观看。'
      }
    ]
  },
  {
    path: 'src/pages/budget/30-60/index.astro',
    title: '月付30–60元机场推荐｜大流量高规格进阶专线｜机场智选',
    description: '面向大流量重度消耗与高规格网络需求的用户。提供300GB至700GB月度额度，优化高峰期线路调度。',
    breadcrumbs: [{ name: '预算选购', url: '/budget/' }, { name: '30-60元区间', url: '/budget/30-60/' }],
    headline: '月付 ¥30 - ¥60 进阶机场：大吞吐与多设备首选',
    subline: '针对频繁下载大文件、多人共享或超大流量消耗的用户，提供充沛的带宽与更高的晚高峰调度优先级。',
    filterFn: (opt) => (opt.periodName === '月付' || opt.periodMonths === 1) && opt.totalPrice > 30 && opt.totalPrice <= 60,
    contentSections: [
      {
        h2: '一、进阶区间的代表产品',
        p: '灵动云·灵动驭浪（¥50/月，300GB）、跨界云跃云（¥40/月，330GB）、大佬云凌云（¥43/月，300GB）。适合重度出海从业人员与大流量家庭用户。'
      }
    ]
  },
  {
    path: 'src/pages/budget/under-100-yearly/index.astro',
    title: '百元以内年付机场推荐｜极低折算月价轻量年付精选｜机场智选',
    description: '单笔支出控制在100元以内的年付套餐。折算每月仅需7-8元，适合日常备用或轻度常年使用。',
    breadcrumbs: [{ name: '预算选购', url: '/budget/' }, { name: '百元年付', url: '/budget/under-100-yearly/' }],
    headline: '百元以内年付机场精选：单次小投入，整年无忧备用',
    subline: '不想每月记得续费，又不想一次预付几百元？百元内年付是轻量长期用户与主力网络备用的绝佳选择。',
    filterFn: (opt) => (opt.periodName === '年付' || opt.periodMonths === 12) && opt.totalPrice <= 100,
    contentSections: [
      {
        h2: '一、真实的百元内年付产品盘点',
        p: '灵动云·灵动穿云（¥99/年，70GB/30天重置，IPLC专线）、大佬云年付活动包（¥96/年，60GB/月，IEPL专线）、跨界云跨界年付版（¥96/年，60GB/月）、灵猫网络年付小包（¥85/年，45GB/月）。整年一次付清不足百元，财务压力极小。'
      }
    ]
  },
  {
    path: 'src/pages/traffic-guide/index.astro',
    title: '机场流量额度选购指南｜每月需要多少GB才够用？｜机场智选',
    description: '系统拆解网页、视频清晰度、社交软件与AI工具的真实流量消耗模型。教您精准评估个人需求，避免过度消费。',
    breadcrumbs: [{ name: '流量选购指南', url: '/traffic-guide/' }],
    headline: '机场流量额度选购全攻略：每个月到底需要多少流量？',
    subline: '买多了浪费，买少了断网。用具体应用场景的数据吞吐模型，彻底算清你每月的真实流量需求。',
    filterFn: (opt) => opt.monthlyCost && opt.monthlyCost <= 30,
    contentSections: [
      {
        h2: '一、各主流应用的真实流量消耗参考表',
        p: '• 文本网页与邮件：约 50-100MB / 小时<br/>• 社交软件（包含图文/短视频）：约 300-600MB / 小时<br/>• YouTube 1080P 全高清视频：约 1.5 - 2.0GB / 小时<br/>• YouTube 4K 超高清视频：约 6.0 - 8.0GB / 小时<br/>• ChatGPT / Claude 文本交互：约 100-300MB / 周'
      }
    ]
  },
  {
    path: 'src/pages/billing-guide/index.astro',
    title: '机场付款周期选择全攻略｜月付、季付、年付全面对比｜机场智选',
    description: '深度分析不同付款周期的优劣势。探讨预付款沉没风险、退款限制与资金流动性，助您制定明智的订阅周期策略。',
    breadcrumbs: [{ name: '付款周期指南', url: '/billing-guide/' }],
    headline: '机场付款周期指南：月付、季付与年付深度对比',
    subline: '年付看似打折，但背后隐藏着退款难与服务变更的沉没风险。系统梳理各个周期的适用场景与避坑逻辑。',
    filterFn: (opt) => true,
    contentSections: [
      {
        h2: '一、全周期横向综合评估矩阵',
        p: '月付灵活性最高，适合新手破冰；季付是性价比与风险兼顾的折中方案；半年付与年付适合在同一个平台稳定使用数月以上的老用户；不限时买断包适合低频出差与第二备用线。'
      }
    ]
  },
  {
    path: 'src/pages/buying-risks/index.astro',
    title: '机场购买风险与防骗避坑指南｜保护资金与网络安全｜机场智选',
    description: '总结机场选购中最常见的陷阱：虚假跑分、无第三方订阅、节点暗扣倍率、跑路征兆及退款限制，助您避开90%的常见雷区。',
    breadcrumbs: [{ name: '购买避坑指南', url: '/buying-risks/' }],
    headline: '机场购买避坑宝典：如何识别高危信号与虚假营销？',
    subline: '网络服务信息混乱，套路防不胜防。牢记这 8 大避坑法则，保护个人资金安全与网络使用体验。',
    filterFn: (opt) => opt.monthlyCost && opt.monthlyCost <= 25,
    contentSections: [
      {
        h2: '一、常见的五大高危信号（跑路前兆）',
        p: '1. 突然发布击穿成本的超低价“永久会员”或“多年付超级折扣”；2. 官方交流群全员禁言，客服工单长时间无响应；3. 晚高峰大面积断流且无任何官方修复公告；4. 频繁更换收款账号主体；5. 官网频繁改域名且无正常重定向。'
      }
    ]
  },
  {
    path: 'src/pages/knowledge/index.astro',
    title: '机场知识百科｜IPLC、IEPL、BGP与Shadowsocks协议通俗科普｜机场智选',
    description: '通俗易懂的机场技术百科。一文读懂IPLC与IEPL的区别、BGP智能调度原理、VLESS与Shadowsocks协议差异，告别技术盲区。',
    breadcrumbs: [{ name: '机场知识百科', url: '/knowledge/' }],
    headline: '机场技术知识百科：通俗拆解网络底层的核心术语',
    subline: '看懂商家的宣传参数，不再被高大上的专业词汇忽悠。从专线物理架构到加密协议，一站式科普解析。',
    filterFn: (opt) => true,
    contentSections: [
      {
        h2: '一、IPLC、IEPL 与 BGP 的通俗比喻',
        p: '普通公网中继好比走地面国道，红绿灯多且容易堵车；BGP 智能调度好比配备了实时路况导航，哪条路畅通自动切哪条；IPLC 与 IEPL 专线则是全封闭的高铁专线，不经过外部公网审查与拥堵节点，速度与丢包率极具保障。'
      }
    ]
  },
  {
    path: 'src/pages/updates/index.astro',
    title: '机场品牌动态与套餐记录更新追踪｜机场智选',
    description: '实时追踪18家机场品牌的价格变动、新套餐上线、客户端政策更迭与服务公告，提供真实透明的时间线记录。',
    breadcrumbs: [{ name: '品牌动态', url: '/updates/' }],
    headline: '机场品牌动态与套餐价格变更实时追踪',
    subline: '持续记录各大机场的价格调整、优惠活动与客户端订阅政策变动。所有动态基于真实可追溯记录，不编造虚假信息。',
    filterFn: (opt) => true,
    contentSections: [
      {
        h2: '一、近期重要品牌动态与政策记录',
        p: '• <strong>灵动云 (2026-11-24)：</strong> 客服说明第三方通用订阅服务需订单金额达到约 ¥200 门槛方可申请特殊服务，官方客户端为主要接入途径；<br/>• <strong>灵猫网络 (2026-11-12)：</strong> 数据库补入季付 Small 套餐（¥65/季，150GB/月）；此前 11-05 资料记录暂停第三方订阅；<br/>• <strong>闪跃 FlashLeap (2026-10-20)：</strong> 重新核实六款周期套餐与两款不限时包，保留高档年付与交付量差异说明；<br/>• <strong>大佬云 (2026-11-07)：</strong> 保持全节点 1x 倍率与不限制设备数政策，未设专属推广链接，使用官方公开入口。'
      }
    ]
  }
];

// Helper to generate Category Page Astro file
function generateCategoryPageAstro(cat) {
  const matchingOptions = options.filter(cat.filterFn).slice(0, 6);

  return `---
import Layout from '${cat.path.split('/').length === 4 ? '../../layouts/Layout.astro' : '../../../layouts/Layout.astro'}';
import brands from '${cat.path.split('/').length === 4 ? '../../data/brands.json' : '../../../data/brands.json'}';
import options from '${cat.path.split('/').length === 4 ? '../../data/options.json' : '../../../data/options.json'}';

const pageTitle = "${cat.title}";
const pageDesc = "${cat.description}";
---

<Layout
  title={pageTitle}
  description={pageDesc}
  canonical="https://jichangzhixuan.blog${cat.breadcrumbs[cat.breadcrumbs.length - 1].url}"
  breadcrumbs={${JSON.stringify(cat.breadcrumbs)}}
>
  <section style="background: linear-gradient(180deg, #F4F9FC 0%, #FFFFFF 100%); padding: 56px 0 40px 0; border-bottom: 1px solid #DCE7EC;">
    <div class="max-container">
      <div style="max-width: 820px;">
        <span class="badge-pill" style="margin-bottom: 12px;">专业选购专题</span>
        <h1 style="font-size: clamp(30px, 4.2vw, 46px); font-weight: 900; color: #102D46; line-height: 1.25; margin-bottom: 16px;">
          ${cat.headline}
        </h1>
        <p style="font-size: 16.5px; color: #647B8C; line-height: 1.8;">
          ${cat.subline}
        </p>
      </div>
    </div>
  </section>

  <section class="section-gap" style="background: #FFFFFF;">
    <div class="max-container">
      
      <!-- Content Body -->
      <div class="article-content" style="max-width: 880px; margin-bottom: 56px;">
        ${cat.contentSections.map(sec => `
          <h2 style="font-size: 24px; font-weight: 800; color: #102D46; margin-top: 40px; margin-bottom: 16px;">${sec.h2}</h2>
          <p style="font-size: 16px; color: #263E50; line-height: 1.85;">${sec.p}</p>
        `).join('')}
      </div>

      <!-- Filtered Real Plans Recommendation -->
      <div style="border-top: 1px solid #DCE7EC; padding-top: 48px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="badge-pill" style="margin-bottom: 8px;">匹配方案精选</span>
            <h2 style="font-size: 24px; font-weight: 800; color: #102D46; margin: 0;">符合该专题的真实代表套餐</h2>
          </div>
          <a href="/plans/" style="font-size: 14.5px; font-weight: 700; color: #07886E; text-decoration: none;">
            查看全部146条套餐库 →
          </a>
        </div>

        <div class="grid-3">
          ${matchingOptions.map(opt => {
            const b = brands.find(x => x.slug === opt.brandId) || {};
            return `
              <div class="smart-card" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                    <div>
                      <span style="font-size: 12.5px; font-weight: 700; color: #10B89A;">${opt.brandName}</span>
                      <h3 style="font-size: 18.5px; font-weight: 800; color: #102D46; margin: 2px 0 0 0;">${opt.planName}</h3>
                    </div>
                    <span class="badge-pill" style="font-size: 11px;">${opt.periodName}</span>
                  </div>

                  <div style="background: #F8FBFE; padding: 12px; border-radius: 12px; margin-bottom: 16px; font-size: 13.5px;">
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: #647B8C;">整期实付：</span>
                      <strong style="color: #102D46; font-size: 18px;">¥${opt.totalPrice}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                      <span style="color: #647B8C;">折合月均：</span>
                      <strong style="color: #07886E;">${opt.monthlyCost ? `¥${opt.monthlyCost}/月` : '买断'}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                      <span style="color: #647B8C;">额度配额：</span>
                      <strong>${opt.trafficText}</strong>
                    </div>
                  </div>

                  <p style="font-size: 13px; color: #647B8C; line-height: 1.6; margin-bottom: 16px;">
                    线路：${(b.networkTypes || []).slice(0, 2).join(' / ')} · ${(b.suitableUsers || []).slice(0, 1)[0] || '日常通用'}
                  </p>
                </div>

                <div style="display: flex; gap: 8px;">
                  <a href="/airports/${opt.brandId}/" class="btn-secondary" style="flex: 1; padding: 8px 10px; font-size: 13px; text-align: center;">
                    查看档案
                  </a>
                  <a href="${opt.purchaseUrl || b.purchaseUrl}" target="_blank" rel="sponsored nofollow noopener" class="btn-primary" style="flex: 1; padding: 8px 10px; font-size: 13px; text-align: center;">
                    前往购买
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

    </div>
  </section>
</Layout>
`;
}

// Generate all category pages
for (const cat of CATEGORY_PAGES) {
  const targetDir = path.dirname(cat.path);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(cat.path, generateCategoryPageAstro(cat), 'utf8');
  console.log(`Generated category page: ${cat.path}`);
}

console.log(`Successfully generated all ${CATEGORY_PAGES.length} category pages!`);
