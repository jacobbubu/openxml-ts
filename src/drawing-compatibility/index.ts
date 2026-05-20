/**
 * `openxml-ts/drawing-compatibility` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { LegacyDrawing, registerDrawingCompatibilityElements } from "openxml-ts/drawing-compatibility";
 * ```
 */

export * from "./generated/index.js";
export { registerDrawingCompatibilityElements } from "./generated/_registry.js";
