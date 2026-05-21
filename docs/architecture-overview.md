# 架构总览

单页地图。详细 ADR 与设计取舍参见 `docs/planning/epic-N-architecture.md`。

## 两类 API 的区分

openxml-ts 的 API 分为两类，消费者需了解这个区别：

### 忠实移植层（Faithful Port）

与 .NET [DocumentFormat.OpenXml SDK](https://github.com/dotnet/Open-XML-SDK) 一一对应的内容：typed element 类（generated）、Part 类、TypedXmlPart 基类、序列化/反序列化、Markup Compatibility（MC）协商、OPC 内核。这是项目使命的核心——「不越界、不遗失」。

### 便捷扩展层（Convenience Layer）

openxml-ts **自有设计**的人机工程学扩展，.NET SDK 中没有对等 API：

- **Word 扩展**（`src/word/extensions/`）：`Paragraph.alignment`、`Run.bold`、`Paragraph.spacing` 等 ~14 个 mixin
- **PPT 扩展**（`src/ppt/extensions/`）：`Slide.title`、`Shape.position`、`Slide.transition` 等 ~14 个 mixin
- **Excel 扩展**（`src/excel/` + `src/excel/extensions/`）：`setFreezePanes`、`mergeCells`、`Cell.value` 等 ~11 个模块
- **Parts 共享函数**（`src/parts/get-or-create-*.ts`）：跨子系统 bootstrap 工具

便捷扩展层政策：**可加不可改**——只做加法，不改变底层 SDK 忠实语义；按需 import，tree-shake 友好。每个扩展文件头部都有标准 banner 注释，完整清单见 [`docs/convenience-layer.md`](./convenience-layer.md)。

## 五层分层

```
┌────────────────────────────────────────────────────────────────────┐
│  Layer 5: 兼容层                                                    │
│    ├── openxml-ts/linq    LINQ to XML（XDocument / XElement /       │
│    │                      Enumerable）—— .NET 源码 1:1 翻译辅助层    │
│    └── openxml-ts CLI     inspect / cat 命令行                       │
├────────────────────────────────────────────────────────────────────┤
│  Layer 4: 子系统门面                                                │
│    ├── openxml-ts/word    WordprocessingDocument + typed Parts      │
│    ├── openxml-ts/excel   SpreadsheetDocument + typed Parts         │
│    ├── openxml-ts/ppt     PresentationDocument + 7 个 typed Parts + │
│    │                      effective* resolver（三级版式继承）        │
│    └── openxml-ts/drawing DrawingML 共享层（Theme / FontScheme...） │
├────────────────────────────────────────────────────────────────────┤
│  Layer 3: typed Part 抽象                                           │
│    src/parts/             TypedXmlPart<T> 基类                       │
│    src/element/registry   (ns, localName) → class 注册表             │
│    src/element/strict-namespace-map   Strict ↔ Transitional 互译     │
├────────────────────────────────────────────────────────────────────┤
│  Layer 2: element 树                                                 │
│    src/element/           OpenXmlElement 基类、OpenXmlLeafElement、  │
│                           OpenXmlCompositeElement、                  │
│                           OpenXmlUnknownElement（schema 未识别降级） │
│                           XML ↔ Element 双向序列化                    │
│    src/{word,excel,ppt,drawing}/generated/   codegen 出的            │
│                           ~720+460+270+380 = 1830 个 element 类       │
├────────────────────────────────────────────────────────────────────┤
│  Layer 1: OPC 内核                                                   │
│    src/packaging/         IPackage / IPackagePart / Relationships /  │
│                           Content-Types / Flat OPC parser+writer     │
│    src/backends/zip/      ZIP backend（@zip.js/zip.js）              │
│    src/backends/memory/   Memory backend（in-memory createInMemory） │
└────────────────────────────────────────────────────────────────────┘
```

## 自顶向下的请求路径

以 `await PresentationDocument.openAsync("./deck.pptx")` 为例：

1. **Layer 4** `PresentationDocument.openAsync` 调 Layer 1 的 `openAsync(bytes)`；
2. **Layer 1** 走 ZIP backend：解 ZIP → 解 `[Content_Types].xml` 与 `_rels/.rels` →
   构造 `IPackage`；
3. **Layer 4** 拿到 `IPackage` 包装成 `PresentationDocument`；首次访问
   `presentationPart` 时按 `officeDocument` 关系（Strict / Transitional 双向匹配）找
   `/ppt/presentation.xml` 这个 Part；
4. **Layer 3** `PresentationPart` 是 `TypedXmlPart<Presentation>`；首次访问
   `.presentation` 触发 Layer 2 反序列化 Part bytes → element 树；
5. **Layer 2** `deserialize(xml)` 走 SAX-style tokenizer，按 `(namespaceUri, localName)`
   在 registry 里查 Layer 2 generated 类（Slide / SlideLayout / Body / Paragraph…）；
6. 用户拿 `presentation.firstChild(SlideIdList)` / `sp.effectiveColorScheme` 走 typed
   tree 操作，或者 `new XElement(presentation)` 切到 Layer 5 LINQ 视图查询。

写回 (saveAsBytesAsync) 反着走：

- typed roots → `serialize(root)` → XML 字符串 → Part 的 `writeAsync(str)` →
- Part 字节流被 ZIP backend 重打包成 Uint8Array。

## 关键设计决策（ADR 速查）

| ADR | 主题 | 位置 |
| --- | --- | --- |
| 001~012 | OPC 内核：Part URI 规范、Web Streams 唯一 IO、Relationship 不变性 等 | `docs/planning/architecture.md` |
| 013 | Word：generated/parts/facade 三件套结构 | `docs/planning/epic-2-architecture.md` |
| 014~018 | Word 命名映射、tree-shake 友好深引、partial mixin 副作用 | 同上 |
| 019 | Excel: CalcChain 自动失效（任一 Cell 改 dirty → 丢 Part） | `docs/planning/epic-3-architecture.md` |
| 020~021 | SharedString resolver / TypedXmlPart lazy 缓存 | 同上 |
| 022 | 门面 HAS-A 而非 IS-A `MemoryOpenXmlPackage` | 同上 |
| 023 | PPT effective\* getter 挂在 typed Part 层而非 generated element | `docs/planning/epic-4-architecture.md` |
| 024 | PPT slideParts 顺序按 `<p:sldIdLst>` 而非关系遍历 | 同上 |
| 025 | DrawingML 跨 namespace 引用走 runtime registry，不 emit 编译期 import | 同上 |
| 026 | 多子系统 同名类（Paragraph / Text / Run / Shape / TextBody）必须 alias import | 同上 |

## 性能基线（NFR）

| 场景 | 阈值 | 实测（M-series Mac，Node 20.x，vitest bench） |
| --- | --- | --- |
| 1 MB docx open + descendants | ≤ 300 ms p95 | mean 79.2 ms / p99 187.4 ms |
| 1 MB docx mutate + save | ≤ 200 ms p95 | mean 101.4 ms / p99 123.9 ms |
| 1 MB xlsx open + worksheet descendants | ≤ 300 ms p95 | mean 41.0 ms / p99 75.2 ms |
| 1 MB xlsx mutate + save | ≤ 200 ms p95 | mean 97.5 ms / p99 111.4 ms |
| 1 MB pptx open + slide descendants | ≤ 300 ms p95 | mean 34.0 ms / p99 43.4 ms |
| 1 MB pptx mutate + save | ≤ 200 ms p95 | mean 79.4 ms / p99 156.4 ms |

回归判定：p99 增长 > 50% release-blocking；mean > 25% perf-regression。
完整数据见 `docs/implementation/bench-baseline.md`。

## 单包体积（size-limit gzip）

阈值与各 entry 配置见 `package.json#size-limit`；实测当前值跑 `pnpm size` 看（CI 在
每次 PR 守护）。手维护实测数字会随版本漂移，故不在文档里硬编。

总览：root + 4 个子系统各有「minimal（最小用例 tree-shake 后）」与「full（完整
entry 含 registry）」两档；DrawingML 仅 full 档。所有阈值都按 gzip 后字节数算。

## Roadmap

| Epic | 主题 | 状态 |
| --- | --- | --- |
| 1 | OPC Packaging 内核 | 完成 · v0.1.0 |
| 2 | WordprocessingML | 完成 · v0.2.0 |
| 3 | SpreadsheetML | 完成 · v0.3.0 |
| 4 | PresentationML | 完成 · v0.4.0 |
| 6 | 浏览器构建 + playground | 完成 · v0.5.0 |
| 5 | LINQ to XML 兼容层 | 完成 · v0.6.0 |
| 7 | LINQ mutator API | 完成 |
| 8 | OOXML Strict ↔ Transitional 兼容 | 完成 |
| 9 | CLI 工具 | 完成 |
| 10 | 贡献指南 + 架构文档 | 完成（本文件）|
| 11–29 | 文本 / 图片 / 表格 / 注释 / 修订 / 列表 / 超链接 / 书签 / CoreProperties 等便捷层 | 完成 |
| 30–44 | Word 段落 & Run 格式、样式、表格底纹、页码、Excel 冻结 / 列宽行高 / 数字格式、PPT 标题 / Run 格式 | 完成 |
| 45–64 | Cell.value/formula、合并、数据验证、sheet 元数据、PPT 背景 / 转场 / 形状定位旋转 / 加幻灯片 / 隐藏、Word 页眉页脚 / 页面设置 / 脚注、无障碍 | 完成 |
| infra | codegen 继承 BaseClass 属性（OnOff/measure leaf 全部获得 typed `val`） | 完成 |

便捷 helper / 访问器层的完整速查见 [README「便捷 API 速查」](../README.md#便捷-api-速查)。

未来候选：npm publish CI、schema validator、CLI `convert` / `validate`、
fuzz / property test 覆盖长尾 fixture、加密文件读写、渲染出 PDF。
