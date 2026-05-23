// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2018_8_main.json
// @see DocumentFormat.OpenXml.20188Main.CommentReply

import {
  DateTimeValue,
  ListValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the CommentReply Class.
 *
 * Element: `p188:reply` */
export class CommentReply extends OpenXmlCompositeElement {
  override readonly localName = "reply" as const;
  override readonly prefix = "p188" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2018/8/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: StringValue | undefined;

  /** authorId (:authorId) */
  authorId: StringValue | undefined;

  /** status (:status) */
  status: StringValue | undefined;

  /** created (:created) */
  created: DateTimeValue | undefined;

  /** tags (:tags) */
  tags: ListValue<StringValue> | undefined;

  /** likes (:likes) */
  likes: ListValue<StringValue> | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "authorId": this.authorId = StringValue.parse(value); return;
      case "status": this.status = StringValue.parse(value); return;
      case "created": this.created = DateTimeValue.parse(value); return;
      case "tags": this.tags = ListValue.parse(value, StringValue.parse); return;
      case "likes": this.likes = ListValue.parse(value, StringValue.parse); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.authorId !== undefined) out.push(["authorId", this.authorId.toString()]);
    if (this.status !== undefined) out.push(["status", this.status.toString()]);
    if (this.created !== undefined) out.push(["created", this.created.toString()]);
    if (this.tags !== undefined) out.push(["tags", this.tags.toString()]);
    if (this.likes !== undefined) out.push(["likes", this.likes.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "CommentReply" });
    assertRequired(this.authorId, { attribute: ":authorId", elementClass: "CommentReply" });
    assertRequired(this.created, { attribute: ":created", elementClass: "CommentReply" });
  }
}
