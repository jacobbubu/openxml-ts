// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.ArtisticPencilGrayscale

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Defines the ArtisticPencilGrayscale Class.
 *
 * Element: `a14:artisticPencilGrayscale` */
export class ArtisticPencilGrayscale extends OpenXmlLeafElement {
  override readonly localName = "artisticPencilGrayscale" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;


  /** trans (:trans) */
  transparancy: Int32Value | undefined;

  /** pencilSize (:pencilSize) */
  brushSize: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "trans": this.transparancy = Int32Value.parse(value); assertNumber(this.transparancy, { min: 0, max: 100000 }, { attribute: ":trans", elementClass: "ArtisticPencilGrayscale" }); return;
      case "pencilSize": this.brushSize = Int32Value.parse(value); assertNumber(this.brushSize, { min: 0, max: 100 }, { attribute: ":pencilSize", elementClass: "ArtisticPencilGrayscale" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.transparancy !== undefined) out.push(["trans", this.transparancy.toString()]);
    if (this.brushSize !== undefined) out.push(["pencilSize", this.brushSize.toString()]);
    return out;
  }

}
