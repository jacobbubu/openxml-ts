// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_model3d.json
// @see DocumentFormat.OpenXml.Drawing2017Model3d.OpenXmlPositiveRatioElement

import {
  OpenXmlLeafElement,
  UInt64Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the OpenXmlPositiveRatioElement Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class OpenXmlPositiveRatioElement extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** n (:n) */
  n: UInt64Value | undefined;

  /** d (:d) */
  d: UInt64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "n": this.n = UInt64Value.parse(value); return;
      case "d": this.d = UInt64Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.n !== undefined) out.push(["n", this.n.toString()]);
    if (this.d !== undefined) out.push(["d", this.d.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.n, { attribute: ":n", elementClass: "OpenXmlPositiveRatioElement" });
    assertRequired(this.d, { attribute: ":d", elementClass: "OpenXmlPositiveRatioElement" });
  }
}
