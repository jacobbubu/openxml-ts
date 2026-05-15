/**
 * `openxml-ts` 的 element 子系统公共导出（Story-2.1）。
 *
 * 这一层在 v0.1.0 的 OPC 内核之上，提供 schema 类的统一基类与子元素树操作。
 * 上层 `openxml-ts/word`（Epic-2 后续 Story）会扩展这一层。
 */

export {
  type ElementCtor,
  OpenXmlCompositeElement,
  OpenXmlElement,
  OpenXmlLeafElement,
} from "./element.js";

export { OpenXmlElementList } from "./element-list.js";

export { OpenXmlUnknownElement } from "./unknown-element.js";
