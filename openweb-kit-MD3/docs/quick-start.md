# 🚀 快速开始

5 分钟搭建你的文档站点。

---

## 第一步：复制框架

```
your-project/
├── page/          ← 复制整个 page 目录
│   ├── css/       ← style/theme/layout/components.css
│   ├── js/app.js  ← 核心逻辑
│   └── index.html ← 入口页面
└── docs/          ← 你的 .md 文档放这里
    └── README.md
```

---

## 第二步：编写文档

在 `docs/` 目录下创建 `.md` 文件：

```markdown
# 我的文档

这是我的第一个文档页面。

## 介绍

内容写在这里...
```

---

## 第三步：配置导航

编辑 `page/js/app.js`，在 `ROUTES` 对象中添加你的页面：

```javascript
const ROUTES = {
  '/':       { file: 'README.md',     title: '首页' },
  '/guide':  { file: 'guide.md',      title: '使用指南' },
  '/api':    { file: 'api.md',        title: 'API 参考' },
};
```

对应在 `page/index.html` 的侧栏 `<ul id="navList">` 中添加导航项：

```html
<li class="nav-item" data-route="/guide">
  <a href="#/guide" class="nav-link">
    <span class="nav-label">使用指南</span>
  </a>
</li>
```

---

## 第四步：启动预览

在项目根目录运行：

```bash
python3 -m http.server 8000
```

浏览器打开 `http://localhost:8000/page/index.html`

---

## 链接文档

在 `.md` 文件中直接写文件名即可链接到其他页面：

```markdown
请看 [使用指南](guide.md)
更多细节见 [API 参考](api.md#认证)
```

框架会自动拦截这些链接并跳转到正确页面。
