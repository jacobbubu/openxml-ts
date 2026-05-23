// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.LinePropertiesType

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
} from "../../../element/index.js";

/** Defines the LinePropertiesType Class.
 *
 * Element: `oac:lineProps` */
export class LinePropertiesType extends OpenXmlCompositeElement {
  override readonly localName = "lineProps" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;
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
      case "w": this.width = Int32Value.parse(value); assertNumber(this.width, { min: 0, max: 20116800 }, { attribute: ":w", elementClass: "LinePropertiesType" }); return;
      case "cap": this.capType = StringValue.parse(value); return;
      case "cmpd": this.compoundLineType = StringValue.parse(value); return;
      case "algn": this.alignment = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.width !== undefined) out.push(["w", this.width.toString()]);
    if (this.capType !== undefined) out.push(["cap", this.capType.toString()]);
    if (this.compoundLineType !== undefined) out.push(["cmpd", this.compoundLineType.toString()]);
    if (this.alignment !== undefined) out.push(["algn", this.alignment.toString()]);
    return out;
  }

}
