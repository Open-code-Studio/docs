# 🌐 部署到 GitHub Pages

将 OWD.K-MD3 文档站免费部署到 GitHub Pages。

---

## 第一步：创建仓库

在 GitHub 创建一个新仓库，命名随意（如 `my-docs`）。

---

## 第二步：推送代码

```bash
git init
git add .
git commit -m "init docs site"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

---

## 第三步：启用 GitHub Pages

1. 打开仓库 → **Settings** → **Pages**
2. **Source** 选择 `Deploy from a branch`
3. **Branch** 选择 `main`，目录选 `/ (root)`
4. 点击 **Save**

---

## 第四步：访问

等待 1-2 分钟部署完成，访问：

```
https://你的用户名.github.io/仓库名/page/
```

---

## 注意事项

### 如果仓库名为 `docs`

若仓库名叫 `docs`，访问路径为：

```
https://你的用户名.github.io/docs/page/
```

此时 `config.json` 中的内部链接不受影响，因为框架使用相对路径。

### 使用自定义域名

1. 在 `Settings → Pages → Custom domain` 填入你的域名
2. 在 DNS 中添加 CNAME 记录指向 `你的用户名.github.io`
3. 勾选 **Enforce HTTPS**

### 根目录访问

在仓库根目录添加 `index.html` 自动跳转到 `/page/`：

```html
<meta http-equiv="refresh" content="0;url=page/">
```

---

## 目录结构建议

```
repo/
├── index.html       ← 根目录跳转（可选）
├── page/            ← 框架文件
│   ├── config.json
│   ├── index.html
│   ├── js/
│   └── css/
└── docs/            ← 你的文档
    └── *.md
```

---

## 多站点部署

OWD.K-MD3 支持在同一仓库部署多个文档站：

```
repo/
├── index.html        ← 导航中心
├── site-a/
│   ├── page/...
│   └── docs/...
└── site-b/
    ├── page/...
    └── docs/...
```

站点之间通过 `../../其他站点/page/` 互相链接。
