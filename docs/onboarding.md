# openxml-ts 入门指南

openxml-ts 是 Microsoft [Open-XML-SDK](https://github.com/dotnet/Open-XML-SDK) 的 TypeScript 移植，让你在 Node.js / Bun / 浏览器中读、写、修改 docx / xlsx / pptx 文件，无需安装 Office。

## 安装

```bash
pnpm add openxml-ts   # 推荐
npm i openxml-ts
bun add openxml-ts
```

零依赖。开箱即用。

## 第一个例子：替换模板中的占位符

```ts
import { WordprocessingDocument, Text } from "openxml-ts/word";

await using doc = await WordprocessingDocument.openAsync("./template.docx");
for (const t of doc.mainDocumentPart!.document.descendants(Text)) {
  if (t.text === "{{name}}") t.text = "张三";
  if (t.text === "{{date}}") t.text = "2026-05-26";
}
await doc.saveAsAsync("./output.docx");
```

关键点：
- `openAsync` 接受文件路径（Node/Bun）、`Uint8Array`、`Blob`、`ReadableStream`
- `descendants(Text)` 深度遍历查找所有 Text 元素
- `saveAsAsync` 写入文件，不修改原文件

## 第一个例子：从零创建

```ts
import { Paragraph, Run, Text, WordprocessingDocument } from "openxml-ts/word";

const doc = WordprocessingDocument.create();
const body = doc.mainDocumentPart!.document.firstChild()!;

for (const line of ["你好", "世界"]) {
  const p = new Paragraph();
  const r = new Run();
  r.appendChild(new Text(line));
  p.appendChild(r);
  body.appendChild(p);
}

await doc.saveAsAsync("./hello.docx");
```

关键点：
- `WordprocessingDocument.create()` 创建最小合法 docx
- 每个 Text 必须放在 Run 里，每个 Run 放在 Paragraph 里（这是 OOXML 格式要求）
- `await using` 确保文档自动关闭（Node/Bun 支持）

## 重要概念

### 元素树

OOXML 文件内部是一棵 XML 元素树。Word 文档的根是 `Document`，包含 `Body`，Body 包含 `Paragraph`，Paragraph 包含 `Run`，Run 包含 `Text`。

openxml-ts 为每个 XML 元素生成了 typed class，跟 .NET SDK 一一对应。你可以用 `appendChild` / `prependChild` / `removeChild` 操作树，用 `descendants(Type)` 遍历子树。

### 不必担心格式约束

反序列化**永远不因格式错误中断**——未知元素保留为 `OpenXmlUnknownElement`，未知属性保留原始字符串。如果你只需要读几个字段，不需要学完整的 OOXML schema。

### 需要结构检查时才校验

```ts
import { OpenXmlValidator } from "openxml-ts/validation";

const doc = await WordprocessingDocument.openAsync("./report.docx");
const errors = new OpenXmlValidator().validate(doc);

for (const e of errors) {
  // e.id        → "Sch_MissingRequiredAttribute"
  // e.errorType → "Schema" | "Semantic" | "Package" | "MarkupCompatibility"
  // e.description → 人类可读描述
  // e.path      → "/document/body/p[2]/r[1]"
  console.log(`[${e.errorType}] ${e.description} (${e.path})`);
}
```

校验是可选的，不影响读 / 写 / 改。真实 Office 文件经全套校验零误报。

## 常见错误及修复

| 错误信息 | 原因 | 修复 |
| --- | --- | --- |
| `Element <w:r> is not allowed as a child of <w:body>` | 把 Run 直接放到了 Body 下 | Run 必须在 Paragraph 内：`p.appendChild(r)` |
| `Required attribute 'w:name' is missing` | bookmarkStart 必须有 w:name | `el.extendedAttributes.set("w:name", "myBookmark")` |
| `Element <w:rPr> appears out of order` | rPr 放在了 t 之后 | rPr 必须在 Run 所有文本子元素之前 |
| `Attribute 'w:val' exceeds MaxLength 40` | 属性值太长 | 截断到 schema 允许的长度 |

## 三个重要技术细节

### 1. 属性读写

OOXML 属性存在 `extendedAttributes` 中，而不是直接的 JS 属性：

```ts
const bm = new BookmarkStart();
bm.extendedAttributes.set("w:name", "intro");   // 设置
bm.extendedAttributes.get("w:name");             // 读取
```

大部分常用属性已有 typed setter/getter（如 `run.fontSize = 24`），但冷门属性需要直接操作 `extendedAttributes`。

### 2. 树修改后需要手动保存

openxml-ts **不会自动保存**。修改元素树后必须调用 `doc.saveAsAsync()` 才会写回磁盘。

### 3. 区分 `openxml-ts` 和 `openxml-ts/word`

- `openxml-ts`（根路径）：通用 OPC 包操作（`openAsync` / `createInMemory`）、基础元素类、校验器
- `openxml-ts/word`：Word 专属（`Paragraph` / `Run` / `Text` / `WordprocessingDocument`）
- `openxml-ts/excel`：Excel 专属
- `openxml-ts/ppt`：PPT 专属

从子路径 import 以获得 tree-shaking 好处（只加载你用到的类）。

## 下一步

- 浏览 [README](../README.md) 获取完整 API 表
- 查看 [examples/](../examples/) 了解 67 个场景化的代码示例
- 需要校验时参考 README 中的校验文档
- 遇到问题？查看 [常见问题](#)（WIP）
