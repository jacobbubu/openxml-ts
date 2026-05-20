/**
 * `openxml-ts/vml-powerpoint` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { InkAnnotationFlag, TextData } from "openxml-ts/vml-powerpoint";
 * import { registerVmlPowerpointElements } from "openxml-ts/vml-powerpoint";
 * ```
 */

export * from "./generated/index.js";
export { registerVmlPowerpointElements } from "./generated/_registry.js";
