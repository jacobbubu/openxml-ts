// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.ArtisticCement

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Defines the ArtisticCement Class.
 *
 * Element: `a14:artisticCement` */
export class ArtisticCement extends OpenXmlLeafElement {
  override readonly localName = "artisticCement" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;


  /** trans (:trans) */
  transparancy: Int32Value | undefined;

  /** crackSpacing (:crackSpacing) */
  crackSpacing: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "trans": this.transparancy = Int32Value.parse(value); assertNumber(this.transparancy, { min: 0, max: 100000 }, { attribute: ":trans", elementClass: "ArtisticCement" }); return;
      case "crackSpacing": this.crackSpacing = Int32Value.parse(value); assertNumber(this.crackSpacing, { min: 0, max: 100 }, { attribute: ":crackSpacing", elementClass: "ArtisticCement" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.transparancy !== undefined) out.push(["trans", this.transparancy.toString()]);
    if (this.crackSpacing !== undefined) out.push(["crackSpacing", this.crackSpacing.toString()]);
    return out;
  }

}
