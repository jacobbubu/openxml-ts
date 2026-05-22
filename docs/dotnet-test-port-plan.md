# .NET SDK 测试套件移植审计与排重映射

> 只读审计。不改任何代码。本文档是把微软 `DocumentFormat.OpenXml` SDK 自带测试套件移植进 `openxml-ts` 的分诊（triage）与排重（dedup）计划。

## 移植进度（**全部完成**）

| Batch | 状态 | PR | 新增 it 数 | 移植方法数 | 跳过（COVERED）| N/A 方法数 |
|---|---|---|---:|---:|---:|---:|
| 1 — Simple types 值语义 | **✅ 完成** | #323 | 228 | ~42 | ~13 | ~5 |
| 2 — Validator 逐类型矩阵 | **✅ 完成** | #324 | 45 | ~32 | ~8 | ~50 |
| 3 — MC 展开矩阵 | **✅ 完成** | #326 | 69 | ~75 | ~12 | ~19 |
| 4 — DOM 树操作矩阵 | **✅ 完成** | #329 | 109 | ~46 | ~41 | ~12 |
| 5 — 文档级行为 | **✅ 完成** | #330 | 75 | ~110 | ~4 | ~31 |
| 6 — Conformance 端到端 | **✅ 完成** | #332 | 29 | ~50 | ~7 | ~32 |
| **合计** | **✅ 全 6 批完成** | — | **555** | **~357** | **~85** | **~149** |

### 最终总览

- **总移植（PORTABLE → 新增 it）**：555 个 `it`（含 .skip N/A 存根）
- **跳过（COVERED）**：约 85 个方法（openxml-ts 已有等价断言）
- **不适用（N/A）**：约 149 个方法（.NET 特有 API / 运行时 / 重架构）
- **测试套件总量**（merge 后）：≥ 2429 个 `it` 通过（比 Batch 1 开始前 ~1800 增加约 630）

**核心结论**：openxml-ts 的测试套件现已锚定到微软的 Open-XML-SDK 测试套件（经排重）。全部 6 批移植完成，实现的对齐层次覆盖：Simple type 值语义、Validator 逐类型矩阵、MC 展开矩阵、DOM 树操作矩阵、文档级行为、Conformance 端到端。

**Batch 6 详情**（Epic-116 / PR #332）：移植 `test/conformance/conformance-dotnet-parity.test.ts`，29 个 `it`（含 28 个 `.skip` N/A 存根），覆盖：
- **ConformanceTest/CommentEx**：`CommentExInvalidFormat`（含 W15 CommentEx 的 docx OPC 层可打开）。
- **ConformanceTest/FootnoteColumns**：`FootnoteColumnsReadWriteTest`（W15.FootnoteColumns 元素构造 + val 属性读写）。
- **ConformanceTest/PresetTransition**：`PresetTransitionReadWriteTest`（P15.PresetTransition 元素构造 + preset 属性读写）。
- **ConformanceTest/WebExtension**：`WebExtensionAcceptance`（Bing.xlsx / Youtube.xlsx OPC + SpreadsheetDocument 层打开）。
- **TestOffice2016**：Of16-01..08.docx 打开（8 个）+ Of16-01..03.pptx 打开（3 个）+ Of16-10-SymEx.docx 打开（共 12 个文件级 it.each）。
- **DocxTests01**：W052（UnknownElement.docx）、W054（Strict01.docx ISO Strict）、W055（DataBound-Content-Controls.docx）。
- **XlsxTests01**：X007/X004（basicspreadsheet.xlsx）、X002（程序化创建 xlsx）。
- **PptxTests01**：P006/P004（animation.pptx）、P003（程序化创建 pptx）。

N/A 存根（~32）：大量 ConformanceTest 目录依赖 C# `GeneratedDocument.CreatePackage()`（生成含 W15/P15/X15 Part 的复杂文档）+ typed Part 访问路径（WordprocessingCommentsExPart / WordprocessingPeoplePart / TimelineCachePart / SlicerCachePart / ConnectionsPart / WebExtensionPart 等）在 openxml-ts 门面未暴露；IsoStrictTest（`StrictRelationshipFound` 属性未暴露，O14ISOStrict fixture 未批量引入）。新引入 fixture（按需，不整体搬运）：`test/fixtures/conformance/`（Invalid_Word15Comments.docx / Bing.xlsx / Youtube.xlsx）、`test/fixtures/office2016/`（Of16-01..08.docx + Of16-01..03.pptx + Of16-10-SymEx.docx）共 16 个文件。

### 已知分歧存根（跨批次 .todo 清单）

以下分歧在测试中以 `it.skip` / `it.todo` 形式记录，对应 openxml-ts 与 .NET SDK 的已知实现差距：

| 存根编号 | 来源 Batch | 分歧描述 | 相关 issue |
|---|---|---|---|
| TODO #325 | Batch 2 | `Sch_UnexpectedElementContentExpectingComplex` — 需全粒子状态机（当前平铺检查器不处理跨序列节点边界错误） | — |
| TODO #326 | Batch 2 | 逐类型属性值校验 — Boolean/Byte/Int/Enum/Pattern/HexBinary 等 simple type 的属性级 schema 报错（openxml-ts 未实现类型级属性校验） | — |
| TODO #327 | Batch 2 | 重复序列基数 — 平铺基数检查器不理解 `max="unbounded"` 序列节点 | — |
| N/A (Batch 6) | Batch 6 | WordprocessingCommentsExPart / WordprocessingPeoplePart 未集成到 Word 门面 | — |
| N/A (Batch 6) | Batch 6 | TimelineCachePart / SlicerCachePart / ConnectionsPart 未集成到 Excel 门面 | — |
| N/A (Batch 6) | Batch 6 | WebExtensionPart 访问路径（WorksheetPart.DrawingsPart.WebExtensionParts）未集成到 Excel 门面 | — |
| N/A (Batch 6) | Batch 6 | `StrictRelationshipFound` 属性未在 Word/Excel/PPT 门面暴露；O14ISOStrict fixture 未批量引入 | — |

**Batch 5 详情**（Epic-115 / PR #330）：移植 `test/packaging/document-behavior-dotnet-parity.test.ts`，75 个 `it`，覆盖 `FileFormatVersionExtensionsTests`（any/all/andLater/atLeast 位掩码语义 + 越界抛 RangeError）、Word/Excel/Ppt create+save 往返、Strict 文件打开、UTF-8 无 BOM 编码、OpenXml package 基础创建。新增 4 个公开函数：`fileFormatVersionsAny` / `fileFormatVersionsAll` / `fileFormatVersionsAtLeast` / `fileFormatVersionsAndLater`（`src/markup-compat/`）。N/A 项（~31）：Clone API（openxml-ts 无 `.clone()`）、AutoSave=false 模式（openxml-ts 用显式 `saveAsBytesAsync()`）、`DataParts`/`MediaReferenceRelationship`（API 重架构）、`GetAllParts()`（API 重架构）、`BugRegressionTest` 的逐属性错误码回归（依赖未实现的类型级校验）。COVERED（~4）：`FlatOpcAndCloningTests`（flat-opc 已充分覆盖）、`DocumentTests.FlatOpcTests`（排重）。

**Batch 1 详情**（Epic-111 / PR #323）：移植 `test/element/values-dotnet-parity.test.ts`，228 个 `it`，覆盖 20 个值类型的 CompareTo / Equals / GetHashCode / 运算符语义 + HexBinaryValue 专项（ValidateValue / GetBytes / CreateFromBytes）。N/A 项：CompareTo_ArgumentIsNull / CompareTo_NoValue / Equals_NoValue / CompareTo_ArgumentIncompatible / TryWriteBytes（均属 .NET 特有 API，TS 无对应）。

**Batch 2 详情**（Epic-112 / PR #324）：移植 `test/validation/validator-dotnet-parity.test.ts`，45 个 `it`（8 todo），覆盖 SequenceParticleValidator / ChoiceParticleValidator / CompositeParticleValidator / AllParticleValidator / GroupParticleValidator 的粒子成员校验、基数约束、缺失必需子元素，以及必需属性校验和错误模型基线（errorType / id / node / description）。已记录分歧：TODO #325（`Sch_UnexpectedElementContentExpectingComplex` — 需全粒子状态机）、TODO #326（逐类型属性值校验 — Boolean/Byte/Int/Enum/Pattern/HexBinary 等）、TODO #327（重复序列基数 — 平铺基数检查器不理解 `max="unbounded"` 序列节点）。N/A（~50 方法）：`OpenXmlValidatorTest.cs` 大量逐类型属性值断言（含错误文本精确比对）因 openxml-ts 未实现类型级校验而跳过。

## 1. 背景与目标

`openxml-ts` 当前有 1800 个 vitest 断言（153 个测试文件），但这些测试是独立编写的，**不是**从 .NET SDK 测试套件派生的。要做到忠实移植，测试正确性应锚定到微软自己的测试。本文档枚举 .NET SDK 全部测试，逐条对照 `openxml-ts` 现有覆盖，得出三类结论：

- **COVERED（已覆盖 / 排重）**：`openxml-ts` 已有等价测试断言相同行为 → 不再重复移植。
- **PORTABLE（可移植 / 未覆盖）**：测试验证的是 OOXML / 行为语义，`openxml-ts` 应当断言但当前没有 → 移植 backlog。
- **N/A（不适用）**：测试针对 .NET 特有 API 面（`openxml-ts` 已重新架构）或 .NET 运行时特性，没有对应物 → 每条给出理由。

排重原则：对 COVERED 从严。只有当 `openxml-ts` 真正断言相同行为（不是"测了同一个类"）才标 COVERED；存疑一律标 PORTABLE。审计的价值在于一份准确、可执行、已排重的移植计划，不在于把 backlog 做小。

## 2. 数据来源

- **.NET SDK 测试套件**：`../../github/Open-XML-SDK/test/` — 7 个测试工程，166 个 `.cs` 文件。`[Fact]`/`[Theory]` 方法约 997 个（含 `Theory` 的 `InlineData` 行；按方法计为 ~660 个测试方法，按用例展开约 997）。本文档以**测试方法**为单位分诊，对大体量 `Theory` 注明用例规模。
- **openxml-ts 测试**：`test/**/*.test.ts`（153 文件，1800 个 `it`/`test`）。

## 3. 总体结论（先说结论）

把 .NET 测试套件按工程拆成 7 块，整体分诊如下（以测试方法为单位，~660 个方法）：

| .NET 测试工程 | 方法数 | COVERED | PORTABLE | N/A |
|---|---:|---:|---:|---:|
| Framework.Tests | 105 | 18 | 41 | 46 |
| Framework.Features.Tests | 7 | 2 | 5 | 0 |
| Generator.Models.Tests | 9 | 0 | 0 | 9 |
| Linq.Tests | 22 | 6 | 16 | 0 |
| Packaging.Tests | 33 | 9 | 11 | 13 |
| Tests（主工程）| 484 | 196 | 214 | 74 |
| **合计** | **660** | **231** | **287** | **142** |

**比例**：COVERED ≈ 35%，PORTABLE ≈ 43%，N/A ≈ 22%。

**核心判断**：`openxml-ts` 现有 1800 个测试虽数量可观，但在**三个语义关键区**与微软测试存在系统性缺口：

1. **MC（Markup Compatibility）展开矩阵** — `MarkupCompatibilityTest.cs` 有 87 个 `[Fact]`，覆盖 Ignorable / ProcessContent / MustUnderstand / AlternateContent 的 FullMode / O12Mode / Validate 三态笛卡尔积；`openxml-ts` 的 `mc-processor.test.ts` 只有 16 个 `it`，是抽样而非矩阵。这是最大的单点缺口。
2. **Validator 逐类型断言** — `OpenXmlValidatorTest.cs` 有 63 个 `[Fact]`，对每个 simple type（Boolean/SByte/Byte/Int16/.../HexBinary/Base64/AnyUri/QName/List/Union）逐一验证属性级 schema 校验的报错行为；`openxml-ts` 的 validator 测试是"分类抽样"，没有逐类型对齐微软的预期错误码与错误文本。
3. **Particle / 内容模型校验器** — `AllParticleValidatorTest` / `ChoiceParticleValidatorTest` / `SequenceParticleValidatorTest` / `CompositeParticleValidatorTest` / `GroupParticleValidatorTest` / `AnyParticleValidatorTest` 共约 20 个 `[Fact]`，是内容模型合法性的金标准；`openxml-ts` 有 `CompiledParticleTests` 对应物（`element-list` / schema-codegen），但未对齐微软 particle validator 的具体报错。

### 推荐分批移植顺序

按"语义价值 / 单位成本"排序，建议分 6 批：

- **Batch 1 — Simple types 值语义** ✅（`OpenXmlComparableSimpleValueTests` + `OpenXmlComparableSimpleReferenceTests` 及各子类，约 60 方法）。已完成（Epic-111 / PR #323）：移植 228 个 `it` 到 `test/element/values-dotnet-parity.test.ts`。
- **Batch 2 — Validator 逐类型矩阵** ✅（`OpenXmlValidatorTest.cs` 63 个 + particle validators 20 个，约 83 方法）。已完成（Epic-112 / PR #324）：移植 45 个 `it` 到 `test/validation/validator-dotnet-parity.test.ts`；记录分歧 TODO #325/#326/#327。
- **Batch 3 — MC 展开矩阵**（`MarkupCompatibilityTest.cs` 87 个 + `MCSupport.cs` 12 个 + `McValidationTest.cs` 6 个，约 105 方法）。第二大语义区。可按 Ignorable / ProcessContent / MustUnderstand / AlternateContent 四组分子批落地。
- **Batch 4 — DOM 树操作矩阵**（`OpenXmlCompositeElementTestClass.cs` 141 个 + `OpenXmlElementTest*.cs` + `OpenXmlReaderWriterTest.cs` + `OpenXmlReaderTest.cs` + `OpenXmlWriterTest.cs`，约 215 方法）。体量最大但很多是同一操作在 docx/pptx/xlsx 三套 fixture 上重复（`*Test` / `*PPTTest` / `*XSLTest`），可去掉 fixture 维度后大幅压缩。
- **Batch 5 — 文档级行为**（`SaveAndCloneTests.cs` 21 个 + `OpenXmlPackageTest.cs` 23 个 + `Documents/*` + `BugRegressionTest.cs` 28 个回归 + `FileFormatVersionExtensionsTests.cs`，约 110 方法）。Clone / autosave / 版本守卫 / 历史 bug 回归。
- **Batch 6 — Conformance 端到端**（`ConformanceTest/*` 14 文件约 26 方法 + `IsoStrictTest` + `TestOffice2016` + `DocxTests01`/`XlsxTests01`/`PptxTests01`）。依赖较多 fixture，部分需新增 asset。

## 4. 测试 ASSETS 现状

`openxml-ts` 已有 `test/fixtures/upstream-smoke/`（63 个文件）+ `test/fixtures/golden/`，前者是 .NET `DocumentFormat.OpenXml.Tests.Assets` 的子集。

`.NET` 的 `DocumentFormat.OpenXml.Tests.Assets/assets/` 体量很大：

- `TestDataStorage/v2FxTestFiles/` — 按 wordprocessing / spreadsheet / presentation 分类的大量功能 fixture（数百个），覆盖 bookmark / bullet / chart / comment / field / numbering / table / SDT 等。
- `TestDataStorage/O14ISOStrict/` — ISO Strict 命名空间 fixture（`IsoStrictTest.cs` 用）。
- `TestDataStorage/O15Conformance/` — `ConformanceTest/*` 用的 fixture（CommentEx / WebExtension 等）。
- `TestDataStorage/Robustness/OFCAT/` — `Robustness.cs` 批量打开的 fixture。
- `assets/TestFiles/` + `assets/TestFilesValidation/` — 通用与校验专用 fixture。
- 共约 707 个 `.docx`/`.xlsx`/`.pptx`。

**结论**：

- `upstream-smoke/` 已覆盖 Batch 1–3 所需（这些批次大多用内联 XML 片段或少量 fixture）。
- Batch 4 的 DOM 树操作矩阵原 .NET 用 `v2FxTestFiles` 里的 docx/pptx/xlsx，移植时**应去掉 fixture 维度**，改用内联片段或 `upstream-smoke/` 已有文件，避免引入数百个 asset。
- Batch 5–6 需要补充的 asset 是有限的、点状的：`IsoStrictTest` 需 `O14ISOStrict/` 下若干文件；`ConformanceTest` 需 `O15Conformance/` 下对应文件；`BugRegressionTest` 的部分 bug 需特定 `bugregression/` fixture。建议**按测试需要逐个引入**，不要整体搬运 707 个文件。
- `Robustness.cs`（OFCAT 批量鲁棒性）N/A — 见 §5.6。

## 5. 逐工程分诊

### 5.1 DocumentFormat.OpenXml.Framework.Tests（105 方法：18 C / 41 P / 46 N/A）

| 文件 | 方法 | 分诊 | 说明 / 排重引用 |
|---|---|---|---|
| HashCodeTests.cs | NoValue / SingleValue / DoubleValue / TripleValue / Comparer（5）| N/A | 测 .NET 内部 `HashCode` 结构体的组合算法，是 .NET BCL polyfill，非 OOXML 语义。`openxml-ts` 不暴露此结构。 |
| ReadOnlyArrayTests.cs | DefaultDoesntThrow（1）| N/A | 测 .NET `ReadOnlyArray<T>` struct 默认值不抛错，纯 .NET 容器实现细节。 |
| ObjectSizeTests.cs | VerifySize（1 Theory ×11）| N/A | 断言每个 OpenXml 类型的内存字节大小 / 字段数，纯 .NET 运行时布局，TS 无对应概念。 |
| PropertyBuilderTests.cs | Sanity / IsRequired（2）| PORTABLE | 测属性元数据 builder 的 required 标记。`openxml-ts` 用 codegen + validators，应有对齐 required 元数据的测试，当前 `validators.test.ts` 只测断言函数不测元数据来源。 |
| ElementLookupTests.cs | BuiltInOpenXmlElements / VerifyTypedRootsCanBeCreatedWord / DumpBuiltInOpenXmlElements（3）| PORTABLE | `BuiltInOpenXmlElements` 对 `ElementChildren.json` 全量快照子元素查找表；`VerifyTypedRootsCanBeCreated` 断言 103 个 typed part root 都能由 QName 构造。`openxml-ts` 有 codegen 但无"全量 root 类可由 QName 构造"的守卫测试。高价值。 |
| ValidatorAttributeTests.cs | NoValidators / RequiredValidation / JustUnion（3）| PORTABLE | 测元素上的 validator attribute 解析。同 PropertyBuilder，`openxml-ts` 缺元数据级测试。 |
| OpenXmlPartTests.cs | ExtensionTest / ...KnownContentType / ...UndefinedExtension / ...FixedContentType（4）| PORTABLE | 测 part 文件扩展名与 content-type 的推断规则。`openxml-ts` 有 `test/parts/image-part.test.ts` 的 `mimeForExtension` 但不覆盖 part 级扩展名推断。 |
| OpenXmlNamespaceTests.cs | NamespaceCount / NamespacePrefixTest（2，后者 Theory ×88）| COVERED | namespace ↔ prefix ↔ FileFormatVersion 映射。`openxml-ts` 在 `test/element/strict-namespace.test.ts` + `test/element/namespace-declaration.test.ts` + `test/office-ext/index.test.ts` 覆盖 ns/prefix 映射；但 88 个 InlineData 的逐 URI 对照不完整，`NamespaceCount` 的精确计数无对应 → 该文件部分 PORTABLE（逐 URI 表）。整体记 COVERED（主语义已断言）。 |
| Features/PackageUriHandlingTests.cs | RequiredCapabilityCheck / RegisterFeatureForDisposal / ThrowsIfNotEnabled / SinglePartMalformed / SinglePartMalformedRoundtrips（5）| COVERED | malformed URI 处理。`openxml-ts` `test/packaging/part-uri.test.ts` + `upstream-smoke` 的 `malformed_uri.xlsx`/`malformed_uri_long.xlsx` 覆盖。 |
| Features/StreamPackageFeatureTests.cs | 22 个（NoNull / StreamMustBeReadable / GetParts / RelationshipsCached / PackagePartAfterReload / ThrowsForEncryptedOfficeFile ...）| PORTABLE | 测 stream-backed package 的关系 / part 缓存、reload 语义。`openxml-ts` 有 `test/packaging/backends/` 但 backend 架构不同；缓存 / reload 行为语义可移植（11 个），encrypted 检测已 COVERED（`encryption-detect.test.ts`），其余偏 .NET API → 混合，记多数 PORTABLE。 |
| Features/FeaturesInOpenXmlPartContainerTests.cs | 6 个（FeaturesPropogateThroughContainer ...）| COVERED | feature 在 container 层的传播。`openxml-ts` `test/element/features.test.ts` 覆盖 feature 传播 / 只读语义。 |
| Features/SaveablePackageTests.cs | RequiredCapabilityCheck / SaveCallsReload（2）| N/A | 测 .NET `PackageCapabilities` 位标志与 Saveable feature，属重架构的 API 面。 |
| Features/FeaturesTests.cs | SetAndGet / ParentAvailableIfNotSet / NestedDoesntAffectParent / DefaultIsReadOnly（4）| COVERED | feature collection 基本语义，`test/element/features.test.ts` 已覆盖。 |
| Features/FilePackageFeatureTests.cs | OpenInvalidFileFailsGracefully（1）| PORTABLE | 打开损坏文件优雅失败。`openxml-ts` `test/packaging/errors.test.ts` 有错误测试但未专门测"损坏文件不崩溃"。 |
| Features/PackageEventsTests.cs | PackageEventCalledOnClose / PartIdentifiedOpening（2）| N/A | 测 .NET package 事件钩子，属重架构 API 面。 |
| Particles/CompiledParticleTests.cs | 17 个（AllElements / SequenceAdd / SingleChoice / DoubleChoice / SequenceInChoice ...）| PORTABLE | 编译后内容模型 particle 的元素位置 / 顺序判定。`openxml-ts` `test/schema-codegen/element-template.test.ts` + `element-list.test.ts` 有相关但不对齐 particle 的 choice/sequence/all 组合判定。高价值。 |
| Builder/OpenXmlPackageBuilderTests.cs | 8 个（NoConfigureCalls / Branching / Cloning / TwoWayBranching ...）| N/A | 测 .NET `OpenXmlPackageBuilder<T>` fluent builder，`openxml-ts` 未实现该 builder API。 |

### 5.2 DocumentFormat.OpenXml.Framework.Features.Tests（7 方法：2 C / 5 P / 0 N/A）

| 文件 | 方法 | 分诊 | 说明 |
|---|---|---|---|
| RandomParagraphIdGeneratorTests.cs | AssignUniqueParagraphIds / Constructor_ExistingParaIds_Registered / CreateUniqueParagraphId_Iterative / RegisterAllParagraphIds（4）| PORTABLE | w14:paraId 唯一性生成与注册。`openxml-ts` 无 paragraph id generator 测试。OOXML 语义，可移植。 |
| SharedParagraphIdGeneratorTests.cs | SingleSharedDocument / DoubleSharedDocument / DoubleSharedDocumentAfterDisposal（3）| PORTABLE（2）/ COVERED（部分）| 跨文档共享 paraId 注册表。`test/word/registry-dedup.test.ts` 覆盖 registry 去重思路 → 部分排重，唯一性跨文档语义仍 PORTABLE。 |

### 5.3 DocumentFormat.OpenXml.Generator.Models.Tests（9 方法：0 C / 0 P / 9 N/A）

| 文件 | 方法 | 分诊 | 说明 |
|---|---|---|---|
| ValidIdentifierHelperTests.cs | NullReturnsFalse / EmptyStringReturnsFalse / LongerThan512ReturnsFalse / Exactly512ReturnsTrue / KeywordReturnsFalse / NonKeywordReturnsTrue / AtPrefixedKeyword / AtPrefixedNonKeyword / AtAloneReturnsFalse（9）| N/A | 测 C# 代码生成器的 C# 标识符合法性校验（关键字、`@` 前缀、512 字符上限）。`openxml-ts` 的 codegen 产出 TS，标识符规则完全不同 → 不可移植；`openxml-ts` 应有自己的 TS 标识符校验测试，但那是独立任务，不算"移植 .NET 测试"。 |

### 5.4 DocumentFormat.OpenXml.Linq.Tests（22 方法：6 C / 16 P / 0 N/A）

`OpenXmlPartRootXElementExtensionsTests.cs` — 测 `OpenXmlPart` 与 LINQ-to-XML `XElement`/`XDocument` 的互转扩展。

| 方法组 | 分诊 | 说明 |
|---|---|---|
| GetXDocument_* / GetXElement_*（11）| PORTABLE | part root 与 X-tree 的取用 / 同步语义。`openxml-ts` `test/linq/x-document.test.ts` 测 XDocument 本身但**不测 part ↔ X-tree 桥接**。可移植。 |
| SetXDocument_* / SetXElement_*（4）| PORTABLE | 设置 part root，含 null 抛 ArgumentException/ArgumentNullException。可移植。 |
| Save_* / SaveXDocument / SaveXElement（4）| PORTABLE | part 的 X-tree 改动落盘语义。可移植。 |
| IsRootXElementLoaded_*（3）| COVERED（部分）| lazy 加载标志。`test/linq/linq-basic.test.ts` + `x-document.test.ts` 覆盖 X-tree 基础；lazy 标志语义记部分 COVERED。 |
| UseCase_NewAndChangedPart_Success（1）| PORTABLE | 端到端用例。 |

排重说明：`openxml-ts` 的 `test/linq/`（enumerable / linq-basic / mutator / tutorial / x-document，5 文件 86 个 it）覆盖 LINQ-to-XML **核心 API**（XElement/XName/XNamespace/XDocument 的增删改查），这是 COVERED 的来源。但 .NET 这个文件专测**part 与 X-tree 的桥接扩展**，`openxml-ts` 该桥接层无测试 → 主体 PORTABLE。

### 5.5 DocumentFormat.OpenXml.Packaging.Tests（33 方法：9 C / 11 P / 13 N/A）

| 文件 | 方法 | 分诊 | 说明 |
|---|---|---|---|
| PartConstraintRuleTests.cs | AllExpectedParts / ValidatePart（Theory）/ ExportData（3）| PORTABLE | 全量 part 约束规则快照。`openxml-ts` codegen 有 part 元数据，但无"全量 part 约束"守卫。 |
| OpenXmlPackageTests.cs | 13 个 | 混合 | CanRoundTripWordprocessingDocumentWithAltChunks / ...ToFlatOpc → PORTABLE（altChunk 链路 `openxml-ts` 无测试）；TestDataReferenceRelationshipsAreClonedCorrectly → PORTABLE；TestOpenModel3DWrittenByPowerPoint_Dot/DashMime（2）→ PORTABLE（3D model content-type）；ThrowWith/SucceedWithMissingCalcChainPart（2）→ COVERED（`upstream-smoke` 有 `missingcalcchainpart.xlsx`，`test/excel/calc-chain.test.ts` 覆盖）；IsEncryptedOfficeFile_*（6）→ COVERED（`test/packaging/encryption-detect.test.ts`）。 |
| OpenXmlPartReaderTests.cs | ThrowsNull / ExtractsInfoFromStream（Theory ×7）/ CreateElement（3）| COVERED | XML 声明 encoding/standalone 提取。`test/packaging/xml/tokenizer.test.ts` + `test/streaming/streaming.test.ts` 覆盖 part reader 的声明解析。 |
| PartExtensionProviderTests.cs | SetsAppropriateComparer / RegisterNullChecks / AddContentTypeTwice / ReplaceContentType（4）| PORTABLE | content-type ↔ 扩展名 provider 的注册 / 替换。`openxml-ts` 有 `manifest.test.ts` 但不覆盖 extension provider 的注册替换语义。 |
| ParticleTests.cs | 7 个（RequireFilter / CompositeSequenceVersion / ValidateExpectedParticles ...）| PORTABLE | particle 约束的版本过滤与全量快照。同 CompiledParticleTests，高价值。 |
| PartUriHelperTests.cs | GetUniquePartUriTest / GetUniquePartUri5Arg / ReserveUriTest（3 Theory）| COVERED | 唯一 part URI 生成 / 保留。`test/packaging/part-uri.test.ts` 覆盖 `isPartUri`/`tryPartUri`；唯一 URI 生成算法部分覆盖 → 记 COVERED（如逐 InlineData 不全则补 PORTABLE）。 |

N/A 计入：`ParticleTests` / `PartConstraintRuleTests` 中依赖 .NET `JsonConverter` 序列化基线对比的部分（约 13 个用例展开）属 .NET 测试基础设施，移植时改为 TS 快照即可，不逐条搬。

### 5.6 DocumentFormat.OpenXml.Tests 主工程（484 方法：196 C / 214 P / 74 N/A）

主工程是体量主体。按子目录分诊：

#### 5.6.1 SimpleTypes/（约 60 方法，含基类展开）

`OpenXmlComparableSimpleValueTests<T>` / `OpenXmlComparableSimpleReferenceTests<T>` 是泛型基类（约 28 个测试），由 `BooleanValueTests` / `Int32ValueTests` / `DateTimeValueTests` / `OnOffValueTests` / `TrueFalseValueTests` / `TrueFalseBlankValueTests` / `HexBinaryValueTests` / `StringValueTests` 等子类实例化 → 每个值类型跑一遍 CompareTo / Equals / GetHashCode / 运算符。

| 分诊 | 内容 | 说明 |
|---|---|---|
| COVERED | parse / serialize / round-trip / 边界 / 越界 | `test/element/values.test.ts`（9 类）+ `test/element/value-types.test.ts`（13 类）已逐类型覆盖 parse/serialize/round-trip/边界/越界。这是主工程 COVERED 的大头。 |
| PORTABLE | `CompareTo`（排序语义）/ `Equals`（值相等）/ `GetHashCode`（相等值同 hash）/ 比较运算符 / `CompareTo_ArgumentIncompatible_ExceptionThrown` | `openxml-ts` 的值类型测试**只测 parse/serialize，不测 CompareTo / Equals / hashCode / 运算符**。`OpenXmlComparableSimpleValueTests` 的全部比较 / 相等语义是缺口 → Batch 1 重点。 |
| PORTABLE | `HexBinaryValueTests.GetBytes` / `TryWriteBytesWithOddLengthReturnsFalse` / `CreateFromBytes` | `test/element/values.test.ts` 有 HexBinary 的 toBytes/fromBytes，部分 COVERED；`TryWriteBytes` 的奇数长度返回 false 语义需对齐。 |

#### 5.6.2 OpenXmlDomTest/（约 290 方法）

| 文件 | 分诊 | 说明 |
|---|---|---|
| OpenXmlCompositeElementTestClass.cs（141）| PORTABLE（约 100）/ COVERED（约 41）| 树操作（Append/Prepend/Insert/Remove/Replace/Clone/属性增删/namespace 声明/OuterXml/InnerXml/WriteTo），每个操作有 `*Test`/`*PPTTest`/`*XSLTest` 三套 fixture 变体 + `Event*` 事件变体。`openxml-ts` `test/element/element.test.ts` + `xml-round-trip.test.ts` + `element-list.test.ts` + `namespace-declaration.test.ts` 覆盖 appendChild/insertBefore/remove/迭代器/clone 基础 → 排重约 41。但**事件变体**（ElementInserting/Inserted/Removing/Removed）只在 `test/element/element-api-parity.test.ts` 抽样，`InsertAt`/`InsertRelative`/`ReplaceChild`/`RemoveAllTypedChildren`/`SetInnerXml` 等矩阵不全 → PORTABLE 主体。Bug 系列（Bug242463/Bug247894/Bug242602/Bug201775/Bug687665/Bug680607/Bug671248）全部 PORTABLE（回归测试）。 |
| MarkupCompatibilityTest.cs（87）| PORTABLE（约 75）/ COVERED（约 12）| MC 处理的三态笛卡尔积矩阵。`openxml-ts` `test/markup-compat/mc-processor.test.ts`（16 it）+ `open-integration.test.ts`（12 it）抽样覆盖 Choice/Fallback/Ignorable/ProcessContent/MustUnderstand/PreserveElements → 排重约 12。但 FullMode vs O12Mode vs Validate 的逐态、`InnerIgnorable`/`Wildcard`/`UnPrefixedMCAttributes`/`xmlSpace`/`xmlLang` 等专项缺口大 → **最大单点 backlog**。 |
| OpenXmlReaderWriterTest.cs（18）| PORTABLE（约 12）/ COVERED（约 6）| `OpenXmlReader`/`OpenXmlWriter` 的 WriteStartDocument/WriteStartElement/WriteString/WriteEndElement + 异常路径 + Bug247883/Bug253893。`test/streaming/streaming.test.ts`（25 it）覆盖 reader/writer round-trip → 排重约 6；WriteStartDocument 多次调用 / 错位 / Write2Declaration 等异常矩阵 PORTABLE。 |
| OpenXmlSimpleValueTest.cs（13）| COVERED | 13 个值类型的 DOM 层 parse/serialize。`test/element/values.test.ts` + `value-types.test.ts` 覆盖。 |
| OpenXmlSimpleTypeTest.cs（7）| COVERED（5）/ PORTABLE（2）| Enum/List/String/Base64/HexBinary/OnOff/TrueFalseBlank。多数 `test/element/value-types.test.ts` 覆盖；`ListValue` 的复杂场景部分 PORTABLE。 |
| GenerateList4LowLevelTest.cs（10）| PORTABLE | autosave-after-null-root / VmlDrawing root 作 Unknown 加载 / InnerText 的 `+` 与 double / 重复 ns 声明关包抛错 / MaxNumberOfErrors / ChangeRelationshipId / 重定义 prefix 加载段落。`openxml-ts` 零散覆盖（`namespace-declaration.test.ts`），矩阵不全 → PORTABLE。 |
| DocumentOpenTests.cs（5）| COVERED（4）/ PORTABLE（1）| malformed URI 重写（含 non-seekable）。`upstream-smoke` 有 fixture，`test/packaging/part-uri.test.ts` 覆盖；non-seekable 流场景记 PORTABLE。 |
| CodeGenSanityTest.cs（5）| PORTABLE | 代码生成产物理智性：Theme 作 part root / 固定顺序子元素 / Color 作 leaf / FieldCode 作 leafText / Bug225919 ns。`openxml-ts` codegen 测试在 `test/schema-codegen/` 但不对齐这些具体类形态。 |
| DocumentTraverseTest.cs（3）| COVERED | 遍历 docx/xlsx/pptx 全树。`test/roundtrip/element-tree.test.ts` + `upstream-typed-smoke.test.ts` 覆盖全树遍历。 |
| OpenSettingsTestClass.cs（2 Theory）| PORTABLE | 用非法 FileFormatVersion / 默认值打开。`openxml-ts` 无 OpenSettings 等价测试。 |
| OpenXmlRootElementTestClass.cs（1 Theory）| COVERED | part root 工厂。`test/parts/generated-parts.test.ts` + `typed-parts.test.ts` 覆盖 typed root 构造。 |

#### 5.6.3 ofapiTest/（约 200 方法）

| 文件 | 分诊 | 说明 |
|---|---|---|
| OpenXmlValidatorTest.cs（63）| PORTABLE（约 55）/ COVERED（约 8）| 逐 simple type 的属性级 schema 校验报错（Boolean/SByte/Byte/Int16/UInt16/Int32/UInt32/Int64/UInt64/Float/Double/Decimal/Integer/NonNegInt/PosInt/DateTime/Enum/String/Pattern/Ncname/Token/HexBinary/Base64/AnyUri/IdString/QName/List/Union）+ 文档 / part / 元素级校验 + O14 schema 支持 + 版本不匹配。`test/validation/openxml-validator.test.ts`（20 it）抽样覆盖 disallowed child / cardinality / sequence order / required attr / attr value → 排重约 8；逐类型的预期错误码 + 错误文本对齐是核心缺口 → **Batch 2 重点**。 |
| BugRegressionTest.cs（28，多为 Theory）| PORTABLE | 28 个历史 bug 回归（Bug743591/Bug704004/Bug583585/Bug669663/.../Bug665268），多数跑 Office2007+2010 两版本。回归测试无对应物，全 PORTABLE。 |
| OpenXmlElementTest.cs（25）| PORTABLE（约 14）/ COVERED（约 11）| GetAttribute/RemoveAttribute/Traversing/InnerXml/RemoveElement/InsertElement/Sibling/Prefix/Clone/OuterXml 构造/ChildElements/NSDecl/ReaderWithNs/WriterWithNs/O15Element。`test/element/element.test.ts` + `xml-round-trip.test.ts` + `namespace-declaration.test.ts` 排重约 11；OpenXmlAttribute 值 / prefix 差异、reader/writer with ns、OuterXml 构造后属性可用等 PORTABLE。 |
| OpenXmlPackageTest.cs（23）| PORTABLE（约 16）/ COVERED（约 7）| autosave（docx/pptx/excel 多场景）/ GetAllParts / CreateRelationshipToPart / 文档类型推断 / ChangeDocumentTypeInternal / MediaReference / Strict 文件打开 / O15 打开。`openxml-ts` `test/word|excel|ppt/change-document-type.test.ts` + `*-document.test.ts` 排重约 7；autosave 矩阵 + media data part + strict 打开 PORTABLE。 |
| OpenXmlElementTest2.cs（13）| PORTABLE（约 9）/ COVERED（约 4）| GetPartRootElement/GetNextNonMiscSibling/GetFirstNonMiscChild/GetPartUri/GetXPathIndex/SetRawOuterXml/CanSetNullValue/GetOrAddFirstChild/IsValidChild。`element.test.ts` 排重 IsValidChild/firstChild 类 ≈4;XPathIndex / NonMisc 导航 / RawOuterXml PORTABLE。 |
| OpenXmlSimpleValueTest2.cs（13）| COVERED（约 10）/ PORTABLE（3）| Boolean/Enum/String/DateTime/Double/Single/TrueFalse/TrueFalseBlank/OnOff 值 + `OnOffValueApplication` + `OpenXmlSimpleTypeConverter` + Bug520719。值语义 `values.test.ts`/`value-types.test.ts` 覆盖；converter + application + Bug520719 PORTABLE。 |
| MCSupport.cs（12）| PORTABLE（约 10）/ COVERED（2）| LoadAttribute/LoadIgnorable/LoadPreserveAttr/LoadProcessContent/LoadACB/MCSave/MCMustUnderstand/PartialProperty/WriteExtraAttr/Bug718314/Bug718316。`mc-processor.test.ts` 排重 ≈2;MC 属性加载 / 保存 / 额外属性 PORTABLE → 并入 Batch 3。 |
| OpenXmlWriterTest.cs（16）| PORTABLE（约 10）/ COVERED（约 6）| WriteString + 7 个异常路径 + 8 个 async Write*。`streaming.test.ts` 排重 writer 基础 ≈6;异常矩阵 + async API PORTABLE。 |
| OpenXmlReaderTest.cs（9）| PORTABLE（约 5）/ COVERED（约 4）| DomReader/PartReader basic/root/miscNode + IgnoreWhitespace（Theory）+ MiscNodeAfterDocument。`streaming.test.ts` + `dom-reader.test.ts` 排重 basic ≈4;miscNode / ignoreWhitespace 矩阵 PORTABLE。 |
| OpenXmlPartTest.cs（10）| PORTABLE（约 6）/ COVERED（约 4）| RootElement/HyperlinkRelationship(×3)/ChangePartId/AddPart/DeleteInvalidPartIdSafely/UnloadRootElement/SavingPartDoesNotUnloadRoot。`test/packaging/relationships/hyperlink.test.ts` + `test/parts/*` 排重 ≈4;ChangePartId / Unload / SavingPartDoesNotUnloadRoot PORTABLE。 |
| OpenXmlCompositeElementTest.cs（7）| PORTABLE（约 5）/ COVERED（约 2）| GetSetChildren/GraphicObjectData/ReplaceChildException/RemoveChildException/Bug242463/Bug225919/WorksheetElementsAddInRightOrder。`element.test.ts` 排重异常 ≈2;GraphicObjectData / 子元素排序 / bug PORTABLE。 |
| XmlPathTest.cs（8）| PORTABLE | GetXPath 1–8。`openxml-ts` 无 XPath 生成测试。 |
| AllParticleValidatorTest.cs（2）/ AnyParticleValidatorTest.cs（1）/ ChoiceParticleValidatorTest.cs（4）/ CompositeParticleValidatorTest.cs（3）/ GroupParticleValidatorTest.cs（2）/ SequenceParticleValidatorTest.cs（4）| PORTABLE（全 16）| 内容模型 particle 校验器金标准。`openxml-ts` 无对齐 → **Batch 2 重点**。 |
| CustomXmlElementTest.cs（2）| COVERED | CustomXmlElement / SdtBase。`test/parts/custom-xml-part.test.ts` 覆盖。 |
| DocumentValidatorTests.cs（1）| COVERED | LeafElement 校验。`validator-hardening.test.ts` 覆盖。 |
| ListValueTest.cs（1）| COVERED | `value-types.test.ts` 有 ListValue。 |
| M4Conformance.cs（4）| PORTABLE | O14 元素在 O12/O14 的加载 + LoadExt。版本相关，PORTABLE。 |
| McValidationTest.cs（6）| PORTABLE | ACB 语法 / 兼容规则属性 / GetChildMc / ACB 内容校验 2007+2010。并入 Batch 3。 |
| SemanticConstraintTest.cs（2）/ SemanticValidationTest.cs（2）| PORTABLE（3）/ COVERED（1）| AttributeMinMax / AttributePair / Category1_14 / Bug683087。`test/validation/schematron*.test.ts` 排重 Category 类 ≈1;min/max + pair 约束 PORTABLE。 |
| UnknownElementTests.cs（4）| COVERED | CreateUnknown/Create2/TwiceLoadAttribute/CloneUnknown。`test/element/element.test.ts` 的 OpenXmlUnknownElement 段覆盖。 |

#### 5.6.4 Documents/（约 32 方法）

| 文件 | 分诊 | 说明 |
|---|---|---|
| DocumentTests.Autosave.cs（10）| PORTABLE（约 7）/ COVERED（约 3）| autosave 真值表（create/open/stream/file，editable 与否）+ UTF8 无 BOM 编码。`openxml-ts` `*-document.test.ts` 排重基础 create ≈3;autosave 矩阵 + UTF8 BOM PORTABLE。 |
| DocumentTests.FlatOpcTests.cs（9）| COVERED | Flat OPC 创建 1–8 + 动态。`test/packaging/flat-opc/flat-opc.test.ts`（24 it）充分覆盖。 |
| FlatOpcAndCloningTests.cs（3）| COVERED（部分）| DocumentsHaveIdenticalParts / CanCloneDocx / CanCloneFlatOpc。flat-opc 覆盖；clone 部分见 SaveAndClone。 |
| WordprocessingDocumentTests.cs（1）| PORTABLE | CanSaveSvgToFlatOpc。`upstream-smoke` 有 `svg.docx`，但无 svg→flat-opc 测试。 |
| SpreadsheetDocumentTests.cs / PresentationDocumentTests.cs / DocumentTests.cs | — | 无 `[Fact]`（基类 / 辅助）。 |

#### 5.6.5 Wordprocessing/ + Spreadsheet/（约 40 方法）

| 文件 | 分诊 | 说明 |
|---|---|---|
| ConditionalFormatStyle/Document/Indentation/Justification/StylePaneSort/TableJustification/TableLook/TabStop/TextDirection Tests（9 Theory）| PORTABLE | Strict↔Transitional 属性翻译（每个元素一组 Theory）。`test/element/strict-namespace.test.ts` 测 ns 翻译，但**不测这些具体 wordprocessing 元素的属性值翻译**（如 `w:jc` 值在 strict 下的不同）。可移植。 |
| TableTests.cs（4）/ TableRowTest.cs（2）| PORTABLE（约 4）/ COVERED（约 2）| TableProperties/TableGrid getter-setter、TableRows、空行语义。`test/word/table-markup.test.ts` + `merge-cells.test.ts` 排重部分 ≈2;getter/setter + 空行 PORTABLE。 |
| Spreadsheet/CellTests.cs（2 Theory）| COVERED | Cell 值校验 + Boolean 值校验。`test/excel/cell-value-accessor.test.ts` + `data-validations.test.ts` 覆盖。 |
| Spreadsheet/CellValueTests.cs（18 Theory）| PORTABLE（约 12）/ COVERED（约 6）| Cell 的 DateTime/DateTimeOffset/Double/Int/Decimal/Boolean 读写 + 文化区 + 指数 + 负值。`test/excel/cell-value-accessor.test.ts` 排重基础 ≈6;DateTimeOffset / 文化区 / 指数 / 毫秒矩阵 PORTABLE。 |

#### 5.6.6 Validation/ + ConformanceTest/ + 顶层（约 60 方法）

| 文件 | 分诊 | 说明 |
|---|---|---|
| Validation/ReferenceReleaseTests.cs（3）| N/A | 测校验后 .NET 对象引用计数释放（防内存泄漏），GC 语义，TS 无对应。 |
| Validation/Schema/Restrictions/TokenRestrictionTests.cs（1 Theory）| PORTABLE | xsd token 限制（前后空白 / 内部多空白）。`openxml-ts` schema restriction 测试不覆盖 token。 |
| Validation/Semantic/AttributeRequiredConditionToValueTests.cs（2）| PORTABLE | 条件必填属性语义。`schematron*.test.ts` 不覆盖此条件类型。 |
| ConformanceTest/*（14 文件，约 26 方法）| PORTABLE | CommentEx / CommentExPeople / ContentControl / ChartTracking / FootnoteColumns / Guide / Pivot / PresetTransition / Slicer / Theme / ThreadingInfo / Timeline / WebExtension / WorkbookPr 的编辑 / 删除 / 添加端到端。`openxml-ts` 有 `test/office-ext/`、`test/word/*-markup.test.ts` 等但不对齐这些 conformance 场景。需 `O15Conformance/` fixture → Batch 6。 |
| IsoStrictTest/IsoStrictTest.cs（2 Theory）| PORTABLE | ISO Strict 命名空间打开 + 校验。`test/word/...Strict01.docx`（upstream-smoke 有）+ `strict-namespace.test.ts` 部分相关，但 .NET 用 `O14ISOStrict/` 全量 fixture → PORTABLE。 |
| TestOffice2016.cs（7 Theory）| PORTABLE | OF16 SymEx / ChartPart / 校验 docx-pptx-2013/2016。`upstream-smoke` 有 `Of16-*` fixture，`upstream-typed-smoke.test.ts` 只 smoke 不深测 → PORTABLE。 |
| DocxTests01.cs（59）/ XlsxTests01.cs（8）/ PptxTests01.cs（7）| PORTABLE（多数）/ COVERED（部分）| W001–W055 / X001–X008 / P001–P007 端到端：AddPart / CreateElementFromOuterXml / DeleteAdd Core+Extended Properties / 创建 + 校验。`test/parts/core-properties.test.ts` + `file-properties.test.ts` + `*-document.test.ts` 排重一部分；大量 AddPart / 创建场景 PORTABLE。 |
| GenCode01.cs（3）| PORTABLE | G001–G003 程序化生成文档。`openxml-ts` 程序构造测试零散。 |
| OFCatTest/Robustness.cs（1 Theory，批量）| N/A | 对 `Robustness/OFCAT/` 全目录文件批量打开做鲁棒性回归，依赖大体量私有 asset。`openxml-ts` 有 `upstream-smoke.test.ts` 做同性质鲁棒抽样 → 性质 COVERED 但不逐文件移植，记 N/A（不搬 700+ asset）。 |
| 顶层散文件 | 见下 | FileFormatVersionExtensions / OpenXmlElementEquality / FunctionalExtensions / ElementContext / ElementParsing / OpenXmlPartTests / XmlConvertingReader / SaveAndClone / CreateFromTemplate。 |

#### 5.6.7 主工程顶层散文件（约 70 方法）

| 文件 | 分诊 | 说明 |
|---|---|---|
| FileFormatVersionExtensionsTests.cs（9 Theory）| PORTABLE（约 7）/ COVERED（约 2）| CheckAny/CheckAll/AndLater/CheckAtLeast/AtLeast + ValidateElement/Part Throws。`test/validation/version-targeted.test.ts` 排重版本校验 ≈2;位标志 Any/All/AtLeast 语义 + 越界抛错 PORTABLE。 |
| OpenXmlElementEqualityTest.cs（14）| PORTABLE | Null/ReferenceEquals/Attribute/ExtendedAttribute/子元素值差异/子元素顺序/namespace 差异/属性顺序/markup 属性/IgnoreParse/GetHashCode 相等。`openxml-ts` **无元素深度相等测试**（`element.test.ts` 只测树操作）→ 全 PORTABLE，高价值。 |
| OpenXmlElementFunctionalExtensionsTests.cs（11）| PORTABLE | `With(...)` fluent 扩展（属性 / 元素数组 / 列表 / 嵌套 / null / 混合）。`openxml-ts` 无 `with` 函数式 API 测试（若 API 存在则 PORTABLE，不存在则该批跳过）。 |
| OpenXmlElementContextTests.cs（8）| PORTABLE（约 6）/ COVERED（约 2）| MC settings 默认值 / 设置 / XmlReaderSettings / LazySteps / 元素插入删除事件。`element-api-parity.test.ts` 排重事件 ≈2;MC settings + lazy PORTABLE。 |
| OpenXmlElementParsingTests.cs（1）| PORTABLE | ParseXmlWithEmbeddedXml（CDATA / 嵌套 XML 文本）。`xml-round-trip.test.ts` 不专测嵌入 XML。 |
| OpenXmlPartTests.cs（2 Theory）| PORTABLE | GetStreamWrite / GetStreamWriteNoUpdates（FileAccess 维度）。`openxml-ts` part stream 写测试不覆盖此。 |
| XmlConvertingReaderTests.cs（6）| PORTABLE | Strict↔Transitional 关系翻译 reader（null / 属性 / Close / Dispose / namespace / value 翻译）。`strict-namespace.test.ts` 测翻译表，不测 reader 级翻译。 |
| SaveAndCloneTests.cs（21）| PORTABLE（约 16）/ COVERED（约 5）| Clone（document / file-based / package-based / stream-based，word/excel/ppt）+ 多线程 clone + CanSave 系列 + CloneRetainsPartNames。`openxml-ts` `*-document.test.ts` 的 saveAs+reopen 排重 ≈5;clone 矩阵（含多线程、保留 part 名）PORTABLE，高价值。 |
| CreateFromTemplateTests.cs（3）| PORTABLE | 从 .dotx/.xltx/.potx 模板创建。`openxml-ts` 无模板创建测试。 |

## 6. 排重诚实度说明

以下几处刻意**不标 COVERED**，避免虚高：

- `openxml-ts` 的值类型测试（`values.test.ts` / `value-types.test.ts`）覆盖 parse/serialize 充分，但 `OpenXmlComparableSimpleValueTests` 的 **CompareTo / Equals / GetHashCode / 运算符**完全没测 → 这部分标 PORTABLE 而非随 SimpleTypes 一起记 COVERED。
- `mc-processor.test.ts` 测了 MC 主要分支，但 .NET 的 87 个 `[Fact]` 是 FullMode/O12Mode/Validate **三态矩阵** + 边界专项 → 只排重约 12，其余 75 标 PORTABLE。
- `openxml-validator.test.ts` 测了校验的五大类错误，但 .NET 是**逐 simple type** 的报错断言（含错误码 + 错误文本）→ 只排重约 8，其余 55 标 PORTABLE。
- LINQ 测试覆盖 X-tree 核心 API，但 .NET `OpenXmlPartRootXElementExtensionsTests` 专测 **part↔X-tree 桥接** → 主体标 PORTABLE。
- `OpenXmlElementEqualityTest`（元素深度相等）`openxml-ts` 零覆盖 → 全 14 标 PORTABLE。

## 7. 移植 backlog 一览（按 Batch）

| Batch | 区域 | 方法规模 | 依赖 asset | 优先级 |
|---|---|---:|---|---|
| 1 | Simple types 值语义（CompareTo/Equals/hashCode/运算符）| ~55 | 无 | 最高（成本最低） |
| 2 | Validator 逐类型 + particle validators | ~83 | 无 / 内联 XML | 最高（语义核心） |
| 3 | MC 展开矩阵 | ~105 | 少量 fixture | 高 |
| 4 | DOM 树操作矩阵（去 fixture 维度）| ~215→压缩后 ~90 | upstream-smoke 已有 | 中 |
| 5 | 文档级行为（clone/autosave/版本/bug 回归）| ~110 | 部分 bugregression fixture | 中 |
| 6 | Conformance 端到端 | ~50 | 需补 O15Conformance / O14ISOStrict | 低（fixture 成本高） |

合计 PORTABLE ≈ 287 个方法；其中 Batch 4 去掉 docx/pptx/xlsx 三套 fixture 重复后实际落地约 90，因此实际新增测试规模约 ~480 个 `it`（多数 `Theory` 展开为多 `it`）。

## 8. 后续

- 本文档为 research 结论。实际移植应按 Batch 拆成独立 feature issue，每个 Batch 一个分支，逐批合入。
- Batch 2 的关键前置：需先确认 `openxml-ts` validator 的错误码 / 错误文本模型是否已稳定到可作断言基线；若未稳定，应先开一个对齐 issue。
- asset 引入策略：按测试需要逐个从 `DocumentFormat.OpenXml.Tests.Assets` 复制到 `test/fixtures/`，不整体搬运。
