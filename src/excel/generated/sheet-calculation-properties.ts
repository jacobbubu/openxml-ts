// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.SheetCalculationProperties

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Defines the SheetCalculationProperties Class.
 *
 * Element: `x:sheetCalcPr` */
export class SheetCalculationProperties extends OpenXmlLeafElement {
  override readonly localName = "sheetCalcPr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Full Calculation On Load (:fullCalcOnLoad) */
  fullCalculationOnLoad: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":fullCalcOnLoad": this.fullCalculationOnLoad = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.fullCalculationOnLoad !== undefined) out.push([":fullCalcOnLoad", this.fullCalculationOnLoad.toString()]);
    return out;
  }

}
