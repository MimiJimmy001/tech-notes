# 项目可视化与可解释性指南

本页用信息架构图、内容生产流程、部署流、内容分类决策树和页面预览说明 `tech-notes` 的内容组织方式。该仓库是个人项目案例与工程经验站点，不替代各项目的源码仓库。

## 图 1：站点信息架构思维导图

```mermaid
flowchart TD
    ROOT((项目与经验))
    ROOT --> HOME[首页]
    ROOT --> PROJECTS[项目案例]
    ROOT --> NOTES[工程经验]
    ROOT --> ABOUT[站点说明]
    ROOT --> META[元数据与部署]

    PROJECTS --> P1[工业图档平台]
    PROJECTS --> P2[空气质量 Agent]
    PROJECTS --> P3[Focus-StyleGAN]
    PROJECTS --> P4[PCBA 缺陷检测]

    NOTES --> N1[数据与指标口径]
    NOTES --> N2[工程复盘]
    NOTES --> N3[算法实践]
    NOTES --> N4[问题与失败案例]

    META --> M1[Pages CMS]
    META --> M2[_data JSON]
    META --> M3[GitHub Actions]
    META --> M4[Netlify]
```

## 图 2：内容生产与发布流程

```mermaid
flowchart LR
    AUTHOR[内容编辑] --> CMS[Pages CMS]
    CMS --> JSON[_data/*.json]
    JSON --> GIT[GitHub commit]
    GIT --> ACTION[GitHub Actions]
    ACTION --> BUILD[静态站点部署]
    BUILD --> NETLIFY[Netlify]
    ACTION --> PAGES[GitHub Pages]
    NETLIFY --> READER[读者]
    PAGES --> READER
```

内容更新以 `_data/` 为核心，页面不依赖数据库；GitHub Actions 负责把静态内容发布到部署平台。

## 图 3：项目案例页面结构决策树

```mermaid
flowchart TD
    ENTRY[项目入口] --> Q1{这是源码项目还是站点内容}
    Q1 -->|源码项目| CODE[跳转对应 GitHub 仓库]
    Q1 -->|站点内容| CASE[项目案例页]
    CASE --> BG[背景与问题]
    CASE --> ROLE[参与角色]
    CASE --> TECH[技术栈]
    CASE --> SOLVE[解决方案]
    CASE --> RESULT[复盘结果]
    CASE --> LINK[源码与资料链接]
```

## 图 4：内容分类与阅读路径

```mermaid
flowchart LR
    READER[访问者] --> GOAL{阅读目的}
    GOAL -->|看项目| PROJECT[项目案例]
    GOAL -->|看方法| NOTE[工程经验]
    GOAL -->|看代码| GITHUB[GitHub 仓库]
    GOAL -->|看能力范围| ABOUT[站点说明]

    PROJECT --> P1[问题背景]
    P1 --> P2[架构与指标]
    P2 --> P3[结果与局限]
    NOTE --> N1[问题复盘]
    N1 --> N2[可复用方法]
```

## 图 5：部署与故障诊断地图

```mermaid
flowchart TD
    FAIL[页面未更新] --> S1[检查 _data 是否提交]
    FAIL --> S2[检查 GitHub Actions]
    FAIL --> S3[检查 Netlify 部署]
    FAIL --> S4[检查 Pages CMS 目标分支]

    S1 --> FIX[修复内容或提交]
    S2 --> LOG[查看 workflow 日志]
    S3 --> DEPLOY[查看 Netlify deploy 状态]
    S4 --> BRANCH[确认 main 分支和仓库]
```

## 页面预览

### 桌面端

![桌面端预览](../preview-desktop.png)

解释：用于检查项目卡片、导航、正文层级和桌面布局。

### 移动端

![移动端预览](../preview-mobile.png)

解释：用于检查移动端折叠布局、阅读宽度和导航可用性。

## 视觉阅读顺序

1. 图 1 了解站点有哪些内容和模块。
2. 图 2 理解 CMS、Git 和部署平台如何连接。
3. 图 3 说明项目案例页应该包含哪些信息。
4. 图 4 展示不同读者的阅读路径。
5. 图 5 和预览图用于检查发布流程和页面呈现。