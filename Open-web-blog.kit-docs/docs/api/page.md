# 📄 page.js — 文章页逻辑

**路径**: `main/js/page.js` | **大小**: 14,155 字节 | **自执行函数**

---

## 职责

`page.js` 运行在 `main/page.html`，负责：

1. 加载 config.json 构建路由
2. 渲染侧栏导航（含嵌套）
3. 根据 hash 路由加载对应 Markdown 文件
4. Markdown → HTML 渲染
5. 生成文章目录（TOC）
6. 计算阅读时间
7. 主题切换

---

## 核心函数

### `loadArticle(route)`
**这是核心**，处理文章加载全流程：

```
1. ROUTES[route] 获取配置
2. 更新 docTitle、document.title
3. fetch(`${docDir}/${config.file}`) 获取 .md 原文
4. preprocessMarkdown() 清理宏注释
5. marked.parse() 渲染 Markdown
6. replaceChildren() 注入 DOM（Safari WebView 兼容）
7. generateTOC() 生成目录
8. getReadingTime() 计算阅读时间
9. 渲染 docMeta（日期 + 阅读时间 + 标签）
```

### `generateTOC(contentElement)`
遍历文档中所有 `h2`、`h3` 标签 → 生成目录链接 → 注入 `#tocList`。

### `getReadingTime(text)`
```javascript
const words = text.replace(/[^\u4e00-\u9fff\w]/g, ' ').split(/\s+/).length;
const minutes = Math.max(1, Math.ceil(words / 300)); // 300字/分钟
```

### `renderSidebar()`
递归渲染导航结构，支持 `children` 嵌套：
- 有 children → 渲染为类别标签（不可点击）
- 无 children → 渲染为导航链接（可点击）

### `preprocessMarkdown(md)`
清理 markdown 中的宏注释：
- `<!-- #BEGIN ... -->` / `<!-- #END ... -->`
- `<!-- #PROPERTY ... -->`
- `<div align="center">...</div>`

---

## 路由处理

```javascript
function handleRoute() {
  const hash = window.location.hash.slice(1);
  if (hash && hash.startsWith('/')) {
    if (hash.startsWith('/ext/')) return;  // 扩展路由由 extensions.js 处理
    loadArticle(hash);
  } else if (!hash) {
    // 无 hash → 加载第一篇
    const first = NAV.filter(i => !i.children)[0];
    if (first) window.location.hash = '#' + first.route;
  }
}
```

---

## 特殊处理：Safari WebView

```javascript
// Safari WebView blocks images loaded via innerHTML on a live node
const temp = document.createElement('div');
temp.innerHTML = html;
docBody.replaceChildren(...temp.childNodes);
```

先解析到离屏 div，再用 `replaceChildren` 转移子节点。
