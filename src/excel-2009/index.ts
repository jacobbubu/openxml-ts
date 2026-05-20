/**
 * `openxml-ts/excel-2009` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { ConditionalFormattings, SparklineGroups, SlicerList } from "openxml-ts/excel-2009";
 * import { registerExcel2009Elements } from "openxml-ts/excel-2009";
 * ```
 *
 * 或者只 import 子系统命名空间：`import * as excel2009 from "openxml-ts/excel-2009"`。
 */

export * from "./generated/index.js";
export { registerExcel2009Elements } from "./generated/_registry.js";
