// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.AlphaReplace

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Alpha Replace Effect.
 *
 * Element: `a:alphaRepl` */
export class AlphaReplace extends OpenXmlLeafElement {
  override readonly localName = "alphaRepl" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Alpha (:a) */
  alpha: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "a": this.alpha = Int32Value.parse(value); assertNumber(this.alpha, { min: 0, max: 100000 }, { attribute: ":a", elementClass: "AlphaReplace" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.alpha !== undefined) out.push(["a", this.alpha.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.alpha, { attribute: ":a", elementClass: "AlphaReplace" });
  }
}
