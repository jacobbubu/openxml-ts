// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.HyperlinkRuby

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../element/index.js";

/** Defines the HyperlinkRuby Class.
 *
 * Element: `w:hyperlink` */
export class HyperlinkRuby extends OpenXmlCompositeElement {
  override readonly localName = "hyperlink" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** tgtFrame (w:tgtFrame) */
  targetFrame: StringValue | undefined;

  /** tooltip (w:tooltip) */
  tooltip: StringValue | undefined;

  /** docLocation (w:docLocation) */
  docLocation: StringValue | undefined;

  /** history (w:history) */
  history: BooleanValue | undefined;

  /** anchor (w:anchor) */
  anchor: StringValue | undefined;

  /** id (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:tgtFrame": this.targetFrame = StringValue.parse(value); assertString(this.targetFrame, { maxLength: 255 }, { attribute: "w:tgtFrame", elementClass: "HyperlinkRuby" }); return;
      case "w:tooltip": this.tooltip = StringValue.parse(value); assertString(this.tooltip, { maxLength: 260 }, { attribute: "w:tooltip", elementClass: "HyperlinkRuby" }); return;
      case "w:docLocation": this.docLocation = StringValue.parse(value); assertString(this.docLocation, { maxLength: 255 }, { attribute: "w:docLocation", elementClass: "HyperlinkRuby" }); return;
      case "w:history": this.history = BooleanValue.parse(value); return;
      case "w:anchor": this.anchor = StringValue.parse(value); assertString(this.anchor, { maxLength: 255 }, { attribute: "w:anchor", elementClass: "HyperlinkRuby" }); return;
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.targetFrame !== undefined) out.push(["w:tgtFrame", this.targetFrame.toString()]);
    if (this.tooltip !== undefined) out.push(["w:tooltip", this.tooltip.toString()]);
    if (this.docLocation !== undefined) out.push(["w:docLocation", this.docLocation.toString()]);
    if (this.history !== undefined) out.push(["w:history", this.history.toString()]);
    if (this.anchor !== undefined) out.push(["w:anchor", this.anchor.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

}
