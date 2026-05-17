// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.AnimateRotation

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
} from "../../element/index.js";

/** Animate Rotation.
 *
 * Element: `p:animRot` */
export class AnimateRotation extends OpenXmlCompositeElement {
  override readonly localName = "animRot" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** by (:by) */
  by: Int32Value | undefined;

  /** from (:from) */
  from: Int32Value | undefined;

  /** to (:to) */
  to: Int32Value | undefined;

  /** bounceEnd (p14:bounceEnd) */
  bounceEnd: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":by": this.by = Int32Value.parse(value); return;
      case ":from": this.from = Int32Value.parse(value); return;
      case ":to": this.to = Int32Value.parse(value); return;
      case "p14:bounceEnd": this.bounceEnd = Int32Value.parse(value); assertNumber(this.bounceEnd, { min: 0, max: 100000 }, { attribute: "p14:bounceEnd", elementClass: "AnimateRotation" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.by !== undefined) out.push([":by", this.by.toString()]);
    if (this.from !== undefined) out.push([":from", this.from.toString()]);
    if (this.to !== undefined) out.push([":to", this.to.toString()]);
    if (this.bounceEnd !== undefined) out.push(["p14:bounceEnd", this.bounceEnd.toString()]);
    return out;
  }

}
