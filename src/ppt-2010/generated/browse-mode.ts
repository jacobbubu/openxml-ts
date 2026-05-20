// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.BrowseMode

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Defines the BrowseMode Class.
 *
 * Element: `p14:browseMode` */
export class BrowseMode extends OpenXmlLeafElement {
  override readonly localName = "browseMode" as const;
  override readonly prefix = "p14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2010/main" as const;


  /** showStatus (:showStatus) */
  showStatus: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "showStatus": this.showStatus = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.showStatus !== undefined) out.push(["showStatus", this.showStatus.toString()]);
    return out;
  }

}
