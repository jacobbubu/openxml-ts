// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.ConditionalFormat

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the ConditionalFormat Class.
 *
 * Element: `x14:conditionalFormat` */
export class ConditionalFormat extends OpenXmlCompositeElement {
  override readonly localName = "conditionalFormat" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** scope (:scope) */
  scope: StringValue | undefined;

  /** type (:type) */
  type: StringValue | undefined;

  /** priority (:priority) */
  priority: UInt32Value | undefined;

  /** id (:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "scope": this.scope = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "priority": this.priority = UInt32Value.parse(value); return;
      case "id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.scope !== undefined) out.push(["scope", this.scope.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.priority !== undefined) out.push(["priority", this.priority.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "ConditionalFormat" });
  }
}
