# openxml-ts Recipes

常见使用场景的 step-by-step 指南。

## 校验

### CI 中校验 docx

```ts
// validate-ci.ts — 可集成到 GitHub Actions / GitLab CI
import { OpenXmlValidator } from "openxml-ts/validation";
import { WordprocessingDocument } from "openxml-ts/word";

const doc = await WordprocessingDocument.openAsync(process.argv[2]);
const errors = new OpenXmlValidator().validate(doc);

if (errors.length > 0) {
  for (const e of errors) {
    console.error(`::error file=${process.argv[2]},line=1::[${e.errorType}] ${e.id}: ${e.description}`);
  }
  process.exit(1);
}
```

命令行用法：`openxml-ts validate ./report.docx`（退出码 3 表示发现错误）。

### 只校验单个段落

```ts
import { OpenXmlValidator, registerConstraints } from "openxml-ts/validation";
import { constraints as wordConstraints } from "openxml-ts/validation/constraints/word";
import { Paragraph } from "openxml-ts/word";

// 注册约束（只需一次）
registerConstraints(wordConstraints);

const p = new Paragraph();
p.appendChild(new Run()); // 需要加 Text，这里跳过

const errors = new OpenXmlValidator().validate(p);
// errors 只包含 p 这颗子树上的问题
```

### 限制错误数量

大文档可能产生上千条错误。用 `maxNumberOfErrors` 截断：

```ts
const v = new OpenXmlValidator({ maxNumberOfErrors: 10 });
const errors = v.validate(doc); // 最多 10 条
```

### 按 Office 版本校验

```ts
import { FileFormatVersions } from "openxml-ts/markup-compat";

// 按 Office 2010 规则校验（Office 2010 新增的元素/属性会被识别）
const v = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2010 });
```

## 文件操作

### 从 Buffer/Uint8Array 打开

```ts
import { readFile } from "node:fs/promises";
const bytes = new Uint8Array(await readFile("./report.docx"));
const doc = await WordprocessingDocument.openAsync(bytes);
```

### 浏览器中从 Blob 打开

```ts
const blob = await fetch("/report.docx").then(r => r.blob());
const doc = await WordprocessingDocument.openAsync(blob);
```

### 创建内存包（不写磁盘）

```ts
import { createInMemory } from "openxml-ts";

const pkg = createInMemory();
const part = pkg.createPart("/word/document.xml", "application/...");
// 通过 pkg.parts() / pkg.relationships 操作
const blob = await pkg.saveToBlob(); // 导出为 Blob
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
  const text = run.innerText;
  if (text.includes("{{placeholder}}")) {
    // 清除 run 内所有 Text，写入新文本
    for (const t of run.descendants(Text)) run.removeChild(t);
    const newText = new Text(text.replace("{{placeholder}}", "replacement"));
    run.appendChild(newText);
  }
}
```

## SQL

### 调试校验误报

如果你认为校验器报告了不该报的错误：

1. **确认元素关系**：在 `src/validation/constraints/word.ts`（或对应模块）中找到元素的 class，确认 particle 结构

2. **检查版本**：某些元素/属性只在特定 Office 版本中有效。如果你校验的是 Office 2010+ 格式，确保 validator 也设置了对应的 `fileFormatVersions`

3. **查看最短复现**：从完整文档中提取到报错元素的最小 XML：

```ts
// 打印出错元素的 XML
const errors = new OpenXmlValidator().validate(doc);
for (const e of errors) {
  console.log(`Error at ${e.path}: ${e.description}`);
  // e.node 是报错元素（或其父元素）
}
```

4. **对照 .NET SDK**：openxml-ts 的校验行为对齐 .NET OpenXmlValidator。如果你有 .NET 环境和相同的文件，可以交叉验证

### 只校验结构，跳过语义检查

```ts
const v = new OpenXmlValidator(); // includeSemantic 默认 false
const errors = v.validate(doc);   // 只做结构 + 属性校验
```

## 性能

### 大文件优化

- Tree-shaking：从 `openxml-ts/word/generated/paragraph` 深路径 import，避免加载全部类
- 校验器只注册你关心的命名空间：`registerConstraints(wordConstraints)` 而不是注册全部约束
- 用 `maxNumberOfErrors` 限制校验深度

### 流式读取（不加载全部到内存）

```ts
import { openAsync } from "openxml-ts";

const pkg = await openAsync(bytes); // 延迟解析，按需读取 Part
const mainPart = pkg.getPart("/word/document.xml");
const reader = mainPart.openReadStream().getReader();
// 逐 chunk 读取
```
