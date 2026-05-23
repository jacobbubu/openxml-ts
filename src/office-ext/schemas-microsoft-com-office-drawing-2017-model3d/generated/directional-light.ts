// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_model3d.json
// @see DocumentFormat.OpenXml.Drawing2017Model3d.DirectionalLight

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the DirectionalLight Class.
 *
 * Element: `am3d:dirLight` */
export class DirectionalLight extends OpenXmlCompositeElement {
  override readonly localName = "dirLight" as const;
  override readonly prefix = "am3d" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2017/model3d" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** enabled (:enabled) */
  enabled: BooleanValue | undefined;

  /** angularRad (:angularRad) */
  angularRad: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "enabled": this.enabled = BooleanValue.parse(value); return;
      case "angularRad": this.angularRad = Int32Value.parse(value); assertNumber(this.angularRad, { min: 0, max: 5400000 }, { attribute: ":angularRad", elementClass: "DirectionalLight" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.enabled !== undefined) out.push(["enabled", this.enabled.toString()]);
    if (this.angularRad !== undefined) out.push(["angularRad", this.angularRad.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.angularRad, { attribute: ":angularRad", elementClass: "DirectionalLight" });
  }
}
