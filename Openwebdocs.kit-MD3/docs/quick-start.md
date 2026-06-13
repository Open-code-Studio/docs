# 🚀 快速开始

3 分钟搭建你的文档站点。

---

## 第一步：复制框架

复制 `OWD.K-MD3` 模板（或在 [GitHub](https://github.com/Open-code-Studio) 下载）：

```
your-project/
├── page/
│   ├── config.json    ← 🔧 站点配置（只需改这个！）
│   ├── index.html     ← 入口页面
│   ├── js/app.js      ← 框架核心（无需修改）
│   └── css/           ← MD3 样式（无需修改）
└── docs/              ← 你的 .md 文档放这里
    └── README.md
```

---

## 第二步：配置站点

编辑 `page/config.json`：

```json
{
  "site": {
    "name": "我的项目",
    "titleSuffix": "我的项目文档",
    "docDir": "../docs"
  },
  "nav": [
    { "route": "/", "file": "README.md", "title": "首页", "icon": "home" },
    { "route": "/guide", "file": "guide.md", "title": "指南", "icon": "schedule" }
  ],
  "sidebarLinks": [
    { "title": "GitHub", "url": "https://github.com/xxx", "external": true }
  ]
}
```

| 字段 | 说明 |
|------|------|
| `site.name` | 站点名称（显示在顶栏） |
| `site.titleSuffix` | 浏览器标签后缀 |
| `site.docDir` | 文档目录相对于页面路径 |
| `nav[].route` | Hash 路由路径 |
| `nav[].file` | 对应的 .md 文件名 |
| `nav[].title` | 侧栏显示名称 |
| `nav[].icon` | 图标名（见下方） |

可用图标：`home` `schedule` `devices` `computer` `handshake` `translate` `description` `info` `projects` `join` `contact` `customize`

---

## 第三步：编写文档

在 `docs/` 目录下创建 `.md` 文件：

```markdown
# 我的文档

这是我的第一个文档页面。

## 链接

[查看指南](guide.md)
[跳转到章节](guide.md#代码示例)
```

---

## 第四步：启动预览

```bash
python3 -m http.server 8000
```

浏览器打开 `http://localhost:8000/page/index.html`

---

## 之后

- 添加新页面 → 在 `config.json` 的 `nav` 中添加条目
- 新增文档 → 在 `docs/` 中创建 `.md` 文件
- 修改导航 → 编辑 `config.json` 即可，无需改动 HTML/JS
