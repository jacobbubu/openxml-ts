// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.HyperlinkOnClick

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the HyperlinkOnClick Class.
 *
 * Element: `a:hlinkClick` */
export class HyperlinkOnClick extends OpenXmlCompositeElement {
  override readonly localName = "hlinkClick" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** relationship identifier to find target URI (r:id) */
  id: StringValue | undefined;

  /** In case the url is invalid so we can't create a relationship, we'll save it here, r:id will point to a NULL one (:invalidUrl) */
  invalidUrl: StringValue | undefined;

  /** Action to take, it may still need r:id to specify an action target (:action) */
  action: StringValue | undefined;

  /** target frame for navigating to the URI (:tgtFrame) */
  targetFrame: StringValue | undefined;

  /** tooltip for display (:tooltip) */
  tooltip: StringValue | undefined;

  /** whether to add this URI to the history when navigating to it (:history) */
  history: BooleanValue | undefined;

  /** Whether to highlight it when click on a shape (:highlightClick) */
  highlightClick: BooleanValue | undefined;

  /** Whether to stop previous sound when click on it (:endSnd) */
  endSound: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:id": this.id = StringValue.parse(value); return;
      case "invalidUrl": this.invalidUrl = StringValue.parse(value); return;
      case "action": this.action = StringValue.parse(value); return;
      case "tgtFrame": this.targetFrame = StringValue.parse(value); return;
      case "tooltip": this.tooltip = StringValue.parse(value); return;
      case "history": this.history = BooleanValue.parse(value); return;
      case "highlightClick": this.highlightClick = BooleanValue.parse(value); return;
      case "endSnd": this.endSound = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    if (this.invalidUrl !== undefined) out.push(["invalidUrl", this.invalidUrl.toString()]);
    if (this.action !== undefined) out.push(["action", this.action.toString()]);
    if (this.targetFrame !== undefined) out.push(["tgtFrame", this.targetFrame.toString()]);
    if (this.tooltip !== undefined) out.push(["tooltip", this.tooltip.toString()]);
    if (this.history !== undefined) out.push(["history", this.history.toString()]);
    if (this.highlightClick !== undefined) out.push(["highlightClick", this.highlightClick.toString()]);
    if (this.endSound !== undefined) out.push(["endSnd", this.endSound.toString()]);
    return out;
  }

}
