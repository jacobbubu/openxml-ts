// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.RandomIdType

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the RandomIdType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class RandomIdType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** val (:val) */
  val: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: ":val", elementClass: "RandomIdType" });
  }
}
