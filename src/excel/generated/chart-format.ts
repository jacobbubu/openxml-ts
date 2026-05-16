// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ChartFormat

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** PivotChart Format.
 *
 * Element: `x:chartFormat` */
export class ChartFormat extends OpenXmlCompositeElement {
  override readonly localName = "chartFormat" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Chart Index (:chart) */
  chart: UInt32Value | undefined;

  /** Pivot Format Id (:format) */
  format: UInt32Value | undefined;

  /** Series Format (:series) */
  series: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":chart": this.chart = UInt32Value.parse(value); return;
      case ":format": this.format = UInt32Value.parse(value); return;
      case ":series": this.series = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.chart !== undefined) out.push([":chart", this.chart.toString()]);
    if (this.format !== undefined) out.push([":format", this.format.toString()]);
    if (this.series !== undefined) out.push([":series", this.series.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.chart, { attribute: ":chart", elementClass: "ChartFormat" });
    assertRequired(this.format, { attribute: ":format", elementClass: "ChartFormat" });
  }
}
