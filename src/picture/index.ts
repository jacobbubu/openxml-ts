/**
 * `openxml-ts/picture` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { Picture, NonVisualPictureProperties } from "openxml-ts/picture";
 * import { registerPictureElements } from "openxml-ts/picture";
 * ```
 */

export * from "./generated/index.js";
export { registerPictureElements } from "./generated/_registry.js";
