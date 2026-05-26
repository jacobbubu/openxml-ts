# openxml-ts

在 TypeScript 里读 / 写 / 改 docx / xlsx / pptx。Microsoft [Open-XML-SDK](https://github.com/dotnet/Open-XML-SDK) 的 TS 移植，ECMA-376 (ISO/IEC 29500) 兼容，Node / Bun / 浏览器三端跑同一份代码。

```bash
pnpm add openxml-ts
```

**初来乍到？** → [docs/onboarding.md](./docs/onboarding.md)（5 分钟看懂核心概念 + 常见错误修复）。

**Live demo**：<https://jacobbubu.github.io/openxml-ts/>（拖入 docx/xlsx/pptx 在浏览器里直接读、改、下载）。

## 30 秒上手

```ts
import { WordprocessingDocument, Text } from "openxml-ts/word";

await using doc = await WordprocessingDocument.openAsync("./template.docx");
for (const t of doc.mainDocumentPart!.document.descendants(Text)) {
  if (t.text === "{{name}}") t.text = "World";
}
await doc.saveAsAsync("./out.docx");
```

`openAsync` 接受四类输入：文件路径（Node/Bun）、`Uint8Array`、`Blob`、`ReadableStream<Uint8Array>`。

## 子系统

每族通过独立子路径暴露，按需 import 不拖体积：

| 子路径 | 用法 | 主门面 |
| --- | --- | --- |
| `openxml-ts/word` | 读 / 写 docx | `WordprocessingDocument` |
| `openxml-ts/excel` | 读 / 写 xlsx | `SpreadsheetDocument` |
| `openxml-ts/ppt` | 读 / 写 pptx | `PresentationDocument` |
| `openxml-ts/drawing` | DrawingML 共享层（Theme / Color / Font Scheme） | （仅 element 类）|
| `openxml-ts/office-ext` | 109 个 Office 扩展命名空间 typed 类（w14/x14/p14 等） | （仅 element 类）|
| `openxml-ts/validation` | Schema + schematron 语义校验 | `OpenXmlValidator` |
| `openxml-ts/streaming` | 前向 pull 游标读 / push 写 | `OpenXmlPartReader` / `OpenXmlPartWriter` |
| `openxml-ts/markup-compat` | Markup Compatibility 协商 | `processMarkupCompatibility` |
| `openxml-ts/linq` | .NET LINQ to XML 风格 API | `XDocument` |
| `openxml-ts`（root） | 通用 OPC 包操作 | `openAsync` / `createInMemory` |

## Word（`openxml-ts/word`）

从零构造：

```ts
import { Paragraph, Run, Text, WordprocessingDocument } from "openxml-ts/word";

const doc = WordprocessingDocument.create();
const body = doc.mainDocumentPart!.document.firstChild()!;

for (const line of ["Hello", "from", "openxml-ts"]) {
  const p = new Paragraph();
  const r = new Run();
  const t = new Text();
  t.text = line;
  r.appendChild(t);
  p.appendChild(r);
  body.appendChild(p);
}

await doc.saveAsAsync("./hello.docx");
```

打开并替换模板占位：

```ts
await using doc = await WordprocessingDocument.openAsync("./template.docx");
for (const t of doc.mainDocumentPart!.document.descendants(Text)) {
  if (t.text === "{{name}}") t.text = "Alice";
}
await doc.saveAsAsync("./out.docx");
```

**Tree-shake：** 只 import 单个类时走深路径：

```ts
import { Paragraph } from "openxml-ts/word/generated/paragraph";
```

更多见 [`examples/word-create.ts`](./examples/word-create.ts) 与 [`examples/word-replace.ts`](./examples/word-replace.ts)。

## Excel（`openxml-ts/excel`）

```ts
import { SpreadsheetDocument, Cell, InlineString, Row, SheetData, Text } from "openxml-ts/excel";

const doc = SpreadsheetDocument.create();
const sd = doc.workbookPart!.worksheetParts[0]!.worksheet.firstChild(SheetData)!;

const row = new Row();
row.extendedAttributes.set("r", "1");
const cell = new Cell();
cell.extendedAttributes.set("r", "A1");
cell.extendedAttributes.set("t", "inlineStr");
const is = new InlineString();
const t = new Text();
t.text = "Hello";
is.appendChild(t);
cell.appendChild(is);
row.appendChild(cell);
sd.appendChild(row);

await doc.saveAsAsync("./hello.xlsx");
```

打开 + 改 cell 文本 + 写回（改动后 CalcChain 自动失效，Excel 下次重算）：

```ts
await using doc = await SpreadsheetDocument.openAsync("./report.xlsx");
for (const wsp of doc.workbookPart!.worksheetParts) {
  for (const c of wsp.worksheet.descendants(Cell)) {
    if (c.resolvedText === "{{client}}") {
      c.firstChild(CellValue)!.text = "Acme";
    }
  }
}
await doc.saveAsAsync("./out.xlsx");
```

**`Cell.resolvedText`** 自动解 sharedString 索引、inlineStr 内联、numeric value 三种 cell 形态，你不用手算偏移。

更多见 [`examples/excel-create.ts`](./examples/excel-create.ts) 与 [`examples/excel-replace.ts`](./examples/excel-replace.ts)。

## PowerPoint（`openxml-ts/ppt`）

```ts
import { PresentationDocument } from "openxml-ts/ppt";

// 从零造最小可用 pptx：1 张 Slide + 1 个 Layout + 1 个 Master + 1 个 Theme
const doc = PresentationDocument.create();
await doc.saveAsAsync("./hello.pptx");
```

读取 slide 的有效配色 / 字体 / 格式（自动沿 slide → layout → master → theme 链查找）：

```ts
await using doc = await PresentationDocument.openAsync("./deck.pptx");
for (const sp of doc.presentationPart!.slideParts) {
  console.log(sp.effectiveColorScheme?.localName);  // "clrScheme"
  console.log(sp.effectiveFontScheme?.localName);   // "fontScheme"
  console.log(sp.effectiveFormatScheme?.localName); // "fmtScheme"
}
```

`slideParts` 顺序按 `<p:sldIdLst>` 与 PowerPoint UI 看到的一致（不是文件 ZIP 内部顺序）。

更多见 [`examples/ppt-create.ts`](./examples/ppt-create.ts) 与 [`examples/ppt-replace.ts`](./examples/ppt-replace.ts)。

## DrawingML（`openxml-ts/drawing`）

PowerPoint 必用；Word/Excel 通过 ThemePart 间接依赖。直接 import 任何 drawingml 类：

```ts
import { Theme, ColorScheme, FontScheme } from "openxml-ts/drawing";
```

**命名冲突注意**：DrawingML 与 WordprocessingML / PresentationML 共享 `Paragraph` / `Text` / `Run` / `Shape` 等短名。同时引多个子系统时必用 alias：

```ts
import { Paragraph as DrawingParagraph } from "openxml-ts/drawing";
import { Paragraph as WordParagraph } from "openxml-ts/word";

// 或者用 namespace import
import * as drawing from "openxml-ts/drawing";
import * as ppt from "openxml-ts/ppt";
```

## LINQ to XML（`openxml-ts/linq`）

把 .NET `System.Xml.Linq` 同名 API 映射到 element 树上。**主要给从 .NET Open-XML 迁移的人**——把 C# 源码几乎逐行翻译成 TypeScript：

```ts
import { Enumerable, XDocument, XNamespace } from "openxml-ts/linq";

const doc = XDocument.Parse(xml);
const W = XNamespace.Get("http://schemas.openxmlformats.org/wordprocessingml/2006/main");

const headings = Enumerable.from(doc.Descendants(W.GetName("p")))
  .Where((p) => p.Attribute("pStyle")?.Value === "Heading1")
  .Select((p) => p.Value)
  .ToArray();
```

`Parse` → 改 → `Save` 闭环：

```ts
const doc = XDocument.Parse('<customers><customer total="100"/></customers>');
for (const c of doc.Descendants("customer")) {
  const total = Number(c.Attribute("total")?.Value ?? "0");
  c.SetAttributeValue("total", String(total * 2));
}
const bytes = doc.Save(); // 直接拿到 UTF-8 Uint8Array
```

C# → TypeScript 命名映射表与 6 类典型范式见 [`examples/linq-tutorial.ts`](./examples/linq-tutorial.ts)。

## OPC 通用层（`openxml-ts`）

直接操作 ZIP 包结构（不走子系统门面，适合写自定义 part / 自动化脚本）：

```ts
import { openAsync, createInMemory, tryPartUri } from "openxml-ts";

// 打开 + 列 part
await using pkg = await openAsync("./contract.docx");
for (const part of pkg.parts()) {
  console.log(part.uri, "→", part.contentType);
}

// 从零造一个内存包
const pkg2 = createInMemory();
const part = pkg2.createPart(tryPartUri("/word/document.xml")!, "application/xml");
await part.writeAsync('<w:document xmlns:w="...">...</w:document>');

// Flat OPC 互转（单文件 XML，便于 git diff）
const flatXml = pkg.toFlatOpc({ progId: "Word.Document" });
```

## 校验（`openxml-ts/validation`）

`OpenXmlValidator` 执行三层校验，永不抛错——只返回 `ValidationError[]`：

| 层 | 检查内容 | 典型错误码 |
| --- | --- | --- |
| 结构（Particle） | 子元素是否允许出现在父元素下、cardinality（min/max）、顺序 | `Sch_InvalidElementContentExpectingComplex` `Sch_UnexpectedElementContentExpectingComplex` |
| 属性 | 必填属性缺失、字符串长度超限、数值越界、枚举值 | `Sch_MissingRequiredAttribute` `Sch_AttributeValueDataTypeDetailed` |
| 语义（Schematron） | 跨元素约束（"如果 A=1 则 B 不能存在"）、引用完整性、唯一性 | `Sem_AttributeAbsentConditionToValue` |

额外检查 Markup Compatibility（`mc:AlternateContent` 结构 + `mc:Ignorable` 等属性，7 个 `MC_*` 错误码）和 OPC 包级约束（`Pkg_PartIsNotAllowed` 等）。

### 快速开始

```ts
import { OpenXmlValidator } from "openxml-ts/validation";
import { WordprocessingDocument } from "openxml-ts/word";

const doc = await WordprocessingDocument.openAsync("./report.docx");
const validator = new OpenXmlValidator();
const errors = validator.validatePackage(doc);

for (const e of errors) {
  console.log(`[${e.errorType}] ${e.id}: ${e.description}`);
}
```

### 三种校验模式

```ts
const v = new OpenXmlValidator();

// 1. 校验单个元素树（最轻量）
const elErrors = v.validate(paragraphElement);

// 2. 校验整个 Word 包（所有 Part + 跨 Part 语义）
const docErrors = v.validate(wordDoc);

// 3. 校验 OPC 包结构（Content_Types 缺失、关系目标断裂等）
const pkgErrors = v.validate(opcPackage);
```

### 错误对象

```ts
interface ValidationError {
  id: string;           // 机器可读错误码，如 "Sch_InvalidElementContentExpectingComplex"
  description: string;  // 人类可读描述
  errorType: "Schema" | "Semantic" | "Package" | "MarkupCompatibility";
  node: OpenXmlElement; // 导致错误的元素（子元素错误时为父元素）
  path: string;         // XPath-like 路径，如 "/document/body/p[0]/r[1]"
  partUri?: string;     // 所在 Part URI（包校验时有值）
  relatedNode?: OpenXmlElement; // 位置错误时的违规子元素
}
```

### 常见错误码速查

| 错误码 | 含义 | 典型修复 |
| --- | --- | --- |
| `Sch_InvalidElementContentExpectingComplex` | 子元素不应出现在父元素下 | 把子元素放到正确的父容器（如 `<w:r>` 只能放在 `<w:p>` 内） |
| `Sch_UnexpectedElementContentExpectingComplex` | 子元素合法但顺序错误 | 调整子元素顺序（如 `w:rPr` 必须在 `w:t` 之前） |
| `Sch_IncompleteContentExpectingComplex` | 缺少必需子元素 | 补充缺失的子元素 |
| `Sch_MissingRequiredAttribute` | 缺少必需属性 | 添加缺失的属性（如 `w:bookmarkStart` 必须有 `w:name`） |
| `Sch_AttributeValueDataTypeDetailed` | 属性值类型不正确 | 修正属性值（长度、数值范围、枚举值等） |
| `Sch_UndeclaredAttribute` | 属性未在 schema 中声明 | 移除未知属性或升级目标 Office 版本 |
| `Sch_InvalidChildinLeafElement` | 叶元素不能含子元素 | 移除叶元素内的非法子节点 |
| `MC_InvalidRequiresAttribute` | `mc:Choice` 的 `Requires` 前缀未声明 | 在父元素上添加 `xmlns:` 命名空间声明 |
| `Sem_AttributeAbsentConditionToValue` | 语义规则：当 A=某值时 B 不能存在 | 检查业务数据是否满足关联约束 |
| `Pkg_RequiredPartDoNotExist` | 包中引用的 Part 不存在 | 确保所有关系目标都对应实际 Part |

### 构造器选项

```ts
const v = new OpenXmlValidator({
  // 目标 Office 版本（影响版本条件元素/属性）
  fileFormatVersions: FileFormatVersions.Office2010,
  // 限制收集的错误数量（默认 1000）
  maxNumberOfErrors: 100,
  // 启用 Phase 2 schematron 语义校验
  includeSemantic: true,
});
```

也支持 .NET 风格的直接传版本号：`new OpenXmlValidator(FileFormatVersions.Office2007)`。

校验是开发期质量门禁，不是打开文档的前置条件——反序列化对 schema 越界一律宽容。真实 Office 文件经全套校验零误报。

## 忠实移植层与便捷扩展层

openxml-ts 的 API 分为两类：

- **忠实移植层**：与 .NET DocumentFormat.OpenXml SDK 一一对应的 typed element 类、Part 类、OPC 内核等。这是项目使命的核心。
- **便捷扩展层**：openxml-ts 自有设计的人机工程学扩展（prototype mixin / 独立函数），.NET SDK 中没有对等 API。所有扩展文件头部都有标准 banner 注释。

完整的便捷扩展层清单（模块路径、API 名称、用途、底层 SDK 元素）见 [docs/convenience-layer.md](./docs/convenience-layer.md)。

## 便捷 API 速查

每个子系统在 typed element 树之上提供了一层高频场景的便捷 helper / 访问器（mixin 或自由函数）。下表列常用项；完整签名见各 `examples/*`。

### Word（`openxml-ts/word`）

| 场景 | API |
| --- | --- |
| 段落对齐 / 缩进 / 间距 / 制表位 | `Paragraph.alignment` · `.indent` · `.spacing` · `.tabStops` |
| 段落样式 / 编号 / 分页控制 | `Paragraph.styleId` · `.numbering` · `.keepNext` / `.keepLines` / `.pageBreakBefore` |
| Run 文本格式 | `Run.bold` / `.italic` / `.underline` / `.fontSizeHalfPoints` / `.colorHex` / `.fontFamily` / `.styleId` |
| 表格单元格底纹 | `TableCell.shading` |
| 样式表条目 | `createParagraphStyle()` · `createCharacterStyle()` |
| 页眉 / 页脚 | `setDocumentHeader()` / `setDocumentFooter()` / `getDocumentHeader()` / `getDocumentFooter()` |
| 页面设置 | `setPageSize()` / `setPageMargin()`（A4 / 横向 / 边距） |
| 页码字段 | `createPageNumberRun()` · `createTotalPagesRun()` · `createFieldRun()` |
| 脚注 | `addFootnote()` / `getFootnoteText()` |

### Excel（`openxml-ts/excel`）

| 场景 | API |
| --- | --- |
| 单元格值 / 公式 | `Cell.value`（number/string/boolean/Date）· `Cell.formula` |
| 冻结窗格 | `setFreezePanes()` / `getFreezePanes()` |
| 列宽 / 行高 | `setColumnWidth()` / `setRowHeight()` |
| 数字格式 | `setBuiltInNumberFormat()` + `BuiltInNumberFormat` 常量 |
| 合并单元格 | `mergeCells()` / `unmergeCells()` / `getMergedRanges()` |
| 数据验证 | `addCellListValidation()` / `addCellRangeValidation()` |
| 工作表元数据 | `setSheetState()`（隐藏）· `setWorksheetTabColor()` · `setActiveSheet()` |

### PowerPoint（`openxml-ts/ppt`）

| 场景 | API |
| --- | --- |
| 幻灯片标题 / 背景 / 隐藏 | `Slide.title` · `.backgroundColorHex` · `.hidden` |
| 切换效果 | `Slide.transition`（fade/push/cut/wipe/split/dissolve） |
| 演讲者注释 | `getSpeakerNotes()` / `setSpeakerNotes()` |
| 新增幻灯片 | `addSlide()` |
| 段落 / Run 格式 | `Paragraph.alignment` / `.leftMarginEmu` / `.indentEmu` · `Run.bold` / `.italic` / `.fontSizeHundredths` / `.colorHex` |
| 形状定位 / 尺寸 / 旋转 | `Shape.position` · `.size` · `.rotationDegrees` · `.flipHorizontal` / `.flipVertical` |
| 形状无障碍 | `Shape.name` · `.altTitle` · `.altDescription` |
| 图片裁剪 | `getPictureCrop()` / `setPictureCrop()` |

> 这些 helper 都是 typed element 树之上的薄封装——任何时候都能直接操作底层 element 获得完全控制。

## CLI

```bash
# 看 OPC 包结构
openxml-ts inspect ./template.docx

# 把某个 part 的 XML 写到 stdout（管道喂 xmllint / jq / less）
openxml-ts cat ./template.docx /word/document.xml | xmllint --format -
```

## 浏览器

Live demo：<https://jacobbubu.github.io/openxml-ts/>。本地起：

```bash
pnpm install && pnpm build
cd playground && pnpm install && pnpm dev
```

打开 `http://localhost:5173/`，拖入 docx/xlsx/pptx → 看 element 树统计 → 「修改 + 下载」生成 `*.mutated.{docx,xlsx,pptx}`。详见 [`playground/README.md`](./playground/README.md)。

库本身用 **Web Streams** 作唯一 IO 抽象，文件路径、`Uint8Array`、`Blob`、`ReadableStream` 在内部统一归一化，Node/Bun/浏览器行为一致。

## 能干啥 · 不能干啥

**能干**：

- 读 / 写 `.docx` / `.xlsx` / `.pptx`（任意 Office 2007+ 文件）；
- 字段级强类型 element 树（~4400 个 schema 类，155 个 OOXML 命名空间全覆盖——含 w14 / x14 / p14 等全部 Office 扩展命名空间）；
- 强类型 Part 类层（128 个，对齐 .NET SDK `DocumentFormat.OpenXml.Packaging`）；
- Schema 校验（`OpenXmlValidator`：结构 / Particle + 属性约束 + 943/948 条 schematron 语义规则；真实 Office 文件零误报）；
- 流式读写（`OpenXmlPartReader` 前向 pull 游标 / `OpenXmlPartWriter` push 写入器，大文件不整树 materialize）；
- Markup Compatibility 协商（`mc:AlternateContent` / `mc:Ignorable`，`openAsync` 可选自动处理）；
- 高频场景便捷 helper 层（见上「便捷 API 速查」）：Word 段落 / Run 格式、样式、页眉页脚、页面设置、脚注；Excel 冻结 / 列宽行高 / 数字格式 / 合并 / 数据验证 / Cell.value / 公式；PPT 标题 / 背景 / 转场 / 形状定位旋转 / 演讲者注释；
- 跨子系统 typed Parts（Word 6 / Excel 6 / PPT 7）+ 共享 ThemePart；
- PowerPoint 三级版式继承（slide → layout → master → theme）的有效配色/字体/格式解析；
- LINQ to XML 风格查询 / 写入（Parse → Where/Select → Save 闭环）；
- ECMA-376 Strict（ISO 29500-1，`http://purl.oclc.org/ooxml/...` URI）命名空间兼容；
- 浏览器与 Node / Bun 三端语义一致；
- CLI 工具（`openxml-ts inspect / cat`）。

**不能干**：

- 加密文件读写（OOXML 加密）；
- Office 文档渲染（出 PDF / 图片）；
- 模板引擎（占位符替换等需自己写遍历）；
- VBA 宏执行 / 数字签名验证。

> 校验是**可选**的：反序列化本身从不因 schema 越界而中断——未知元素原样保留为 `OpenXmlUnknownElement`，越界属性值保留原始字符串。需要校验时显式调用 `openxml-ts/validation` 的 `OpenXmlValidator`。

## 调试

```ts
const pkg = await openAsync("./report.xlsx");
console.log(pkg.diagnostics.partCount, pkg.diagnostics.relationshipCount);
```

`OPENXML_TS_DEBUG=1` 打开 verbose 日志（落到 `console.debug`）。性能基线数据见 [`docs/implementation/bench-baseline.md`](./docs/implementation/bench-baseline.md)。

## API 稳定承诺

**1.0 起走严格 semver**：上面 10 个公开 entry（`openxml-ts` + `/word` / `/excel` / `/ppt` / `/drawing` / `/office-ext` / `/validation` / `/streaming` / `/markup-compat` / `/linq`）的命名导出 / 方法签名 / 类层级——任何破坏性改动需要 major bump。`<entry>/generated/*` 深引入路径不在承诺范围。

与 .NET DocumentFormat.OpenXml SDK 的对齐边界（已对齐的核心 vs 有意分叉/省略）见 [`docs/api-stability.md`](./docs/api-stability.md) 与逐类比对 [`docs/sdk-parity-audit.md`](./docs/sdk-parity-audit.md)。

CI 跑 `pnpm api:check`（基于 `@microsoft/api-extractor`），任何 surface 变化要求 PR 一起更新 `api/*.api.md`。

## 贡献

欢迎 issue / PR。新贡献者从 [`CONTRIBUTING.md`](./CONTRIBUTING.md) 起读，架构总览见 [`docs/architecture-overview.md`](./docs/architecture-overview.md)。

## 致谢

派生自 [.NET Open-XML-SDK](https://github.com/dotnet/Open-XML-SDK)（MIT）。`test/fixtures/golden/` 与 `test/fixtures/upstream-smoke/` 下的样例文档源自上游 MIT 测试资产。详见 [LICENSE](./LICENSE) 与 [`test/fixtures/golden/NOTICE.md`](./test/fixtures/golden/NOTICE.md)。
