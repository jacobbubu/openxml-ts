// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2006_wordml.json
// @see DocumentFormat.OpenXml.Word2006Wordml.AcceleratorKeymapType

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the AcceleratorKeymapType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class AcceleratorKeymapType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** acdName (wne:acdName) */
  acceleratorName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "wne:acdName": this.acceleratorName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.acceleratorName !== undefined) out.push(["wne:acdName", this.acceleratorName.toString()]);
    return out;
  }

}
