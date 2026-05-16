---
stepsCompleted: []
inputDocuments:
  - docs/planning/project-brief.md
  - docs/planning/prd.md
  - docs/planning/architecture.md
  - docs/planning/epic-2-prd.md
  - docs/planning/epic-2-architecture.md
  - docs/planning/epic-3-prd.md
  - docs/planning/epic-3-architecture.md
workflowType: 'prd'
projectName: openxml-ts
epic: 'Epic-4 · PresentationML'
language: zh-CN
---

# PRD — Epic-4 / PresentationML

**作者：** BMAD PM 代理（John）
**日期：** 2026-05-16
**版本：** v0.1（草案）
**输入：** [Epic-0/1 PRD](./prd.md) · [Epic-2 PRD](./epic-2-prd.md) · [Epic-3 PRD](./epic-3-prd.md)
**关联：** GitHub issue #30（feature）

## 1. 愿景

让用户在 `openxml-ts` 上能像在 .NET `DocumentFormat.OpenXml.Presentation` 上一样**强类型地读写 PowerPoint 演示文稿**——从 `PresentationDocument.openAsync(path)` 到 `pres.presentationPart.slideParts[0].slide.commonSlideData.shapeTree.descendants(Shape)`——同一组类名、同一份心智。Word 与 Excel 已经把通用管线打通；PPT 在它们之上**第一次落地 DrawingML 共享层**。

## 2. 执行摘要

Epic-2 / Epic-3 把「OPC + Element + Schema codegen + 强类型 Part + 子 entry + size-limit + Roundtrip + Bench」串成一条可复用管线。Epic-4 在这条管线上长出 PresentationML，**关键差异有三点**：

1. **DrawingML 第一次必须落地**。Slide 的可视内容（`p:sp` / `p:graphicFrame` / `p:txBody` 等）大量内嵌 `a:` namespace 的元素——形状几何、文本格式、运行属性、color scheme。Word 在 Story-2.8 之前把 DrawingML 当 Unknown 透传；PPT 不行，因为用户在 PPT 上改文字时**必须**触碰 DrawingML。这条决策的落点（独立子 entry `openxml-ts/drawing` 还是合并到 ppt 子 entry 内）由 Architecture 章节敲定。
2. **三级继承解引用**。PowerPoint 的样式与版式遵循 `Slide → SlideLayout → SlideMaster`：一个 Slide 上若没显式指定字体，要按链向上找。typed 层须提供方便的 helper（类比 Excel 的 `Cell.resolvedText`），让用户不必手动遍历 part-level 关系。
3. **Notes / SlideShow / Comments 三类附属 Part**。Word 只有一棵主文档树，PPT 一个 pptx 可能含几十张 Slide + 同等数量的 Notes + 1 个 SlideShow 配置；典型 1 MB pptx 的 Part 数量是同体积 docx 的 5–10 倍——OPC 内核 / typed Part 缓存的开销假设需要复核。

成功的衡量：用 `openxml-ts/ppt` 写「打开模板 → 改一张幻灯片的文本 → 写回」的 30 行代码，与等价 .NET 代码在产物字节上行为一致；PowerPoint Desktop / Office Web 打开零警告；DrawingML 的 ~400 个共享类按子 entry tree-shake 友好。

## 3. 成功指标

| 类别 | 指标 | Epic-4 阈值 |
| --- | --- | --- |
| 正确性 | `PresentationDocument` 与 .NET SDK 同一份 pptx 的 Element 树等价 | 100% on 黄金 fixture |
| 正确性 | 改一张 Slide 写回，与 .NET 同样改动后产物字节一致（允许 ZIP 元数据差异） | 100% |
| 客户端兼容 | PowerPoint Desktop + Office Web 打开零警告 | 通过 5 个代表样例 |
| Schema 覆盖 | presentationml 主 namespace + drawingml 主 namespace 的 element 类数 | ≥ 95%（约 1050 / 1100，p + a 合计） |
| 类型严格度 | 全部生成类通过 `strict + exactOptionalPropertyTypes + noUncheckedIndexedAccess` | 100% |
| Tree-shake | 「只用 `Slide + Shape + TextBody + Paragraph`」最小用例 bundle | ≤ 80 KB gzip |
| Tree-shake | `openxml-ts/ppt` 完整 namespace bundle | ≤ 800 KB gzip |
| Tree-shake | `openxml-ts/drawing` 完整 namespace bundle | ≤ 400 KB gzip |
| 性能 | 1 MB pptx 打开 + 完整 element 树构建 | p95 ≤ 300 ms |
| 性能 | 1 MB pptx 透传 saveAsBytes | p95 ≤ 200 ms |
| 测试 | 单元 + 集成测试覆盖率（生成类除外） | ≥ 85% |

## 4. 用户旅程

### 旅程 A · 双栈维护工程师改幻灯片模板

```ts
import { PresentationDocument, Shape } from "openxml-ts/ppt";
import { Text } from "openxml-ts/drawing";

await using doc = await PresentationDocument.openAsync("./pitch.pptx");
for (const slide of doc.presentationPart!.slideParts) {
  for (const t of slide.slide.descendants(Text)) {
    t.text = t.text?.replace("{{date}}", "2026-05-16");
  }
}
await doc.saveAsync();
```

### 旅程 B · CLI 工具批量审计

> 扫所有 .pptx 找超长备注内容

```ts
for (const path of paths) {
  await using doc = await PresentationDocument.openAsync(path);
  for (const sp of doc.presentationPart!.slideParts) {
    const notesText = sp.notesSlidePart?.notesSlide.allText() ?? "";
    if (notesText.length > 5000) report(path, sp.part.uri);
  }
}
```

### 旅程 C · 程序生成新演示文稿

```ts
const doc = PresentationDocument.create();
const pres = doc.presentationPart!;
const slide = pres.addSlidePart("Slide1"); // 默认套用 master/layout
slide.slide.addText("Hello");
await doc.saveAsAsync("./hello.pptx");
```

### 旅程 D · 解版式继承（Epic-4 新增）

```ts
const slide = pres.slideParts[0]!;
const fontScheme = slide.effectiveFontScheme; // 自动走 Slide → Layout → Master 链
```

## 5. 领域背景与既有约束

- **规范来源**：ISO/IEC 29500-1（PresentationML + DrawingML schema），ECMA-376 §19/§20。
- **参考实现**：`dotnet/Open-XML-SDK/src/DocumentFormat.OpenXml/Schema/Presentation/` 与 `Schema/Drawing/`。codegen 输入：
  - `data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json`
  - `data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json`（DrawingML，跨族共享）
- **可复用资产**：
  - Epic-1：OPC 内核
  - Epic-2：element 家族、codegen 管线、typed Part 抽象、子 entry 模式、size-limit、roundtrip golden、Diagnostics 扩展点
  - Epic-3：跨 Part 解引用 helper 设计模式（Cell.resolvedText partial mixin）—— Epic-4 的 `Slide.effectiveFontScheme` 等沿用相同套路
- **新引入概念**：
  - **DrawingML 共享 namespace**：Word / Excel 后续若需更深度的图形对象支持也会复用，Epic-4 是首个落地者；
  - **Slide → Layout → Master 继承链**：part-level 关系网，typed 层提供 `effective*` getter 解析；
  - **Slide id list 与 sld 节奏**：`p:presentation/p:sldIdLst` 决定 Slide 顺序，与 part-level 关系顺序未必一致；序列化时 typed 层须保证 idLst 与 slideParts 顺序对齐。

## 6. 差异化定位

| 维度 | `pptxgenjs` / `officegen` | `openxml-ts/ppt` |
| --- | --- | --- |
| 覆盖范围 | 仅生成主流形状 / 文本 | presentationml + drawingml ≥ 95% |
| 与 ISO 29500 对齐 | 局部 | **逐元素对位** |
| 与 .NET API 心智 | 无 | **类名 / Part / 关系 1:1 映射** |
| 类型严格度 | 弱 | `strict` + `exactOptionalPropertyTypes` |
| 修改既有 pptx | 弱 | **完整 roundtrip** |
| 三级版式继承 | 用户手算 | **typed effective* getter** |
| 子 entry 与 tree-shake | 无 | `openxml-ts/ppt` + `openxml-ts/drawing` 拆分 |

## 7. MVP 范围与优先级矩阵

### 7.1 必须有（Epic-4 MVP）

| 编号 | 能力 | 备注 |
| --- | --- | --- |
| E4-1 | drawingml 主 namespace 的约 400 个 element 类（codegen） | 首次落地；输出到 `src/drawing/generated/` |
| E4-2 | presentationml 主 namespace 的约 700 个 element 类（codegen） | 输出到 `src/ppt/generated/` |
| E4-3 | `PresentationDocument` 强类型门面（HAS-A） | 与 Word/Excel 对称 |
| E4-4 | `PresentationPart` typed Part + slide / slideMaster / slideLayout / notesMaster 集合 | |
| E4-5 | `SlidePart` typed Part + part-level 关系（layout / notes / 嵌入资源） | |
| E4-6 | `SlideLayoutPart` / `SlideMasterPart` / `NotesSlidePart` / `NotesMasterPart` / `ThemePart` typed Part | |
| E4-7 | `Slide.effectiveFontScheme` 等 effective\* getter（三级版式继承解引用） | **Epic-4 专属难点** |
| E4-8 | `PresentationDocument.create()` 工厂——最小可用空白 pptx（1 张 Slide + 默认 Layout + Master + Theme） | |
| E4-9 | 子 entry `openxml-ts/ppt` + `openxml-ts/drawing` + tree-shake size-limit 守护 | 两个新子 entry |
| E4-10 | Roundtrip 黄金样例：3 个真实 pptx，三轮字节等价 | |
| E4-11 | 性能基线（vitest bench）+ `bench-baseline.md` PPT 段 | 1 MB pptx open / saveAs / create+fill 三类 |
| E4-12 | `examples/ppt-create.ts` + `examples/ppt-replace.ts` + PowerPoint Desktop / Office Web 人工验证 | 0.4.0 release-blocking |
| E4-13 | `PackageDiagnostics` PPT 视角（Diagnostics callback 注入复用 Epic-2 模式） | 零额外接口面 |

### 7.2 不在 Epic-4

- 动画 / 切换效果的语义层解析（`p:transition` / `p:timing`）—— 仅透传 XML，不做 typed wrap
- Chart / SmartArt 内嵌结构（`c:chart`、`dgm:*`）—— 出 Epic-5
- 视频 / 嵌入对象 media —— 仅保留二进制透传
- DrawingML 三维效果 / 复杂渐变填充的 typed wrap —— element 类有，但不引入 helper 高阶 API

### 7.3 拒绝项

- 引入幻灯片渲染引擎（巨大，与 SDK 定位不符）
- 改变 Epic-2 / Epic-3 已发布公共 API
- 不为 PPT 修改 OPC 内核（如要解决「pptx Part 数量多导致开销大」，方案落在 typed 层的 lazy 缓存策略）

## 8. 非功能性需求

| 编号 | 类别 | 描述 | 验证 |
| --- | --- | --- | --- |
| NFR-4.1 | 性能 | 1 MB pptx open + element 树构建 p95 ≤ 300 ms | `bench/ppt.bench.ts` |
| NFR-4.2 | 性能 | 1 MB pptx 透传 saveAsBytes p95 ≤ 200 ms | 同上 |
| NFR-4.3 | Tree-shake | `import { Slide, Shape, TextBody, Paragraph } from "openxml-ts/ppt"` ≤ 80 KB gzip | size-limit CI |
| NFR-4.4 | Tree-shake | `openxml-ts/drawing` 完整 bundle ≤ 400 KB gzip | size-limit CI |
| NFR-4.5 | 类型 | 生成类通过 `strict + exactOptionalPropertyTypes + noUncheckedIndexedAccess` | `pnpm typecheck` |
| NFR-4.6 | 兼容 | 不破坏 v0.2.0 / v0.3.0 公共 API | 既有测试全绿 |
| NFR-4.7 | 客户端 | PowerPoint Desktop + Office Web 打开零警告 | `manual-test.md` 表 |

## 9. 风险与缓解

| 风险 | 概率 | 影响 | 缓解 |
| --- | --- | --- | --- |
| DrawingML 子 entry 形态拍错（合并 vs 拆分），后续 Excel chart / Word drawing 时返工 | 中 | 高 | Architecture 阶段做一次单点决策 spike，参考 .NET SDK 的 `DocumentFormat.OpenXml.Drawing` namespace 分布 |
| 三级继承 effective\* 解析的循环（Slide 指向 Layout 指向 Master 指向 ...） | 低 | 中 | Resolver 加深度上限 + 跨 Part 引用闭环检测，越界返回 undefined |
| Notes Slide / SlideShow 等附属 Part 在 .NET SDK 也有零散 typed API，对位粒度需要权衡 | 中 | 中 | 仅落地常见 4 个附属 Part；其余在 `OpenXmlUnknownPart` 透传层覆盖 |
| pptx Part 数量大导致打开 typed 缓存预热慢 | 中 | 中 | typed Part 仅在访问时实例化（Story-2.6 既有 lazy 缓存语义已覆盖），bench 验证 |
| presentationml + drawingml 并行 codegen 时命名冲突（如两族都有 `Text` 类） | 中 | 高 | codegen 按 namespace 分目录输出（`drawing/generated/text.ts` vs `ppt/generated/text.ts`），公共 entry 显式 re-export 时不混合短名 |

## 10. 里程碑与发版

| 里程碑 | 内容 | 版本 |
| --- | --- | --- |
| Story-4.1 | DrawingML codegen 落地（约 400 类） | — |
| Story-4.2 | presentationml codegen 跑通（约 700 类） | — |
| Story-4.3 ~ 4.4 | typed Parts（PresentationPart / Slide / Layout / Master / Notes / Theme） | — |
| Story-4.5 | `PresentationDocument` 门面 + `create()` 工厂 | 内部 alpha |
| Story-4.6 | 三级版式继承 effective\* getter | — |
| Story-4.7 | Roundtrip 真实样例 + golden | — |
| Story-4.8 | 双子 entry（`openxml-ts/ppt` + `openxml-ts/drawing`）+ size-limit | — |
| Story-4.9 | bench + Diagnostics + examples | — |
| Story-4.10 | 人工验证 + **0.4.0 发版** | **0.4.0** |

## 11. 公共 API 影响（草案）

新增 entry：

- `openxml-ts/ppt` — presentationml 主 namespace（约 700 element 类 + 6 个 typed Part + `PresentationDocument`）
- `openxml-ts/drawing` — drawingml 主 namespace（约 400 共享 element 类）；Word / Excel 后续若用，**复用同一个子 entry**
- 深度 import 允许：`openxml-ts/ppt/generated/slide` / `openxml-ts/drawing/generated/run-properties` 等

不变：

- `openxml-ts`（OPC 内核）
- `openxml-ts/word`（v0.2.0 已稳定）
- `openxml-ts/excel`（v0.3.0 落地后稳定）

## 12. 开放问题

- [ ] DrawingML 是否真的独立子 entry？候选：
  - **A（推荐）**：`openxml-ts/drawing` 独立子 entry —— 三族复用清晰；
  - **B**：合并到 ppt 子 entry 内，Word / Excel 用时各自挂深 import；—— 体积省，但跨族复用心智差。
- [ ] `Slide.effectiveFontScheme` 这类 helper 在 generated `Slide` 类上挂还是放 `SlidePart` 上？倾向放 `SlidePart`（与 Cell.resolvedText 同设计意图但跨 Part 关系更复杂） —— Architect 决策。
- [ ] `addSlidePart(name)` 工厂 API 形态：直接挂 `PresentationPart` 上还是 `PresentationDocument`？倾向前者，与 Excel `WorkbookPart.addWorksheetPart` 对称。
- [ ] Notes Slide / NotesMaster 是 MVP 必须 typed wrap，还是只保留底层 Part？倾向 typed wrap（用户旅程 B 用到）。
