/**
 * `XElement` —— 对位 .NET `System.Xml.Linq.XElement`。
 *
 * 包装现有 `OpenXmlElement`，以 .NET 命名暴露：`Name` / `Value` / `Attribute()` /
 * `Attributes()` / `Element(name?)` / `Elements(name?)` / `Descendants(name?)` /
 * `Parent`。
 *
 * **不复制 element 树**——XElement 持有 backing `OpenXmlElement` 的引用，
 * 改 element 字段会被 XElement 看到，反之亦然。但本壳层不暴露 mutator
 * （Add / SetAttribute 等留给后续 Story）。
 */

import {
  OpenXmlCompositeElement,
  type OpenXmlElement,
  OpenXmlLeafElement,
} from "../element/index.js";
import { OpenXmlUnknownElement } from "../element/unknown-element.js";
import { XAttribute } from "./x-attribute.js";
import { XName } from "./x-name.js";

function asXName(name: XName | string): XName {
  return typeof name === "string" ? XName.Get(name) : name;
}

function matches(el: OpenXmlElement, target: XName): boolean {
  return el.namespaceUri === target.NamespaceName && el.localName === target.LocalName;
}

export class XElement {
  constructor(public readonly inner: OpenXmlElement) {}

  /** 元素限定名（含命名空间）。 */
  get Name(): XName {
    return XName.Get(this.inner.namespaceUri, this.inner.localName);
  }

  /**
   * 文本内容——本节点 + 所有 leaf / unknown 后代的 text 顺序拼接
   * （与 .NET XElement.Value 一致）。
   *
   * 注：OpenXmlUnknownElement extends OpenXmlCompositeElement，可以既挂 text
   * 又有 children，所以「self text」与「descendant text」两段都要计。
   */
  get Value(): string {
    const inner = this.inner;
    let s = "";
    if (inner instanceof OpenXmlLeafElement || inner instanceof OpenXmlUnknownElement) {
      s += inner.text ?? "";
    }
    if (inner instanceof OpenXmlCompositeElement) {
      for (const desc of inner.descendants()) {
        if (desc instanceof OpenXmlLeafElement || desc instanceof OpenXmlUnknownElement) {
          s += desc.text ?? "";
        }
      }
    }
    return s;
  }

  /** 上溯父 XElement；root 返 undefined。 */
  get Parent(): XElement | undefined {
    return this.inner.parent === undefined ? undefined : new XElement(this.inner.parent);
  }

  /** 取单个 attribute；无返 undefined。`name` 可传 XName 或 expanded name 字符串。 */
  Attribute(name: XName | string): XAttribute | undefined {
    const xname = asXName(name);
    for (const [k, v] of this.inner.extendedAttributes) {
      if (xnameMatchesAttrKey(xname, k, this.inner)) return new XAttribute(xname, v);
    }
    return undefined;
  }

  /** 所有 attribute；不含 xmlns 声明（与 .NET XAttribute 集合一致）。 */
  Attributes(): XAttribute[] {
    const out: XAttribute[] = [];
    for (const [k, v] of this.inner.extendedAttributes) {
      if (k === "xmlns" || k.startsWith("xmlns:")) continue;
      out.push(new XAttribute(xnameFromAttrKey(k, this.inner), v));
    }
    return out;
  }

  /** 首个直接子 element；无 name 取第一个；指定 name 按 XName 匹配。 */
  Element(name?: XName | string): XElement | undefined {
    if (!(this.inner instanceof OpenXmlCompositeElement)) return undefined;
    const target = name === undefined ? undefined : asXName(name);
    for (const c of this.inner.children) {
      if (target === undefined || matches(c, target)) return new XElement(c);
    }
    return undefined;
  }

  /** 所有直接子 element（可按 name 过滤）。 */
  Elements(name?: XName | string): XElement[] {
    if (!(this.inner instanceof OpenXmlCompositeElement)) return [];
    const target = name === undefined ? undefined : asXName(name);
    const out: XElement[] = [];
    for (const c of this.inner.children) {
      if (target === undefined || matches(c, target)) out.push(new XElement(c));
    }
    return out;
  }

  /** 所有后代 element（深度优先，不含 self；可按 name 过滤）。 */
  Descendants(name?: XName | string): XElement[] {
    if (!(this.inner instanceof OpenXmlCompositeElement)) return [];
    const target = name === undefined ? undefined : asXName(name);
    const out: XElement[] = [];
    for (const desc of this.inner.descendants()) {
      if (target === undefined || matches(desc, target)) out.push(new XElement(desc));
    }
    return out;
  }

  /** 上溯 XElement 链（不含 self，root 在最后）；可按 name 过滤。 */
  Ancestors(name?: XName | string): XElement[] {
    const target = name === undefined ? undefined : asXName(name);
    const out: XElement[] = [];
    let cur: OpenXmlElement | undefined = this.inner.parent;
    while (cur !== undefined) {
      if (target === undefined || matches(cur, target)) out.push(new XElement(cur));
      cur = cur.parent;
    }
    return out;
  }

  // ─── Mutator API（Story-7） ────────────────────────────────────────────────

  /**
   * 加内容到本节点末尾——对位 .NET \`XElement.Add(content)\`。
   *
   * 支持三种 content：
   * - \`XElement\`：作为子节点 appendChild；只在 composite element 上有效；
   * - \`XAttribute\`：等价 \`SetAttributeValue(attr.Name, attr.Value)\`；
   * - \`string\`：拼到 leaf element 的 text；composite 不接受字符串（无通用 text-node 模型）。
   */
  Add(content: XElement | XAttribute | string): void {
    if (content instanceof XAttribute) {
      this.SetAttributeValue(content.Name, content.Value);
      return;
    }
    if (content instanceof XElement) {
      if (!(this.inner instanceof OpenXmlCompositeElement)) {
        throw new Error(
          `XElement.Add: cannot add child to non-composite <${this.inner.localName}>`,
        );
      }
      this.inner.appendChild(content.inner);
      return;
    }
    // string —— 只对 leaf / unknown 有效
    if (this.inner instanceof OpenXmlLeafElement || this.inner instanceof OpenXmlUnknownElement) {
      this.inner.text = (this.inner.text ?? "") + content;
      return;
    }
    throw new Error(
      `XElement.Add(string): composite <${this.inner.localName}> 缺通用 text-node 支持；用 leaf 子元素承载文本`,
    );
  }

  /**
   * 设/改/删属性——对位 .NET \`XElement.SetAttributeValue(name, value)\`。
   * \`value === undefined\` 等价删属性（与 .NET 同款；TS 不支持 null 参数）。
   */
  SetAttributeValue(name: XName | string, value: string | undefined): void {
    const xname = asXName(name);
    if (value === undefined) {
      this.RemoveAttribute(xname);
      return;
    }
    const key = xnameToAttrKey(xname, this.inner);
    this.inner.extendedAttributes.set(key, value);
  }

  /** 从父亲 children 集合里移除 self。root 抛错。 */
  Remove(): void {
    const parent = this.inner.parent;
    if (parent === undefined) {
      throw new Error("XElement.Remove: root has no parent");
    }
    parent.remove(this.inner);
  }

  /** 删一个属性；不存在静默忽略。 */
  RemoveAttribute(name: XName | string): void {
    const xname = asXName(name);
    for (const k of [...this.inner.extendedAttributes.keys()]) {
      if (xnameMatchesAttrKey(xname, k)) this.inner.extendedAttributes.delete(k);
    }
  }

  /** 删全部属性（保留 xmlns 声明）。 */
  RemoveAttributes(): void {
    for (const k of [...this.inner.extendedAttributes.keys()]) {
      if (k === "xmlns" || k.startsWith("xmlns:")) continue;
      this.inner.extendedAttributes.delete(k);
    }
  }

  /** 用一组新属性覆盖：先 RemoveAttributes，再依次 Add。 */
  ReplaceAttributes(...attrs: XAttribute[]): void {
    this.RemoveAttributes();
    for (const a of attrs) this.SetAttributeValue(a.Name, a.Value);
  }
}

/**
 * 把 extendedAttributes 的 key（如 `"r:id"` / `":pane"` / `"pane"`）映射成 XName。
 *
 * 规则：
 * - `prefix:local` —— 沿 owner 链找 `xmlns:prefix` 声明把 prefix 翻成 URI；
 *   找不到时退化用 prefix 字符串当 ns（与旧版兼容，Equals(XName.Get(prefix,..))
 *   仍能命中）；
 * - `":local"` —— schema 标准属性，XML 视角 unprefixed = no-namespace，
 *   我们 LINQ 视图保持 ns="" 与 .NET 一致；
 * - `"local"` —— 无命名空间。
 */
function xnameFromAttrKey(key: string, owner?: OpenXmlElement): XName {
  if (key.startsWith(":")) return XName.Get(key.slice(1));
  const colon = key.indexOf(":");
  if (colon === -1) return XName.Get(key);
  const prefix = key.slice(0, colon);
  const local = key.slice(colon + 1);
  if (owner !== undefined) {
    const uri = resolvePrefixToUri(owner, prefix);
    if (uri !== undefined) return XName.Get(uri, local);
  }
  return XName.Get(prefix, local);
}

/** XName 是否匹配 extendedAttributes 的某 key。 */
function xnameMatchesAttrKey(xname: XName, key: string, owner?: OpenXmlElement): boolean {
  const named = xnameFromAttrKey(key, owner);
  if (xname.LocalName !== named.LocalName) return false;
  if (xname.NamespaceName === named.NamespaceName) return true;
  // 兜底：用户用 XName(prefix, local) 的简化写法时也命中（如 W_NS 未在树上声明）
  return xname.NamespaceName.length === 0 && named.NamespaceName.length === 0;
}

/** 沿 ancestor 链找 `xmlns:prefix` 声明，返其 URI；找不到 undefined。 */
function resolvePrefixToUri(owner: OpenXmlElement, prefix: string): string | undefined {
  const decl = `xmlns:${prefix}`;
  let cur: OpenXmlElement | undefined = owner;
  while (cur !== undefined) {
    const uri = cur.extendedAttributes.get(decl);
    if (uri !== undefined) return uri;
    cur = cur.parent;
  }
  return undefined;
}

/**
 * 把 XName 翻成 extendedAttributes 的 key（mutator 写入侧）。
 *
 * 规则：
 * - 空 ns → 直接 localName（XML 里这就是 no-namespace attribute）；
 * - 有 ns —— 一定要带 prefix：
 *   1. 沿 ancestor 链查 xmlns:prefix 声明（含默认 `xmlns`）匹配 URI → 用该 prefix；
 *   2. 都没找到 → 兜底用 ns URI 末段当 prefix。
 *
 * 注意 XML 语义：**unprefixed attribute 永远在 no-namespace**，不像 element 那样
 * 继承默认 namespace。因此即便 XName.NamespaceName === element.namespaceUri 也
 * 必须找一个真前缀，否则 serialize 出去的 `foo="bar"` 解回来不再是 (W, foo) 而是
 * (空, foo)。
 *
 * SetAttributeValue 写入后 serializer 按 key 字面输出；若链上无 xmlns 声明会用
 * URI 末段当 prefix——下次 reload 时 deserializer 把同名 prefix 字符串保留进
 * extendedAttributes，Attribute(ns) 仍能找到该属性（按 xnameMatchesAttrKey 的
 * 「ns 字符串 == prefix」分支命中）。
 */
function xnameToAttrKey(xname: XName, owner: OpenXmlElement): string {
  if (xname.NamespaceName.length === 0) return xname.LocalName;
  // 沿 ancestor 链找 xmlns 声明
  let cur: OpenXmlElement | undefined = owner;
  while (cur !== undefined) {
    for (const [k, v] of cur.extendedAttributes) {
      if (v !== xname.NamespaceName) continue;
      if (k === "xmlns") continue; // 默认 ns 不带 prefix——attribute 不能复用默认 ns
      if (!k.startsWith("xmlns:")) continue;
      return `${k.slice(6)}:${xname.LocalName}`;
    }
    cur = cur.parent;
  }
  // 兜底：URI 最后一段当 prefix
  const tail = xname.NamespaceName.replace(/\/$/, "").split("/").pop() ?? "x";
  return `${tail}:${xname.LocalName}`;
}
