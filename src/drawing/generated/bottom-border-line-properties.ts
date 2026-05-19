// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.BottomBorderLineProperties

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Bottom Border Line Properties.
 *
 * Element: `a:lnB` */
export class BottomBorderLineProperties extends OpenXmlCompositeElement {
  override readonly localName = "lnB" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** line width (:w) */
  width: Int32Value | undefined;

  /** line cap (:cap) */
  capType: StringValue | undefined;

  /** compound line type (:cmpd) */
  compoundLineType: StringValue | undefined;

  /** pen alignment (:algn) */
  alignment: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w": this.width = Int32Value.parse(value); assertNumber(this.width, { min: 0, max: 20116800 }, { attribute: ":w", elementClass: "BottomBorderLineProperties" }); return;
      case "cap": this.capType = StringValue.parse(value); return;
      case "cmpd": this.compoundLineType = StringValue.parse(value); return;
      case "algn": this.alignment = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.width !== undefined) out.push(["w", this.width.toString()]);
    if (this.capType !== undefined) out.push(["cap", this.capType.toString()]);
    if (this.compoundLineType !== undefined) out.push(["cmpd", this.compoundLineType.toString()]);
    if (this.alignment !== undefined) out.push(["algn", this.alignment.toString()]);
    return out;
  }

}
