// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_wordprocessingDrawing.json
// @see DocumentFormat.OpenXml.WordprocessingDrawing.WrapPolygon

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Tight Wrapping Extents Polygon.
 *
 * Element: `wp:wrapPolygon` */
export class WrapPolygon extends OpenXmlCompositeElement {
  override readonly localName = "wrapPolygon" as const;
  override readonly prefix = "wp" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Wrapping Points Modified (:edited) */
  edited: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "edited": this.edited = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.edited !== undefined) out.push(["edited", this.edited.toString()]);
    return out;
  }

}
