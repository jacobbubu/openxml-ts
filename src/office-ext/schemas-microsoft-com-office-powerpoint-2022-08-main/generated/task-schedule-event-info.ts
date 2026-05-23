// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2022_08_main.json
// @see DocumentFormat.OpenXml.202208Main.TaskScheduleEventInfo

import {
  DateTimeValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the TaskScheduleEventInfo Class.
 *
 * Element: `p228:date` */
export class TaskScheduleEventInfo extends OpenXmlLeafElement {
  override readonly localName = "date" as const;
  override readonly prefix = "p228" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2022/08/main" as const;


  /** stDt (:stDt) */
  stDt: DateTimeValue | undefined;

  /** endDt (:endDt) */
  endDt: DateTimeValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "stDt": this.stDt = DateTimeValue.parse(value); return;
      case "endDt": this.endDt = DateTimeValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.stDt !== undefined) out.push(["stDt", this.stDt.toString()]);
    if (this.endDt !== undefined) out.push(["endDt", this.endDt.toString()]);
    return out;
  }

}
