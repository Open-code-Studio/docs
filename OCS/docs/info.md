# ℹ️ 关于本站

本网站使用 **openweb.kit-MD3** 框架搭建。

---

## 框架介绍

**openweb.kit-MD3** 是一个轻量级的文档站点框架，基于 Material Design 3 设计规范构建。

### 核心特性

- **MD3 主题系统**：支持亮色/暗色主题自动切换，完整的 MD3 调色板变量
- **Markdown 驱动**：所有页面内容由 `.md` 文件驱动，使用 marked.js 渲染
- **单页应用 (SPA)**：基于 Hash 路由的无刷新页面切换
- **响应式布局**：桌面侧栏常驻 + 移动端抽屉导航
- **代码高亮**：集成 highlight.js，支持多语言语法高亮
- **目录生成**：自动提取标题生成侧栏目录导航

### 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 + CSS3 | 结构与样式 |
| Vanilla JavaScript | 交互逻辑 |
| [marked.js](https://marked.js.org/) | Markdown 解析 |
| [highlight.js](https://highlightjs.org/) | 代码语法高亮 |
| Material Design 3 | 设计规范 |

### CSS 架构

```
css/
├── theme.css      # MD3 颜色令牌 + 全局样式
├── layout.css     # 顶栏 / 侧栏 / 内容区布局
├── components.css # 按钮 / 引用 / 键盘等组件
└── markdown.css   # Markdown 渲染后内容样式
```

---

## 站点结构

Open-code-Studio 文档中心包含多个子站点：

| 站点 | 路径 | 说明 |
|------|------|------|
| OCS 主页 | `OCS/page/` | 组织介绍、开源项目总览 |
| JMCL 文档 | `JMCL/page/` | Minecraft 启动器使用文档 |

各站点共享同一套 CSS 样式和布局逻辑，通过独立的 `app.js` 配置不同的路由和文档。
