// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.TriggerEventRecord

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the TriggerEventRecord Class.
 *
 * Element: `p14:triggerEvt` */
export class TriggerEventRecord extends OpenXmlLeafElement {
  override readonly localName = "triggerEvt" as const;
  override readonly prefix = "p14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2010/main" as const;


  /** type (:type) */
  type: StringValue | undefined;

  /** time (:time) */
  time: StringValue | undefined;

  /** objId (:objId) */
  objectId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
      case "time": this.time = StringValue.parse(value); return;
      case "objId": this.objectId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.time !== undefined) out.push(["time", this.time.toString()]);
    if (this.objectId !== undefined) out.push(["objId", this.objectId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.type, { attribute: ":type", elementClass: "TriggerEventRecord" });
    assertRequired(this.time, { attribute: ":time", elementClass: "TriggerEventRecord" });
    assertRequired(this.objectId, { attribute: ":objId", elementClass: "TriggerEventRecord" });
  }
}
