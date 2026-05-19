// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RowItem

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Row Items.
 *
 * Element: `x:i` */
export class RowItem extends OpenXmlCompositeElement {
  override readonly localName = "i" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Item Type (:t) */
  itemType: StringValue | undefined;

  /** Repeated Items Count (:r) */
  repeatedItemCount: UInt32Value | undefined;

  /** Data Field Index (:i) */
  index: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "t": this.itemType = StringValue.parse(value); return;
      case "r": this.repeatedItemCount = UInt32Value.parse(value); return;
      case "i": this.index = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.itemType !== undefined) out.push(["t", this.itemType.toString()]);
    if (this.repeatedItemCount !== undefined) out.push(["r", this.repeatedItemCount.toString()]);
    if (this.index !== undefined) out.push(["i", this.index.toString()]);
    return out;
  }

}
