/**
 * `openxml-ts/word` 公共入口（Story-2.9 起作为 npm subpath）。
 *
 * - 暴露 Word 子系统的强类型门面 `WordprocessingDocument`、6 个 typed Parts、
 *   以及 30+ 常用 element 类的便捷 re-export；
 * - 完整 ~720 个 element 类按需深引 `openxml-ts/word/generated/<name>.js`
 *   （ADR-013），最小 bundle 友好；
 * - `sideEffects: false` + tree-shake：用户只 import 几个常用类时打包器只拉
 *   对应的 generated/*.js 模块。
 *
 * 副作用：模块加载时通过 `extensions/paragraph-extensions.js` /
 * `extensions/run-extensions.js` 给 `Paragraph.prototype` / `Run.prototype`
 * 挂便捷 `text` 访问器（Story-11.1）。两份 mixin 都是显式 bare-import，
 * 不会被 tree-shake 掉。
 */

import "./extensions/paragraph-extensions.js";
import "./extensions/run-extensions.js";

export { WordprocessingDocument } from "./word-document.js";

export {
  EffectiveProperties,
  resolveEffectiveParagraphProperties,
  resolveEffectiveRunProperties,
} from "./effective-resolver.js";

export {
  FontTablePart,
  MainDocumentPart,
  SettingsPart,
  StylesPart,
  ThemePart,
  type TypedXmlPart,
  WebSettingsPart,
} from "./parts/index.js";

export { BinaryPart } from "../parts/binary-part.js";
export {
  type AddImagePartOptions,
  ImagePart,
  extensionForMime,
  mimeForExtension,
  sniffImageMime,
} from "../parts/image-part.js";

export {
  type CreateImageRunOptions,
  createImageRunForWord,
} from "./image-markup.js";

export {
  type CreateHyperlinkRunOptions,
  createHyperlinkRun,
} from "./hyperlink-markup.js";

// 复用 packaging 层 hyperlink 助手；高级用户想手工拼 input 时少钻一级路径。
export {
  HYPERLINK_RELATIONSHIP_TYPE,
  createHyperlinkInput,
} from "../packaging/relationships/hyperlink.js";

// ─── 核心结构 ─────────────────────────────────────────────────────────────────

export { Document } from "./generated/document.js";
export { Body } from "./generated/body.js";

// ─── 段落 / 行 / 文本 ─────────────────────────────────────────────────────────

export { Paragraph } from "./generated/paragraph.js";
export { ParagraphProperties } from "./generated/paragraph-properties.js";
export { ParagraphStyleId } from "./generated/paragraph-style-id.js";
export { Run } from "./generated/run.js";
export { RunProperties } from "./generated/run-properties.js";
export { RunStyle } from "./generated/run-style.js";
export { Text } from "./generated/text.js";
export { Break } from "./generated/break.js";
export { TabChar } from "./generated/tab-char.js";
export { TabStop } from "./generated/tab-stop.js";
export { Tabs } from "./generated/tabs.js";

// ─── 文本格式 ────────────────────────────────────────────────────────────────

export { Bold } from "./generated/bold.js";
export { Italic } from "./generated/italic.js";
export { Color } from "./generated/color.js";
export { Shading } from "./generated/shading.js";
export { Justification } from "./generated/justification.js";
export { Indentation } from "./generated/indentation.js";
export { SpacingBetweenLines } from "./generated/spacing-between-lines.js";

// ─── 表格 ────────────────────────────────────────────────────────────────────

export { Table } from "./generated/table.js";
export { TableProperties } from "./generated/table-properties.js";
export { TableGrid } from "./generated/table-grid.js";
export { GridColumn } from "./generated/grid-column.js";
export { TableRow } from "./generated/table-row.js";
export { TableRowProperties } from "./generated/table-row-properties.js";
export { TableCell } from "./generated/table-cell.js";
export { TableCellProperties } from "./generated/table-cell-properties.js";
export { TableBorders } from "./generated/table-borders.js";
export { TableCellBorders } from "./generated/table-cell-borders.js";

// ─── 链接 / 书签 / 字段 ──────────────────────────────────────────────────────

export { Hyperlink } from "./generated/hyperlink.js";
export { BookmarkStart } from "./generated/bookmark-start.js";
export { BookmarkEnd } from "./generated/bookmark-end.js";

// ─── 节 / 页面 ───────────────────────────────────────────────────────────────

export { SectionProperties } from "./generated/section-properties.js";
export { PageSize } from "./generated/page-size.js";
export { PageMargin } from "./generated/page-margin.js";
export { Header } from "./generated/header.js";
export { Footer } from "./generated/footer.js";
export { HeaderReference } from "./generated/header-reference.js";
export { FooterReference } from "./generated/footer-reference.js";

// ─── 样式表 ──────────────────────────────────────────────────────────────────

export { Style } from "./generated/style.js";
export { Styles } from "./generated/styles.js";
export { Settings } from "./generated/settings.js";
export { Fonts } from "./generated/fonts.js";
export { WebSettings } from "./generated/web-settings.js";

// ─── 绘图（占位透传，DrawingML schema 类未生成） ─────────────────────────────

export { Drawing } from "./generated/drawing.js";

// ─── 注册表 ──────────────────────────────────────────────────────────────────

export { registerWordprocessingElements } from "./generated/_registry.js";
