# 📤 发布项目

添加新的可下载项目到下载站。

---

## 第一步：放入文件

在 `file/` 目录下创建新文件夹（如 `my-tool`），放入安装包：

```
file/my-tool/
├── my-tool-windows-x64.zip
├── my-tool-macos-arm64.dmg
├── my-tool-linux-x64.AppImage
└── main.json
```

---

## 第二步：创建 main.json

```json
{
  "name": "我的工具 v2.0",
  "version": "2.0.0",
  "description": "一个实用的桌面工具，支持三平台。",
  "author": "My Name",
  "date": "2026-06-28",
  "category": "工具",
  "platforms": ["windows", "macos", "linux"],
  "files": [
    {
      "name": "我的工具-Windows-x64.zip",
      "platform": "windows",
      "arch": "x64",
      "size": "15.3 MB",
      "type": "zip",
      "url": "../file/my-tool/my-tool-windows-x64.zip"
    },
    {
      "name": "我的工具-macOS-arm64.dmg",
      "platform": "macos",
      "arch": "arm64",
      "size": "18.7 MB",
      "type": "dmg",
      "url": "../file/my-tool/my-tool-macos-arm64.dmg"
    }
  ],
  "changelog": [
    { "version": "2.0.0", "date": "2026-06-28", "changes": ["全新重构", "性能优化"] },
    { "version": "1.0.0", "date": "2026-01-01", "changes": ["首次发布"] }
  ],
  "tags": ["工具", "实用"]
}
```

---

## 第三步：注册项目

编辑两个文件：

### page/config.json
```json
{ "projects": ["publish1", "my-tool"] }
```

### page/js/projects.js
```javascript
window.PROJECTS_DATA = {
    "publish1": { /* ... 保持原样 ... */ },
    "my-tool": {
        // ... main.json 的完整内容复制到这里 ...
    }
};
```

**为什么要两份？** `projects.js` 用于 `file://` 协议直接打开（无需服务器），`main.json` 用于 HTTP 服务器环境。

---

## 第四步：刷新

保存后刷新页面，新项目卡片自动出现。点击卡片或"详情"按钮查看下载页面。

平台图标自动生成：
- `windows` → 🪟 Windows 徽章
- `macos` → 💻 macOS 徽章
- `linux` → 🖥️ Linux 徽章
- 检测到用户系统后标记"推荐"版本
