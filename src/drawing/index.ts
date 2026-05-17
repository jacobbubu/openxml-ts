/**
 * `openxml-ts/drawing` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { Theme, ColorScheme, FontScheme, FormatScheme } from "openxml-ts/drawing";
 * import { registerDrawingElements } from "openxml-ts/drawing";
 * ```
 *
 * 命名冲突提示（ADR-026）：DrawingML 与 WordprocessingML / PresentationML 共享若干短名
 * （`Paragraph`、`Text`、`Run` 等）。同时 import 多个子系统时建议用 alias：
 *
 * ```ts
 * import { Paragraph as DrawingParagraph } from "openxml-ts/drawing";
 * import { Paragraph as WordParagraph } from "openxml-ts/word";
 * ```
 *
 * 或者只 import 子系统命名空间：`import * as drawing from "openxml-ts/drawing"`。
 */

export * from "./generated/index.js";
export { registerDrawingElements } from "./generated/_registry.js";
