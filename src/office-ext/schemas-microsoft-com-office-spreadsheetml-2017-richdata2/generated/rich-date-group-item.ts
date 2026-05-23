// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_richdata2.json
// @see DocumentFormat.OpenXml.Spreadsheetml2017Richdata2.RichDateGroupItem

import {
  OpenXmlLeafElement,
  StringValue,
  UInt16Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RichDateGroupItem Class.
 *
 * Element: `xlrd2:dateGroupItem` */
export class RichDateGroupItem extends OpenXmlLeafElement {
  override readonly localName = "dateGroupItem" as const;
  override readonly prefix = "xlrd2" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2" as const;


  /** key (:key) */
  key: StringValue | undefined;

  /** Year (:year) */
  year: UInt16Value | undefined;

  /** Month (:month) */
  month: UInt16Value | undefined;

  /** Day (:day) */
  day: UInt16Value | undefined;

  /** Hour (:hour) */
  hour: UInt16Value | undefined;

  /** Minute (:minute) */
  minute: UInt16Value | undefined;

  /** Second (:second) */
  second: UInt16Value | undefined;

  /** Date Time Grouping (:dateTimeGrouping) */
  dateTimeGrouping: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "key": this.key = StringValue.parse(value); return;
      case "year": this.year = UInt16Value.parse(value); return;
      case "month": this.month = UInt16Value.parse(value); return;
      case "day": this.day = UInt16Value.parse(value); return;
      case "hour": this.hour = UInt16Value.parse(value); return;
      case "minute": this.minute = UInt16Value.parse(value); return;
      case "second": this.second = UInt16Value.parse(value); return;
      case "dateTimeGrouping": this.dateTimeGrouping = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.key !== undefined) out.push(["key", this.key.toString()]);
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
    assertRequired(this.year, { attribute: ":year", elementClass: "RichDateGroupItem" });
    assertRequired(this.dateTimeGrouping, { attribute: ":dateTimeGrouping", elementClass: "RichDateGroupItem" });
  }
}
