// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_wordprocessingDrawing.json
// @see DocumentFormat.OpenXml.WordprocessingDrawing.HorizontalPosition

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Horizontal Positioning.
 *
 * Element: `wp:positionH` */
export class HorizontalPosition extends OpenXmlCompositeElement {
  override readonly localName = "positionH" as const;
  override readonly prefix = "wp" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Horizontal Position Relative Base (:relativeFrom) */
  relativeFrom: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "relativeFrom": this.relativeFrom = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.relativeFrom !== undefined) out.push(["relativeFrom", this.relativeFrom.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.relativeFrom, { attribute: ":relativeFrom", elementClass: "HorizontalPosition" });
  }
}
