// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.DataTable

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the DataTable Class.
 *
 * Element: `cs:dataTable` */
export class DataTable extends OpenXmlLeafElement {
  override readonly localName = "dataTable" as const;
  override readonly prefix = "cs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chartStyle" as const;


  /** legendKeys (:legendKeys) */
  legendKeys: StringValue | undefined;

  /** horizontalBorder (:horizontalBorder) */
  horizontalBorder: StringValue | undefined;

  /** verticalBorder (:verticalBorder) */
  verticalBorder: StringValue | undefined;

  /** outlineBorder (:outlineBorder) */
  outlineBorder: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "legendKeys": this.legendKeys = StringValue.parse(value); return;
      case "horizontalBorder": this.horizontalBorder = StringValue.parse(value); return;
      case "verticalBorder": this.verticalBorder = StringValue.parse(value); return;
      case "outlineBorder": this.outlineBorder = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.legendKeys !== undefined) out.push(["legendKeys", this.legendKeys.toString()]);
    if (this.horizontalBorder !== undefined) out.push(["horizontalBorder", this.horizontalBorder.toString()]);
    if (this.verticalBorder !== undefined) out.push(["verticalBorder", this.verticalBorder.toString()]);
    if (this.outlineBorder !== undefined) out.push(["outlineBorder", this.outlineBorder.toString()]);
    return out;
  }

}
