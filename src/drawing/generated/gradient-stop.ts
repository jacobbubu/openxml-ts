// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.GradientStop

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Gradient stops.
 *
 * Element: `a:gs` */
export class GradientStop extends OpenXmlCompositeElement {
  override readonly localName = "gs" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Position (:pos) */
  position: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":pos": this.position = Int32Value.parse(value); assertNumber(this.position, { min: 0, max: 100000 }, { attribute: ":pos", elementClass: "GradientStop" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.position !== undefined) out.push([":pos", this.position.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.position, { attribute: ":pos", elementClass: "GradientStop" });
  }
}
