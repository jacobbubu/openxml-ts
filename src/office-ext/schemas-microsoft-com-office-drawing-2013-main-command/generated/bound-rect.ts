// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.BoundRect

import {
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the BoundRect Class.
 *
 * Element: `oac:bounds` */
export class BoundRect extends OpenXmlLeafElement {
  override readonly localName = "bounds" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;


  /** l (:l) */
  l: Int64Value | undefined;

  /** t (:t) */
  t: Int64Value | undefined;

  /** r (:r) */
  r: Int64Value | undefined;

  /** b (:b) */
  b: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "l": this.l = Int64Value.parse(value); assertNumber(this.l, { min: -27273042329600, max: 27273042316900 }, { attribute: ":l", elementClass: "BoundRect" }); return;
      case "t": this.t = Int64Value.parse(value); assertNumber(this.t, { min: -27273042329600, max: 27273042316900 }, { attribute: ":t", elementClass: "BoundRect" }); return;
      case "r": this.r = Int64Value.parse(value); assertNumber(this.r, { min: -27273042329600, max: 27273042316900 }, { attribute: ":r", elementClass: "BoundRect" }); return;
      case "b": this.b = Int64Value.parse(value); assertNumber(this.b, { min: -27273042329600, max: 27273042316900 }, { attribute: ":b", elementClass: "BoundRect" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.l !== undefined) out.push(["l", this.l.toString()]);
    if (this.t !== undefined) out.push(["t", this.t.toString()]);
    if (this.r !== undefined) out.push(["r", this.r.toString()]);
    if (this.b !== undefined) out.push(["b", this.b.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.l, { attribute: ":l", elementClass: "BoundRect" });
    assertRequired(this.t, { attribute: ":t", elementClass: "BoundRect" });
    assertRequired(this.r, { attribute: ":r", elementClass: "BoundRect" });
    assertRequired(this.b, { attribute: ":b", elementClass: "BoundRect" });
  }
}
