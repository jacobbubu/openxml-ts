// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.TimelineRange

import {
  DateTimeValue,
  OpenXmlLeafElement,
  assertRequired,
} from "../../element/index.js";

/** Defines the TimelineRange Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class TimelineRange extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** startDate (:startDate) */
  startDate: DateTimeValue | undefined;

  /** endDate (:endDate) */
  endDate: DateTimeValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "startDate": this.startDate = DateTimeValue.parse(value); return;
      case "endDate": this.endDate = DateTimeValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.startDate !== undefined) out.push(["startDate", this.startDate.toString()]);
    if (this.endDate !== undefined) out.push(["endDate", this.endDate.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.startDate, { attribute: ":startDate", elementClass: "TimelineRange" });
    assertRequired(this.endDate, { attribute: ":endDate", elementClass: "TimelineRange" });
  }
}
