# openxml-ts Recipes

常见使用场景的 step-by-step 指南。

## 校验

### CI 中校验 docx

```ts
import { OpenXmlValidator } from "openxml-ts/validation";
import { WordprocessingDocument } from "openxml-ts/word";

const doc = await WordprocessingDocument.openAsync(process.argv[2]);
const errors = new OpenXmlValidator().validate(doc);

if (errors.length > 0) {
  for (const e of errors) {
    console.error(`[${e.errorType}] ${e.id}: ${e.description}`);
  }
  process.exit(1);
}
```

### 只校验单个段落

```ts
import { OpenXmlValidator, registerConstraints } from "openxml-ts/validation";
import { constraints as wordConstraints } from "openxml-ts/validation/constraints/word";
import { Paragraph, Run } from "openxml-ts/word";

registerConstraints(wordConstraints);

const p = new Paragraph();
p.appendChild(new Run());
const errors = new OpenXmlValidator().validate(p);
```

### 限制错误数量

```ts
const v = new OpenXmlValidator({ maxNumberOfErrors: 10 });
const errors = v.validate(doc);
```

### 按 Office 版本校验

```ts
import { FileFormatVersions } from "openxml-ts/markup-compat";
const v = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2010 });
```

### 调试校验误报

1. 在 `src/validation/constraints/word.ts`（或对应模块）中找到元素的 class，确认 particle 结构
2. 检查版本：某些元素/属性只在特定 Office 版本中有效——确保 validator 设置了对应的 `fileFormatVersions`
3. 对照 .NET SDK：openxml-ts 的校验行为对齐 .NET OpenXmlValidator，可交叉验证

## 文件操作

### 从 Buffer/Uint8Array 打开

```ts
import { readFile } from "node:fs/promises";
const bytes = new Uint8Array(await readFile("./report.docx"));
const doc = await WordprocessingDocument.openAsync(bytes);
```

### 创建内存包（不写磁盘）

```ts
import { createInMemory } from "openxml-ts";
const pkg = createInMemory();
const part = pkg.createPart("/word/document.xml", "application/...");
const blob = await pkg.toBlob(); // 导出为 Blob
```

### 提取纯文本

```ts
for (const t of doc.mainDocumentPart!.document.descendants(Text)) {
  console.log(t.text);
}
```

### 替换文本保留格式

```ts
import { Run } from "openxml-ts/word";

for (const run of doc.mainDocumentPart!.document.descendants(Run)) {
  for (const t of run.descendants(Text)) {
    if (t.text.includes("{{placeholder}}")) {
      t.text = t.text.replace("{{placeholder}}", "replacement");
    }
  }
}
```

### 流式读取（不加载全部到内存）

```ts
const pkg = await openAsync(bytes);
const mainPart = pkg.getPart("/word/document.xml");
const reader = mainPart.openReadStream().getReader();
// 逐 chunk 读取
```

## 浏览器

openxml-ts 在浏览器中与 Node 等价，唯一的区别是 IO 入口不同。

### 打开：拖拽文件

```ts
const dropZone = document.getElementById("drop");
dropZone.addEventListener("drop", async (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0]; // File extends Blob
  const doc = await WordprocessingDocument.openAsync(file);
  // ... 处理文档 ...
});
```

### 打开：`<input type="file">`

```ts
const input = document.querySelector('input[type="file"]');
input.addEventListener("change", async () => {
  const file = input.files[0];
  const doc = await WordprocessingDocument.openAsync(file);
});
```

### 打开：fetch 远程文件

```ts
const blob = await fetch("https://example.com/template.docx").then((r) => r.blob());
const doc = await WordprocessingDocument.openAsync(blob);
```

### 保存：toBlob + 触发下载

```ts
const blob = await doc.toBlob();
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "output.docx";
a.click();
URL.revokeObjectURL(url);
```

### 校验并展示结果

```ts
import { OpenXmlValidator } from "openxml-ts/validation";

const file = input.files[0];
const doc = await WordprocessingDocument.openAsync(file);
const errors = new OpenXmlValidator().validate(doc);

const list = document.getElementById("errors");
for (const e of errors) {
  const li = document.createElement("li");
  li.textContent = `[${e.errorType}] ${e.path}: ${e.description}`;
  list.appendChild(li);
}
```

### 替换模板 + 下载（完整流程）

```ts
const blob = await fetch("/template.docx").then((r) => r.blob());
const doc = await WordprocessingDocument.openAsync(blob);

for (const t of doc.mainDocumentPart.document.descendants(Text)) {
  if (t.text === "{{name}}") t.text = "张三";
}

const out = await doc.toBlob();
const url = URL.createObjectURL(out);
// 触发下载
```

### 浏览器 vs Node 差异速查

| 能做的 | 不能做的 |
| --- | --- |
| `openAsync(blob)` / `openAsync(uint8Array)` | `openAsync("./path.docx")` 文件路径 |
| `doc.toBlob()` → `URL.createObjectURL()` 下载 | `doc.saveAsAsync("./path.docx")` 写磁盘 |
| 全部校验（Schema + Schematron + MC + OPC） | CLI `openxml-ts validate` |
| 全部元素类（1300+） | |
| 流式读写 | |

## 性能

### 大文件优化

- 从子路径 import：`import { Paragraph } from "openxml-ts/word/generated/paragraph"`，避免加载全部类
- 校验器只注册需要的命名空间：`registerConstraints(wordConstraints)` 而不是全部
- 用 `maxNumberOfErrors` 限制校验深度
