// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.AdjustHandleXY

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** XY Adjust Handle.
 *
 * Element: `a:ahXY` */
export class AdjustHandleXY extends OpenXmlCompositeElement {
  override readonly localName = "ahXY" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Horizontal Adjustment Guide (:gdRefX) */
  xAdjustmentGuide: StringValue | undefined;

  /** Minimum Horizontal Adjustment (:minX) */
  minX: StringValue | undefined;

  /** Maximum Horizontal Adjustment (:maxX) */
  maxX: StringValue | undefined;

  /** Vertical Adjustment Guide (:gdRefY) */
  yAdjustmentGuide: StringValue | undefined;

  /** Minimum Vertical Adjustment (:minY) */
  minY: StringValue | undefined;

  /** Maximum Vertical Adjustment (:maxY) */
  maxY: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "gdRefX": this.xAdjustmentGuide = StringValue.parse(value); return;
      case "minX": this.minX = StringValue.parse(value); return;
      case "maxX": this.maxX = StringValue.parse(value); return;
      case "gdRefY": this.yAdjustmentGuide = StringValue.parse(value); return;
      case "minY": this.minY = StringValue.parse(value); return;
      case "maxY": this.maxY = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.xAdjustmentGuide !== undefined) out.push(["gdRefX", this.xAdjustmentGuide.toString()]);
    if (this.minX !== undefined) out.push(["minX", this.minX.toString()]);
    if (this.maxX !== undefined) out.push(["maxX", this.maxX.toString()]);
    if (this.yAdjustmentGuide !== undefined) out.push(["gdRefY", this.yAdjustmentGuide.toString()]);
    if (this.minY !== undefined) out.push(["minY", this.minY.toString()]);
    if (this.maxY !== undefined) out.push(["maxY", this.maxY.toString()]);
    return out;
  }

}
