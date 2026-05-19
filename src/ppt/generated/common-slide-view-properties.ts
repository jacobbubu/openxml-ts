// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.CommonSlideViewProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Defines the CommonSlideViewProperties Class.
 *
 * Element: `p:cSldViewPr` */
export class CommonSlideViewProperties extends OpenXmlCompositeElement {
  override readonly localName = "cSldViewPr" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Snap Objects to Grid (:snapToGrid) */
  snapToGrid: BooleanValue | undefined;

  /** Snap Objects to Objects (:snapToObjects) */
  snapToObjects: BooleanValue | undefined;

  /** Show Guides in View (:showGuides) */
  showGuides: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "snapToGrid": this.snapToGrid = BooleanValue.parse(value); return;
      case "snapToObjects": this.snapToObjects = BooleanValue.parse(value); return;
      case "showGuides": this.showGuides = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.snapToGrid !== undefined) out.push(["snapToGrid", this.snapToGrid.toString()]);
    if (this.snapToObjects !== undefined) out.push(["snapToObjects", this.snapToObjects.toString()]);
    if (this.showGuides !== undefined) out.push(["showGuides", this.showGuides.toString()]);
    return out;
  }

}
