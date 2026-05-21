// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.ConditionalFormatStyle

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertString,
} from "../../element/index.js";

/** Defines the ConditionalFormatStyle Class.
 *
 * Element: `w:cnfStyle` */
export class ConditionalFormatStyle extends OpenXmlLeafElement {
  override readonly localName = "cnfStyle" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Conditional Formatting Bit Mask (w:val) */
  val: StringValue | undefined;

  /** firstRow (w:firstRow) */
  firstRow: BooleanValue | undefined;

  /** lastRow (w:lastRow) */
  lastRow: BooleanValue | undefined;

  /** firstColumn (w:firstColumn) */
  firstColumn: BooleanValue | undefined;

  /** lastColumn (w:lastColumn) */
  lastColumn: BooleanValue | undefined;

  /** oddVBand (w:oddVBand) */
  oddVerticalBand: BooleanValue | undefined;

  /** evenVBand (w:evenVBand) */
  evenVerticalBand: BooleanValue | undefined;

  /** oddHBand (w:oddHBand) */
  oddHorizontalBand: BooleanValue | undefined;

  /** evenHBand (w:evenHBand) */
  evenHorizontalBand: BooleanValue | undefined;

  /** firstRowFirstColumn (w:firstRowFirstColumn) */
  firstRowFirstColumn: BooleanValue | undefined;

  /** firstRowLastColumn (w:firstRowLastColumn) */
  firstRowLastColumn: BooleanValue | undefined;

  /** lastRowFirstColumn (w:lastRowFirstColumn) */
  lastRowFirstColumn: BooleanValue | undefined;

  /** lastRowLastColumn (w:lastRowLastColumn) */
  lastRowLastColumn: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:val": this.val = StringValue.parse(value); assertString(this.val, { maxLength: 12, minLength: 12 }, { attribute: "w:val", elementClass: "ConditionalFormatStyle" }); return;
      case "w:firstRow": this.firstRow = BooleanValue.parse(value); return;
      case "w:lastRow": this.lastRow = BooleanValue.parse(value); return;
      case "w:firstColumn": this.firstColumn = BooleanValue.parse(value); return;
      case "w:lastColumn": this.lastColumn = BooleanValue.parse(value); return;
      case "w:oddVBand": this.oddVerticalBand = BooleanValue.parse(value); return;
      case "w:evenVBand": this.evenVerticalBand = BooleanValue.parse(value); return;
      case "w:oddHBand": this.oddHorizontalBand = BooleanValue.parse(value); return;
      case "w:evenHBand": this.evenHorizontalBand = BooleanValue.parse(value); return;
      case "w:firstRowFirstColumn": this.firstRowFirstColumn = BooleanValue.parse(value); return;
      case "w:firstRowLastColumn": this.firstRowLastColumn = BooleanValue.parse(value); return;
      case "w:lastRowFirstColumn": this.lastRowFirstColumn = BooleanValue.parse(value); return;
      case "w:lastRowLastColumn": this.lastRowLastColumn = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    if (this.firstRow !== undefined) out.push(["w:firstRow", this.firstRow.toString()]);
    if (this.lastRow !== undefined) out.push(["w:lastRow", this.lastRow.toString()]);
    if (this.firstColumn !== undefined) out.push(["w:firstColumn", this.firstColumn.toString()]);
    if (this.lastColumn !== undefined) out.push(["w:lastColumn", this.lastColumn.toString()]);
    if (this.oddVerticalBand !== undefined) out.push(["w:oddVBand", this.oddVerticalBand.toString()]);
    if (this.evenVerticalBand !== undefined) out.push(["w:evenVBand", this.evenVerticalBand.toString()]);
    if (this.oddHorizontalBand !== undefined) out.push(["w:oddHBand", this.oddHorizontalBand.toString()]);
    if (this.evenHorizontalBand !== undefined) out.push(["w:evenHBand", this.evenHorizontalBand.toString()]);
    if (this.firstRowFirstColumn !== undefined) out.push(["w:firstRowFirstColumn", this.firstRowFirstColumn.toString()]);
    if (this.firstRowLastColumn !== undefined) out.push(["w:firstRowLastColumn", this.firstRowLastColumn.toString()]);
    if (this.lastRowFirstColumn !== undefined) out.push(["w:lastRowFirstColumn", this.lastRowFirstColumn.toString()]);
    if (this.lastRowLastColumn !== undefined) out.push(["w:lastRowLastColumn", this.lastRowLastColumn.toString()]);
    return out;
  }

}
