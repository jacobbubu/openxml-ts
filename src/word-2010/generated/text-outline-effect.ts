// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.TextOutlineEffect

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Defines the TextOutlineEffect Class.
 *
 * Element: `w14:textOutline` */
export class TextOutlineEffect extends OpenXmlCompositeElement {
  override readonly localName = "textOutline" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** w (w14:w) */
  lineWidth: Int32Value | undefined;

  /** cap (w14:cap) */
  capType: StringValue | undefined;

  /** cmpd (w14:cmpd) */
  compound: StringValue | undefined;

  /** algn (w14:algn) */
  alignment: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:w": this.lineWidth = Int32Value.parse(value); assertNumber(this.lineWidth, { min: 0, max: 20116800 }, { attribute: "w14:w", elementClass: "TextOutlineEffect" }); return;
      case "w14:cap": this.capType = StringValue.parse(value); return;
      case "w14:cmpd": this.compound = StringValue.parse(value); return;
      case "w14:algn": this.alignment = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.lineWidth !== undefined) out.push(["w14:w", this.lineWidth.toString()]);
    if (this.capType !== undefined) out.push(["w14:cap", this.capType.toString()]);
    if (this.compound !== undefined) out.push(["w14:cmpd", this.compound.toString()]);
    if (this.alignment !== undefined) out.push(["w14:algn", this.alignment.toString()]);
    return out;
  }

}
