/**
 * `OpenXmlUnknownElement`（Story-2.1）。
 *
 * 用于反序列化时遇到注册表里没有的元素——按 PRD §FR-5.3 / Architecture §6.1，
 * 此时不抛错，而是把节点收纳成 unknown，保留 namespace / 本地名 / 属性 / 子节点，
 * 写回时原样输出。`mc:AlternateContent` 等 markup-compatibility 场景依赖这个。
 *
 * 当前 Story 仅给出形态；XML 序列化（writeTo）由 Story-2.3 升级 xml 模块后注入。
 */

import { OpenXmlElementList } from "./element-list.js";
import { OpenXmlCompositeElement } from "./element.js";

export class OpenXmlUnknownElement extends OpenXmlCompositeElement {
  override readonly localName: string;
  override readonly prefix: string;
  override readonly namespaceUri: string;
  override readonly children: OpenXmlElementList;

  /**
   * @param prefix XML namespace prefix（空字符串表示 default namespace）
   * @param localName 本地名
   * @param namespaceUri Namespace URI
   */
  constructor(prefix: string, localName: string, namespaceUri: string) {
    super();
    this.prefix = prefix;
    this.localName = localName;
    this.namespaceUri = namespaceUri;
    this.children = new OpenXmlElementList(this);
  }

  /** 限定名（含 prefix），便于诊断输出。 */
  get qualifiedName(): string {
    return this.prefix.length === 0 ? this.localName : `${this.prefix}:${this.localName}`;
  }
}
