# ℹ️ 关于 Openwebdocs.kit-MD3

**Openwebdocs.kit-MD3** 是一个轻量级的文档站点框架，遵循 Material Design 3 设计规范。

---

## 设计理念

- **JSON 驱动**：只需编辑 `config.json`，零代码定制
- **零依赖**：不需要 Node.js、打包工具或框架
- **即开即用**：复制模板、改配置、写 Markdown、启动服务器
- **MD3 原生**：基于 CSS 自定义属性，完整支持亮/暗主题

---

## 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 + CSS3 | 页面结构、MD3 样式 |
| Vanilla JS | 路由、配置加载、事件处理 |
| [marked.js](https://marked.js.org/) | Markdown → HTML |
| [highlight.js](https://highlightjs.org/) | 代码高亮 |

---

## 文件说明

```
page/
├── config.json       ← 🔧 站点配置（修改这个即可）
├── index.html        ← 入口页面模板
├── js/app.js         ← 框架核心逻辑
└── css/
    ├── theme.css     ← MD3 颜色变量
    ├── layout.css    ← 布局系统
    ├── components.css← UI 组件
    └── markdown.css  ← 文档渲染样式
```

---

## 使用本框架的站点

- [OCS 主页](../../OCS/page/index.html) — Open-code-Studio 组织文档
- [JMCL 文档](../../JMCL/page/index.html) — Minecraft 启动器文档
- [OWD.K-MD3 模板](../../OWD.K-MD3/page/index.html) — 框架模板
