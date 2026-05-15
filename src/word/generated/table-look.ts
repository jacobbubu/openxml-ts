// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.TableLook

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Defines the TableLook Class.
 *
 * Element: `w:tblLook` */
export class TableLook extends OpenXmlLeafElement {
  override readonly localName = "tblLook" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** firstRow (w:firstRow) */
  firstRow: BooleanValue | undefined;

  /** lastRow (w:lastRow) */
  lastRow: BooleanValue | undefined;

  /** firstColumn (w:firstColumn) */
  firstColumn: BooleanValue | undefined;

  /** lastColumn (w:lastColumn) */
  lastColumn: BooleanValue | undefined;

  /** noHBand (w:noHBand) */
  noHorizontalBand: BooleanValue | undefined;

  /** noVBand (w:noVBand) */
  noVerticalBand: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:firstRow": this.firstRow = BooleanValue.parse(value); return;
      case "w:lastRow": this.lastRow = BooleanValue.parse(value); return;
      case "w:firstColumn": this.firstColumn = BooleanValue.parse(value); return;
      case "w:lastColumn": this.lastColumn = BooleanValue.parse(value); return;
      case "w:noHBand": this.noHorizontalBand = BooleanValue.parse(value); return;
      case "w:noVBand": this.noVerticalBand = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.firstRow !== undefined) out.push(["w:firstRow", this.firstRow.toString()]);
    if (this.lastRow !== undefined) out.push(["w:lastRow", this.lastRow.toString()]);
    if (this.firstColumn !== undefined) out.push(["w:firstColumn", this.firstColumn.toString()]);
    if (this.lastColumn !== undefined) out.push(["w:lastColumn", this.lastColumn.toString()]);
    if (this.noHorizontalBand !== undefined) out.push(["w:noHBand", this.noHorizontalBand.toString()]);
    if (this.noVerticalBand !== undefined) out.push(["w:noVBand", this.noVerticalBand.toString()]);
    return out;
  }
}
