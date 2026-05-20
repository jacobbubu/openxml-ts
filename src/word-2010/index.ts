/**
 * `openxml-ts/word-2010` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { Tint, Shade, GlowTextEffect } from "openxml-ts/word-2010";
 * import { registerWord2010Elements } from "openxml-ts/word-2010";
 * ```
 *
 * 或者只 import 子系统命名空间：`import * as word2010 from "openxml-ts/word-2010"`。
 */

export * from "./generated/index.js";
export { registerWord2010Elements } from "./generated/_registry.js";
