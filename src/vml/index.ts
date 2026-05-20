/**
 * `openxml-ts/vml` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { Path, Fill, Stroke, Shape } from "openxml-ts/vml";
 * import { registerVmlElements } from "openxml-ts/vml";
 * ```
 */

export * from "./generated/index.js";
export { registerVmlElements } from "./generated/_registry.js";
