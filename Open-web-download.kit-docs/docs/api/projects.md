# 📄 projects.js — 项目数据库

**路径**: `page/js/projects.js` | **大小**: 1,758 字节

---

## 职责

提供 `window.PROJECTS_DATA` 全局对象，包含所有下载项目的元数据。是 `file/xxx/main.json` 的内存版本，用于 `file://` 协议兼容。

---

## 源代码

```javascript
window.PROJECTS_DATA = {
    "publish1": {
        "name": "桌面项目 v1.0",
        "version": "1.0.0",
        "description": "这是一个桌面项目，展示下载站的功能。",
        "author": "Your Name",
        "date": "2026-06-14",
        "category": "工具",
        "platforms": ["windows", "macos", "linux"],
        "files": [
            {
                "name": "桌面程序-Windows-x64.zip",
                "platform": "windows",
                "arch": "x64",
                "size": "45.2 MB",
                "type": "zip",
                "url": "../file/publish1/example-app-windows-x64.zip"
            },
            // ... macOS, Linux
        ],
        "changelog": [
            { "version": "1.0.0", "date": "2026-06-14",
              "changes": ["首次发布", "支持 Windows/macOS/Linux 三平台"] }
        ],
        "tags": ["工具", "桌面", "跨平台"]
    }
};
```

---

## 加载优先级

```javascript
async function loadAllProjects() {
    for (const id of projectIds) {
        if (preloaded[id]) {
            STATE.projects[id] = preloaded[id];   // ← 优先
        } else {
            // 回退：fetch file/xxx/main.json
        }
    }
}
```

1. 先检查 `window.PROJECTS_DATA[id]` → 有则直接用
2. 没有 → `fetch('../file/{id}/main.json')` → 需要 HTTP 服务器

---

## 同步规则

| 文件 | 环境 |
|------|------|
| `file/项目名/main.json` | HTTP 服务器 fetch |
| `page/js/projects.js` | `file://` 协议 |

两份数据保持同步。添加新项目时**两边都要更新**。
