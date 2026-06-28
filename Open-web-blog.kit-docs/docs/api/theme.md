# 📄 theme.js — 主题管理

**路径**: `main/js/theme.js` | **大小**: 3,103 字节

---

## 职责

独立的主题切换模块，管理亮/暗模式。

在 `app.js` 和 `page.js` 中有**内置副本**，`theme.js` 是一个独立的可复用版本。

---

## 核心逻辑

```javascript
// 存储键名：owb-theme (区别于其他站点，避免冲突)
localStorage.getItem('owb-theme')

// 优先级：用户手动设置 > 系统偏好
function getPreferredTheme() {
  return localStorage.getItem('owb-theme') 
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

// 切换动画：添加 transitioning class → 切换 → 300ms 后移除
html.classList.add('transitioning');
setTheme(newTheme);
setTimeout(() => html.classList.remove('transitioning'), 300);
```

---

## 主题色联动

```javascript
// 切换主题后重新应用 themeColor（因为亮/暗模式颜色计算不同）
if (themeColor) setTimeout(() => applyThemeColor(themeColor), 50);
```

---

## 主题图标

```javascript
// 暗色主题 → 月亮图标
'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'

// 亮色主题 → 太阳图标
'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>...'
```

---

## 使用方式

点击浮动导航栏右侧的主题切换按钮（`#themeToggle`） → 触发 `toggleTheme()`。
