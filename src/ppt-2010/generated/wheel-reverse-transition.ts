// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.WheelReverseTransition

import {
  OpenXmlLeafElement,
  UInt32Value,
} from "../../element/index.js";

/** Defines the WheelReverseTransition Class.
 *
 * Element: `p14:wheelReverse` */
export class WheelReverseTransition extends OpenXmlLeafElement {
  override readonly localName = "wheelReverse" as const;
  override readonly prefix = "p14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2010/main" as const;


  /** Spokes (:spokes) */
  spokes: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "spokes": this.spokes = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.spokes !== undefined) out.push(["spokes", this.spokes.toString()]);
    return out;
  }

}
