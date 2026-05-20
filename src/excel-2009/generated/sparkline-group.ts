// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.SparklineGroup

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the SparklineGroup Class.
 *
 * Element: `x14:sparklineGroup` */
export class SparklineGroup extends OpenXmlCompositeElement {
  override readonly localName = "sparklineGroup" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** manualMax (:manualMax) */
  manualMax: StringValue | undefined;

  /** manualMin (:manualMin) */
  manualMin: StringValue | undefined;

  /** lineWeight (:lineWeight) */
  lineWeight: StringValue | undefined;

  /** type (:type) */
  type: StringValue | undefined;

  /** dateAxis (:dateAxis) */
  dateAxis: BooleanValue | undefined;

  /** displayEmptyCellsAs (:displayEmptyCellsAs) */
  displayEmptyCellsAs: StringValue | undefined;

  /** markers (:markers) */
  markers: BooleanValue | undefined;

  /** high (:high) */
  high: BooleanValue | undefined;

  /** low (:low) */
  low: BooleanValue | undefined;

  /** first (:first) */
  first: BooleanValue | undefined;

  /** last (:last) */
  last: BooleanValue | undefined;

  /** negative (:negative) */
  negative: BooleanValue | undefined;

  /** displayXAxis (:displayXAxis) */
  displayXAxis: BooleanValue | undefined;

  /** displayHidden (:displayHidden) */
  displayHidden: BooleanValue | undefined;

  /** minAxisType (:minAxisType) */
  minAxisType: StringValue | undefined;

  /** maxAxisType (:maxAxisType) */
  maxAxisType: StringValue | undefined;

  /** rightToLeft (:rightToLeft) */
  rightToLeft: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "manualMax": this.manualMax = StringValue.parse(value); return;
      case "manualMin": this.manualMin = StringValue.parse(value); return;
      case "lineWeight": this.lineWeight = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "dateAxis": this.dateAxis = BooleanValue.parse(value); return;
      case "displayEmptyCellsAs": this.displayEmptyCellsAs = StringValue.parse(value); return;
      case "markers": this.markers = BooleanValue.parse(value); return;
      case "high": this.high = BooleanValue.parse(value); return;
      case "low": this.low = BooleanValue.parse(value); return;
      case "first": this.first = BooleanValue.parse(value); return;
      case "last": this.last = BooleanValue.parse(value); return;
      case "negative": this.negative = BooleanValue.parse(value); return;
      case "displayXAxis": this.displayXAxis = BooleanValue.parse(value); return;
      case "displayHidden": this.displayHidden = BooleanValue.parse(value); return;
      case "minAxisType": this.minAxisType = StringValue.parse(value); return;
      case "maxAxisType": this.maxAxisType = StringValue.parse(value); return;
      case "rightToLeft": this.rightToLeft = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.manualMax !== undefined) out.push(["manualMax", this.manualMax.toString()]);
    if (this.manualMin !== undefined) out.push(["manualMin", this.manualMin.toString()]);
    if (this.lineWeight !== undefined) out.push(["lineWeight", this.lineWeight.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.dateAxis !== undefined) out.push(["dateAxis", this.dateAxis.toString()]);
    if (this.displayEmptyCellsAs !== undefined) out.push(["displayEmptyCellsAs", this.displayEmptyCellsAs.toString()]);
    if (this.markers !== undefined) out.push(["markers", this.markers.toString()]);
    if (this.high !== undefined) out.push(["high", this.high.toString()]);
    if (this.low !== undefined) out.push(["low", this.low.toString()]);
    if (this.first !== undefined) out.push(["first", this.first.toString()]);
    if (this.last !== undefined) out.push(["last", this.last.toString()]);
    if (this.negative !== undefined) out.push(["negative", this.negative.toString()]);
    if (this.displayXAxis !== undefined) out.push(["displayXAxis", this.displayXAxis.toString()]);
    if (this.displayHidden !== undefined) out.push(["displayHidden", this.displayHidden.toString()]);
    if (this.minAxisType !== undefined) out.push(["minAxisType", this.minAxisType.toString()]);
    if (this.maxAxisType !== undefined) out.push(["maxAxisType", this.maxAxisType.toString()]);
    if (this.rightToLeft !== undefined) out.push(["rightToLeft", this.rightToLeft.toString()]);
    return out;
  }

}
