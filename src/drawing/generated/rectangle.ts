// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Rectangle

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Shape Text Rectangle.
 *
 * Element: `a:rect` */
export class Rectangle extends OpenXmlLeafElement {
  override readonly localName = "rect" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Left (:l) */
  left: StringValue | undefined;

  /** Top (:t) */
  top: StringValue | undefined;

  /** Right (:r) */
  right: StringValue | undefined;

  /** Bottom Position (:b) */
  bottom: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "l": this.left = StringValue.parse(value); return;
      case "t": this.top = StringValue.parse(value); return;
      case "r": this.right = StringValue.parse(value); return;
      case "b": this.bottom = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.left !== undefined) out.push(["l", this.left.toString()]);
    if (this.top !== undefined) out.push(["t", this.top.toString()]);
    if (this.right !== undefined) out.push(["r", this.right.toString()]);
    if (this.bottom !== undefined) out.push(["b", this.bottom.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.left, { attribute: ":l", elementClass: "Rectangle" });
    assertRequired(this.top, { attribute: ":t", elementClass: "Rectangle" });
    assertRequired(this.right, { attribute: ":r", elementClass: "Rectangle" });
    assertRequired(this.bottom, { attribute: ":b", elementClass: "Rectangle" });
  }
}
