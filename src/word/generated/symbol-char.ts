// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.SymbolChar

import {
  HexBinaryValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Symbol Character.
 *
 * Element: `w:sym` */
export class SymbolChar extends OpenXmlLeafElement {
  override readonly localName = "sym" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Symbol Character Font (w:font) */
  font: StringValue | undefined;

  /** Symbol Character Code (w:char) */
  char: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:font": this.font = StringValue.parse(value); return;
      case "w:char": this.char = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.font !== undefined) out.push(["w:font", this.font.toString()]);
    if (this.char !== undefined) out.push(["w:char", this.char.toString()]);
    return out;
  }
}
