// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2006_wordml.json
// @see DocumentFormat.OpenXml.Word2006Wordml.Mcd

import {
  HexBinaryValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the Mcd Class.
 *
 * Element: `wne:mcd` */
export class Mcd extends OpenXmlLeafElement {
  override readonly localName = "mcd" as const;
  override readonly prefix = "wne" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2006/wordml" as const;


  /** macroName (wne:macroName) */
  macroName: StringValue | undefined;

  /** name (wne:name) */
  name: StringValue | undefined;

  /** menuHelp (wne:menuHelp) */
  menuHelp: StringValue | undefined;

  /** bEncrypt (wne:bEncrypt) */
  bEncrypt: HexBinaryValue | undefined;

  /** cmg (wne:cmg) */
  cmg: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "wne:macroName": this.macroName = StringValue.parse(value); return;
      case "wne:name": this.name = StringValue.parse(value); return;
      case "wne:menuHelp": this.menuHelp = StringValue.parse(value); return;
      case "wne:bEncrypt": this.bEncrypt = HexBinaryValue.parse(value); return;
      case "wne:cmg": this.cmg = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.macroName !== undefined) out.push(["wne:macroName", this.macroName.toString()]);
    if (this.name !== undefined) out.push(["wne:name", this.name.toString()]);
    if (this.menuHelp !== undefined) out.push(["wne:menuHelp", this.menuHelp.toString()]);
    if (this.bEncrypt !== undefined) out.push(["wne:bEncrypt", this.bEncrypt.toString()]);
    if (this.cmg !== undefined) out.push(["wne:cmg", this.cmg.toString()]);
    return out;
  }

}
