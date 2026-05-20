// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.PrismTransition

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the PrismTransition Class.
 *
 * Element: `p14:prism` */
export class PrismTransition extends OpenXmlLeafElement {
  override readonly localName = "prism" as const;
  override readonly prefix = "p14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2010/main" as const;


  /** dir (:dir) */
  direction: StringValue | undefined;

  /** isContent (:isContent) */
  isContent: BooleanValue | undefined;

  /** isInverted (:isInverted) */
  isInverted: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "dir": this.direction = StringValue.parse(value); return;
      case "isContent": this.isContent = BooleanValue.parse(value); return;
      case "isInverted": this.isInverted = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.direction !== undefined) out.push(["dir", this.direction.toString()]);
    if (this.isContent !== undefined) out.push(["isContent", this.isContent.toString()]);
    if (this.isInverted !== undefined) out.push(["isInverted", this.isInverted.toString()]);
    return out;
  }

}
