// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.PivotField

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Defines the PivotField Class.
 *
 * Element: `x14:pivotField` */
export class PivotField extends OpenXmlLeafElement {
  override readonly localName = "pivotField" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;


  /** fillDownLabels (:fillDownLabels) */
  fillDownLabels: BooleanValue | undefined;

  /** ignore (:ignore) */
  ignore: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "fillDownLabels": this.fillDownLabels = BooleanValue.parse(value); return;
      case "ignore": this.ignore = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.fillDownLabels !== undefined) out.push(["fillDownLabels", this.fillDownLabels.toString()]);
    if (this.ignore !== undefined) out.push(["ignore", this.ignore.toString()]);
    return out;
  }

}
