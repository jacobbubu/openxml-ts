// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.StylePaneFormatFilter

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Suggested Filtering for List of Document Styles.
 *
 * Element: `w:stylePaneFormatFilter` */
export class StylePaneFormatFilter extends OpenXmlLeafElement {
  override readonly localName = "stylePaneFormatFilter" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** allStyles (w:allStyles) */
  allStyles: BooleanValue | undefined;

  /** customStyles (w:customStyles) */
  customStyles: BooleanValue | undefined;

  /** latentStyles (w:latentStyles) */
  latentStyles: BooleanValue | undefined;

  /** stylesInUse (w:stylesInUse) */
  stylesInUse: BooleanValue | undefined;

  /** headingStyles (w:headingStyles) */
  headingStyles: BooleanValue | undefined;

  /** numberingStyles (w:numberingStyles) */
  numberingStyles: BooleanValue | undefined;

  /** tableStyles (w:tableStyles) */
  tableStyles: BooleanValue | undefined;

  /** directFormattingOnRuns (w:directFormattingOnRuns) */
  directFormattingOnRuns: BooleanValue | undefined;

  /** directFormattingOnParagraphs (w:directFormattingOnParagraphs) */
  directFormattingOnParagraphs: BooleanValue | undefined;

  /** directFormattingOnNumbering (w:directFormattingOnNumbering) */
  directFormattingOnNumbering: BooleanValue | undefined;

  /** directFormattingOnTables (w:directFormattingOnTables) */
  directFormattingOnTables: BooleanValue | undefined;

  /** clearFormatting (w:clearFormatting) */
  clearFormatting: BooleanValue | undefined;

  /** top3HeadingStyles (w:top3HeadingStyles) */
  top3HeadingStyles: BooleanValue | undefined;

  /** visibleStyles (w:visibleStyles) */
  visibleStyles: BooleanValue | undefined;

  /** alternateStyleNames (w:alternateStyleNames) */
  alternateStyleNames: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:allStyles": this.allStyles = BooleanValue.parse(value); return;
      case "w:customStyles": this.customStyles = BooleanValue.parse(value); return;
      case "w:latentStyles": this.latentStyles = BooleanValue.parse(value); return;
      case "w:stylesInUse": this.stylesInUse = BooleanValue.parse(value); return;
      case "w:headingStyles": this.headingStyles = BooleanValue.parse(value); return;
      case "w:numberingStyles": this.numberingStyles = BooleanValue.parse(value); return;
      case "w:tableStyles": this.tableStyles = BooleanValue.parse(value); return;
      case "w:directFormattingOnRuns": this.directFormattingOnRuns = BooleanValue.parse(value); return;
      case "w:directFormattingOnParagraphs": this.directFormattingOnParagraphs = BooleanValue.parse(value); return;
      case "w:directFormattingOnNumbering": this.directFormattingOnNumbering = BooleanValue.parse(value); return;
      case "w:directFormattingOnTables": this.directFormattingOnTables = BooleanValue.parse(value); return;
      case "w:clearFormatting": this.clearFormatting = BooleanValue.parse(value); return;
      case "w:top3HeadingStyles": this.top3HeadingStyles = BooleanValue.parse(value); return;
      case "w:visibleStyles": this.visibleStyles = BooleanValue.parse(value); return;
      case "w:alternateStyleNames": this.alternateStyleNames = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.allStyles !== undefined) out.push(["w:allStyles", this.allStyles.toString()]);
    if (this.customStyles !== undefined) out.push(["w:customStyles", this.customStyles.toString()]);
    if (this.latentStyles !== undefined) out.push(["w:latentStyles", this.latentStyles.toString()]);
    if (this.stylesInUse !== undefined) out.push(["w:stylesInUse", this.stylesInUse.toString()]);
    if (this.headingStyles !== undefined) out.push(["w:headingStyles", this.headingStyles.toString()]);
    if (this.numberingStyles !== undefined) out.push(["w:numberingStyles", this.numberingStyles.toString()]);
    if (this.tableStyles !== undefined) out.push(["w:tableStyles", this.tableStyles.toString()]);
    if (this.directFormattingOnRuns !== undefined) out.push(["w:directFormattingOnRuns", this.directFormattingOnRuns.toString()]);
    if (this.directFormattingOnParagraphs !== undefined) out.push(["w:directFormattingOnParagraphs", this.directFormattingOnParagraphs.toString()]);
    if (this.directFormattingOnNumbering !== undefined) out.push(["w:directFormattingOnNumbering", this.directFormattingOnNumbering.toString()]);
    if (this.directFormattingOnTables !== undefined) out.push(["w:directFormattingOnTables", this.directFormattingOnTables.toString()]);
    if (this.clearFormatting !== undefined) out.push(["w:clearFormatting", this.clearFormatting.toString()]);
    if (this.top3HeadingStyles !== undefined) out.push(["w:top3HeadingStyles", this.top3HeadingStyles.toString()]);
    if (this.visibleStyles !== undefined) out.push(["w:visibleStyles", this.visibleStyles.toString()]);
    if (this.alternateStyleNames !== undefined) out.push(["w:alternateStyleNames", this.alternateStyleNames.toString()]);
    return out;
  }
}
