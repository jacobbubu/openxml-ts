// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_tasks_2019_documenttasks.json
// @see DocumentFormat.OpenXml.Tasks2019Documenttasks.TaskProgressEventInfo

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the TaskProgressEventInfo Class.
 *
 * Element: `t:Progress` */
export class TaskProgressEventInfo extends OpenXmlLeafElement {
  override readonly localName = "Progress" as const;
  override readonly prefix = "t" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/tasks/2019/documenttasks" as const;


  /** percentComplete (:percentComplete) */
  percentComplete: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "percentComplete": this.percentComplete = Int32Value.parse(value); assertNumber(this.percentComplete, { min: 0, max: 100 }, { attribute: ":percentComplete", elementClass: "TaskProgressEventInfo" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.percentComplete !== undefined) out.push(["percentComplete", this.percentComplete.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.percentComplete, { attribute: ":percentComplete", elementClass: "TaskProgressEventInfo" });
  }
}
