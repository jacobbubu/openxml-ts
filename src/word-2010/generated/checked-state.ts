// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.CheckedState

import {
  HexBinaryValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the CheckedState Class.
 *
 * Element: `w14:checkedState` */
export class CheckedState extends OpenXmlLeafElement {
  override readonly localName = "checkedState" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;


  /** font (w14:font) */
  font: StringValue | undefined;

  /** val (w14:val) */
  val: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:font": this.font = StringValue.parse(value); return;
      case "w14:val": this.val = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.font !== undefined) out.push(["w14:font", this.font.toString()]);
    if (this.val !== undefined) out.push(["w14:val", this.val.toString()]);
    return out;
  }

}
