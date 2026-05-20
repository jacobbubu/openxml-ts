// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.ExtensionListModify

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Defines the ExtensionListModify Class.
 *
 * Element: `p14:extLst` */
export class ExtensionListModify extends OpenXmlCompositeElement {
  override readonly localName = "extLst" as const;
  override readonly prefix = "p14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2010/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Modify (:mod) */
  modify: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "mod": this.modify = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.modify !== undefined) out.push(["mod", this.modify.toString()]);
    return out;
  }

}
