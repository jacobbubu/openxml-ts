// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ConditionalFormattingRule

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Conditional Formatting Rule.
 *
 * Element: `x:cfRule` */
export class ConditionalFormattingRule extends OpenXmlCompositeElement {
  override readonly localName = "cfRule" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Type (:type) */
  type: StringValue | undefined;

  /** Differential Formatting Id (:dxfId) */
  formatId: UInt32Value | undefined;

  /** Priority (:priority) */
  priority: Int32Value | undefined;

  /** Stop If True (:stopIfTrue) */
  stopIfTrue: BooleanValue | undefined;

  /** Above Or Below Average (:aboveAverage) */
  aboveAverage: BooleanValue | undefined;

  /** Top 10 Percent (:percent) */
  percent: BooleanValue | undefined;

  /** Bottom N (:bottom) */
  bottom: BooleanValue | undefined;

  /** Operator (:operator) */
  operator: StringValue | undefined;

  /** Text (:text) */
  text: StringValue | undefined;

  /** Time Period (:timePeriod) */
  timePeriod: StringValue | undefined;

  /** Rank (:rank) */
  rank: UInt32Value | undefined;

  /** StdDev (:stdDev) */
  stdDev: Int32Value | undefined;

  /** Equal Average (:equalAverage) */
  equalAverage: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
      case "dxfId": this.formatId = UInt32Value.parse(value); return;
      case "priority": this.priority = Int32Value.parse(value); return;
      case "stopIfTrue": this.stopIfTrue = BooleanValue.parse(value); return;
      case "aboveAverage": this.aboveAverage = BooleanValue.parse(value); return;
      case "percent": this.percent = BooleanValue.parse(value); return;
      case "bottom": this.bottom = BooleanValue.parse(value); return;
      case "operator": this.operator = StringValue.parse(value); return;
      case "text": this.text = StringValue.parse(value); return;
      case "timePeriod": this.timePeriod = StringValue.parse(value); return;
      case "rank": this.rank = UInt32Value.parse(value); return;
      case "stdDev": this.stdDev = Int32Value.parse(value); return;
      case "equalAverage": this.equalAverage = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.formatId !== undefined) out.push(["dxfId", this.formatId.toString()]);
    if (this.priority !== undefined) out.push(["priority", this.priority.toString()]);
    if (this.stopIfTrue !== undefined) out.push(["stopIfTrue", this.stopIfTrue.toString()]);
    if (this.aboveAverage !== undefined) out.push(["aboveAverage", this.aboveAverage.toString()]);
    if (this.percent !== undefined) out.push(["percent", this.percent.toString()]);
    if (this.bottom !== undefined) out.push(["bottom", this.bottom.toString()]);
    if (this.operator !== undefined) out.push(["operator", this.operator.toString()]);
    if (this.text !== undefined) out.push(["text", this.text.toString()]);
    if (this.timePeriod !== undefined) out.push(["timePeriod", this.timePeriod.toString()]);
    if (this.rank !== undefined) out.push(["rank", this.rank.toString()]);
    if (this.stdDev !== undefined) out.push(["stdDev", this.stdDev.toString()]);
    if (this.equalAverage !== undefined) out.push(["equalAverage", this.equalAverage.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.type, { attribute: ":type", elementClass: "ConditionalFormattingRule" });
    assertRequired(this.priority, { attribute: ":priority", elementClass: "ConditionalFormattingRule" });
  }
}
