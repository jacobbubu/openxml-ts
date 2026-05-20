// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.RunConflictDeletion

import {
  DateTimeValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
  assertString,
} from "../../element/index.js";

/** Defines the RunConflictDeletion Class.
 *
 * Element: `w14:conflictDel` */
export class RunConflictDeletion extends OpenXmlCompositeElement {
  override readonly localName = "conflictDel" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

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
      case "w:author": this.author = StringValue.parse(value); assertString(this.author, { maxLength: 255 }, { attribute: "w:author", elementClass: "RunConflictDeletion" }); return;
      case "w:date": this.date = DateTimeValue.parse(value); return;
      case "w16du:dateUtc": this.dateUtc = DateTimeValue.parse(value); return;
      case "w:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.author !== undefined) out.push(["w:author", this.author.toString()]);
    if (this.date !== undefined) out.push(["w:date", this.date.toString()]);
    if (this.dateUtc !== undefined) out.push(["w16du:dateUtc", this.dateUtc.toString()]);
    if (this.id !== undefined) out.push(["w:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.author, { attribute: "w:author", elementClass: "RunConflictDeletion" });
    assertRequired(this.id, { attribute: "w:id", elementClass: "RunConflictDeletion" });
  }
}
