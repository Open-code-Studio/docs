# 📄 moments.js — 瞬间/Timeline

**路径**: `main/js/moments.js` | **大小**: 4,672 字节

---

## 职责

管理首页的"瞬间"（Moments）时间线功能——一种轻量级的状态/动态展示。

数据来源：`moment/config.json`。

---

## 渲染

首页 `index.html` 包含 moments 区域：

```html
<section class="moments-section" id="momentsSection" style="display:none;">
  <div class="moments-wrapper" id="momentsWrapper">
    <!-- Dynamic from moments.js -->
  </div>
</section>
```

有数据时自动显示，无数据时保持隐藏。

---

## 交互

- 左右滑动查看更多瞬间
- 显示总数统计（`#momentsCount`）
