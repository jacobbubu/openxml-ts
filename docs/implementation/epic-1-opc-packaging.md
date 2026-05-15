---
stepsCompleted: []
inputDocuments:
  - docs/planning/project-brief.md
  - docs/planning/prd.md
  - docs/planning/architecture.md
workflowType: 'epics'
projectName: openxml-ts
epic: 'Epic-1 / MVP · OPC Packaging'
language: zh-CN
---

# Epic-1 / MVP · OPC Packaging 拆分

## 概述

把 .NET Open-XML-SDK 的 OPC Packaging 内核（`src/DocumentFormat.OpenXml.Framework/Packaging`）按照 [PRD §9](../planning/prd.md#9-功能需求epic-1--mvp) 的 FR-1..FR-8 与 [Architecture §16](../planning/architecture.md#16-衔接到-sm-阶段) 推荐分解，落到 9 条可独立交付的 Story。

每条 Story 一个 GitHub Issue（label `feature`，milestone「Epic-1 / MVP · OPC Packaging」），一个 `codex/<id>-<slug>` 分支，一个 PR，merge 后关闭。

## 需求覆盖映射

| Story | 覆盖的 FR | 关键 NFR | Architecture 章节 |
| --- | --- | --- | --- |
| 1.1 | 全 FR 的接口基础；FR-7（错误） | NFR-3, NFR-6 | §1, §3, §6 |
| 1.2 | FR-1, FR-2（内存路径） | NFR-3 | §1, §9 |
| 1.3 | FR-4 | NFR-4 | §5 |
| 1.4 | FR-3 | NFR-3 | §3, §5 |
| 1.5 | FR-1, FR-6 | NFR-1, NFR-2, NFR-4 | §4 |
| 1.6 | FR-2 | NFR-1, NFR-3 | §3, §7 |
| 1.7 | FR-5 | NFR-3 | §5 |
| 1.8 | FR-8 + 验证 NFR-2/NFR-3 | NFR-2, NFR-3 | §12 |
| 1.9 | 验证 NFR-1；FR-7 诊断 | NFR-1, NFR-5 | §10, §11 |

## Story 列表

### Story 1.1: 接口契约 + 错误模型

**As a** SDK 维护者，
**I want** OPC 内核的 TypeScript 接口与错误类型先于实现确定下来，
**so that** 后续 Story 可以并行实现，且公共 API 形状不会因为局部 backend 决策被回收重塑。

**Acceptance Criteria:**

- **Given** Architecture §3 给出的 .NET → TS 映射表，
  **When** Story 完成，
  **Then** `src/packaging/interfaces/` 暴露 `IPackage`、`IPackagePart`、`IPackageRelationship`、`IPackageProperties`、`IRelationshipCollection`、`PartUri`、`TargetMode`、`CompressionLevel` 等核心类型，全部 `strict` 通过。
- **Given** Architecture §6 的错误码枚举，
  **When** Story 完成，
  **Then** `src/packaging/errors.ts` 暴露 `OpenXmlPackageError` 基类 + `OpenXmlPackageErrorCode` 字面量联合，`cause` 透传底层异常，有完整 vitest 单测覆盖序列化 / `instanceof` / `code` narrowing。
- **And** `src/index.ts` re-export 上述类型；`pnpm typecheck && pnpm test && pnpm build` 全绿。

**Dependencies:** —
**Out of scope:** 任何后端实现；ContentTypes / Relationships 的具体序列化。

---

### Story 1.2: MemoryPackageBackend + 基础生命周期

**As a** SDK Dev，
**I want** 一个不依赖 ZIP 的内存后端实现 `IPackage`，
**so that** ContentTypes / Relationships / Parts 的高层逻辑能在不接 ZIP 的情况下被独立验证。

**Acceptance Criteria:**

- **Given** Story 1.1 的接口，
  **When** `MemoryPackageBackend` 实现完成，
  **Then** `OpenXmlPackage.openSync(bytes, opts)` 支持 `Uint8Array`（空包 = 仅 Content-Types）输入，并提供 `OpenXmlPackage.createInMemory()` 静态工厂。
- **And** 实例支持 `[Symbol.dispose]` / `[Symbol.asyncDispose]`，二次 dispose 幂等。
- **And** 同步 `addPart` / `deletePart` 路径就绪（无序列化校验），单测覆盖 ≥ 90% 行。

**Dependencies:** 1.1
**Out of scope:** ContentTypes 的实际 XML 解析；ZIP 后端。

---

### Story 1.3: Content-Types 读写

**As a** SDK Dev，
**I want** OPC 必备的 `[Content_Types].xml` 解析与序列化，
**so that** 每个 Part 在添加 / 读取时都能正确推断 MIME 类型。

**Acceptance Criteria:**

- **Given** Architecture §5 选择手写 XML 路径，
  **When** Story 完成，
  **Then** `src/packaging/content-types/` 暴露 `ContentTypeManifest`，能解析 `Default extension="..."` 与 `Override partName="..."`、保留顺序、回写后字节级稳定。
- **And** 解析非法 XML（缺命名空间、属性缺失、非法字符）抛 `OpenXmlPackageError({ code: "MISSING_CONTENT_TYPES" | "BACKEND_ERROR" })`，覆盖至少 6 个负向测试。
- **And** 安全：禁用 DTD、元素深度上限 64；fast-check 模糊测试通过。

**Dependencies:** 1.1
**Out of scope:** 与 Part 增删的联动（放到 1.6）。

---

### Story 1.4: Relationships 读写 + rId 算法

**As a** SDK Dev，
**I want** 完整的 Relationship 模型（包级与 Part 级），并保持 `rId` 生成算法与 .NET 一致，
**so that** 双栈互换文档不会因为 rId 漂移导致 Office 客户端报错。

**Acceptance Criteria:**

- **Given** 源 SDK `PackageRelationshipBuilder` 的 rId 生成逻辑，
  **When** 我调用 `relationships.add({ type, target, targetMode })` 不指定 id，
  **Then** 生成的 id 与 .NET 端在同等输入下完全相同（含已有 id 冲突时的 `rIdN` 递增策略）。
- **And** `.rels` XML 读写保持顺序稳定；内部/外部关系区分；`Hyperlink` 子类（`type=...hyperlink`）暴露便捷构造。
- **And** id 重复 → `OpenXmlPackageError({ code: "RELATIONSHIP_ID_CONFLICT" })`；目标 URI 非法 → `RELATIONSHIP_TARGET_INVALID`。

**Dependencies:** 1.1, 1.3
**Out of scope:** Hyperlink 业务校验（仅基础形态）。

---

### Story 1.5: ZipPackageBackend（@zip.js/zip.js 接入）

**As a** SDK Dev，
**I want** 把 ZIP I/O 通过 `@zip.js/zip.js` 接入 `IPackage`，
**so that** SDK 可以打开真实 docx/xlsx/pptx 文件而不只是内存对象。

**Acceptance Criteria:**

- **Given** Architecture §4 ADR-002，
  **When** Story 完成，
  **Then** `OpenXmlPackage.openAsync(source)` 支持 `string`（路径）/`Uint8Array`/`ReadableStream`/`Blob` 四类输入；Node、Bun、浏览器（vite build）三端 import 均 tree-shake 通过。
- **And** `saveAsAsync(target)` 写出的 ZIP 顺序稳定：先 `[Content_Types].xml`、再 `_rels/.rels`、再各 Part；可与上一次 open 的字节流做稳定 diff。
- **And** ZIP 损坏 → `INVALID_ZIP`；总和超 500 MB 或单 Part 超 100 MB → `SECURITY_VIOLATION`（可配）。
- **And** Bun + Node 双跑 vitest 全绿。

**Dependencies:** 1.1, 1.3, 1.4
**Out of scope:** Flat OPC；性能基线（1.9）。

---

### Story 1.6: Parts CRUD + 流式读写

**As a** SDK Dev，
**I want** 在 Zip 后端上完整支持 Part 的增删改 + Web Streams 读写，
**so that** 真实的「打开包 → 改某个 Part → 写回」流程可端到端跑通。

**Acceptance Criteria:**

- **Given** Stories 1.3、1.4、1.5 已落地，
  **When** Story 完成，
  **Then** `package.addPart`、`package.deletePart`、`part.openReadStream()`、`part.writeAsync(input)` 全部可用；`writeAsync` 支持 `Uint8Array` / `ReadableStream<Uint8Array>` / `Blob` / `string`（UTF-8）。
- **And** 删除 Part 自动清掉指向它的 Relationship（包级 + 各 Part 级），同时按规则刷新 Content-Types。
- **And** Part URI 非法（穿越、绝对路径、空字符串）抛 `INVALID_PART_URI`。
- **And** vitest 覆盖率 ≥ 85%（含 backend 层）。

**Dependencies:** 1.3, 1.4, 1.5
**Out of scope:** Flat OPC；MediaDataPart 高级行为（占位即可）。

---

### Story 1.7: Flat OPC 互转

**As a** SDK Dev，
**I want** `OpenXmlPackage.toFlatOpc()` 与 `fromFlatOpcAsync(xml)` 两个方向都实现，
**so that** 用户可以把 ZIP 包与 Flat OPC（Word/2007 的 XML 容器）互换。

**Acceptance Criteria:**

- **Given** 一份真实 docx，
  **When** 我调用 `toFlatOpc()` 然后立刻 `fromFlatOpcAsync(xml)`，
  **Then** 两个包的 Parts、Relationships、Content-Types 等价（顺序与字节差异限定在 ZIP 元数据）。
- **And** Flat OPC 输入缺关键元素时抛 `MISSING_CONTENT_TYPES` / `INVALID_PART_URI` 等明确码。
- **And** 与源 SDK `FlatOpcExtensions` 行为对照测试覆盖至少 3 个样例。

**Dependencies:** 1.5, 1.6
**Out of scope:** Office 客户端兼容性细节（由 1.8 兜底）。

---

### Story 1.8: Roundtrip 真实样例测试集 + Golden 生成器

**As a** SDK Dev，
**I want** 一组真实 docx/xlsx/pptx 样例 + .NET 端预生成的「黄金参照」，
**so that** 我们能持续验证 OPC 内核与微软实现的兼容性。

**Acceptance Criteria:**

- **Given** 公司/开源可用的样例集（MIT 或自制），
  **When** Story 完成，
  **Then** `test/fixtures/golden/` 至少包含 1 docx、1 xlsx、1 pptx 样例 + 同名 `.golden.json`（用 .NET tooling 离线生成）。
- **And** `test/roundtrip/*.test.ts` 跑读 → 写 → 读三轮，与 `.golden.json` 对比 Parts、Relationships、Content-Types 等价。
- **And** Word/Excel/PowerPoint Desktop 与 Web 客户端打开输出文件零警告（手工记录到 `docs/implementation/manual-test.md`）。
- **And** `tools/golden-generator/` 包含 .NET 6+ 项目 + README 写明如何刷新。

**Dependencies:** 1.5, 1.6, 1.7
**Out of scope:** 自动化跑 Office 客户端打开（不实际可行）。

---

### Story 1.9: 性能基线 + Diagnostics + 0.1.0 发版准备

**As a** SDK 维护者，
**I want** OPC 内核在合并完所有功能 Story 之后跑一遍性能基线、补齐 diagnostics，并准备 0.1.0 发版，
**so that** 用户首次安装得到的版本是可信、可观测、可被 release-please 持续维护的。

**Acceptance Criteria:**

- **Given** PRD NFR-1 的性能指标，
  **When** 我运行 `pnpm bench`（vitest bench），
  **Then** 1 MB 包 open + 枚举 ≤ 100 ms p95、saveAsAsync ≤ 200 ms p95；结果写入 `docs/implementation/bench-baseline.md`。
- **And** `package.diagnostics` 暴露 Part 数、Relationship 数、警告列表；`OPENXML_TS_DEBUG=1` 开 verbose 日志（NFR-5.1/5.2）。
- **And** `CHANGELOG.md` 由 release-please 在合并到 main 后生成 `0.1.0` PR；README 增加「快速开始」+「OPC 心智地图」两章。
- **And** Release Notes 引用 brief / PRD / architecture，并列出 9 个 Story 的关闭链接。

**Dependencies:** 1.1..1.8
**Out of scope:** Schema 类（Epic-2+）。

---

## 依赖图（拓扑）

```
1.1 ──┬─> 1.2
       ├─> 1.3 ──┬─> 1.4 ──┐
       │         └─────────┼─> 1.5 ──> 1.6 ──> 1.7 ──┐
       │                   │                          │
       │                   └──────────────────────────┴─> 1.8 ──> 1.9
       └─> 1.4（继承 1.3 顺序）
```

可并行：
- 1.2 与 1.3 并行；
- 1.4 在 1.3 之后；
- 1.5 起 ZIP 接入是关键路径；
- 1.7 与 1.6 完成后并行；
- 1.8 收口往返测试；
- 1.9 收尾发版。

## GitHub 落地

- Milestone：**Epic-1 / MVP · OPC Packaging**（[#1](https://github.com/jacobbubu/openxml-ts/milestone/1)）
- Epic 跟踪 issue：[#3](https://github.com/jacobbubu/openxml-ts/issues/3)
- Story issues：[#4](https://github.com/jacobbubu/openxml-ts/issues/4) 1.1 · [#5](https://github.com/jacobbubu/openxml-ts/issues/5) 1.2 · [#6](https://github.com/jacobbubu/openxml-ts/issues/6) 1.3 · [#7](https://github.com/jacobbubu/openxml-ts/issues/7) 1.4 · [#8](https://github.com/jacobbubu/openxml-ts/issues/8) 1.5 · [#9](https://github.com/jacobbubu/openxml-ts/issues/9) 1.6 · [#10](https://github.com/jacobbubu/openxml-ts/issues/10) 1.7 · [#11](https://github.com/jacobbubu/openxml-ts/issues/11) 1.8 · [#12](https://github.com/jacobbubu/openxml-ts/issues/12) 1.9
- 每个 Story 一条分支：`codex/<issue-id>-story-1-x`。PR 标题 `feat: ... (#<issue-id>)`。
