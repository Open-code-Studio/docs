# 🎛️ 自定义主题

修改 `theme.css` 中的颜色变量即可改变整个站点的外观。

---

## 修改主色调

在 `theme.css` 的 `:root` 和 `[data-theme="dark"]` 中修改 Primary 相关变量：

### 亮色主题

```css
:root {
  --md-sys-color-primary: #E53935;           /* 红色主题 */
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #FFDAD6;
  --md-sys-color-on-primary-container: #410002;
}
```

### 暗色主题

```css
[data-theme="dark"] {
  --md-sys-color-primary: #FFB4AB;
  --md-sys-color-on-primary: #690005;
  --md-sys-color-primary-container: #93000A;
  --md-sys-color-on-primary-container: #FFDAD6;
}
```

---

## 完整 MD3 颜色令牌

```css
/* Primary    — 主要交互色（链接、按钮、选中态） */
--md-sys-color-primary
--md-sys-color-on-primary
--md-sys-color-primary-container
--md-sys-color-on-primary-container

/* Secondary  — 辅助色（侧栏导航激活态） */
--md-sys-color-secondary
--md-sys-color-on-secondary
--md-sys-color-secondary-container
--md-sys-color-on-secondary-container

/* Surface    — 表面 / 背景色 */
--md-sys-color-surface
--md-sys-color-on-surface
--md-sys-color-surface-container           /* 侧栏、顶栏 */
--md-sys-color-surface-container-high      /* hover 高亮 */
```

---

## 修改字体

在 `index.html` 的 Google Fonts 链接中调整字体族：

```html
<link href="https://fonts.loli.net/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
```

在 `theme.css` 的 `body` 中修改 `font-family`：

```css
body {
  font-family: 'Noto Sans SC', "PingFang SC", "Microsoft YaHei", sans-serif;
}
```

---

## 预设主题示例

| 主题 | Primary 色值 |
|------|-------------|
| 绿色（默认） | `#3A8E5E` |
| 蓝色 | `#1976D2` |
| 紫色 | `#7B1FA2` |
| 橙色 | `#F57C00` |
| 粉色 | `#C2185B` |
