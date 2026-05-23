// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordprocessingShape.json
// @see DocumentFormat.OpenXml.Word2010WordprocessingShape.WordprocessingShape

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../../element/index.js";

/** Defines the WordprocessingShape Class.
 *
 * Element: `wps:wsp` */
export class WordprocessingShape extends OpenXmlCompositeElement {
  override readonly localName = "wsp" as const;
  override readonly prefix = "wps" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** normalEastAsianFlow (:normalEastAsianFlow) */
  normalEastAsianFlow: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "normalEastAsianFlow": this.normalEastAsianFlow = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.normalEastAsianFlow !== undefined) out.push(["normalEastAsianFlow", this.normalEastAsianFlow.toString()]);
    return out;
  }

}
