// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_webextensions_webextension_2010_11.json
// @see DocumentFormat.OpenXml.Webextension201011.Snapshot

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the Snapshot Class.
 *
 * Element: `we:snapshot` */
export class Snapshot extends OpenXmlCompositeElement {
  override readonly localName = "snapshot" as const;
  override readonly prefix = "we" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/webextensions/webextension/2010/11" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Embedded Picture Reference (r:embed) */
  embed: StringValue | undefined;

  /** Linked Picture Reference (r:link) */
  link: StringValue | undefined;

  /** Compression state for blips. (:cstate) */
  compressionState: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:embed": this.embed = StringValue.parse(value); return;
      case "r:link": this.link = StringValue.parse(value); return;
      case "cstate": this.compressionState = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.embed !== undefined) out.push(["r:embed", this.embed.toString()]);
    if (this.link !== undefined) out.push(["r:link", this.link.toString()]);
    if (this.compressionState !== undefined) out.push(["cstate", this.compressionState.toString()]);
    return out;
  }

}
