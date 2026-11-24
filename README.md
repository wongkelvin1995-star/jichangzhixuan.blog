# SmartChoice MAX · 机场智选旗舰增强版

> **聪明选择，不必多花。**  
> **让每一次机场购买，都有充分的理由。**

---

## 01｜项目简介

- **网站名称：** 机场智选 (Airport SmartChoice)
- **正式域名：** [https://jichangzhixuan.blog/](https://jichangzhixuan.blog/)
- **设计框架：** SmartChoice MAX · 智选旗舰增强版
- **视觉风格：** Apple 极简科技风（冰川白 `#F4F9FC`、深海蓝 `#102D46`、翡翠青 `#10B89A`）
- **核心定位：** 专业机场品牌资料库、智能套餐选购平台、价格成本透明对比中心、理性消费指南
- **目标搜索引擎：** Bing（必应）SEO 深度优化

---

## 02｜核心技术栈

- **框架：** [Astro 7.x](https://astro.build/)（纯静态 SSG 架构，全站预渲染输出）
- **语言：** TypeScript / Modern ES Modules
- **样式体系：** SmartChoice MAX 专属现代科技 CSS 设计系统
- **数据源：** 统一结构化 JSON 数据库（`src/data/brands.json`, `plans.json`, `options.json`, `rankings.json`）
- **搜索系统：** 全站毫秒级交互检索中心（`/search/`）
- **SEO & 索引：** Sitemap 1.0, JSON-LD 结构化数据, Bing Webmaster Tools, IndexNow API

---

## 03｜全站架构与资产概览

- **收录品牌：** 18 家主流机场品牌（18 份独立深度档案）
- **套餐记录：** 146 条原始带价格套餐行
- **购买选项：** 261 项已记录购买周期价格（月/季/半/年/长周期/买断/定制）
- **静态页面总数：** **87 个生产环境 HTML 页面**（无死链，100% 通过死链与 SEO 校验）
- **智能选购工具：**
  1. `Smart Match 智能选机场`：`/smart-match/`
  2. `月度流量需求计算器`：`/tools/traffic-calculator/`
  3. `套餐实际成本计算器`：`/tools/cost-calculator/`
  4. `月付与年付对比工具`：`/tools/billing-calculator/`
  5. `品牌多维度横向对比 (PK台)`：`/compare/`
  6. `流量利用率与防浪费诊断`：`/tools/traffic-efficiency/`

---

## 04｜品牌推荐排名（编辑推荐顺序）

1. **灵动云** (`lingdongyun`) - 编辑推荐 TOP 01 · 拂风 ¥20/月，穿云 ¥99/年
2. **暮光加速** (`twilight`) - 编辑推荐 TOP 02 · ¥20/月 (120GB)，¥109/年 (IPLC)
3. **微风网络** (`breezenet`) - 编辑推荐 TOP 03 · ¥25/月 (200GB)，¥137/年
4. **飞猫云** (`feimaoyun`) - 高性价比精选 · ¥15/月起
5. **大佬云** (`dalaoyun`) - 低价专线精选 · 全节点 1x 倍率不限设备
6. **FLYV** (`flyv`) - 并列第六推荐
7. **浪网** (`wavenet`) - 并列第六推荐
8. **隐形人** (`invisible`) - 冗余容灾精选
9. **梯子云** (`tiziyun`) - 长周期优选
10. **无忧连接** (`wuyou`) - 平民低价优选
11. **Firefly** (`firefly`) - 轻量实用品牌
12. **全球云** (`quanqiuyun`) - 国际节点覆盖
13. **唯兔云** (`v2yun`) - 低预算备选
14. **灵猫网络** (`lingmao`) - 灵活计费（含季付Small ¥65）
15. **闪跃 FlashLeap** (`flashleap`) - 大容量梯次
16. **跨界云** (`kuajieyun`) - 海量吞吐优选（最高1.8TB/月）
17. **Sogo云** (`sogoyun`) - 长效实用品牌
18. **U1S1（有一说一）** (`u1s1`) - 亲民透明品牌

---

## 05｜本地运行与构建脚本

\`\`\`bash
# 启动本地开发服务 (默认端口 4321)
npm run dev

# 编译数据并执行生产环境静态构建
npm run build

# 本地预览已构建的生产页面
npm run preview

# 运行数据完整性测试
node scripts/validate-data.mjs

# 运行全站 SEO 规范合规测试
node scripts/validate-seo.mjs

# 运行全站 4500+ 内部链接死链测试
node scripts/check-links.mjs

# 执行 IndexNow 即时收录推送
node scripts/indexnow.mjs --submit
\`\`\`

---

## 06｜交付与审计报告索引

详细报告存放于 \`reports/\` 目录：
- [数据校验报告](file:///c:/Users/USERR/Desktop/博客/jichangzhixuan.blog/reports/DATA-VALIDATION-REPORT.md)
- [Bing SEO 技术验收报告](file:///c:/Users/USERR/Desktop/博客/jichangzhixuan.blog/reports/SEO-AUDIT-REPORT.md)
- [内部链接审计报告](file:///c:/Users/USERR/Desktop/博客/jichangzhixuan.blog/reports/INTERNAL-LINKS-REPORT.md)
- [生产部署与维护手册](file:///c:/Users/USERR/Desktop/博客/jichangzhixuan.blog/reports/DEPLOY-AND-MAINTENANCE-GUIDE.md)

---
© 2026 SmartChoice · 机场智选 | [https://jichangzhixuan.blog/](https://jichangzhixuan.blog/)
