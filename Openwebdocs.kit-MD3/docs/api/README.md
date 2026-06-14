# 🔌 OWD API

`window.OWD` 对象提供了在浏览器控制台或脚本中访问框架的函数和属性。

---

## 基本用法

打开页面后，在浏览器控制台（F12）输入：

```javascript
OWD.config           // 查看站点配置
OWD.routes           // 查看所有路由
OWD.navigate('/guide') // 跳转到指定页面
```

---

## API 列表

| API | 说明 | 类型 |
|-----|------|------|
| [OWD.config](config.md) | 站点配置信息 | 属性 |
| [OWD.routes](config.md) | 所有路由映射 | 属性 |
| [OWD.nav](config.md) | 导航结构（含嵌套） | 属性 |
| [OWD.navigate()](navigation.md) | 程序化跳转页面 | 方法 |
| [OWD.getPage()](page.md) | 获取页面原始内容 | 异步方法 |
| [OWD.search()](search.md) | 搜索已访问页面 | 同步方法 |
| [OWD.searchAll()](search.md) | 搜索所有页面 | 异步方法 |
| [OWD.cache](page.md) | 页面内容缓存 | 属性 |
| [OWD.theme](theme.md) | 主题控制 | 方法 |

---

## 快速示例

```javascript
// 搜索所有文档中的内容
const results = await OWD.searchAll('config.json');
console.table(results);

// 获取某页面的原始 Markdown
const page = await OWD.getPage('/quick-start');
console.log(page.content);

// 列出所有可用路由
Object.keys(OWD.routes).forEach(r => console.log(`${r} → ${OWD.routes[r].title}`));
```
