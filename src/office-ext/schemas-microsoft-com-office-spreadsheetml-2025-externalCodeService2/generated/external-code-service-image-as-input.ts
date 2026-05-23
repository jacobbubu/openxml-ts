// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2025_externalCodeService2.json
// @see DocumentFormat.OpenXml.Spreadsheetml2025ExternalCodeService2.ExternalCodeServiceImageAsInput

import {
  OpenXmlLeafElement,
  UInt32Value,
} from "../../../element/index.js";

/** Defines the ExternalCodeServiceImageAsInput Class.
 *
 * Element: `xlecs2:externalCodeServiceImageAsInput` */
export class ExternalCodeServiceImageAsInput extends OpenXmlLeafElement {
  override readonly localName = "externalCodeServiceImageAsInput" as const;
  override readonly prefix = "xlecs2" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2025/externalCodeService2" as const;


  /** maxWidth (:maxWidth) */
  maxWidth: UInt32Value | undefined;

  /** maxHeight (:maxHeight) */
  maxHeight: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "maxWidth": this.maxWidth = UInt32Value.parse(value); return;
      case "maxHeight": this.maxHeight = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.maxWidth !== undefined) out.push(["maxWidth", this.maxWidth.toString()]);
    if (this.maxHeight !== undefined) out.push(["maxHeight", this.maxHeight.toString()]);
    return out;
  }

}
