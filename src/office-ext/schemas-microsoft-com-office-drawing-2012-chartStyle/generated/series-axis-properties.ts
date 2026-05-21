// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.SeriesAxisProperties

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the SeriesAxisProperties Class.
 *
 * Element: `cs:seriesAxis` */
export class SeriesAxisProperties extends OpenXmlLeafElement {
  override readonly localName = "seriesAxis" as const;
  override readonly prefix = "cs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chartStyle" as const;


  /** visible (:visible) */
  visible: StringValue | undefined;

  /** majorTick (:majorTick) */
  majorTick: StringValue | undefined;

  /** minorTick (:minorTick) */
  minorTickProp: StringValue | undefined;

  /** labelPosition (:labelPosition) */
  labelPosition: StringValue | undefined;

  /** majorGridlines (:majorGridlines) */
  majorGridlines: StringValue | undefined;

  /** minorGridlines (:minorGridlines) */
  minorGridlinesProp: StringValue | undefined;

  /** title (:title) */
  titleProp: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "visible": this.visible = StringValue.parse(value); return;
      case "majorTick": this.majorTick = StringValue.parse(value); return;
      case "minorTick": this.minorTickProp = StringValue.parse(value); return;
      case "labelPosition": this.labelPosition = StringValue.parse(value); return;
      case "majorGridlines": this.majorGridlines = StringValue.parse(value); return;
      case "minorGridlines": this.minorGridlinesProp = StringValue.parse(value); return;
      case "title": this.titleProp = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.visible !== undefined) out.push(["visible", this.visible.toString()]);
    if (this.majorTick !== undefined) out.push(["majorTick", this.majorTick.toString()]);
    if (this.minorTickProp !== undefined) out.push(["minorTick", this.minorTickProp.toString()]);
    if (this.labelPosition !== undefined) out.push(["labelPosition", this.labelPosition.toString()]);
    if (this.majorGridlines !== undefined) out.push(["majorGridlines", this.majorGridlines.toString()]);
    if (this.minorGridlinesProp !== undefined) out.push(["minorGridlines", this.minorGridlinesProp.toString()]);
    if (this.titleProp !== undefined) out.push(["title", this.titleProp.toString()]);
    return out;
  }

}
