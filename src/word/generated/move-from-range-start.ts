// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.MoveFromRangeStart

import {
  DateTimeValue,
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
  assertString,
} from "../../element/index.js";

/** Defines the MoveFromRangeStart Class.
 *
 * Element: `w:moveFromRangeStart` */
export class MoveFromRangeStart extends OpenXmlLeafElement {
  override readonly localName = "moveFromRangeStart" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** author (w:author) */
  author: StringValue | undefined;

  /** date (w:date) */
  date: DateTimeValue | undefined;

  /** name (w:name) */
  name: StringValue | undefined;

  /** colFirst (w:colFirst) */
  columnFirst: Int32Value | undefined;

  /** colLast (w:colLast) */
  columnLast: Int32Value | undefined;

  /** displacedByCustomXml (w:displacedByCustomXml) */
  displacedByCustomXml: StringValue | undefined;

  /** Annotation Identifier (w:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:author": this.author = StringValue.parse(value); return;
      case "w:date": this.date = DateTimeValue.parse(value); return;
      case "w:name": this.name = StringValue.parse(value); assertString(this.name, { maxLength: 40 }, { attribute: "w:name", elementClass: "MoveFromRangeStart" }); return;
      case "w:colFirst": this.columnFirst = Int32Value.parse(value); return;
      case "w:colLast": this.columnLast = Int32Value.parse(value); return;
      case "w:displacedByCustomXml": this.displacedByCustomXml = StringValue.parse(value); return;
      case "w:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.author !== undefined) out.push(["w:author", this.author.toString()]);
    if (this.date !== undefined) out.push(["w:date", this.date.toString()]);
    if (this.name !== undefined) out.push(["w:name", this.name.toString()]);
    if (this.columnFirst !== undefined) out.push(["w:colFirst", this.columnFirst.toString()]);
    if (this.columnLast !== undefined) out.push(["w:colLast", this.columnLast.toString()]);
    if (this.displacedByCustomXml !== undefined) out.push(["w:displacedByCustomXml", this.displacedByCustomXml.toString()]);
    if (this.id !== undefined) out.push(["w:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.author, { attribute: "w:author", elementClass: "MoveFromRangeStart" });
    assertRequired(this.date, { attribute: "w:date", elementClass: "MoveFromRangeStart" });
    assertRequired(this.name, { attribute: "w:name", elementClass: "MoveFromRangeStart" });
    assertRequired(this.id, { attribute: "w:id", elementClass: "MoveFromRangeStart" });
  }
}
