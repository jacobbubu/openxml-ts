// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_01_customui.json
// @see DocumentFormat.OpenXml.200601Customui.Ribbon

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../../element/index.js";

/** Defines the Ribbon Class.
 *
 * Element: `mso:ribbon` */
export class Ribbon extends OpenXmlCompositeElement {
  override readonly localName = "ribbon" as const;
  override readonly prefix = "mso" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2006/01/customui" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** startFromScratch (:startFromScratch) */
  startFromScratch: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "startFromScratch": this.startFromScratch = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.startFromScratch !== undefined) out.push(["startFromScratch", this.startFromScratch.toString()]);
    return out;
  }

}
