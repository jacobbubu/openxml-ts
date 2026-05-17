# openxml-ts

A TypeScript port of [Microsoft Open-XML-SDK](https://github.com/dotnet/Open-XML-SDK).

> 状态：Epic-1（OPC Packaging 内核）+ Epic-2（WordprocessingML，v0.2.0 已发版）已完成。**Epic-3 SpreadsheetML 进行中**（~460 element 类、6 个 typed Parts、`openxml-ts/excel` 子 entry、SharedStringResolver + Cell.resolvedText + CalcChain 自动失效；0.3.0 待 bench + 人工验证）。下一步：Epic-4 PresentationML。

## 设计目标

- 与 ISO/IEC 29500 对齐，保持与 .NET 版本 API 表面的可识别映射
- **Bun 优先**，同时兼容 **Node ≥ 20**
- **ESM only**，强类型，`strict` + `exactOptionalPropertyTypes`
- 使用 **pnpm** 作为唯一包管理器

## 快速开始

```bash
pnpm add openxml-ts
```

### 打开一份真实 docx/xlsx/pptx

```ts
import { openAsync } from "openxml-ts";

await using pkg = await openAsync("./contract.docx");

console.log("Parts:", pkg.diagnostics.partCount);
console.log("Relationships:", pkg.diagnostics.relationshipCount);

for (const part of pkg.parts()) {
  console.log(part.uri, "→", part.contentType);
}
```

`openAsync` 接受四类 source：`string`（Node/Bun 路径）、`Uint8Array`、`Blob`、`ReadableStream<Uint8Array>`。

### 修改并另存

```ts
import { openAsync } from "openxml-ts";

const pkg = await openAsync("./template.docx");

// 找到主文档 Part 并替换内容
const doc = pkg.getPart("/word/document.xml" as PartUri);
await doc.writeAsync('<?xml version="1.0"?><w:document>...</w:document>');

// 写到新路径
await pkg.saveAsAsync("./out.docx");

// 或者拿到字节流（浏览器场景）
const bytes = await pkg.saveAsBytesAsync();
```

### 从零构造一个内存包

```ts
import { createInMemory, tryPartUri } from "openxml-ts";

const pkg = createInMemory();
const doc = pkg.createPart(tryPartUri("/word/document.xml")!, "application/xml");
await doc.writeAsync('<w:document xmlns:w="...">...</w:document>');
pkg.relationships.create({
  type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  target: "word/document.xml",
  targetMode: "internal",
});
```

### Flat OPC 互转

```ts
import { openAsync, fromFlatOpcAsync } from "openxml-ts";

const pkg = await openAsync("./doc.docx");
const flatXml = pkg.toFlatOpc({ progId: "Word.Document" });
// 单文件 XML 形态，便于版本控制与文本 diff

// 反过来
const restored = await fromFlatOpcAsync(flatXml);
```

### 创建外部超链接

```ts
import { createHyperlinkInput } from "openxml-ts";

doc.relationships.create(
  createHyperlinkInput({ target: "https://example.com" }),
);
```

## Word 子系统（`openxml-ts/word`）

Word 部分通过独立 subpath `openxml-ts/word` 暴露，根 entry 不强引 ~720 个 element 类，保证不用 Word 的用户 bundle 体积最小（root entry 当前 78 KB gzip，全量 Word entry 103 KB gzip）。

```ts
import { Paragraph, Run, Text, WordprocessingDocument } from "openxml-ts/word";

// 从零造一份最小可用 docx
const doc = WordprocessingDocument.create();
const body = doc.mainDocumentPart!.document.firstChild()!; // Body

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

```ts
// 打开 → 强类型遍历 → 改字 → 写回
import { WordprocessingDocument, Text } from "openxml-ts/word";

await using doc = await WordprocessingDocument.openAsync("./template.docx");
for (const t of doc.mainDocumentPart!.document.descendants(Text)) {
  if (t.text === "{{name}}") t.text = "World";
}
await doc.saveAsAsync("./out.docx");
```

**Tree-shake 友好深引：** 单个 element 类可以走 `openxml-ts/word/generated/<name>` —— 只 `import { Paragraph }` 时打包结果 ≤ 50 KB gzip（CI `size-limit` 守护）。

```ts
import { Paragraph } from "openxml-ts/word/generated/paragraph";
```

更多用法见 [`examples/word-create.ts`](./examples/word-create.ts) 与 [`examples/word-replace.ts`](./examples/word-replace.ts)。

### Element 心智地图

WordprocessingML 文档在内存中是一棵 **OpenXmlElement** 树：

```
Document          ← /word/document.xml 的根
└── Body
    ├── Paragraph         ← <w:p>，块级容器
    │   ├── ParagraphProperties  ← <w:pPr>，段落格式
    │   │   └── Justification / Indentation / SpacingBetweenLines / ...
    │   └── Run                  ← <w:r>，行内容器（同段可多个）
    │       ├── RunProperties    ← <w:rPr>，字体/颜色/粗体/斜体
    │       └── Text             ← <w:t>，叶子节点，承载实际字符
    ├── Table             ← <w:tbl>
    │   ├── TableProperties
    │   ├── TableGrid
    │   └── TableRow → TableCell → Paragraph → ...
    └── SectionProperties ← <w:sectPr>，节属性（页面大小/页眉页脚引用等）
```

继承关系一共 3 层：

| 抽象 | 角色 | 例子 |
| --- | --- | --- |
| `OpenXmlElement` | 树节点基类 | （抽象） |
| `OpenXmlLeafElement` | 叶子，只承载属性 | `Bold`、`Color`、`TabStop` |
| `OpenXmlCompositeElement` | 容器，含 `children` 与 `descendants()` | `Paragraph`、`Run`、`Table`、`Body`、`Document` |
| `OpenXmlUnknownElement` | 反序列化时 schema 未识别的元素 | （降级，不丢字节） |

每个具体 element 类都自带：

- `static elementQualifiedName` —— XML qualified name（命名空间 + local name）
- `extendedAttributes` / `typedAttributes` —— 原始字符串属性与强类型属性
- `appendChild` / `removeChild` / `firstChild()` / `descendants(ctor?)` —— 树遍历
- 各 schema 字段对应的 typed getter（如 `Paragraph.paragraphProperties`，`Run.runProperties`）

读源码起点：[`src/element/element.ts`](./src/element/element.ts) 是基类，
[`src/word/generated/`](./src/word/generated/) 是约 720 个 schema 类，
[`docs/planning/architecture.md`](./docs/planning/architecture.md) §element 章节给完整继承图。

## Excel 子系统（`openxml-ts/excel`，0.3.0 预览）

Excel 部分通过独立 subpath `openxml-ts/excel` 暴露，与 Word 同形态——HAS-A 包装 `MemoryOpenXmlPackage`，强类型 `WorkbookPart` / `WorksheetPart` / `SharedStringTablePart` / `WorkbookStylesPart` / `CalculationChainPart` / `ThemePart` 六位 typed Parts，~460 个 spreadsheetml element 类。

```ts
import {
  SpreadsheetDocument,
  Cell,
  InlineString,
  Row,
  SheetData,
  Text,
} from "openxml-ts/excel";

// 从零造一份最小可用 xlsx（含默认 Sheet1 + 空 SharedStringTable）
const doc = SpreadsheetDocument.create();
const sd = doc.workbookPart!.worksheetParts[0]!.worksheet.firstChild(SheetData)!;

const row = new Row();
row.extendedAttributes.set("r", "1"); // Excel 用 r="N" 推断行号，缺则弹 Repaired

const cell = new Cell();
cell.extendedAttributes.set("r", "A1");           // 单元格引用 A1
cell.extendedAttributes.set("t", "inlineStr");    // 字面字符串走 <is><t>，避开 sharedString 索引
const is = new InlineString();
const t = new Text();
t.text = "Hello";
is.appendChild(t);
cell.appendChild(is);
row.appendChild(cell);
sd.appendChild(row);

await doc.saveAsAsync("./hello.xlsx");
```

```ts
// 打开 → 解 sharedString → 写回（CalcChain 自动失效）
import { SpreadsheetDocument, Cell } from "openxml-ts/excel";

await using doc = await SpreadsheetDocument.openAsync("./report.xlsx");
for (const wsp of doc.workbookPart!.worksheetParts) {
  for (const c of wsp.worksheet.descendants(Cell)) {
    // `c.resolvedText` 自动解 `<c t="s"><v>idx</v></c>` 与 inlineStr，无需手算偏移
    if (c.resolvedText === "{{client}}") {
      const cv = c.firstChild(CellValue)!;
      cv.text = "Acme"; // dataType=str/n 直接改文本；s 类型走 SharedStringResolver.intern
    }
  }
}
await doc.saveAsAsync("./out.xlsx"); // 任一 Cell 改动后 CalcChainPart 自动丢弃，Excel 重 open 时重算
```

**Tree-shake 友好深引：** 单类深 import 走 `openxml-ts/excel/generated/<name>`——`{ Cell, Row, Worksheet }` 最小用例 ≤ 50 KB gzip（CI `size-limit` 守护），完整 entry ≤ 600 KB。

```ts
import { Cell } from "openxml-ts/excel/generated/cell";
```

Excel 子系统的额外能力：
- **`Cell.resolvedText`**——`dataType="s"` 走 SharedStringTable 解索引；`"inlineStr"` 拼 `<is><t>`；其它直接取 `<v>`。孤儿 Cell 返 `undefined`，不抛错。
- **`SharedStringResolver.intern(phrase)`**——强制去重的 phrase → index 映射，O(1) Map 查询。
- **`Cell.isDirty`**——`appendChild(CellValue | CellFormula)` / `remove(...)` 时自动标 dirty；`SpreadsheetDocument.saveAsync` 检测到任一 dirty Cell 即丢 `CalculationChainPart`。

源码起点：[`src/excel/spreadsheet-document.ts`](./src/excel/spreadsheet-document.ts) 是门面，[`src/excel/generated/`](./src/excel/generated/) 是约 460 个 schema 类，[`docs/planning/epic-3-architecture.md`](./docs/planning/epic-3-architecture.md) §4 / §5 给跨 Part 解引用与 typed Parts 设计细节。

## PowerPoint 子系统（`openxml-ts/ppt`，0.4.0 预览）

PPT 部分通过独立 subpath `openxml-ts/ppt` 暴露，与 Word/Excel 同形态。强类型门面 `PresentationDocument` 配 7 个 typed Parts：`PresentationPart` / `SlidePart` / `SlideLayoutPart` / `SlideMasterPart` / `NotesSlidePart` / `NotesMasterPart` / `ThemePart`。270 个 presentationml element 类 + 380 个 drawingml element 类。

```ts
import { PresentationDocument } from "openxml-ts/ppt";

// 从零造一份最小可用 pptx（1 张 Slide + 1 个 Layout + 1 个 Master + 1 个 Theme）
const doc = PresentationDocument.create();
await doc.saveAsAsync("./hello.pptx");
```

```ts
// 打开 → 沿 slide → layout → master → theme 链解 effective 配色 / 字体 / 样式
import { PresentationDocument } from "openxml-ts/ppt";

await using doc = await PresentationDocument.openAsync("./deck.pptx");
for (const sp of doc.presentationPart!.slideParts) {
  // 三个 effective* getter 自动走 slide-level / layout-level theme override 兜底 master
  console.log(sp.effectiveColorScheme?.localName); // "clrScheme"
  console.log(sp.effectiveFontScheme?.localName);  // "fontScheme"
  console.log(sp.effectiveFormatScheme?.localName);// "fmtScheme"
}
```

**slideParts 顺序按 `<p:sldIdLst>` 而非关系遍历顺序**（ADR-024），与 PowerPoint UI 所见一致。每个 typed Part 都按 Story-2.6 缓存语义 lazy 加载、多次访问同实例。

**Tree-shake 友好深引：**

```ts
import { Slide } from "openxml-ts/ppt/generated/slide";
import { Shape } from "openxml-ts/ppt/generated/shape";
```

`{ Slide, Shape, TextBody } + drawing Paragraph` 组合最小用例 ≤ 80 KB gzip（CI `size-limit` 守护），完整 entry ≤ 800 KB。

## DrawingML 子系统（`openxml-ts/drawing`，0.4.0 预览）

DrawingML 是 OOXML 共用绘图层（PPT 必用，Word/Excel 也通过 ThemePart 间接依赖）。通过 `openxml-ts/drawing` 单独可用，含 Theme / ColorScheme / FontScheme / FormatScheme / Shape / TextBody / Paragraph / Run 等 ~380 类。

```ts
import { Theme, ColorScheme, FontScheme } from "openxml-ts/drawing";
```

**命名冲突（ADR-026）：** DrawingML 与 WordprocessingML / PresentationML 共享若干短名（`Paragraph` / `Text` / `Run` / `Shape` / `TextBody` 等）。**同时 import 多个子系统时必用 alias**：

```ts
import { Paragraph as DrawingParagraph } from "openxml-ts/drawing";
import { Paragraph as WordParagraph } from "openxml-ts/word";

// 或者用 namespace import
import * as drawing from "openxml-ts/drawing";
import * as ppt from "openxml-ts/ppt";
```

完整 entry ≤ 400 KB gzip（CI `size-limit` 守护）。

源码起点：[`src/ppt/presentation-document.ts`](./src/ppt/presentation-document.ts) 是 PPT 门面，[`src/ppt/effective-resolver.ts`](./src/ppt/effective-resolver.ts) 是三级版式继承核心，[`docs/planning/epic-4-architecture.md`](./docs/planning/epic-4-architecture.md) §4 / §5 / §6 给典型链路、ADR-024（slide 顺序）、ADR-026（命名冲突）的设计依据。

## LINQ to XML 兼容层（`openxml-ts/linq`，0.6.0 预览）

把 .NET `System.Xml.Linq` 同名 API 映射到 openxml-ts element 树上，让 .NET Open-XML 源码几乎 1:1 翻译到 TS。

```ts
import { Enumerable, XDocument, XName, XNamespace } from "openxml-ts/linq";

const doc = XDocument.Parse(xml);
const W = XNamespace.Get("http://schemas.openxmlformats.org/wordprocessingml/2006/main");

const headings = Enumerable.from(doc.Descendants(W.GetName("p")))
  .Where((p) => p.Attribute("pStyle")?.Value === "Heading1")
  .Select((p) => p.Value)
  .ToArray();
```

| .NET（C#） | openxml-ts |
| --- | --- |
| `XDocument.Parse(xml)` | `XDocument.Parse(xml)` |
| `XDocument.Load(stream)` | `XDocument.Load(bytes: Uint8Array)` |
| `XNamespace ns = "..."` | `const ns = XNamespace.Get("...")` |
| `ns + "name"` 运算符 | `ns.GetName("name")` |
| `doc.Descendants(W + "p")` | `doc.Descendants(W.GetName("p"))` |
| `el.Element("name").Value` | `el.Element("name")?.Value` |
| `xs.Where(...).Select(...).ToList()` | `Enumerable.from(xs).Where(...).Select(...).ToList()` |
| LINQ 查询表达式 `from … in …` | 暂无糖；只能 method-chain |
| `el.Add(new XElement(...))` | `el.Add(new XElement(...))` |
| `el.SetAttributeValue(name, value)` | `el.SetAttributeValue(name, value)`（`undefined` 删属性） |
| `el.Remove()` / `el.RemoveAttribute(name)` | 同名 |
| `el.ReplaceAttributes(...)` | 同名 |
| `doc.Save(stream)` | `doc.Save(): Uint8Array` + `doc.ToString()` |

详见完整示例 [`examples/linq-tutorial.ts`](./examples/linq-tutorial.ts)（6 类 .NET 教程范式逐段翻译）。

Parse → Mutate → Save 闭环示例：

```ts
import { XDocument, XName } from "openxml-ts/linq";

const doc = XDocument.Parse('<customers><customer country="CN" total="100"/></customers>');
for (const c of doc.Descendants("customer")) {
  const total = Number(c.Attribute("total")?.Value ?? "0");
  c.SetAttributeValue("total", String(total * 2));
}
const bytes = doc.Save(); // 直接拿到 UTF-8 Uint8Array
```

## OPC 心智地图

每个 docx/xlsx/pptx 都是一个 **OPC Package**（ZIP 容器，部分场景是 Flat OPC 单 XML），里头有四样东西：

```
Package（一个 ZIP / Flat XML 容器）
├── [Content_Types].xml      ← 把 Part URI 映射到 MIME ContentType（每包必有）
├── /_rels/.rels             ← 包级 Relationships（指向主 document Part 等）
├── word/document.xml        ← 普通 Part（例：主文档）
├── word/_rels/document.xml.rels  ← Part 级 Relationships（document 指向 styles、images）
├── word/styles.xml
└── word/media/image1.png    ← 二进制 Part
```

对应到 `openxml-ts` 的对象：

| OPC 概念 | TypeScript |
| --- | --- |
| Package | `OpenXmlPackage`（抽象基类） + `MemoryOpenXmlPackage` / `ZipOpenXmlPackage` |
| Part | `IPackagePart`（`uri` / `contentType` / `openReadStream` / `writeAsync`） |
| Relationship | `IPackageRelationship`（`id` / `type` / `target` / `targetMode`） |
| Content-Types 映射 | `ContentTypeManifest`（`Default` 按扩展名 / `Override` 按 PartName） |
| 包级 / Part 级关系容器 | `IRelationshipCollection`（`create` / `remove` / `get` / 迭代） |

所有 IO 走 **Web Streams** —— 文件路径、`Uint8Array`、`Blob`、`ReadableStream` 在内部统一归一化，Node/Bun/浏览器三端语义一致。

完整心智地图与 .NET → TS 映射详见 [`docs/planning/architecture.md`](./docs/planning/architecture.md)。

## 调试与诊断

- `package.diagnostics` 提供只读的 Part 计数、Relationship 计数、警告列表
- 环境变量 `OPENXML_TS_DEBUG=1` 打开 verbose 日志（落到 `console.debug`）

## 浏览器 playground

**Live demo**：<https://jacobbubu.github.io/openxml-ts/>（由 `.github/workflows/playground-deploy.yml` 在 main 分支变动时自动部署）。

`playground/` 是一个独立 Vite 工程，用于在真实浏览器里证明三栈（Word / Excel / PPT）都能 open + save。

```bash
pnpm install && pnpm build       # 先建出 dist/
cd playground && pnpm install && pnpm dev
```

打开 `http://localhost:5173/`，拖入或选 docx/xlsx/pptx → 看 element 树统计 → 「修改 + 下载」生成 `*.mutated.{docx,xlsx,pptx}`。详见 [`playground/README.md`](./playground/README.md)。

`pnpm test:browser` 用 Playwright chromium headless 跑同一套 vitest（覆盖 30 个测试文件 / 413 用例），守护「ADR-006：三端语义一致」。

## 工具链

| 项目 | 版本约束 |
| --- | --- |
| Node.js | `>= 20` |
| Bun | `>= 1.1` |
| pnpm | `>= 9` |
| TypeScript | `>= 5.5` |

## 路线图

1. **Epic-1 OPC Packaging**（✅ 完成）：`IPackage`、Parts、Relationships、Content-Types、ZIP I/O、Flat OPC。
2. **Epic-2 WordprocessingML**（✅ 完成）：~720 个 element 类、6 个 typed Parts、`openxml-ts/word` 子 entry、size-limit 守护、性能基线达 NFR-1.1/1.2。
3. Epic-3 SpreadsheetML
4. Epic-4 PresentationML
5. Epic-5 LINQ-to-XML 兼容层（可选）

每个 Epic 拆分为 BMAD Stories，进度见 GitHub Issues。性能基线见 [`docs/implementation/bench-baseline.md`](./docs/implementation/bench-baseline.md)。

## 致谢

派生自 [.NET Open-XML-SDK](https://github.com/dotnet/Open-XML-SDK)，MIT 协议。`test/fixtures/golden/` 下的样例文档同样源自上游 MIT 测试资源。详见 [LICENSE](./LICENSE) 与 [`test/fixtures/golden/NOTICE.md`](./test/fixtures/golden/NOTICE.md)。
