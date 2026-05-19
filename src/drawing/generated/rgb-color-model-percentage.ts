// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.RgbColorModelPercentage

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertRequired,
} from "../../element/index.js";

/** RGB Color Model - Percentage Variant.
 *
 * Element: `a:scrgbClr` */
export class RgbColorModelPercentage extends OpenXmlCompositeElement {
  override readonly localName = "scrgbClr" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Red (:r) */
  redPortion: Int32Value | undefined;

  /** Green (:g) */
  greenPortion: Int32Value | undefined;

  /** Blue (:b) */
  bluePortion: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r": this.redPortion = Int32Value.parse(value); return;
      case "g": this.greenPortion = Int32Value.parse(value); return;
      case "b": this.bluePortion = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.redPortion !== undefined) out.push(["r", this.redPortion.toString()]);
    if (this.greenPortion !== undefined) out.push(["g", this.greenPortion.toString()]);
    if (this.bluePortion !== undefined) out.push(["b", this.bluePortion.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.redPortion, { attribute: ":r", elementClass: "RgbColorModelPercentage" });
    assertRequired(this.greenPortion, { attribute: ":g", elementClass: "RgbColorModelPercentage" });
    assertRequired(this.bluePortion, { attribute: ":b", elementClass: "RgbColorModelPercentage" });
  }
}
