# 项目与经验

[![Website](https://img.shields.io/badge/website-online-brightgreen)](https://code-notes-lab.netlify.app)

这是一个只展示项目记录和经验总结的静态技术博客，不包含个人简历、求职状态、联系方式或工作经历。

## 仓库定位

- [可视化与可解释性](docs/VISUAL_GUIDE.md)：站点信息架构、内容流程、部署链路和页面预览

本仓库用于维护个人项目案例与工程经验站点，重点展示项目过程和复盘，不替代各项目的源码仓库。

## 在线管理

正式网址：`https://code-notes-lab.netlify.app`

打开 `https://app.pagescms.org/ouou47471-cpu/tech-notes/main`，可以编辑：

- 页面标题、首页说明、栏目标题和按钮文字
- 项目背景、参与角色、技术栈、问题、解决方法和复盘结果
- 经验文章的分类、标题、摘要、封面和正文

内容会保存到 `_data/`。提交后 GitHub Actions 会自动部署到 Netlify。

## 本地预览

在项目目录运行任意静态文件服务器后打开首页。不要直接依赖 `file://`，因为浏览器可能阻止读取 JSON 内容。

## 部署

发布分支为 `main`，GitHub Actions 工作流为 `.github/workflows/netlify.yml`。

