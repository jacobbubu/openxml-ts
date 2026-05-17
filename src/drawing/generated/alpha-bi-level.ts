// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.AlphaBiLevel

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the AlphaBiLevel Class.
 *
 * Element: `a:alphaBiLevel` */
export class AlphaBiLevel extends OpenXmlLeafElement {
  override readonly localName = "alphaBiLevel" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Threshold (:thresh) */
  threshold: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":thresh": this.threshold = Int32Value.parse(value); assertNumber(this.threshold, { min: 0, max: 100000 }, { attribute: ":thresh", elementClass: "AlphaBiLevel" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.threshold !== undefined) out.push([":thresh", this.threshold.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.threshold, { attribute: ":thresh", elementClass: "AlphaBiLevel" });
  }
}
