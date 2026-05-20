// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.MediaFade

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the MediaFade Class.
 *
 * Element: `p14:fade` */
export class MediaFade extends OpenXmlLeafElement {
  override readonly localName = "fade" as const;
  override readonly prefix = "p14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2010/main" as const;


  /** in (:in) */
  inDuration: StringValue | undefined;

  /** out (:out) */
  outDuration: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "in": this.inDuration = StringValue.parse(value); return;
      case "out": this.outDuration = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.inDuration !== undefined) out.push(["in", this.inDuration.toString()]);
    if (this.outDuration !== undefined) out.push(["out", this.outDuration.toString()]);
    return out;
  }

}
