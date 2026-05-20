// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_chartDrawing.json
// @see DocumentFormat.OpenXml.ChartDrawing.ShapeProperties

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Shape Properties.
 *
 * Element: `cdr:spPr` */
export class ShapeProperties extends OpenXmlCompositeElement {
  override readonly localName = "spPr" as const;
  override readonly prefix = "cdr" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/chartDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Black and White Mode (:bwMode) */
  blackWhiteMode: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "bwMode": this.blackWhiteMode = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.blackWhiteMode !== undefined) out.push(["bwMode", this.blackWhiteMode.toString()]);
    return out;
  }

}
