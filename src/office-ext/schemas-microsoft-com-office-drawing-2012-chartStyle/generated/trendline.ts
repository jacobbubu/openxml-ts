// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.Trendline

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the Trendline Class.
 *
 * Element: `cs:trendline` */
export class Trendline extends OpenXmlLeafElement {
  override readonly localName = "trendline" as const;
  override readonly prefix = "cs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chartStyle" as const;


  /** add (:add) */
  add: StringValue | undefined;

  /** equation (:equation) */
  equation: StringValue | undefined;

  /** rsquared (:rsquared) */
  rSquared: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "add": this.add = StringValue.parse(value); return;
      case "equation": this.equation = StringValue.parse(value); return;
      case "rsquared": this.rSquared = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.add !== undefined) out.push(["add", this.add.toString()]);
    if (this.equation !== undefined) out.push(["equation", this.equation.toString()]);
    if (this.rSquared !== undefined) out.push(["rsquared", this.rSquared.toString()]);
    return out;
  }

}
