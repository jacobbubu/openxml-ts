// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_wordprocessingDrawing.json
// @see DocumentFormat.OpenXml.WordprocessingDrawing.WrapThrough

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Through Wrapping.
 *
 * Element: `wp:wrapThrough` */
export class WrapThrough extends OpenXmlCompositeElement {
  override readonly localName = "wrapThrough" as const;
  override readonly prefix = "wp" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Text Wrapping Location (:wrapText) */
  wrapText: StringValue | undefined;

  /** Distance From Text on Left Edge (:distL) */
  distanceFromLeft: UInt32Value | undefined;

  /** Distance From Text on Right Edge (:distR) */
  distanceFromRight: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "wrapText": this.wrapText = StringValue.parse(value); return;
      case "distL": this.distanceFromLeft = UInt32Value.parse(value); return;
      case "distR": this.distanceFromRight = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.wrapText !== undefined) out.push(["wrapText", this.wrapText.toString()]);
    if (this.distanceFromLeft !== undefined) out.push(["distL", this.distanceFromLeft.toString()]);
    if (this.distanceFromRight !== undefined) out.push(["distR", this.distanceFromRight.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.wrapText, { attribute: ":wrapText", elementClass: "WrapThrough" });
  }
}
