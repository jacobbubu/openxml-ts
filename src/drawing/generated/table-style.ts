// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.TableStyle

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Table Style.
 *
 * Element: `a:tableStyle` */
export class TableStyle extends OpenXmlCompositeElement {
  override readonly localName = "tableStyle" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Style ID (:styleId) */
  styleId: StringValue | undefined;

  /** Name (:styleName) */
  styleName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "styleId": this.styleId = StringValue.parse(value); return;
      case "styleName": this.styleName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.styleId !== undefined) out.push(["styleId", this.styleId.toString()]);
    if (this.styleName !== undefined) out.push(["styleName", this.styleName.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.styleId, { attribute: ":styleId", elementClass: "TableStyle" });
    assertRequired(this.styleName, { attribute: ":styleName", elementClass: "TableStyle" });
  }
}
