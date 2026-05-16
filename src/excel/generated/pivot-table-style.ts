// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.PivotTableStyle

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the PivotTableStyle Class.
 *
 * Element: `x:pivotTableStyleInfo` */
export class PivotTableStyle extends OpenXmlLeafElement {
  override readonly localName = "pivotTableStyleInfo" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Table Style Name (:name) */
  name: StringValue | undefined;

  /** Show Row Header Formatting (:showRowHeaders) */
  showRowHeaders: BooleanValue | undefined;

  /** Show Table Style Column Header Formatting (:showColHeaders) */
  showColumnHeaders: BooleanValue | undefined;

  /** Show Row Stripes (:showRowStripes) */
  showRowStripes: BooleanValue | undefined;

  /** Show Column Stripes (:showColStripes) */
  showColumnStripes: BooleanValue | undefined;

  /** Show Last Column (:showLastColumn) */
  showLastColumn: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":name": this.name = StringValue.parse(value); return;
      case ":showRowHeaders": this.showRowHeaders = BooleanValue.parse(value); return;
      case ":showColHeaders": this.showColumnHeaders = BooleanValue.parse(value); return;
      case ":showRowStripes": this.showRowStripes = BooleanValue.parse(value); return;
      case ":showColStripes": this.showColumnStripes = BooleanValue.parse(value); return;
      case ":showLastColumn": this.showLastColumn = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.showRowHeaders !== undefined) out.push([":showRowHeaders", this.showRowHeaders.toString()]);
    if (this.showColumnHeaders !== undefined) out.push([":showColHeaders", this.showColumnHeaders.toString()]);
    if (this.showRowStripes !== undefined) out.push([":showRowStripes", this.showRowStripes.toString()]);
    if (this.showColumnStripes !== undefined) out.push([":showColStripes", this.showColumnStripes.toString()]);
    if (this.showLastColumn !== undefined) out.push([":showLastColumn", this.showLastColumn.toString()]);
    return out;
  }

}
