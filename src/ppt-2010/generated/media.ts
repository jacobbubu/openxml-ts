// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.Media

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the Media Class.
 *
 * Element: `p14:media` */
export class Media extends OpenXmlCompositeElement {
  override readonly localName = "media" as const;
  override readonly prefix = "p14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2010/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Embedded Picture Reference (r:embed) */
  embed: StringValue | undefined;

  /** Linked Picture Reference (r:link) */
  link: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:embed": this.embed = StringValue.parse(value); return;
      case "r:link": this.link = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.embed !== undefined) out.push(["r:embed", this.embed.toString()]);
    if (this.link !== undefined) out.push(["r:link", this.link.toString()]);
    return out;
  }

}
