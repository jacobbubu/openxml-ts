// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.Category

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Category.
 *
 * Element: `dgm:cat` */
export class Category extends OpenXmlLeafElement {
  override readonly localName = "cat" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;


  /** Category Type (:type) */
  type: StringValue | undefined;

  /** Priority (:pri) */
  priority: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
      case "pri": this.priority = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.priority !== undefined) out.push(["pri", this.priority.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.type, { attribute: ":type", elementClass: "Category" });
    assertRequired(this.priority, { attribute: ":pri", elementClass: "Category" });
  }
}
