# ⚙️ 配置说明

`main/config.json` 是博客的**核心配置文件**。所有修改在这里完成，无需改代码。

---

## 完整配置示例

```json
{
  "site": {
    "name": "Open Web Blog",
    "titleSuffix": "博客",
    "meta": "记录技术思考，分享编程心得",
    "docDir": "../page",
    "themeColor": "#4AA26F"
  },
  "nav": [
    {
      "route": "/hi",
      "file": "hi!.md",
      "title": "👋 Hi! 欢迎来到我的博客",
      "date": "2026-06-15",
      "icon": "home",
      "tags": ["博客", "首页"],
      "excerpt": "这是我的第一篇博客文章！"
    }
  ],
  "sidebarLinks": [],
  "about": { ... },
  "links": { ... }
}
```

---

## site — 站点信息

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 站点名称（显示在标题栏和导航） |
| `titleSuffix` | string | 浏览器标签页后缀 |
| `meta` | string | 站点描述 |
| `docDir` | string | 文章目录相对路径（默认 `"../page"`） |
| `themeColor` | string | 主题色 hex（如 `"#4AA26F"`） |

---

## nav — 文章列表

每篇文章一个对象：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `route` | string | ✅ | Hash 路由，如 `"/hello"` |
| `file` | string | ✅ | page 目录下的文件名 |
| `title` | string | ✅ | 文章标题 |
| `date` | string | 否 | 发布日期 `YYYY-MM-DD` |
| `tags` | array | 否 | 标签数组，用于分类筛选 |
| `excerpt` | string | 否 | 文章摘要，显示在卡片上 |
| `icon` | string | 否 | 侧栏图标名（`home`/`book`/`code`/`tags`） |

---

## about — 关于页面

```json
{
  "about": {
    "description": "一个简洁、优雅的开源技术博客",
    "sections": [
      {
        "title": "🙋‍♂️ 关于作者",
        "text": "这里记录着我的学习笔记和技术心得。"
      },
      {
        "title": "🛠 技术栈",
        "tags": ["HTML5", "CSS3", "JavaScript"]
      },
      {
        "title": "📬 联系方式",
        "links": [
          { "label": "GitHub", "url": "https://github.com" }
        ]
      }
    ]
  }
}
```

| 字段 | 说明 |
|------|------|
| `description` | 关于页副标题 |
| `sections[].title` | 段落标题 |
| `sections[].text` | 文本内容（纯文本） |
| `sections[].tags` | 标签数组（渲染为 Capsule） |
| `sections[].links` | 链接数组，每项含 `label` + `url` |

---

## links — 友情链接

```json
{
  "links": {
    "title": "🔗 友情链接",
    "description": "欢迎交换友链！",
    "items": [
      { "name": "GitHub", "desc": "代码平台", "url": "https://github.com", "icon": "github" }
    ]
  }
}
```
