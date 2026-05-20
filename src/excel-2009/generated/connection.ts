// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.Connection

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the Connection Class.
 *
 * Element: `x14:connection` */
export class Connection extends OpenXmlCompositeElement {
  override readonly localName = "connection" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** culture (:culture) */
  culture: StringValue | undefined;

  /** embeddedDataId (:embeddedDataId) */
  embeddedDataId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "culture": this.culture = StringValue.parse(value); return;
      case "embeddedDataId": this.embeddedDataId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.culture !== undefined) out.push(["culture", this.culture.toString()]);
    if (this.embeddedDataId !== undefined) out.push(["embeddedDataId", this.embeddedDataId.toString()]);
    return out;
  }

}
