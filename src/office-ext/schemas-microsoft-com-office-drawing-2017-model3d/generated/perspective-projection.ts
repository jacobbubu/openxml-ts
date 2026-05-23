// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_model3d.json
// @see DocumentFormat.OpenXml.Drawing2017Model3d.PerspectiveProjection

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the PerspectiveProjection Class.
 *
 * Element: `am3d:perspective` */
export class PerspectiveProjection extends OpenXmlCompositeElement {
  override readonly localName = "perspective" as const;
  override readonly prefix = "am3d" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2017/model3d" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** fov (:fov) */
  fov: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "fov": this.fov = Int32Value.parse(value); assertNumber(this.fov, { min: 0, max: 10800000 }, { attribute: ":fov", elementClass: "PerspectiveProjection" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.fov !== undefined) out.push(["fov", this.fov.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.fov, { attribute: ":fov", elementClass: "PerspectiveProjection" });
  }
}
