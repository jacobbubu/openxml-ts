// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2018_8_main.json
// @see DocumentFormat.OpenXml.20188Main.Author

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Author Class.
 *
 * Element: `p188:author` */
export class Author extends OpenXmlCompositeElement {
  override readonly localName = "author" as const;
  override readonly prefix = "p188" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2018/8/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: StringValue | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** initials (:initials) */
  initials: StringValue | undefined;

  /** userId (:userId) */
  userId: StringValue | undefined;

  /** providerId (:providerId) */
  providerId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "initials": this.initials = StringValue.parse(value); return;
      case "userId": this.userId = StringValue.parse(value); return;
      case "providerId": this.providerId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.initials !== undefined) out.push(["initials", this.initials.toString()]);
    if (this.userId !== undefined) out.push(["userId", this.userId.toString()]);
    if (this.providerId !== undefined) out.push(["providerId", this.providerId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "Author" });
    assertRequired(this.name, { attribute: ":name", elementClass: "Author" });
    assertRequired(this.userId, { attribute: ":userId", elementClass: "Author" });
    assertRequired(this.providerId, { attribute: ":providerId", elementClass: "Author" });
  }
}
