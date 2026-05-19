// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.PrintOptions

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Print Options.
 *
 * Element: `x:printOptions` */
export class PrintOptions extends OpenXmlLeafElement {
  override readonly localName = "printOptions" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Horizontal Centered (:horizontalCentered) */
  horizontalCentered: BooleanValue | undefined;

  /** Vertical Centered (:verticalCentered) */
  verticalCentered: BooleanValue | undefined;

  /** Print Headings (:headings) */
  headings: BooleanValue | undefined;

  /** Print Grid Lines (:gridLines) */
  gridLines: BooleanValue | undefined;

  /** Grid Lines Set (:gridLinesSet) */
  gridLinesSet: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "horizontalCentered": this.horizontalCentered = BooleanValue.parse(value); return;
      case "verticalCentered": this.verticalCentered = BooleanValue.parse(value); return;
      case "headings": this.headings = BooleanValue.parse(value); return;
      case "gridLines": this.gridLines = BooleanValue.parse(value); return;
      case "gridLinesSet": this.gridLinesSet = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.horizontalCentered !== undefined) out.push(["horizontalCentered", this.horizontalCentered.toString()]);
    if (this.verticalCentered !== undefined) out.push(["verticalCentered", this.verticalCentered.toString()]);
    if (this.headings !== undefined) out.push(["headings", this.headings.toString()]);
    if (this.gridLines !== undefined) out.push(["gridLines", this.gridLines.toString()]);
    if (this.gridLinesSet !== undefined) out.push(["gridLinesSet", this.gridLinesSet.toString()]);
    return out;
  }

}
