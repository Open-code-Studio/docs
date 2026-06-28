# 📄 主题与颜色系统

---

## 架构概览

框架仅需一个 **hex 主色**（如 `#4AA26F`），自动计算出完整的 Material Design 3 颜色体系。

---

## computeColorTokens(hex)

**核心算法**，位于 `main.js`：

### 亮度判断

```javascript
function luminance(hex) {
    const { r, g, b } = hexToRgb(hex);
    return 0.299 * r + 0.587 * g + 0.114 * b;
}
```

- 亮度 > 160：主色偏亮 → `onPrimary` 用深色（`#1a1c20`）
- 亮度 ≤ 160：主色偏暗 → `onPrimary` 用白色（`#ffffff`）

### 浅色主题

| Token | 算法 |
|-------|------|
| `primary` | 原始 hex |
| `onPrimary` | 亮度判断 |
| `container` | `mixColors(hex, '#ffffff', 0.85)` — 85% 白混合 |
| `onContainer` | `mixColors(hex, '#000000', 0.58)` — 58% 黑混合 |

### 深色主题

| Token | 算法 |
|-------|------|
| `primary` | `mixColors(hex, '#ffffff', 0.45)` — 45% 白混合（亮化） |
| `onPrimary` | 亮度判断 |
| `container` | `mixColors(hex, '#000000', 0.55)` — 55% 黑混合（暗化） |
| `onContainer` | `mixColors(hex, '#ffffff', 0.70)` |

---

## applyColorTokens()

将计算好的 tokens 写入 DOM CSS 变量：

```javascript
$root.style.setProperty('--md-sys-color-primary', tokens.primary);
$root.style.setProperty('--md-sys-color-on-primary', tokens.onPrimary);
$root.style.setProperty('--md-sys-color-primary-container', tokens.container);
$root.style.setProperty('--md-sys-color-on-primary-container', tokens.onContainer);
$root.style.setProperty('--md-sys-color-inverse-primary', tokens.inverse);
```

---

## 主题切换流程

```
用户点击 #theme-toggle
  → toggleTheme()
    → STATE.currentTheme = 'light' 或 'dark'
    → applyTheme()
      → document.documentElement.setAttribute('data-theme', ...)
      → localStorage.setItem('md3-theme', ...)
      → 更新图标（dark_mode / light_mode）
      → applyColorTokens() — 切换深浅主题对应的颜色集
```

---

## CSS 中的引用

`md3.css` 使用 CSS 变量，自动响应主题变化：

```css
.md3-button--filled {
    background-color: var(--md-sys-color-primary);
    color: var(--md-sys-color-on-primary);
}
```

无需手动维护多套颜色。
