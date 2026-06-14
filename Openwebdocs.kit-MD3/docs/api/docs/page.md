# 📄 页面 API

`OWD.getPage()` 和 `OWD.cache` 用于读写页面内容。

---

## OWD.getPage(route)

异步获取指定路由的页面原始 Markdown 内容。

```javascript
const page = await OWD.getPage('/quick-start');
console.log(page.title);   // "快速开始"
console.log(page.file);     // "quick-start.md"
console.log(page.content);  // 原始 Markdown 文本
```

---

## 读取页面元数据

```javascript
const page = await OWD.getPage('/css');
const firstLine = page.content.split('\n')[0];
console.log(firstLine);  // "# 🎨 CSS 架构"
```

---

## 统计页面信息

```javascript
async function pageStats(route) {
  const page = await OWD.getPage(route);
  if (!page) return null;
  const lines = page.content.split('\n');
  const headings = lines.filter(l => l.startsWith('##'));
  return {
    title: page.title,
    file: page.file,
    totalLines: lines.length,
    headingsCount: headings.length,
    headings: headings.map(h => h.replace(/^#+\s*/, ''))
  };
}

console.log(await pageStats('/css'));
```

---

## OWD.cache

已缓存的页面内容对象，key 为 route。

```javascript
console.log(Object.keys(OWD.cache));
// ["/", "/quick-start", "/css"]

// 查看某页面是否已缓存
if (OWD.cache['/guide']) {
  console.log('已访问过 /guide');
}
```

---

## 批量读取

```javascript
async function loadAllPages() {
  await Promise.all(Object.keys(OWD.routes).map(r => OWD.getPage(r)));
  console.log(`已缓存 ${Object.keys(OWD.cache).length} 个页面`);
}

// 生成全站索引
function buildIndex() {
  const index = {};
  for (const [route, page] of Object.entries(OWD.cache)) {
    index[route] = {
      title: page.title,
      headings: page.content.match(/^##\s+.+$/gm)?.map(h => h.replace('## ', '')) || []
    };
  }
  return index;
}
```
