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
  type OpenXmlElement,
  OpenXmlCompositeElement,
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
      if (xnameMatchesAttrKey(xname, k)) return new XAttribute(xname, v);
    }
    return undefined;
  }

  /** 所有 attribute；不含 xmlns 声明（与 .NET XAttribute 集合一致）。 */
  Attributes(): XAttribute[] {
    const out: XAttribute[] = [];
    for (const [k, v] of this.inner.extendedAttributes) {
      if (k === "xmlns" || k.startsWith("xmlns:")) continue;
      out.push(new XAttribute(xnameFromAttrKey(k), v));
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
}

/**
 * 把 extendedAttributes 的 key（如 `"r:id"` / `":pane"` / `"pane"`）映射成 XName。
 * 规则：
 * - `prefix:local` 形如 `"r:id"` —— 我们当 ns 取 prefix（无完整 URI 反查表，先用 prefix 代）；
 * - `":local"` —— schema 上无 prefix，等价于 localName 在 element 的命名空间；
 * - `"local"` —— 无命名空间。
 *
 * 这是壳层近似——.NET 那边 XAttribute 总有完整 URI，本实现取近似 prefix 作 ns，
 * Story-5.3 接入 XDocument.Parse 时再补 full URI 表。
 */
function xnameFromAttrKey(key: string): XName {
  if (key.startsWith(":")) return XName.Get(key.slice(1));
  const colon = key.indexOf(":");
  if (colon === -1) return XName.Get(key);
  return XName.Get(key.slice(0, colon), key.slice(colon + 1));
}

/** XName 是否匹配 extendedAttributes 的某 key。允许 ns 写 prefix。 */
function xnameMatchesAttrKey(xname: XName, key: string): boolean {
  const named = xnameFromAttrKey(key);
  if (xname.LocalName !== named.LocalName) return false;
  // ns 严格相等；或两侧都空（schema 同 element ns，无前缀情况）；或 prefix 字符串相等
  return xname.NamespaceName === named.NamespaceName || xname.NamespaceName.length === 0;
}
