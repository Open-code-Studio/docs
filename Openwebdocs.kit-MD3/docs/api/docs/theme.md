# 🎨 主题 API

框架的主题控制通过 DOM 属性和 `localStorage` 实现，`OWD` 提供了便捷的封装。

---

## 获取当前主题

```javascript
const theme = document.documentElement.getAttribute('data-theme');
// → "dark" 或 "light"
```

---

## 切换主题（简写）

```javascript
// 切换为深色
document.documentElement.setAttribute('data-theme', 'dark');
localStorage.setItem('theme', 'dark');

// 切换为浅色
document.documentElement.setAttribute('data-theme', 'light');
localStorage.setItem('theme', 'light');

// 重置为跟随系统
localStorage.removeItem('theme');
```

---

## 主题工具函数

```javascript
// 获取
function getTheme() {
  return localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

// 设置
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
}

// 切换
function toggleTheme2() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

// 重置跟随系统
function resetTheme() {
  localStorage.removeItem('theme');
  setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
```

---

## CSS 变量读取

获取当前主题的颜色值：

```javascript
const style = getComputedStyle(document.documentElement);
const primaryColor = style.getPropertyValue('--md-sys-color-primary').trim();
console.log('当前主色:', primaryColor);
// dark: #81DAAB, light: #3A8E5E
```

---

## 监听主题变化

```javascript
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  // 仅在未手动设置主题时跟随系统
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
```

---

## 完整颜色列表

```javascript
const colorVars = [
  '--md-sys-color-primary',
  '--md-sys-color-on-primary',
  '--md-sys-color-primary-container',
  '--md-sys-color-surface',
  '--md-sys-color-on-surface',
  '--md-sys-color-secondary',
  '--md-sys-color-tertiary',
];

const colors = {};
const cs = getComputedStyle(document.documentElement);
colorVars.forEach(v => colors[v] = cs.getPropertyValue(v).trim());
console.table(colors);
```
