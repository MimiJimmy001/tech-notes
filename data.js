/*
 * 项目与经验内容的离线备用数据。
 * 在线后台保存后，页面优先读取 _data 目录中的最新内容。
 */
window.portfolioDataFallback = {
  "page": {
    "metaTitle": "数据与模型工程笔记 | 多模态 SFT 与 LLM 应用",
    "metaDescription": "记录多模态 SFT 数据构建、质量过滤、RAG、工具调用 Agent 与数据工程实践。",
    "heroEyebrow": "DATA × LLM ENGINEERING",
    "heroTitleLead": "把数据和模型，",
    "heroTitleAccent": "做成可复现、可评测的工程。",
    "heroSummary": "这里记录多模态 SFT 数据构建、质量过滤、RAG、工具调用 Agent 与多源数据清洗中的方案取舍、评测方法和问题复盘。",
    "projectsButtonLabel": "浏览项目",
    "notesButtonLabel": "阅读经验总结",
    "heroTags": [
      "SFT 数据",
      "VLM",
      "RAG",
      "Agent",
      "Data Engineering"
    ],
    "projectsEyebrow": "01 / PROJECTS",
    "projectsTitle": "项目记录",
    "projectsIntro": "围绕多模态数据、模型评测和工程落地，记录每个项目的真实问题、方案与结果。",
    "notesEyebrow": "02 / NOTES",
    "notesTitle": "经验总结",
    "notesIntro": "不只写结论，也记录数据为什么失真、评测如何设计，以及问题最终怎样复现和修复。",
    "blogName": "数据与模型工程笔记",
    "author": {
      "displayName": "MimiJimmy",
      "avatarText": "Z",
      "headline": "多模态数据、SFT 与 LLM 应用工程",
      "bio": "人工智能本科，关注多模态数据处理、SFT 数据质量、RAG 与工具调用 Agent 的工程化落地。",
      "topics": [
        "Python",
        "SQL",
        "VLM",
        "RAG",
        "Agent",
        "Docker"
      ]
    }
  },
  "projects": [
    {
      "id": "focus-stylegan-augmentation",
      "number": "01",
      "title": "基于 Focus-StyleGAN 的工业缺陷图像增广系统",
      "type": "本科毕业设计 / 生成式视觉",
      "role": "独立完成",
      "period": "本科毕业设计",
      "stack": [
        "PyTorch",
        "Focus-StyleGAN",
        "WGAN-GP",
        "AdaIN",
        "CBAM",
        "Optuna",
        "Flask",
        "MVTec AD"
      ],
      "summary": "面向工业异常检测中的缺陷样本稀缺问题，设计双分支解耦生成器，将缺陷生成与背景保持分开建模，并通过注意力融合和多尺度判别器生成可控伪异常图像。",
      "challenge": [
        "工业缺陷样本稀少，传统几何变换无法生成新的缺陷形态。",
        "单分支生成器需要同时学习缺陷纹理和产品背景，容易出现背景扭曲。",
        "微小、低对比度缺陷难以被单尺度判别器有效识别。"
      ],
      "solution": [
        "设计缺陷聚焦分支和背景保持分支，并引入 AdaIN 进行风格控制。",
        "使用注意力引导融合模块消除拼接痕迹，使缺陷与背景过渡自然。",
        "构建三尺度 PatchGAN 判别器，并在特征层中嵌入 CBAM 注意力。",
        "联合 WGAN-GP、VGG19 感知损失、L1 重构损失和 LPIPS 约束训练过程。",
        "通过 Optuna 搜索生成器、判别器学习率和多项损失权重。"
      ],
      "impact": [
        "生成质量达到 FID 22.5、IS 2.9、LPIPS 0.18、PPS 0.79。",
        "将伪异常样本加入训练集后，PaDiM 的 Pixel-AUC 从 0.852 提升到 0.943。",
        "PRO-AUC 从 0.828 提升到 0.925，Cable 与 Capsule 等稀缺类别提升最明显。"
      ],
      "highlight": "双分支生成、注意力融合与下游增广验证",
      "detailMarkdown": "/public/projects/focus-stylegan-augmentation/README.md"
    },
    {
      "id": "industrial-sft-pipeline",
      "number": "02",
      "title": "面向工业质检的多模态 SFT 数据构建与质量过滤管线",
      "type": "扩展项目 / 多模态数据工程",
      "role": "扩展项目负责人 / 数据管线",
      "period": "2025.09 - 2026.09",
      "stack": [
        "Python",
        "MVTec AD",
        "Qwen-VL",
        "StyleGAN",
        "LLaMA-Factory",
        "MD5"
      ],
      "summary": "在 Focus-StyleGAN 基础项目上扩展，从缺陷 mask 标注、VLM 自然语言改写，到合成数据生成、去重和质量评分，搭建可对接 LLaMA-Factory 的多模态 SFT 数据生产管线。",
      "challenge": [
        "基础项目能够生成伪异常图像，但生成图与结构化训练指令之间缺少稳定映射。",
        "dHash 去重误删 39% 样本，合成数据与真实数据的去重策略不能简单共用。",
        "生成图需要同时判断自然度、融合度和可用性，不能只靠人工抽查。",
        "生成数据缺少版本、校验和过滤记录，难以复核与回归。"
      ],
      "solution": [
        "复用 Focus-StyleGAN 作为图像来源，扩展为程序化标注、VLM 改写和标准 SFT 数据生成链路。",
        "基于 MVTec AD 的 ground-truth mask 提取缺陷结构，并通过 Qwen-VL 统一改写为自然语言 instruction。",
        "替换会产生误删的 dHash 方案，串联 MD5 精确去重、JSONL 校验、配置哈希和版本化目录。",
        "增加合成数据自然度、融合度和可用性评分，并设计真实图与生成图盲测对照实验。"
      ],
      "impact": [
        "在 15 个品类上产出 1725 条程序化模板样本。",
        "将误删 678 条样本的 dHash 方案替换为 MD5 精确去重，实现零误删。",
        "通过 133 张盲测样本验证过滤器区分度，并定位到生成器类别漂移导致的瓶身身份丢失。"
      ],
      "highlight": "在基础生成项目上扩展数据资产与质量评测",
      "detailMarkdown": "/public/projects/industrial-sft-pipeline/README.md"
    },
    {
      "id": "air-quality-agent",
      "number": "03",
      "title": "多城市空气质量监测与智能问答 Agent",
      "type": "省级大创 / LLM Agent",
      "role": "核心成员 / Agent 与 RAG",
      "period": "2024.09 - 2025.06",
      "stack": [
        "LangGraph",
        "Pandas",
        "scikit-learn",
        "RAG",
        "Chroma",
        "MCP",
        "FastAPI",
        "SQLite",
        "Docker"
      ],
      "summary": "基于 6 个城市 52,704 条小时级空气质量数据，构建覆盖实时查询、24h 预测、综合预警、相关性分析与政策检索的工具调用 Agent。",
      "challenge": [
        "空气质量数据存在缺失值、时间粒度和城市指标口径不一致的问题。",
        "工具数量达到 10 个后，规则和 LLM 都容易在相似问题上选错工具。",
        "RAG 回答需要引用政策条款，低置信时还要主动拒答，避免编造标准编号。",
        "问答链路缺少可追踪记录，bad case 难以定位和回归。"
      ],
      "solution": [
        "完成多城市数据清洗、时间对齐与指标口径统一，并训练随机森林预测模型。",
        "使用 LangGraph 构建 LLM Agent，同时保留规则版自动降级路径；通过 MCP 暴露 stdio 与 streamable-http 两种传输方式。",
        "将 10 个工具统一封装为结构化 Schema，并引入 RAG 引用溯源、低置信拒答和数据约束三层幻觉控制。",
        "设计覆盖 10 个工具、含 12 条易混淆样本的 60 条回归评测集，并迭代解决 12 条 bad case。",
        "用 SQLite 记录问题、工具调用、回答、延迟和 token，将 bad case 查找与回归验证流程闭环。"
      ],
      "impact": [
        "规则模式工具选择从 48/60 提升到 60/60，准确率 80% → 100%。",
        "LLM 模式工具选择从 49/60 提升到 58/60，准确率 81.7% → 96.7%，0 调用失败。",
        "Agent、RAG、日报和 MCP 服务通过 FastAPI、Docker 与 SQLite 完成落地。"
      ],
      "highlight": "工具调用评测、RAG 溯源与可观测性",
      "detailMarkdown": "/public/projects/air-quality-agent/README.md"
    }
  ],
  "notes": [
    {
      "id": "dhash-false-deletion",
      "number": "01",
      "category": "数据质量",
      "title": "dHash 去重误删 39%：合成数据去重方案复盘",
      "excerpt": "一次看似安全的图像去重，为什么会误删 678 条合成数据？问题不在去重本身，而在不同数据源的相似性定义。",
      "date": "2026.09.01",
      "readTime": "7 分钟",
      "coverImage": "",
      "lead": "合成图之间的像素相似，不代表语义相同；真实缺陷图之间的视觉差异，也不能简单用同一个阈值处理。",
      "sections": [
        {
          "heading": "问题背景",
          "content": "多模态 SFT 数据管线需要去除重复样本，最初使用 dHash 对真实缺陷图、真实正常图和生成图统一处理。上线检查时发现，去重结果中存在明显误删。"
        },
        {
          "heading": "错误现象",
          "content": "dHash 一共误删了 39% 的样本，共 678 条。被删除的图片并非完全重复，而是在低分辨率轮廓上相似。尤其对瓶身、轴承和密封圈等环形结构，哈希距离无法区分缺陷位置和类别身份。"
        },
        {
          "heading": "修复过程",
          "content": "我没有继续调整 dHash 阈值，而是先确认这份数据对去重的真实要求：同一文件重复必须删，视觉相似但语义不同的样本不能删。最终改为 MD5 精确去重，先保证工具链不会破坏有效样本。"
        },
        {
          "heading": "结果与复盘",
          "content": "改为 MD5 后实现零误删。这个问题的教训不是“dHash 不好”，而是去重规则必须服务数据目标。感知哈希适合近似图片检索，但不适合作为“是否应该保留训练样本”的唯一判断。"
        }
      ]
    },
    {
      "id": "agent-tool-evaluation",
      "number": "02",
      "category": "Agent 评测",
      "title": "60 条样本、10 个工具：工具调用 Agent 的评测集怎么设计",
      "excerpt": "只测最终回答是否正确，无法判断 Agent 是选错工具还是生成阶段出错。我们把评测拆到“工具选择”这一层。",
      "date": "2026.06.10",
      "readTime": "9 分钟",
      "coverImage": "",
      "lead": "工具调用 Agent 的第一道质量问题，不是答案像不像人写的，而是有没有调用正确的工具。",
      "sections": [
        {
          "heading": "为什么要单独评测工具选择",
          "content": "空气质量问答 Agent 包含查询、预测、预警和政策检索等 10 个工具。如果最终回答错误，可能是数据问题、工具选择错误，也可能是 RAG 或生成阶段的问题。只评估最终回答，无法定位故障层。"
        },
        {
          "heading": "评测集怎么设计",
          "content": "评测集包含 60 条问题，覆盖全部 10 个工具，并专门加入 12 条容易混淆的样本，例如查询历史空气质量与预测未来趋势、政策检索与一般知识回答。每条样本都标注期望工具和可接受工具集合。"
        },
        {
          "heading": "bad case 如何驱动迭代",
          "content": "第一轮先看规则模式与 LLM 模式各自的错误分布，发现主要问题集中在相似工具边界和开放式问题的回退策略。随后补充提示词约束、规则优先级和开放问题分支，共迭代三轮。"
        },
        {
          "heading": "结果与反思",
          "content": "规则模式从 80% 提升到 100%，LLM 模式从 81.7% 提升到 96.7%。比指标更重要的是，我们保留了一套可以重复运行的评测集，让后续修改 Prompt 或新增工具时能够快速发现回归。"
        }
      ]
    },
    {
      "id": "multimodal-sft-pipeline",
      "number": "03",
      "category": "SFT 数据",
      "title": "从 mask 到自然语言：多模态 SFT 数据管线如何搭建",
      "excerpt": "工业缺陷数据不只要“有图”，还要让缺陷位置、类别和语言描述形成一致结构。管线解决的是可生产、可验证和可复用。",
      "date": "2026.04.20",
      "readTime": "10 分钟",
      "coverImage": "",
      "lead": "SFT 数据集的质量，往往在模型训练前就已经决定了一半。",
      "sections": [
        {
          "heading": "为什么先处理结构化标注",
          "content": "MVTec AD 提供缺陷图像和 ground-truth mask。比起直接把整张图片交给 VLM 描述，先从 mask 中提取缺陷类别、位置和形态信息，可以让后续自然语言更稳定，也更容易检查标注一致性。"
        },
        {
          "heading": "VLM 改写与格式统一",
          "content": "结构化标注经过 Qwen-VL 改写为自然语言描述，再统一模板、字段和输出格式，最终产出可直接对接 LLaMA-Factory 的 SFT 数据。改写后还需要抽样验证，避免语言流畅但语义错误。"
        },
        {
          "heading": "合成数据质量过滤",
          "content": "训练 Focus-StyleGAN 生成缺陷样本后，不能只凭肉眼判断质量。管线对生成图做自然度、融合度和可用性评分，自动过滤低质量样本。通过评分理由的词频分析，我们发现部分样本虽然能通过过滤器，却全部指向环形部件，最终定位到生成器发生类别漂移、丢失瓶身身份。"
        },
        {
          "heading": "总结",
          "content": "一条可靠的 SFT 数据管线至少需要三件事：可追溯的标注结构、可量化的质量过滤、可复现的评测方式。只有把数据生产做成工程流程，模型迭代才不会依赖个人经验。"
        }
      ]
    }
  ]
};
