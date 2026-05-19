// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.AnimateScale

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
} from "../../element/index.js";

/** Animate Scale.
 *
 * Element: `p:animScale` */
export class AnimateScale extends OpenXmlCompositeElement {
  override readonly localName = "animScale" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** zoomContents (:zoomContents) */
  zoomContents: BooleanValue | undefined;

  /** bounceEnd (p14:bounceEnd) */
  bounceEnd: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "zoomContents": this.zoomContents = BooleanValue.parse(value); return;
      case "p14:bounceEnd": this.bounceEnd = Int32Value.parse(value); assertNumber(this.bounceEnd, { min: 0, max: 100000 }, { attribute: "p14:bounceEnd", elementClass: "AnimateScale" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.zoomContents !== undefined) out.push(["zoomContents", this.zoomContents.toString()]);
    if (this.bounceEnd !== undefined) out.push(["p14:bounceEnd", this.bounceEnd.toString()]);
    return out;
  }

}
