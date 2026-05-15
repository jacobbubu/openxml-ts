---
stepsCompleted: []
inputDocuments:
  - docs/planning/epic-2-prd.md
  - docs/planning/epic-2-architecture.md
workflowType: 'epics'
projectName: openxml-ts
epic: 'Epic-2 / Word · WordprocessingML'
language: zh-CN
---

# Epic-2 · WordprocessingML 拆分

## 概述

按 [Epic-2 PRD](../planning/epic-2-prd.md) §9（FR-1..FR-8）+ [Epic-2 Architecture](../planning/epic-2-architecture.md) §3..§10，把 Word schema 类工作拆成 10 条 Story。

整体策略：先把 **element 基础设施** + **codegen 管线**打通（Story 2.1–2.4），再批量生成 element 类（2.5），再上 typed Part 与文档入口（2.6），最后补校验、roundtrip、tree-shake、性能与发版（2.7–2.10）。

## 需求覆盖映射

| Story | 覆盖的 FR | 关键 NFR | Architecture 章节 |
| --- | --- | --- | --- |
| 2.1 | FR-1（element 基础） | NFR-3 | §3 |
| 2.2 | FR-2（属性值） | NFR-3 | §4 |
| 2.3 | FR-5（XML ↔ Element） | NFR-1, NFR-3 | §6 |
| 2.4 | FR-3（codegen 管线） | NFR-3, NFR-6 | §5 |
| 2.5 | FR-3 (FR-3.2) | NFR-2 | §5 + §9 |
| 2.6 | FR-4（WordprocessingDocument） | NFR-2 | §1, §7 |
| 2.7 | FR-6（Validator） | NFR-3 | §5.4 |
| 2.8 | FR-8（Roundtrip & 样例） | NFR-3 | §10 |
| 2.9 | FR-7（子 entry + tree-shake） | NFR-2 | §9 |
| 2.10 | NFR-1（性能）+ Diagnostics + 发版 | NFR-1, NFR-5 | §8 |

## Story 列表

### Story 2.1: OpenXmlElement 基础 + 树操作

**As a** SDK Dev，
**I want** 一套类似 .NET 的 `OpenXmlElement` 基类层级（Leaf / Composite + 树操作），
**so that** 后续生成的 Word element 类直接继承使用，统一 mutation/迭代/序列化语义。

**AC**:
- **Given** Architecture §3 的接口，
  **When** Story 完成，
  **Then** `src/element/` 暴露 `OpenXmlElement` / `OpenXmlLeafElement` / `OpenXmlCompositeElement` / `OpenXmlElementList` / `OpenXmlUnknownElement`。
- **And** `OpenXmlCompositeElement` 支持 `appendChild` / `insertBefore` / `remove` / `elements<T>()` / `descendants<T>()` / `firstChild<T>()`。
- **And** Iterator/迭代器顺序与插入顺序一致；append 设置 `parent`、remove 清除 `parent`。
- **And** vitest 覆盖率 ≥ 90% 行。

**Dependencies:** —
**Out of scope:** 强类型属性值；XML 互转；具体 Word element。

---

### Story 2.2: 强类型属性值

**As a** SDK Dev，
**I want** `StringValue` / `BooleanValue` / `Int32Value` / `EnumValue<T>` 等值类型，
**so that** schema 中各种属性类型可以用同一组容器表达，序列化反序列化逻辑收敛。

**AC**:
- `src/element/values/` 暴露 8 个核心类：`StringValue`/`BooleanValue`/`Int32Value`/`Int64Value`/`UInt32Value`/`HexBinaryValue`/`DateTimeValue`/`DecimalValue` + 泛型 `EnumValue<T>`。
- 每个类有 `static parse(input?)`（容忍 undefined）+ `toString()`，round-trip 字节级保真。
- `EnumValue.parse(s, members)` 对未知值返回 `undefined`（不抛）；setter 路径在 Story 2.7 处理校验。
- 单元测试 ≥ 30 用例，覆盖各类边界（空 / undefined / 非法 / 边界值 / round-trip）。

**Dependencies:** 2.1
**Out of scope:** Validator；codegen 注入。

---

### Story 2.3: XML ↔ Element 树双向序列化

**As a** SDK Dev，
**I want** 通用的 XML → element 树解析器与 element 树 → XML 序列化器，
**so that** 不只是 OPC manifest，任意 wordprocessingml 命名空间下的元素都能往返。

**AC**:
- 升级 `tokenizeXml`：保留 namespace prefix 的属性命名（如 `w:rsidR`），不再仅处理 `xmlns`。
- 新增 `src/element/xml-deserialize.ts`：吃 XML 字符串，按注册表查 element 类，未知降级为 `OpenXmlUnknownElement`。
- 新增 `src/element/xml-serialize.ts`：吃 element 树，按各 element 的 `writeTo` 走 `XmlWriter`，输出字节级稳定。
- 注册表（`src/element/registry.ts`）支持 lazy register；调用方负责注入 `registerWordprocessingElements`（codegen 产出）。
- 单元测试：抽样元素 round-trip、未知元素透传、namespace prefix 保真。

**Dependencies:** 2.1, 2.2
**Out of scope:** Word 具体 element 类（Story 2.5）；schema 校验。

---

### Story 2.4: Schema codegen 管线

**As a** SDK 维护者，
**I want** 一个吃 `data/schemas/*.json` 输出 TS element 类的工具，
**so that** 我们用一份机器把 1500 个 element 类生成出来，避免手写人肉重复。

**AC**:
- `tools/schema-codegen/`：`generate.ts` 入口 + `templates/` 模板 + `transforms/` 类型映射；
- `pnpm gen:word` 一键重生 `src/word/generated/*`；
- 输入：`/Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json`（可配置路径）；
- 输出：每 element 一份 TS 文件，含构造、属性、`writeTo`、JSDoc 引用；
- 顶部加 `// THIS FILE IS GENERATED. DO NOT EDIT.` banner；
- 确定性：两次跑产物字节一致；
- biome.json 把 `src/**/generated/**` 加入 ignore；
- 快照测试：「输入 schema fragment → 期望输出 TS」覆盖至少 5 种 element 形态（leaf-with-attrs / composite / abstract base / enum 属性 / 重复粒子）。

**Dependencies:** 2.1, 2.2, 2.3
**Out of scope:** 实际 1500 元素生成（2.5）；Validator 注入（2.7 联动）。

---

### Story 2.5: 生成 wordprocessingml 主 namespace 全部 element 类

**As a** SDK Dev，
**I want** 跑通 codegen 输出全部 `xmlns="http://schemas.openxmlformats.org/wordprocessingml/2006/main"` 下的 element 类，
**so that** 用户能用强类型操作 Word 文档。

**AC**:
- `pnpm gen:word` 输出至少 1400 个 element 类到 `src/word/generated/`（≥ 95% schema 覆盖率）；
- `src/word/generated/index.ts` 显式 re-export 所有类；
- `src/word/generated/_registry.ts` 提供 `registerWordprocessingElements` 函数；
- `pnpm typecheck` 在生成产物上通过（约 1500 文件，需启 `tsc --build` + 项目引用）；
- 抽样验证：手动用三个核心 element（`Paragraph` / `Run` / `Text`）+ 三个次级（`Table` / `TableRow` / `TableCell`）的字段与上游 .NET 等同。

**Dependencies:** 2.4
**Out of scope:** Validator 注入（2.7）；Drawing/Math/VML 次级 namespace。

---

### Story 2.6: WordprocessingDocument + typed Parts

**As a** SDK Dev，
**I want** `WordprocessingDocument extends OpenXmlPackage` + typed Part 类，
**so that** 用户能用 `doc.mainDocumentPart!.document.body!.appendChild(...)` 这样的链式 API。

**AC**:
- `src/word/word-document.ts`：`WordprocessingDocument extends OpenXmlPackage`，`openAsync(source)`/`create()`/`createAsync()`；
- typed Part 类：`MainDocumentPart` / `StylesPart` / `SettingsPart` / `ThemePart` / `FontTablePart` / `WebSettingsPart`；
- typed Part 提供 `document: Document` / `styles: Styles` 等 lazy getter（首次访问反序列化 Part 内容）；
- 修改 typed Part 的 root 后 `pkg.saveAsync()` 触发 element 树 → XML 序列化 → Part 写回；
- 端到端 vitest：打开 `HelloWorld.docx` → 改 paragraph 文字 → save → reopen → 验证；
- 不破坏 Epic-1 公共 API。

**Dependencies:** 2.3, 2.5
**Out of scope:** Validator 报错路径（2.7）。

---

### Story 2.7: 属性级 Validator（Required / String / Number / Enum）

**As a** SDK Dev，
**I want** schema 中声明的属性 Validators 在 setter 赋值时立即生效，
**so that** 用户用错值时立刻报错而不是在写盘时才崩。

**AC**:
- `src/element/validators/` 暴露 `RequiredValidator` / `StringValidator` / `NumberValidator` / `EnumValidator`；
- codegen 把对应 Validator 注入到生成类的 setter；
- 新增 errors code：`REQUIRED_ATTR_MISSING` / `STRING_TOO_LONG` / `NUMBER_OUT_OF_RANGE` / `ENUM_VALUE_INVALID`；
- 抛错时含 `attribute`、`elementClass` 上下文；
- 抽样 element 的 setter 单元测试覆盖正负向；
- 注意：Required 在「直接 setter 写 undefined」时抛错；从 XML 反序列化时缺 Required 属性也抛错（防止用户拿到不合法对象）。

**Dependencies:** 2.5
**Out of scope:** 包级 `validate()` 全遍历；schema 内容模型校验（child element 出现次数）。

---

### Story 2.8: Roundtrip 真实样例 + element golden 生成器

**As a** SDK Dev，
**I want** Epic-1 的三个黄金 fixture（HelloWorld.docx / basicspreadsheet.xlsx / mcppt.pptx）扩展 element 树形态的 golden，
**so that** 任何 element 序列化回归立刻显形。

**AC**:
- 扩展 `tools/golden-generator/`：在已有 OPC 结构 snapshot 旁边产出 `<name>.element.golden.json`，记录 Word 部分的 element 树（仅 wordprocessingml 主 namespace 的部分）；
- `test/roundtrip/element-tree.test.ts`：对每个 fixture 走 `WordprocessingDocument.openAsync` → element 树 snapshot，与 golden 比对；read → write → read 三轮稳定；
- xlsx / pptx 暂不覆盖 element 树（schema 类还没生成）——这两个 fixture 此 Story 仅做形态验证（element 树不存在的合理性）；
- `examples/word-replace.ts`、`examples/word-create.ts` 两段最小可运行脚本入库。

**Dependencies:** 2.5, 2.6, 2.7
**Out of scope:** Excel / PPT element 树。

---

### Story 2.9: 子 entry point `openxml-ts/word` + tree-shake 守护

**As a** SDK 维护者，
**I want** `openxml-ts/word` 作为子 entry 暴露 Word 公共 API，
**so that** 不引 Word 的用户不被 1500 element 类拖累；引 Word 的用户也只为他实际用到的元素付 bundle 代价。

**AC**:
- `package.json` `exports` 加 `"./word"` 映射；
- `src/word/index.ts` 显式列出常用 element 的 re-export（≥ 30 个核心）；
- README 更新：示例改用 `import ... from "openxml-ts/word"`；
- 加 size-limit check：`{ Paragraph, Run, Text } from "openxml-ts/word"` 的最小 bundle ≤ 50 KB gzip（vite build 测算入 CI）；
- vite + esbuild + Rollup 三端各跑一次 smoke build（dev-only 验证脚本）。

**Dependencies:** 2.6
**Out of scope:** Excel / PPT 子 entry（Epic-3/4）。

---

### Story 2.10: 性能基线 + Diagnostics + 0.2.0 发版准备

**As a** SDK 维护者，
**I want** 跑通 Epic-2 性能基线、扩 Diagnostics、备好 0.2.0 发版，
**so that** Word 子系统正式发布给用户使用。

**AC**:
- `bench/word.bench.ts`：1 MB docx open + element 树构造、 element 树 → XML 序列化，p95 满足 NFR-1.1 / NFR-1.2；结果入 `docs/implementation/bench-baseline.md`（追加 Epic-2 段）；
- `package.diagnostics` 扩展：`elementCount` / `unknownElementCount`；
- README 增加「Word 快速开始」与「element 心智地图」两章；
- release-please 在 main 合入后自动开 0.2.0 PR；
- Word 客户端手工验证 `examples/word-replace.ts` 输出 → 填入 `docs/implementation/manual-test.md`。

**Dependencies:** 2.1..2.9
**Out of scope:** Excel / PPT。

---

## 依赖图（拓扑）

```
2.1 ──┬─> 2.2 ──> 2.3 ──> 2.4 ──> 2.5 ──┬─> 2.6 ──> 2.7 ──> 2.8 ──> 2.9 ──> 2.10
       │                                  │
       └──────────────────────────────────┘
```

并行机会有限——本 Epic 工程量主要在 2.4/2.5，做完后 2.6 → 2.10 接近线性。

## GitHub 落地

- Milestone：**[Epic-2 / Word · WordprocessingML](https://github.com/jacobbubu/openxml-ts/milestone/2)**
- Epic 跟踪 issue：[#15](https://github.com/jacobbubu/openxml-ts/issues/15)
- Story issues：[#16](https://github.com/jacobbubu/openxml-ts/issues/16) 2.1 · [#17](https://github.com/jacobbubu/openxml-ts/issues/17) 2.2 · [#18](https://github.com/jacobbubu/openxml-ts/issues/18) 2.3 · [#19](https://github.com/jacobbubu/openxml-ts/issues/19) 2.4 · [#20](https://github.com/jacobbubu/openxml-ts/issues/20) 2.5 · [#21](https://github.com/jacobbubu/openxml-ts/issues/21) 2.6 · [#22](https://github.com/jacobbubu/openxml-ts/issues/22) 2.7 · [#23](https://github.com/jacobbubu/openxml-ts/issues/23) 2.8 · [#24](https://github.com/jacobbubu/openxml-ts/issues/24) 2.9 · [#25](https://github.com/jacobbubu/openxml-ts/issues/25) 2.10
- 每 Story 一条分支：`codex/<issue-id>-story-2-x`
- 0.2.0 发版触发节点：Story-2.10 完成且 merge 到 main。
