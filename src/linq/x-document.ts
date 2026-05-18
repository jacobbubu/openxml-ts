/**
 * `XDocument` —— 对位 .NET `System.Xml.Linq.XDocument`。
 *
 * 表示一份完整 XML 文档（一个根 XElement）。\`Parse(xml)\` / \`Load(bytes)\` 工厂
 * 复用 openxml-ts 的 \`deserialize\` 管线（与 typed API 走同一条 XML 解析路径，
 * 后续 LINQ 树上的查询行为与 typed 树完全一致）。
 *
 * Mutator 走 Root.Add / SetAttributeValue 等；序列化回字符串/字节流走
 * \`ToString()\` / \`Save()\`，闭合「Parse → 改 → Save」流。
 */

import { deserialize, elementRegistry, serialize } from "../element/index.js";
import type { ElementRegistry } from "../element/index.js";
import { XElement } from "./x-element.js";
import type { XName } from "./x-name.js";

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

  /**
   * 序列化为 XML 字符串——对位 .NET \`XDocument.ToString()\`。
   * \`options.withDeclaration\` 默认 true（含 \`<?xml ... ?>\` 头）。
   */
  ToString(options: { withDeclaration?: boolean } = {}): string {
    if (this.Root === undefined) return "";
    return serialize(this.Root.inner, options);
  }

  /**
   * 序列化为 UTF-8 字节流——简化版 .NET \`XDocument.Save(stream)\`。
   * .NET 还有 \`Save(string path)\` / \`Save(TextWriter)\` 等重载；TS 端不绑定
   * 文件路径，统一返字节，调用方自行写 fs / Blob 下载等。
   */
  Save(): Uint8Array {
    return new TextEncoder().encode(this.ToString());
  }
}
