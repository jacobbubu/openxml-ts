// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2016_SVG_main.json
// @see DocumentFormat.OpenXml.2016SVGMain.SVGBlip

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the SVGBlip Class.
 *
 * Element: `asvg:svgBlip` */
export class SVGBlip extends OpenXmlLeafElement {
  override readonly localName = "svgBlip" as const;
  override readonly prefix = "asvg" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2016/SVG/main" as const;


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

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.embed !== undefined) out.push(["r:embed", this.embed.toString()]);
    if (this.link !== undefined) out.push(["r:link", this.link.toString()]);
    return out;
  }

}
