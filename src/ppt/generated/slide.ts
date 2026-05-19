// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.Slide

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Presentation Slide.
 *
 * Element: `p:sld` */
export class Slide extends OpenXmlCompositeElement {
  override readonly localName = "sld" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Show Master Shapes (:showMasterSp) */
  showMasterShapes: BooleanValue | undefined;

  /** Show Master Placeholder Animations (:showMasterPhAnim) */
  showMasterPlaceholderAnimations: BooleanValue | undefined;

  /** Show Slide in Slide Show (:show) */
  show: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "showMasterSp": this.showMasterShapes = BooleanValue.parse(value); return;
      case "showMasterPhAnim": this.showMasterPlaceholderAnimations = BooleanValue.parse(value); return;
      case "show": this.show = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.showMasterShapes !== undefined) out.push(["showMasterSp", this.showMasterShapes.toString()]);
    if (this.showMasterPlaceholderAnimations !== undefined) out.push(["showMasterPhAnim", this.showMasterPlaceholderAnimations.toString()]);
    if (this.show !== undefined) out.push(["show", this.show.toString()]);
    return out;
  }

}
