# 🔍 搜索 API

`OWD.search()` 和 `OWD.searchAll()` 提供全文搜索功能。

---

## OWD.search(query)

搜索已访问过的页面缓存，同步返回结果。

```javascript
const results = OWD.search('config.json');

// 返回数组：
// [
//   {
//     route: '/js',
//     title: 'JS 配置',
//     snippet: '...所有站点配置集中在 page/config.json...',
//     file: 'js.md'
//   }
// ]
```

---

## OWD.searchAll(query)

搜索所有页面（包括尚未访问的），异步加载并搜索。

```javascript
const results = await OWD.searchAll('MD3');

console.table(results);
// ┌─────────┬──────────────┬──────────────────┬──────────┐
// │ route   │ title        │ snippet          │ file     │
// ├─────────┼──────────────┼──────────────────┼──────────┤
// │ /       │ 概览         │ ...Material D... │ README...│
// │ /css    │ CSS 架构     │ ...MD3 颜色令... │ css.md   │
// └─────────┴──────────────┴──────────────────┴──────────┘
```

---

## 构建搜索 UI

```javascript
async function doSearch(input) {
  const q = input.value.trim();
  if (!q) return;
  const results = await OWD.searchAll(q);
  renderResults(results);
}

function renderResults(results) {
  const html = results.map(r => `
    <div onclick="OWD.navigate('${r.route}')" style="cursor:pointer;padding:12px;border-bottom:1px solid #333">
      <strong>${r.title}</strong>
      <p style="font-size:12px;color:#888">${r.snippet}</p>
    </div>
  `).join('');
  document.getElementById('searchResults').innerHTML = html;
}
```

---

## 性能提示

- `search()` 同步，搜已有缓存，毫秒级
- `searchAll()` 异步，先加载所有页面再搜，适合首次使用
- 缓存随浏览自动积累，浏览越多次搜索越快

---

## 类型定义

```typescript
interface SearchResult {
  route: string;
  title: string;
  snippet: string;
  file: string;
}

interface OWD {
  search(query: string): SearchResult[];
  searchAll(query: string): Promise<SearchResult[]>;
}
```
