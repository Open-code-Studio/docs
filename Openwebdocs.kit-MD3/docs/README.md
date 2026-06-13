# 🧰 Openwebdocs.kit-MD3

轻量级、开箱即用的 **Material Design 3 文档站点框架**。

只需编辑 `config.json` + 放入 `.md` 文件，即可拥有一个完整的文档网站。

---

## 特性

- 🎨 **MD3 主题** — 完整 Material Design 3 调色板，亮/暗主题
- 🔧 **JSON 驱动** — 所有配置集中在 `config.json`，无需改代码
- 📝 **Markdown 渲染** — 所有页面由 `.md` 文件驱动
- ⚡ **SPA 路由** — Hash 路由，无刷新切换
- 📱 **响应式** — 桌面侧栏常驻 + 移动端抽屉
- 🌈 **代码高亮** — highlight.js 集成
- 🔗 **自动链接** — `.md` 文件间链接自动识别
- 🔍 **章节锚点** — 可链接到文档指定章节
- 🎯 **零依赖** — 纯 HTML/CSS/JS，不需要 Node.js

---

## 快速导航

| 文档 | 说明 |
|------|------|
| [快速开始](quick-start.md) | 3 分钟搭建你的文档站 |
| [CSS 架构](css.md) | theme / layout / components / markdown |
| [JS 配置](js.md) | config.json 配置说明 |
| [自定义主题](customize.md) | 修改颜色和字体 |
| [GitHub Pages 部署](deploy.md) | 免费部署到 GitHub Pages |
| [关于](info.md) | 框架介绍与技术细节 |

---

## 目录结构

```
your-project/
├── page/
│   ├── config.json       ← 🔧 站点配置（只需改这个）
│   ├── index.html         ← 入口页面
│   ├── js/app.js          ← 框架核心
│   └── css/               ← MD3 主题
└── docs/
    └── *.md               ← 你的文档
```

---

## 对比旧版

| 操作 | 旧版（v1） | 新版（v2 JSON） |
|------|----------|----------------|
| 添加页面 | 改 `app.js` ROUTES + 改 `index.html` 侧栏 | 只改 `config.json` nav 数组 |
| 改站点名 | 改 `index.html` + `app.js` 多处 | 只改 `config.json` site.name |
| 换图标 | 手写 SVG 到 HTML | 改 `config.json` icon 字段 |
| 换侧栏链接 | 改 HTML | 改 `config.json` sidebarLinks |
