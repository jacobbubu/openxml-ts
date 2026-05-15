---
stepsCompleted: []
inputDocuments:
  - docs/planning/epic-2-prd.md
  - docs/planning/architecture.md
workflowType: 'architecture'
projectName: openxml-ts
epic: 'Epic-2 · WordprocessingML'
language: zh-CN
---

# 架构文档 — Epic-2 / WordprocessingML

**作者：** BMAD Architect 代理（Winston）
**日期：** 2026-05-15
**版本：** v0.1（草案）
**输入：** [Epic-2 PRD](./epic-2-prd.md) · [Epic-1 Architecture](./architecture.md)

## 0. 设计原则（在 Epic-1 之上的增量）

1. **Schema 是 truth，codegen 是机器**。手工修改生成代码视作回归。所有调整通过修改 codegen 或重生成完成。
2. **每 element 一文件，单 export**。Tree-shake 友好的代价是文件多——ESM 与现代打包器吃这一套。
3. **强类型先行**。`Paragraph.styleId` 而不是 `getAttribute("w:val")`，让 .NET 出身的开发者立刻能写。
4. **未知元素不丢失**。任何 `prefix:localName` 解析不出 typed 类时退化为 `OpenXmlUnknownElement` 原样透传，写回时字节级保真。
5. **OPC 内核稳定**。Epic-2 不破坏 v0.1.0 公共 API；新功能从子 entry `openxml-ts/word` 暴露。

## 1. 分层

```
┌──────────────────────────────────────────────────────────┐
│ openxml-ts/word（子 entry）                              │
│  · WordprocessingDocument                               │
│  · MainDocumentPart / StylesPart / ...（typed Parts）   │
│  · Paragraph / Run / Text / Table / ...（typed Elements）│
├──────────────────────────────────────────────────────────┤
│ openxml-ts（顶层 entry，Epic-1 已发布）                  │
│  · OpenXmlPackage / IPackagePart / IPackageRelationship │
│  · OpenXmlElement / Leaf / Composite（Epic-2 新增基类）  │
│  · 强类型属性值（StringValue/EnumValue<T>/...）         │
│  · XML serializer / deserializer                        │
├──────────────────────────────────────────────────────────┤
│ Schema codegen（dev-only, tools/schema-codegen/）        │
│  · 吃 data/schemas/*.json → 生成 src/word/generated/*.ts │
└──────────────────────────────────────────────────────────┘
```

> ADR-007：Word 上层从 `openxml-ts/word` 暴露，与顶层 `openxml-ts` 并列；
> 后续 Excel / PPT 沿用 `openxml-ts/excel` `openxml-ts/powerpoint` 命名。

## 2. 目录结构（Epic-2 完成态）

```
openxml-ts/
├── src/
│   ├── index.ts                         # v0.1.0 顶层（不动）
│   ├── packaging/...                    # v0.1.0 OPC 内核（不动）
│   ├── element/                         # Epic-2 新增：OpenXmlElement 基础
│   │   ├── element.ts                   # OpenXmlElement / Leaf / Composite
│   │   ├── element-list.ts              # OpenXmlElementList（child container）
│   │   ├── unknown-element.ts           # 未知元素 fallback
│   │   ├── values/                      # 强类型属性值
│   │   │   ├── string-value.ts
│   │   │   ├── boolean-value.ts
│   │   │   ├── int32-value.ts
│   │   │   ├── int64-value.ts
│   │   │   ├── enum-value.ts
│   │   │   ├── hex-binary-value.ts
│   │   │   ├── date-time-value.ts
│   │   │   └── index.ts
│   │   ├── xml-deserialize.ts           # XML token → element 树
│   │   ├── xml-serialize.ts             # element 树 → XML
│   │   ├── registry.ts                  # prefix:localName → class 注册
│   │   └── validators/                  # 校验器（Required/String/Number/Enum）
│   └── word/
│       ├── index.ts                     # WordprocessingDocument + 公共导出
│       ├── word-document.ts             # WordprocessingDocument extends OpenXmlPackage
│       ├── parts/                       # typed Part 类
│       │   ├── main-document-part.ts
│       │   ├── styles-part.ts
│       │   ├── settings-part.ts
│       │   ├── theme-part.ts
│       │   ├── font-table-part.ts
│       │   └── web-settings-part.ts
│       └── generated/                   # codegen 输出
│           ├── _registry.ts             # 注册全部 element 类
│           ├── document.ts
│           ├── body.ts
│           ├── paragraph.ts
│           ├── run.ts
│           ├── text.ts
│           ├── ...（约 1500 个文件）
│           └── index.ts                 # 显式 re-export（tree-shake 友好）
├── tools/
│   └── schema-codegen/
│       ├── README.md
│       ├── generate.ts                  # 入口：吃 JSON → 写 *.ts
│       ├── templates/                   # 模板字符串
│       └── transforms/                  # 类型映射、命名空间映射
├── packages/                            # 仍空（占位，Epic-2 不切包）
└── test/
    ├── element/                         # element 基础单测
    └── word/
        ├── parts/                       # typed Part 单测
        ├── elements/                    # 抽样 element 单测（不是全 1500）
        ├── roundtrip/                   # element 树 golden roundtrip
        └── fixtures/                    # 复用 Epic-1 的 golden 目录
```

> ADR-008：codegen 输出与手写代码同处 `src/`，但放 `generated/` 子目录，统一加
> `// THIS FILE IS GENERATED. DO NOT EDIT.` 顶部 banner；biome 跳过该目录的格式化
> 以减少 noise（codegen 自己负责输出格式）。

## 3. OpenXmlElement 基类设计

```ts
// element/element.ts
export abstract class OpenXmlElement {
  /** XML 本地名，例如 "p"。 */
  abstract readonly localName: string;
  /** namespace prefix，例如 "w"。 */
  abstract readonly prefix: string;
  /** namespace URI。 */
  abstract readonly namespaceUri: string;

  parent?: OpenXmlCompositeElement;

  /** 透传的扩展属性（未在 schema 中声明的属性）。 */
  extendedAttributes = new Map<string, string>();

  /** 序列化为 XML 片段。 */
  abstract writeTo(writer: XmlWriter): void;

  /** 把扩展属性写入 attrs 集合。 */
  protected writeExtendedAttrs(): Array<[string, string]> {
    return [...this.extendedAttributes.entries()];
  }
}

export abstract class OpenXmlLeafElement extends OpenXmlElement {
  /** 文本节点（如 w:t 的内容）；leaf 不允许子元素。 */
  text?: string;
}

export abstract class OpenXmlCompositeElement extends OpenXmlElement {
  readonly children = new OpenXmlElementList(this);

  appendChild<T extends OpenXmlElement>(child: T): T { ... }
  insertBefore<T extends OpenXmlElement>(child: T, sibling: OpenXmlElement): T { ... }
  remove(child: OpenXmlElement): boolean { ... }

  *elements<T extends OpenXmlElement>(ctor?: new (...a: any[]) => T): IterableIterator<T> { ... }
  *descendants<T extends OpenXmlElement>(ctor?: new (...a: any[]) => T): IterableIterator<T> { ... }
  firstChild<T extends OpenXmlElement>(ctor?: new (...a: any[]) => T): T | undefined { ... }
}
```

> ADR-009：`OpenXmlElement` 实例字段都用 mutable 属性而不是 getter/setter
> 包装。理由：JIT 友好、调试器友好；Validators 在 setter 处理是 codegen 注入的
> override，不强制在基类层抽象。

## 4. 强类型属性值

```ts
// element/values/string-value.ts
export class StringValue {
  constructor(public value: string) {}
  toString(): string { return this.value; }
  static parse(s: string | undefined): StringValue | undefined {
    return s === undefined ? undefined : new StringValue(s);
  }
}

// element/values/boolean-value.ts
export class BooleanValue {
  constructor(public value: boolean) {}
  toString(): string { return this.value ? "1" : "0"; }
  static parse(s: string | undefined): BooleanValue | undefined {
    if (s === undefined) return undefined;
    return new BooleanValue(s === "1" || s === "true");
  }
}

// element/values/enum-value.ts
export class EnumValue<T extends string> {
  constructor(public value: T) {}
  toString(): string { return this.value; }
  static parse<T extends string>(
    s: string | undefined,
    members: readonly T[],
  ): EnumValue<T> | undefined {
    if (s === undefined) return undefined;
    if (!members.includes(s as T)) return undefined; // 未知值降级为 undefined
    return new EnumValue(s as T);
  }
}
```

> ADR-010：属性值都用 class 而不是裸 string——保持 `.toString()` / 序列化逻辑
> 收敛、未来扩展（比如自动 trim、自动转大小写）只改一个地方。

## 5. Schema codegen 管线

**输入**：`/Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json` 等。

**输出**：`src/word/generated/<element-name>.ts`，每个 element 一文件。

### 5.1 生成内容样板

```ts
// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Paragraph
import { OpenXmlCompositeElement, OpenXmlElement } from "../../element/element.js";
import { StringValue, HexBinaryValue, EnumValue } from "../../element/values/index.js";
import { ParagraphProperties } from "./paragraph-properties.js";
import { Run } from "./run.js";
// ... 其它 child element imports

/** Defines the Paragraph Class.  Element name: w:p */
export class Paragraph extends OpenXmlCompositeElement {
  override readonly localName = "p" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri =
    "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;

  /** Revision Identifier for Paragraph Glyph Formatting. w:rsidRPr */
  rsidParagraphMarkRevision?: HexBinaryValue;
  /** w:rsidR */
  rsidParagraphAddition?: HexBinaryValue;
  // ... 其它属性

  constructor(...children: Array<ParagraphProperties | Run | /* ... */ OpenXmlElement>) {
    super();
    for (const c of children) this.appendChild(c);
  }

  override writeTo(writer: XmlWriter): void {
    const attrs: Array<[string, string | undefined]> = [
      ["w:rsidRPr", this.rsidParagraphMarkRevision?.toString()],
      ["w:rsidR", this.rsidParagraphAddition?.toString()],
      // ...
      ...this.writeExtendedAttrs(),
    ];
    if (this.children.count === 0) {
      writer.empty("w:p", attrs);
      return;
    }
    writer.open("w:p", attrs);
    for (const c of this.children) c.writeTo(writer);
    writer.close("w:p");
  }
}
```

### 5.2 命名空间前缀映射

`data/typed/namespaces.json` 给出每个 namespace URI 的标准前缀（`w` / `xl` / `p` / `r` / `mc` 等）。codegen 内置 fallback 表，遇到未知前缀报错。

### 5.3 类型映射

| Schema `Type` 字段 | TS 类型 |
| --- | --- |
| `StringValue` | `StringValue` |
| `BooleanValue` | `BooleanValue` |
| `Int32Value` / `UInt32Value` | `Int32Value` / `UInt32Value` |
| `HexBinaryValue` | `HexBinaryValue` |
| `DateTimeValue` | `DateTimeValue` |
| `EnumValue<DocumentFormat.OpenXml.Wordprocessing.X>` | `EnumValue<XLiteralUnion>` + 同位生成 literal union 类型 |
| `OnOffValue` | `BooleanValue`（实际 schema 中两种互换） |
| `ListValue<...>` | `Array<StringValue>` |

### 5.4 Validator 注入

每条 `Attributes[].Validators[]` 在生成代码中变成 setter override：

```ts
private _author?: StringValue;
get author(): StringValue | undefined { return this._author; }
set author(v: StringValue | undefined) {
  if (v === undefined) {
    throw new OpenXmlValidationError({ code: "REQUIRED_ATTR_MISSING", attribute: "w:author" });
  }
  if (v.value.length > 255) {
    throw new OpenXmlValidationError({ code: "STRING_TOO_LONG", attribute: "w:author", limit: 255 });
  }
  this._author = v;
}
```

> ADR-011：Validator 在赋值时立即抛错。`pkg.validate()` 整包遍历功能放到 Epic-2 之后。

## 6. XML ↔ Element 树

### 6.1 反序列化

继承 Epic-1 `tokenizeXml`：

```ts
function deserialize(xml: string): OpenXmlElement {
  const stack: OpenXmlCompositeElement[] = [];
  let root: OpenXmlElement | undefined;
  for (const token of tokenizeXml(xml)) {
    if (token.kind === "open" || (token.kind === "open" && token.selfClosing)) {
      const ctor = registry.lookup(token.attrs.get("xmlns") ?? inheritNs(stack), token.name);
      const elem = ctor !== undefined ? new ctor() : new OpenXmlUnknownElement(token.name, token.attrs);
      // 应用属性
      // push / set root
    }
    if (token.kind === "close") stack.pop();
    if (token.kind === "text") /* leaf 的 text 字段 */;
  }
  return root!;
}
```

### 6.2 注册表

codegen 同时产出 `_registry.ts`：

```ts
import { Paragraph } from "./paragraph.js";
import { Run } from "./run.js";
// ...
export function registerWordprocessingElements(register: (key: string, ctor: new () => OpenXmlElement) => void): void {
  register("w:p", Paragraph);
  register("w:r", Run);
  // ...
}
```

注册是显式 import——保留 tree-shake 性。用户**不调用** `registerWordprocessingElements` 时只会引入他实际用到的类。

> ADR-012：注册表 lazy-import。`xml-deserialize.ts` 通过 `await import("./word/generated/_registry.js")` 仅在需要从 XML 重建元素树时加载，不影响仅做 typed CRUD 的用户的 bundle。

## 7. 与 v0.1.0 公共 API 的兼容矩阵

| v0.1.0 公共 API | Epic-2 影响 |
| --- | --- |
| `OpenXmlPackage` | 不变；`WordprocessingDocument extends OpenXmlPackage` |
| `IPackagePart` | 不变；新增 `MainDocumentPart implements IPackagePart` |
| `IRelationshipCollection` / `IPackageRelationship` | 不变 |
| `ContentTypeManifest` | 不变 |
| `OpenXmlPackageError` | 新增 code: `REQUIRED_ATTR_MISSING` / `STRING_TOO_LONG` / `NUMBER_OUT_OF_RANGE` / `ENUM_VALUE_INVALID` — 字面量联合扩展不破坏 narrow |
| `createInMemory` / `openAsync` | 不变；新增 `WordprocessingDocument.openAsync` 是包装层 |

> 不会 BREAKING：扩 `OpenXmlPackageErrorCode` 字面量联合是 minor。Epic-2 发版预计 0.2.0。

## 8. 性能预算

| 操作 | 目标 p95 |
| --- | --- |
| 1 MB docx open + element 树构造 | ≤ 300 ms |
| element 树 → XML 序列化 | ≤ 200 ms（同包） |
| 1500 个 element 类全部加载（cold start） | ≤ 50 ms（lazy imports + ESM tree-shake 减小实际加载） |
| 测试集（225 → 估约 400） | ≤ 30 s |

## 9. 子 entry point 包结构

`package.json`：

```jsonc
{
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./word": { "types": "./dist/word/index.d.ts", "import": "./dist/word/index.js" },
    "./package.json": "./package.json"
  }
}
```

`src/word/index.ts` 显式导出：

```ts
export { WordprocessingDocument } from "./word-document.js";
export { MainDocumentPart, StylesPart, /* ... */ } from "./parts/index.js";
export { Paragraph } from "./generated/paragraph.js";
export { Run } from "./generated/run.js";
export { Text } from "./generated/text.js";
// 显式列出常用 element 类。完整列表见各 generated/*.ts，用户可深引。
```

> ADR-013：用户可 `import { Paragraph } from "openxml-ts/word"` 或 `import { Paragraph } from "openxml-ts/word/generated/paragraph.js"` — 后者更精确，前者更友好。

## 10. 测试策略

| 层 | 内容 |
| --- | --- |
| 单元（element 基类） | `OpenXmlElement` / `OpenXmlElementList` 操作、序列化字节级稳定 |
| 单元（值类型） | StringValue / EnumValue<T> / ... parse + toString round-trip |
| 单元（抽样 element） | Paragraph / Run / Text / Table / TableRow / TableCell 等 ~20 个核心类的属性 + 子元素行为 |
| codegen 快照 | 输入 fragment JSON → 期望输出字符串（vitest snapshot） |
| 集成（黄金 fixture） | HelloWorld.docx 等三个：element 树 → 同形 JSON golden，与新 `<name>.element.golden.json` 比对 |
| 浏览器（Chromium） | 关键 element 单测 + 一份 fixture roundtrip（不跑 file I/O 部分） |

## 11. 风险与缓解

| 风险 | 缓解 |
| --- | --- |
| codegen 产物过大拖垮 tsc | tsc `--build` + 项目引用（`composite: true`），让 `generated/` 单独 build。或拆 sub-project |
| 1500 个文件让 git diff 难看 | 限定生成内容稳定排序；review 时聚焦 codegen 自身改动 |
| 与 .NET 在 Enum 字面量上微差 | codegen 单元测试对照 schema JSON 字面量；不在 TS 端重新定义 enum |
| XML 反序列化遇到 mc:AlternateContent 复杂回退 | 未知元素降级 + `mc:AlternateContent` 占位透传；不强制选择 fallback 内容 |
| 用户 import 不当导致 bundle 包含 1500 类 | 在 README + JSDoc 强调子路径 import；CI 加 size-limit 守护「最小用例」<= 50 KB gzip |

## 12. ADR 索引（Epic-2 新增）

| 编号 | 决策 | 状态 |
| --- | --- | --- |
| ADR-007 | Word 上层从子 entry `openxml-ts/word` 暴露 | accepted |
| ADR-008 | codegen 输出与手写代码同处 `src/`，`generated/` 子目录 + banner + biome ignore | accepted |
| ADR-009 | OpenXmlElement 字段用 mutable 属性，setter 校验由 codegen 注入 | accepted |
| ADR-010 | 属性值统一封装为 class | accepted |
| ADR-011 | Validator 在赋值时立即抛错；不实现全包 validate（留后续） | accepted |
| ADR-012 | element 注册表 lazy import，保留 tree-shake | accepted |
| ADR-013 | 用户可深引 `openxml-ts/word/generated/<elem>.js` 进一步缩减 bundle | accepted |

## 13. 衔接到 SM 阶段

下一步：**BMAD SM 代理** 在 [docs/implementation/epic-2-wordprocessing.md](../implementation/epic-2-wordprocessing.md) 把 PRD §9 的 FR-1..FR-8 配合本文 §3..§9 的结构拆成 Story-2.1..2.10。
