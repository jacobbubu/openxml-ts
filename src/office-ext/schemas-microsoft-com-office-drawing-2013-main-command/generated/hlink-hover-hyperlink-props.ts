// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.HlinkHoverHyperlinkProps

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the HlinkHoverHyperlinkProps Class.
 *
 * Element: `oac:hlinkHover` */
export class HlinkHoverHyperlinkProps extends OpenXmlCompositeElement {
  override readonly localName = "hlinkHover" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** source (:source) */
  source: StringValue | undefined;

  /** action (:action) */
  action: StringValue | undefined;

  /** tgtFrame (:tgtFrame) */
  tgtFrame: StringValue | undefined;

  /** tooltip (:tooltip) */
  tooltip: StringValue | undefined;

  /** highlightClick (:highlightClick) */
  highlightClick: BooleanValue | undefined;

  /** endSnd (:endSnd) */
  endSnd: BooleanValue | undefined;

  /** sndName (:sndName) */
  sndName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "source": this.source = StringValue.parse(value); return;
      case "action": this.action = StringValue.parse(value); return;
      case "tgtFrame": this.tgtFrame = StringValue.parse(value); return;
      case "tooltip": this.tooltip = StringValue.parse(value); return;
      case "highlightClick": this.highlightClick = BooleanValue.parse(value); return;
      case "endSnd": this.endSnd = BooleanValue.parse(value); return;
      case "sndName": this.sndName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.source !== undefined) out.push(["source", this.source.toString()]);
    if (this.action !== undefined) out.push(["action", this.action.toString()]);
    if (this.tgtFrame !== undefined) out.push(["tgtFrame", this.tgtFrame.toString()]);
    if (this.tooltip !== undefined) out.push(["tooltip", this.tooltip.toString()]);
    if (this.highlightClick !== undefined) out.push(["highlightClick", this.highlightClick.toString()]);
    if (this.endSnd !== undefined) out.push(["endSnd", this.endSnd.toString()]);
    if (this.sndName !== undefined) out.push(["sndName", this.sndName.toString()]);
    return out;
  }

}
