// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CalculatedColumnFormula

import {
  BooleanValue,
  OpenXmlElementList,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Calculated Column Formula.
 *
 * Element: `x:calculatedColumnFormula` */
export class CalculatedColumnFormula extends OpenXmlLeafElement {
  override readonly localName = "calculatedColumnFormula" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Array (:array) */
  array: BooleanValue | undefined;

  /** space (xml:space) */
  space: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "array": this.array = BooleanValue.parse(value); return;
      case "xml:space": this.space = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.array !== undefined) out.push(["array", this.array.toString()]);
    if (this.space !== undefined) out.push(["xml:space", this.space.toString()]);
    return out;
  }

}
