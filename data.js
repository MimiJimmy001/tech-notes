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
      "id": "sft-audit-kit",
      "number": "03",
      "title": "SFT Audit Kit：多模态数据集质量审计工具",
      "type": "数据工程工具 / 质量门禁",
      "role": "独立开发",
      "period": "持续开发",
      "stack": [
        "Python",
        "Pillow",
        "JSONL",
        "MD5",
        "unittest",
        "HTML Report",
        "CI"
      ],
      "summary": "把 SFT 数据管线中的质量检查抽象成通用工具，对数据格式、图片完整性、重复样本、ID 冲突、训练集泄漏和模板文本进行审计，并输出可追溯报告。",
      "challenge": [
        "多模态数据缺少统一结构，不同版本可能没有顶层 ID、类别或 split 字段。",
        "固定图片尺寸白名单会把 MVTec 等真实数据的合法尺寸误判为异常。",
        "重复文本和重复图片如果按记录逐条报告，会产生大量不可复核的噪声。",
        "数据发布前缺少自动质量门禁，问题往往到训练阶段才被发现。"
      ],
      "solution": [
        "支持必填字段校验，同时从图片路径和 meta.annotation 推导 ID、类别与 split。",
        "支持 manifest.json 或 --dataset-root 自动解析外部图片目录。",
        "使用完整图片解码和 MD5 精确去重，检查缺图、重复图片与 train/test 泄漏。",
        "按问题组聚合重复文本警告，并输出 HTML、JSON、CSV 三份报告。",
        "提供 --strict 模式，将 Error 转换为 CI 非零退出码。"
      ],
      "impact": [
        "在 1725 条真实 MVTec SFT 数据上完成完整审计，1725/1725 条无错误。",
        "识别 1725 张唯一图片，未发现缺图、重复图片、重复 ID 或数据泄漏。",
        "将 614 条图片尺寸误报降为 0，并将重复文本告警由逐条输出压缩为 116 个问题组。"
      ],
      "highlight": "数据发布质量门禁与可追溯审计报告",
      "detailMarkdown": "/public/projects/sft-audit-kit/README.md"
    },
    {
      "id": "agent-eval-workbench",
      "number": "04",
      "title": "Agent Eval Workbench：工具调用评测工作台",
      "type": "Agent 工程工具 / 可观测性",
      "role": "独立开发",
      "period": "持续开发",
      "stack": [
        "Python",
        "JSONL",
        "Tool Calling",
        "RAG Eval",
        "Parameter Eval",
        "HTML Report",
        "CI"
      ],
      "summary": "把 Agent 评测从单一工具准确率扩展为工具、参数、RAG 引用、拒答、JSON、延迟和 token 七维评测，并支持多模型或 Prompt 横向对比。",
      "challenge": [
        "只比较工具名称，无法发现城市、污染物等参数传错。",
        "最终答案看似正确，但 RAG 引用可能不存在或并不完整。",
        "应拒答的问题可能仍然生成答案，错误拒答也缺少指标。",
        "模型原始 JSON 损坏时，只看工具调用结果会漏掉执行链路问题。",
        "不同模型和 Prompt 的结果难以使用同一套标准横向比较。"
      ],
      "solution": [
        "对工具集合执行顺序无关比较，并统计缺失工具和额外工具。",
        "增加参数级标注、字段归一化和匹配准确率。",
        "增加 RAG 引用完全匹配率、平均召回率和拒答准确率。",
        "校验 JSON 布尔标记或直接解析 raw 输出，统计结构化输出有效率。",
        "增加规则版与 LLM 版对比报告，以及 --fail-under CI 门禁。"
      ],
      "impact": [
        "使用 60 条真实空气质量案例复测，规则版 100%，LLM 版 96.7%。",
        "增强基准准确识别参数错误、引用缺失、拒答失败和无效 JSON。",
        "LLM 版 60 条真实结果的结构化输出有效率为 100%。"
      ],
      "highlight": "Agent 多层评测与回归质量门禁",
      "detailMarkdown": "/public/projects/agent-eval-workbench/README.md"
    },
    {
      "id": "air-quality-agent",
      "number": "05",
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
    },
    {
      "id": "sft-audit-1725",
      "number": "04",
      "category": "数据质量",
      "title": "1725 条 SFT 数据审计后，我保留了哪些质量门禁",
      "excerpt": "一次完整审计暴露出的问题不只有缺图，还包括重复 ID、跨集泄漏、尺寸误判和模板文本噪声。真正有用的是一组稳定的发布门禁。",
      "date": "2026.09.12",
      "readTime": "8 分钟",
      "coverImage": "",
      "lead": "数据规模越大，人工抽查越不能替代自动审计。",
      "sections": [
        {
          "heading": "为什么要做完整审计",
          "content": "我使用 SFT Audit Kit 对 1725 条真实 MVTec SFT 数据进行了完整审计。全部记录都能加载，图片完整可解码，也没有重复图片或 train/test 泄漏。但完整跑一遍仍然暴露了规则设计问题，说明小样本测试通过并不代表千条级数据可靠。"
        },
        {
          "heading": "第一版出现了哪些误报",
          "content": "最初把图片尺寸限制在 256、512、768、1024 等固定值，结果 614 张合法的 MVTec 原图被标记为异常。真实工业图片会出现 700、800、840、900、1000 等尺寸，工具不应该假设所有数据都已经被统一缩放。"
        },
        {
          "heading": "最终保留的门禁",
          "content": "现在的 Error 级别只保留会影响训练的确定性问题：JSON 无法解析、缺少核心字段、图片不存在或无法解码、重复 ID、字节级重复图片和 train/test 泄漏。图片尺寸改为下限和上限检查，模板文本重复作为 Warning 聚合展示。"
        },
        {
          "heading": "审计结果",
          "content": "最终 1725/1725 条记录无错误，1725 张图片全部唯一，0 个缺图、0 个重复图片、0 个 ID 冲突、0 个跨集泄漏。剩余 116 个 Warning 全部是模板文本完全重复，需要结合标注策略判断是否接受。"
        }
      ]
    },
    {
      "id": "agent-parameter-eval",
      "number": "05",
      "category": "Agent 评测",
      "title": "工具调用 Agent 的参数准确率应该怎么测",
      "excerpt": "工具名选对不等于调用正确。上海传成北京、PM2.5 传成 PM10，最终回答可能看起来合理，但执行链路已经错了。",
      "date": "2026.09.08",
      "readTime": "7 分钟",
      "coverImage": "",
      "lead": "工具选择是 Agent 的第一层正确性，参数准确率才是第二层。",
      "sections": [
        {
          "heading": "为什么只看工具名不够",
          "content": "在空气质量 Agent 中，get_forecast 可能被正确调用，但城市参数仍然可能是错误值。只比较工具名称会给出 100% 的工具准确率，却无法发现城市、污染物或时间范围传错。"
        },
        {
          "heading": "参数标注方式",
          "content": "每个案例增加 expected_params，按工具记录期望参数。例如 get_forecast 期望 city=beijing、pollutant=PM25。实际结果从 actual_calls[].params 读取，再对城市和污染物别名做归一化。"
        },
        {
          "heading": "增强基准结果",
          "content": "在 6 条增强案例中，工具选择准确率为 100%，但参数准确率只有 75%。这组数据故意包含了上海被传成北京的错误，说明工具层和参数层必须分开统计。"
        },
        {
          "heading": "下一步",
          "content": "参数评测还应继续支持数值区间、时间范围和多层嵌套结构。对于更复杂的 Agent，还需要区分“参数完全正确”“参数部分正确”和“使用了默认值”三种情况。"
        }
      ]
    },
    {
      "id": "fid-not-usable",
      "number": "06",
      "category": "项目复盘",
      "title": "为什么 FID 下降不等于合成数据可用",
      "excerpt": "统计分布变接近，并不代表生成图还保留了业务语义。一次 VLM 盲测让这个问题变得非常直观。",
      "date": "2026.08.30",
      "readTime": "9 分钟",
      "coverImage": "",
      "lead": "模型指标回答的是分布问题，质量门禁回答的是数据能不能使用。",
      "sections": [
        {
          "heading": "指标看上去在改善",
          "content": "工业缺陷生成器训练过程中，FID 从约 187 下降到了 96。按照常见的生成模型经验，指标改善通常意味着样本分布更接近真实数据，容易让人认为这批合成数据已经可以进入训练集。"
        },
        {
          "heading": "语义层面的异常",
          "content": "后续使用 VLM 对真实缺陷图、真实正常图和生成图进行中立盲测。真实图片几乎都会提到瓶身或瓶口结构，而通过过滤的 24 张生成图里，没有任何一张被描述为瓶身，23 张被描述为轴承、密封圈或内窥结构。"
        },
        {
          "heading": "根因判断",
          "content": "这些生成图彼此并不重复，说明问题不是多样性崩塌，而是生成器丢失了产品类别身份，持续输出错误类别的环形结构。此时统计指标仍在改善，但数据在业务语义上已经不可用。"
        },
        {
          "heading": "工程结论",
          "content": "生成数据必须同时经过视觉质量与语义一致性检查。FID 可以作为模型评估指标，但不能代替数据发布门禁。最终交付物也应该包含过滤报告、拒绝原因和明确的数据边界。"
        }
      ]
    },
    {
      "id": "one-off-script-to-tool",
      "number": "07",
      "category": "工程实践",
      "title": "如何把一次性脚本变成可复用的数据工具",
      "excerpt": "同一个检查逻辑写进项目、写进 Notebook、再写进 CI，最后通常会变成三份难以维护的脚本。抽象应该从稳定协议开始。",
      "date": "2026.08.20",
      "readTime": "6 分钟",
      "coverImage": "",
      "lead": "项目里的检查逻辑只有离开当前项目，才真正变成工具。",
      "sections": [
        {
          "heading": "从一次需求开始",
          "content": "SFT 数据管线最初包含去重、字段校验和版本记录。这些检查只服务当前项目，直到需要审计更多数据时，才发现每换一个数据集就要复制一次脚本。"
        },
        {
          "heading": "先固定输入输出协议",
          "content": "抽象的第一步不是写类，而是固定 JSONL 记录、问题严重级别和报告结构。只要输入输出稳定，内部实现就可以从简单的顺序检查逐步扩展到近重复、VLM 评分和版本对比。"
        },
        {
          "heading": "把确定性检查放在前面",
          "content": "图片是否存在、ID 是否重复、数据是否泄漏，这些问题不需要大模型就能确定。先用确定性规则消除高风险错误，再把语义一致性交给更昂贵的模型判断，能显著降低成本。"
        },
        {
          "heading": "为 CI 设计退出状态",
          "content": "一个只能打印日志的脚本很难进入工程流程。增加 JSON 报告、CSV 问题清单和 --strict 退出码后，工具才能成为真正的数据发布门禁，并在 GitHub Actions 中自动阻断错误数据。"
        }
      ]
    }
  ]
};
