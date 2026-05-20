// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.ConditionalFormattingRule

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the ConditionalFormattingRule Class.
 *
 * Element: `x14:cfRule` */
export class ConditionalFormattingRule extends OpenXmlCompositeElement {
  override readonly localName = "cfRule" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** type (:type) */
  type: StringValue | undefined;

  /** priority (:priority) */
  priority: Int32Value | undefined;

  /** stopIfTrue (:stopIfTrue) */
  stopIfTrue: BooleanValue | undefined;

  /** aboveAverage (:aboveAverage) */
  aboveAverage: BooleanValue | undefined;

  /** percent (:percent) */
  percent: BooleanValue | undefined;

  /** bottom (:bottom) */
  bottom: BooleanValue | undefined;

  /** operator (:operator) */
  operator: StringValue | undefined;

  /** text (:text) */
  text: StringValue | undefined;

  /** timePeriod (:timePeriod) */
  timePeriod: StringValue | undefined;

  /** rank (:rank) */
  rank: UInt32Value | undefined;

  /** stdDev (:stdDev) */
  standardDeviation: Int32Value | undefined;

  /** equalAverage (:equalAverage) */
  equalAverage: BooleanValue | undefined;

  /** activePresent (:activePresent) */
  activePresent: BooleanValue | undefined;

  /** id (:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
      case "priority": this.priority = Int32Value.parse(value); return;
      case "stopIfTrue": this.stopIfTrue = BooleanValue.parse(value); return;
      case "aboveAverage": this.aboveAverage = BooleanValue.parse(value); return;
      case "percent": this.percent = BooleanValue.parse(value); return;
      case "bottom": this.bottom = BooleanValue.parse(value); return;
      case "operator": this.operator = StringValue.parse(value); return;
      case "text": this.text = StringValue.parse(value); return;
      case "timePeriod": this.timePeriod = StringValue.parse(value); return;
      case "rank": this.rank = UInt32Value.parse(value); return;
      case "stdDev": this.standardDeviation = Int32Value.parse(value); return;
      case "equalAverage": this.equalAverage = BooleanValue.parse(value); return;
      case "activePresent": this.activePresent = BooleanValue.parse(value); return;
      case "id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.priority !== undefined) out.push(["priority", this.priority.toString()]);
    if (this.stopIfTrue !== undefined) out.push(["stopIfTrue", this.stopIfTrue.toString()]);
    if (this.aboveAverage !== undefined) out.push(["aboveAverage", this.aboveAverage.toString()]);
    if (this.percent !== undefined) out.push(["percent", this.percent.toString()]);
    if (this.bottom !== undefined) out.push(["bottom", this.bottom.toString()]);
    if (this.operator !== undefined) out.push(["operator", this.operator.toString()]);
    if (this.text !== undefined) out.push(["text", this.text.toString()]);
    if (this.timePeriod !== undefined) out.push(["timePeriod", this.timePeriod.toString()]);
    if (this.rank !== undefined) out.push(["rank", this.rank.toString()]);
    if (this.standardDeviation !== undefined) out.push(["stdDev", this.standardDeviation.toString()]);
    if (this.equalAverage !== undefined) out.push(["equalAverage", this.equalAverage.toString()]);
    if (this.activePresent !== undefined) out.push(["activePresent", this.activePresent.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    return out;
  }

}
