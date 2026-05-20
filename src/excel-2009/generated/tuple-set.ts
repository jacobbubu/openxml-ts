// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.TupleSet

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../element/index.js";

/** Defines the TupleSet Class.
 *
 * Element: `x14:tupleSet` */
export class TupleSet extends OpenXmlCompositeElement {
  override readonly localName = "tupleSet" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** rowCount (:rowCount) */
  rowCount: UInt32Value | undefined;

  /** columnCount (:columnCount) */
  columnCount: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rowCount": this.rowCount = UInt32Value.parse(value); return;
      case "columnCount": this.columnCount = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rowCount !== undefined) out.push(["rowCount", this.rowCount.toString()]);
    if (this.columnCount !== undefined) out.push(["columnCount", this.columnCount.toString()]);
    return out;
  }

}
