// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.DateGroupItem

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Date Grouping.
 *
 * Element: `x:dateGroupItem` */
export class DateGroupItem extends OpenXmlLeafElement {
  override readonly localName = "dateGroupItem" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Year (:year) */
  year: StringValue | undefined;

  /** Month (:month) */
  month: StringValue | undefined;

  /** Day (:day) */
  day: StringValue | undefined;

  /** Hour (:hour) */
  hour: StringValue | undefined;

  /** Minute (:minute) */
  minute: StringValue | undefined;

  /** Second (:second) */
  second: StringValue | undefined;

  /** Date Time Grouping (:dateTimeGrouping) */
  dateTimeGrouping: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "year": this.year = StringValue.parse(value); return;
      case "month": this.month = StringValue.parse(value); return;
      case "day": this.day = StringValue.parse(value); return;
      case "hour": this.hour = StringValue.parse(value); return;
      case "minute": this.minute = StringValue.parse(value); return;
      case "second": this.second = StringValue.parse(value); return;
      case "dateTimeGrouping": this.dateTimeGrouping = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.year !== undefined) out.push(["year", this.year.toString()]);
    if (this.month !== undefined) out.push(["month", this.month.toString()]);
    if (this.day !== undefined) out.push(["day", this.day.toString()]);
    if (this.hour !== undefined) out.push(["hour", this.hour.toString()]);
    if (this.minute !== undefined) out.push(["minute", this.minute.toString()]);
    if (this.second !== undefined) out.push(["second", this.second.toString()]);
    if (this.dateTimeGrouping !== undefined) out.push(["dateTimeGrouping", this.dateTimeGrouping.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.year, { attribute: ":year", elementClass: "DateGroupItem" });
    assertRequired(this.dateTimeGrouping, { attribute: ":dateTimeGrouping", elementClass: "DateGroupItem" });
  }
}
