# SmartChoice MAX · 生产部署与运营维护手册

## 一、Cloudflare Pages 生产部署指南

本网站采用静态网站生成（SSG）架构，天然适配 Cloudflare Pages 全球边缘加速网络。

### 推荐配置参数：
- **Framework Preset（框架预设）：** Astro
- **Build command（构建命令）：** `npm run build`
- **Build output directory（输出目录）：** `dist`
- **Node.js Version（环境变量）：** `NODE_VERSION = 20` 或以上

### 部署步骤：
1. 将当前项目推送至 GitHub 私有或公开仓库；
2. 登录 Cloudflare Dashboard -> **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**；
3. 选择对应的 Git 仓库，设置构建命令为 `npm run build`，输出目录为 `dist`；
4. 点击 **Save and Deploy**，等待构建完成（通常耗时约 30-50 秒）；
5. 在 **Custom domains** 中添加正式域名：`jichangzhixuan.blog`，完成 SSL 证书签发与 DNS 解析绑定。

---

## 二、Bing Webmaster Tools 站长平台接入与提交

### 步骤 1：域名所有权验证
1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)；
2. 添加网站 `https://jichangzhixuan.blog/`；
3. 验证方式选择 **XML 文件验证**；将 Bing 提供的 `<user>...</user>` 代码覆盖填入本项目的 `public/BingSiteAuth.xml` 中，重新部署后点击验证。

### 步骤 2：提交网站地图 (Sitemap)
1. 在 Bing 站长后台点击 **Sitemaps** -> **Submit sitemap**；
2. 输入完整的 Sitemap 地址：`https://jichangzhixuan.blog/sitemap.xml`；
3. 提交后系统将在 24-48 小时内启动自动抓取与索引评估。

### 步骤 3：核心 URL 检查与初次抓取
1. 利用 **URL Inspection（URL检查）** 工具依次提交首页与重点页面：
   - `https://jichangzhixuan.blog/`
   - `https://jichangzhixuan.blog/smart-match/`
   - `https://jichangzhixuan.blog/ranking/`
   - `https://jichangzhixuan.blog/airports/lingdongyun/`
   - `https://jichangzhixuan.blog/airports/twilight/`
   - `https://jichangzhixuan.blog/airports/breezenet/`
2. 点击 **Request Indexing（请求索引）**，加速首屏页面收录。

---

## 三、IndexNow API 即时提交使用说明

本项目已内置完整的 IndexNow 自动化机制。已部署认证 Key：
`https://jichangzhixuan.blog/f6a9b4c8d1e2f3a4b5c6d7e8f9a0b1c2.txt`

### 命令行提交方式：
```bash
# 查看即将提交的 87 个 URL 负载测试：
node scripts/indexnow.mjs

# 正式向 IndexNow 官方 API 批量推送全站页面：
node scripts/indexnow.mjs --submit
```

---

## 四、后期新增品牌与套餐维护指南

本项目架构高度工程化与数据驱动。当未来需要新增机场品牌时，**严禁修改大量重复组件代码**：

1. **准备 Markdown 档案：** 将格式规范的品牌档案放置于 `source-data/airports-md/`；
2. **更新配置：** 在 `scripts/build-data.mjs` 的 `BRAND_CONFIGS` 数组中追加新品牌条目（定义 slug, rank, displayOrder, 名称与 SEO Title）；
3. **重新构建：** 运行 `npm run build`，系统将自动重新校验所有 146+ 条套餐并自动生成对应的品牌详情页、更新首页数据概览、重新生成 sitemap.xml 及全站搜索索引；
4. **运行测试：** 运行 `npm run validate` 与 `npm run check-links` 确保零死链与数据一致性。
