// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.Timestamp

import {
  DateTimeValue,
  DecimalValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Timestamp Class.
 *
 * Element: `inkml:timestamp` */
export class Timestamp extends OpenXmlLeafElement {
  override readonly localName = "timestamp" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;


  /** id (xml:id) */
  id: StringValue | undefined;

  /** time (:time) */
  time: DecimalValue | undefined;

  /** timestampRef (:timestampRef) */
  timestampRef: StringValue | undefined;

  /** timeString (:timeString) */
  timeString: DateTimeValue | undefined;

  /** timeOffset (:timeOffset) */
  timeOffset: DecimalValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "xml:id": this.id = StringValue.parse(value); return;
      case "time": this.time = DecimalValue.parse(value); return;
      case "timestampRef": this.timestampRef = StringValue.parse(value); return;
      case "timeString": this.timeString = DateTimeValue.parse(value); return;
      case "timeOffset": this.timeOffset = DecimalValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["xml:id", this.id.toString()]);
    if (this.time !== undefined) out.push(["time", this.time.toString()]);
    if (this.timestampRef !== undefined) out.push(["timestampRef", this.timestampRef.toString()]);
    if (this.timeString !== undefined) out.push(["timeString", this.timeString.toString()]);
    if (this.timeOffset !== undefined) out.push(["timeOffset", this.timeOffset.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: "xml:id", elementClass: "Timestamp" });
  }
}
