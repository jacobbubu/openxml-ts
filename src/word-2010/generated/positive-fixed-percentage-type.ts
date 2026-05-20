// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.PositiveFixedPercentageType

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the PositiveFixedPercentageType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class PositiveFixedPercentageType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** val (w14:val) */
  val: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:val": this.val = Int32Value.parse(value); assertNumber(this.val, { min: 0, max: 100000 }, { attribute: "w14:val", elementClass: "PositiveFixedPercentageType" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["w14:val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: "w14:val", elementClass: "PositiveFixedPercentageType" });
  }
}
