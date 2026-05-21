// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2017_3_main.json
// @see DocumentFormat.OpenXml.20173Main.Track

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the Track Class.
 *
 * Element: `p173:track` */
export class Track extends OpenXmlLeafElement {
  override readonly localName = "track" as const;
  override readonly prefix = "p173" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2017/3/main" as const;


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
