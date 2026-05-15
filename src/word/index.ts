/**
 * `openxml-ts/word` 公共入口（Story-2.9 之前可以从这条路径深引）。
 *
 * 暴露 Word 子系统的门面 + typed Parts + 一组常用生成 element 类。完整生成类列表见
 * `src/word/generated/index.ts`（约 700 个，按需深引）。
 */

export { WordprocessingDocument } from "./word-document.js";

export {
  FontTablePart,
  MainDocumentPart,
  SettingsPart,
  StylesPart,
  ThemePart,
  type TypedXmlPart,
  WebSettingsPart,
} from "./parts/index.js";

// 常用生成 element 类——按 Architecture §9 ADR-013，方便用户从 root 入口拿核心类
export { Document } from "./generated/document.js";
export { Body } from "./generated/body.js";
export { Paragraph } from "./generated/paragraph.js";
export { Run } from "./generated/run.js";
export { Text } from "./generated/text.js";
export { Table } from "./generated/table.js";
export { TableRow } from "./generated/table-row.js";
export { TableCell } from "./generated/table-cell.js";
export { Hyperlink } from "./generated/hyperlink.js";
export { Settings } from "./generated/settings.js";
export { Styles } from "./generated/styles.js";
export { Style } from "./generated/style.js";
export { Fonts } from "./generated/fonts.js";
export { WebSettings } from "./generated/web-settings.js";

export { registerWordprocessingElements } from "./generated/_registry.js";
