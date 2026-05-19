// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.SlideLayout

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Slide Layout.
 *
 * Element: `p:sldLayout` */
export class SlideLayout extends OpenXmlCompositeElement {
  override readonly localName = "sldLayout" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Show Master Shapes (:showMasterSp) */
  showMasterShapes: BooleanValue | undefined;

  /** Show Master Placeholder Animations (:showMasterPhAnim) */
  showMasterPlaceholderAnimations: BooleanValue | undefined;

  /** matchingName (:matchingName) */
  matchingName: StringValue | undefined;

  /** type (:type) */
  type: StringValue | undefined;

  /** preserve (:preserve) */
  preserve: BooleanValue | undefined;

  /** userDrawn (:userDrawn) */
  userDrawn: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "showMasterSp": this.showMasterShapes = BooleanValue.parse(value); return;
      case "showMasterPhAnim": this.showMasterPlaceholderAnimations = BooleanValue.parse(value); return;
      case "matchingName": this.matchingName = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "preserve": this.preserve = BooleanValue.parse(value); return;
      case "userDrawn": this.userDrawn = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.showMasterShapes !== undefined) out.push(["showMasterSp", this.showMasterShapes.toString()]);
    if (this.showMasterPlaceholderAnimations !== undefined) out.push(["showMasterPhAnim", this.showMasterPlaceholderAnimations.toString()]);
    if (this.matchingName !== undefined) out.push(["matchingName", this.matchingName.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.preserve !== undefined) out.push(["preserve", this.preserve.toString()]);
    if (this.userDrawn !== undefined) out.push(["userDrawn", this.userDrawn.toString()]);
    return out;
  }

}
