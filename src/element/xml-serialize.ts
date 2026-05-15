/**
 * OpenXmlElement 树 → XML 字符串。
 *
 * 调用 {@link OpenXmlElement.writeTo}（各子类负责自身序列化逻辑）。本模块是 thin
 * 包装层——拼装 XML 声明 + 元素树字节流。
 */

import { XmlWriter } from "../packaging/xml/index.js";
import type { OpenXmlElement } from "./element.js";

export interface SerializeOptions {
  /** 是否输出 `<?xml ... ?>` 声明。默认 `true`。 */
  readonly withDeclaration?: boolean;
}

export function serialize(element: OpenXmlElement, options: SerializeOptions = {}): string {
  const writer = new XmlWriter();
  if (options.withDeclaration !== false) writer.declaration();
  element.writeTo(writer);
  return writer.toString();
}
