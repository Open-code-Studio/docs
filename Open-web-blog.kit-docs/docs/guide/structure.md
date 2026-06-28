# 📁 目录结构

基于实际源代码的完整文件树。

---

## 根目录

```
Open-web-blog.kit/
├── index.html              # 入口 → 自动跳转到 main/index.html
├── LICENSE                 # GPL-3.0
│
├── main/                   # 博客主程序
│   ├── index.html          # 首页（Hero + 标签筛选 + 文章列表）
│   ├── page.html           # 文章页（侧栏 + Markdown 渲染）
│   ├── about.html          # 关于页面
│   ├── moment.html         # 瞬间页面
│   ├── link.html           # 友链页面
│   ├── img.html            # 图床/图片页
│   ├── config.json         # ⭐ 站点配置（核心文件）
│   ├── css/                # 样式（8 文件）
│   │   ├── theme.css       # MD3 颜色 + 基础样式
│   │   ├── layout.css      # 布局系统
│   │   ├── components.css  # UI 组件
│   │   ├── home.css        # 首页专属样式
│   │   ├── nav.css         # 浮动导航样式
│   │   ├── moments.css     # 瞬间时间线
│   │   ├── markdown.css    # Markdown 渲染样式
│   │   └── transitions.css # 动画过渡
│   └── js/                 # 逻辑（9 文件）
│       ├── app.js          # ⭐ 首页逻辑（路由、渲染、筛选）
│       ├── page.js         # ⭐ 文章页逻辑
│       ├── extensions.js   # ⭐ 扩展加载器
│       ├── theme.js        # 主题切换
│       ├── transitions.js  # 页面过渡动画
│       ├── moments.js      # 瞬间功能
│       ├── lightbox.js     # 图片灯箱
│       ├── marked.min.js   # Marked 库
│       └── highlight.min.js# Highlight 库
│
├── page/                   # 博客文章（.md 文件）
│   └── hi!.md              # 示例文章
│
├── moment/                 # 瞬间功能配置
│   └── config.json         # 瞬间配置
│
└── expand/                 # 扩展系统
    ├── config.json         # 扩展总开关
    └── expand-test/        # 示例扩展
        └── config.json
```

---

## 核心文件关系

```
config.json  ──→  app.js  ──→  index.html (首页渲染)
                    │
                    ├──→  page.js  ──→  page.html (文章渲染)
                    │
                    └──→  extensions.js  ──→  expand/* (扩展)
```
