// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.WheelTransition

import {
  OpenXmlLeafElement,
  UInt32Value,
} from "../../element/index.js";

/** Defines the WheelTransition Class.
 *
 * Element: `p:wheel` */
export class WheelTransition extends OpenXmlLeafElement {
  override readonly localName = "wheel" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Spokes (:spokes) */
  spokes: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":spokes": this.spokes = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.spokes !== undefined) out.push([":spokes", this.spokes.toString()]);
    return out;
  }

}
