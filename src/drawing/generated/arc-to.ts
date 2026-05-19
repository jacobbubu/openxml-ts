// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.ArcTo

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Draw Arc To.
 *
 * Element: `a:arcTo` */
export class ArcTo extends OpenXmlLeafElement {
  override readonly localName = "arcTo" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Shape Arc Width Radius (:wR) */
  widthRadius: StringValue | undefined;

  /** Shape Arc Height Radius (:hR) */
  heightRadius: StringValue | undefined;

  /** Shape Arc Start Angle (:stAng) */
  startAngle: StringValue | undefined;

  /** Shape Arc Swing Angle (:swAng) */
  swingAngle: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "wR": this.widthRadius = StringValue.parse(value); return;
      case "hR": this.heightRadius = StringValue.parse(value); return;
      case "stAng": this.startAngle = StringValue.parse(value); return;
      case "swAng": this.swingAngle = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.widthRadius !== undefined) out.push(["wR", this.widthRadius.toString()]);
    if (this.heightRadius !== undefined) out.push(["hR", this.heightRadius.toString()]);
    if (this.startAngle !== undefined) out.push(["stAng", this.startAngle.toString()]);
    if (this.swingAngle !== undefined) out.push(["swAng", this.swingAngle.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.widthRadius, { attribute: ":wR", elementClass: "ArcTo" });
    assertRequired(this.heightRadius, { attribute: ":hR", elementClass: "ArcTo" });
    assertRequired(this.startAngle, { attribute: ":stAng", elementClass: "ArcTo" });
    assertRequired(this.swingAngle, { attribute: ":swAng", elementClass: "ArcTo" });
  }
}
