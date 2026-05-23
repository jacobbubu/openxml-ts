// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2024_workbookCompatibilityVersion.json
// @see DocumentFormat.OpenXml.Spreadsheetml2024WorkbookCompatibilityVersion.Version

import {
  OpenXmlLeafElement,
  UInt32Value,
} from "../../../element/index.js";

/** Defines the Version Class.
 *
 * Element: `xlwcv:version` */
export class Version extends OpenXmlLeafElement {
  override readonly localName = "version" as const;
  override readonly prefix = "xlwcv" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2024/workbookCompatibilityVersion" as const;


  /** warnBelowVersion (:warnBelowVersion) */
  warnBelowVersion: UInt32Value | undefined;

  /** setVersion (:setVersion) */
  setVersion: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "warnBelowVersion": this.warnBelowVersion = UInt32Value.parse(value); return;
      case "setVersion": this.setVersion = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.warnBelowVersion !== undefined) out.push(["warnBelowVersion", this.warnBelowVersion.toString()]);
    if (this.setVersion !== undefined) out.push(["setVersion", this.setVersion.toString()]);
    return out;
  }

}
