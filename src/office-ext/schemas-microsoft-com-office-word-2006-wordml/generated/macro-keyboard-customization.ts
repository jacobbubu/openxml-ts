// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2006_wordml.json
// @see DocumentFormat.OpenXml.Word2006Wordml.MacroKeyboardCustomization

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the MacroKeyboardCustomization Class.
 *
 * Element: `wne:macro` */
export class MacroKeyboardCustomization extends OpenXmlLeafElement {
  override readonly localName = "macro" as const;
  override readonly prefix = "wne" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2006/wordml" as const;


  /** macroName (wne:macroName) */
  macroName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "wne:macroName": this.macroName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.macroName !== undefined) out.push(["wne:macroName", this.macroName.toString()]);
    return out;
  }

}
