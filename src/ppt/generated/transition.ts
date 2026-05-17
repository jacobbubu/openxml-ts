// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.Transition

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Slide Transition.
 *
 * Element: `p:transition` */
export class Transition extends OpenXmlCompositeElement {
  override readonly localName = "transition" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** spd (:spd) */
  speed: StringValue | undefined;

  /** dur (p14:dur) */
  duration: StringValue | undefined;

  /** Specifies whether a mouse click will advance the slide. (:advClick) */
  advanceOnClick: BooleanValue | undefined;

  /** advTm (:advTm) */
  advanceAfterTime: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":spd": this.speed = StringValue.parse(value); return;
      case "p14:dur": this.duration = StringValue.parse(value); return;
      case ":advClick": this.advanceOnClick = BooleanValue.parse(value); return;
      case ":advTm": this.advanceAfterTime = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.speed !== undefined) out.push([":spd", this.speed.toString()]);
    if (this.duration !== undefined) out.push(["p14:dur", this.duration.toString()]);
    if (this.advanceOnClick !== undefined) out.push([":advClick", this.advanceOnClick.toString()]);
    if (this.advanceAfterTime !== undefined) out.push([":advTm", this.advanceAfterTime.toString()]);
    return out;
  }

}
