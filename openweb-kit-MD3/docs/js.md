# ⚙️ JS 配置

`app.js` 是框架的核心，负责路由、文档加载和交互。

---

## ROUTES 配置

定义文档路由映射：

```javascript
const ROUTES = {
  '/':       { file: 'README.md',  title: '首页' },
  '/guide':  { file: 'guide.md',   title: '使用指南' },
  '/about':  { file: 'info.md',    title: '关于' },
};
```

| 字段 | 说明 |
|------|------|
| key | Hash 路由路径，如 `/guide` |
| file | docs 目录下对应的文件名 |
| title | 页面标题（显示在顶栏和浏览器标签） |

---

## DOC_DIR

文档目录相对于 `index.html` 的路径：

```javascript
const DOC_DIR = '../docs';
```

---

## 核心功能

### Hash 路由

URL 中的 `#/guide` → 加载 `docs/guide.md` → 渲染到页面

```javascript
window.addEventListener('hashchange', handleRoute);
```

### 自动链接拦截

文档中的 `.md` / `.txt` 链接被自动拦截，转为 Hash 路由：

```markdown
[指南](guide.md)  →  拦截  →  navigate('#/guide')
```

如果链接文件未在 ROUTES 中配置，文件名本身会作为路由 fallback。

### 章节锚点

```markdown
[API 认证](api.md#认证)  →  加载 api.md  →  滚动到 #认证 章节
```

### 主题切换

- `localStorage` 保存用户偏好
- 自动跟随系统主题（首次访问）
- `themeToggle` 按钮手动切换

---

## 扩展

框架结构简洁，可根据需要自行扩展：

- 添加新的 Renderer（如自定义图表、公式渲染）
- 修改 `preprocessMarkdown` 处理宏注释
- 增加搜索功能
- 接入分析统计
