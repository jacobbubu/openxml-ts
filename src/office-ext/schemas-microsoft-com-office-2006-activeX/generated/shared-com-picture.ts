// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_activeX.json
// @see DocumentFormat.OpenXml.2006ActiveX.SharedComPicture

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the SharedComPicture Class.
 *
 * Element: `ax:picture` */
export class SharedComPicture extends OpenXmlLeafElement {
  override readonly localName = "picture" as const;
  override readonly prefix = "ax" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2006/activeX" as const;


  /** id (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

}
