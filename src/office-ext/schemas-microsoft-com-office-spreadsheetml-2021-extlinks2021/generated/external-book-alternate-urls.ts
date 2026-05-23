// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2021_extlinks2021.json
// @see DocumentFormat.OpenXml.Spreadsheetml2021Extlinks2021.ExternalBookAlternateUrls

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the ExternalBookAlternateUrls Class.
 *
 * Element: `xxl21:alternateUrls` */
export class ExternalBookAlternateUrls extends OpenXmlCompositeElement {
  override readonly localName = "alternateUrls" as const;
  override readonly prefix = "xxl21" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2021/extlinks2021" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** driveId (:driveId) */
  driveId: StringValue | undefined;

  /** itemId (:itemId) */
  itemId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "driveId": this.driveId = StringValue.parse(value); return;
      case "itemId": this.itemId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.driveId !== undefined) out.push(["driveId", this.driveId.toString()]);
    if (this.itemId !== undefined) out.push(["itemId", this.itemId.toString()]);
    return out;
  }

}
