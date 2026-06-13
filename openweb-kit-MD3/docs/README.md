# 🧰 openweb.kit-MD3

轻量级、开箱即用的 **Material Design 3 文档站点框架**。

只需放入 `.md` 文件，即可拥有一个完整的文档网站。

---

## 特性

- 🎨 **MD3 主题** — 完整 Material Design 3 调色板，亮/暗主题
- 📝 **Markdown 驱动** — 所有页面由 `.md` 文件渲染
- ⚡ **SPA 路由** — Hash 路由，无刷新切换页面
- 📱 **响应式** — 桌面侧栏常驻 + 移动端抽屉导航
- 🌈 **代码高亮** — highlight.js 集成
- 🔗 **自动链接** — `.md` 文件间链接自动识别跳转
- 🔍 **章节锚点** — 可链接到文档内指定章节
- 🎯 **零依赖** — 纯 HTML/CSS/JS，不需要 Node.js

---

## 快速导航

| 文档 | 说明 |
|------|------|
| [快速开始](quick-start.md) | 5 分钟搭建你的文档站 |
| [CSS 架构](css.md) | theme / layout / components / markdown |
| [JS 配置](js.md) | 路由、文档加载、链接拦截 |
| [自定义主题](customize.md) | 修改颜色和字体 |
| [关于](info.md) | 框架介绍与技术细节 |

---

## 目录结构

```
your-project/
├── page/
│   ├── css/
│   │   ├── theme.css       # MD3 颜色令牌
│   │   ├── layout.css      # 顶栏 / 侧栏 / 内容布局
│   │   ├── components.css  # 组件样式
│   │   └── markdown.css    # 文档渲染样式
│   ├── js/
│   │   └── app.js          # 路由 + 文档加载
│   └── index.html          # 入口页面
├── docs/
│   ├── README.md           # 首页
│   └── *.md                # 更多文档...
```

---

## 构建站点

1. 复制 `page/` 目录到你的项目
2. 在 `docs/` 中放入 `.md` 文件
3. 修改 `app.js` 中的 `ROUTES` 配置侧栏导航
4. 启动任意静态服务器即可

```bash
python3 -m http.server 8000
```

框架会自动识别所有 `.md` 链接并路由到正确页面。
