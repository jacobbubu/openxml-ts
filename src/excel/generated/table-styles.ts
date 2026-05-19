// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.TableStyles

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the TableStyles Class.
 *
 * Element: `x:tableStyles` */
export class TableStyles extends OpenXmlCompositeElement {
  override readonly localName = "tableStyles" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Table Style Count (:count) */
  count: UInt32Value | undefined;

  /** Default Table Style (:defaultTableStyle) */
  defaultTableStyle: StringValue | undefined;

  /** Default Pivot Style (:defaultPivotStyle) */
  defaultPivotStyle: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "count": this.count = UInt32Value.parse(value); return;
      case "defaultTableStyle": this.defaultTableStyle = StringValue.parse(value); return;
      case "defaultPivotStyle": this.defaultPivotStyle = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.count !== undefined) out.push(["count", this.count.toString()]);
    if (this.defaultTableStyle !== undefined) out.push(["defaultTableStyle", this.defaultTableStyle.toString()]);
    if (this.defaultPivotStyle !== undefined) out.push(["defaultPivotStyle", this.defaultPivotStyle.toString()]);
    return out;
  }

}
