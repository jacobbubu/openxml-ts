// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.ImageEffect

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Defines the ImageEffect Class.
 *
 * Element: `a14:imgEffect` */
export class ImageEffect extends OpenXmlCompositeElement {
  override readonly localName = "imgEffect" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** visible (:visible) */
  visible: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "visible": this.visible = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.visible !== undefined) out.push(["visible", this.visible.toString()]);
    return out;
  }

}
