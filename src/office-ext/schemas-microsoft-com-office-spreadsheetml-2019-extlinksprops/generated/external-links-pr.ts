// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2019_extlinksprops.json
// @see DocumentFormat.OpenXml.Spreadsheetml2019Extlinksprops.ExternalLinksPr

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the ExternalLinksPr Class.
 *
 * Element: `xxlnp:externalLinksPr` */
export class ExternalLinksPr extends OpenXmlLeafElement {
  override readonly localName = "externalLinksPr" as const;
  override readonly prefix = "xxlnp" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2019/extlinksprops" as const;


  /** autoRefresh (:autoRefresh) */
  autoRefresh: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "autoRefresh": this.autoRefresh = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.autoRefresh !== undefined) out.push(["autoRefresh", this.autoRefresh.toString()]);
    return out;
  }

}
