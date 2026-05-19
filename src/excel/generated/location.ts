// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Location

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the Location Class.
 *
 * Element: `x:location` */
export class Location extends OpenXmlLeafElement {
  override readonly localName = "location" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Reference (:ref) */
  reference: StringValue | undefined;

  /** First Header Row (:firstHeaderRow) */
  firstHeaderRow: UInt32Value | undefined;

  /** PivotTable Data First Row (:firstDataRow) */
  firstDataRow: UInt32Value | undefined;

  /** First Data Column (:firstDataCol) */
  firstDataColumn: UInt32Value | undefined;

  /** Rows Per Page Count (:rowPageCount) */
  rowPageCount: UInt32Value | undefined;

  /** Columns Per Page (:colPageCount) */
  columnsPerPage: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ref": this.reference = StringValue.parse(value); return;
      case "firstHeaderRow": this.firstHeaderRow = UInt32Value.parse(value); return;
      case "firstDataRow": this.firstDataRow = UInt32Value.parse(value); return;
      case "firstDataCol": this.firstDataColumn = UInt32Value.parse(value); return;
      case "rowPageCount": this.rowPageCount = UInt32Value.parse(value); return;
      case "colPageCount": this.columnsPerPage = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.reference !== undefined) out.push(["ref", this.reference.toString()]);
    if (this.firstHeaderRow !== undefined) out.push(["firstHeaderRow", this.firstHeaderRow.toString()]);
    if (this.firstDataRow !== undefined) out.push(["firstDataRow", this.firstDataRow.toString()]);
    if (this.firstDataColumn !== undefined) out.push(["firstDataCol", this.firstDataColumn.toString()]);
    if (this.rowPageCount !== undefined) out.push(["rowPageCount", this.rowPageCount.toString()]);
    if (this.columnsPerPage !== undefined) out.push(["colPageCount", this.columnsPerPage.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.reference, { attribute: ":ref", elementClass: "Location" });
    assertRequired(this.firstHeaderRow, { attribute: ":firstHeaderRow", elementClass: "Location" });
    assertRequired(this.firstDataRow, { attribute: ":firstDataRow", elementClass: "Location" });
    assertRequired(this.firstDataColumn, { attribute: ":firstDataCol", elementClass: "Location" });
  }
}
