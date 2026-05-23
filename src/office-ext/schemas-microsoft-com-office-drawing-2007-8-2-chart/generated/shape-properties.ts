// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2007_8_2_chart.json
// @see DocumentFormat.OpenXml.82Chart.ShapeProperties

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the ShapeProperties Class.
 *
 * Element: `c14:spPr` */
export class ShapeProperties extends OpenXmlCompositeElement {
  override readonly localName = "spPr" as const;
  override readonly prefix = "c14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2007/8/2/chart" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Black and White Mode (:bwMode) */
  blackWhiteMode: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "bwMode": this.blackWhiteMode = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.blackWhiteMode !== undefined) out.push(["bwMode", this.blackWhiteMode.toString()]);
    return out;
  }

}
