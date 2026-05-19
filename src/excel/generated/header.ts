// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Header

import {
  DateTimeValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Header.
 *
 * Element: `x:header` */
export class Header extends OpenXmlCompositeElement {
  override readonly localName = "header" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** GUID (:guid) */
  guid: StringValue | undefined;

  /** Date Time (:dateTime) */
  dateTime: DateTimeValue | undefined;

  /** Last Sheet Id (:maxSheetId) */
  maxSheetId: UInt32Value | undefined;

  /** User Name (:userName) */
  userName: StringValue | undefined;

  /** Relationship ID (r:id) */
  id: StringValue | undefined;

  /** Minimum Revision Id (:minRId) */
  minRevisionId: UInt32Value | undefined;

  /** Max Revision Id (:maxRId) */
  maxRevisionId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "guid": this.guid = StringValue.parse(value); return;
      case "dateTime": this.dateTime = DateTimeValue.parse(value); return;
      case "maxSheetId": this.maxSheetId = UInt32Value.parse(value); return;
      case "userName": this.userName = StringValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
      case "minRId": this.minRevisionId = UInt32Value.parse(value); return;
      case "maxRId": this.maxRevisionId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.guid !== undefined) out.push(["guid", this.guid.toString()]);
    if (this.dateTime !== undefined) out.push(["dateTime", this.dateTime.toString()]);
    if (this.maxSheetId !== undefined) out.push(["maxSheetId", this.maxSheetId.toString()]);
    if (this.userName !== undefined) out.push(["userName", this.userName.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    if (this.minRevisionId !== undefined) out.push(["minRId", this.minRevisionId.toString()]);
    if (this.maxRevisionId !== undefined) out.push(["maxRId", this.maxRevisionId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.guid, { attribute: ":guid", elementClass: "Header" });
    assertRequired(this.dateTime, { attribute: ":dateTime", elementClass: "Header" });
    assertRequired(this.maxSheetId, { attribute: ":maxSheetId", elementClass: "Header" });
    assertRequired(this.userName, { attribute: ":userName", elementClass: "Header" });
    assertRequired(this.id, { attribute: "r:id", elementClass: "Header" });
  }
}
