# 📁 目录结构

基于实际源代码的完整文件树。

---

```
Open-web-download.kit/
├── index.html              # 入口 → 倒计时3秒跳转 page/index.html
├── buildServer.py          # Python 开发服务器（端口 8080）
├── LICENSE                 # GPL-3.0
│
├── page/                   # 下载站主程序
│   ├── index.html          # ⭐ 主页（Top Bar + Hero + 搜索 + 项目卡片 + 详情面板）
│   ├── config.json         # 站点配置（名称/主题/项目列表/footer）
│   ├── css/
│   │   ├── md3.css         # Material Design 3 样式框架（22KB）
│   │   └── main.css        # 站点专属样式（2.5KB）
│   └── js/
│       ├── config.js       # SITE_CONFIG 全局配置（file:// 兼容）
│       ├── main.js         # ⭐ 核心逻辑（18KB：主题/颜色/卡片/详情面板）
│       └── projects.js     # PROJECTS_DATA 项目数据（file:// 兼容）
│
└── file/                   # 下载文件存放目录
    └── publish1/           # 示例项目
        ├── main.json       # 项目元数据（名称/版本/文件列表/更新日志）
        ├── example-app-windows-x64.zip
        ├── example-app-macos-arm64.dmg
        └── example-app-linux-x64.AppImage
```

---

## 数据流

```
config.json ──→ config.js ──→ window.SITE_CONFIG
                                          │
                                    main.js (initSite)
                                          │
            ┌─────────────────┬───────────┤
            ▼                 ▼           ▼
      site name/desc      loadProjects   theme + color
            │                 │
            ▼                 ▼
        DOM 填充       file/publish1/main.json
                           │
                      projects.js ──→ window.PROJECTS_DATA
                           │
                    renderProjectCards()
```

---

## 双协议兼容

框架支持两种使用方式：

| 方式 | 数据源 | 适用场景 |
|------|--------|----------|
| HTTP 服务器 | config.js + projects.js 预加载 | `file://` 本地打开、GitHub Pages |
| `file://` 协议 | 同上（100% 内置数据） | U 盘分发、无网络环境 |

`main.js` 优先使用 `window.PROJECTS_DATA`，只有找不到数据时才 fetch `file/xxx/main.json`。
