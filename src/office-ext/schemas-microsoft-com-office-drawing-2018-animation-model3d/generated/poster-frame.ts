// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2018_animation_model3d.json
// @see DocumentFormat.OpenXml.2018AnimationModel3d.PosterFrame

import {
  Int32Value,
  OpenXmlLeafElement,
  UInt32Value,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the PosterFrame Class.
 *
 * Element: `a3danim:posterFrame` */
export class PosterFrame extends OpenXmlLeafElement {
  override readonly localName = "posterFrame" as const;
  override readonly prefix = "a3danim" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2018/animation/model3d" as const;


  /** animId (:animId) */
  animId: UInt32Value | undefined;

  /** frame (:frame) */
  frame: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "animId": this.animId = UInt32Value.parse(value); return;
      case "frame": this.frame = Int32Value.parse(value); assertNumber(this.frame, { min: 0, max: 100000 }, { attribute: ":frame", elementClass: "PosterFrame" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.animId !== undefined) out.push(["animId", this.animId.toString()]);
    if (this.frame !== undefined) out.push(["frame", this.frame.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.animId, { attribute: ":animId", elementClass: "PosterFrame" });
  }
}
