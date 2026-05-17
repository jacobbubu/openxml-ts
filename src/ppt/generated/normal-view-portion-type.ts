// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.NormalViewPortionType

import {
  BooleanValue,
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the NormalViewPortionType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class NormalViewPortionType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** Normal View Dimension Size (:sz) */
  size: Int32Value | undefined;

  /** Auto Adjust Normal View (:autoAdjust) */
  autoAdjust: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":sz": this.size = Int32Value.parse(value); assertNumber(this.size, { min: 0, max: 100000 }, { attribute: ":sz", elementClass: "NormalViewPortionType" }); return;
      case ":autoAdjust": this.autoAdjust = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.size !== undefined) out.push([":sz", this.size.toString()]);
    if (this.autoAdjust !== undefined) out.push([":autoAdjust", this.autoAdjust.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.size, { attribute: ":sz", elementClass: "NormalViewPortionType" });
  }
}
