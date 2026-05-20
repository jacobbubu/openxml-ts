/**
 * `openxml-ts/ppt-2010` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { NonVisualContentPartProperties, Media, SwitchTransition } from "openxml-ts/ppt-2010";
 * import { registerPpt2010Elements } from "openxml-ts/ppt-2010";
 * ```
 *
 * 或者只 import 子系统命名空间：`import * as ppt2010 from "openxml-ts/ppt-2010"`。
 */

export * from "./generated/index.js";
export { registerPpt2010Elements } from "./generated/_registry.js";
