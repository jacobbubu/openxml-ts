// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.AdjustPoint2DType

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the AdjustPoint2DType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class AdjustPoint2DType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** X-Coordinate (:x) */
  x: StringValue | undefined;

  /** Y-Coordinate (:y) */
  y: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":x": this.x = StringValue.parse(value); return;
      case ":y": this.y = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.x !== undefined) out.push([":x", this.x.toString()]);
    if (this.y !== undefined) out.push([":y", this.y.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.x, { attribute: ":x", elementClass: "AdjustPoint2DType" });
    assertRequired(this.y, { attribute: ":y", elementClass: "AdjustPoint2DType" });
  }
}
