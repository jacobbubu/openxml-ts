/**
 * `openxml-ts/vml-office` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { ShapeDefaults, ShapeLayout } from "openxml-ts/vml-office";
 * import { registerVmlOfficeElements } from "openxml-ts/vml-office";
 * ```
 */

export * from "./generated/index.js";
export { registerVmlOfficeElements } from "./generated/_registry.js";
