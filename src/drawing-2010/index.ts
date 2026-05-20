/**
 * `openxml-ts/drawing-2010` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { CameraTool, CompatExtension, GvmlContentPart } from "openxml-ts/drawing-2010";
 * import { registerDrawing2010Elements } from "openxml-ts/drawing-2010";
 * ```
 *
 * 或者只 import 子系统命名空间：`import * as drawing2010 from "openxml-ts/drawing-2010"`。
 */

export * from "./generated/index.js";
export { registerDrawing2010Elements } from "./generated/_registry.js";
