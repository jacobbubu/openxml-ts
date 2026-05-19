// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.ApplicationNonVisualDrawingProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Application Non-Visual Drawing Properties.
 *
 * Element: `p:nvPr` */
export class ApplicationNonVisualDrawingProperties extends OpenXmlCompositeElement {
  override readonly localName = "nvPr" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Is a Photo Album (:isPhoto) */
  isPhoto: BooleanValue | undefined;

  /** Is User Drawn (:userDrawn) */
  userDrawn: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "isPhoto": this.isPhoto = BooleanValue.parse(value); return;
      case "userDrawn": this.userDrawn = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.isPhoto !== undefined) out.push(["isPhoto", this.isPhoto.toString()]);
    if (this.userDrawn !== undefined) out.push(["userDrawn", this.userDrawn.toString()]);
    return out;
  }

}
