/**
 * `openxml-ts` 的 element 子系统公共导出。
 *
 * 这一层在 v0.1.0 的 OPC 内核之上，提供 schema 类的统一基类、子元素树操作、
 * 强类型属性值、XML ↔ Element 树双向序列化与注册表。
 *
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

export {
  type ChildMap,
  type ElementFactory,
  ElementRegistry,
  elementRegistry,
} from "./registry.js";

export { type DeserializeOptions, deserialize } from "./xml-deserialize.js";
export { type SerializeOptions, serialize } from "./xml-serialize.js";

export * from "./values/index.js";

export {
  assertEnum,
  assertNumber,
  assertRequired,
  assertString,
  type NumberValidatorOptions,
  type StringValidatorOptions,
  type ValidationContext,
} from "./validators/index.js";

export {
  hasStrictOriginNamespace,
  isStrictUri,
  strictToTransitional,
  transitionalToStrict,
} from "./strict-namespace-map.js";

export {
  type ValidationIssue,
  collectValidationIssues,
} from "./validate.js";
