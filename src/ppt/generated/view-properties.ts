// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.ViewProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Presentation-wide View Properties.
 *
 * Element: `p:viewPr` */
export class ViewProperties extends OpenXmlCompositeElement {
  override readonly localName = "viewPr" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Last View (:lastView) */
  lastView: StringValue | undefined;

  /** Show Comments (:showComments) */
  showComments: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "lastView": this.lastView = StringValue.parse(value); return;
      case "showComments": this.showComments = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.lastView !== undefined) out.push(["lastView", this.lastView.toString()]);
    if (this.showComments !== undefined) out.push(["showComments", this.showComments.toString()]);
    return out;
  }

}
