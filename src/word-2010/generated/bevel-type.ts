// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.BevelType

import {
  Int64Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Defines the BevelType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class BevelType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** w (w14:w) */
  width: Int64Value | undefined;

  /** h (w14:h) */
  height: Int64Value | undefined;

  /** prst (w14:prst) */
  presetProfileType: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:w": this.width = Int64Value.parse(value); assertNumber(this.width, { min: 0, max: 2147483647 }, { attribute: "w14:w", elementClass: "BevelType" }); return;
      case "w14:h": this.height = Int64Value.parse(value); assertNumber(this.height, { min: 0, max: 2147483647 }, { attribute: "w14:h", elementClass: "BevelType" }); return;
      case "w14:prst": this.presetProfileType = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.width !== undefined) out.push(["w14:w", this.width.toString()]);
    if (this.height !== undefined) out.push(["w14:h", this.height.toString()]);
    if (this.presetProfileType !== undefined) out.push(["w14:prst", this.presetProfileType.toString()]);
    return out;
  }

}
