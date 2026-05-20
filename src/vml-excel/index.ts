/**
 * `openxml-ts/vml-excel` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { ClientData } from "openxml-ts/vml-excel";
 * import { registerVmlExcelElements } from "openxml-ts/vml-excel";
 * ```
 */

export * from "./generated/index.js";
export { registerVmlExcelElements } from "./generated/_registry.js";
