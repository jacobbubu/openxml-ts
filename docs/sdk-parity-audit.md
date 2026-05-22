# .NET DocumentFormat.OpenXml SDK 公开 API 对齐审查（1.0 门禁）

> 审计日期：2026-05-22
> 审计范围：**手工架构的框架层与封装层公开 API**，逐类逐成员对照。
> 不在范围：约 4400 个 codegen 生成的 typed element 类——它们由 OOXML schema 机械 1:1 生成（155 个命名空间），覆盖完整性已由 Epic-76 验证。
> 证据来源：
> - openxml-ts 公开面：`api/*.api.md`（api-extractor 生成，10 个 entry），以及 `src/element/`、`src/packaging/`、`src/parts/`、`src/validation/`、`src/streaming/`、`src/markup-compat/`、三个文档门面。
> - .NET SDK：`DocumentFormat.OpenXml.Framework/PublicAPI/PublicAPI.Shipped.txt`（1014 行，权威公开成员清单）、`DocumentFormat.OpenXml.Features/PublicAPI.Shipped.txt`、`DocumentFormat.OpenXml/Packaging/*.cs`（typed 文档/Part 类，无 PublicAPI.txt，部分生成）。

---

## 1. 结论先行

openxml-ts 的公开 API **不是 .NET SDK 的逐成员镜像**，而是一次**有意的重新架构**：核心元素模型（`OpenXmlElement` 家族）和流式、MC、校验子系统忠实对齐；而封装层（packaging）走了一条与 .NET 完全不同的路线——用一对低层 `OpenXmlPackage`/`IPackagePart` 抽象 + 一个便捷文档门面（`WordprocessingDocument`/`SpreadsheetDocument`/`PresentationDocument` facade）替代了 .NET 的 `OpenXmlPackage` → `OpenXmlPartContainer` → `OpenXmlPart` 三层继承体系。

因此「对齐百分比」必须分区看，不能给一个笼统数字：

| 区域 | 对齐评级 | 说明 |
|------|---------|------|
| 核心元素模型（OpenXmlElement 家族） | **高（约 90%）** | Epic-88 已系统补齐；缺口集中在 annotations、namespace 声明、attribute 通用读写 API |
| 值类型（Int32Value 等） | **中（9/22 具体类型）** | 只移植了 codegen 实际用到的子集；语义对齐，覆盖不全 |
| 流式 API（Reader/Writer） | **中高（约 75%）** | 形状对齐；缺 PartWriter 的 part-backed 构造、async API、MiscNode、命名空间声明写入 |
| Markup Compatibility | **中高（约 80%）** | 协商核心完整；`MarkupCompatibilityAttributes` typed 属性、`AlternateContent` 便捷方法未对齐 |
| 校验（OpenXmlValidator） | **中（约 70%）** | 三段校验齐全；缺版本定向（FileFormatVersions targeting）、`ValidationErrorInfo` 多个字段、part/package 重载签名 |
| 封装层（Packaging） | **架构性分叉（不可用百分比衡量）** | 设计取舍，非缺失；但 .NET 的若干公开能力确实没有等价物 |
| Features / 扩展性体系 | **缺失（0%）** | `IFeatureCollection`、`Features` 属性整套未移植 |
| 跨切面（克隆 / OuterXml / 命名空间） | **中高** | 元素级克隆/序列化齐全；包级克隆缺失 |

**1.0 建议见第 11 节。一句话：核心元素模型可以锁 1.0；但封装层的架构分叉、Features 体系缺失、校验版本定向缺失三项，需要在 1.0 前要么补齐、要么写进 `api-stability.md` 明确「不承诺对齐 .NET」。**

---

## 2. 核心元素模型 —— 高对齐（约 90%）

### 2.1 OpenXmlElement / Composite / Leaf

Epic-88（issue #252）已做过一轮系统补齐，结论见 `docs/element-api-parity.md`。本审计复核该文档与当前 `api/openxml-ts.api.md`（`OpenXmlElement`、`OpenXmlCompositeElement`、`OpenXmlLeafElement`），结果一致：导航、增删改、克隆、`outerXml`/`innerText` 均已实现。

`OpenXmlElementList` 同样对齐：`count`、`at(index)`、`[Symbol.iterator]`、`toArray()` 对应 .NET 的 `Count`、索引器、`GetEnumerator`、`First<T>`。

**仍缺失 / N/A（与 element-api-parity.md 一致，复核确认）：**

| .NET 成员 | openxml-ts 状态 | 评定 |
|-----------|----------------|------|
| `AddAnnotation` / `Annotation<T>` / `Annotations` / `RemoveAnnotations` | 无 | **缺失**——.NET 的对象注解机制（运行时附加任意元数据），openxml-ts 完全没有等价物。低优先级，但属真实缺口。 |
| `GetAttribute` / `SetAttribute` / `RemoveAttribute` / `GetAttributes` / `SetAttributes` / `ClearAllAttributes` | 无（仅 `extendedAttributes` Map + `applyAttribute`） | **divergent**——typed 属性由 codegen getter/setter 暴露；扩展属性走 `Map`。通用 `OpenXmlAttribute` 读写 API 不存在。可接受的取舍，但跨命名空间属性操作不如 .NET 顺手。 |
| `AddNamespaceDeclaration` / `RemoveNamespaceDeclaration` / `NamespaceDeclarations` / `LookupNamespace` / `LookupPrefix` | 无 | **缺失**——openxml-ts 不维护 xmlns 声明列表（序列化期由 `XmlWriter` 处理）。对大多数场景无影响，但显式控制前缀的能力没有。 |
| `MCAttributes` 属性（get/set `MarkupCompatibilityAttributes`） | 无 | **缺失**——见第 6 节。 |
| `Features` 属性 | 无 | **缺失**——见第 8 节。 |
| `OpenXmlElementContext` / `ElementInserting`/`Inserted`/`Removing`/`Removed` 事件 | 无 | **N/A**——.NET 专有的元素树变更事件机制；openxml-ts 无等价设计，可接受。 |
| `InnerXml` 的 setter（赋值触发解析） | 无 | **N/A**——.NET 特有懒解析；TS 端无此设计。 |
| `GetOrAddFirstChild<T>` / `AddChild` / `IsValidChild` | 无 | **N/A**——.NET schema 感知便捷方法；openxml-ts codegen 层不用此模式。 |
| `OpenXmlElementFunctionalExtensions.With` | 无 | **缺失（低优先级）**——.NET 的函数式构造扩展。 |
| `OpenXmlElementComparers` / `OpenXmlElementEqualityOptions` | 无 | **缺失（低优先级）**——元素结构相等比较器。 |

### 2.2 特殊元素类

| .NET 类 | openxml-ts | 评定 |
|---------|-----------|------|
| `OpenXmlUnknownElement` | `OpenXmlUnknownElement`（继承 `OpenXmlCompositeElement`） | **present** |
| `OpenXmlPartRootElement` | 无独立公开类 | **divergent**——openxml-ts 用 `TypedXmlPart<T>` 承载「Part 根元素」概念，`root`/`flushAsync` 替代 `RootElement`/`Save`/`Reload`。.NET 里 root 元素自带 `Save()`/`Reload()`/`OpenXmlPart` 反查指针，openxml-ts 的 typed 根元素是纯 element，不知道自己属于哪个 part。 |
| `OpenXmlLeafTextElement` | 无独立公开类（`OpenXmlLeafElement` 带 `text`） | **divergent**——.NET 区分 leaf 与 leaf-text，openxml-ts 合并：`OpenXmlLeafElement.text` 即可。可接受。 |
| `OpenXmlMiscNode` | 无 | **缺失**——注释/PI/CDATA 等杂项节点。流式 reader 有 `isMiscNode` getter 但无对应元素类。 |
| `AlternateContent` / `AlternateContentChoice` / `AlternateContentFallback` | typed 类存在（codegen，markup-compat 命名空间） | **present**——但 .NET 的 `AppendNewAlternateContentChoice()` 等便捷方法、`MarkupCompatibilityNamespace`/`TagName` 静态属性未对齐。 |

---

## 3. 值类型（Simple Types）—— 中对齐（9/22 具体类型）

.NET `PublicAPI.Shipped.txt` 公开了 22 个具体值类型：`Base64BinaryValue`、`BooleanValue`、`ByteValue`、`DateTimeValue`、`DecimalValue`、`DoubleValue`、`EnumValue<T>`、`HexBinaryValue`、`Int16Value`、`Int32Value`、`Int64Value`、`IntegerValue`、`ListValue<T>`、`OnOffValue`、`SByteValue`、`SingleValue`、`StringValue`、`TrueFalseBlankValue`、`TrueFalseValue`、`UInt16Value`、`UInt32Value`、`UInt64Value`，外加基类 `OpenXmlSimpleType`/`OpenXmlSimpleValue<T>`/`OpenXmlComparableSimpleValue<T>`/`OpenXmlComparableSimpleReference<T>` 和接口 `IEnumValue`/`IEnumValueFactory<T>`。

openxml-ts 公开（`api/openxml-ts.api.md`）：`BooleanValue`、`DateTimeValue`、`DecimalValue`、`EnumValue<T>`、`HexBinaryValue`、`Int32Value`、`Int64Value`、`StringValue`、`UInt32Value` —— **9 个**。

| 评定 | 明细 |
|------|------|
| **present** | 9 个：语义对齐（构造、`parse`、`toString`、`value`）。注意 openxml-ts 用 TS 原生 `number`/`bigint`/`boolean`/`string`，没有 .NET 的 implicit operator 重载——这是语言差异，**N/A**。 |
| **缺失** | `ByteValue`、`SByteValue`、`Int16Value`、`UInt16Value`、`UInt64Value`、`DoubleValue`、`SingleValue`、`IntegerValue`、`Base64BinaryValue`、`OnOffValue`、`TrueFalseValue`、`TrueFalseBlankValue`、`ListValue<T>` —— **13 个**。 |
| **N/A** | implicit/explicit operator、`OpenXmlComparableSimpleValue` 比较运算符——C# 运算符重载在 TS 无对等。 |

**评估**：codegen 只在 typed 属性里用到这 9 个，所以「够用」。但作为**公开 API**，缺的 13 个里 `OnOffValue`/`TrueFalseValue`/`Base64BinaryValue`/`DoubleValue` 在 OOXML 里很常见——如果某个 typed 属性的类型是这些之一，使用方拿到的会是别的表示（多半是包装类型或原始值），与 .NET 习惯不一致。属真实缺口，建议补齐到 22 个或在文档明示「值类型按 codegen 需求子集化」。

---

## 4. 流式 API —— 中高对齐（约 75%）

`api/openxml-ts-streaming.api.md`：`OpenXmlPartReader`、`OpenXmlPartWriter`、`OpenXmlPartReaderOptions`、`ReaderAttribute`、`ReaderNodeType`、`StartElementDescriptor`、`WriterAttributeDescriptor`。

### OpenXmlPartReader

| .NET 成员 | openxml-ts | 评定 |
|-----------|-----------|------|
| `Read`/`ReadFirstChild`/`ReadNextSibling`/`Skip` | 同名 | **present** |
| `LocalName`/`NamespaceUri`/`Prefix`/`Depth`/`EOF` | 同名 getter | **present** |
| `IsStartElement`/`IsEndElement`/`IsMiscNode` | 同名 getter | **present** |
| `Attributes`/`GetText`/`ElementType`/`LoadCurrentElement` | 同名 | **present** |
| `Create(element)` / `Create(part)` 静态工厂 + `OpenXmlDomReader`（DOM 树 reader）| 仅 `new OpenXmlPartReader(xml: string)` | **divergent**——openxml-ts 只能从 XML 字符串构造，不能直接从 element 树或 part 读。`OpenXmlDomReader` 整个类缺失。 |
| `Encoding`/`StandaloneXml`/`HasAttributes`/`GetLineInfo`/`NamespaceDeclarations`/`ReadMiscNodes`/`Close`/`Dispose` | 无 | **缺失** |
| `OpenXmlPartReaderOptions`（`CloseStream`/`IgnoreWhitespace`/`MaxCharactersInPart`/`ReadMiscellaneousNodes`） | 仅 `registry?` 一个字段 | **divergent**——选项面几乎全不对齐。 |

### OpenXmlPartWriter

| .NET 成员 | openxml-ts | 评定 |
|-----------|-----------|------|
| `WriteStartElement`/`WriteEndElement`/`WriteElement`/`WriteString`/`WriteStartDocument` | 同名（链式返回 `this`） | **present**（形状略变，链式是改进） |
| `Create(part)` / `Create(stream)` 静态工厂 | 无；openxml-ts 的 writer `close()` 返回 string | **divergent**——.NET writer 直接写进 part/stream，openxml-ts writer 是纯字符串构建器，不与 part 绑定。 |
| `WriteStartDocument(standalone)` / `WriteStartElement` 的 attributes/namespaceDeclarations 重载 | 部分（`StartElementDescriptor` 带 attributes，无 namespaceDeclarations） | **divergent** |
| async API（`WriteElementAsync` 等，net8.0） | 无 | **缺失** |
| `Close`/`Dispose` | `close()` 返回 string | **divergent** |

**评估**：流式核心读写循环对齐，对「逐节点扫描大文档」够用。但 reader 不能从 part/element 直接构造、writer 不能直接写 part，意味着流式 API 与封装层是脱节的——.NET 里 `OpenXmlReader.Create(part)` 是常见入口。属真实可用性缺口。

---

## 5. 校验 —— 中对齐（约 70%）

`src/validation/`：`OpenXmlValidator`、`ValidationError`、`ValidationErrorType`，加 schematron 子系统。从 sub-package entry（`openxml-ts/word` 等）导出。

| .NET 成员 | openxml-ts | 评定 |
|-----------|-----------|------|
| `OpenXmlValidator.Validate(OpenXmlElement)` | `validate(root, partUri?, rels?)` | **present**（签名变体：openxml-ts 多了 partUri/rels 参数，少了 element-only 纯净重载） |
| `OpenXmlValidator.Validate(OpenXmlPackage)` | `validatePackage(doc)`（接收 `WordprocessingDocumentLike`） | **divergent**——只支持 Word 形状的鸭子类型，不是统一的 package 重载。 |
| `OpenXmlValidator.Validate(OpenXmlPart)` | 无 | **缺失** |
| `OpenXmlValidator(FileFormatVersions fileFormat)` 构造 + `FileFormat` 属性 | 无——构造只接收 `{skipUnknown, includeSemantic}` | **缺失**——**版本定向校验完全没有**。.NET 可以「按 Office2016 规则校验」，openxml-ts 不能。这是一个真实且重要的缺口（见 #256 也只覆盖 schematron，不涉及版本定向）。 |
| `MaxNumberOfErrors` 属性 | 无 | **缺失** |
| `Validate(..., CancellationToken)`（net8.0） | 无 | **N/A**——TS 无 CancellationToken；可用 AbortSignal 但非必须。 |
| `ValidationErrorInfo.Id`/`Description`/`ErrorType`/`Node` | `ValidationError.id`/`description`/`errorType`/`node` | **present** |
| `ValidationErrorInfo.Part` | `ValidationError.partUri`（string 而非 part 对象） | **divergent** |
| `ValidationErrorInfo.Path`（`XmlPath` 对象，带 `XPath`/`Namespaces`/`PartUri`） | `ValidationError.path`（裸 string） | **divergent**——`XmlPath` 类未移植。 |
| `ValidationErrorInfo.RelatedNode`/`RelatedPart` | 无 | **缺失** |
| `ValidationErrorType`（Schema/Semantic/Package/MarkupCompatibility 4 值） | 同名 4 值 | **present** |
| `XmlPath` 类 | 无 | **缺失** |

**schematron**：源 948 条，覆盖 943 条，跳过 5 条（`SCHEMATRON_SKIPPED_COUNT = 5`，需完整 XPath 引擎或跨 Part 解析）。这 5 条残留由 issue **#256**（OPEN）跟踪，不重复立项。

**评估**：结构 + 属性 + 语义三段校验齐全且 943/948 schematron 覆盖很可观。但「版本定向校验」缺失是 1.0 级别的功能缺口——.NET 用户预期 `new OpenXmlValidator(FileFormatVersions.Office2019)`。

---

## 6. Markup Compatibility —— 中高对齐（约 80%）

`api/openxml-ts-markup-compat.api.md`：`FileFormatVersions`、`isNamespaceUnderstood`、`MarkupCompatibilityError`、`MarkupCompatibilityProcessSettings`、`McProcessMode`、`NAMESPACE_VERSION_MAP`、`processMarkupCompatibility`。

| .NET 成员 | openxml-ts | 评定 |
|-----------|-----------|------|
| `MarkupCompatibilityProcessMode`（NoProcess/ProcessLoadedPartsOnly/ProcessAllParts） | `McProcessMode` 同 3 值 | **present** |
| `MarkupCompatibilityProcessSettings`（ProcessMode + TargetFileFormatVersions） | 同名 interface | **present** |
| `FileFormatVersions` flags（含 Microsoft365） | `FileFormatVersions` const 对象 | **present**（值不同：.NET Microsoft365=1073741824，openxml-ts=64——内部表示差异，**N/A**） |
| MC 协商处理（`AlternateContent` 解析、`Ignorable`/`MustUnderstand`） | `processMarkupCompatibility(root, settings)` | **present**——已接入 openAsync（Epic-82）。 |
| `MarkupCompatibilityAttributes` 类（typed `Ignorable`/`MustUnderstand`/`PreserveAttributes`/`PreserveElements`/`ProcessContent`） | 无公开类 | **缺失**——MC 属性作为 typed 对象暴露的能力没有；协商在内部处理，但使用方无法逐属性读写。 |
| `InvalidMCContentException` / `NamespaceNotUnderstandException` | `MarkupCompatibilityError`（单一错误类） | **divergent**——合并成一个，语义略粗。 |
| `AlternateContent.AppendNewAlternateContentChoice/Fallback` 便捷方法 | 无 | **缺失（低优先级）** |

**评估**：MC 的「打开文档时自动协商」这条主路径完整，对绝大多数用户够用。缺的是把 MC 属性作为一等 typed 对象操作的能力。

---

## 7. 封装层 —— 架构性分叉（不可用百分比衡量）

这是 openxml-ts 与 .NET 差异最大的区域，且属**有意设计**，不是遗漏。

### 7.1 .NET 的体系

`OpenXmlPackage`（抽象）→ `WordprocessingDocument`/`SpreadsheetDocument`/`PresentationDocument`（具体，都 `: OpenXmlPackage`）。`OpenXmlPartContainer`（抽象）是 package 和 part 的共同基类，提供 `AddNewPart<T>`、`AddPart<T>`、`DeletePart`、`GetPartById`、`GetPartsOfType<T>`、`Parts`、`CreateRelationshipToPart`、`AddExternalRelationship`、`AddHyperlinkRelationship` 等约 40 个成员。`OpenXmlPart`（抽象）→ 数百个 typed Part 类（`MainDocumentPart` 等），每个带 `RootElement`、`ContentType`、`RelationshipType`、`GetStream`、`FeedData`。

### 7.2 openxml-ts 的体系

两层独立设计：

1. **低层**：`OpenXmlPackage`（抽象 `implements IPackage`）+ `IPackagePart` + `IRelationshipCollection` + `RelationshipCollection` + `ContentTypeManifest`。这是一个干净的、Web 风格的（`Uint8Array`、`ReadableStream`、`Promise`）OPC 容器抽象。具体实现：`MemoryOpenXmlPackage`、`ZipOpenXmlPackage`、`openAsync`/`openSync`/`createInMemory` 工厂。
2. **门面层**：`WordprocessingDocument`/`SpreadsheetDocument`/`PresentationDocument`（**普通类，不继承 `OpenXmlPackage`**，内部 `package: IPackage`）。提供 `mainDocumentPart`/`stylesPart`/... typed part getter、`addImagePart`、`addComment`、`getOrCreateStylesPart`、`saveAsync`/`openAsync`/`create` 等。
3. **Part 层**：`TypedXmlPart<T>`（抽象，懒加载 `root` + `flushAsync`）+ `BinaryPart`，以及 codegen 出来的 `MainDocumentPart extends TypedXmlPart<Document>` 等。

### 7.3 逐能力对照

| .NET 能力 | openxml-ts | 评定 |
|-----------|-----------|------|
| `WordprocessingDocument.Open`/`Create`（多重载：path/stream/package） | `openAsync(source)` / `create()` | **present**（语义对齐，全异步） |
| `MainDocumentPart` 等 typed part 访问器 | 同名 getter | **present** |
| `AddMainDocumentPart`/`AddStylesPart` 等 `AddXxxPart` | `getOrCreateStylesPart` 等（命名/语义略变） | **divergent**——openxml-ts 是 get-or-create 语义，.NET 是纯 add。 |
| `OpenXmlPartContainer.AddNewPart<T>` / `AddPart<T>` 泛型加件 | 无统一泛型 API | **divergent**——openxml-ts 靠门面上的具体方法 + 低层 `package.createPart(uri, contentType)`。 |
| `GetPartById`/`TryGetPartById`/`GetIdOfPart`/`ChangeIdOfPart` | 低层 `package.getPart(uri)` 按 URI，不按 rId | **divergent**——按 rId 查 part 的统一 API 没有（门面里有局部处理）。 |
| `GetPartsOfType<T>`/`DeletePartsRecursivelyOfType<T>` | 无 | **缺失** |
| `AddExternalRelationship`/`AddHyperlinkRelationship`/`DeleteExternalRelationship` | 门面有 `addHyperlinkRelationship`；外部关系 API 部分（`createHyperlinkInput`、`RelationshipCollection`） | **部分** |
| `GetParentParts`/`GetAllParts`（包内 part 遍历） | 低层 `package.parts()` | **present**（低层有，门面没暴露 typed 遍历） |
| `OpenSettings`（AutoSave/MaxCharactersInPart/MarkupCompatibilityProcessSettings/CompatibilityLevel） | `OpenAsyncOptions` + `mcSettings` 构造参数 | **部分**——MC 设置有；`AutoSave`/`MaxCharactersInPart`/`CompatibilityLevel` 无。 |
| `MediaDataPart`/`CreateMediaDataPart`（音视频媒体数据 part） | 无 | **缺失**——音视频媒体 part 整套没有。 |
| `DataPart`/`DataPartReferenceRelationship` | 无 | **缺失** |
| `ExtendedPart`（未知 content-type 的扩展 part）/`AddExtendedPart` | 无统一类（`BinaryPart` 部分覆盖二进制场景） | **部分** |
| `PackageProperties`/`IPackageProperties`（core 文档属性 DC 字段） | `IPackageProperties`（同名 interface，已移植 DC 字段） | **present** |
| `PartTypeInfo`/`IFixedContentTypePart`/`ISupportedRelationship` | 无 | **缺失（低优先级）** |
| `IdPartPair`（id↔part 配对） | 无 | **N/A**——openxml-ts 用 `parts()` + 关系集合替代。 |
| `OpenXmlPackage.Save`/`SaveAs`/`CanSave`/`AutoSave` | 门面 `saveAsync`/`saveAsAsync`/`saveAsBytesAsync` | **present**（异步化） |
| `CloneableExtensions.Clone`（包级深拷贝，8 个重载） | 无 | **缺失**——包级克隆没有。 |
| `IsEncryptedOfficeFile` 静态探测 | 无（错误码 `ENCRYPTED_PACKAGE_NOT_SUPPORTED` 暗示不支持加密） | **缺失（低优先级）** |
| `FlatOpcExtensions.ToFlatOpcString`/`ToFlatOpcDocument` + 从 FlatOPC 打开 | `packageToFlatOpc`/`parseFlatOpc`/`fromFlatOpcAsync` | **present** |
| `OpenXmlPackageException` | `OpenXmlPackageError`（带 `code` 枚举，更结构化） | **present**（改进） |

**评估**：低层 OPC 抽象干净且完整，门面覆盖了三大文档类型的常见操作。但相对 .NET 的 `OpenXmlPartContainer` 统一加件/查件 API，openxml-ts 缺一套**泛型化、跨 package/part 一致**的 part 管理 API；`MediaDataPart`/`DataPart`、包级克隆是确定缺失。这条分叉**本身合理**（Web 异步、tree-shaking 友好），但必须在 `api-stability.md` 里写明「封装层不承诺逐成员对齐 .NET」，否则使用方会按 .NET 心智模型踩空。

---

## 8. Features / 扩展性体系 —— 完全缺失（0%）

.NET SDK 有一整套 DI 风格的特性系统：`IFeatureCollection`、`FeatureCollection`、`OpenXmlElement.Features`/`OpenXmlPart.Features`/`OpenXmlPackage.Features`/`OpenXmlPartContainer.Features` 属性，加 `IDisposableFeature`、`IDocumentTypeFeature<T>`、`IPartExtensionFeature`、`IPackageEventsFeature`、`IPartEventsFeature`、`IPartRootEventsFeature`、`EventType`、`FeatureEventArgs<T>`，以及独立的 `DocumentFormat.OpenXml.Features` 包（`IParagraphIdGeneratorFeature`、`IRandomNumberGeneratorFeature`、`ISharedFeature<T>` 等）。

`grep` 全 `src/` 无任何 `IFeatureCollection` / `Features` 等价物。

**评定：缺失。** 这是一个完整子系统的缺口。但要诚实评估其重要性：Features 体系在 .NET 里主要是**框架内部的扩展点 + 少量高级用法**（自定义段落 ID 生成、文档类型切换、part 事件钩子）。绝大多数使用方从不直接碰它。所以：

- 它不是「日常 API」缺口，1.0 不强制要求。
- 但它是 .NET 公开面的一大块，`docs/sdk-parity-audit.md` / `api-stability.md` 必须**显式声明**「Features 体系不在移植范围」，否则「忠实移植」的说法站不住。
- `ChangeDocumentType`（.NET `WordprocessingDocument.ChangeDocumentType`，底层是 `IDocumentTypeFeature`）这个**具体**功能 openxml-ts 门面也没有——文档类型一旦创建不能改。属真实可见缺口。

---

## 9. 跨切面 —— 中高对齐

| 能力 | .NET | openxml-ts | 评定 |
|------|------|-----------|------|
| 元素深/浅克隆 | `CloneNode(deep)` / `Clone()` | `cloneNode(deep)` | **present** |
| `OuterXml` | `OuterXml` getter | `outerXml` getter | **present** |
| `InnerXml` | get + set（懒解析） | 无 | **缺失/N-A**——get 缺失（可用 `outerXml` 间接），set 是 .NET 特有懒解析，N/A。 |
| `InnerText` | `InnerText` getter | `innerText` getter | **present** |
| 命名空间处理 | `Prefix`/`NamespaceUri`/`XmlQualifiedName`/`XName` | `prefix`/`namespaceUri`/`qualifiedName` | **present**（`XName`/`XmlQualifiedName` 是 System.Xml 类型，N/A） |
| 包级克隆 | `CloneableExtensions.Clone` | 无 | **缺失** |
| 序列化/反序列化 | 隐式（part Save/load） | 显式 `serialize`/`deserialize` + `SerializeOptions`/`DeserializeOptions` | **present**（更显式，是改进） |

---

## 10. openxml-ts 有、.NET 无的公开 API（「越界」检查）

便捷扩展层（Epic-83 / #240）已知且有 banner 标注，不算越界。本审计额外扫描，确认以下 openxml-ts 独有 API 均属**合理的平台适配或便利层**，没有「冒充 SDK 语义」的越界：

- `openAsync`/`openSync`/`createInMemory`/`packageToZipBytes`/`packageToFlatOpc` —— Web 风格 IO 入口，平台适配，合理。
- `OpenXmlPackageError` + `OpenXmlPackageErrorCode` —— 结构化错误码，比 .NET 的字符串异常更好，合理。
- `ElementRegistry`/`elementRegistry`/`ChildMap`/`ElementFactory` —— codegen 反序列化基础设施，必要。
- `assertEnum`/`assertNumber`/`assertString`/`assertRequired`/`collectValidationIssues`/`ValidationIssue` —— codegen 属性校验运行时，必要。
- `PartUri`/`isPartUri`/`tryPartUri` —— branded type，类型安全，合理。
- `strictToTransitional`/`transitionalToStrict`/`isStrictUri`/`hasStrictOriginNamespace` —— Strict/Transitional 命名空间归一化（Epic-87/89），OOXML 兼容性必需。
- `parseUniversalMeasureToTwips`/`universal-measure` —— 度量单位解析，便利，合理。
- 三个文档门面上的 `addComment`/`addFooter`/`createDocumentTable` 等 —— 便捷扩展层，已标注。

**结论：没有发现越界。** openxml-ts 的独有 API 要么是平台适配（异步/Uint8Array），要么是 codegen 基础设施，要么是已标注的便捷层。

---

## 11. 1.0 就绪判定与优先级缺口清单

### 11.1 判定

**当前公开 API 面尚不建议直接锁 semver 1.0。** 理由不是「质量不够」——核心元素模型、流式、MC、校验都达到了可用且大体对齐的水平——而是**对齐叙事与实际不符的风险**：项目自我定位是「忠实移植 .NET SDK」，但封装层是架构分叉、Features 体系整体缺失、值类型子集化、校验无版本定向。1.0 是 API 承诺的起点，承诺前必须让「我们移植了什么、没移植什么」白纸黑字清楚，否则后续要么背锅（用户按 .NET 预期踩空），要么被迫做 breaking change 补齐。

**两条路径，二选一即可锁 1.0：**

- **路径 A（推荐，工作量小）**：不补功能，只补**文档承诺**。在 `docs/api-stability.md` 增加一节「与 .NET SDK 的对齐边界」，明确：(1) 封装层是有意分叉，不承诺逐成员对齐；(2) Features 体系不移植；(3) 值类型按 codegen 需求子集化；(4) 校验暂不支持版本定向。然后即可锁 1.0——承诺的是「openxml-ts 自己的公开面稳定」，不是「等于 .NET」。
- **路径 B（工作量大）**：把下面 P0/P1 缺口补齐，再锁 1.0，使「忠实移植」的说法在框架层也成立。

无论哪条路径，建议**先合入路径 A 的文档**（低成本、立刻消除最大风险），P0/P1 缺口作为 1.0.x / 1.1 增量补齐（它们多数是**新增 API**，不构成 breaking change）。

### 11.2 优先级缺口清单

| 优先级 | 缺口 | 区域 | 性质 |
|--------|------|------|------|
| **P0** | `api-stability.md` 缺「与 .NET 对齐边界」声明 | 文档 | 1.0 前必做（路径 A 核心） |
| **P0** | 校验无版本定向（`FileFormatVersions` targeting / `OpenXmlValidator(version)`） | 校验 | 真实功能缺口，.NET 用户高频预期 |
| **P1** | Features 体系整体缺失（`IFeatureCollection` 等） | 扩展性 | 子系统缺口；至少文档声明，理想是移植 |
| **P1** | `ChangeDocumentType`（文档类型创建后不可改） | 封装 | 具体可见功能缺失 |
| **P1** | 值类型只有 9/22（缺 `OnOffValue`/`TrueFalseValue`/`DoubleValue`/`Base64BinaryValue` 等） | 值类型 | 公开面不完整 |
| **P1** | 流式 reader/writer 不能与 part 直连（缺 `Create(part)`、`OpenXmlDomReader`） | 流式 | 可用性缺口 |
| **P2** | `OpenXmlValidator` 缺 part 重载、`ValidationErrorInfo` 缺 `RelatedNode`/`RelatedPart`/`XmlPath` | 校验 | 诊断信息精度 |
| **P2** | 元素 `annotations` 机制缺失 | 元素 | 低频高级用法 |
| **P2** | 包级克隆（`CloneableExtensions.Clone`）缺失 | 封装 | 便利能力 |
| **P2** | `MediaDataPart`/`DataPart` 音视频媒体 part 缺失 | 封装 | 特定场景 |
| **P3** | `MarkupCompatibilityAttributes` typed 类、`OpenXmlMiscNode`、`OpenXmlElementComparers` | 元素/MC | 低频 |
| 已跟踪 | schematron 残留 5 条 | 校验 | issue #256（不重复立项） |

---

## 12. 审计方法说明

- .NET 公开成员以 `PublicAPI.Shipped.txt`（Roslyn 公开 API 分析器维护的权威清单，1014 + 29 行）为准，而非靠 grep 源码——这是 .NET SDK 自己声明的「这就是公开 API」。
- openxml-ts 公开面以 `api/*.api.md`（api-extractor 生成）为准，与项目 `api-stability.md` 对「公开 API」的定义一致。
- 4400 个 codegen typed element 类未逐个复核——它们由 OOXML schema 机械生成，覆盖完整性属 Epic-76 已验证的 155 命名空间范畴，逐类审计无新增信息量。
- 「对齐百分比」是按区域内 .NET 公开成员被 present/divergent 覆盖的粗略比例估算，用于判断趋势，非精确指标。封装层因架构分叉，刻意不给百分比。
