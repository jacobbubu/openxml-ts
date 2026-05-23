// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2021_06_main.json
// @see DocumentFormat.OpenXml.202106Main.TaskHistoryEvent

import {
  DateTimeValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the TaskHistoryEvent Class.
 *
 * Element: `p216:event` */
export class TaskHistoryEvent extends OpenXmlCompositeElement {
  override readonly localName = "event" as const;
  override readonly prefix = "p216" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2021/06/main" as const;
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
