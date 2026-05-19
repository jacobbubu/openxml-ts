// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.CommonMediaNode

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertNumber,
} from "../../element/index.js";

/** Common Media Node Properties.
 *
 * Element: `p:cMediaNode` */
export class CommonMediaNode extends OpenXmlCompositeElement {
  override readonly localName = "cMediaNode" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Volume (:vol) */
  volume: Int32Value | undefined;

  /** Mute (:mute) */
  mute: BooleanValue | undefined;

  /** Number of Slides (:numSld) */
  slideCount: UInt32Value | undefined;

  /** Show When Stopped (:showWhenStopped) */
  showWhenStopped: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "vol": this.volume = Int32Value.parse(value); assertNumber(this.volume, { min: 0, max: 100000 }, { attribute: ":vol", elementClass: "CommonMediaNode" }); return;
      case "mute": this.mute = BooleanValue.parse(value); return;
      case "numSld": this.slideCount = UInt32Value.parse(value); return;
      case "showWhenStopped": this.showWhenStopped = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.volume !== undefined) out.push(["vol", this.volume.toString()]);
    if (this.mute !== undefined) out.push(["mute", this.mute.toString()]);
    if (this.slideCount !== undefined) out.push(["numSld", this.slideCount.toString()]);
    if (this.showWhenStopped !== undefined) out.push(["showWhenStopped", this.showWhenStopped.toString()]);
    return out;
  }

}
