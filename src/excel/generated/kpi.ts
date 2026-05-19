// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Kpi

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** OLAP KPI.
 *
 * Element: `x:kpi` */
export class Kpi extends OpenXmlLeafElement {
  override readonly localName = "kpi" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** KPI Unique Name (:uniqueName) */
  uniqueName: StringValue | undefined;

  /** KPI Display Name (:caption) */
  caption: StringValue | undefined;

  /** KPI Display Folder (:displayFolder) */
  displayFolder: StringValue | undefined;

  /** KPI Measure Group Name (:measureGroup) */
  measureGroup: StringValue | undefined;

  /** Parent KPI (:parent) */
  parentKpi: StringValue | undefined;

  /** KPI Value Unique Name (:value) */
  value: StringValue | undefined;

  /** KPI Goal Unique Name (:goal) */
  goal: StringValue | undefined;

  /** KPI Status Unique Name (:status) */
  status: StringValue | undefined;

  /** KPI Trend Unique Name (:trend) */
  trend: StringValue | undefined;

  /** KPI Weight Unique Name (:weight) */
  weight: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "uniqueName": this.uniqueName = StringValue.parse(value); return;
      case "caption": this.caption = StringValue.parse(value); return;
      case "displayFolder": this.displayFolder = StringValue.parse(value); return;
      case "measureGroup": this.measureGroup = StringValue.parse(value); return;
      case "parent": this.parentKpi = StringValue.parse(value); return;
      case "value": this.value = StringValue.parse(value); return;
      case "goal": this.goal = StringValue.parse(value); return;
      case "status": this.status = StringValue.parse(value); return;
      case "trend": this.trend = StringValue.parse(value); return;
      case "weight": this.weight = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uniqueName !== undefined) out.push(["uniqueName", this.uniqueName.toString()]);
    if (this.caption !== undefined) out.push(["caption", this.caption.toString()]);
    if (this.displayFolder !== undefined) out.push(["displayFolder", this.displayFolder.toString()]);
    if (this.measureGroup !== undefined) out.push(["measureGroup", this.measureGroup.toString()]);
    if (this.parentKpi !== undefined) out.push(["parent", this.parentKpi.toString()]);
    if (this.value !== undefined) out.push(["value", this.value.toString()]);
    if (this.goal !== undefined) out.push(["goal", this.goal.toString()]);
    if (this.status !== undefined) out.push(["status", this.status.toString()]);
    if (this.trend !== undefined) out.push(["trend", this.trend.toString()]);
    if (this.weight !== undefined) out.push(["weight", this.weight.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.uniqueName, { attribute: ":uniqueName", elementClass: "Kpi" });
    assertRequired(this.caption, { attribute: ":caption", elementClass: "Kpi" });
    assertRequired(this.value, { attribute: ":value", elementClass: "Kpi" });
  }
}
