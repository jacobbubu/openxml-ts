// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Scenario

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Scenario.
 *
 * Element: `x:scenario` */
export class Scenario extends OpenXmlCompositeElement {
  override readonly localName = "scenario" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Scenario Name (:name) */
  name: StringValue | undefined;

  /** Scenario Locked (:locked) */
  locked: BooleanValue | undefined;

  /** Hidden Scenario (:hidden) */
  hidden: BooleanValue | undefined;

  /** Changing Cell Count (:count) */
  count: UInt32Value | undefined;

  /** User Name (:user) */
  user: StringValue | undefined;

  /** Scenario Comment (:comment) */
  comment: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":name": this.name = StringValue.parse(value); return;
      case ":locked": this.locked = BooleanValue.parse(value); return;
      case ":hidden": this.hidden = BooleanValue.parse(value); return;
      case ":count": this.count = UInt32Value.parse(value); return;
      case ":user": this.user = StringValue.parse(value); return;
      case ":comment": this.comment = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.locked !== undefined) out.push([":locked", this.locked.toString()]);
    if (this.hidden !== undefined) out.push([":hidden", this.hidden.toString()]);
    if (this.count !== undefined) out.push([":count", this.count.toString()]);
    if (this.user !== undefined) out.push([":user", this.user.toString()]);
    if (this.comment !== undefined) out.push([":comment", this.comment.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "Scenario" });
  }
}
