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
import "./extensions/paragraph-alignment.js";
import "./extensions/paragraph-flow.js";
import "./extensions/paragraph-indent.js";
import "./extensions/paragraph-spacing.js";
import "./extensions/paragraph-style-id.js";
import "./extensions/paragraph-tab-stops.js";
import "./extensions/run-extensions.js";
import "./extensions/run-formatting.js";
import "./extensions/run-fonts.js";
import "./extensions/run-style-id.js";
import "./extensions/table-cell-shading.js";

export { WordprocessingDocument } from "./word-document.js";

export {
  EffectiveProperties,
  resolveEffectiveParagraphProperties,
  resolveEffectiveRunProperties,
} from "./effective-resolver.js";

export {
  CommentsPart,
  FontTablePart,
  FooterPart,
  HeaderPart,
  MainDocumentPart,
  SettingsPart,
  StylesPart,
  ThemePart,
  type TypedXmlPart,
  WebSettingsPart,
} from "./parts/index.js";

export { BinaryPart } from "../parts/binary-part.js";
export { CoreProperties } from "../parts/core-properties.js";
export { CorePropertiesPart } from "../parts/core-properties-part.js";
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

export { createBookmarkPair } from "./bookmark-markup.js";

// 复用 packaging 层 hyperlink 助手；高级用户想手工拼 input 时少钻一级路径。
export {
  HYPERLINK_RELATIONSHIP_TYPE,
  createHyperlinkInput,
} from "../packaging/relationships/hyperlink.js";

// ─── Word 注释（Epic-18） ─────────────────────────────────────────────────────
export { Comment } from "./generated/comment.js";
export { Comments } from "./generated/comments.js";
export { CommentRangeStart } from "./generated/comment-range-start.js";
export { CommentRangeEnd } from "./generated/comment-range-end.js";
export { CommentReference } from "./generated/comment-reference.js";

// ─── Word 修订追踪（Epic-19） ─────────────────────────────────────────────────
export { InsertedRun } from "./generated/inserted-run.js";
export { DeletedRun } from "./generated/deleted-run.js";
export { DeletedText } from "./generated/deleted-text.js";
export {
  type RevisionOptions,
  createInsertedRun,
  createDeletedRun,
} from "./revision-markup.js";

// ─── Word 表格（Epic-21） ────────────────────────────────────────────────────
export {
  type CreateDocumentTableOptions,
  createDocumentTable,
  getDocumentTableCellText,
  mergeDocumentTableCells,
  setDocumentTableCellText,
} from "./table-markup.js";

// ─── Word 简单字段（Epic-34） ────────────────────────────────────────────────
export { SimpleField } from "./generated/simple-field.js";
export {
  type CreateFieldRunOptions,
  createFieldRun,
  createPageNumberRun,
  createTotalPagesRun,
} from "./field-markup.js";

// ─── Word Style 创建（Epic-46） ───────────────────────────────────────────────
export {
  type CharacterStyleOptions,
  type ParagraphStyleOptions,
  type StyleFormattingOptions,
  createCharacterStyle,
  createParagraphStyle,
} from "./style-markup.js";

// ─── Word 列表 / 编号（Epic-22） ─────────────────────────────────────────────
export { Numbering } from "./generated/numbering.js";
export { NumberingPart } from "./parts/numbering-part.js";
export { createListParagraph } from "./list-markup.js";

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
export { FontSize } from "./generated/font-size.js";
export { KeepNext } from "./generated/keep-next.js";
export { KeepLines } from "./generated/keep-lines.js";
export { PageBreakBefore } from "./generated/page-break-before.js";
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
export { BasedOn } from "./generated/based-on.js";
export { Settings } from "./generated/settings.js";
export { Fonts } from "./generated/fonts.js";
export { WebSettings } from "./generated/web-settings.js";

// ─── 绘图（占位透传，DrawingML schema 类未生成） ─────────────────────────────

export { Drawing } from "./generated/drawing.js";

// ─── 注册表 ──────────────────────────────────────────────────────────────────

export { registerWordprocessingElements } from "./generated/_registry.js";
