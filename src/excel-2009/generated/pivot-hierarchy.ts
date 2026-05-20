// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.PivotHierarchy

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Defines the PivotHierarchy Class.
 *
 * Element: `x14:pivotHierarchy` */
export class PivotHierarchy extends OpenXmlLeafElement {
  override readonly localName = "pivotHierarchy" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;


  /** ignore (:ignore) */
  ignore: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ignore": this.ignore = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.ignore !== undefined) out.push(["ignore", this.ignore.toString()]);
    return out;
  }

}
