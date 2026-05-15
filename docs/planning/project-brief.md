# 项目简报：openxml-ts

> 状态：v0.1 草案 · 输出阶段：BMAD Analyst · 关联 Issue：#1（脚手架）/ 待建 #2（本简报评审）

## 执行摘要

`openxml-ts` 是把微软 Open-XML-SDK 从 .NET 迁到 TypeScript 的全功能移植项目。目标读者是同时维护服务端文档管线、又被迫从 .NET 栈过渡到 Node / Bun 的工程师，以及做浏览器或 Edge 场景下文档生成的前端团队。当前 TypeScript 生态在 OOXML 这一层是碎片化的：`docx`、`exceljs`、`pptxgenjs` 各自只覆盖一种文档族，又都不与 ISO/IEC 29500 严格对齐，跨格式的资源共享、关系图谱、扩展点几乎全部缺席。我们的判断是：**OOXML 的复杂度集中在 OPC 与 schema，不集中在哪种文档**，所以正确的入口是把 .NET SDK 的 OPC 内核与强类型 Schema 模型搬过来，再让 Word / Excel / PowerPoint 共用。

本期不追求覆盖三大文档族。本期只完成 OPC Packaging 内核（ZIP + Parts + Relationships + Content-Types + Markup-Compatibility），让上层文档族可以分阶段叠加。

## 问题

服务端用 .NET 处理 Word/Excel/PowerPoint 的团队，如果想迁到 Node / Bun，会立刻撞到三堵墙：

1. **没有一个对应物**：`docx` 只做 Wordprocessing 子集，且 API 设计与 .NET 几乎无对应关系；`exceljs` 接近完整但偏向自家抽象；`pptxgenjs` 只做生成不做读取。要同时改 docx + xlsx + pptx，团队得学三套互不相通的 API。
2. **OPC 抽象缺失**：上述库各自重写一份 ZIP+Relationships 处理，缺少统一的 Part 模型；做插入外部资源、批改主题、跨文档族搬运资源时几乎只能跌进黑盒。
3. **类型与规范脱锚**：ISO/IEC 29500 定义了几千个元素与属性，`docx`/`exceljs` 暴露的类型多数只覆盖各自常用子集，遇到 `mc:AlternateContent`、`w:sdt`、自定义 XML Part 这类二级特性就要回退到字符串拼 XML。

跨语言双栈维护团队为此付出的成本是真实的：同一份发票模板，在 .NET 端 50 行能改主题色，在 Node 端要 400 行手写 XML 才能等价；任何一次 Office 客户端的实际打开都可能因为我们漏写一个关系或 Content-Type 而损坏文件。

## 解决方案

`openxml-ts` 把 .NET Open-XML-SDK 的 API 表面用 TypeScript 重画一遍，保持「OPC 内核 + Schema 模型 + LINQ 视图」三层架构，但让运行时形态适配现代 JS：

- **保留 .NET 端 API 的可识别映射**：`OpenXmlPackage`、`PackagePart`、`Relationships`、`OpenXmlElement` 等核心类型在 TS 端使用相同的名字与心智模型，方便文档与跨语言团队上手。
- **运行时按现代 JS 重写**：`Stream` 映射到 Web Streams，`IDisposable` 映射到 `using` / `[Symbol.dispose]`，`async/await` 一等公民，`Dictionary<,>` 换成 `Map`。
- **ESM-only、Bun 优先**：消除 CJS/ESM 双轨拖累；ZIP I/O 走 Bun 原生 + 跨运行时 polyfill，使核心库在浏览器、Node ≥ 20、Bun ≥ 1.1 上都跑得动。
- **以 OPC 内核为起点**：先把 Packaging 做扎实，再让 WordprocessingML / SpreadsheetML / PresentationML 各自作为消费者落到内核上。

## 与现有方案的区别

- **唯一对齐 ISO/IEC 29500 + .NET API 双锚**的 TS 实现，既能服务双栈团队，也能借鉴 .NET SDK 二十年积累的边角处理。
- **包级别共享 OPC**：跨文档族搬主题、共享 image / chart 等资源不再需要重新发明轮子。
- **类型严格 + 现代运行时**：`strict` + `exactOptionalPropertyTypes` + `noUncheckedIndexedAccess` 作为默认；不刻意兼容旧 Node 与 CJS。
- **诚实地承认护城河来自工程量**：复刻 ~5000 个 schema 元素与 OPC 边角并不性感，但正是这部分劝退了其他作者，所以我们把它当作首要资产，而不是技术差异化。

## 目标用户

- **服务端文档管线工程师**：在生成或修改大量 docx/xlsx/pptx 的报表、合同、PPT 模板服务里，原来跑 .NET 现要迁到 Node/Bun；他们关心保真度、性能、调试可定位。
- **双栈维护团队**：同一业务在 .NET 与 TS 都有实现，要求两端读写产物等价（同一字节流可互换打开）。
- **构建/工具链作者**：写 CI 报告、自动审计、安全扫描等 CLI 工具，希望像 .NET SDK 那样可以遍历整个包，而不是被一个特定文档族限制。
- **次级：浏览器侧文档生成**（演示稿、协作工具等），看重 ESM、Tree-shaking 与零原生依赖。

## 成功标准

- **正确性**：与 .NET Open-XML-SDK 在同一份 `.docx`/`.xlsx`/`.pptx` 上的读 → 写 → 读结果字节级对齐（允许压缩参数差异），覆盖率随 Epic 推进上升。
- **MVP 验收**：OPC 内核可独立完成「打开真实 Office 文件 → 枚举 Parts → 改 Content-Types/Relationships → 写回」的完整往返，且 Microsoft Word / Excel / PowerPoint 客户端打开零警告。
- **类型覆盖**：所有公共 API `strict` 通过；公共类型与 Schema 元素一一对应，可被 IDE 跳转。
- **性能基线**：MVP 期内单次 1 MB 包的开/关耗时 ≤ 100 ms（Node 20 / Bun 1.1，本地 NVMe）。
- **采用信号**：发布至 npm 后周下载 ≥ 1k；至少一个外部生产项目（团队内外均算）切到 `openxml-ts`。

## 范围

**本期（Epic-1 / MVP）必须有**：

- `IPackage` 抽象 + 至少一个 ZIP 后端实现（候选 `fflate` / `yauzl-promise` / `zip.js`，由 Architect 阶段裁决）。
- Parts、Relationships、Content-Types、Flat OPC 支持。
- Markup-Compatibility 处理基础（`mc:AlternateContent` 占位但不强制 schema 校验）。
- 来自源 SDK `src/DocumentFormat.OpenXml.Framework/Packaging` 的核心契约 1:1 移植。
- 端到端往返测试：取 `data/` 下的真实样例文档，读取 → 透传写回，字节差异限定在 ZIP 元数据。

**本期之外**：

- WordprocessingML / SpreadsheetML / PresentationML 的强类型类（留作 Epic-2/3/4）。
- LINQ to XML 兼容层（留作 Epic-5，可选）。
- Schema 校验器、`v:` 兼容旧 VML 处理（沿用源 SDK 思路但延后）。
- 浏览器构建产物的 polyfill 仓库化（等 Web Streams 在 Node、Bun 间稳定后再处理）。

## 愿景

两到三年内，`openxml-ts` 在 TS 生态里成为「想严肃处理 OOXML 时的默认选择」，地位类似 .NET 端的 `DocumentFormat.OpenXml`：

- 三大文档族 schema 类完整覆盖；可与 .NET SDK 双向迁移。
- 上层社区基于它派生出 docx 模板引擎、xlsx 审计工具、pptx 自动化等；我们只负责把内核做对、做稳。
- 与 ECMA / ISO 后续修订保持紧密跟踪，遇到新条款先在 schema 模型层落地。

## 后续动作（衔接到 BMAD PM 阶段）

1. 由 PM 代理把本简报落到 PRD，明确 Epic-1 OPC Packaging 的功能/非功能需求与验收准则。
2. 由 Architect 代理输出 `docs/architecture.md`，敲定 ZIP 后端、Web Streams 策略、错误模型、包结构。
3. 由 SM 代理把 Epic-1 拆成 Story-1.1 … Story-1.N，并落到 GitHub Issues（中文，`feature` 标签）。
