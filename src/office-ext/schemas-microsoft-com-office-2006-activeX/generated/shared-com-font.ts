// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_activeX.json
// @see DocumentFormat.OpenXml.2006ActiveX.SharedComFont

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the SharedComFont Class.
 *
 * Element: `ax:font` */
export class SharedComFont extends OpenXmlCompositeElement {
  override readonly localName = "font" as const;
  override readonly prefix = "ax" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2006/activeX" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** persistence (ax:persistence) */
  persistence: StringValue | undefined;

  /** id (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ax:persistence": this.persistence = StringValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.persistence !== undefined) out.push(["ax:persistence", this.persistence.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

}
