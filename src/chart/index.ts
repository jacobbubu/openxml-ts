/**
 * `openxml-ts/chart` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { ChartSpace, Chart, BarChart, LineChart } from "openxml-ts/chart";
 * import { registerChartElements } from "openxml-ts/chart";
 * ```
 *
 * 命名冲突提示（ADR-026）：Chart 命名空间与其他子系统共享若干短名。
 * 同时 import 多个子系统时建议用 alias：
 *
 * ```ts
 * import { Title as ChartTitle } from "openxml-ts/chart";
 * import { Title as WordTitle } from "openxml-ts/word";
 * ```
 *
 * 或者只 import 子系统命名空间：`import * as chart from "openxml-ts/chart"`。
 */

export * from "./generated/index.js";
export { registerChartElements } from "./generated/_registry.js";
