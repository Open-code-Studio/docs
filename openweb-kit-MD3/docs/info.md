# ℹ️ 关于 openweb.kit-MD3

**openweb.kit-MD3** 是一个轻量级的文档站点框架，遵循 Material Design 3 设计规范。

---

## 设计理念

- **零依赖**：不需要 Node.js、打包工具或框架
- **即开即用**：复制文件、放入 Markdown、启动服务器
- **MD3 原生**：基于 CSS 自定义属性，完整支持亮/暗主题
- **可组合**：CSS 和 JS 分层清晰，易于理解和修改

---

## 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 + CSS3 | 页面结构、Material Design 3 样式 |
| Vanilla JS | Hash 路由、Fetch 文档、事件处理 |
| [marked.js](https://marked.js.org/) | Markdown → HTML 渲染 |
| [highlight.js](https://highlightjs.org/) | 代码块语法高亮 |
| Google Fonts (Noto Sans SC) | 中文字体 |

---

## 框架文件清单

```
page/
├── index.html          # 入口：工具栏、侧栏、内容区
├── css/
│   ├── theme.css       # 66 MD3 颜色变量 + 全局样式
│   ├── layout.css      # 固定顶栏 / 侧栏 / Flex 内容区
│   ├── components.css  # Icon Button / Blockquote / Kbd
│   └── markdown.css    # 标题 / 代码 / 表格 / 图片
└── js/
    └── app.js          # 路由 / 文档加载 / 链接拦截 / 主题
```

---

## 使用本框架的站点

- [OCS 主页](../../OCS/page/index.html) — Open-code-Studio 组织文档
- [JMCL 文档](../../JMCL/page/index.html) — Minecraft 启动器文档
