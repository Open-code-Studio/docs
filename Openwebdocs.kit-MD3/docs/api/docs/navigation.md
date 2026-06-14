# 🧭 导航 API

`OWD.navigate()` 用于程序化地跳转到指定路由。

---

## 基本用法

```javascript
OWD.navigate('/guide')
OWD.navigate('/customize')
OWD.navigate('#/quick-start')  // 带 # 前缀也可以
```

跳转效果与点击侧栏链接完全相同。

---

## 使用场景

### 1. 自定义按钮

```html
<button onclick="OWD.navigate('/quick-start')">快速开始</button>
```

### 2. 根据条件跳转

```javascript
if (userIsAdmin) {
  OWD.navigate('/admin');
} else {
  OWD.navigate('/');
}
```

### 3. 外部脚本控制

```javascript
// 从其他页面用 iframe 控制导航
document.querySelector('iframe').contentWindow.OWD.navigate('/api');
```

---

## 获取当前路由

```javascript
function currentRoute() {
  return window.location.hash.slice(1) || '/';
}
```

---

## 跳转到页面内章节

```javascript
// 跳转到 /quick-start 页面，然后滚动到 #第二步
OWD.navigate('/quick-start');
setTimeout(() => {
  document.getElementById('第二步')?.scrollIntoView({ behavior: 'smooth' });
}, 500);
```

---

## 类型定义

```typescript
interface OWD {
  navigate(route: string): void;
}
```
