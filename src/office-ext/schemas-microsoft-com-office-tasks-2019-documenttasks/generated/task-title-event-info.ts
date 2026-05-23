// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_tasks_2019_documenttasks.json
// @see DocumentFormat.OpenXml.Tasks2019Documenttasks.TaskTitleEventInfo

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the TaskTitleEventInfo Class.
 *
 * Element: `t:SetTitle` */
export class TaskTitleEventInfo extends OpenXmlLeafElement {
  override readonly localName = "SetTitle" as const;
  override readonly prefix = "t" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/tasks/2019/documenttasks" as const;


  /** title (:title) */
  title: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "title": this.title = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.title !== undefined) out.push(["title", this.title.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.title, { attribute: ":title", elementClass: "TaskTitleEventInfo" });
  }
}
