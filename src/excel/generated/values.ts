// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Values

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../element/index.js";

/** DDE Name Values.
 *
 * Element: `x:values` */
export class Values extends OpenXmlCompositeElement {
  override readonly localName = "values" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Rows (:rows) */
  rows: UInt32Value | undefined;

  /** Columns (:cols) */
  columns: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rows": this.rows = UInt32Value.parse(value); return;
      case "cols": this.columns = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rows !== undefined) out.push(["rows", this.rows.toString()]);
    if (this.columns !== undefined) out.push(["cols", this.columns.toString()]);
    return out;
  }

}
