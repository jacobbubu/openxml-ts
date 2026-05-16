// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.PivotSelection

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** PivotTable Selection.
 *
 * Element: `x:pivotSelection` */
export class PivotSelection extends OpenXmlCompositeElement {
  override readonly localName = "pivotSelection" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Pane (:pane) */
  pane: StringValue | undefined;

  /** Show Header (:showHeader) */
  showHeader: BooleanValue | undefined;

  /** Label (:label) */
  label: BooleanValue | undefined;

  /** Data Selection (:data) */
  data: BooleanValue | undefined;

  /** Extendable (:extendable) */
  extendable: BooleanValue | undefined;

  /** Selection Count (:count) */
  count: UInt32Value | undefined;

  /** Axis (:axis) */
  axis: StringValue | undefined;

  /** Dimension (:dimension) */
  dimension: UInt32Value | undefined;

  /** Start (:start) */
  start: UInt32Value | undefined;

  /** Minimum (:min) */
  min: UInt32Value | undefined;

  /** Maximum (:max) */
  max: UInt32Value | undefined;

  /** Active Row (:activeRow) */
  activeRow: UInt32Value | undefined;

  /** Active Column (:activeCol) */
  activeColumn: UInt32Value | undefined;

  /** Previous Row (:previousRow) */
  previousRow: UInt32Value | undefined;

  /** Previous Column Selection (:previousCol) */
  previousColumn: UInt32Value | undefined;

  /** Click Count (:click) */
  click: UInt32Value | undefined;

  /** Relationship Id (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":pane": this.pane = StringValue.parse(value); return;
      case ":showHeader": this.showHeader = BooleanValue.parse(value); return;
      case ":label": this.label = BooleanValue.parse(value); return;
      case ":data": this.data = BooleanValue.parse(value); return;
      case ":extendable": this.extendable = BooleanValue.parse(value); return;
      case ":count": this.count = UInt32Value.parse(value); return;
      case ":axis": this.axis = StringValue.parse(value); return;
      case ":dimension": this.dimension = UInt32Value.parse(value); return;
      case ":start": this.start = UInt32Value.parse(value); return;
      case ":min": this.min = UInt32Value.parse(value); return;
      case ":max": this.max = UInt32Value.parse(value); return;
      case ":activeRow": this.activeRow = UInt32Value.parse(value); return;
      case ":activeCol": this.activeColumn = UInt32Value.parse(value); return;
      case ":previousRow": this.previousRow = UInt32Value.parse(value); return;
      case ":previousCol": this.previousColumn = UInt32Value.parse(value); return;
      case ":click": this.click = UInt32Value.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.pane !== undefined) out.push([":pane", this.pane.toString()]);
    if (this.showHeader !== undefined) out.push([":showHeader", this.showHeader.toString()]);
    if (this.label !== undefined) out.push([":label", this.label.toString()]);
    if (this.data !== undefined) out.push([":data", this.data.toString()]);
    if (this.extendable !== undefined) out.push([":extendable", this.extendable.toString()]);
    if (this.count !== undefined) out.push([":count", this.count.toString()]);
    if (this.axis !== undefined) out.push([":axis", this.axis.toString()]);
    if (this.dimension !== undefined) out.push([":dimension", this.dimension.toString()]);
    if (this.start !== undefined) out.push([":start", this.start.toString()]);
    if (this.min !== undefined) out.push([":min", this.min.toString()]);
    if (this.max !== undefined) out.push([":max", this.max.toString()]);
    if (this.activeRow !== undefined) out.push([":activeRow", this.activeRow.toString()]);
    if (this.activeColumn !== undefined) out.push([":activeCol", this.activeColumn.toString()]);
    if (this.previousRow !== undefined) out.push([":previousRow", this.previousRow.toString()]);
    if (this.previousColumn !== undefined) out.push([":previousCol", this.previousColumn.toString()]);
    if (this.click !== undefined) out.push([":click", this.click.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: "r:id", elementClass: "PivotSelection" });
  }
}
