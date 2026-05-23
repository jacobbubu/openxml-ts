// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2018_8_main.json
// @see DocumentFormat.OpenXml.20188Main.Comment

import {
  DateTimeValue,
  Int32Value,
  ListValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Comment Class.
 *
 * Element: `p188:cm` */
export class Comment extends OpenXmlCompositeElement {
  override readonly localName = "cm" as const;
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

  /** startDate (:startDate) */
  startDate: DateTimeValue | undefined;

  /** dueDate (:dueDate) */
  dueDate: DateTimeValue | undefined;

  /** assignedTo (:assignedTo) */
  assignedTo: ListValue<StringValue> | undefined;

  /** complete (:complete) */
  complete: Int32Value | undefined;

  /** priority (:priority) */
  priority: UInt32Value | undefined;

  /** title (:title) */
  title: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "authorId": this.authorId = StringValue.parse(value); return;
      case "status": this.status = StringValue.parse(value); return;
      case "created": this.created = DateTimeValue.parse(value); return;
      case "tags": this.tags = ListValue.parse(value, StringValue.parse); return;
      case "likes": this.likes = ListValue.parse(value, StringValue.parse); return;
      case "startDate": this.startDate = DateTimeValue.parse(value); return;
      case "dueDate": this.dueDate = DateTimeValue.parse(value); return;
      case "assignedTo": this.assignedTo = ListValue.parse(value, StringValue.parse); return;
      case "complete": this.complete = Int32Value.parse(value); assertNumber(this.complete, { min: 0, max: 100000 }, { attribute: ":complete", elementClass: "Comment" }); return;
      case "priority": this.priority = UInt32Value.parse(value); assertNumber(this.priority, { min: 0, max: 10 }, { attribute: ":priority", elementClass: "Comment" }); return;
      case "title": this.title = StringValue.parse(value); return;
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
    if (this.startDate !== undefined) out.push(["startDate", this.startDate.toString()]);
    if (this.dueDate !== undefined) out.push(["dueDate", this.dueDate.toString()]);
    if (this.assignedTo !== undefined) out.push(["assignedTo", this.assignedTo.toString()]);
    if (this.complete !== undefined) out.push(["complete", this.complete.toString()]);
    if (this.priority !== undefined) out.push(["priority", this.priority.toString()]);
    if (this.title !== undefined) out.push(["title", this.title.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "Comment" });
    assertRequired(this.authorId, { attribute: ":authorId", elementClass: "Comment" });
    assertRequired(this.created, { attribute: ":created", elementClass: "Comment" });
  }
}
