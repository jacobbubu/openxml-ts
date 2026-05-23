// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2023_externalCodeService.json
// @see DocumentFormat.OpenXml.Spreadsheetml2023ExternalCodeService.ExternalCodeService

import {
  OpenXmlLeafElement,
  UInt32Value,
} from "../../../element/index.js";

/** Defines the ExternalCodeService Class.
 *
 * Element: `xlecs:externalCodeService` */
export class ExternalCodeService extends OpenXmlLeafElement {
  override readonly localName = "externalCodeService" as const;
  override readonly prefix = "xlecs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2023/externalCodeService" as const;


  /** autoShow (:autoShow) */
  autoShow: UInt32Value | undefined;

  /** timeout (:timeout) */
  timeout: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "autoShow": this.autoShow = UInt32Value.parse(value); return;
      case "timeout": this.timeout = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.autoShow !== undefined) out.push(["autoShow", this.autoShow.toString()]);
    if (this.timeout !== undefined) out.push(["timeout", this.timeout.toString()]);
    return out;
  }

}
