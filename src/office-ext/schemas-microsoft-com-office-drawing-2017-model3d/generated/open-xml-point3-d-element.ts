// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_model3d.json
// @see DocumentFormat.OpenXml.Drawing2017Model3d.OpenXmlPoint3DElement

import {
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the OpenXmlPoint3DElement Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class OpenXmlPoint3DElement extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** X-Coordinate in 3D (:x) */
  x: Int64Value | undefined;

  /** Y-Coordinate in 3D (:y) */
  y: Int64Value | undefined;

  /** Z-Coordinate in 3D (:z) */
  z: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "x": this.x = Int64Value.parse(value); assertNumber(this.x, { min: -27273042329600, max: 27273042316900 }, { attribute: ":x", elementClass: "OpenXmlPoint3DElement" }); return;
      case "y": this.y = Int64Value.parse(value); assertNumber(this.y, { min: -27273042329600, max: 27273042316900 }, { attribute: ":y", elementClass: "OpenXmlPoint3DElement" }); return;
      case "z": this.z = Int64Value.parse(value); assertNumber(this.z, { min: -27273042329600, max: 27273042316900 }, { attribute: ":z", elementClass: "OpenXmlPoint3DElement" }); return;
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
    assertRequired(this.x, { attribute: ":x", elementClass: "OpenXmlPoint3DElement" });
    assertRequired(this.y, { attribute: ":y", elementClass: "OpenXmlPoint3DElement" });
    assertRequired(this.z, { attribute: ":z", elementClass: "OpenXmlPoint3DElement" });
  }
}
