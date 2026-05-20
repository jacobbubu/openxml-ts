/**
 * `openxml-ts/diagram` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { DataModelRoot, ColorsDefinition, LayoutDefinition, StyleDefinition } from "openxml-ts/diagram";
 * import { registerDiagramElements } from "openxml-ts/diagram";
 * ```
 *
 * 命名冲突提示（ADR-026）：Diagram 命名空间与其他子系统共享若干短名。
 * 同时 import 多个子系统时建议用 alias：
 *
 * ```ts
 * import { Point as DiagramPoint } from "openxml-ts/diagram";
 * import { Point as DrawingPoint } from "openxml-ts/drawing";
 * ```
 *
 * 或者只 import 子系统命名空间：`import * as diagram from "openxml-ts/diagram"`。
 */

export * from "./generated/index.js";
export { registerDiagramElements } from "./generated/_registry.js";
