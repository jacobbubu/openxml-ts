// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2018_animation_model3d.json
// @see DocumentFormat.OpenXml.2018AnimationModel3d.EmbeddedAnimation

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the EmbeddedAnimation Class.
 *
 * Element: `a3danim:embedAnim` */
export class EmbeddedAnimation extends OpenXmlCompositeElement {
  override readonly localName = "embedAnim" as const;
  override readonly prefix = "a3danim" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2018/animation/model3d" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** animId (:animId) */
  animId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "animId": this.animId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.animId !== undefined) out.push(["animId", this.animId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.animId, { attribute: ":animId", elementClass: "EmbeddedAnimation" });
  }
}
