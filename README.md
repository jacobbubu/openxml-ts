# openxml-ts

A TypeScript port of [Microsoft Open-XML-SDK](https://github.com/dotnet/Open-XML-SDK).

> 状态：Epic-1（OPC Packaging 内核）已完成。下一步：Word/Excel/PowerPoint Schema 类。

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
2. Epic-2 WordprocessingML（下一里程碑）
3. Epic-3 SpreadsheetML
4. Epic-4 PresentationML
5. Epic-5 LINQ-to-XML 兼容层（可选）

每个 Epic 拆分为 BMAD Stories，进度见 GitHub Issues。性能基线见 [`docs/implementation/bench-baseline.md`](./docs/implementation/bench-baseline.md)。

## 致谢

派生自 [.NET Open-XML-SDK](https://github.com/dotnet/Open-XML-SDK)，MIT 协议。`test/fixtures/golden/` 下的样例文档同样源自上游 MIT 测试资源。详见 [LICENSE](./LICENSE) 与 [`test/fixtures/golden/NOTICE.md`](./test/fixtures/golden/NOTICE.md)。
