// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RangeProperties

import {
  BooleanValue,
  DateTimeValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Range Grouping Properties.
 *
 * Element: `x:rangePr` */
export class RangeProperties extends OpenXmlLeafElement {
  override readonly localName = "rangePr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Source Data Set Beginning Range (:autoStart) */
  autoStart: BooleanValue | undefined;

  /** Source Data Ending Range (:autoEnd) */
  autoEnd: BooleanValue | undefined;

  /** Group By (:groupBy) */
  groupBy: StringValue | undefined;

  /** Numeric Grouping Start Value (:startNum) */
  startNumber: StringValue | undefined;

  /** Numeric Grouping End Value (:endNum) */
  endNum: StringValue | undefined;

  /** Date Grouping Start Value (:startDate) */
  startDate: DateTimeValue | undefined;

  /** Date Grouping End Value (:endDate) */
  endDate: DateTimeValue | undefined;

  /** Grouping Interval (:groupInterval) */
  groupInterval: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "autoStart": this.autoStart = BooleanValue.parse(value); return;
      case "autoEnd": this.autoEnd = BooleanValue.parse(value); return;
      case "groupBy": this.groupBy = StringValue.parse(value); return;
      case "startNum": this.startNumber = StringValue.parse(value); return;
      case "endNum": this.endNum = StringValue.parse(value); return;
      case "startDate": this.startDate = DateTimeValue.parse(value); return;
      case "endDate": this.endDate = DateTimeValue.parse(value); return;
      case "groupInterval": this.groupInterval = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.autoStart !== undefined) out.push(["autoStart", this.autoStart.toString()]);
    if (this.autoEnd !== undefined) out.push(["autoEnd", this.autoEnd.toString()]);
    if (this.groupBy !== undefined) out.push(["groupBy", this.groupBy.toString()]);
    if (this.startNumber !== undefined) out.push(["startNum", this.startNumber.toString()]);
    if (this.endNum !== undefined) out.push(["endNum", this.endNum.toString()]);
    if (this.startDate !== undefined) out.push(["startDate", this.startDate.toString()]);
    if (this.endDate !== undefined) out.push(["endDate", this.endDate.toString()]);
    if (this.groupInterval !== undefined) out.push(["groupInterval", this.groupInterval.toString()]);
    return out;
  }

}
