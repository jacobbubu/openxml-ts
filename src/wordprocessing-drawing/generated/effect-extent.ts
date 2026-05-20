// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_wordprocessingDrawing.json
// @see DocumentFormat.OpenXml.WordprocessingDrawing.EffectExtent

import {
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Object Extents Including Effects.
 *
 * Element: `wp:effectExtent` */
export class EffectExtent extends OpenXmlLeafElement {
  override readonly localName = "effectExtent" as const;
  override readonly prefix = "wp" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" as const;


  /** Additional Extent on Left Edge (:l) */
  leftEdge: Int64Value | undefined;

  /** Additional Extent on Top Edge (:t) */
  topEdge: Int64Value | undefined;

  /** Additional Extent on Right Edge (:r) */
  rightEdge: Int64Value | undefined;

  /** Additional Extent on Bottom Edge (:b) */
  bottomEdge: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "l": this.leftEdge = Int64Value.parse(value); assertNumber(this.leftEdge, { min: -27273042329600, max: 27273042316900 }, { attribute: ":l", elementClass: "EffectExtent" }); return;
      case "t": this.topEdge = Int64Value.parse(value); assertNumber(this.topEdge, { min: -27273042329600, max: 27273042316900 }, { attribute: ":t", elementClass: "EffectExtent" }); return;
      case "r": this.rightEdge = Int64Value.parse(value); assertNumber(this.rightEdge, { min: -27273042329600, max: 27273042316900 }, { attribute: ":r", elementClass: "EffectExtent" }); return;
      case "b": this.bottomEdge = Int64Value.parse(value); assertNumber(this.bottomEdge, { min: -27273042329600, max: 27273042316900 }, { attribute: ":b", elementClass: "EffectExtent" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.leftEdge !== undefined) out.push(["l", this.leftEdge.toString()]);
    if (this.topEdge !== undefined) out.push(["t", this.topEdge.toString()]);
    if (this.rightEdge !== undefined) out.push(["r", this.rightEdge.toString()]);
    if (this.bottomEdge !== undefined) out.push(["b", this.bottomEdge.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.leftEdge, { attribute: ":l", elementClass: "EffectExtent" });
    assertRequired(this.topEdge, { attribute: ":t", elementClass: "EffectExtent" });
    assertRequired(this.rightEdge, { attribute: ":r", elementClass: "EffectExtent" });
    assertRequired(this.bottomEdge, { attribute: ":b", elementClass: "EffectExtent" });
  }
}
