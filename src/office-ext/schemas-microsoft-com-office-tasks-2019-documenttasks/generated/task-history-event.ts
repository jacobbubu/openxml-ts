// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_tasks_2019_documenttasks.json
// @see DocumentFormat.OpenXml.Tasks2019Documenttasks.TaskHistoryEvent

import {
  DateTimeValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the TaskHistoryEvent Class.
 *
 * Element: `t:Event` */
export class TaskHistoryEvent extends OpenXmlCompositeElement {
  override readonly localName = "Event" as const;
  override readonly prefix = "t" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/tasks/2019/documenttasks" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** time (:time) */
  time: DateTimeValue | undefined;

  /** id (:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "time": this.time = DateTimeValue.parse(value); return;
      case "id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.time !== undefined) out.push(["time", this.time.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.time, { attribute: ":time", elementClass: "TaskHistoryEvent" });
    assertRequired(this.id, { attribute: ":id", elementClass: "TaskHistoryEvent" });
  }
}
