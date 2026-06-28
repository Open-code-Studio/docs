# 🌐 部署

---

## GitHub Pages

### 1. 推送仓库

```bash
git init && git add . && git commit -m "init"
git push origin main
```

### 2. 启用 Pages

Settings → Pages → Source: `main` branch / root → Save

### 3. 访问

```
https://用户名.github.io/Open-web-download.kit/
```

根目录 `index.html` 自动跳转到 `page/index.html`。

---

## 本地开发

```bash
python3 buildServer.py
# → http://localhost:8080
```

`buildServer.py` 是一个 8 行的 Python HTTP 服务器，无需额外安装。

---

## file:// 协议

直接双击 `index.html` 或 `page/index.html` 即可打开。

所有数据通过 `config.js` 和 `projects.js` 内置，不依赖 fetch/网络。

---

## 自定义域名

1. Settings → Pages → Custom domain
2. DNS 添加 CNAME 指向 `用户名.github.io`
3. 勾选 Enforce HTTPS
