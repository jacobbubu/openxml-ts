// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_tasks_2019_documenttasks.json
// @see DocumentFormat.OpenXml.Tasks2019Documenttasks.TaskScheduleEventInfo

import {
  DateTimeValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the TaskScheduleEventInfo Class.
 *
 * Element: `t:Schedule` */
export class TaskScheduleEventInfo extends OpenXmlLeafElement {
  override readonly localName = "Schedule" as const;
  override readonly prefix = "t" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/tasks/2019/documenttasks" as const;


  /** startDate (:startDate) */
  startDate: DateTimeValue | undefined;

  /** dueDate (:dueDate) */
  dueDate: DateTimeValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "startDate": this.startDate = DateTimeValue.parse(value); return;
      case "dueDate": this.dueDate = DateTimeValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.startDate !== undefined) out.push(["startDate", this.startDate.toString()]);
    if (this.dueDate !== undefined) out.push(["dueDate", this.dueDate.toString()]);
    return out;
  }

}
