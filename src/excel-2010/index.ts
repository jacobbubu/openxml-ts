/**
 * `openxml-ts/excel-2010` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { PivotTableReferences, TimelineCacheReferences, TimelineReferences } from "openxml-ts/excel-2010";
 * import { registerExcel2010Elements } from "openxml-ts/excel-2010";
 * ```
 *
 * 或者只 import 子系统命名空间：`import * as excel2010 from "openxml-ts/excel-2010"`。
 */

export * from "./generated/index.js";
export { registerExcel2010Elements } from "./generated/_registry.js";
