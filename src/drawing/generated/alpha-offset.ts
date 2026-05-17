// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.AlphaOffset

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Alpha Offset.
 *
 * Element: `a:alphaOff` */
export class AlphaOffset extends OpenXmlLeafElement {
  override readonly localName = "alphaOff" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Value (:val) */
  val: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":val": this.val = Int32Value.parse(value); assertNumber(this.val, { min: -100000, max: 100000 }, { attribute: ":val", elementClass: "AlphaOffset" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push([":val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: ":val", elementClass: "AlphaOffset" });
  }
}
