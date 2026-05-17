// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.TableStyleType

import {
  OpenXmlCompositeElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the TableStyleType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class TableStyleType extends OpenXmlCompositeElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** Style ID (:styleId) */
  styleId: StringValue | undefined;

  /** Name (:styleName) */
  styleName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":styleId": this.styleId = StringValue.parse(value); return;
      case ":styleName": this.styleName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.styleId !== undefined) out.push([":styleId", this.styleId.toString()]);
    if (this.styleName !== undefined) out.push([":styleName", this.styleName.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.styleId, { attribute: ":styleId", elementClass: "TableStyleType" });
    assertRequired(this.styleName, { attribute: ":styleName", elementClass: "TableStyleType" });
  }
}
