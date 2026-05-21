# OpenXmlElement API 对照表（Epic-88）

对照 .NET SDK `DocumentFormat.OpenXml.OpenXmlElement`（含 `OpenXmlCompositeElement` /
`OpenXmlLeafElement`）的公开成员，记录 openxml-ts 的实现状态。

> 源文件：`src/element/element.ts`、`src/element/unknown-element.ts`
>
> 审计日期：2026-05-21（Epic-88）

---

## 说明

| 状态标记 | 含义 |
|----------|------|
| ✅ 已有 | Epic-88 前已存在 |
| ➕ 本次新增 | Epic-88 实现 |
| N/A | 有意不实现，附理由 |

---

## OpenXmlElement（基类）

### 属性 / Properties

| .NET 成员 | TS 名称 | 状态 | 备注 |
|-----------|---------|------|------|
| `Parent` | `parent` | ✅ 已有 | 可读写 |
| `FirstChild` | `firstChildElement` | ➕ 本次新增 | getter；叶子返回 `undefined` |
| `LastChild` | `lastChildElement` | ➕ 本次新增 | getter；叶子返回 `undefined` |
| `HasChildren` | `hasChildren` | ➕ 本次新增 | getter |
| `ChildElements` | `children`（Composite）| ✅ 已有 | 仅在 Composite 暴露，类型为 `OpenXmlElementList` |
| `LocalName` | `localName` | ✅ 已有 | abstract readonly |
| `Prefix` | `prefix` | ✅ 已有 | abstract readonly |
| `NamespaceUri` | `namespaceUri` | ✅ 已有 | abstract readonly |
| `XmlQualifiedName` / `XName` | `qualifiedName` | ✅ 已有 | getter，返回 `"prefix:localName"` |
| `InnerText` | `innerText` | ➕ 本次新增 | getter；Leaf 返回 `text ?? ""`；Composite 拼接子节点 |
| `InnerXml` | N/A | N/A | .NET 特有：设置 InnerXml 会触发 XML 解析；TS 端无懒解析设计，不实现 |
| `OuterXml` | `outerXml` | ➕ 本次新增 | getter；用 `XmlWriter` 序列化 |
| `HasAttributes` | N/A | N/A | TS 端无 schema 属性 vs 扩展属性区分，可用 `extendedAttributes.size` 代替 |
| `ExtendedAttributes` | `extendedAttributes` | ✅ 已有 | `Map<string,string>` |
| `NamespaceDeclarations` | N/A | N/A | TS 不维护 xmlns 声明列表（序列化由 `XmlWriter` 处理） |
| `OpenXmlElementContext` | N/A | N/A | .NET 专有上下文，TS 无等价设计 |
| `Features` | N/A | N/A | .NET DI 特性集合，TS 无等价设计 |

### 方法 / Methods

| .NET 成员 | TS 名称 | 状态 | 备注 |
|-----------|---------|------|------|
| `NextSibling()` | `nextSibling()` | ➕ 本次新增 | |
| `NextSibling<T>()` | `nextSiblingOfType(ctor)` | ➕ 本次新增 | .NET 泛型 → TS `ctor` 参数 |
| `PreviousSibling()` | `previousSibling()` | ➕ 本次新增 | |
| `PreviousSibling<T>()` | `previousSiblingOfType(ctor)` | ➕ 本次新增 | |
| `Ancestors()` | `ancestors()` | ➕ 本次新增 | 生成器，由近到远 |
| `Ancestors<T>()` | `ancestorsOfType(ctor)` | ➕ 本次新增 | |
| `Elements()` | `elements()` | ✅ 已有（Composite）| |
| `Elements<T>()` | `elements(ctor)` | ✅ 已有（Composite）| |
| `Descendants()` | `descendants()` | ✅ 已有（Composite）| |
| `Descendants<T>()` | `descendants(ctor)` | ✅ 已有（Composite）| |
| `ElementsBefore()` | `elementsBefore()` | ➕ 本次新增 | |
| `ElementsAfter()` | `elementsAfter()` | ➕ 本次新增 | |
| `GetFirstChild<T>()` | `getFirstChild(ctor)` | ➕ 本次新增 | 原有 `firstChild(ctor)` 保留作 deprecated 别名 |
| `IsBefore(element)` | `isBefore(other)` | ➕ 本次新增 | |
| `IsAfter(element)` | `isAfter(other)` | ➕ 本次新增 | |
| `Append(IEnumerable)` / `Append(params)` | `append(...children)` | ➕ 本次新增 | rest 参数 |
| `AppendChild<T>(child)` | `appendChild(child)` | ✅ 已有（Composite）| |
| `PrependChild<T>(child)` | `prependChild(child)` | ➕ 本次新增 | |
| `InsertBefore<T>(child, ref)` | `insertBefore(child, sibling)` | ✅ 已有（Composite）| |
| `InsertAfter<T>(child, ref)` | `insertAfter(child, sibling)` | ➕ 本次新增 | |
| `InsertAt<T>(child, index)` | `insertAt(child, index)` | ➕ 本次新增 | |
| `InsertAfterSelf<T>(element)` | `insertAfterSelf(element)` | ➕ 本次新增 | 在基类 `OpenXmlElement` |
| `InsertBeforeSelf<T>(element)` | `insertBeforeSelf(element)` | ➕ 本次新增 | 在基类 `OpenXmlElement` |
| `RemoveChild<T>(child)` | `removeChild(child)` | ➕ 本次新增 | 原有 `remove(child)→bool` 保留作 deprecated 别名 |
| `RemoveAllChildren()` | `removeAllChildren()` | ➕ 本次新增 | |
| `RemoveAllChildren<T>()` | `removeAllChildrenOfType(ctor)` | ➕ 本次新增 | |
| `Remove()` | `removeSelf()` | ➕ 本次新增 | 命名改为 `removeSelf` 避免与 `remove(child)` 歧义 |
| `ReplaceChild<T>(newChild, oldChild)` | `replaceChild(newChild, oldChild)` | ➕ 本次新增 | |
| `CloneNode(bool deep)` | `cloneNode(deep)` | ➕ 本次新增 | abstract；Leaf/Composite/Unknown 各自实现 |
| `Clone()` | N/A | N/A | .NET `ICloneable.Clone()` = `CloneNode(true)`，TS 仅暴露 `cloneNode(true)` |
| `GetAttribute(localName, ns)` | N/A | N/A | TS 用 `extendedAttributes.get(qname)` 代替；typed 属性由 codegen 生成 |
| `SetAttribute(attr)` | N/A | N/A | 同上；typed 属性 setter 由 codegen 生成 |
| `RemoveAttribute(localName, ns)` | N/A | N/A | 同上 |
| `ClearAllAttributes()` | N/A | N/A | 可用 `extendedAttributes.clear()` |
| `GetAttributes()` | N/A | N/A | 可用 `[...extendedAttributes.entries()]` |
| `SetAttributes(attrs)` | N/A | N/A | 同上 |
| `AddNamespaceDeclaration(prefix, uri)` | N/A | N/A | TS 不维护 xmlns 声明列表 |
| `RemoveNamespaceDeclaration(prefix)` | N/A | N/A | 同上 |
| `WriteTo(xmlWriter)` | `writeTo(writer)` | ✅ 已有 | |
| `AddChild(newChild, throwOnError)` | N/A | N/A | .NET 专有：schema 感知的自动定位插入；TS codegen 层不使用此模式 |
| `GetOrAddFirstChild<T>()` | N/A | N/A | .NET 便捷方法；超出 SDK 最小化范围 |
| `IsValidChild(element)` | N/A | N/A | TS 用 codegen schema 校验替代 |

---

## 命名差异说明

由于 .NET 使用 PascalCase 而 TS 使用 camelCase，所有成员名都做了大小写转换（如 `NextSibling` → `nextSibling`）。此外：

- `Remove()` → `removeSelf()`：避免与现有 `remove(child)` 命名冲突
- `NextSibling<T>()` → `nextSiblingOfType(ctor)`：TypeScript 不支持方法重载泛型参数决定行为
- `PreviousSibling<T>()` → `previousSiblingOfType(ctor)`：同上
- `Ancestors<T>()` → `ancestorsOfType(ctor)`：同上
- `RemoveAllChildren<T>()` → `removeAllChildrenOfType(ctor)`：同上
- `FirstChild`（.NET 属性）→ `firstChildElement`（TS getter）：与原有 `firstChild(ctor?)` 方法区分

---

## 统计

- .NET 公开成员总数：47
- openxml-ts 已实现：30
- 本次新增：22
- 有意 N/A：17（均有理由记录）
