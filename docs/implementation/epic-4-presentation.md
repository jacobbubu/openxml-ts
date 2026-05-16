---
stepsCompleted: []
inputDocuments:
  - docs/planning/epic-4-prd.md
  - docs/planning/epic-4-architecture.md
workflowType: 'epics'
projectName: openxml-ts
epic: 'Epic-4 / PPT · PresentationML'
language: zh-CN
---

# Epic-4 · PresentationML 拆分

## 概述

按 [Epic-4 PRD](../planning/epic-4-prd.md) §7（E4-1..E4-13）+ [Epic-4 Architecture](../planning/epic-4-architecture.md) §2..§11，把 PowerPoint schema 类工作拆成 10 条 Story。

整体策略：**先 DrawingML 后 PresentationML**（4.1 → 4.2）→ **typed Parts 基础**（4.3-4.4）→ **门面 + 工厂**（4.5）→ **三级继承 resolver**（4.6，Epic-4 专属难点）→ **Roundtrip / 子 entry / bench**（4.7-4.9）→ **0.4.0 发版**（4.10）。

DrawingML 是 Epic-4 第一次落地的共享 schema，4.1 必须先打通 codegen 跨 namespace 引用机制；否则 4.2 起就崩。

## 需求覆盖映射

| Story | 覆盖的 FR | 关键 NFR | Architecture 章节 |
| --- | --- | --- | --- |
| 4.1 | E4-1（DrawingML codegen） | NFR-4.5 | §6 |
| 4.2 | E4-2（PresentationML codegen） | NFR-4.5 | §6, §7 |
| 4.3 | E4-4（PresentationPart）、E4-5（SlidePart） | NFR-4.6 | §5 |
| 4.4 | E4-6（其它 typed Parts） | NFR-4.6 | §5 |
| 4.5 | E4-3（PresentationDocument）、E4-8（create()） | NFR-4.6 | §3 |
| 4.6 | E4-7（effective\* getter 三级继承解析） | — | §4 |
| 4.7 | E4-10（Roundtrip 黄金样例） | — | §9 |
| 4.8 | E4-9（双子 entry + size-limit） | NFR-4.3, NFR-4.4 | §1, §2 |
| 4.9 | E4-11（bench）+ E4-13（Diagnostics） | NFR-4.1, NFR-4.2 | §9 |
| 4.10 | E4-12（人工验证 + 0.4.0 发版） | NFR-4.7 | §9 |

## Story 列表

### Story 4.1: DrawingML codegen 落地 + 跨 namespace 引用增强

**As a** SDK Dev，
**I want** 跑 codegen 产出 drawingml 主 namespace 的约 400 个 element 类，并确保 codegen 支持「PresentationML element 引用 DrawingML element 作为子节点」的跨 namespace 关系，
**so that** 4.2 跑 presentationml 时 import 可以直接命中 drawingml 类。

**AC**:
- **Given** `data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json`，
  **When** Story 完成，
  **Then** `src/drawing/generated/` 含约 400 个 element 类（每类一文件 + `_registry.ts` + `index.ts`），全部通过 `pnpm typecheck`。
- **And** codegen 支持 schema 中 `<xs:element ref="a:..."/>` 形式的跨 namespace 引用——在产出代码中按 ADR-025 走相对路径深 import；若 codegen 当前不支持，在 `tools/schema-codegen/transforms/` 增量加。
- **And** 增强后回跑 word + excel codegen，`git diff src/{word,excel}/generated/` 必须为零。
- **And** `pnpm build` 通过，未把 drawing/generated 牵进 root entry 的 bundle（size-limit root 仍 ≤ 100 KB）。

**Dependencies:** Story-3.1（codegen 管线已在 Excel 走过一遍）
**Out of scope:** PresentationML codegen、typed Parts、门面。

---

### Story 4.2: PresentationML codegen 落地

**As a** SDK Dev，
**I want** 跑 codegen 产出 presentationml 主 namespace 的约 700 个 element 类，可以直接 import 已生成的 drawingml 子元素，
**so that** typed Parts 与门面有 strongly-typed element 类可用。

**AC**:
- **Given** `data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json` + Story 4.1 已落 drawingml，
  **When** Story 完成，
  **Then** `src/ppt/generated/` 含约 700 个 element 类，跨 namespace 子元素引用走相对路径深 import（如 `import { Paragraph } from "../../drawing/generated/paragraph.js"`），全部通过 `pnpm typecheck`。
- **And** `src/ppt/generated/_registry.ts` 注册全部 ppt element 类；不重复注册 drawing 类（drawing 由 `src/drawing/generated/_registry.ts` 管）。
- **And** `pnpm build` 通过；short name 在各自 generated 文件内保留（`Text` / `Paragraph` / `Run` 都允许同名，路径区分）。
- **And** 回跑 word + excel + drawing codegen 后 `git diff src/{word,excel,drawing}/generated/` 全为零。

**Dependencies:** 4.1
**Out of scope:** typed Parts。

---

### Story 4.3: PresentationPart + SlidePart typed Parts

**As a** SDK Dev，
**I want** `PresentationPart` 与 `SlidePart` 两个 typed Part，含 part-level 关系解析（按 `p:sldIdLst` 顺序而非关系顺序），
**so that** 用户能从 `PresentationDocument.presentationPart.slideParts[i].slide` 拿到 element 树，顺序与 PowerPoint 中所见一致。

**AC**:
- **Given** Architecture §5 + ADR-024，
  **When** Story 完成，
  **Then** `src/ppt/parts/presentation-part.ts` + `slide-part.ts` 提供：
  - 静态 `contentType` / `relationshipType` 常量；
  - `PresentationPart.presentation`（typed root）；
  - `PresentationPart.slideParts: SlidePart[]`，按 `p:sldIdLst` 顺序排序；
  - `SlidePart.slide`（typed root）；
  - `SlidePart.slideLayoutPart`（part-level 关系解析，可能 undefined）；
  - `SlidePart.notesSlidePart`（同上）。
- **And** `TypedXmlPart<T>` 缓存语义沿用 Story-2.6：lazy 加载、多次访问返回同一实例。
- **And** vitest 覆盖 ≥ 90% 行（不含 generated）。

**Dependencies:** 4.2
**Out of scope:** Layout / Master / Notes / Theme typed Parts。

---

### Story 4.4: SlideLayoutPart + SlideMasterPart + NotesSlidePart + NotesMasterPart + ThemePart typed Parts

**As a** SDK Dev，
**I want** 剩余 5 个 typed Part 全部到位，
**so that** Architecture §5 表里 7 个 typed Part 齐全，门面层一次性接入。

**AC**:
- **Given** Architecture §5，
  **When** Story 完成，
  **Then** `src/ppt/parts/` 提供 `SlideLayoutPart` / `SlideMasterPart` / `NotesSlidePart` / `NotesMasterPart` / `ThemePart` 五个类。
- **And** 每个 typed Part 暴露：static `contentType` / `relationshipType`；typed root 属性（如 `SlideMasterPart.slideMaster`）；缓存语义与 4.3 一致。
- **And** part-level 关系解析：
  - `SlideLayoutPart.slideMasterPart`；
  - `SlideMasterPart.themePart` + `SlideMasterPart.slideLayoutParts: SlideLayoutPart[]`；
  - `NotesSlidePart.slidePart`（反向关系，让 Notes 能找回所属 Slide）。
- **And** `ThemePart` 在 word/excel 已存在——本 Story **抽出共享基类** `src/element/typed-parts/theme-part-base.ts`（同 Epic-3 Story 3.3 的处理），三族复用同一份基类，零字节 diff。

**Dependencies:** 4.3
**Out of scope:** 三级继承 resolver。

---

### Story 4.5: PresentationDocument 强类型门面 + create() 工厂

**As a** SDK Dev，
**I want** `PresentationDocument` 类对位 `WordprocessingDocument` / `SpreadsheetDocument`：HAS-A `MemoryOpenXmlPackage`，含 `openAsync` / `saveAsync` / `saveAsBytesAsync` / `saveAsAsync` / `create()`，
**so that** PPT 子系统用法与 Word / Excel 完全对称。

**AC**:
- **Given** Architecture §3 + ADR-022，
  **When** Story 完成，
  **Then** `src/ppt/presentation-document.ts` 提供 `PresentationDocument`，行为与 `WordprocessingDocument` / `SpreadsheetDocument` 对称（含 `[Symbol.asyncDispose]`）。
- **And** `PresentationDocument.create()` 生成最小可用 pptx：1 张 Slide + 1 个 Layout + 1 个 Master + 1 个 Theme + 完整 ContentTypes + relationships。
- **And** `create() → saveAsBytesAsync → openAsync` 三轮等价；PowerPoint Desktop 打开零警告（人工验证留到 4.10）。
- **And** `PresentationDocument` 注册 `PackageDiagnostics.elementCounter` 回调，elementCount / unknownElementCount 纳入 diagnostics。

**Dependencies:** 4.3, 4.4
**Out of scope:** 三级继承 resolver；Roundtrip。

---

### Story 4.6: 三级版式继承 effective\* resolver（Epic-4 专属难点）

**As a** SDK Dev，
**I want** `SlidePart` 上的 `effectiveFontScheme` / `effectiveColorScheme` / `effectiveFormatScheme` 三个 getter，能沿 Slide → Layout → Master → Theme 链自动解析有效值，
**so that** 用户不必手动遍历跨 Part 关系。

**AC**:
- **Given** Architecture §4 的契约，
  **When** Story 完成，
  **Then** `src/ppt/effective-resolver.ts` 暴露 `EffectiveResolver` 接口与实现；`SlidePart` 上挂三个 getter（按 ADR-023 在 typed Part 层而非 generated `Slide`）。
- **And** getter 行为：
  - 沿 slide → layout → master → theme 链查找；任一级显式指定即返回；
  - 全程无指定则返回 `ThemePart` 的默认值；
  - 链路深度上限 4，越界返回 `undefined`；
  - 闭环（layout 引用自己的 master 又指回 layout）→ 视作越界，返回 `undefined`，不抛错。
- **And** 缓存：getter 返回值在 `SlidePart` 内部 lazy 缓存；上游 Part（Layout / Master / Theme）任一被显式访问并修改后，标 dirty 失效下游缓存。
- **And** 单测覆盖：纯 Slide 指定 / 纯 Master 指定 / 纯 Theme 指定 / 链路某一级缺失 / 闭环检测 / 缓存失效 6 类场景。

**Dependencies:** 4.5
**Out of scope:** 其它 effective\* 解析（如 placeholder 几何继承）。

---

### Story 4.7: Roundtrip 真实样例 + element golden 生成器适配

**As a** SDK Dev，
**I want** ≥ 3 个真实 pptx 样例进入 `test/ppt/fixtures/`，跑三轮字节等价 + element golden 对比，
**so that** PPT 子系统有与 Word/Excel 同等的 roundtrip 保真守护。

**AC**:
- **Given** Story-2.8 的 element golden 生成器，
  **When** Story 完成，
  **Then** `test/ppt/fixtures/` 含至少 3 个真实 pptx（取 `dotnet/Open-XML-SDK` test fixture 或自造）。
- **And** `test/ppt/roundtrip/` 跑「open → saveAsBytes → reopen → element 树等价」+「golden 文件 diff 为零」。
- **And** golden 生成器对 drawingml namespace 命中（首次跨 namespace 验证）；任一 unknown 元素都视作回归。
- **And** 至少 1 个 fixture 触发 effective\* resolver 三级链路（用于验证保留版式继承数据不丢失）。

**Dependencies:** 4.5, 4.6
**Out of scope:** bench / 人工验证。

---

### Story 4.8: 双子 entry `openxml-ts/ppt` + `openxml-ts/drawing` + size-limit 守护

**As a** package 维护者，
**I want** 在 `package.json#exports` 同时暴露 `openxml-ts/ppt` 与 `openxml-ts/drawing` 两个新子 entry，并加 size-limit 阈值，
**so that** 用户只 import `Slide+Shape+TextBody+Paragraph` 时 bundle 体积可控，DrawingML 单独可守护。

**AC**:
- **Given** Architecture §1 + §2 + ADR-021，
  **When** Story 完成，
  **Then** `package.json#exports` 增加：
  - `./ppt` → `dist/ppt/index.js`；
  - `./ppt/generated/*` → `dist/ppt/generated/*.js`；
  - `./drawing` → `dist/drawing/index.js`；
  - `./drawing/generated/*` → `dist/drawing/generated/*.js`。
- **And** `package.json#size-limit` 增 4 条：
  - root（继承）≤ 100 KB；
  - `openxml-ts/ppt minimal (Slide + Shape + TextBody + Paragraph)` ≤ 80 KB gzip；
  - `openxml-ts/ppt (full bundle including registry)` ≤ 800 KB gzip；
  - `openxml-ts/drawing (full bundle including registry)` ≤ 400 KB gzip。
- **And** CI `verify-size` job 跑 `pnpm size` 覆盖全部条目。
- **And** README 增 PPT + DrawingML 章节，含命名冲突 import alias 提示（ADR-026）。

**Dependencies:** 4.5
**Out of scope:** bench。

---

### Story 4.9: bench/ppt.bench.ts + PackageDiagnostics PPT 视角 + examples

**As a** SDK 维护者，
**I want** PPT 子系统的性能基线 + Diagnostics 扩展 + 两个 example 脚本，
**so that** 0.4.0 发版前 NFR-4.1 / NFR-4.2 有量化证据，用户路径有可跑示例。

**AC**:
- **Given** Story-2.10 / Story-3.9 的 bench 形态，
  **When** Story 完成，
  **Then** `bench/ppt.bench.ts` 含 ≥ 3 类用例：open + 遍历 Slide / Shape；修改 Slide 文本 + saveAsBytes；create + 填 N 张 Slide + saveAsBytes。
- **And** `vitest bench --run` 跑出 p95：
  - 1 MB pptx open + element 树构建 ≤ 300 ms；
  - 1 MB pptx saveAsBytes ≤ 200 ms。
- **And** `docs/implementation/bench-baseline.md` 增 Epic-4 段（含均值 / p99）。
- **And** `examples/ppt-create.ts` 与 `examples/ppt-replace.ts` 可执行：
  - create：构造一份含 3 张 Slide 的 pptx；
  - replace：把含 `{{date}}` 的 Text 替换为指定值。
- **And** `PackageDiagnostics` 复用 Story-2.10 的 callback injection：`PresentationDocument` 注册 element counter，已访问 typed Part 的 element 数 / unknown 数纳入 diagnostics。

**Dependencies:** 4.5
**Out of scope:** 人工验证 + 发版。

---

### Story 4.10: 人工验证 + 0.4.0 发版

**As a** 项目主理人，
**I want** 用 PowerPoint Desktop + Office Web 把 examples 输出 + 3 个 roundtrip fixture 都打开一遍，零警告，并触发 release-please 发出 v0.4.0，
**so that** Epic-4 整体完工，Epic-1..4 全部里程碑收口。

**AC**:
- **Given** 4.9 产出的 examples 输出 + 4.7 的 roundtrip fixtures，
  **When** Story 完成，
  **Then** PowerPoint Desktop（macOS 或 Windows）+ Office Web 各打开一次：
  - `examples/ppt-create.ts` 输出 → 3 张 Slide 内容正确，无修复提示；
  - `examples/ppt-replace.ts` 输出 → 占位已替换，无修复提示；
  - 3 个 roundtrip fixture 经 openAsync → saveAsBytes 写回后打开 → 无修复提示。
- **And** `docs/implementation/manual-test.md` 增 Epic-4 / Story-4.10 表格，记录日期 + 结果。
- **And** main 合入「manual-test 回写」commit 后，release-please 自动开 release PR；合并触发 `v0.4.0` tag + CHANGELOG。
- **And** 任一行人工验证弹「需要修复」视作 release-blocking，先开 bug issue 修复后再走发版。

**Dependencies:** 4.7, 4.8, 4.9
**Out of scope:** Chart / SmartArt / 动画语义层（出 Epic-5+）。

---

## Story 依赖图

```
4.1 (DrawingML codegen + 跨 ns 引用增强)
  │
  ▼
4.2 (PresentationML codegen)
  │
  ▼
4.3 (Presentation/SlidePart) ─→ 4.4 (Layout/Master/Notes/NotesMaster/Theme Part) ─┐
                                                                                  │
                                                                                  ▼
                                                                                4.5 (PresentationDocument 门面)
                                                                                  │
            ┌─────────────────────────────────────────────────────────────────────┼─────────────────────────────┐
            ▼                                                                     ▼                             ▼
        4.6 (effective* resolver)                                             4.7 (Roundtrip)                4.8 (双子 entry)
                                                                                  │                             │
                                                                                  └─────────────┬───────────────┘
                                                                                                ▼
                                                                                            4.9 (bench + diag + examples)
                                                                                                │
                                                                                                ▼
                                                                                            4.10 (人工 + 0.4.0 发版)
```

## 风险与回滚

- 4.1 codegen 跨 namespace 引用增强若回写到 word/excel 出现 diff → Story 不可合入，先修 transforms。
- 4.4 共享 `ThemePart` 基类抽离若与 word/excel typed Part 不兼容 → 回退本 Story 的抽离，让 ppt 走独立薄壳；后续单独开 chore 处理。
- 4.6 effective\* resolver 性能不达标（bench 阶段发现）→ 启用 ADR-023 缓存策略；如仍不达标，把 getter 改为显式 `resolve*()` 方法，让用户控制时机。
- 4.10 任一 fixture 人工验证 fail → 视为 release-blocking，立刻新开 bug issue，0.4.0 推迟。
