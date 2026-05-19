// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.UserInfo

import {
  DateTimeValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** User Information.
 *
 * Element: `x:userInfo` */
export class UserInfo extends OpenXmlCompositeElement {
  override readonly localName = "userInfo" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** User Revisions GUID (:guid) */
  guid: StringValue | undefined;

  /** User Name (:name) */
  name: StringValue | undefined;

  /** User Id (:id) */
  id: Int32Value | undefined;

  /** Date Time (:dateTime) */
  dateTime: DateTimeValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "guid": this.guid = StringValue.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "id": this.id = Int32Value.parse(value); return;
      case "dateTime": this.dateTime = DateTimeValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.guid !== undefined) out.push(["guid", this.guid.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.dateTime !== undefined) out.push(["dateTime", this.dateTime.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.guid, { attribute: ":guid", elementClass: "UserInfo" });
    assertRequired(this.name, { attribute: ":name", elementClass: "UserInfo" });
    assertRequired(this.id, { attribute: ":id", elementClass: "UserInfo" });
    assertRequired(this.dateTime, { attribute: ":dateTime", elementClass: "UserInfo" });
  }
}
