# 📄 extensions.js — 扩展系统

**路径**: `main/js/extensions.js` | **大小**: 10,915 字节 | **自执行函数**

---

## 职责

扩展系统允许在不修改框架代码的情况下添加新功能。支持加载扩展的 CSS、JS、HTML 页面。

---

## 架构

```
expand/
├── config.json         ← 扩展总开关（哪些扩展启用）
└── expand-test/        ← 示例扩展
    ├── config.json     ← 扩展自身配置（CSS/JS/页面列表）
    ├── *.css           ← 扩展样式
    ├── *.js            ← 扩展脚本
    └── *.html          ← 扩展页面
```

---

## 扩展配置（expand/config.json）

```json
{
  "extensions": {
    "expand-test": {
      "enabled": true
    }
  }
}
```

`enabled: true/false` — 控制扩展开关。

---

## 扩展自身配置（expand/扩展名/config.json）

```json
{
  "name": "扩展名称",
  "version": "1.0.0",
  "css": ["style.css"],
  "scripts": ["main.js"],
  "pages": [
    {
      "file": "index.html",
      "title": "扩展页面",
      "navTitle": "扩展导航",
      "icon": "puzzle"
    }
  ]
}
```

每个扩展可以：
- `css` — CSS 文件数组，自动注入 `<link>`
- `scripts` — JS 文件数组，自动注入 `<script>`
- `pages` — 页面列表，自动注册路由并在浮动导航添加链接

---

## 全局 API

```javascript
window.__EXTENSIONS = {
  loaded: [],       // 已加载的扩展列表
  pages: {},        // 注册的扩展页面 { 'ext-id/file': {...} }
  styles: []        // 已注入的 CSS link 元素
}
```

---

## 核心函数

### `loadMasterConfig()`
`fetch('../expand/config.json')` → 获取启用了哪些扩展。

### `loadExtConfig(extId)`
`fetch('../expand/extId/config.json')` → 获取某个扩展的配置。

### `injectCSS(extId, cssFile)`
动态创建 `<link rel="stylesheet">` 并插入 `<head>`。

### `injectScript(extId, jsFile)`
动态创建 `<script defer>` 并插入 `<body>`。

### `registerPages(extId, extConfig)`
将扩展页面注册到 `window.__EXTENSIONS.pages`，路由格式 `/ext/扩展ID/文件名`。

### `addNavLinks()`
在浮动导航栏 `.floating-nav__links` 中添加扩展的导航链接。

### `addSidebarItems()`
在 `page.html` 的侧栏中添加"扩展"分组 + 扩展页面链接。

### `loadExtPage(page)`
异步加载扩展的 HTML 页面并渲染到 `#docBody`。

### `handleExtRoute(route)`
解析 hash 路由（如 `#/ext/expand-test/index.html`），提取扩展 ID 和文件名，调用 `loadExtPage`。

---

## 初始化

```
DOMContentLoaded
  → loadExtensions()
    → loadMasterConfig()
    → 遍历 enabled 扩展
      → loadExtConfig() + injectCSS() + injectScript() + registerPages()
    → addNavLinks() + addSidebarItems()
  → watchRouting()
```
