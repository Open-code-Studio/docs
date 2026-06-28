# 📄 config.js — 全局配置

**路径**: `page/js/config.js` | **大小**: 754 字节

---

## 职责

提供 `window.SITE_CONFIG` 全局对象。与 `page/config.json` 内容一致，但以 JS 变量形式嵌入，使页面在 `file://` 协议下也能正常加载（无需 fetch/HTTP 服务器）。

---

## 源代码

```javascript
window.SITE_CONFIG = {
    "site": {
        "name": "Open-web-download.kit",
        "description": "一个 Material Design 3 风格的静态下载站点",
        "language": "zh-CN",
        "theme": { "default": "dark", "allowToggle": true },
        "primaryColor": "#4AA26F"
    },
    "projects": ["publish1"],
    "footer": {
        "copyright": "© 2026 Open-web-download.kit. All rights reserved.",
        "links": [{ "label": "GitHub", "url": "https://github.com" }]
    }
};
```

---

## 同步规则

修改配置时需要**同时更新两个文件**：

| 文件 | 环境 |
|------|------|
| `page/config.json` | HTTP 服务器环境（fetch） |
| `page/js/config.js` | `file://` 协议（直接读取全局变量） |

`main.js` 通过 `window.SITE_CONFIG` 读取，该变量优先级最高。

---

## 使用方式

在 `main.js` 中：

```javascript
async function initSite() {
    // 等待 config.js 加载
    while (!window.SITE_CONFIG) {
        await new Promise(r => setTimeout(r, 50));
    }
    const cfg = window.SITE_CONFIG;
    // 直接使用 ...
}
```
