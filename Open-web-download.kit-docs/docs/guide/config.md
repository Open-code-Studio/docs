# ⚙️ 配置说明

`page/config.json` 是下载站的核心配置文件。**注意**：`page/js/config.js` 与之同步，两份都需修改。

---

## site — 站点信息

```json
{
  "site": {
    "name": "Open-web-download.kit",
    "description": "一个 Material Design 3 风格的静态下载站",
    "language": "zh-CN",
    "theme": {
      "default": "dark",
      "allowToggle": true
    },
    "primaryColor": "#4AA26F"
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 站点名称（显示在 Top Bar 和浏览器标签） |
| `description` | string | 站点描述（显示在 Hero 区域） |
| `language` | string | 语言代码 `"zh-CN"` / `"en"` |
| `theme.default` | string | 默认主题 `"dark"` / `"light"` |
| `theme.allowToggle` | bool | 是否允许用户切换主题 |
| `primaryColor` | string | 主题色 hex（`"#4AA26F"`），全站颜色由此计算 |

---

## projects — 项目列表

```json
{
  "projects": ["publish1", "my-app"]
}
```

字符串数组，每个元素对应 `file/` 下的目录名。

---

## footer — 页脚

```json
{
  "footer": {
    "copyright": "© 2026 Open-web-download.kit",
    "links": [
      { "label": "GitHub", "url": "https://github.com" },
      { "label": "文档", "url": "https://docs.example.com" }
    ]
  }
}
```

---

## main.json — 项目元数据

每个项目目录下的 `main.json` 定义该项目的信息：

```json
{
  "name": "项目名称",
  "version": "1.0.0",
  "description": "项目描述",
  "author": "作者",
  "date": "2026-06-14",
  "category": "工具",
  "platforms": ["windows", "macos", "linux"],
  "files": [
    {
      "name": "文件名",
      "platform": "windows",
      "arch": "x64",
      "size": "45.2 MB",
      "type": "zip",
      "url": "../file/publish1/example.zip"
    }
  ],
  "changelog": [
    { "version": "1.0.0", "date": "2026-06-14", "changes": ["首次发布"] }
  ],
  "tags": ["工具", "跨平台"]
}
```

| 字段 | 说明 |
|------|------|
| `name` | 项目显示名称 |
| `platforms` | 支持的平台数组（用于生成 Badge） |
| `category` | 分类（用于筛选） |
| `files[].platform` | `windows`/`macos`/`linux` — 自动生成对应图标 |
| `files[].url` | 下载文件相对路径 |
| `changelog` | 更新日志数组 |
