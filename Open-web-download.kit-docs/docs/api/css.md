# 📄 CSS 架构

**路径**: `page/css/` | **总大小**: ~25KB

---

## 文件说明

| 文件 | 大小 | 职责 |
|------|------|------|
| `md3.css` | 22,410 B | MD3 设计系统（Top Bar、Card、Button、Chip、Detail Panel、Snackbar...） |
| `main.css` | 2,569 B | 站点专属样式（Hero、搜索栏、空状态、Download Item） |

---

## md3.css — MD3 组件

### 布局
- `.md3-top-app-bar` — 顶部应用栏
- `.md3-main` — 主内容区
- `.md3-section` — 分区容器
- `.md3-card-grid` — 响应式卡片网格

### 组件
- `.md3-card` + `.md3-ripple` — 项目卡片（带涟漪动效）
- `.md3-filter-chip` — 分类筛选胶囊按钮
- `.md3-search` — Material Design 搜索栏
- `.md3-icon-button` — 圆形图标按钮（主题切换）
- `.md3-detail-panel` — 侧栏详情面板（从右滑入）
- `.md3-download-item` — 下载文件行
- `.md3-changelog` / `.md3-changelog-item` — 更新日志列表
- `.md3-snackbar` — 底部 Toast 通知

### 徽章
- `.md3-card__badge` — 通用标签
- `.md3-badge--windows` / `.md3-badge--macos` / `.md3-badge--linux` — 平台徽章

---

## main.css — 站点样式

- `.md3-hero` — Hero 区域的渐变背景和排版
- `.md3-empty-state` — 空搜索结果样式
- `.md3-detail-project-name` — 详情页项目名
- `.md3-download-item__info` — 文件信息布局
- 响应式断点 @media (max-width: 768px)

---

## 涟漪动效

`md3.css` 定义涟漪动画 + `main.js` 的 `createRipple()` 注入 DOM：

```css
.md3-ripple-effect {
    position: absolute; border-radius: 50%;
    background: rgba(255,255,255,0.3);
    animation: ripple 0.6s ease-out;
}
@keyframes ripple {
    to { transform: scale(4); opacity: 0; }
}
```
