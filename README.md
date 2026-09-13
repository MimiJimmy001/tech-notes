# HR 求职作品集

这是一个离线可运行、可直接部署到 GitHub Pages、Netlify 或 Cloudflare Pages 的静态网站。

## 修改真实内容

所有个人资料、项目、经历和文章都集中在 `data.js` 中。发布前请至少替换：

1. `profile.name`、`profile.github`、`profile.location`（邮箱可留空，页面会改为 GitHub 联系入口）
2. `projects` 中的示例项目、职责、难点、解决方案和结果
3. `experiences` 中的公司、时间和贡献
3. `notes` 中的真实问题复盘与学习总结
4. `index.html` 中结构化数据的岗位

## 本地预览

直接打开 `index.html`，或在当前目录运行任意静态文件服务器。

## 部署建议

### Netlify

将当前目录拖到 Netlify Drop，或连接 Git 仓库后直接发布。无需构建命令。

### GitHub Pages

将目录内容推送到 GitHub 仓库，在 Settings → Pages 中选择 `Deploy from a branch`，发布根目录即可。

### Cloudflare Pages

创建 Pages 项目，直接上传当前目录；Framework preset 选择 `None`，无需构建命令。
## 在线后台管理（Pages CMS）

仓库已经内置 `.pages.yml` 配置，发布后可以在线管理：

1. 打开 `https://app.pagescms.org`
2. 使用 GitHub 登录并选择本作品集仓库
3. 在“个人资料与主页”中修改姓名、邮箱、经历、技能
4. 在“项目作品”中新增或修改项目
5. 在“经验与文章”中撰写文章、上传封面图片
6. 点击保存后，GitHub Pages 会自动重新发布网站

所有内容保存在 `_data/`、`public/uploads/` 中，修改都有 Git 历史，可随时恢复。
## 可编辑内容清单

后台的“个人资料与主页”可以修改：

- 显示名称、头像字母、岗位、技术方向、求职状态、邮箱、GitHub、工作方式、毕业状态和个人简介
- 首页数据概览、关键词、大标题、按钮文字和速览引语
- 项目区、能力区、经验区、优势区和联系区的全部标题与说明

“项目作品”可以修改项目名称、职责、时间、技术栈、难点、解决方案、结果和亮点。“经验与文章”可以修改分类、标题、摘要、日期、阅读时间、封面图片和正文。

注意：正式网站是只读的，不能直接在页面上修改；必须进入 Pages CMS 保存。GitHub Pages 通常需要 1～2 分钟完成更新。
