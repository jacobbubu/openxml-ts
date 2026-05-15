// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Comment

import {
  DateTimeValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
  assertString,
} from "../../element/index.js";

/** Comment Content.
 *
 * Element: `w:comment` */
export class Comment extends OpenXmlCompositeElement {
  override readonly localName = "comment" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** initials (w:initials) */
  initials: StringValue | undefined;

  /** author (w:author) */
  author: StringValue | undefined;

  /** date (w:date) */
  date: DateTimeValue | undefined;

  /** dateUtc (w16du:dateUtc) */
  dateUtc: DateTimeValue | undefined;

  /** Annotation Identifier (w:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:initials": this.initials = StringValue.parse(value); assertString(this.initials, { maxLength: 9 }, { attribute: "w:initials", elementClass: "Comment" }); return;
      case "w:author": this.author = StringValue.parse(value); assertString(this.author, { maxLength: 255 }, { attribute: "w:author", elementClass: "Comment" }); return;
      case "w:date": this.date = DateTimeValue.parse(value); return;
      case "w16du:dateUtc": this.dateUtc = DateTimeValue.parse(value); return;
      case "w:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.initials !== undefined) out.push(["w:initials", this.initials.toString()]);
    if (this.author !== undefined) out.push(["w:author", this.author.toString()]);
    if (this.date !== undefined) out.push(["w:date", this.date.toString()]);
    if (this.dateUtc !== undefined) out.push(["w16du:dateUtc", this.dateUtc.toString()]);
    if (this.id !== undefined) out.push(["w:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.author, { attribute: "w:author", elementClass: "Comment" });
    assertRequired(this.id, { attribute: "w:id", elementClass: "Comment" });
  }
}
