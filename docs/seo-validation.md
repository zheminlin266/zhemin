# 技术 SEO / GEO 验证记录

验证日期：2026-10-06。以下记录针对本地生产构建；不代表生产站点已部署或重新收录。

## 实现

- 正式域名统一为 `https://www.zhemin.ltd`，用于 canonical、双语及默认语言链接、分享元信息、结构化数据、robots 和 sitemap。
- 移除根布局继承的统一作者/creator，以及 Article 中硬编码的作者。首页人物身份与文章作者不关联。
- 移除由月份补齐的发布时间和 sitemap 更新时间；保留原有正文、署名、来源、展示日期、排序和交互。
- 首页添加 WebSite/Person；32 个页面配置分享图片及双语说明。文章仅把实际正文配图写入 Article.image。
- 没有新增依赖、路由、数据库、分析服务或训练抓取规则。

## 已通过的检查

| 检查 | 结果 |
|---|---|
| `npm run build`，包括 `npm test` | 20 项测试通过；生产构建成功，生成 39 个静态页面/元数据端点 |
| 内容注册表前后比较 | 排除新增分享图配置后，原有内容记录及首页文案完全一致 |
| 32 个 sitemap 页面 | 直接返回 200；canonical、OG URL、语言链接及 sitemap 一致；未发现 noindex |
| 与线上旧版本对比 | 32 页的 main 正文、链接、显示日期和正文图片一致 |
| 作者、日期输出 | 页面无默认作者/creator 元标签，Article 无推断作者或补齐日期，sitemap 无推算 lastmod |
| 分享图片 | 12 个不同图片地址均可访问；实际尺寸与元信息相符 |
| 爬虫请求 | 4 种 User-Agent × 首页/原创/推荐/相册，共 16 次本地请求通过 |
| 跟踪参数 | 3 类页面的带参数访问仍指向不带参数的 canonical |
| 旧地址 | 7 个路径保持预期 308 跳转 |
| 不存在的页面 | 中英文普通路径及相册路径，共 4 个样本均返回 404 |
| 桌面与移动端浏览器 | 检查中英文首页/文章及中文相册；390px 移动视口无页面横向溢出，抽查图片正常 |
| 交互 | 中英文切换、主题切换、Email 复制成功提示正常；Email 测试替换了测试标签页的 Clipboard API，没有改动系统剪贴板 |
| `git diff --check` | 通过 |

## 外部结构化数据验证

将本地构建输出的 JSON-LD 分别提交至 Schema.org Validator：中文首页、铜供需原创文章、王川推荐文章，三个样本均为 **0 错误、0 警告**。

Google Rich Results Test 使用铜供需文章的完整构建 HTML，以代码模式检测，结果为 **1 项有效 Article、1 项非严重提示：未填写 author**。该字段按用户要求省略，不为消除提示而回填作者。[查看本次测试结果](https://search.google.com/test/rich-results/result?id=zoupVycu2EqQpIHK7EOjIA)

这两类检查验证标记有效性，不代表生产网址已经被重新抓取或收录。

## 上线后待验证

生产部署及站长后台提交需依项目规则另行授权。部署目标为现有 Vercel `zhemin` 项目，主站规范地址为 `https://www.zhemin.ltd`。

- 部署后重新检查生产域名、裸域名跳转、robots、sitemap 和页面最终 HTML。
- 在主站的 Google Search Console / Bing Webmaster Tools 属性中提交 sitemap，检查真实爬取、选定 canonical 及收录状态；不修改子站属性。
- 检查 Search Console 生成式 AI 包含设置和可用报告；本次没有访问站长后台或服务器爬虫日志。
- 在上线后第 7、28、56 天复核品牌搜索、可识别的 AI 来源及引用准确性。当前没有流量增长或排名改善结论。
