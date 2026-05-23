// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2018_threadedcomments.json
// @see DocumentFormat.OpenXml.Spreadsheetml2018Threadedcomments.Person

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Person Class.
 *
 * Element: `xltc:person` */
export class Person extends OpenXmlCompositeElement {
  override readonly localName = "person" as const;
  override readonly prefix = "xltc" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** displayName (:displayName) */
  displayName: StringValue | undefined;

  /** id (:id) */
  id: StringValue | undefined;

  /** userId (:userId) */
  userId: StringValue | undefined;

  /** providerId (:providerId) */
  providerId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "displayName": this.displayName = StringValue.parse(value); return;
      case "id": this.id = StringValue.parse(value); return;
      case "userId": this.userId = StringValue.parse(value); return;
      case "providerId": this.providerId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.displayName !== undefined) out.push(["displayName", this.displayName.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.userId !== undefined) out.push(["userId", this.userId.toString()]);
    if (this.providerId !== undefined) out.push(["providerId", this.providerId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.displayName, { attribute: ":displayName", elementClass: "Person" });
    assertRequired(this.id, { attribute: ":id", elementClass: "Person" });
  }
}
