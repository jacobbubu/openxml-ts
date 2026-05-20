// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_picture.json
// @see DocumentFormat.OpenXml.Picture.NonVisualPictureDrawingProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Non-Visual Picture Drawing Properties.
 *
 * Element: `pic:cNvPicPr` */
export class NonVisualPictureDrawingProperties extends OpenXmlCompositeElement {
  override readonly localName = "cNvPicPr" as const;
  override readonly prefix = "pic" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/picture" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** preferRelativeResize (:preferRelativeResize) */
  preferRelativeResize: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "preferRelativeResize": this.preferRelativeResize = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.preferRelativeResize !== undefined) out.push(["preferRelativeResize", this.preferRelativeResize.toString()]);
    return out;
  }

}
