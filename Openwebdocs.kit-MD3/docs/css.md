# 🎨 CSS 架构

框架的 CSS 分为 4 个独立文件，各司其职。

---

## 文件概览

| 文件 | 职责 |
|------|------|
| `theme.css` | MD3 颜色令牌、全局重置、滚动条 |
| `layout.css` | 顶栏、侧栏、内容区、抽屉导航 |
| `components.css` | 按钮、引用块、代码标记等 UI 组件 |
| `markdown.css` | Markdown 渲染后的内容样式 |

---

## theme.css — 颜色系统

使用 CSS 自定义属性（变量）实现完整的 MD3 调色板：

```css
:root {
  --md-sys-color-primary: #3A8E5E;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #C7EDD4;
  --md-sys-color-on-primary-container: #002112;
  /* ... 更多颜色令牌 */
}

[data-theme="dark"] {
  --md-sys-color-primary: #81DAAB;
  /* ... 暗色主题颜色 */
}
```

所有组件通过引用 CSS 变量来适配主题切换，无需重复样式。

---

## layout.css — 布局系统

```
┌─────────────────────────────────┐
│  top-app-bar (fixed, 64px)      │  z-index: 100
├────────┬────────────────────────┤
│sidebar │  main-content          │
│ 280px  │  doc-article  │ TOC    │
│fixed   │  max 800px    │ 220px  │
└────────┴────────────────────────┘
```

移动端（≤768px）sidebar 变为抽屉模式：
- sidebar: `transform: translateX(-100%)` → `.open` 时滑入
- drawer-overlay: 灰色背景蒙版
- main-content: `margin-left: 0`（全宽）

---

## components.css — 组件

- **icon-button** — 圆形图标按钮，MD3 ripple 效果
- **details / summary** — 可折叠区块
- **blockquote** — 带左边框的引用块
- **kbd** — 键盘快捷键样式
- **fab** — 浮动操作按钮（回到顶部）

---

## markdown.css — 文档样式

- **h1-h6** — 无衬线字体，带底部边框
- **code / pre** — JetBrains Mono 等宽字体，深色背景
- **table** — 交替行色，hover 高亮
- **img** — 自适应宽度，圆角
- **a** — 主题色链接，hover 下划线

---

## 自定义

所有颜色变量定义在 `theme.css` 的 `:root` 和 `[data-theme="dark"]` 中。修改这些变量即可改变整个站点的配色，无需改动组件代码。
