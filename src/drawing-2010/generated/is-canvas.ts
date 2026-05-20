// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.IsCanvas

import {
  BooleanValue,
  OpenXmlLeafElement,
  assertRequired,
} from "../../element/index.js";

/** Defines the IsCanvas Class.
 *
 * Element: `a14:isCanvas` */
export class IsCanvas extends OpenXmlLeafElement {
  override readonly localName = "isCanvas" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;


  /** val (:val) */
  val: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: ":val", elementClass: "IsCanvas" });
  }
}
