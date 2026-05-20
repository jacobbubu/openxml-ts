// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.Glow

import {
  Int64Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
} from "../../element/index.js";

/** Defines the Glow Class.
 *
 * Element: `w14:glow` */
export class Glow extends OpenXmlCompositeElement {
  override readonly localName = "glow" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** rad (w14:rad) */
  glowRadius: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:rad": this.glowRadius = Int64Value.parse(value); assertNumber(this.glowRadius, { min: 0, max: 2147483647 }, { attribute: "w14:rad", elementClass: "Glow" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.glowRadius !== undefined) out.push(["w14:rad", this.glowRadius.toString()]);
    return out;
  }

}
