// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.ArtisticBlur

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Defines the ArtisticBlur Class.
 *
 * Element: `a14:artisticBlur` */
export class ArtisticBlur extends OpenXmlLeafElement {
  override readonly localName = "artisticBlur" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;


  /** radius (:radius) */
  radius: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "radius": this.radius = Int32Value.parse(value); assertNumber(this.radius, { min: 0, max: 100 }, { attribute: ":radius", elementClass: "ArtisticBlur" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.radius !== undefined) out.push(["radius", this.radius.toString()]);
    return out;
  }

}
