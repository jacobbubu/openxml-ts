// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.TableProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Table Properties.
 *
 * Element: `a:tblPr` */
export class TableProperties extends OpenXmlCompositeElement {
  override readonly localName = "tblPr" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Right-to-Left (:rtl) */
  rightToLeft: BooleanValue | undefined;

  /** First Row (:firstRow) */
  firstRow: BooleanValue | undefined;

  /** First Column (:firstCol) */
  firstColumn: BooleanValue | undefined;

  /** Last Row (:lastRow) */
  lastRow: BooleanValue | undefined;

  /** Last Column (:lastCol) */
  lastColumn: BooleanValue | undefined;

  /** Banded Rows (:bandRow) */
  bandRow: BooleanValue | undefined;

  /** Banded Columns (:bandCol) */
  bandColumn: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":rtl": this.rightToLeft = BooleanValue.parse(value); return;
      case ":firstRow": this.firstRow = BooleanValue.parse(value); return;
      case ":firstCol": this.firstColumn = BooleanValue.parse(value); return;
      case ":lastRow": this.lastRow = BooleanValue.parse(value); return;
      case ":lastCol": this.lastColumn = BooleanValue.parse(value); return;
      case ":bandRow": this.bandRow = BooleanValue.parse(value); return;
      case ":bandCol": this.bandColumn = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rightToLeft !== undefined) out.push([":rtl", this.rightToLeft.toString()]);
    if (this.firstRow !== undefined) out.push([":firstRow", this.firstRow.toString()]);
    if (this.firstColumn !== undefined) out.push([":firstCol", this.firstColumn.toString()]);
    if (this.lastRow !== undefined) out.push([":lastRow", this.lastRow.toString()]);
    if (this.lastColumn !== undefined) out.push([":lastCol", this.lastColumn.toString()]);
    if (this.bandRow !== undefined) out.push([":bandRow", this.bandRow.toString()]);
    if (this.bandColumn !== undefined) out.push([":bandCol", this.bandColumn.toString()]);
    return out;
  }

}
