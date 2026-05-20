// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.PivotValueCell

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the PivotValueCell Class.
 *
 * Element: `x15:c` */
export class PivotValueCell extends OpenXmlCompositeElement {
  override readonly localName = "c" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** i (:i) */
  item: UInt32Value | undefined;

  /** t (:t) */
  text: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "i": this.item = UInt32Value.parse(value); return;
      case "t": this.text = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.item !== undefined) out.push(["i", this.item.toString()]);
    if (this.text !== undefined) out.push(["t", this.text.toString()]);
    return out;
  }

}
