# 📋 配置 API

`OWD.config`、`OWD.routes`、`OWD.nav` 提供对站点配置的只读访问。

---

## OWD.config

当前加载的站点配置（来自 `config.json` 的 `site` 部分）。

```javascript
console.log(OWD.config);
// {
//   name: "Openwebdocs.kit-MD3",
//   titleSuffix: "Openwebdocs.kit-MD3",
//   meta: "Openwebdocs.kit-MD3 · 文档站点框架",
//   docDir: "../docs",
//   logo: "logo.jpg"
// }
```

**读取站点名**
```javascript
document.title = OWD.config.name + ' 新标题';
```

---

## OWD.routes

所有路由到文件的映射。

```javascript
console.log(OWD.routes);
// {
//   "/": { file: "README.md", title: "概览", icon: "home" },
//   "/quick-start": { file: "quick-start.md", title: "快速开始", icon: "schedule" },
//   ...
// }
```

**获取某路由对应的文件名**
```javascript
const file = OWD.routes['/quick-start']?.file;
// → "quick-start.md"
```

**列出所有路由**
```javascript
Object.keys(OWD.routes).forEach(r => console.log(r));
```

---

## OWD.nav

导航结构数组，包含嵌套的 `children`。与 `config.json` 的 `nav` 字段完全一致。

```javascript
OWD.nav.forEach(item => {
  console.log(item.title);
  if (item.children) {
    item.children.forEach(child => console.log('  └ ' + child.title));
  }
});
```

---

## 检查某路由是否存在

```javascript
function routeExists(route) {
  return !!OWD.routes[route];
}

console.log(routeExists('/quick-start')); // true
console.log(routeExists('/nonexistent')); // false
```
