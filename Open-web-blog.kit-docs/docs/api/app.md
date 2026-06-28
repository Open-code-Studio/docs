# 📄 app.js — 首页逻辑

**路径**: `main/js/app.js` | **大小**: 12,065 字节 | **自执行函数**

---

## 职责

`app.js` 运行在首页 `main/index.html`，负责：

1. 加载 `config.json` 配置
2. 动态应用主题色（themeColor）
3. 渲染 Hero 区域统计（文章数/标签数/字数）
4. 渲染话题卡片（Topic Cards）和标签筛选栏
5. 渲染文章卡片列表
6. 处理标签点击筛选逻辑

---

## 核心数据结构

### ROUTES
从 config.json nav 解析出来的路由表：

```javascript
ROUTES = {
  "/hi": { file: "hi!.md", title: "👋 Hi!...", date: "2026-06-15", tags: ["博客","首页"], excerpt: "..." }
}
```

### NAV
config.json 的 `nav` 数组的引用，支持 `children` 嵌套。

### SITE
config.json 的 `site` 配置，含 `themeColor`。

---

## 核心函数

### `applyThemeColor(hex)`
根据 hex 色值动态计算 primary、primary-container、surface-tint 等 MD3 颜色。

原理：提取 RGB → 根据亮度计算深/浅色调因子（0.75 / 1.4）→ 设置 CSS 变量。

### `loadConfig()`
异步加载 `config.json` → 赋值 SITE → 调用 applyThemeColor → 解析 nav 生成 ROUTES。

### `renderHomePage(filterTag)`
核心渲染函数：
- 计算 allPosts / tagCounts
- 更新 Hero 统计数字
- 渲染话题卡片（`topicCardsWrapper`）
- 渲染标签胶囊（`tagFilterList`）
- 渲染文章卡片列表（`postList`）
- 每张卡片包含标题、摘要、日期、标签、"阅读"按钮

### `bindFilterHandlers()`
给话题卡片和标签胶囊绑定 click 事件，更新 activeFilter 并重新渲染。

---

## 初始化流程

```
DOMContentLoaded
  → loadConfig()
  → bindFilterHandlers()
  → renderHomePage()
```

---

## 标签筛选

用户点击标签胶囊 → `renderHomePage(tagName)` → 过滤文章 → 更新界面。

```javascript
const posts = filterTag === 'all' 
  ? allPosts 
  : allPosts.filter(p => p.tags && p.tags.includes(filterTag));
```
