---
stepsCompleted: []
inputDocuments:
  - docs/planning/project-brief.md
  - docs/planning/prd.md
  - docs/planning/architecture.md
workflowType: 'prd'
projectName: openxml-ts
epic: 'Epic-2 · WordprocessingML'
language: zh-CN
---

# PRD — Epic-2 / WordprocessingML

**作者：** BMAD PM 代理（John）
**日期：** 2026-05-15
**版本：** v0.1（草案）
**输入：** [Epic-0/1 PRD](./prd.md) · [v0.1.0 已发布的 OPC 内核](https://github.com/jacobbubu/openxml-ts/releases/tag/v0.1.0)
**关联：** GitHub issue #14（research）

## 1. 愿景

让用户在 `openxml-ts` 上能像在 .NET `DocumentFormat.OpenXml.Wordprocessing` 上一样**强类型地读写 Word 文档**——从 `WordprocessingDocument.open(path)` 到 `pkg.mainDocumentPart.document.body.appendChild(new Paragraph(...))`——同一份心智模型、同一组 element 类名。

## 2. 执行摘要

Epic-1 把 OPC 这一层完整覆盖了——可以读 / 写 / 解析 ZIP，但每个 Part 的 XML 内容仍是 raw bytes。Epic-2 在 OPC 之上长出**第一份文档族的 schema 类**：Word（`w:document` / `w:p` / `w:r` / `w:t` / 表格 / 样式 / ...），让用户操作 `Paragraph`、`Run` 这样的强类型对象，而不是手拼 XML 字符串。

这一 Epic 的体量比 Epic-1 大——单 Word 模型有约 1500 个 element 类。**正确的策略是引入 codegen**：上游 `dotnet/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json` 已经把 schema 解析成结构化 JSON（1.85 MB，含每个类的 `ClassName / BaseClass / Attributes / Validators / 子元素粒子`），我们写一个 TS 生成器吃它输出 TS 类。Epic-2 把这套管线打通后，Epic-3（Excel）/ Epic-4（PowerPoint）几乎是「同一管线换 schema 输入」。

成功的衡量：用 `openxml-ts` 写一段「打开模板 → 改一个段落 → 写回」的 30 行代码，与等价 .NET 代码在产物字节上行为一致；Word Desktop / Web 打开零警告；所有 schema 类按 namespace tree-shake 友好（用户只引 `w:p`/`w:r`/`w:t` 时不拖入所有 1500 个）。

## 3. 成功指标

| 类别 | 指标 | Epic-2 阈值 |
| --- | --- | --- |
| 正确性 | `WordprocessingDocument` 与 .NET SDK 同一份 docx 的 Element 树等价（位置 + 属性 + 文本） | 100% on 黄金 fixture |
| 正确性 | 改一个 Paragraph 写回，与 .NET 同样改动后产物字节一致（允许 ZIP 元数据差异） | 100% |
| 客户端兼容 | Word Desktop + Web 打开零警告 | 通过 5 个代表样例 |
| Schema 覆盖 | wordprocessingml 主 namespace 的 element 类数 | ≥ 95%（约 1400 / 1500） |
| 类型严格度 | 所有生成类通过 `strict + exactOptionalPropertyTypes` | 100% |
| Tree-shake | 「只用 `Paragraph + Run + Text`」的最小用例 bundle 大小 | ≤ 50 KB gzip |
| 性能 | 1 MB docx 打开 + 完整 element 树构建 | p95 ≤ 300 ms |
| 测试 | 单元 + 集成测试覆盖率（生成类除外） | ≥ 85% |

## 4. 用户旅程

### 旅程 A · 双栈维护工程师改模板

```ts
import { WordprocessingDocument, Paragraph, Run, Text } from "openxml-ts/word";

await using doc = await WordprocessingDocument.openAsync("./contract.docx");
const body = doc.mainDocumentPart!.document.body!;
for (const p of body.descendants(Paragraph)) {
  for (const t of p.descendants(Text)) {
    t.text = t.text?.replace("{{client}}", "Acme Corp");
  }
}
await doc.saveAsync();
```

### 旅程 B · CLI 工具批量审计

> 扫所有 .docx 找超长链接

```ts
for (const path of paths) {
  await using doc = await WordprocessingDocument.openAsync(path);
  for (const h of doc.mainDocumentPart!.document.descendants(Hyperlink)) {
    if (h.relationshipId !== undefined) {
      const rel = doc.mainDocumentPart!.relationships.get(h.relationshipId);
      if (rel.target.length > 200) report(path, rel.target);
    }
  }
}
```

### 旅程 C · 程序生成新文档

```ts
const doc = WordprocessingDocument.create();
doc.mainDocumentPart!.document = new Document(
  new Body(new Paragraph(new Run(new Text("Hello"))))
);
await doc.saveAsAsync("./hello.docx");
```

## 5. 领域背景与既有约束

- **规范来源**：ISO/IEC 29500-1（WordprocessingML schema），ECMA-376 §17。
- **参考实现**：`dotnet/Open-XML-SDK/src/DocumentFormat.OpenXml/Schema/Wordprocessing/`，以 `data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json` 为 codegen 输入。
- **可复用资产**：Epic-1 已完成的 `OpenXmlPackage` / `IPackagePart` / `OpenXmlPackageError` / Web Streams I/O / Flat OPC。
- **新引入概念**：
  - `OpenXmlElement` 基类（参考 .NET 同名），子类分为 `OpenXmlLeafElement`（无子元素）和 `OpenXmlCompositeElement`（带子元素）；
  - **强类型 Part** 子类（如 `MainDocumentPart`），扩展 `IPackagePart`，多一层 typed 属性映射；
  - `WordprocessingDocument extends OpenXmlPackage`，提供 typed entry points。
- **Schema 数据形态**（来自 `data/schemas/*.json`）：
  - 每个 element 有 `Name`/`ClassName`/`BaseClass`/`Attributes[]`/`Particles[]`（子元素粒子）；
  - 属性有 `QName`/`PropertyName`/`Type`（StringValue/EnumValue<...>/HexBinaryValue/...）/`Validators[]`；
  - 子元素粒子（child element groups）描述 sequence/choice/group 与 cardinality；
  - 这是经过 .NET 端打通的结构化数据，**我们不必从 XSD 重新解析**。

## 6. 差异化定位

| 维度 | `docx` | `mammoth` | `openxml-ts` Epic-2 |
| --- | --- | --- | --- |
| 类型严格度 | 中 | 弱 | `strict + exactOptional…` |
| Schema 覆盖 | ~30% | 仅读取 | ≥ 95% |
| 与 .NET API 心智 | 无 | 无 | `Paragraph`/`Run`/`Text` 等同名 |
| Tree-shake | 不友好 | n/a | 每 element 单 module，ESM tree-shake 友好 |
| 写入 / 修改 | 受限 | 不支持 | 完整 read-modify-write |
| 验证 | 无 | 无 | 属性级 RequiredValidator / StringValidator / NumberValidator |

## 7. 项目类型

仍是 Library / SDK。Epic-2 不引入新的运行时依赖（schema codegen 是 dev-time 工具）；产物可能拆为子 entry point：`openxml-ts/word` 让 tree-shake 更确定。

## 8. MVP 范围与优先级矩阵

### 8.1 必须有（Epic-2 / Word MVP）

| 编号 | 能力 | 备注 |
| --- | --- | --- |
| MVP-1 | `OpenXmlElement` / `OpenXmlLeafElement` / `OpenXmlCompositeElement` 三层基类 | 对位 .NET 抽象 |
| MVP-2 | Element 树 ↔ XML 双向序列化（继承 Epic-1 的 `XmlWriter`/`tokenizeXml`，处理任意 namespace） | |
| MVP-3 | TS codegen 管线：吃 schema JSON → 输出 src/word/generated/*.ts | tools/schema-codegen/ |
| MVP-4 | wordprocessingml 主 namespace 全部 element 类生成 | 约 1500 |
| MVP-5 | `WordprocessingDocument extends OpenXmlPackage`，typed `mainDocumentPart` / `stylesPart` / 等 | |
| MVP-6 | typed Part：`MainDocumentPart`/`StylesPart`/`SettingsPart`/`ThemePart`/`FontTablePart`/`WebSettingsPart` 等 | 至少覆盖 HelloWorld.docx 中出现的 Part |
| MVP-7 | 属性 typed value：StringValue/BooleanValue/EnumValue<T>/Int32Value/HexBinaryValue/DateTimeValue 等 | |
| MVP-8 | descendants / firstChild / appendChild 等树操作 | 对位 .NET 同名 |
| MVP-9 | 与 Epic-1 黄金 fixture 的 element 树 roundtrip 等价（`HelloWorld.docx` 必跑） | |
| MVP-10 | 子 entry point `openxml-ts/word` 暴露 typed 入口，公共 API 通过该 entry 引入 | tree-shake 友好 |

### 8.2 不在 MVP（明确）

- Excel / PowerPoint schema（Epic-3/4）；
- `mc:AlternateContent` 复杂回退处理（仅占位透传，不深处理）；
- `m:` MathML、`v:` VML、`a:` DrawingML 这些次级 namespace 的完整 schema（可选：可生成空壳允许透传）；
- 完整 schema 校验执行（仅做属性级 Required / String / Number / Enum 校验）；
- LINQ to XML 视图（Epic-5）。

### 8.3 拒绝项

- 高层模板引擎 / mail-merge —— 留给社区在 schema 类上 build。
- 修改 `OpenXmlPackage` 公共 API 破坏 v0.1.0 兼容性（除非 BREAKING 显式标记并升 minor）。

## 9. 功能需求

### FR-1 OpenXmlElement 基础
- FR-1.1 `OpenXmlElement` 抽象基类，含 `localName`/`prefix`/`namespaceUri`/`parent`/`xmlns`/`extendedAttributes`。
- FR-1.2 `OpenXmlLeafElement` 子类只能有属性 + 文本（如 `w:t`）；`OpenXmlCompositeElement` 有 `children: OpenXmlElementList`。
- FR-1.3 树操作：`appendChild` / `insertBefore` / `remove` / `descendants<T>(ctor?)` / `firstChild<T>(ctor?)` / `elements<T>()` / `getAttribute(qname)`。

### FR-2 强类型属性值
- FR-2.1 `StringValue` / `BooleanValue` / `Int32Value` / `Int64Value` / `UInt32Value` / `HexBinaryValue` / `DateTimeValue` / `DecimalValue` 等基础值类型。
- FR-2.2 `EnumValue<T>` 泛型，T 是字面量联合。
- FR-2.3 属性赋值时直接 `p.styleId = "Heading1"`，序列化时按 schema 类型转字符串。

### FR-3 Schema 类生成
- FR-3.1 `tools/schema-codegen/` 项目：吃 schema JSON，输出 TS 文件。
- FR-3.2 每个 element 类一份文件，按命名空间分目录（`src/word/generated/...`）。
- FR-3.3 生成内容包含：构造函数（可空 + 鸭式输入 + 子元素 spread）、属性 getter/setter、`type IElementName = ...`、`@see DocumentFormat.OpenXml.Wordprocessing.XXX` JSDoc。
- FR-3.4 `pnpm gen:word` 重新生成；提交到 git（不在 npm install 时跑）。

### FR-4 WordprocessingDocument 入口
- FR-4.1 `WordprocessingDocument.openAsync(source)` / `.create()` / `.createAsync()`。
- FR-4.2 typed `mainDocumentPart` / `stylesPart` / `settingsPart` / `themePart` / `webSettingsPart` / `fontTablePart` 属性，访问时若 Part 不存在返回 `undefined`。
- FR-4.3 强类型 Part 暴露 typed root element：`mainDocumentPart.document: Document`。
- FR-4.4 修改 root 后调用 `pkg.saveAsync()` 触发元素树 → XML 序列化 → Part 写回。

### FR-5 XML ↔ Element 树
- FR-5.1 升级 Epic-1 tokenizer，处理任意命名空间（不止 OPC manifest）。
- FR-5.2 反序列化：通过 element 注册表（codegen 同时产出注册函数）按 `prefix:localName` 查类型构造。
- FR-5.3 未知元素降级为 `OpenXmlUnknownElement`，保留原 XML 用于透传写回（mc 兼容性）。

### FR-6 校验（轻量）
- FR-6.1 属性级 Validators 在 setter 时检查：Required / StringValidator (MaxLength) / NumberValidator (MinInclusive/MaxInclusive) / EnumValidator。
- FR-6.2 校验失败抛 `OpenXmlValidationError`（新增 code 到 errors 模块）。
- FR-6.3 包级 `package.validate()`（可选）枚举所有违例，**MVP 不强制**。

### FR-7 Tree-shaking & 子 entry point
- FR-7.1 `openxml-ts/word` 作为子 entry：从 `dist/word/index.js` 暴露 typed 入口。
- FR-7.2 不导出 `* from generated/*`，而是 `export type { Paragraph } from "./generated/paragraph.js"` 等显式列表，让打包器有效 tree-shake。
- FR-7.3 注册表通过 `import * as gen from "./generated/index.js"` 动态加载——这条路径不友好 tree-shake，所以**注册表只在「需要反序列化未知 XML」的代码路径里 lazy import**。

### FR-8 Roundtrip & 互操作样例
- FR-8.1 `HelloWorld.docx` 经 `WordprocessingDocument.openAsync` 加载 → element 树 → save → reopen，element 树 + 字节级 ZIP 结构与原 fixture 等价。
- FR-8.2 `examples/word-replace.ts`：打开模板、改占位、写回。
- FR-8.3 `examples/word-create.ts`：从零生成 docx。

## 10. 非功能需求

### NFR-1 性能
- NFR-1.1 1 MB docx open + element 树构建 ≤ 300 ms p95（Node 20，本地 NVMe）。
- NFR-1.2 element 树 ↔ XML 双向序列化 ≤ 200 ms p95（同样 1 MB）。
- NFR-1.3 内存占用 ≤ 8 × 包体（含 element 树构造的对象开销）。

### NFR-2 兼容性
- NFR-2.1 Node ≥ 20 / Bun ≥ 1.1 / 浏览器（Chromium）CI 三端继续全绿。
- NFR-2.2 ESM-only，子 entry point `openxml-ts/word`；不破坏 v0.1.0 的 `openxml-ts` 顶层入口。

### NFR-3 可测试性
- NFR-3.1 OPC 层测试不动；Epic-2 新增测试覆盖率 ≥ 85%（生成的 element 类除外，由 schema codegen 单元测试覆盖）。
- NFR-3.2 黄金 fixture 集扩展：至少 3 个真实 docx + golden JSON（element 树形态）。
- NFR-3.3 schema codegen 自身有「输入 schema fragment → 期望输出 TS 字符串」的快照测试。

### NFR-4 安全 / 健壮
- NFR-4.1 反序列化未知 element / 属性时不抛错，落到 `OpenXmlUnknownElement` 透传。
- NFR-4.2 element 树深度 / 节点数上限（防 zip-bomb 类构造的爆炸式 XML）。

### NFR-5 可观察性
- NFR-5.1 `package.diagnostics` 扩展含 element 类数 / 未知元素计数。

### NFR-6 可维护性
- NFR-6.1 schema codegen 必须可重跑产出字节级一致结果（确定性）。
- NFR-6.2 生成代码注释保留与 .NET 同名引用 (`@see DocumentFormat.OpenXml.Wordprocessing.XXX`)。

### NFR-7 法律
- NFR-7.1 codegen 读上游 MIT schema JSON；生成的 TS 类沿用本仓 MIT，保留 .NET Foundation 归属。

## 11. Epic-2 拆分预览

| Story | 主题 |
| --- | --- |
| 2.1 | OpenXmlElement / Leaf / Composite 基础 + 树操作 |
| 2.2 | 强类型属性值（StringValue/BooleanValue/Int32Value/EnumValue<T>/...） |
| 2.3 | XML element 序列化 / 反序列化（升级 tokenizer 处理 namespace + 注册表） |
| 2.4 | Schema codegen 管线 + 单元测试 |
| 2.5 | 生成 wordprocessingml 主 namespace 全部 element 类（≥ 95% 覆盖） |
| 2.6 | WordprocessingDocument + typed Parts（MainDocumentPart 等） |
| 2.7 | 属性级校验（Required/String/Number/Enum） |
| 2.8 | Roundtrip：HelloWorld + 2 个真实样例的 element 树 golden |
| 2.9 | 子 entry point `openxml-ts/word` + tree-shake 验证 |
| 2.10 | 性能基线 + Diagnostics 扩展 + 0.2.0 发版准备 |

## 12. 风险与缓解

| 风险 | 缓解 |
| --- | --- |
| Schema codegen 产物过大（每文件 1500 个 element） | 按 namespace 分目录、按字母分子目录；ESM 单文件单导出确保 tree-shake |
| 与 .NET 在边角属性 / Enum 上微差 | 把上游 JSON 作为单一来源；codegen 不手工修改 |
| 黄金参照只在自家闭环 | Story 2.8 增加「与 .NET cli 对比」拓展点（仍可后置到 Epic-3） |
| element 树构造内存压力 | 提供 lazy-build 模式（element 只在第一次访问时实例化），默认 eager；测量后再切换 |
| 子 entry point `openxml-ts/word` 与 bundler 兼容 | 在 Epic-2 收尾前在 Vite / esbuild / Rollup 三端各跑一次 smoke build |

## 13. 衔接

下一步：**Architect（Winston）** 在 [docs/planning/epic-2-architecture.md](./epic-2-architecture.md) 给出：
- OpenXmlElement 层级具体接口
- codegen 管线 IO 形态 + 模板
- element 树 / XML 互转算法
- 子 entry point 包结构
- 与 v0.1.0 公共 API 的兼容矩阵
