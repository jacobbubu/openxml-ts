// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.GridColumn

import {
  Int64Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Table Grid Column.
 *
 * Element: `a:gridCol` */
export class GridColumn extends OpenXmlCompositeElement {
  override readonly localName = "gridCol" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Width (:w) */
  width: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":w": this.width = Int64Value.parse(value); assertNumber(this.width, { min: -27273042329600, max: 27273042316900 }, { attribute: ":w", elementClass: "GridColumn" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.width !== undefined) out.push([":w", this.width.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.width, { attribute: ":w", elementClass: "GridColumn" });
  }
}
