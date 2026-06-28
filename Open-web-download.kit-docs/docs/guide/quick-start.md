# 🚀 快速开始

---

## 下载并启动

```bash
git clone https://github.com/Open-code-Studio/Open-web-download.kit.git
cd Open-web-download.kit
python3 buildServer.py
```

浏览器打开 `http://localhost:8080/`，3 秒后自动跳转下载站主页。

---

## 自定义站点名

编辑 `page/config.json`：

```json
{
  "site": {
    "name": "我的下载站",
    "description": "我的软件下载中心"
  }
}
```

刷新即可看到新名称。

---

## 添加下载项目

1. 在 `file/` 目录下创建新文件夹（如 `my-app`）
2. 放入安装包文件
3. 创建 `file/my-app/main.json` 描述项目信息
4. 在 `page/config.json` 的 `projects` 数组中添加 `"my-app"`
5. 在 `page/js/projects.js` 中添加对应的数据对象

---

## 修改主题色

```json
{ "site": { "primaryColor": "#1976D2" } }
```

主色改为蓝色，全站颜色自动计算适配。
