// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.DataSeries

import {
  ByteValue,
  OpenXmlLeafElement,
  SByteValue,
  StringValue,
  UInt16Value,
} from "../../../element/index.js";

/** Defines the DataSeries Class.
 *
 * Element: `cs:dataSeries` */
export class DataSeries extends OpenXmlLeafElement {
  override readonly localName = "dataSeries" as const;
  override readonly prefix = "cs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chartStyle" as const;


  /** overlap (:overlap) */
  overlap: SByteValue | undefined;

  /** gapWidth (:gapWidth) */
  gapWidth: UInt16Value | undefined;

  /** gapDepth (:gapDepth) */
  gapDepth: UInt16Value | undefined;

  /** doughnutHoleSize (:doughnutHoleSize) */
  doughnutHoleSize: ByteValue | undefined;

  /** markerVisible (:markerVisible) */
  markerVisible: StringValue | undefined;

  /** hiloLines (:hiloLines) */
  hiloLines: StringValue | undefined;

  /** dropLines (:dropLines) */
  dropLines: StringValue | undefined;

  /** seriesLines (:seriesLines) */
  seriesLines: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "overlap": this.overlap = SByteValue.parse(value); return;
      case "gapWidth": this.gapWidth = UInt16Value.parse(value); return;
      case "gapDepth": this.gapDepth = UInt16Value.parse(value); return;
      case "doughnutHoleSize": this.doughnutHoleSize = ByteValue.parse(value); return;
      case "markerVisible": this.markerVisible = StringValue.parse(value); return;
      case "hiloLines": this.hiloLines = StringValue.parse(value); return;
      case "dropLines": this.dropLines = StringValue.parse(value); return;
      case "seriesLines": this.seriesLines = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.overlap !== undefined) out.push(["overlap", this.overlap.toString()]);
    if (this.gapWidth !== undefined) out.push(["gapWidth", this.gapWidth.toString()]);
    if (this.gapDepth !== undefined) out.push(["gapDepth", this.gapDepth.toString()]);
    if (this.doughnutHoleSize !== undefined) out.push(["doughnutHoleSize", this.doughnutHoleSize.toString()]);
    if (this.markerVisible !== undefined) out.push(["markerVisible", this.markerVisible.toString()]);
    if (this.hiloLines !== undefined) out.push(["hiloLines", this.hiloLines.toString()]);
    if (this.dropLines !== undefined) out.push(["dropLines", this.dropLines.toString()]);
    if (this.seriesLines !== undefined) out.push(["seriesLines", this.seriesLines.toString()]);
    return out;
  }

}
