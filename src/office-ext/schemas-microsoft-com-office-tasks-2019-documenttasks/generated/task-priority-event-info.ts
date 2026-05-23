// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_tasks_2019_documenttasks.json
// @see DocumentFormat.OpenXml.Tasks2019Documenttasks.TaskPriorityEventInfo

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the TaskPriorityEventInfo Class.
 *
 * Element: `t:Priority` */
export class TaskPriorityEventInfo extends OpenXmlLeafElement {
  override readonly localName = "Priority" as const;
  override readonly prefix = "t" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/tasks/2019/documenttasks" as const;


  /** value (:value) */
  value: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "value": this.value = Int32Value.parse(value); assertNumber(this.value, { min: 0, max: 10 }, { attribute: ":value", elementClass: "TaskPriorityEventInfo" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.value !== undefined) out.push(["value", this.value.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.value, { attribute: ":value", elementClass: "TaskPriorityEventInfo" });
  }
}
