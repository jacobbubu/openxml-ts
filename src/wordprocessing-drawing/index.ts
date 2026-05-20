/**
 * `openxml-ts/wordprocessing-drawing` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { Inline, Anchor, DrawingElement } from "openxml-ts/wordprocessing-drawing";
 * import { registerWordprocessingDrawingElements } from "openxml-ts/wordprocessing-drawing";
 * ```
 */

export * from "./generated/index.js";
export { registerWordprocessingDrawingElements } from "./generated/_registry.js";
