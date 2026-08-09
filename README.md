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

新增内容应同时维护中英文版本，并保持对应 URL 的语义一致。

## Visual_Rules

页面视觉规范见 [`Visual_Rules.md`](./Visual_Rules.md)。新增或调整界面时应遵循其中的字体、布局、色彩、组件、交互和无障碍约定。
