// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2015_wordml_symex.json
// @see DocumentFormat.OpenXml.2015WordmlSymex.SymEx

import {
  HexBinaryValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the SymEx Class.
 *
 * Element: `w16se:symEx` */
export class SymEx extends OpenXmlLeafElement {
  override readonly localName = "symEx" as const;
  override readonly prefix = "w16se" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2015/wordml/symex" as const;


  /** font (w16se:font) */
  font: StringValue | undefined;

  /** char (w16se:char) */
  char: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w16se:font": this.font = StringValue.parse(value); return;
      case "w16se:char": this.char = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.font !== undefined) out.push(["w16se:font", this.font.toString()]);
    if (this.char !== undefined) out.push(["w16se:char", this.char.toString()]);
    return out;
  }

}
