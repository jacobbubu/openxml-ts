// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.AnimateMotion

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Animate Motion.
 *
 * Element: `p:animMotion` */
export class AnimateMotion extends OpenXmlCompositeElement {
  override readonly localName = "animMotion" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** origin (:origin) */
  origin: StringValue | undefined;

  /** path (:path) */
  path: StringValue | undefined;

  /** pathEditMode (:pathEditMode) */
  pathEditMode: StringValue | undefined;

  /** rAng (:rAng) */
  relativeAngle: Int32Value | undefined;

  /** ptsTypes (:ptsTypes) */
  pointTypes: StringValue | undefined;

  /** bounceEnd (p14:bounceEnd) */
  bounceEnd: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":origin": this.origin = StringValue.parse(value); return;
      case ":path": this.path = StringValue.parse(value); return;
      case ":pathEditMode": this.pathEditMode = StringValue.parse(value); return;
      case ":rAng": this.relativeAngle = Int32Value.parse(value); return;
      case ":ptsTypes": this.pointTypes = StringValue.parse(value); return;
      case "p14:bounceEnd": this.bounceEnd = Int32Value.parse(value); assertNumber(this.bounceEnd, { min: 0, max: 100000 }, { attribute: "p14:bounceEnd", elementClass: "AnimateMotion" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.origin !== undefined) out.push([":origin", this.origin.toString()]);
    if (this.path !== undefined) out.push([":path", this.path.toString()]);
    if (this.pathEditMode !== undefined) out.push([":pathEditMode", this.pathEditMode.toString()]);
    if (this.relativeAngle !== undefined) out.push([":rAng", this.relativeAngle.toString()]);
    if (this.pointTypes !== undefined) out.push([":ptsTypes", this.pointTypes.toString()]);
    if (this.bounceEnd !== undefined) out.push(["p14:bounceEnd", this.bounceEnd.toString()]);
    return out;
  }

}
