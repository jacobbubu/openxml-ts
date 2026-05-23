// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2018_threadedcomments.json
// @see DocumentFormat.OpenXml.Spreadsheetml2018Threadedcomments.ThreadedComment

import {
  BooleanValue,
  DateTimeValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ThreadedComment Class.
 *
 * Element: `xltc:threadedComment` */
export class ThreadedComment extends OpenXmlCompositeElement {
  override readonly localName = "threadedComment" as const;
  override readonly prefix = "xltc" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** ref (:ref) */
  ref: StringValue | undefined;

  /** dT (:dT) */
  dT: DateTimeValue | undefined;

  /** personId (:personId) */
  personId: StringValue | undefined;

  /** id (:id) */
  id: StringValue | undefined;

  /** parentId (:parentId) */
  parentId: StringValue | undefined;

  /** done (:done) */
  done: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ref": this.ref = StringValue.parse(value); return;
      case "dT": this.dT = DateTimeValue.parse(value); return;
      case "personId": this.personId = StringValue.parse(value); return;
      case "id": this.id = StringValue.parse(value); return;
      case "parentId": this.parentId = StringValue.parse(value); return;
      case "done": this.done = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.ref !== undefined) out.push(["ref", this.ref.toString()]);
    if (this.dT !== undefined) out.push(["dT", this.dT.toString()]);
    if (this.personId !== undefined) out.push(["personId", this.personId.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.parentId !== undefined) out.push(["parentId", this.parentId.toString()]);
    if (this.done !== undefined) out.push(["done", this.done.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.personId, { attribute: ":personId", elementClass: "ThreadedComment" });
    assertRequired(this.id, { attribute: ":id", elementClass: "ThreadedComment" });
  }
}
