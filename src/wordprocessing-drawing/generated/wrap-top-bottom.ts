// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_wordprocessingDrawing.json
// @see DocumentFormat.OpenXml.WordprocessingDrawing.WrapTopBottom

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../element/index.js";

/** Top and Bottom Wrapping.
 *
 * Element: `wp:wrapTopAndBottom` */
export class WrapTopBottom extends OpenXmlCompositeElement {
  override readonly localName = "wrapTopAndBottom" as const;
  override readonly prefix = "wp" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Distance From Text on Top Edge (:distT) */
  distanceFromTop: UInt32Value | undefined;

  /** Distance From Text on Bottom Edge (:distB) */
  distanceFromBottom: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "distT": this.distanceFromTop = UInt32Value.parse(value); return;
      case "distB": this.distanceFromBottom = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.distanceFromTop !== undefined) out.push(["distT", this.distanceFromTop.toString()]);
    if (this.distanceFromBottom !== undefined) out.push(["distB", this.distanceFromBottom.toString()]);
    return out;
  }

}
