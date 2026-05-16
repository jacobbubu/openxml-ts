---
stepsCompleted: []
inputDocuments:
  - docs/planning/epic-3-prd.md
  - docs/planning/architecture.md
  - docs/planning/epic-2-architecture.md
workflowType: 'architecture'
projectName: openxml-ts
epic: 'Epic-3 · SpreadsheetML'
language: zh-CN
---

# 架构文档 — Epic-3 / SpreadsheetML

**作者：** BMAD Architect 代理（Winston）
**日期：** 2026-05-16
**版本：** v0.1（草案）
**输入：** [Epic-3 PRD](./epic-3-prd.md) · [Epic-2 Architecture](./epic-2-architecture.md)

## 0. 设计原则（在 Epic-2 之上的增量）

1. **Excel 是「Word + 跨 Part 索引」**。OPC + Element + codegen 与 Epic-2 完全一致；新增的复杂度只来自 `SharedStringTable` 跨 Part 引用与 sparse row 迭代。
2. **不为 Excel 修改 Epic-2 内核**。如果 SST 解引用、worksheet 迭代等 Excel-only 行为需要 hook，放 `src/excel/` 内部解决，不动 `src/element/` 和 `src/packaging/`。
3. **CalcChain 用「失效即丢弃」策略**。修改 Cell 等于让 CalcChain stale；flush 阶段 typed 层直接删 `CalcChainPart` 并清掉关系，Excel 重 open 时自动重算。
4. **DrawingML 延后**。Excel 的图表 (`xl/charts/*.xml`) 依赖 `drawingml/main`；MVP 不做图表，保留 `<chartPart>` 原样字节透传。DrawingML 在 Epic-4 落地。
5. **保持 0.2.0 公共 API 不变**。`openxml-ts` 顶层和 `openxml-ts/word` 子 entry 不动；Excel 走全新 `openxml-ts/excel` 子 entry。

## 1. 分层（在 Epic-2 之上）

```
┌──────────────────────────────────────────────────────────┐
│ openxml-ts/excel（新子 entry，0.3.0）                    │
│  · SpreadsheetDocument                                  │
│  · WorkbookPart / WorksheetPart / SharedStringTablePart │
│  · Cell / Row / Worksheet / Workbook / ...（typed Elements）│
├──────────────────────────────────────────────────────────┤
│ openxml-ts/word（v0.2.0 已稳定，不动）                   │
├──────────────────────────────────────────────────────────┤
│ openxml-ts（顶层 entry，Epic-1 已稳定）                  │
│  · OpenXmlPackage / IPackagePart / IPackageRelationship │
│  · OpenXmlElement 家族（Epic-2 引入）                    │
│  · 强类型属性值 / serializer / registry / validators     │
├──────────────────────────────────────────────────────────┤
│ Schema codegen（dev-only, tools/schema-codegen/）        │
│  · 已支持任意 schema JSON 输入                            │
│  · Epic-3 只新增配置：spreadsheetml namespace + 输出目录 │
└──────────────────────────────────────────────────────────┘
```

## 2. 目录结构（Epic-3 完成态）

```
openxml-ts/
├── src/
│   ├── word/                              # 不动（v0.2.0）
│   └── excel/                             # 新增
│       ├── index.ts                       # SpreadsheetDocument + 公共导出
│       ├── spreadsheet-document.ts        # SpreadsheetDocument（HAS-A MemoryOpenXmlPackage）
│       ├── parts/
│       │   ├── workbook-part.ts
│       │   ├── worksheet-part.ts
│       │   ├── shared-string-table-part.ts
│       │   ├── workbook-styles-part.ts
│       │   ├── calculation-chain-part.ts
│       │   ├── theme-part.ts              # 取自 word 的同名 typed Part 抽出共享
│       │   └── index.ts
│       ├── shared-string-table.ts         # 跨 Part 解引用 helper（Section 4）
│       └── generated/                     # codegen 输出
│           ├── _registry.ts
│           ├── workbook.ts
│           ├── worksheet.ts
│           ├── sheet-data.ts
│           ├── row.ts
│           ├── cell.ts
│           ├── cell-value.ts
│           ├── ...（约 600 个文件）
│           └── index.ts
├── tools/schema-codegen/                  # 已存在；新增配置
│   ├── generate.ts                        # 既有入口，吃 --schema --output 参数
│   └── README.md                          # 增补「如何重跑 excel」段
├── packages/                              # 仍空（MVP 不切包）
├── bench/
│   ├── word.bench.ts                      # 不动
│   └── excel.bench.ts                     # 新增
├── examples/
│   ├── word-create.ts / word-replace.ts   # 不动
│   ├── excel-create.ts                    # 新增
│   └── excel-replace.ts                   # 新增
└── test/
    ├── word/                              # 不动
    └── excel/
        ├── parts/
        ├── elements/
        ├── shared-string-table.test.ts    # 跨 Part 解引用核心
        ├── roundtrip/
        └── fixtures/                      # 3 个真实 xlsx
```

> ADR-014：Theme/ContentTypes/Relationship 中的 ThemePart 在 word/excel/ppt 三族都用同一份 schema。当前 Epic-3 保持「每个子系统在自己 parts/ 下放 theme-part.ts 薄壳」，下游 typed 类共享 `src/element/generated/theme/*`（codegen 输出到 element 共享目录）。Epic-4 再决定是否抽出 `openxml-ts/drawing` 子 entry。

## 3. `SpreadsheetDocument` 设计

```ts
// src/excel/spreadsheet-document.ts
export class SpreadsheetDocument {
  private readonly typedParts = new Map<string, TypedXmlPart<OpenXmlElement>>();

  constructor(private readonly pkg: MemoryOpenXmlPackage) {
    pkg.registerDiagnosticsElementCounter(() => this.countLoadedElements());
  }

  get package(): IPackage { return this.pkg; }

  get workbookPart(): WorkbookPart | undefined {
    return this.getOrLoadTypedPart(WorkbookPart);
  }

  static async openAsync(source: ZipSource, opts: OpenAsyncOptions = {}) {
    return new SpreadsheetDocument(await openAsync(source, opts));
  }

  /**
   * 创建最小可用 xlsx：含 xl/workbook.xml + 默认 Sheet1（xl/worksheets/sheet1.xml）+
   * xl/sharedStrings.xml 空表 + 必需的 ContentTypes 与 relationships。
   */
  static create(): SpreadsheetDocument { ... }

  async saveAsync(): Promise<void> { ... }
  async saveAsBytesAsync(): Promise<Uint8Array> { ... }
  async saveAsAsync(path: string): Promise<void> { ... }
  dispose(): Promise<void> { return this.pkg.dispose(); }
  [Symbol.asyncDispose](): Promise<void> { return this.dispose(); }
}
```

> ADR-015：`SpreadsheetDocument` 与 `WordprocessingDocument` 同形态（HAS-A，不继承 OPC），让两个子系统在用法心智上完全对称。

## 4. `SharedStringTable` 跨 Part 引用（Epic-3 专属难点）

### 4.1 形态

Excel 把所有共享字符串放在 `xl/sharedStrings.xml`：

```xml
<sst xmlns="..." count="3" uniqueCount="3">
  <si><t>Apple</t></si>
  <si><t>Banana</t></si>
  <si><t>Cherry</t></si>
</sst>
```

Cell 引用方式：

```xml
<c r="A1" t="s"><v>0</v></c>   <!-- 指向 "Apple" -->
```

### 4.2 typed 层契约

```ts
// src/excel/shared-string-table.ts（helper，不是 generated）
export class SharedStringResolver {
  constructor(private readonly part: SharedStringTablePart) {}

  /** 解出第 idx 个共享串的完整文本（拼接所有 <t> 段）。越界返回 undefined。 */
  resolve(idx: number): string | undefined { ... }

  /** 追加一项，返回新 index；幂等：若 phrase 已存在则返回既有 index。 */
  intern(phrase: string): number { ... }
}

// Cell（codegen 生成的部分）多挂一个 getter：
class Cell extends OpenXmlCompositeElement {
  // ... codegen 生成的字段 ...

  /**
   * 解引用 sharedString 后的纯文本。
   * - dataType="s" 时走所属 worksheet 的 SharedStringTablePart 解；
   * - dataType="inlineStr" 时取 `<is>` 直接拼；
   * - 其它（"n"/"str"/...）直接返回 `<v>` 文本。
   * 找不到所属表（孤儿 Cell）返回 undefined。
   */
  get resolvedText(): string | undefined { ... }
}
```

### 4.3 关键决策

- **`resolvedText` 是 Cell 实例 getter，不是 helper 函数**。理由：在 90% 的用户路径里 Cell 是已挂在 Worksheet 上的，能反向找到 `WorkbookPart → SharedStringTablePart`；提供 getter 让用户像 `c.resolvedText` 一样读，零样板。孤儿 Cell（没 parent）返回 undefined 即可，不抛错。
- **`intern` 不是 `appendItem`**。Excel 的 sharedString 表语义是去重串池，appendItem 不去重等于持续膨胀；intern 强制去重。
- **CalcChain 自动失效**：flush 阶段 typed 层若检测到任一 Cell 的 `cellValue` / `cellFormula` 被改过，删除 `CalcChainPart`。检测靠 typed 层在 Cell 上挂的 dirty 标志，不污染 generated 类。

> ADR-016：`Cell.resolvedText` 在 codegen 生成的 `cell.ts` 之外，通过同名 partial 类合并实现——`src/excel/extensions/cell-extensions.ts` 写补丁 mixin，codegen 阶段产物保持纯净。这与 Epic-2 ADR-008「生成类不手改」一致。

## 5. Typed Parts 目录（Epic-3 完整清单）

| 类 | URI 模式 | content-type | 关系类型 | 来源 |
| --- | --- | --- | --- | --- |
| `WorkbookPart` | `/xl/workbook.xml` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml` | `officeDocument` | 包级关系 |
| `WorksheetPart` | `/xl/worksheets/sheet*.xml` | `application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml` | `worksheet` | WorkbookPart-level 关系 |
| `SharedStringTablePart` | `/xl/sharedStrings.xml` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml` | `sharedStrings` | WorkbookPart-level 关系 |
| `WorkbookStylesPart` | `/xl/styles.xml` | `application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml` | `styles` | WorkbookPart-level 关系 |
| `CalculationChainPart` | `/xl/calcChain.xml` | `application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml` | `calcChain` | WorkbookPart-level 关系 |
| `ThemePart` | `/xl/theme/theme1.xml` | `application/vnd.openxmlformats-officedocument.theme+xml` | `theme` | WorkbookPart-level 关系 |

> ADR-017：Worksheet 集合用「数组按关系 ID 排序」语义；`WorkbookPart.worksheetParts` 是 ordered array，与 .NET `WorkbookPart.WorksheetParts` 一致。

## 6. codegen 复用

```bash
# 既有命令（Story-2.5 引入），换 namespace + 输出目录
bun run tools/schema-codegen/generate.ts \
  --schema data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json \
  --namespace x \
  --namespace-uri http://schemas.openxmlformats.org/spreadsheetml/2006/main \
  --output src/excel/generated
```

预期产出：

- 约 600 个 element 类（每类一文件）
- 1 个 `_registry.ts` 注册全部
- 1 个 `index.ts` 显式 re-export

需要 codegen 层增量改动：

1. 处理 `<xs:any>` 通配子元素 → 已有 `OpenXmlUnknownElement` fallback，零改动；
2. SpreadsheetML 比 Word 多用 `xs:simpleType` enum 直接定义在 element 上的 inline enum——若 codegen 当前只认 named simpleType，需要补 inline enum 处理；先 spike，必要时增强 codegen。

> ADR-018：codegen 若需要增强，改动落在 `tools/schema-codegen/transforms/`，并产出新的 word 与 excel 两套快照——任一 namespace 重生后 git diff 应为零，否则视作 codegen 回归。

## 7. ADR 汇总

| ADR | 主题 | 决定 |
| --- | --- | --- |
| ADR-014 | Theme 跨族共享 | Epic-3 暂保「各子系统薄壳」；Epic-4 决定是否抽 drawing 子 entry |
| ADR-015 | SpreadsheetDocument 形态 | HAS-A MemoryOpenXmlPackage，与 WordprocessingDocument 对称 |
| ADR-016 | Cell.resolvedText 位置 | typed extension（partial mixin），不污染 generated |
| ADR-017 | WorksheetParts 集合 | ordered array，按关系顺序 |
| ADR-018 | codegen 增量 | 落 transforms/，跨族产出 diff 应为零（回归门） |
| ADR-019 | CalcChain 失效策略 | 修改任一 Cell 即丢弃 CalcChainPart，让 Excel 重 open 重算 |
| ADR-020 | DrawingML 延后 | Epic-3 不引入；chart Part 字节透传 |

## 8. 测试策略

| 层级 | 覆盖 | 工具 |
| --- | --- | --- |
| 单元 | typed Part 加载 / Cell.resolvedText / SharedStringResolver.intern 去重 / CalcChain 自动失效 | vitest |
| 集成 | `SpreadsheetDocument.openAsync → 改 Cell → saveAsBytesAsync → reopen` | vitest |
| Roundtrip | 3 个真实 xlsx 三轮字节等价（用 Story-2.8 的 golden 生成器） | vitest |
| Bench | `bench/excel.bench.ts`：open / saveAs / create+fill 三类（参 Story-2.10 word.bench） | vitest bench |
| size-limit | root + excel minimal (`Cell+Row+Worksheet`) + excel full | size-limit CI |
| 人工 | Excel Desktop + Office Web 打开 excel-create / excel-replace 输出 | `manual-test.md` 表 |

## 9. 风险与缓解

| 风险 | 影响 | 缓解 |
| --- | --- | --- |
| `Cell.resolvedText` 解引用循环（Cell 在 detach 状态找不到 parent → 找不到 SST） | 用户体验差 | getter 文档明确「孤儿返回 undefined，不抛错」；测试覆盖 |
| `SharedStringResolver.intern` 在大表上 O(n²) | 性能 | 内部维护 Map<string, number> 索引，构造时一次性建表 |
| CalcChain 失效误判（用户没改 Cell 但仍丢 CalcChain） | 性能（Excel 重算开销） | 仅在 dirty 标志命中时丢；用 `_dirty` 字段（不导出）追踪写入 |
| codegen 对 spreadsheetml 处理增强后回写到 word 出现 diff | 回归 | CI 检查 `git diff src/word/generated` 为零 |
| inline simpleType enum 未被 codegen 处理 | 字段缺失 | Story-3.1 先做 codegen spike，跑一次产出 + 对比 .NET 类，识别缺失模式 |

## 10. 关键文件清单（Architect 指认给 Story 拆分）

新增手写：

- `src/excel/spreadsheet-document.ts`（参 `src/word/word-document.ts`）
- `src/excel/parts/*.ts`（6 个 typed Part）
- `src/excel/shared-string-table.ts`（resolver helper）
- `src/excel/extensions/cell-extensions.ts`（Cell.resolvedText partial）
- `src/excel/index.ts`（公共导出）
- `bench/excel.bench.ts`
- `examples/excel-create.ts` + `examples/excel-replace.ts`

新增生成：

- `src/excel/generated/*.ts`（~600 个 + `_registry.ts` + `index.ts`）

修改：

- `tools/schema-codegen/transforms/*`（如 codegen spike 发现缺口）
- `package.json` size-limit 条目（增 3 个）
- `package.json` `exports` 字段（新增 `./excel` 与 `./excel/generated/*`）
- `.github/workflows/ci.yml` 维持（已是 size + test 矩阵）
- `README.md` 增 Excel 章节
- `docs/implementation/manual-test.md` 增 Story-3.10 段
- `docs/implementation/bench-baseline.md` 增 Excel 段

不动：

- `src/element/*`
- `src/packaging/*`
- `src/word/*`
- 既有 release-please 配置（0.3.0 由 release-please 自动 minor bump 触发）
