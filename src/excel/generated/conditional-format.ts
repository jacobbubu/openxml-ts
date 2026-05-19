// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ConditionalFormat

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Conditional Formatting.
 *
 * Element: `x:conditionalFormat` */
export class ConditionalFormat extends OpenXmlCompositeElement {
  override readonly localName = "conditionalFormat" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Conditional Formatting Scope (:scope) */
  scope: StringValue | undefined;

  /** Conditional Formatting Rule Type (:type) */
  type: StringValue | undefined;

  /** Priority (:priority) */
  priority: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "scope": this.scope = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "priority": this.priority = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.scope !== undefined) out.push(["scope", this.scope.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.priority !== undefined) out.push(["priority", this.priority.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.priority, { attribute: ":priority", elementClass: "ConditionalFormat" });
  }
}
