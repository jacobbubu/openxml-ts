# openxml-ts

在 TypeScript 里读 / 写 / 改 docx / xlsx / pptx。Microsoft [Open-XML-SDK](https://github.com/dotnet/Open-XML-SDK) 的 TS 移植，ECMA-376 (ISO/IEC 29500) 兼容，Node / Bun / 浏览器三端跑同一份代码。

```bash
pnpm add openxml-ts
```

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
- 字段级强类型 element 树（~1830 个 schema 类，覆盖 wordprocessingml / spreadsheetml / presentationml / drawingml 主命名空间）；
- 跨子系统 typed Parts（Word 6 / Excel 6 / PPT 7）+ 共享 ThemePart；
- PowerPoint 三级版式继承（slide → layout → master → theme）的有效配色/字体/格式解析；
- LINQ to XML 风格查询 / 写入（Parse → Where/Select → Save 闭环）；
- ECMA-376 Strict（ISO 29500-1，`http://purl.oclc.org/ooxml/...` URI）兼容；
- 浏览器与 Node / Bun 三端语义一致；
- CLI 工具（`openxml-ts inspect / cat`）。

**不能干**：

- 加密文件读写（OOXML 加密）；
- Office 文档渲染（出 PDF / 图片）；
- Schema 校验（不阻塞 unknown element，原样保留为 `OpenXmlUnknownElement`）；
- 模板引擎（占位符替换等需自己写遍历）；
- VBA 宏 / 数字签名验证。

## 调试

```ts
const pkg = await openAsync("./report.xlsx");
console.log(pkg.diagnostics.partCount, pkg.diagnostics.relationshipCount);
```

`OPENXML_TS_DEBUG=1` 打开 verbose 日志（落到 `console.debug`）。性能基线数据见 [`docs/implementation/bench-baseline.md`](./docs/implementation/bench-baseline.md)。

## API 稳定承诺

当前 **0.x 是 pre-release**，破坏性改动会通过 minor bump 释放（按 semver pre-1.0 惯例）。

进入 **1.0+ 后**：上面 6 个公开 entry（`openxml-ts` + `/word` / `/excel` / `/ppt` / `/drawing` / `/linq`）的命名导出 / 方法签名 / 类层级走严格 semver——任何破坏性改动需要 major bump。`<entry>/generated/*` 深引入路径不在承诺范围。详见 [`docs/api-stability.md`](./docs/api-stability.md)。

CI 跑 `pnpm api:check`（基于 `@microsoft/api-extractor`），任何 surface 变化要求 PR 一起更新 `api/*.api.md`。

## 贡献

欢迎 issue / PR。新贡献者从 [`CONTRIBUTING.md`](./CONTRIBUTING.md) 起读，架构总览见 [`docs/architecture-overview.md`](./docs/architecture-overview.md)。

## 致谢

派生自 [.NET Open-XML-SDK](https://github.com/dotnet/Open-XML-SDK)（MIT）。`test/fixtures/golden/` 与 `test/fixtures/upstream-smoke/` 下的样例文档源自上游 MIT 测试资产。详见 [LICENSE](./LICENSE) 与 [`test/fixtures/golden/NOTICE.md`](./test/fixtures/golden/NOTICE.md)。
