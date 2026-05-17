// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.HslColor

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Hue, Saturation, Luminance Color Model.
 *
 * Element: `a:hslClr` */
export class HslColor extends OpenXmlCompositeElement {
  override readonly localName = "hslClr" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Hue (:hue) */
  hueValue: Int32Value | undefined;

  /** Saturation (:sat) */
  satValue: Int32Value | undefined;

  /** Luminance (:lum) */
  lumValue: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":hue": this.hueValue = Int32Value.parse(value); assertNumber(this.hueValue, { min: 0 }, { attribute: ":hue", elementClass: "HslColor" }); return;
      case ":sat": this.satValue = Int32Value.parse(value); return;
      case ":lum": this.lumValue = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.hueValue !== undefined) out.push([":hue", this.hueValue.toString()]);
    if (this.satValue !== undefined) out.push([":sat", this.satValue.toString()]);
    if (this.lumValue !== undefined) out.push([":lum", this.lumValue.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.hueValue, { attribute: ":hue", elementClass: "HslColor" });
    assertRequired(this.satValue, { attribute: ":sat", elementClass: "HslColor" });
    assertRequired(this.lumValue, { attribute: ":lum", elementClass: "HslColor" });
  }
}
