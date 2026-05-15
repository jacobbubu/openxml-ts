/**
 * `OpenXmlUnknownElement`。
 *
 * 用于反序列化时遇到注册表里没有的元素——按 PRD §FR-5.3 / Architecture §6.1，
 * 此时不抛错，而是把节点收纳成 unknown，保留 namespace / 本地名 / 属性 / 子节点 /
 * 文本，写回时原样输出。`mc:AlternateContent` 等 markup-compatibility 场景依赖这个。
 */

import type { XmlWriter } from "../packaging/xml/index.js";
import { OpenXmlElementList } from "./element-list.js";
import { OpenXmlCompositeElement } from "./element.js";

export class OpenXmlUnknownElement extends OpenXmlCompositeElement {
  override readonly localName: string;
  override readonly prefix: string;
  override readonly namespaceUri: string;
  override readonly children: OpenXmlElementList;

  /**
   * 混合内容文本——unknown 既可能是 leaf-with-text（`<w:t>foo</w:t>`），也可能是
   * 复合元素，本字段在前者场景被设置。
   */
  text: string | undefined;

  constructor(prefix: string, localName: string, namespaceUri: string) {
    super();
    this.prefix = prefix;
    this.localName = localName;
    this.namespaceUri = namespaceUri;
    this.children = new OpenXmlElementList(this);
  }

  override writeTo(writer: XmlWriter): void {
    const qname = this.qualifiedName;
    const attrs = [...this.extendedAttributes.entries()];
    const hasText = this.text !== undefined && this.text.length > 0;
    if (this.children.count === 0 && !hasText) {
      writer.empty(qname, attrs);
      return;
    }
    writer.open(qname, attrs);
    if (hasText) writer.text(this.text as string);
    for (const c of this.children) c.writeTo(writer);
    writer.close(qname);
  }
}
