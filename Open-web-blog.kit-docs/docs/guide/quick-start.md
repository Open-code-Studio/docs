# 🚀 快速开始

3 分钟搭建你的博客。

---

## 第一步：下载

克隆仓库：

```bash
git clone https://github.com/Open-code-Studio/Open-web-blog.kit.git my-blog
cd my-blog
```

---

## 第二步：启动

```bash
python3 -m http.server 8000
```

浏览器打开 `http://localhost:8000/`，自动跳转到 `main/index.html`。

---

## 第三步：写文章

在 `page/` 目录创建 `.md` 文件（如 `my-post.md`），然后在 `main/config.json` 的 `nav` 数组中添加：

```json
{
  "route": "/my-post",
  "file": "my-post.md",
  "title": "我的第一篇文章",
  "date": "2026-06-28",
  "tags": ["技术", "博客"],
  "excerpt": "文章摘要..."
}
```

刷新首页即可看到新文章。

---

## 第四步：自定义

编辑 `main/config.json`：
- `site.name` — 博客名称
- `site.themeColor` — 主题色（默认 `#4AA26F` 绿色）
- `about` — 关于页面内容
- `links` — 友情链接
