// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2006_wordml.json
// @see DocumentFormat.OpenXml.Word2006Wordml.MacroWllType

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the MacroWllType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class MacroWllType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


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
