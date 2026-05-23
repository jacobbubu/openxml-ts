// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_dynamicarray.json
// @see DocumentFormat.OpenXml.Spreadsheetml2017Dynamicarray.DynamicArrayProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../../element/index.js";

/** Defines the DynamicArrayProperties Class.
 *
 * Element: `xda:dynamicArrayProperties` */
export class DynamicArrayProperties extends OpenXmlCompositeElement {
  override readonly localName = "dynamicArrayProperties" as const;
  override readonly prefix = "xda" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** fDynamic (:fDynamic) */
  fDynamic: BooleanValue | undefined;

  /** fCollapsed (:fCollapsed) */
  fCollapsed: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "fDynamic": this.fDynamic = BooleanValue.parse(value); return;
      case "fCollapsed": this.fCollapsed = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.fDynamic !== undefined) out.push(["fDynamic", this.fDynamic.toString()]);
    if (this.fCollapsed !== undefined) out.push(["fCollapsed", this.fCollapsed.toString()]);
    return out;
  }

}
