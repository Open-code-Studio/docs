# 📄 main.js — 核心逻辑

**路径**: `page/js/main.js` | **大小**: 18,336 字节 | **依赖**: `config.js`, `projects.js`

---

## 职责

负责下载站的全部前端交互逻辑。

---

## 全局状态 STATE

```javascript
const STATE = {
    currentTheme: 'dark',         // 当前主题
    projects: {},                 // { projectId: ProjectData }
    activeCategory: 'all',        // 当前筛选分类
    searchQuery: '',              // 搜索关键词
    detailProjectId: null,        // 详情面板打开的项目 ID
    primaryColor: null,           // 主色 hex
    colorTokens: {}               // { light: {...}, dark: {...} }
};
```

---

## 初始化流程

```
DOMContentLoaded
  → initTheme()              — 读取 localStorage / 配置默认值
  → initSite()               — 异步初始化
      → applyPrimaryColor()  — 计算颜色 tokens
      → 填充 site-name, site-desc, document.title
      → 填充 footer copyright + links
      → loadAllProjects()     — 加载项目数据
      → 收集分类 → 填充分类筛选按钮
      → renderProjectCards()  — 渲染所有项目卡片
      → bindEvents()          — 绑定交互事件
```

---

## 核心函数

### `applyPrimaryColor(hex)`

**框架亮点**：从单一 hex 色值计算完整的 MD3 调色板。

```javascript
computeColorTokens(hex)
  → luminance(hex)    // 亮度计算：0.299R + 0.587G + 0.114B
  → 根据亮度 > 160 判断 onPrimary 用黑色还是白色
  → container: mixColors(hex, '#ffffff', 0.85)   // 85% 白混合
  → onContainer: mixColors(hex, '#000000', 0.58) // 58% 黑混合
  → 深色主题：primary 用 45% 白混合，container 用 55% 黑混合
  → applyColorTokens() → 写入 CSS 变量
```

生成的 CSS 变量：
```
--md-sys-color-primary
--md-sys-color-on-primary
--md-sys-color-primary-container
--md-sys-color-on-primary-container
--md-sys-color-inverse-primary
```

### `loadAllProjects()`

```javascript
// 优先从 PROJECTS_DATA (projects.js) 加载
if (preloaded[id]) STATE.projects[id] = preloaded[id];

// 回退：HTTP fetch file/xxx/main.json
else fetch(`../file/${id}/main.json`);
```

### `renderProjectCards()`

核心渲染函数：
1. 根据 `activeCategory` 和 `searchQuery` 过滤项目
2. 生成项目卡片 HTML（名称、描述、平台徽章、版本按钮）
3. 无结果时显示空状态

搜索逻辑：
```javascript
filtered.filter(([id, p]) => {
    return p.name?.includes(q) || p.description?.includes(q) ||
           id.includes(q) || p.tags?.some(t => t.includes(q));
});
```

### `openDetail(projectId)`

打开侧栏详情面板：
- 检测 `detectPlatform()` 标记"推荐"版本
- 渲染下载文件列表（平台图标 + 大小 + 下载按钮）
- 渲染更新日志时间线
- 下载按钮带 Toast 通知

### `detectPlatform()`

```javascript
/Windows/i.test(ua) → 'windows'
/Macintosh|Mac OS X/i.test(ua) → 'macos'
/Linux/i.test(ua) && !/Android/i → 'linux'
```

---

## 事件绑定

| 事件 | 处理 |
|------|------|
| `#theme-toggle` click | `toggleTheme()` |
| `#search-input` input | 300ms debounce → `renderProjectCards()` |
| `#category-filters` click | 切换筛选 → `renderProjectCards()` |
| 卡片 click / 详情按钮 | `openDetail()` |
| `#detail-close` / overlay / ESC | `closeDetail()` |
| 下载按钮 click | `showSnackbar("开始下载...")` |
