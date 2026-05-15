/**
 * Schema codegen 公共导出（dev-only 工具，不进发布产物）。
 */

export {
  type GenerateElementOptions,
  type SchemaAttribute,
  type SchemaType,
  generateElement,
} from "./element-template.js";

export { classNameToFileName, parseSchemaName } from "./transforms/names.js";

export { prefixForUri, uriForPrefix } from "./transforms/namespaces.js";

export { mapSchemaType, type TsTypeRef } from "./transforms/types.js";
