// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_richdata2.json
// @see DocumentFormat.OpenXml.Spreadsheetml2017Richdata2.RichStyle

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../../element/index.js";

/** Defines the RichStyle Class.
 *
 * Element: `xlrd2:rSty` */
export class RichStyle extends OpenXmlCompositeElement {
  override readonly localName = "rSty" as const;
  override readonly prefix = "xlrd2" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** dxfid (:dxfid) */
  dxfid: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "dxfid": this.dxfid = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.dxfid !== undefined) out.push(["dxfid", this.dxfid.toString()]);
    return out;
  }

}
