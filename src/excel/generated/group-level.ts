// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.GroupLevel

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** OLAP Grouping Levels.
 *
 * Element: `x:groupLevel` */
export class GroupLevel extends OpenXmlCompositeElement {
  override readonly localName = "groupLevel" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Unique Name (:uniqueName) */
  uniqueName: StringValue | undefined;

  /** Grouping Level Display Name (:caption) */
  caption: StringValue | undefined;

  /** User-Defined Group Level (:user) */
  user: BooleanValue | undefined;

  /** Custom Roll Up (:customRollUp) */
  customRollUp: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":uniqueName": this.uniqueName = StringValue.parse(value); return;
      case ":caption": this.caption = StringValue.parse(value); return;
      case ":user": this.user = BooleanValue.parse(value); return;
      case ":customRollUp": this.customRollUp = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uniqueName !== undefined) out.push([":uniqueName", this.uniqueName.toString()]);
    if (this.caption !== undefined) out.push([":caption", this.caption.toString()]);
    if (this.user !== undefined) out.push([":user", this.user.toString()]);
    if (this.customRollUp !== undefined) out.push([":customRollUp", this.customRollUp.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.uniqueName, { attribute: ":uniqueName", elementClass: "GroupLevel" });
    assertRequired(this.caption, { attribute: ":caption", elementClass: "GroupLevel" });
  }
}
