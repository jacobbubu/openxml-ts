---
stepsCompleted: []
inputDocuments:
  - docs/planning/epic-3-prd.md
  - docs/planning/epic-3-architecture.md
workflowType: 'epics'
projectName: openxml-ts
epic: 'Epic-3 / Excel · SpreadsheetML'
language: zh-CN
---

# Epic-3 · SpreadsheetML 拆分

## 概述

按 [Epic-3 PRD](../planning/epic-3-prd.md) §7（E3-1..E3-12）+ [Epic-3 Architecture](../planning/epic-3-architecture.md) §2..§10，把 Excel schema 类工作拆成 10 条 Story。

整体策略：先把 **codegen 跑通**（Story 3.1）→ **typed Parts 基础**（3.2-3.3）→ **跨 Part 解引用专题**（3.4，Epic-3 专属难点）→ **门面 + 工厂**（3.5）→ **CalcChain 失效**（3.6）→ **roundtrip + 子 entry + bench**（3.7-3.9）→ **0.3.0 发版**（3.10）。

属性级 Validator（Story-2.7）已在 codegen 中注入，Excel 走同一管线零增量 → Epic-3 不立独立 validator story。

## 需求覆盖映射

| Story | 覆盖的 FR | 关键 NFR | Architecture 章节 |
| --- | --- | --- | --- |
| 3.1 | E3-1（element 类 codegen） | NFR-3.4 | §6 |
| 3.2 | E3-3（WorkbookPart）、E3-4（WorksheetPart） | NFR-3.5 | §5 |
| 3.3 | E3-6（次要 typed Part） | NFR-3.5 | §5 |
| 3.4 | E3-5（SST 跨 Part 解引用） | — | §4 |
| 3.5 | E3-2（SpreadsheetDocument）、E3-7（create()） | NFR-3.5 | §3 |
| 3.6 | E3-5 配套（CalcChain 失效） | NFR-3.1 | §0、§4.3 |
| 3.7 | Roundtrip 黄金样例 | — | §8 |
| 3.8 | E3-8（子 entry + size-limit） | NFR-3.3 | §2 |
| 3.9 | E3-10（bench）+ E3-12（Diagnostics） | NFR-3.1, NFR-3.2 | §8 |
| 3.10 | E3-11（人工验证 + 0.3.0 发版） | NFR-3.6 | §8 |

## Story 列表

### Story 3.1: 跑 codegen 产出 spreadsheetml ~600 个 element 类

**As a** SDK Dev，
**I want** 把现有 `tools/schema-codegen/generate.ts` 跑在 spreadsheetml JSON 上，产出 `src/excel/generated/*.ts`，
**so that** 后续 typed Parts 与门面有 strongly-typed element 类可用。

**AC**:
- **Given** `data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json` 与 codegen 入口，
  **When** Story 完成，
  **Then** `src/excel/generated/` 含约 600 个 element 类（每类一文件 + `_registry.ts` + `index.ts`），全部通过 `pnpm typecheck`。
- **And** 若 codegen 缺 inline simpleType enum / 其它 spreadsheetml 专属语法支持，在 `tools/schema-codegen/transforms/` 增量改进；改后**重跑 word codegen**，`git diff src/word/generated/` 必须为零。
- **And** 跑一次 `pnpm build` 通过，未把 generated 文件牵进 root entry 的 bundle（size-limit root 仍 ≤ 100 KB）。

**Dependencies:** Story-2.5（codegen 管线已成熟）
**Out of scope:** typed Parts、SST 解引用、门面、bench。

---

### Story 3.2: WorkbookPart + WorksheetPart typed Parts

**As a** SDK Dev，
**I want** `WorkbookPart` 与 `WorksheetPart` 两个 typed Part 子类，包含 part-level 关系解析（worksheet 集合），
**so that** 用户能从 `SpreadsheetDocument.workbookPart.worksheetParts[i].worksheet` 拿到 element 树。

**AC**:
- **Given** Architecture §5 的 Part 表，
  **When** Story 完成，
  **Then** `src/excel/parts/workbook-part.ts` 与 `worksheet-part.ts` 提供：
  - 静态 `contentType` / `relationshipType` 常量；
  - `WorkbookPart.workbook`（typed root，返回 `Workbook` element 实例）；
  - `WorkbookPart.worksheetParts: WorksheetPart[]`（按关系顺序）；
  - `WorksheetPart.worksheet: Worksheet`（typed root）。
- **And** `TypedXmlPart<T>` 缓存语义沿用 Story-2.6：多次访问返回同一实例，未访问不触碰字节流。
- **And** vitest 覆盖 ≥ 90% 行（不含 generated）。

**Dependencies:** 3.1
**Out of scope:** SST / 样式 / theme 等次要 Part；门面。

---

### Story 3.3: SharedStringTablePart / WorkbookStylesPart / CalculationChainPart / ThemePart typed Parts

**As a** SDK Dev，
**I want** 把剩余 4 个 typed Part 都做出来，
**so that** Architecture §5 表里 6 个 typed Part 全部齐全，门面层可以一次性接入。

**AC**:
- **Given** Architecture §5，
  **When** Story 完成，
  **Then** `src/excel/parts/` 提供 `SharedStringTablePart`、`WorkbookStylesPart`、`CalculationChainPart`、`ThemePart` 四个类。
- **And** 每个 typed Part 暴露：static `contentType` / `relationshipType`；typed root 属性（如 `SharedStringTablePart.sharedStringTable`）；缓存语义与 3.2 一致。
- **And** `ThemePart` 已在 word 子系统存在——本 Story **抽出共享 typed Part 基类**到 `src/element/typed-parts/theme-part-base.ts`（或同等位置），word 与 excel 同时引用，零字节 diff。

**Dependencies:** 3.1, 3.2
**Out of scope:** SST 解引用 helper（Story 3.4）。

---

### Story 3.4: SharedStringResolver + Cell.resolvedText partial（跨 Part 解引用专题）

**As a** SDK Dev，
**I want** Cell 实例可以 `c.resolvedText` 直接拿到解引用后的文本（含 sharedString / inlineStr / 直接 cellValue 三种 dataType），
**so that** 用户不用手算 SST 偏移。

**AC**:
- **Given** Architecture §4.2 的契约，
  **When** Story 完成，
  **Then** `src/excel/shared-string-table.ts` 暴露 `SharedStringResolver`，含 `resolve(idx)` 与 `intern(phrase)`；`intern` 维护 `Map<string, number>` 强制去重。
- **And** `src/excel/extensions/cell-extensions.ts` 通过 partial mixin 给 codegen 产出的 `Cell` 类挂 `resolvedText` getter；不修改 `src/excel/generated/cell.ts`。
- **And** getter 行为：
  - `dataType === "s"`：走所属 worksheet 反向找 `WorkbookPart → SharedStringTablePart → SharedStringResolver.resolve(parseInt(cellValue))`；
  - `dataType === "inlineStr"`：拼 `<is><t>...` 段；
  - 其它（`n` / `str` / `b` / 空）：直接返回 `cellValue?.text`。
- **And** 孤儿 Cell（无 parent worksheet）返回 `undefined`，不抛错。
- **And** `SharedStringResolver.intern` 在 1000 项规模下复杂度 O(1) per call（vitest perf 抽样验证）。
- **And** 单测覆盖 sharedString / inlineStr / numeric / 孤儿 / intern 去重 5 类场景。

**Dependencies:** 3.3
**Out of scope:** CalcChain 失效。

---

### Story 3.5: SpreadsheetDocument 强类型门面 + create() 工厂

**As a** SDK Dev，
**I want** `SpreadsheetDocument` 类对位 `WordprocessingDocument`：HAS-A `MemoryOpenXmlPackage`，含 `openAsync` / `saveAsync` / `saveAsBytesAsync` / `saveAsAsync` / `create()`，
**so that** 用户用法与 Word 子系统对称。

**AC**:
- **Given** Architecture §3 的形态，
  **When** Story 完成，
  **Then** `src/excel/spreadsheet-document.ts` 提供 `SpreadsheetDocument`，与 `WordprocessingDocument` 行为对称（含 `[Symbol.asyncDispose]`）。
- **And** `SpreadsheetDocument.create()` 生成最小可用 xlsx：含 `xl/workbook.xml`（默认 1 个 Sheet1）、`xl/worksheets/sheet1.xml`、`xl/sharedStrings.xml`（空表 + `count="0"`）、`[Content_Types].xml`、`_rels/.rels`、`xl/_rels/workbook.xml.rels`。
- **And** `create() → saveAsBytesAsync → openAsync` 三轮等价。
- **And** Excel Desktop 打开 `create()` 输出零警告（人工验证留到 Story 3.10）。
- **And** 注册 `PackageDiagnostics.elementCounter` 回调（与 Story-2.10 同样的 callback injection 模式）。

**Dependencies:** 3.2, 3.3
**Out of scope:** CalcChain / Roundtrip / 子 entry。

---

### Story 3.6: CalcChain 自动失效 + Cell dirty tracking

**As a** SDK Dev，
**I want** 修改任一 Cell 的 `cellValue` / `cellFormula` 后，flush 阶段自动丢弃 `CalcChainPart`，
**so that** Excel 重 open 时自动重算，避免 stale CalcChain 与新数据不一致。

**AC**:
- **Given** Architecture §0（设计原则 3）与 §4.3，
  **When** Story 完成，
  **Then** Cell 上挂 `_dirty: boolean`（非导出字段）；setter 触发 `cellValue` / `cellFormula` 时标 dirty。
- **And** `SpreadsheetDocument.flushAllTypedParts()` 在写出阶段检测 worksheet 树里是否有任一 dirty Cell；若有，删除 `CalculationChainPart` 与对应关系。
- **And** flush 后 `_dirty` 状态被清零（重新 dirty 需新 setter 调用）。
- **And** 单测：开一个含 CalcChain 的 xlsx → 修改 Cell.cellValue → saveAsBytesAsync → reopen → CalcChainPart 已不存在。
- **And** 反向测：开一个含 CalcChain 的 xlsx → 仅访问不修改 → saveAsBytesAsync → reopen → CalcChainPart 仍存在。

**Dependencies:** 3.5
**Out of scope:** 公式求值。

---

### Story 3.7: Roundtrip 真实样例 + element golden 生成器适配

**As a** SDK Dev，
**I want** ≥ 3 个真实 xlsx 样例进入 `test/excel/fixtures/`，跑三轮字节等价 + element golden 对比，
**so that** Excel 子系统有与 Word 同等的 roundtrip 保真守护。

**AC**:
- **Given** Story-2.8 的 element golden 生成器，
  **When** Story 完成，
  **Then** `test/excel/fixtures/` 含至少 3 个真实 xlsx（取 `dotnet/Open-XML-SDK` test fixture 或自造）。
- **And** `test/excel/roundtrip/` 跑「open → saveAsBytes → reopen → element 树等价」+「golden 文件 diff 为零」。
- **And** golden 生成器支持 spreadsheetml 命名空间（namespace 注册即可用，无额外改动应优先）。

**Dependencies:** 3.5
**Out of scope:** bench / 人工验证。

---

### Story 3.8: 子 entry `openxml-ts/excel` + tree-shake size-limit 守护

**As a** package 维护者，
**I want** `openxml-ts/excel` 作为独立 entry 在 `package.json#exports` 暴露，并加 size-limit 三条阈值（root / excel minimal / excel full），
**so that** 用户只 import `Cell + Row + Worksheet` 时 bundle 体积可控。

**AC**:
- **Given** Architecture §2，
  **When** Story 完成，
  **Then** `package.json#exports` 增加：
  - `./excel` → `dist/excel/index.js`；
  - `./excel/generated/*` → `dist/excel/generated/*.js`（深 import 允许）。
- **And** `package.json#size-limit` 增加 3 条：
  - root（继承 100 KB）维持；
  - `openxml-ts/excel minimal (Cell + Row + Worksheet)` ≤ 50 KB gzip；
  - `openxml-ts/excel (full bundle including registry)` ≤ 600 KB gzip。
- **And** CI `verify-size` job 跑 `pnpm size` 覆盖全部 size-limit 条目。
- **And** README 增 Excel 子 entry 段（与 Story-2.9 的 Word 段对称）。

**Dependencies:** 3.5
**Out of scope:** bench。

---

### Story 3.9: bench/excel.bench.ts + PackageDiagnostics Excel 视角 + examples

**As a** SDK 维护者，
**I want** Excel 子系统的性能基线 + Diagnostics 扩展 + 两个 example 脚本，
**so that** 0.3.0 发版前 NFR-3.1 / NFR-3.2 有量化证据，用户路径有可跑的示例。

**AC**:
- **Given** Architecture §8 + Story-2.10 的 `bench/word.bench.ts` 形态，
  **When** Story 完成，
  **Then** `bench/excel.bench.ts` 含 ≥ 3 类用例：open + 遍历 Cell；修改单元格 + saveAsBytes；create + 填 N 行 + saveAsBytes。
- **And** `vitest bench --run` 跑出 p95：
  - 1 MB xlsx open + element 树构建 ≤ 300 ms；
  - 1 MB xlsx saveAsBytes ≤ 200 ms。
- **And** `docs/implementation/bench-baseline.md` 增 Epic-3 段（含均值 / p99）。
- **And** `examples/excel-create.ts` 与 `examples/excel-replace.ts` 可执行：
  - create：构造一份含 3 行 5 列的 xlsx；
  - replace：把含 `{{client}}` 的 Cell 替换为指定值（参 word-replace 形态）。
- **And** `PackageDiagnostics` 复用 Story-2.10 的 callback injection：`SpreadsheetDocument` 注册 element counter，已访问 typed Part 的 element 数 / unknown 数纳入 diagnostics。

**Dependencies:** 3.5
**Out of scope:** 人工验证 + 发版。

---

### Story 3.10: 人工验证 + 0.3.0 发版

**As a** 项目主理人，
**I want** 用 Excel Desktop + Office Web 把 examples 输出 + 3 个 roundtrip fixture 都打开一遍，零警告，并触发 release-please 发出 v0.3.0，
**so that** Epic-3 整体完工，进入 Epic-4。

**AC**:
- **Given** 3.9 产出的 examples 输出 + 3.7 的 roundtrip fixtures，
  **When** Story 完成，
  **Then** Excel Desktop（macOS 或 Windows）+ Office Web 各打开一次：
  - `examples/excel-create.ts` 输出 → 3 行 5 列内容正确，无修复提示；
  - `examples/excel-replace.ts` 输出 → 占位已替换，无修复提示；
  - 3 个 roundtrip fixture 经 openAsync → saveAsBytes 写回后打开 → 无修复提示。
- **And** `docs/implementation/manual-test.md` 增 Epic-3 / Story-3.10 表格，记录日期 + 结果。
- **And** main 合入「manual-test 回写」commit 后，release-please 自动开 release PR；合并触发 `v0.3.0` tag + CHANGELOG。
- **And** 任一行人工验证弹「需要修复」视作 release-blocking，需先开 bug issue 修复后再走发版。

**Dependencies:** 3.7, 3.8, 3.9
**Out of scope:** Epic-4。

---

## Story 依赖图

```
3.1 (codegen run)
  │
  ├─→ 3.2 (Workbook/WorksheetPart) ─→ 3.3 (其它 typed Parts) ─→ 3.4 (SST 解引用) ─┐
  │                                                                              │
  │                                                                              ▼
  └──────────────────────────────────────────────────────────→ 3.5 (Document 门面)
                                                                  │
            ┌─────────────────────────────────────────────────────┼──────────────────────┐
            ▼                                                     ▼                      ▼
        3.6 (CalcChain)                                       3.7 (Roundtrip)         3.8 (子 entry)
                                                                                          │
                                                                                          ▼
                                                                                      3.9 (bench + diag + examples)
                                                                                          │
                                                                                          ▼
                                                                                      3.10 (人工 + 发版)
```

## 风险与回滚

- 3.1 codegen 增强若回写到 word 出现 diff → 该 Story 不可合入，先修 codegen transforms 或回退增强。
- 3.4 `Cell.resolvedText` 设计若用户体验偏差大 → 退路是把 getter 改成 helper 函数 `resolveCellText(c)`；mixin 已在 extensions/ 隔离，回退成本低。
- 3.10 任一 fixture 人工验证 fail → 视为 release-blocking，立刻新开 bug issue，0.3.0 推迟。
