---
stepsCompleted: []
inputDocuments:
  - docs/planning/epic-4-prd.md
  - docs/planning/architecture.md
  - docs/planning/epic-2-architecture.md
  - docs/planning/epic-3-architecture.md
workflowType: 'architecture'
projectName: openxml-ts
epic: 'Epic-4 · PresentationML'
language: zh-CN
---

# 架构文档 — Epic-4 / PresentationML

**作者：** BMAD Architect 代理（Winston）
**日期：** 2026-05-16
**版本：** v0.1（草案）
**输入：** [Epic-4 PRD](./epic-4-prd.md) · [Epic-2 Architecture](./epic-2-architecture.md) · [Epic-3 Architecture](./epic-3-architecture.md)

## 0. 设计原则（在 Epic-2/3 之上的增量）

1. **DrawingML 第一次落地必须做对**。后续 Word/Excel 都会复用，错一次返工成本大。
2. **`openxml-ts/drawing` 是独立子 entry**（ADR-021）。三族复用心智清晰，且 size-limit 可以单独守护。Word / Excel 后续接入时通过深 import 引用 `openxml-ts/drawing/...`。
3. **三级继承 helper 放 `SlidePart`，不污染 generated Slide**。与 Epic-3 ADR-016 同型：跨 Part 解引用属于 typed Part 层职责，generated element 保持纯净。
4. **Notes / NotesMaster 必须 typed wrap**。常见审计/批改流程会用到（旅程 B），不留 raw Part 给用户去抠。
5. **保持 0.2.0 / 0.3.0 公共 API 不变**。PPT 走全新 `openxml-ts/ppt` + 共享 `openxml-ts/drawing`。
6. **命名冲突按 namespace 隔离**。`a:t`（drawing Text）与 `p:sp`（ppt Shape）在各自 `generated/` 下；公共导出**不混合短名**——`openxml-ts/drawing` 导出 `Text as DrawingText`、`openxml-ts/ppt` 导出 `Shape`，子 entry 不互相 re-export。

## 1. 分层（Epic-4 完成态）

```
┌─────────────────────────────────────────────────────────────┐
│ openxml-ts/ppt（新子 entry，0.4.0）                          │
│  · PresentationDocument                                    │
│  · PresentationPart / SlidePart / SlideLayoutPart / ...    │
│  · Slide / Shape / TextBody / SlideMaster / ...            │
├─────────────────────────────────────────────────────────────┤
│ openxml-ts/drawing（新共享子 entry，0.4.0）                  │
│  · DrawingML 主 namespace 的约 400 个 element 类           │
│  · 没有 typed Part；纯 element 类与值类型                  │
├─────────────────────────────────────────────────────────────┤
│ openxml-ts/excel（v0.3.0 稳定）                              │
├─────────────────────────────────────────────────────────────┤
│ openxml-ts/word（v0.2.0 稳定）                               │
├─────────────────────────────────────────────────────────────┤
│ openxml-ts（顶层 entry，Epic-1 稳定）                        │
└─────────────────────────────────────────────────────────────┘
```

> ADR-021：`openxml-ts/drawing` 独立子 entry。理由：（1）DrawingML 是跨族共享 schema，从 Epic-4 落地起就是「公共」语义；（2）独立子 entry 让 size-limit 单独守护其体积；（3）Word / Excel 后续接入只需深 import，不引入循环依赖；（4）.NET SDK 内 `DocumentFormat.OpenXml.Drawing` 是独立 namespace，1:1 映射。

## 2. 目录结构（Epic-4 完成态）

```
openxml-ts/
├── src/
│   ├── word/                              # 不动（v0.2.0）
│   ├── excel/                             # 不动（v0.3.0）
│   ├── drawing/                           # 新增
│   │   ├── index.ts                       # DrawingML 公共导出（约 400 类）
│   │   └── generated/                     # codegen 输出
│   │       ├── _registry.ts
│   │       ├── text.ts                    # <a:t>（注意：导出名 Text，在 ppt 子 entry 中以 DrawingText 别名再导出）
│   │       ├── paragraph.ts               # <a:p>
│   │       ├── run.ts                     # <a:r>
│   │       ├── run-properties.ts
│   │       ├── ...（约 400 个文件）
│   │       └── index.ts                   # 显式 re-export
│   └── ppt/                               # 新增
│       ├── index.ts                       # PresentationDocument + 公共导出
│       ├── presentation-document.ts
│       ├── parts/
│       │   ├── presentation-part.ts
│       │   ├── slide-part.ts
│       │   ├── slide-layout-part.ts
│       │   ├── slide-master-part.ts
│       │   ├── notes-slide-part.ts
│       │   ├── notes-master-part.ts
│       │   ├── theme-part.ts              # 共享 typed Part 薄壳（见 ADR-014）
│       │   └── index.ts
│       ├── effective-resolver.ts          # 三级继承 helper（Section 4）
│       └── generated/                     # codegen 输出
│           ├── _registry.ts
│           ├── presentation.ts
│           ├── slide.ts
│           ├── slide-id-list.ts
│           ├── slide-id.ts
│           ├── shape.ts
│           ├── shape-tree.ts
│           ├── common-slide-data.ts
│           ├── ...（约 700 个文件）
│           └── index.ts
├── tools/schema-codegen/                  # 已存在；新增 2 套配置
│   └── README.md                          # 增补 drawing / ppt 跑法
├── bench/
│   ├── word.bench.ts / excel.bench.ts     # 不动
│   └── ppt.bench.ts                       # 新增
├── examples/
│   ├── word-*.ts / excel-*.ts             # 不动
│   ├── ppt-create.ts                      # 新增
│   └── ppt-replace.ts                     # 新增
└── test/
    ├── word/ / excel/                     # 不动
    ├── drawing/
    │   ├── elements/                      # 抽样 drawing element 单测
    │   └── golden/                        # drawing element golden
    └── ppt/
        ├── parts/
        ├── elements/
        ├── effective-resolver.test.ts     # 三级继承解析核心
        ├── roundtrip/
        └── fixtures/                      # 3 个真实 pptx
```

## 3. `PresentationDocument` 设计

```ts
// src/ppt/presentation-document.ts
export class PresentationDocument {
  private readonly typedParts = new Map<string, TypedXmlPart<OpenXmlElement>>();

  constructor(private readonly pkg: MemoryOpenXmlPackage) {
    pkg.registerDiagnosticsElementCounter(() => this.countLoadedElements());
  }

  get package(): IPackage { return this.pkg; }

  get presentationPart(): PresentationPart | undefined {
    return this.getOrLoadTypedPart(PresentationPart);
  }

  static async openAsync(source: ZipSource, opts: OpenAsyncOptions = {}) {
    return new PresentationDocument(await openAsync(source, opts));
  }

  /**
   * 创建最小可用 pptx：1 张 Slide + 默认 Layout + Master + Theme + ContentTypes + relationships。
   * Layout/Master/Theme 走预置 XML 模板（参考 .NET SDK PresentationDocument.Create）。
   */
  static create(): PresentationDocument { ... }

  async saveAsync(): Promise<void> { ... }
  async saveAsBytesAsync(): Promise<Uint8Array> { ... }
  async saveAsAsync(path: string): Promise<void> { ... }
  dispose(): Promise<void> { return this.pkg.dispose(); }
  [Symbol.asyncDispose](): Promise<void> { return this.dispose(); }
}
```

> ADR-022：`PresentationDocument` 形态与 `WordprocessingDocument` / `SpreadsheetDocument` 完全对称。

## 4. 三级版式继承解引用（Epic-4 专属难点）

### 4.1 关系图

```
SlidePart
   │
   │  rel: slideLayout
   ▼
SlideLayoutPart
   │
   │  rel: slideMaster
   ▼
SlideMasterPart
   │
   │  rel: theme  ────→  ThemePart
   │  rel: ...
```

### 4.2 typed 层契约

```ts
// src/ppt/effective-resolver.ts
export interface EffectiveResolver {
  /**
   * 沿 Slide → Layout → Master 链查 fontScheme；任一级显式指定即返回，
   * 全程无指定返回 ThemePart 的默认值；闭环或深度超限返回 undefined。
   */
  resolveFontScheme(): FontScheme | undefined;

  /** 同上但解 colorScheme。 */
  resolveColorScheme(): ColorScheme | undefined;

  /** 同上但解 fmtScheme（formatScheme）。 */
  resolveFormatScheme(): FormatScheme | undefined;
}

// SlidePart（手写，不是 generated）多挂一组 effective* getter
class SlidePart extends TypedXmlPart<Slide> {
  get effectiveFontScheme(): FontScheme | undefined { ... }
  get effectiveColorScheme(): ColorScheme | undefined { ... }
  get effectiveFormatScheme(): FormatScheme | undefined { ... }
}
```

### 4.3 关键决策

- **三级解析以 `SlidePart` 为入口**。从 Slide element 反向找 part 麻烦；让 SlidePart 直接持有 layout/master/theme 引用更直接。
- **链路深度上限 = 4**（slide → layout → master → theme，再多视为闭环异常）。
- **缓存策略**：effective\* 是 typed Part 内部 lazy field，第一次访问解析，后续返回缓存；用户修改任一层后通过 typed Part 自身的 dirty 标志失效缓存。MVP 阶段「修改即失效」由 Story-4.6 明确实现路径。
- **跨 Part 解析不抛错**：找不到 ThemePart / 闭环 / 深度越界 → 返回 `undefined`。

> ADR-023：effective\* getter 是 `SlidePart`（typed Part）级别的 helper，不挂在 generated `Slide` element 类上。理由：generated 类只表达 schema，跨 Part 引用是 typed Part 的职责。

## 5. Typed Parts 目录（Epic-4 完整清单）

| 类 | URI 模式 | content-type | 关系类型 | 来源 |
| --- | --- | --- | --- | --- |
| `PresentationPart` | `/ppt/presentation.xml` | `application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml` | `officeDocument` | 包级 |
| `SlidePart` | `/ppt/slides/slide*.xml` | `application/vnd.openxmlformats-officedocument.presentationml.slide+xml` | `slide` | PresentationPart 级 |
| `SlideLayoutPart` | `/ppt/slideLayouts/slideLayout*.xml` | `application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml` | `slideLayout` | SlidePart / SlideMasterPart 级 |
| `SlideMasterPart` | `/ppt/slideMasters/slideMaster*.xml` | `application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml` | `slideMaster` | SlideLayoutPart / PresentationPart 级 |
| `NotesSlidePart` | `/ppt/notesSlides/notesSlide*.xml` | `application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml` | `notesSlide` | SlidePart 级 |
| `NotesMasterPart` | `/ppt/notesMasters/notesMaster1.xml` | `application/vnd.openxmlformats-officedocument.presentationml.notesMaster+xml` | `notesMaster` | PresentationPart 级 |
| `ThemePart` | `/ppt/theme/theme*.xml` | `application/vnd.openxmlformats-officedocument.theme+xml` | `theme` | SlideMasterPart 级 |

> ADR-024：`SlideParts` 集合按 `p:sldIdLst` 顺序而非关系顺序对外暴露——序列化时也按 idLst 顺序写出 part-level 关系，保证 reopen 后顺序稳定。

## 6. codegen 复用

```bash
# DrawingML
bun run tools/schema-codegen/generate.ts \
  --schema data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json \
  --namespace a \
  --namespace-uri http://schemas.openxmlformats.org/drawingml/2006/main \
  --output src/drawing/generated

# PresentationML
bun run tools/schema-codegen/generate.ts \
  --schema data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json \
  --namespace p \
  --namespace-uri http://schemas.openxmlformats.org/presentationml/2006/main \
  --output src/ppt/generated
```

预期产出：

- `src/drawing/generated/` ≈ 400 个 element 类
- `src/ppt/generated/` ≈ 700 个 element 类
- 各自一个 `_registry.ts`，互不污染

需要 codegen 层增量改动：

1. PresentationML 在 schema 里**会引用 drawingml 类**作为子元素（如 `p:txBody → a:bodyPr / a:lstStyle / a:p`）。codegen 当前对外部 namespace 子元素的处理需要 spike：很可能产出 `import { Paragraph as DrawingParagraph } from "../../drawing/generated/paragraph.js"` 这样的跨目录 import。如缺，在 `tools/schema-codegen/transforms/` 增量加。
2. Story-2.5 的 codegen 改 word 后回归测试是「git diff src/word/generated = 零」；Epic-4 把这一守护扩展到三族（word + excel + drawing + ppt 都不能 diff）。

> ADR-025：codegen 跨 namespace 子元素引用走「相对路径深 import」，不走子 entry 包名 import。理由：codegen 输出是 `src/`，包名 import 在 codegen 阶段未解析；相对路径稳定且可被 tsc 直接构建。

## 7. 命名冲突处理

`a:t`（Drawing Text）与 `w:t`（Word Text）类名都叫 `Text`。Epic-2 / Epic-3 时分别在 `src/word/generated/text.ts` / `src/excel/generated/cell.ts` 等独立路径不冲突；Epic-4 引入 `src/drawing/generated/text.ts` 后**跨子 entry 公共导出时仍可能撞名**。

策略：

- 各子 entry 内部 element 类保持原 short name（`Text` / `Paragraph` / `Run`），internal 使用零摩擦。
- **子 entry 不互相 re-export**——`openxml-ts/ppt` 不 re-export drawing 的 `Text`；用户若需要 DrawingText，import 形式：
  ```ts
  import { Text as DrawingText } from "openxml-ts/drawing";
  import { Shape } from "openxml-ts/ppt";
  ```
- 在 README 与公共文档显式注明「DrawingML 与 PPT 各有 `Text`，使用 import alias 区分」。

> ADR-026：不引入跨子 entry 命名空间前缀（如 `DrawingMLText`/`PPTShape`）。理由：生成类必须与 .NET SDK 类名 1:1 映射，否则破坏「同心智」目标。让用户在 import 处用 alias 是更小成本。

## 8. ADR 汇总

| ADR | 主题 | 决定 |
| --- | --- | --- |
| ADR-021 | DrawingML 子 entry 形态 | 独立子 entry `openxml-ts/drawing` |
| ADR-022 | PresentationDocument 形态 | HAS-A，与 Word/Excel 对称 |
| ADR-023 | effective\* getter 位置 | typed Part 层（`SlidePart`），不污染 generated |
| ADR-024 | SlideParts 顺序 | 按 `p:sldIdLst` 顺序而非关系顺序 |
| ADR-025 | codegen 跨 namespace 子元素 import | 相对路径深 import |
| ADR-026 | 跨子 entry 命名冲突 | 不加前缀，let 用户在 import 处用 alias |
| ADR-027 | Theme 共享 typed Part | 沿用 Epic-3 ADR-014 思路；如 Epic-4 推进时发现需要共享基类，抽到 `src/element/typed-parts/theme-part-base.ts` |

## 9. 测试策略

| 层级 | 覆盖 | 工具 |
| --- | --- | --- |
| 单元 | typed Part 加载 / effective\* 解析 / 闭环检测 / 命名冲突 import 形态 | vitest |
| 集成 | `PresentationDocument.openAsync → 改 Slide → saveAsBytesAsync → reopen` | vitest |
| Roundtrip | 3 个真实 pptx 三轮字节等价（用 Story-2.8 的 golden 生成器） | vitest |
| Bench | `bench/ppt.bench.ts`：open / saveAs / create+fill 三类 | vitest bench |
| size-limit | root + ppt minimal + ppt full + drawing full | size-limit CI |
| codegen 回归 | 重跑 codegen 后 `git diff src/{word,excel,drawing,ppt}/generated = 零` | CI |
| 人工 | PowerPoint Desktop + Office Web 打开 ppt-create / ppt-replace 输出 | `manual-test.md` |

## 10. 风险与缓解

| 风险 | 影响 | 缓解 |
| --- | --- | --- |
| `openxml-ts/drawing` 独立子 entry 后，Word/Excel 后续接入要返工 | 改 import path | Word/Excel 当前都没 typed wrap 任何 drawing 元素；返工只在 Word/Excel 决定要 typed wrap drawing 时发生，那时拿到 0.4.0 已发布的 drawing 子 entry 直接接入，无 breaking |
| effective\* 解析缓存失效逻辑漏洞（修改 Layout 后 Slide 缓存没失效） | 用户读到陈旧值 | typed Part 内部维护「下游缓存依赖」反向表；任一上游 Part 标 dirty 时清下游 cache。Story-4.6 单测覆盖 |
| codegen 跨 namespace 引用增强后，回归 word/excel 出现 diff | 视为 codegen 回归 | CI gate：四个 namespace 任一 diff 非零则失败 |
| Notes / NotesMaster 设计与 .NET SDK 不完全一致 | API 心智偏差 | 直接对位 .NET 同名类，差异点在 README 列「与 .NET 偏差」清单 |
| pptx Part 数量大，typed 缓存预热慢导致 NFR-4.1 不达标 | 性能未达标 | typed Part 是按访问 lazy 实例化，bench 阶段验证；如越界，引入「按 idLst 顺序预取首批 Part」的可选预热 |

## 11. 关键文件清单（Architect 指认给 Story 拆分）

新增手写：

- `src/drawing/index.ts`（DrawingML 公共导出）
- `src/ppt/presentation-document.ts`（参 `src/word/word-document.ts`）
- `src/ppt/parts/*.ts`（7 个 typed Part）
- `src/ppt/effective-resolver.ts`（三级继承 helper）
- `src/ppt/index.ts`（公共导出）
- `bench/ppt.bench.ts`
- `examples/ppt-create.ts` + `examples/ppt-replace.ts`

新增生成：

- `src/drawing/generated/*.ts`（约 400 个 + `_registry.ts` + `index.ts`）
- `src/ppt/generated/*.ts`（约 700 个 + `_registry.ts` + `index.ts`）

修改：

- `tools/schema-codegen/transforms/*`（如跨 namespace 引用需要增强）
- `package.json` size-limit 条目（增 4 条：ppt minimal / ppt full / drawing full / 维持 root）
- `package.json#exports` 字段（新增 `./ppt` + `./ppt/generated/*` + `./drawing` + `./drawing/generated/*`）
- `README.md` 增 PPT + DrawingML 章节，含命名冲突 import alias 提示
- `docs/implementation/manual-test.md` 增 Story-4.10 段
- `docs/implementation/bench-baseline.md` 增 PPT 段
- `.github/workflows/ci.yml` 维持

不动：

- `src/element/*` `src/packaging/*` `src/word/*` `src/excel/*`
- release-please 配置（0.4.0 自动 minor bump）
