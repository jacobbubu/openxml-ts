// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2018_8_main.json
// @see DocumentFormat.OpenXml.20188Main.Point2DType

import {
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Point2DType Class.
 *
 * Element: `p188:pos` */
export class Point2DType extends OpenXmlLeafElement {
  override readonly localName = "pos" as const;
  override readonly prefix = "p188" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2018/8/main" as const;


  /** X-Axis Coordinate (:x) */
  x: Int64Value | undefined;

  /** Y-Axis Coordinate (:y) */
  y: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "x": this.x = Int64Value.parse(value); assertNumber(this.x, { min: -27273042329600, max: 27273042316900 }, { attribute: ":x", elementClass: "Point2DType" }); return;
      case "y": this.y = Int64Value.parse(value); assertNumber(this.y, { min: -27273042329600, max: 27273042316900 }, { attribute: ":y", elementClass: "Point2DType" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.x !== undefined) out.push(["x", this.x.toString()]);
    if (this.y !== undefined) out.push(["y", this.y.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.x, { attribute: ":x", elementClass: "Point2DType" });
    assertRequired(this.y, { attribute: ":y", elementClass: "Point2DType" });
  }
}
