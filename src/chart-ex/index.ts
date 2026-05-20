/**
 * `openxml-ts/chart-ex` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { ChartSpace, Formula, PlotArea } from "openxml-ts/chart-ex";
 * import { registerChartExElements } from "openxml-ts/chart-ex";
 * ```
 *
 * 或者只 import 子系统命名空间：`import * as chartEx from "openxml-ts/chart-ex"`。
 */

export * from "./generated/index.js";
export { registerChartExElements } from "./generated/_registry.js";
