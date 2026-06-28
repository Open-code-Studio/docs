# 🌐 部署

---

## GitHub Pages 部署

### 1. 创建仓库

在 GitHub 创建仓库 `my-blog`。

### 2. 推送代码

```bash
git init && git add . && git commit -m "init"
git remote add origin https://github.com/用户名/my-blog.git
git push -u origin main
```

### 3. 启用 Pages

Settings → Pages → Source: `main` branch, root → Save

### 4. 访问

```
https://用户名.github.io/my-blog/
```

根目录的 `index.html` 会自动跳转到 `main/index.html`。

---

## 自定义域名

1. Settings → Pages → Custom domain → 输入域名
2. DNS 添加 CNAME 记录指向 `用户名.github.io`
3. 勾选 Enforce HTTPS

---

## 注意事项

- `config.json` 使用相对路径（`"../page"`），自动适配域名
- 无需构建步骤，纯静态文件
- GitHub Pages 部署后约 1 分钟生效
