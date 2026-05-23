// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_model3d.json
// @see DocumentFormat.OpenXml.Drawing2017Model3d.SpotLight

import {
  BooleanValue,
  Int32Value,
  Int64Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the SpotLight Class.
 *
 * Element: `am3d:spotLight` */
export class SpotLight extends OpenXmlCompositeElement {
  override readonly localName = "spotLight" as const;
  override readonly prefix = "am3d" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2017/model3d" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** enabled (:enabled) */
  enabled: BooleanValue | undefined;

  /** rad (:rad) */
  rad: Int64Value | undefined;

  /** spotAng (:spotAng) */
  spotAng: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "enabled": this.enabled = BooleanValue.parse(value); return;
      case "rad": this.rad = Int64Value.parse(value); assertNumber(this.rad, { min: 0, max: 2147483647 }, { attribute: ":rad", elementClass: "SpotLight" }); return;
      case "spotAng": this.spotAng = Int32Value.parse(value); assertNumber(this.spotAng, { min: 0, max: 10800000 }, { attribute: ":spotAng", elementClass: "SpotLight" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.enabled !== undefined) out.push(["enabled", this.enabled.toString()]);
    if (this.rad !== undefined) out.push(["rad", this.rad.toString()]);
    if (this.spotAng !== undefined) out.push(["spotAng", this.spotAng.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.rad, { attribute: ":rad", elementClass: "SpotLight" });
    assertRequired(this.spotAng, { attribute: ":spotAng", elementClass: "SpotLight" });
  }
}
