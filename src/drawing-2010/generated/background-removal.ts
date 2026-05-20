// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.BackgroundRemoval

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the BackgroundRemoval Class.
 *
 * Element: `a14:backgroundRemoval` */
export class BackgroundRemoval extends OpenXmlCompositeElement {
  override readonly localName = "backgroundRemoval" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** t (:t) */
  marqueeTop: Int32Value | undefined;

  /** b (:b) */
  marqueeBottom: Int32Value | undefined;

  /** l (:l) */
  marqueeLeft: Int32Value | undefined;

  /** r (:r) */
  marqueeRight: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "t": this.marqueeTop = Int32Value.parse(value); assertNumber(this.marqueeTop, { min: 0, max: 100000 }, { attribute: ":t", elementClass: "BackgroundRemoval" }); return;
      case "b": this.marqueeBottom = Int32Value.parse(value); assertNumber(this.marqueeBottom, { min: 0, max: 100000 }, { attribute: ":b", elementClass: "BackgroundRemoval" }); return;
      case "l": this.marqueeLeft = Int32Value.parse(value); assertNumber(this.marqueeLeft, { min: 0, max: 100000 }, { attribute: ":l", elementClass: "BackgroundRemoval" }); return;
      case "r": this.marqueeRight = Int32Value.parse(value); assertNumber(this.marqueeRight, { min: 0, max: 100000 }, { attribute: ":r", elementClass: "BackgroundRemoval" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.marqueeTop !== undefined) out.push(["t", this.marqueeTop.toString()]);
    if (this.marqueeBottom !== undefined) out.push(["b", this.marqueeBottom.toString()]);
    if (this.marqueeLeft !== undefined) out.push(["l", this.marqueeLeft.toString()]);
    if (this.marqueeRight !== undefined) out.push(["r", this.marqueeRight.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.marqueeTop, { attribute: ":t", elementClass: "BackgroundRemoval" });
    assertRequired(this.marqueeBottom, { attribute: ":b", elementClass: "BackgroundRemoval" });
    assertRequired(this.marqueeLeft, { attribute: ":l", elementClass: "BackgroundRemoval" });
    assertRequired(this.marqueeRight, { attribute: ":r", elementClass: "BackgroundRemoval" });
  }
}
