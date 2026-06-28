# 📝 Open Web Blog Kit

一个轻量级、开箱即用的 Material Design 3 风格博客框架。纯静态站点，通过 JSON 配置驱动。

---

## 核心特性

- 🎨 **Material Design 3** — 支持亮/暗主题，动态主题色
- 📝 **Markdown 写作** — 使用 `.md` 文件编写博客文章
- ⚡ **SPA 路由** — Hash 路由，无刷新翻页
- 🏷️ **标签分类** — 文章标签系统 + 首页话题卡片筛选
- 📊 **Hero 统计** — 首页展示文章数、标签数
- ⏱️ **瞬间/Timeline** — 轻量时间线功能
- 🔌 **扩展系统** — 插件式扩展加载器
- 📱 **响应式** — 浮动导航栏 + 侧栏文章页

---

## 快速导航

| 文档 | 说明 |
|------|------|
| [快速开始](guide/quick-start.md) | 3 分钟搭建博客 |
| [目录结构](guide/structure.md) | 完整项目文件树 |
| [配置说明](guide/config.md) | config.json 详解 |
| [编写文章](guide/writing.md) | 如何添加博客文章 |
| [API 参考](api/app.md) | JS 模块文档 |
| [部署](guide/deploy.md) | GitHub Pages 部署 |

## 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 + CSS3 | 页面结构与 MD3 样式 |
| Vanilla JS | 框架逻辑（~18KB 核心代码） |
| [marked.js](https://marked.js.org/) | Markdown → HTML |
| [highlight.js](https://highlightjs.org/) | 代码语法高亮 |
