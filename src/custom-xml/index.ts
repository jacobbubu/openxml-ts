/**
 * `openxml-ts/custom-xml` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { DatastoreItem, registerCustomXmlElements } from "openxml-ts/custom-xml";
 * ```
 */

export * from "./generated/index.js";
export { registerCustomXmlElements } from "./generated/_registry.js";
