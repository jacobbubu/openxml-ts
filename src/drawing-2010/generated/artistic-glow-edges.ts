// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.ArtisticGlowEdges

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Defines the ArtisticGlowEdges Class.
 *
 * Element: `a14:artisticGlowEdges` */
export class ArtisticGlowEdges extends OpenXmlLeafElement {
  override readonly localName = "artisticGlowEdges" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;


  /** trans (:trans) */
  transparancy: Int32Value | undefined;

  /** smoothness (:smoothness) */
  smoothness: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "trans": this.transparancy = Int32Value.parse(value); assertNumber(this.transparancy, { min: 0, max: 100000 }, { attribute: ":trans", elementClass: "ArtisticGlowEdges" }); return;
      case "smoothness": this.smoothness = Int32Value.parse(value); assertNumber(this.smoothness, { min: 0, max: 10 }, { attribute: ":smoothness", elementClass: "ArtisticGlowEdges" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.transparancy !== undefined) out.push(["trans", this.transparancy.toString()]);
    if (this.smoothness !== undefined) out.push(["smoothness", this.smoothness.toString()]);
    return out;
  }

}
