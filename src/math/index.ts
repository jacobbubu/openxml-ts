/**
 * `openxml-ts/math` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { OfficeMath, Fraction, Radical, Subscript, Superscript } from "openxml-ts/math";
 * import { registerMathElements } from "openxml-ts/math";
 * ```
 *
 * 命名冲突提示（ADR-026）：Math 命名空间与其他子系统共享若干短名（如 Run、Text、Paragraph）。
 * 同时 import 多个子系统时建议用 alias：
 *
 * ```ts
 * import { Run as MathRun } from "openxml-ts/math";
 * import { Run as WordRun } from "openxml-ts/word";
 * ```
 *
 * 或者只 import 子系统命名空间：`import * as math from "openxml-ts/math"`。
 */

export * from "./generated/index.js";
export { registerMathElements } from "./generated/_registry.js";
