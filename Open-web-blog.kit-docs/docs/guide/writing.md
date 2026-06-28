# ✍️ 编写文章

文章使用 Markdown 编写，放在 `page/` 目录下。

---

## 添加新文章

### 1. 创建 .md 文件

在 `page/` 目录下创建 `my-first-post.md`：

```markdown
# 我的第一篇文章

这里是文章内容。支持所有 Markdown 语法。

## 代码示例

\`\`\`javascript
console.log("Hello, Open Web Blog!");
\`\`\`

## 图片

![示例图片](https://example.com/image.png)

## 链接

更多内容请阅读 [Markdown 指南](https://www.markdownguide.org/)
```

### 2. 在 config.json 注册

编辑 `main/config.json` 的 `nav` 数组：

```json
{
  "nav": [
    {
      "route": "/hi",
      "file": "hi!.md",
      "title": "👋 Hi! 欢迎来到我的博客",
      "date": "2026-06-15",
      "tags": ["博客", "首页"],
      "excerpt": "这是我的第一篇博客文章！"
    },
    {
      "route": "/my-first-post",
      "file": "my-first-post.md",
      "title": "我的第一篇文章",
      "date": "2026-06-28",
      "tags": ["技术"],
      "excerpt": "一篇示例文章。"
    }
  ]
}
```

### 3. 刷新

保存后刷新首页，新文章卡片自动出现。点击即可阅读。

---

## Markdown 支持

| 语法 | 效果 |
|------|------|
| `# 标题` ~ `###### 标题` | H1~H6 |
| `**粗体**` `*斜体*` | **粗体** *斜体* |
| `- 列表` `1. 列表` | 无序/有序列表 |
| `` `code` `` | 行内代码 |
| ` ```语言\n...\n``` ` | 代码块（highlight.js 高亮） |
| `[链接](url)` | 超链接 |
| `![图片](url)` | 图片（支持灯箱） |
| `> 引用` | 引用块 |

---

## 文章元数据

文章卡片在首页展示的信息都来自 `config.json` 的 nav 配置：

| 数据 | 来源 |
|------|------|
| 标题 | `title` 字段 |
| 日期 | `date` 字段 |
| 标签 | `tags` 数组 |
| 摘要 | `excerpt` 字段 |
| 文章内容 | `.md` 文件本身 |
| 阅读时间 | 自动计算（~300字/分钟） |

---

## 截图理解

当文章页渲染时（page.js）：

1. 从 `config.json` 读取 `nav`，构建 `ROUTES` 映射
2. hash 路由匹配 → 获取 `file` 路径
3. `fetch('../page/hi!.md')` 获取 Markdown 原文
4. `marked.parse()` 渲染为 HTML
5. 自动计算阅读时间、生成目录（TOC）
6. 注入页面 DOM
