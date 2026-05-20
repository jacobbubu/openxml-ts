// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.LinearShadeProperties

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Defines the LinearShadeProperties Class.
 *
 * Element: `w14:lin` */
export class LinearShadeProperties extends OpenXmlLeafElement {
  override readonly localName = "lin" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;


  /** ang (w14:ang) */
  angle: Int32Value | undefined;

  /** scaled (w14:scaled) */
  scaled: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:ang": this.angle = Int32Value.parse(value); assertNumber(this.angle, { min: 0 }, { attribute: "w14:ang", elementClass: "LinearShadeProperties" }); return;
      case "w14:scaled": this.scaled = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.angle !== undefined) out.push(["w14:ang", this.angle.toString()]);
    if (this.scaled !== undefined) out.push(["w14:scaled", this.scaled.toString()]);
    return out;
  }

}
