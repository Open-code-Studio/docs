# ⚙️ JS 配置

所有站点配置集中在 `page/config.json`，无需修改 `app.js`。

---

## config.json 结构

```json
{
  "site": {
    "name": "站点名称",
    "titleSuffix": "浏览器标签后缀",
    "meta": "页脚元信息",
    "docDir": "../docs"
  },
  "nav": [
    { "route": "/", "file": "README.md", "title": "首页", "icon": "home" }
  ],
  "sidebarLinks": [
    { "title": "显示名", "url": "链接地址", "external": true }
  ]
}
```

---

## 加载流程

```
页面加载
  → fetch config.json
    → 解析 nav → 动态渲染侧栏导航
    → 解析 sidebarLinks → 动态渲染底部链接
    → 覆盖站点名称、标题等
  → 启动 Hash 路由
  → 加载对应 .md 文件
```

---

## 可用图标

| 图标名 | 用途 |
|--------|------|
| `home` | 首页 |
| `schedule` | 快速开始 / 发布计划 |
| `devices` | 平台 / 架构 |
| `computer` | 技术 / 代码 |
| `handshake` | 贡献指南 |
| `translate` | 本地化 |
| `description` | 文档 / 许可 |
| `info` | 关于 |
| `projects` | 项目列表 |
| `join` | 加入我们 |
| `contact` | 联系方式 |
| `customize` | 设置 / 自定义 |

---

## 链接拦截

文档中的 `.md` / `.txt` 链接会被自动拦截：

```markdown
[指南](guide.md)        →  跳转 #/guide
[关于](about.md#章节)   →  跳转 #/about 并滚动到章节
```

`config.json` 中配置过的文件名使用友好路由，未配置的自动用文件名作为路由。

---

## 默认值

`config.json` 加载失败时，使用 `app.js` 中的硬编码默认值作为回退，确保站点不会白屏。
