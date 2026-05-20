// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_spreadsheetDrawing.json
// @see DocumentFormat.OpenXml.SpreadsheetDrawing.Position

import {
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Position.
 *
 * Element: `xdr:pos` */
export class Position extends OpenXmlLeafElement {
  override readonly localName = "pos" as const;
  override readonly prefix = "xdr" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" as const;


  /** X-Axis Coordinate (:x) */
  x: Int64Value | undefined;

  /** Y-Axis Coordinate (:y) */
  y: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "x": this.x = Int64Value.parse(value); assertNumber(this.x, { min: -27273042329600, max: 27273042316900 }, { attribute: ":x", elementClass: "Position" }); return;
      case "y": this.y = Int64Value.parse(value); assertNumber(this.y, { min: -27273042329600, max: 27273042316900 }, { attribute: ":y", elementClass: "Position" }); return;
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
    assertRequired(this.x, { attribute: ":x", elementClass: "Position" });
    assertRequired(this.y, { attribute: ":y", elementClass: "Position" });
  }
}
