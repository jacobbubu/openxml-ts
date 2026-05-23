// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_model3d.json
// @see DocumentFormat.OpenXml.Drawing2017Model3d.PosPoint3D

import {
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the PosPoint3D Class.
 *
 * Element: `am3d:pos` */
export class PosPoint3D extends OpenXmlLeafElement {
  override readonly localName = "pos" as const;
  override readonly prefix = "am3d" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2017/model3d" as const;


  /** X-Coordinate in 3D (:x) */
  x: Int64Value | undefined;

  /** Y-Coordinate in 3D (:y) */
  y: Int64Value | undefined;

  /** Z-Coordinate in 3D (:z) */
  z: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "x": this.x = Int64Value.parse(value); assertNumber(this.x, { min: -27273042329600, max: 27273042316900 }, { attribute: ":x", elementClass: "PosPoint3D" }); return;
      case "y": this.y = Int64Value.parse(value); assertNumber(this.y, { min: -27273042329600, max: 27273042316900 }, { attribute: ":y", elementClass: "PosPoint3D" }); return;
      case "z": this.z = Int64Value.parse(value); assertNumber(this.z, { min: -27273042329600, max: 27273042316900 }, { attribute: ":z", elementClass: "PosPoint3D" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.x !== undefined) out.push(["x", this.x.toString()]);
    if (this.y !== undefined) out.push(["y", this.y.toString()]);
    if (this.z !== undefined) out.push(["z", this.z.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.x, { attribute: ":x", elementClass: "PosPoint3D" });
    assertRequired(this.y, { attribute: ":y", elementClass: "PosPoint3D" });
    assertRequired(this.z, { attribute: ":z", elementClass: "PosPoint3D" });
  }
}
