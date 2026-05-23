// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2008_diagram.json
// @see DocumentFormat.OpenXml.Drawing2008Diagram.NonVisualDrawingShapeProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../../element/index.js";

/** Defines the NonVisualDrawingShapeProperties Class.
 *
 * Element: `dsp:cNvSpPr` */
export class NonVisualDrawingShapeProperties extends OpenXmlCompositeElement {
  override readonly localName = "cNvSpPr" as const;
  override readonly prefix = "dsp" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2008/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Text Box (:txBox) */
  textBox: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "txBox": this.textBox = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.textBox !== undefined) out.push(["txBox", this.textBox.toString()]);
    return out;
  }

}
