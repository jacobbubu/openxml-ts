// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2018_sketchyshapes.json
// @see DocumentFormat.OpenXml.Drawing2018Sketchyshapes.LineSketchStyleProperties

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../../element/index.js";

/** Defines the LineSketchStyleProperties Class.
 *
 * Element: `ask:lineSketchStyleProps` */
export class LineSketchStyleProperties extends OpenXmlCompositeElement {
  override readonly localName = "lineSketchStyleProps" as const;
  override readonly prefix = "ask" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2018/sketchyshapes" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** sd (:sd) */
  sd: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "sd": this.sd = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.sd !== undefined) out.push(["sd", this.sd.toString()]);
    return out;
  }

}
