# 技术 SEO / GEO 验证记录

## 2026-10-16 生产部署与索引请求

已通过现有 Vercel `zhemin` 项目部署并切换正式域名：[生产站点](https://www.zhemin.ltd/)、[本次发布](https://vercel.com/zheminlin266s-projects/zhemin/HSuAKUtQgX5mvX6hBT5irZFVaxtu)。部署 ID 为 `dpl_HSuAKUtQgX5mvX6hBT5irZFVaxtu`，状态 READY。

- 本地与 Vercel 云端均通过 22 项测试和生产构建。上线后 32 个规范页面全部返回 200；canonical、双语链接、页面锚点、相册结构化数据与铜文章首图加载优先级核验通过。
- 正式站点在不执行 JavaScript 时，32 个 sitemap 页面均可从首页链接到达；中英文相册入口、正常切换及新标签页打开通过。
- 中文首页、中文铜文章、中文西藏相册的桌面 / 移动端共 6 组上线前后检查通过。文字和布局区域截图无差异，图片来源、说明和尺寸一致；照片重采样差异单独记录，抽查原图资源与前一部署逐字节一致。
- 已分别为 `https://www.zhemin.ltd/cn`、`https://www.zhemin.ltd/cn/articles/copper-supply-demand`、`https://www.zhemin.ltd/cn/moments/tibet` 请求编入索引，三个请求均获 Search Console 受理。请求后的索引快照仍为“Google 无法识别此网址”，需要等待后续抓取与索引处理。
- sitemap 后台复核保持成功、32 个网页；裸域三个目标页面均跳转到对应 www 地址。

本次通过 CLI 从本地已验证源码快照发布，基于 Git `8f976ab7d0a7f5984be5eb5637eb0e9a27757d40` 加本次 SEO / GEO 改动；相同的运行代码与测试已纳入本次 SEO / GEO Git 提交。Vercel 已关联 GitHub `zheminlin266/zhemin`，自动 Git 部署启用，生产分支为 `main`，没有忽略构建命令。将本次 PR 合并到 `main` 后，后续 Git 生产部署会包含这些优化。以下为上线前的历史验证记录。

## 2026-10-16 更新

本次 SEO / GEO 改动已完成本地验证，尚未部署。Search Console 验证与 sitemap 提交已在正式网域属性实际完成。

- 首页五个相册标签改为具有真实 `href` 的链接；普通点击继续切换照片条，Enter / 空格操作保留，Ctrl 点击及鼠标中键可打开相册。无 JavaScript 时可直接进入相册。相同样式对应 `aria-current`，没有新增可见内容。
- 十个双语相册页面在初始 HTML 输出 ImageGallery / ImageObject，描述实际展示的 83 张原始照片（双语共 166 个对象），包含本地化名称、原图、缩略图与以像素计的实际尺寸。未推断摄影者、版权、许可或拍摄日期。
- Pendle 市场观察的四个“前文”链接改为对应语言的本站文章，其中章节链接指向已经存在的标题锚点。正文文字与图片不变。
- 铜供需文章首张图使用 eager / high 优先级，后续图片仍延迟加载；图片资源、尺寸和样式保持一致。

| 验证 | 结果 |
|---|---|
| `npm run build` | 22 项测试通过；生产构建生成 39 个静态页面/元数据端点 |
| 32 页 Googlebot 请求及初始 HTML | 全部 200；canonical、双语关系、唯一标题/描述、JSON-LD、页面锚点通过 |
| 不执行 JavaScript 的首页链接图 | 32 / 32 个 sitemap 页面可从中英文首页到达 |
| 相册浏览行为 | 中英文无 JavaScript 导航、普通点击、Enter、空格、Ctrl 点击及中键通过 |
| 13 组视觉回归 | 中英文首页桌面/移动端深浅主题、铜供需文章桌面/移动端、中文相册通过；文字、布局区域为 0 差异。图片资源未改动；Chrome 对相同照片的少量重采样差异单独限制在每通道 16、差异像素平均每通道 1 以内 |
| 收录基线 | 32 页逐一检查：7 已收录、24 Google 未知、1 历史替代 canonical；16 个中文页均未收录 |
| 主站近 28 天搜索效果 | 2026-09-16 至 2026-10-13：0 点击、62 曝光、CTR 0%、平均排名 8.0；使用主站 URL 正则排除项目子域 |
| Search Console sitemap | `sc-domain:zhemin.ltd` 已验证；主站 sitemap 2026-10-16 提交并成功读取，发现 32 网页、0 视频；原 Metals sitemap 保持成功、106 页 |

“发现 32 页”不等于全部已收录。本地改动尚未上线，不能据此报告线上收录、排名、Core Web Vitals 或 AI 引用已经改善。[Google 的 AI 搜索说明](https://developers.google.com/search/docs/appearance/ai-features)仍以可收录、内部链接及与正文一致的结构化信息为基础；本次没有将相册标记描述为专门的 AI 排名机制或富媒体结果保证。

以下为 2026-10-06 的历史验证记录。

验证日期：2026-10-06。以下记录针对本地生产构建；不代表生产站点已部署或重新收录。

## 实现

- 正式域名统一为 `https://www.zhemin.ltd`，用于 canonical、双语及默认语言链接、分享元信息、结构化数据、robots 和 sitemap。
- 移除根布局继承的统一作者/creator，以及 Article 中硬编码的作者。首页人物身份与文章作者不关联。
- 移除由月份补齐的发布时间和 sitemap 更新时间；保留原有正文、署名、来源、展示日期、排序和交互。
- 首页添加 WebSite/Person；32 个页面配置分享图片及双语说明。文章仅把实际正文配图写入 Article.image。
- 没有新增依赖、路由、数据库、分析服务或训练抓取规则。
- PR 的依赖审计发现现有间接依赖 `source-map-js` 的安全告警，将锁定版本从 1.2.1 更新至兼容补丁 1.2.2；未调整直接依赖或审计规则。[安全公告](https://github.com/advisories/GHSA-68fv-2mgg-jv7q)

## 已通过的检查

| 检查 | 结果 |
|---|---|
| `npm run build`，包括 `npm test` | 20 项测试通过；生产构建成功，生成 39 个静态页面/元数据端点 |
| `npm audit --omit=dev` | 更新现有间接依赖的补丁版本后，0 项漏洞 |
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
