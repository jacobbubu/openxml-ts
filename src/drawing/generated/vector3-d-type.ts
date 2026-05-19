// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Vector3DType

import {
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the Vector3DType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class Vector3DType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** Distance along X-axis in 3D (:dx) */
  dx: Int64Value | undefined;

  /** Distance along Y-axis in 3D (:dy) */
  dy: Int64Value | undefined;

  /** Distance along Z-axis in 3D (:dz) */
  dz: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "dx": this.dx = Int64Value.parse(value); assertNumber(this.dx, { min: -27273042329600, max: 27273042316900 }, { attribute: ":dx", elementClass: "Vector3DType" }); return;
      case "dy": this.dy = Int64Value.parse(value); assertNumber(this.dy, { min: -27273042329600, max: 27273042316900 }, { attribute: ":dy", elementClass: "Vector3DType" }); return;
      case "dz": this.dz = Int64Value.parse(value); assertNumber(this.dz, { min: -27273042329600, max: 27273042316900 }, { attribute: ":dz", elementClass: "Vector3DType" }); return;
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
    assertRequired(this.dx, { attribute: ":dx", elementClass: "Vector3DType" });
    assertRequired(this.dy, { attribute: ":dy", elementClass: "Vector3DType" });
    assertRequired(this.dz, { attribute: ":dz", elementClass: "Vector3DType" });
  }
}
