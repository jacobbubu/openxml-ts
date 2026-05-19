// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.DataBar

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../element/index.js";

/** Data Bar.
 *
 * Element: `x:dataBar` */
export class DataBar extends OpenXmlCompositeElement {
  override readonly localName = "dataBar" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Minimum Length (:minLength) */
  minLength: UInt32Value | undefined;

  /** Maximum Length (:maxLength) */
  maxLength: UInt32Value | undefined;

  /** Show Values (:showValue) */
  showValue: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "minLength": this.minLength = UInt32Value.parse(value); return;
      case "maxLength": this.maxLength = UInt32Value.parse(value); return;
      case "showValue": this.showValue = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.minLength !== undefined) out.push(["minLength", this.minLength.toString()]);
    if (this.maxLength !== undefined) out.push(["maxLength", this.maxLength.toString()]);
    if (this.showValue !== undefined) out.push(["showValue", this.showValue.toString()]);
    return out;
  }

}
