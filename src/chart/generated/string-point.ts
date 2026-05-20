// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_chart.json
// @see DocumentFormat.OpenXml.Chart.StringPoint

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** String Point.
 *
 * Element: `c:pt` */
export class StringPoint extends OpenXmlCompositeElement {
  override readonly localName = "pt" as const;
  override readonly prefix = "c" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/chart" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Index (:idx) */
  index: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "idx": this.index = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.index !== undefined) out.push(["idx", this.index.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.index, { attribute: ":idx", elementClass: "StringPoint" });
  }
}
