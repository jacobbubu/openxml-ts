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
import { SpreadsheetDocument, Cell, CellValue, Row, SheetData } from "openxml-ts/excel";

// 从零造一份最小可用 xlsx（含默认 Sheet1 + 空 SharedStringTable）
const doc = SpreadsheetDocument.create();
const sd = doc.workbookPart!.worksheetParts[0]!.worksheet.firstChild(SheetData)!;

const row = new Row();
const cell = new Cell();
const v = new CellValue();
v.text = "42";
cell.appendChild(v);
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
