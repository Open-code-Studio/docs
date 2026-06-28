# 📄 transitions.js — 页面过渡动画

**路径**: `main/js/transitions.js` | **大小**: 9,677 字节

---

## 职责

管理首页和文章页之间的页面切换动画效果。

---

## 关键实现

在 `main/index.html` 中，`transitions.js` **最先加载**：

```html
<script src="js/transitions.js"></script>  <!-- 第1个 -->
<script src="js/extensions.js"></script>
<script src="js/moments.js"></script>
<script src="js/lightbox.js"></script>
<script src="js/app.js"></script>        <!-- 最后 -->
```

这样页面过渡动画在 DOM 渲染前就已就绪。

---

## 动画效果

- 页面进入：fadeIn + translateY
- 卡片出现：stagger 延迟
- 页面切换：平滑过渡

CSS 动画定义在 `main/css/transitions.css`。
