/**
 * `openxml-ts/vml-word` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { TopBorder, LeftBorder } from "openxml-ts/vml-word";
 * import { registerVmlWordElements } from "openxml-ts/vml-word";
 * ```
 */

export * from "./generated/index.js";
export { registerVmlWordElements } from "./generated/_registry.js";
