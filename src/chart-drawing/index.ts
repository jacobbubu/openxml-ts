/**
 * `openxml-ts/chart-drawing` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { RelativeAnchor, AbsoluteAnchor } from "openxml-ts/chart-drawing";
 * import { registerChartDrawingElements } from "openxml-ts/chart-drawing";
 * ```
 */

export * from "./generated/index.js";
export { registerChartDrawingElements } from "./generated/_registry.js";
