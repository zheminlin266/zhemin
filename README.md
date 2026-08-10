# zhemin-portfolio

个人网站，使用 Next.js、React 和 MDX 构建。

## 安装

```bash
npm ci
```

## 开发

```bash
npm run dev
```

## 测试

```bash
npm test
```

`npm run check` 保留为现有测试命令的兼容入口。

## 构建

```bash
npm run build
```

构建前会自动执行测试。

## 双语内容约定

中文页面继续使用现有 URL；对应的英文页面使用同一路径加 `/en`，例如：

- 中文：`/articles/example`
- English：`/en/articles/example`

新增内容时：

1. 在 `app/content/registry.mjs` 登记路径、日期、双语标题和描述。
2. 在内容目录同时维护 `content.cn.mdx` 与 `content.en.mdx`。
3. 为中文和 `/en` 英文路径各提供一个轻量 `page.js` 包装页。
4. 图片放在 `public/` 对应路径，提供准确的替代文本和来源，并在 `app/content/image-dimensions.mjs` 登记尺寸。

`npm test` 会检查注册表、双语路由、标题层级与本地资源引用。

## Visual_Rules

页面视觉规范见 [`Visual_Rules.md`](./Visual_Rules.md)。新增或调整界面时应遵循其中的字体、布局、色彩、组件、交互和无障碍约定。
