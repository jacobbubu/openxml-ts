---
stepsCompleted: []
inputDocuments:
  - docs/planning/project-brief.md
workflowType: 'prd'
projectName: openxml-ts
language: zh-CN
---

# Product Requirements Document — openxml-ts

**作者：** BMAD PM 代理（John） · 复核：项目主理人
**日期：** 2026-05-15
**版本：** v0.1（草案）
**关联：** [项目简报](./project-brief.md) · GitHub Issues #1（脚手架）

## 1. 愿景

让 TypeScript 生态拥有第一个与 ISO/IEC 29500 完整对齐、且与 .NET Open-XML-SDK 互通的 OOXML SDK。两到三年内，凡是想严肃读写 Word / Excel / PowerPoint 文档的 TS 服务，默认会想到 `openxml-ts`，而不是再拼装三个互不相通的库。

## 2. 执行摘要

OOXML 的复杂度集中在 OPC（Open Packaging Conventions）与各文档族的 schema。本项目从 OPC 内核入手，按照 .NET SDK 的分层架构——Packaging / Schema 类 / LINQ 视图——在 TypeScript 端逐层落地，第一里程碑只覆盖 OPC Packaging，但要做到工业可用：能打开真实的 docx/xlsx/pptx，把每个 Part、每条 Relationship、每个 Content-Type 暴露成强类型 API，并支持原样写回。运行时形态采用 Bun 优先 / Node ≥ 20 兼容、纯 ESM、`strict` TypeScript。

成功的衡量不是 npm 周下载数，而是：**任一从 .NET SDK 出来的 .docx，经过 `openxml-ts` 读 → 写 → 读，三轮内容等价**，且 Microsoft Office 客户端打开零警告。

## 3. 成功指标

| 类别 | 指标 | MVP 阈值 | 长期目标 |
| --- | --- | --- | --- |
| 正确性 | OPC 往返：真实 docx/xlsx/pptx 读出 → 透传写回，零 schema 偏移 | 100% 通过样例集 | 100% 通过随机 fuzz 集 |
| 正确性 | Office 客户端打开零警告（Word/Excel/PowerPoint Desktop + Web） | 通过 5 个代表样例 | 通过自动化样例集 ≥ 200 |
| 行为对齐 | 与 .NET SDK 同一文档的 Part 枚举、Relationship 解析输出等价 | 100% | 100% |
| 性能 | 1 MB 包打开 + 枚举 Part：Node 20 与 Bun 1.1，本地 NVMe | ≤ 100 ms p95 | ≤ 60 ms p95 |
| 性能 | 1 MB 包透传写回 | ≤ 200 ms p95 | ≤ 120 ms p95 |
| 类型质量 | `strict` + `exactOptionalPropertyTypes` + `noUncheckedIndexedAccess` 全通过 | 100% | 100% |
| 测试 | OPC 内核行覆盖率 | ≥ 85% | ≥ 92% |
| 采用 | 至少一个外部生产服务切到 `openxml-ts` 的 Packaging | 0（MVP 是奠基） | ≥ 3 |

## 4. 用户旅程

### 旅程 A · 双栈维护工程师

> 团队 .NET 端用 Open-XML-SDK 生成发票模板，新业务要在 Bun 服务里复刻。

1. `pnpm add openxml-ts` 后，用 `OpenXmlPackage.openAsync(filePath)` 打开模板，API 命名与 .NET 端可直接对照。
2. 通过 `package.mainPart.relationships` 拿到主文档 Part 的关系，与 .NET 输出对照确认结构无偏移。
3. 透传写出 `await package.saveAsAsync('out.docx')`，Office 客户端打开零警告。

### 旅程 B · CLI 工具作者

> 写一个审计工具检查公司所有 `.xlsx` 是否引用了被禁用的外部资源。

1. 流式扫描目录；对每个文件 `using pkg = await OpenXmlPackage.openAsync(p)`（`[Symbol.dispose]` 保证关闭）。
2. 遍历 `pkg.parts` + `pkg.externalRelationships`，把命中 URL 输出 JSON 报告。
3. 工具在 Node 与 Bun 上行为一致，构建产物为单 ESM。

### 旅程 C · 浏览器内文档生成（次级）

> 协作产品需要把当前页面状态导出为 `.docx`。

1. 从 ESM CDN（如 esm.sh）import；浏览器使用 Web Streams 读 `Blob`。
2. 调用 `OpenXmlPackage.createAsync()` 在内存写出一个空包并附加 Part；保存为 `Blob`。

> MVP 不强保证旅程 C，但 API 设计为之留出兼容空间（避免 Node 专有 API）。

## 5. 领域背景与既有约束

- **规范来源**：ISO/IEC 29500-1/-2/-3/-4，ECMA-376。Packaging 主要看 29500-2（Open Packaging Conventions）。
- **参考实现**：[`dotnet/Open-XML-SDK`](https://github.com/dotnet/Open-XML-SDK)（MIT，.NET Foundation）。我们对位的核心目录是 `src/DocumentFormat.OpenXml.Framework/Packaging` 与 `src/DocumentFormat.OpenXml/Packaging`。
- **TS 生态约束**：
  - Web Streams 在 Node 20、Bun 1.1 都已稳定，可作公共 I/O 抽象。
  - 浏览器没有 `node:fs`；包内核必须以 `Uint8Array` / `ReadableStream` 而非 `Buffer` 作为唯一输入语义。
  - `using` / `[Symbol.dispose]`：TS 5.2+，Node 20+ 支持，Bun 已支持。我们要求 TS ≥ 5.5 以保证类型层稳定。
- **法律 / 许可**：源 SDK MIT；我们沿用 MIT 并保留 .NET Foundation 归属（已在 LICENSE 中体现）。

## 6. 差异化定位

| 维度 | `docx` / `exceljs` / `pptxgenjs` | `officegen` 等 | **`openxml-ts`** |
| --- | --- | --- | --- |
| 覆盖范围 | 各覆盖一族 | 单族生成 | 三族 + OPC 内核 |
| 与 ISO 29500 对齐 | 局部 | 局部 | **逐元素对位** |
| 与 .NET API 心智 | 无 | 无 | **类名 / 关系 1:1 映射** |
| 类型严格度 | 中 | 弱 | `strict` + `exactOptional…` |
| 运行时形态 | CJS+ESM 混合 | 多为 CJS | **ESM-only，Bun 优先** |
| 关系与跨族资源 | 手写 | 不支持 | OPC 内核原生 |

## 7. 项目类型

**Library / SDK**，无 UI、无后台服务。发布为 npm 包（命名 `openxml-ts`），ESM-only。CLI 工具留给社区。

## 8. MVP 范围与优先级矩阵

### 8.1 必须有（MVP / Epic-1：OPC Packaging 内核）

| 编号 | 能力 | 备注 |
| --- | --- | --- |
| MVP-1 | `IPackage`、`IPackagePart`、`IPackageRelationship`、`IPackageProperties` 接口契约 | 对位 .NET 抽象 |
| MVP-2 | ZIP 后端实现（`ZipPackage`），支持读、写、流式枚举 | 后端选型由 Architect 阶段裁决 |
| MVP-3 | Parts CRUD（uri、contentType、relType、stream） | 含 `MediaDataPart` 占位 |
| MVP-4 | Relationships CRUD + Internal/External 区分 + `Hyperlink` 子类 | |
| MVP-5 | Content-Types（`[Content_Types].xml`）读写 | Default + Override |
| MVP-6 | Flat OPC 互转（`OpenXmlPackage` ↔ flat XML） | 对位 `FlatOpcExtensions` |
| MVP-7 | `OpenSettings`、`MarkupCompatibilityProcessSettings` 占位 | 字段透传，不强制语义 |
| MVP-8 | `using` / `[Symbol.dispose]` 资源生命周期 | 同步与异步两种 |
| MVP-9 | 端到端往返测试集（≥ 5 真实样例 docx/xlsx/pptx） | 与 Office 客户端打开零警告 |
| MVP-10 | 公共 API 完整类型导出（ESM `exports` 字段精确） | tree-shakable |

### 8.2 不在 MVP

- WordprocessingML / SpreadsheetML / PresentationML 的 schema 类。
- LINQ to XML 兼容层（`DocumentFormat.OpenXml.Linq`）。
- 自动 schema 校验器、`v:` VML 兼容、`DataPartReferenceRelationship` 高级用法。
- 浏览器端构建产物的发布频道（API 兼容浏览器，但 MVP 不主动维护浏览器 bundle）。

### 8.3 拒绝项（明确不做）

- CJS 双构建产物。
- 兼容 Node < 20。
- 内置高层模板引擎（应由社区在 Schema 类层上构建）。

## 9. 功能需求（Epic-1 / MVP）

### FR-1 包打开与关闭
- FR-1.1 `OpenXmlPackage.openAsync(source, options?)` 支持 `string`（文件路径）、`Uint8Array`、`ReadableStream<Uint8Array>`、`Blob` 四种输入。
- FR-1.2 `openSync` 仅支持 `Uint8Array`；其他输入仅异步 API。
- FR-1.3 `options` 含 `accessMode: "read" | "readWrite"`，`autoSave: boolean`（默认 `true`，对位 .NET）。
- FR-1.4 通过 `[Symbol.dispose]` / `[Symbol.asyncDispose]` 关闭并刷新；`using` 语法编译到 ES2023 polyfill 时可降级。
- FR-1.5 打开损坏的 ZIP 或缺失 `[Content_Types].xml` 抛 `OpenXmlPackageError`，错误码可枚举。

### FR-2 Part 模型
- FR-2.1 Part 通过 `package.getPart(uri)` 或 `package.parts` 迭代器访问；迭代器顺序与 ZIP 原序一致。
- FR-2.2 `Part.openReadStream()` 返回 `ReadableStream<Uint8Array>`；`Part.openWriteStream()` 返回 `WritableStream<Uint8Array>` 并在 close 时把内容回写 ZIP buffer。
- FR-2.3 `Part.contentType`、`Part.relationshipType`、`Part.uri` 必填；写入前未设置则抛错。
- FR-2.4 `package.addPart({ uri, contentType, relationshipType?, data })` 自动维护 Content-Types 表。
- FR-2.5 `package.deletePart(uri)` 同步删除所有指向该 Part 的 Relationship。

### FR-3 Relationships
- FR-3.1 每个 Part 暴露 `relationships` 集合（内部）+ `externalRelationships` 集合。
- FR-3.2 Relationship 字段：`id`、`type`、`target`、`targetMode`。`Hyperlink` 视为 `external + 特定 type`。
- FR-3.3 添加 Relationship 时若 `id` 重复抛错；不指定 `id` 时按 .NET 同算法生成 `rId#`。
- FR-3.4 包级 Relationship 通过 `package.relationships` 访问，路径 `/_rels/.rels`。

### FR-4 Content-Types
- FR-4.1 读写 `[Content_Types].xml`，支持 `Default extension="..."` 和 `Override partName="..."`。
- FR-4.2 添加 Part 时按以下顺序解析：`Override` → `Default(extension)` → `addPart.contentType`。
- FR-4.3 删除 Part 时若其扩展名再无 Part 使用，可选择清除 `Default`（默认保留）。

### FR-5 Flat OPC
- FR-5.1 `OpenXmlPackage.toFlatOpc()` 返回字符串/`Document`，对应 .NET `OpenXmlPackage.ToFlatOpcDocument`。
- FR-5.2 `OpenXmlPackage.fromFlatOpcAsync(xml)` 接受字符串/`ReadableStream`。
- FR-5.3 Flat OPC 与 ZIP 互转结果包含等价 Parts/Relationships。

### FR-6 包保存
- FR-6.1 `package.saveAsync()` 把内存修改刷回原后端；`package.saveAsAsync(target)` 写到新目标（同 FR-1.1 的四种类型）。
- FR-6.2 写出 ZIP 顺序保持稳定（先 `[Content_Types].xml`，再 `_rels/`，再各 Part），便于字节级 diff。
- FR-6.3 `autoSave=true` 且 dispose 时自动调用 `saveAsync`。

### FR-7 错误与诊断
- FR-7.1 全部抛出对象继承 `OpenXmlPackageError`，含 `code`、`partUri?`、`relationshipId?`。
- FR-7.2 提供 `OpenXmlPackageValidationResult` 列出关系孤儿、Content-Types 缺失、`rId` 重复等异常；MVP 仅作信息性枚举，不强制中断。

### FR-8 互操作样例
- FR-8.1 `examples/` 提供：打开 → 修改 Hyperlink → 写回；新建空包 + 添加 Document Part 两段最小可运行脚本。

## 10. 非功能需求

### NFR-1 性能
- NFR-1.1 单包 1 MB 打开 + 枚举 ≤ 100 ms p95；写回 ≤ 200 ms p95（Node 20、Bun 1.1，本地 NVMe）。
- NFR-1.2 内存占用：1 MB 包打开后常驻 ≤ 5 × 包体；流式打开模式不要求把全部 Part 解码到内存。

### NFR-2 兼容性
- NFR-2.1 Node ≥ 20.10 与 Bun ≥ 1.1 均通过 CI 矩阵。
- NFR-2.2 ESM-only，`exports` 字段精确导出；明确不支持 CommonJS。
- NFR-2.3 浏览器侧 API 不依赖 `node:fs`、`Buffer`；MVP 不保证浏览器 bundle 由本仓库发布。

### NFR-3 可测试性
- NFR-3.1 单元测试覆盖率 ≥ 85%（vitest + v8 coverage）。
- NFR-3.2 提供「真实样例文档」往返测试用例 ≥ 5，覆盖至少 docx/xlsx/pptx 三族各一个。
- NFR-3.3 关键路径（Part 读写、Relationships、Content-Types）提供 Bun 与 Node 双跑测试。

### NFR-4 安全
- NFR-4.1 拒绝解压超过 100 MB 的单文件 Part 或 ZIP 总和超过 500 MB（可配置上限）。
- NFR-4.2 严格校验 Part URI（防御 `..` 路径穿越）。
- NFR-4.3 不执行外部 entity（XXE）：所有 XML 读取走 SAX/Pull 路径，不解析外部 DTD。

### NFR-5 可观察性
- NFR-5.1 暴露 `package.diagnostics` 只读字段，记录关闭时的 Part 数量、Relationship 数量、警告条目。
- NFR-5.2 `OPENXML_TS_DEBUG=1` 环境变量打开 verbose 日志，落到 `console.debug`。

### NFR-6 可维护性
- NFR-6.1 公共 API 必须有 TSDoc，含与 .NET SDK 对应类型的链接（如 `// .NET: DocumentFormat.OpenXml.Packaging.OpenXmlPackage`）。
- NFR-6.2 仓库严格遵守 Conventional Commits + release-please 自动发版。
- NFR-6.3 每个公共方法在源 SDK 中的等价位置必须以注释或 docs 矩阵记录。

### NFR-7 合规与法律
- NFR-7.1 LICENSE 沿用 MIT 并显式标注 .NET Foundation 原作归属。
- NFR-7.2 严禁直接复制 Microsoft 闭源/示例数据中受版权保护的测试文件；样例数据需自制或采用上游 `data/` 目录中 MIT 授权材料。

## 11. Epic 列表与发布顺序

| Epic | 范围 | 状态 |
| --- | --- | --- |
| Epic-0 | 项目脚手架 / BMAD / CI | ✅ 已完成（issue #1） |
| Epic-1 | **OPC Packaging 内核（MVP）** | 🚧 当前 |
| Epic-2 | WordprocessingML schema 类与基础 API | 计划 |
| Epic-3 | SpreadsheetML schema 类与基础 API | 计划 |
| Epic-4 | PresentationML schema 类与基础 API | 计划 |
| Epic-5 | LINQ to XML 兼容层 | 可选 |
| Epic-6 | 浏览器构建与样例 | 可选 |

发布节奏：Epic-1 完成后切 `v0.1.0`（标 `latest` 但保留 `unstable` 警示）；Epic-2/3/4 各自完成后递增 minor；公共 API 在 Epic-4 完成前可破坏性变更，需在 CHANGELOG 显式标记。

## 12. 风险与缓解

| 风险 | 影响 | 缓解 |
| --- | --- | --- |
| ZIP 后端选型不当（性能/正确性偏） | 整个 OPC 内核需要重写 | Architect 阶段产出至少两个候选的对比基准，先做小样例 spike |
| 与 .NET SDK 行为差异隐藏深 | 双栈互换文档时静默错位 | 引入 `.NET 端 cli 工具 + TS 端 cli 工具`，对同一 docx 做差异化对照 |
| Web Streams 在浏览器/Bun 上的细节不一致 | 浏览器旅程 C 落不了 | MVP 不承诺浏览器；接口语义先按 Node + Bun 收敛 |
| Schema 巨大（数千元素）拖垮包体 | tree-shaking 难，包体爆炸 | 用源 SDK 同款 codegen，按 namespace 拆 entry-points；MVP 不引入 Schema 类 |
| `using` 语义不被旧 TS 项目使用 | 内存泄漏频发 | 提供 `await package.dispose()` 兼容 API；在 README 与样例强调 |

## 13. 衔接

- 由 **Architect 代理（Winston）** 在 [docs/planning/architecture.md](./architecture.md) 明确：模块拆分、ZIP 后端选型、Web Streams 适配层、错误模型、目录结构、构建/发布管线。
- 由 **SM 代理** 把 FR-1 .. FR-8 拆成 Story-1.1 .. Story-1.N，逐条登记为 GitHub Issue（label=`feature`，中文标题），与 Epic-1 关联。
