# HR 求职作品集

这是一个离线可运行、可直接部署到 GitHub Pages、Netlify 或 Cloudflare Pages 的静态网站。

## 修改真实内容

所有个人资料、项目、经历和文章都集中在 `data.js` 中。发布前请至少替换：

1. `profile.name`、`profile.email`、`profile.github`、`profile.location`
2. `projects` 中的示例项目、职责、难点、解决方案和结果
3. `experiences` 中的公司、时间和贡献
4. `notes` 中的真实问题复盘与学习总结
5. `index.html` 中结构化数据的姓名与岗位

## 本地预览

直接打开 `index.html`，或在当前目录运行任意静态文件服务器。

## 部署建议

### Netlify

将当前目录拖到 Netlify Drop，或连接 Git 仓库后直接发布。无需构建命令。

### GitHub Pages

将目录内容推送到 GitHub 仓库，在 Settings → Pages 中选择 `Deploy from a branch`，发布根目录即可。

### Cloudflare Pages

创建 Pages 项目，直接上传当前目录；Framework preset 选择 `None`，无需构建命令。
