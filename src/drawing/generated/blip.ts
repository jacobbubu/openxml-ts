// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Blip

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the Blip Class.
 *
 * Element: `a:blip` */
export class Blip extends OpenXmlCompositeElement {
  override readonly localName = "blip" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
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
