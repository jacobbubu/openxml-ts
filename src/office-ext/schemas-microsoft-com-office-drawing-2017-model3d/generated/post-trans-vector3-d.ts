// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_model3d.json
// @see DocumentFormat.OpenXml.Drawing2017Model3d.PostTransVector3D

import {
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the PostTransVector3D Class.
 *
 * Element: `am3d:postTrans` */
export class PostTransVector3D extends OpenXmlLeafElement {
  override readonly localName = "postTrans" as const;
  override readonly prefix = "am3d" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2017/model3d" as const;


  /** Distance along X-axis in 3D (:dx) */
  dx: Int64Value | undefined;

  /** Distance along Y-axis in 3D (:dy) */
  dy: Int64Value | undefined;

  /** Distance along Z-axis in 3D (:dz) */
  dz: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "dx": this.dx = Int64Value.parse(value); assertNumber(this.dx, { min: -27273042329600, max: 27273042316900 }, { attribute: ":dx", elementClass: "PostTransVector3D" }); return;
      case "dy": this.dy = Int64Value.parse(value); assertNumber(this.dy, { min: -27273042329600, max: 27273042316900 }, { attribute: ":dy", elementClass: "PostTransVector3D" }); return;
      case "dz": this.dz = Int64Value.parse(value); assertNumber(this.dz, { min: -27273042329600, max: 27273042316900 }, { attribute: ":dz", elementClass: "PostTransVector3D" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.dx !== undefined) out.push(["dx", this.dx.toString()]);
    if (this.dy !== undefined) out.push(["dy", this.dy.toString()]);
    if (this.dz !== undefined) out.push(["dz", this.dz.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.dx, { attribute: ":dx", elementClass: "PostTransVector3D" });
    assertRequired(this.dy, { attribute: ":dy", elementClass: "PostTransVector3D" });
    assertRequired(this.dz, { attribute: ":dz", elementClass: "PostTransVector3D" });
  }
}
