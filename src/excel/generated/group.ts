// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Group

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** OLAP Group.
 *
 * Element: `x:group` */
export class Group extends OpenXmlCompositeElement {
  override readonly localName = "group" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Group Name (:name) */
  name: StringValue | undefined;

  /** Unique Group Name (:uniqueName) */
  uniqueName: StringValue | undefined;

  /** Group Caption (:caption) */
  caption: StringValue | undefined;

  /** Parent Unique Name (:uniqueParent) */
  uniqueParent: StringValue | undefined;

  /** Group Id (:id) */
  id: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "uniqueName": this.uniqueName = StringValue.parse(value); return;
      case "caption": this.caption = StringValue.parse(value); return;
      case "uniqueParent": this.uniqueParent = StringValue.parse(value); return;
      case "id": this.id = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.uniqueName !== undefined) out.push(["uniqueName", this.uniqueName.toString()]);
    if (this.caption !== undefined) out.push(["caption", this.caption.toString()]);
    if (this.uniqueParent !== undefined) out.push(["uniqueParent", this.uniqueParent.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "Group" });
    assertRequired(this.uniqueName, { attribute: ":uniqueName", elementClass: "Group" });
    assertRequired(this.caption, { attribute: ":caption", elementClass: "Group" });
  }
}
