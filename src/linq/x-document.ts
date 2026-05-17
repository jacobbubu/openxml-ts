/**
 * `XDocument` —— 对位 .NET `System.Xml.Linq.XDocument`。
 *
 * 表示一份完整 XML 文档（一个根 XElement）。\`Parse(xml)\` / \`Load(bytes)\` 工厂
 * 复用 openxml-ts 的 \`deserialize\` 管线（与 typed API 走同一条 XML 解析路径，
 * 后续 LINQ 树上的查询行为与 typed 树完全一致）。
 *
 * 本壳层不可变——返回 XDocument 后不能再换 root；mutator 设计留给后续 Story。
 */

import { deserialize, elementRegistry } from "../element/index.js";
import type { ElementRegistry } from "../element/index.js";
import { XElement } from "./x-element.js";
import { XName } from "./x-name.js";

export interface XDocumentOptions {
  /** 自定义 ElementRegistry——默认走全局 registry。 */
  readonly registry?: ElementRegistry;
}

export class XDocument {
  /** 文档根元素；输入空 XML 时 undefined（与 .NET 兼容）。 */
  readonly Root: XElement | undefined;

  private constructor(root: XElement | undefined) {
    this.Root = root;
  }

  /** 用 .NET 风格解析 XML 字符串。 */
  static Parse(xml: string, options: XDocumentOptions = {}): XDocument {
    const root = deserialize(xml, {
      registry: options.registry ?? elementRegistry,
    });
    return new XDocument(new XElement(root));
  }

  /** 从 UTF-8 字节流解析。 */
  static Load(bytes: Uint8Array, options: XDocumentOptions = {}): XDocument {
    const xml = new TextDecoder("utf-8").decode(bytes);
    return XDocument.Parse(xml, options);
  }

  /**
   * 等价 \`Root!.Elements(name?)\`——.NET 习惯写法 \`doc.Elements(W.p)\`
   * 直接从 XDocument 出发。Root undefined 时返空数组。
   */
  Elements(name?: XName | string): XElement[] {
    return this.Root === undefined ? [] : this.Root.Elements(name);
  }

  /** 等价 \`Root!.Descendants(name?)\`。 */
  Descendants(name?: XName | string): XElement[] {
    return this.Root === undefined ? [] : this.Root.Descendants(name);
  }
}
