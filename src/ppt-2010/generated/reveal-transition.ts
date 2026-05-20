// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.RevealTransition

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the RevealTransition Class.
 *
 * Element: `p14:reveal` */
export class RevealTransition extends OpenXmlLeafElement {
  override readonly localName = "reveal" as const;
  override readonly prefix = "p14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2010/main" as const;


  /** thruBlk (:thruBlk) */
  throughBlack: BooleanValue | undefined;

  /** dir (:dir) */
  direction: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "thruBlk": this.throughBlack = BooleanValue.parse(value); return;
      case "dir": this.direction = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.throughBlack !== undefined) out.push(["thruBlk", this.throughBlack.toString()]);
    if (this.direction !== undefined) out.push(["dir", this.direction.toString()]);
    return out;
  }

}
