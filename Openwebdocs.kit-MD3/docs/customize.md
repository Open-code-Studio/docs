# 🎛️ 自定义主题

---

## 修改站点信息

编辑 `page/config.json`：

```json
{
  "site": {
    "name": "我的项目",
    "titleSuffix": "我的项目文档"
  }
}
```

---

## 修改导航

在 `config.json` 的 `nav` 数组中添加/删除条目：

```json
{
  "nav": [
    { "route": "/", "file": "README.md", "title": "首页", "icon": "home" },
    { "route": "/api", "file": "api.md", "title": "API", "icon": "computer" }
  ]
}
```

---

## 修改侧栏链接

```json
{
  "sidebarLinks": [
    { "title": "GitHub", "url": "https://github.com/xxx", "external": true },
    { "title": "其他站", "url": "../../other/page/" }
  ]
}
```

---

## 修改主色调

编辑 `page/css/theme.css`，在 `:root` 和 `[data-theme="dark"]` 中修改 Primary 变量：

```css
:root {
  --md-sys-color-primary: #E53935;    /* 红色 */
  --md-sys-color-primary-container: #FFDAD6;
}
[data-theme="dark"] {
  --md-sys-color-primary: #FFB4AB;
  --md-sys-color-primary-container: #93000A;
}
```

---

## 修改字体

1. 编辑 `index.html` 中的 Google Fonts 链接
2. 编辑 `theme.css` 中 `body` 的 `font-family`

---

## 预设主题色

| 主题 | Primary |
|------|---------|
| 绿色（默认） | `#3A8E5E` |
| 蓝色 | `#1976D2` |
| 紫色 | `#7B1FA2` |
| 橙色 | `#F57C00` |
