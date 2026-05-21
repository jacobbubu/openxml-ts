// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2006_wordml.json
// @see DocumentFormat.OpenXml.Word2006Wordml.FixedCommandKeyboardCustomization

import {
  HexBinaryValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the FixedCommandKeyboardCustomization Class.
 *
 * Element: `wne:fci` */
export class FixedCommandKeyboardCustomization extends OpenXmlLeafElement {
  override readonly localName = "fci" as const;
  override readonly prefix = "wne" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2006/wordml" as const;


  /** fciName (wne:fciName) */
  commandName: StringValue | undefined;

  /** fciIndex (wne:fciIndex) */
  commandIndex: HexBinaryValue | undefined;

  /** swArg (wne:swArg) */
  argument: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "wne:fciName": this.commandName = StringValue.parse(value); return;
      case "wne:fciIndex": this.commandIndex = HexBinaryValue.parse(value); return;
      case "wne:swArg": this.argument = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.commandName !== undefined) out.push(["wne:fciName", this.commandName.toString()]);
    if (this.commandIndex !== undefined) out.push(["wne:fciIndex", this.commandIndex.toString()]);
    if (this.argument !== undefined) out.push(["wne:swArg", this.argument.toString()]);
    return out;
  }

}
