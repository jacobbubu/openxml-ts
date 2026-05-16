---
stepsCompleted: []
inputDocuments:
  - docs/planning/project-brief.md
  - docs/planning/prd.md
  - docs/planning/architecture.md
  - docs/planning/epic-2-prd.md
  - docs/planning/epic-2-architecture.md
workflowType: 'prd'
projectName: openxml-ts
epic: 'Epic-3 · SpreadsheetML'
language: zh-CN
---

# PRD — Epic-3 / SpreadsheetML

**作者：** BMAD PM 代理（John）
**日期：** 2026-05-16
**版本：** v0.1（草案）
**输入：** [Epic-0/1 PRD](./prd.md) · [Epic-2 PRD](./epic-2-prd.md) · [v0.2.0 已发布的 Word 子系统](https://github.com/jacobbubu/openxml-ts/releases/tag/v0.2.0)
**关联：** GitHub issue #29（feature）

## 1. 愿景

让用户在 `openxml-ts` 上能像在 .NET `DocumentFormat.OpenXml.Spreadsheet` 上一样**强类型地读写 Excel 工作簿**——从 `SpreadsheetDocument.openAsync(path)` 到 `wb.workbookPart.worksheetParts[0].worksheet.descendants(Cell)`——同一份心智模型、同一组 element 类名。Word 已经把这条路走通；Excel 是在同一管线上换一份 schema 输入。

## 2. 执行摘要

Epic-2 已经把「OPC + Element + Schema codegen + 强类型 Part + 子 entry + size-limit + Roundtrip + Bench」整条管线打通并跑过一次真实 Word 子系统。Epic-3 在这条管线上**复用 90% 的内核**，长出 SpreadsheetML 这一支：

- **复用零成本**：`OpenXmlElement` / `OpenXmlCompositeElement` / `OpenXmlLeafElement` / `OpenXmlUnknownElement` / `ElementRegistry` / `TypedXmlPart<T>` / `ElementSerializer` / `Validator` / 子 entry 模式 / size-limit / roundtrip golden 生成器；
- **新增专属**：spreadsheetml namespace 的 ~600 个 element 类（小于 Word 的 ~720）、`SpreadsheetDocument` 门面、`WorkbookPart`/`WorksheetPart`/`SharedStringTablePart`/`WorkbookStylesPart`/`CalculationChainPart` 等 typed Part；
- **新增风险**：**SharedStringTable 是跨 Part 引用**——`<c t="s"><v>3</v>` 的 `3` 指向 `xl/sharedStrings.xml` 的第 3 项。这是 Word 没有的「Part 间索引一致性」问题，需要在 typed 层提供方便的访问而不是要求用户手算偏移。

成功的衡量：用 `openxml-ts/excel` 写一段「打开模板 → 改一个单元格 → 写回」的 30 行代码，与等价 .NET 代码在产物字节上行为一致；Excel Desktop / Office Web 打开零警告；按 namespace tree-shake 友好（只用 `Cell + Row + Worksheet` 时不拖入全部 600 个）。

## 3. 成功指标

| 类别 | 指标 | Epic-3 阈值 |
| --- | --- | --- |
| 正确性 | `SpreadsheetDocument` 与 .NET SDK 同一份 xlsx 的 Element 树等价（位置 + 属性 + 文本 + 共享串解引用） | 100% on 黄金 fixture |
| 正确性 | 改一个 Cell 写回，与 .NET 同样改动后产物字节一致（允许 ZIP 元数据差异） | 100% |
| 客户端兼容 | Excel Desktop + Office Web 打开零警告 | 通过 5 个代表样例 |
| Schema 覆盖 | spreadsheetml 主 namespace 的 element 类数 | ≥ 95%（约 570 / 600） |
| 类型严格度 | 所有生成类通过 `strict + exactOptionalPropertyTypes` | 100% |
| Tree-shake | 「只用 `Cell + Row + Worksheet`」的最小用例 bundle 大小 | ≤ 50 KB gzip |
| Tree-shake | `openxml-ts/excel` 完整 namespace bundle 大小 | ≤ 600 KB gzip |
| 性能 | 1 MB xlsx 打开 + 完整 element 树构建 | p95 ≤ 300 ms |
| 性能 | 1 MB xlsx 透传 saveAsBytes | p95 ≤ 200 ms |
| 测试 | 单元 + 集成测试覆盖率（生成类除外） | ≥ 85% |

## 4. 用户旅程

### 旅程 A · 双栈维护工程师改报表模板

```ts
import { SpreadsheetDocument, Cell, CellValue } from "openxml-ts/excel";

await using doc = await SpreadsheetDocument.openAsync("./report.xlsx");
const sheet = doc.workbookPart!.worksheetParts[0]!.worksheet;
for (const c of sheet.descendants(Cell)) {
  if (c.cellReference?.value === "B2") {
    c.dataType = "number";
    c.cellValue = new CellValue("42");
  }
}
await doc.saveAsync();
```

### 旅程 B · CLI 工具批量审计

> 扫所有 .xlsx 找包含外部数据链接的工作簿

```ts
for (const path of paths) {
  await using doc = await SpreadsheetDocument.openAsync(path);
  for (const link of doc.workbookPart!.externalLinks) {
    report(path, link.relationshipId);
  }
}
```

### 旅程 C · 程序生成新工作簿

```ts
const doc = SpreadsheetDocument.create();
const wb = doc.workbookPart!;
const sheet = wb.addWorksheetPart("Sheet1");
sheet.worksheet.body.appendChild(
  new Row(new Cell({ reference: "A1", value: new CellValue("Hello") })),
);
await doc.saveAsAsync("./hello.xlsx");
```

### 旅程 D · 改共享串（Epic-3 新增）

> SharedStringTable 是 Excel 特有的跨 Part 索引

```ts
const sst = doc.workbookPart!.sharedStringTablePart?.sharedStringTable;
const idx = sst?.appendItem("New shared phrase"); // 返回插入项的 index
// 然后让某个 Cell 引用这个 idx：c.dataType = "sharedString"; c.cellValue = new CellValue(String(idx));
```

## 5. 领域背景与既有约束

- **规范来源**：ISO/IEC 29500-1（SpreadsheetML schema），ECMA-376 §18。
- **参考实现**：`dotnet/Open-XML-SDK/src/DocumentFormat.OpenXml/Schema/Spreadsheet/`，以 `data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json` 为 codegen 输入。
- **可复用资产**：
  - Epic-1：OPC 内核（`OpenXmlPackage` / `IPackagePart` / Web Streams I/O / Flat OPC）
  - Epic-2：`OpenXmlElement` 家族、`ElementRegistry`、`ElementSerializer`、`TypedXmlPart<T>`、属性级 `Validator`、子 entry 模式、size-limit 配置、roundtrip golden 生成器、`PackageDiagnostics` 扩展点
- **新引入概念**：
  - **跨 Part 引用解引用**：`SharedStringTable` 是表，`Cell.cellValue` 在 `dataType="s"` 时是索引；typed 层应提供 `Cell.resolvedText`（或类似 helper）让用户不必手算偏移；
  - **稀疏 sheet**：Excel 的 `<row>` 经常省略，迭代 sheet 时不能假设行号连续；
  - **CalcChain**：可选 Part，但若存在必须随 Cell 变化同步失效或重算——MVP 阶段「失效后整个 CalcChain 丢弃」是合规策略（Excel 会 reopen 时自动重算）。
- **Schema 数据形态**：与 Word 一致（`Name`/`ClassName`/`BaseClass`/`Attributes[]`/`Particles[]`/`Validators[]`）；codegen 入口换为 `spreadsheetml_2006_main.json` 即可。

## 6. 差异化定位

| 维度 | `exceljs` / `xlsx`（SheetJS） | `openxml-ts/excel` |
| --- | --- | --- |
| 覆盖范围 | 主流 element 子集 | spreadsheetml 主 namespace ≥ 95% |
| 与 ISO 29500 对齐 | 部分 | **逐元素对位** |
| 与 .NET API 心智 | 无 | **类名 / Part / 关系 1:1 映射** |
| 类型严格度 | 中 | `strict` + `exactOptionalPropertyTypes` |
| 公式求值 | exceljs 有内嵌求值器 | **MVP 不做求值**，只透传字符串 |
| Roundtrip 保真 | 部分；常 strip 注释 / 样式细节 | **3 轮等价**，零 schema 偏移 |
| 子 entry 与 tree-shake | 弱 | `openxml-ts/excel` + namespace 拆分 |

## 7. MVP 范围与优先级矩阵

### 7.1 必须有（Epic-3 MVP）

| 编号 | 能力 | 备注 |
| --- | --- | --- |
| E3-1 | spreadsheetml 主 namespace 的 ~600 个 element 类（codegen） | 复用 Story-2.4 的 `tools/schema-codegen/generate.ts`，换 schema 输入 |
| E3-2 | `SpreadsheetDocument` 强类型门面（HAS-A `MemoryOpenXmlPackage`） | 同 Epic-2 `WordprocessingDocument` 模式 |
| E3-3 | `WorkbookPart` typed Part + worksheet 集合 + part-level 关系解析 | |
| E3-4 | `WorksheetPart` typed Part | |
| E3-5 | `SharedStringTablePart` typed Part + cross-Part 解引用 helper | **Epic-3 专属难点** |
| E3-6 | `WorkbookStylesPart` / `CalculationChainPart` / `ThemePart` 等次要 typed Part | |
| E3-7 | `SpreadsheetDocument.create()` 工厂——最小可用空白 xlsx | 含 `xl/workbook.xml` + 默认 `Sheet1` |
| E3-8 | 子 entry `openxml-ts/excel` + tree-shake size-limit 守护 | 同 Epic-2 word 子 entry |
| E3-9 | Roundtrip 黄金样例：3 个真实 xlsx，三轮字节等价 | 取 `dotnet/Open-XML-SDK` test fixture 或社区公开 xlsx |
| E3-10 | 性能基线（vitest bench）+ `bench-baseline.md` Excel 段 | 1 MB xlsx open / saveAs / create+fill 三类用例 |
| E3-11 | `examples/excel-create.ts` + `examples/excel-replace.ts` + Excel Desktop / Office Web 人工验证 | 0.3.0 release-blocking AC |
| E3-12 | `PackageDiagnostics` Excel 视角（elementCount / unknownElementCount 复用 Epic-2 callback 注入） | 零额外接口面 |

### 7.2 不在 Epic-3

- 公式求值（cell formula evaluation） —— 仅透传 `<f>` element 字符串
- Pivot table / chart / drawingml 内嵌结构 —— 出 Epic-5
- 外部数据连接 `ExternalLink` 高级用法（仅保留透传，不解引用）
- 浏览器 bundle 频道

### 7.3 拒绝项

- 引入完整公式求值器（巨大；和 SDK 定位不符）
- 自动重算 CalcChain（让 Excel 在 reopen 时自己算）
- 改变 Epic-2 已发布公共 API

## 8. 非功能性需求

| 编号 | 类别 | 描述 | 验证 |
| --- | --- | --- | --- |
| NFR-3.1 | 性能 | 1 MB xlsx open + element 树构建 p95 ≤ 300 ms（Node 20 NVMe） | `vitest bench` `bench/excel.bench.ts` |
| NFR-3.2 | 性能 | 1 MB xlsx 透传 saveAsBytes p95 ≤ 200 ms | 同上 |
| NFR-3.3 | Tree-shake | `import { Cell, Row, Worksheet } from "openxml-ts/excel"` 的 bundle ≤ 50 KB gzip | size-limit CI |
| NFR-3.4 | 类型 | 生成类通过 `strict + exactOptionalPropertyTypes + noUncheckedIndexedAccess` | `pnpm typecheck` |
| NFR-3.5 | 兼容 | 不破坏 v0.2.0 公共 API（含 `openxml-ts` / `openxml-ts/word` 既有 entry） | 既有测试全绿 |
| NFR-3.6 | 客户端 | Excel Desktop + Office Web 打开零警告 | `docs/implementation/manual-test.md` 表 |

## 9. 风险与缓解

| 风险 | 概率 | 影响 | 缓解 |
| --- | --- | --- | --- |
| SharedStringTable 跨 Part 解引用设计走偏 | 中 | 高（用户体感差，需要返工） | Architect 阶段做一次单点设计 spike；先决定 `Cell.resolvedText` 是 getter 还是 helper 函数 |
| CalcChain 失效语义不清 | 中 | 中（Excel 重 open 后会修，但用户报告「保存后第一次打开慢」） | PRD 明确「修改 Cell 即丢弃 CalcChainPart」，由 typed 层在 flush 前删除 |
| Excel schema 比 Word 少但 namespace 间引用更密集（与 drawingml/relationships/styles） | 中 | 中 | Architect 阶段先把 Part 关系图画清楚再开 Story |
| 真实 xlsx fixture 难找（多数受 office 模板 license） | 低 | 低 | 用 .NET SDK test fixture（MIT）即可 |
| 公式语言被用户误以为支持 | 中 | 低 | README 明确「公式只透传不求值」 |

## 10. 里程碑与发版

| 里程碑 | 内容 | 版本 |
| --- | --- | --- |
| Story-3.1 ~ 3.3 | OPC + Element 内核 Excel 适配；`SharedStringTable` 单点 spike | — |
| Story-3.4 | codegen 重跑产出 spreadsheetml ~600 类 | — |
| Story-3.5 ~ 3.7 | typed Parts + `SpreadsheetDocument` 门面 + create() | 内部 alpha |
| Story-3.8 | Roundtrip + golden | — |
| Story-3.9 | 子 entry + size-limit | — |
| Story-3.10 | bench + Diagnostics + 人工验证 → **0.3.0 发版** | **0.3.0** |

## 11. 公共 API 影响（草案）

新增 entry：

- `openxml-ts/excel` — 完整 namespace（约 600 element 类 + typed Parts + `SpreadsheetDocument`）
- 深度 import 允许：`openxml-ts/excel/generated/cell` 等（与 word 子 entry 模式一致）

不变：

- `openxml-ts`（OPC 内核）
- `openxml-ts/word`（v0.2.0 已稳定）

## 12. 开放问题

- [ ] `Cell.resolvedText` getter 是否在生成类上直接长出？还是放在 `WorksheetPart` 上做 helper？ —— Architect 决策
- [ ] `addWorksheetPart(name)` 工厂 API 形态：直接挂 `WorkbookPart` 上还是 `SpreadsheetDocument`？ —— Architect 决策
- [ ] DrawingML 共享类型在 Epic-3 是否提前落第一刀？Excel 的图表会用，但 MVP 不做图表，可以延后到 Epic-4 / Epic-5 —— **倾向：延后**
