// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.ShowProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Defines the ShowProperties Class.
 *
 * Element: `p:showPr` */
export class ShowProperties extends OpenXmlCompositeElement {
  override readonly localName = "showPr" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Loop Slide Show (:loop) */
  loop: BooleanValue | undefined;

  /** Show Narration in Slide Show (:showNarration) */
  showNarration: BooleanValue | undefined;

  /** Show Animation in Slide Show (:showAnimation) */
  showAnimation: BooleanValue | undefined;

  /** Use Timings in Slide Show (:useTimings) */
  useTimings: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "loop": this.loop = BooleanValue.parse(value); return;
      case "showNarration": this.showNarration = BooleanValue.parse(value); return;
      case "showAnimation": this.showAnimation = BooleanValue.parse(value); return;
      case "useTimings": this.useTimings = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.loop !== undefined) out.push(["loop", this.loop.toString()]);
    if (this.showNarration !== undefined) out.push(["showNarration", this.showNarration.toString()]);
    if (this.showAnimation !== undefined) out.push(["showAnimation", this.showAnimation.toString()]);
    if (this.useTimings !== undefined) out.push(["useTimings", this.useTimings.toString()]);
    return out;
  }

}
