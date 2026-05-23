// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2019_namedsheetviews.json
// @see DocumentFormat.OpenXml.Spreadsheetml2019Namedsheetviews.SortRules

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the SortRules Class.
 *
 * Element: `xnsv:sortRules` */
export class SortRules extends OpenXmlCompositeElement {
  override readonly localName = "sortRules" as const;
  override readonly prefix = "xnsv" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** sortMethod (:sortMethod) */
  sortMethod: StringValue | undefined;

  /** caseSensitive (:caseSensitive) */
  caseSensitive: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "sortMethod": this.sortMethod = StringValue.parse(value); return;
      case "caseSensitive": this.caseSensitive = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.sortMethod !== undefined) out.push(["sortMethod", this.sortMethod.toString()]);
    if (this.caseSensitive !== undefined) out.push(["caseSensitive", this.caseSensitive.toString()]);
    return out;
  }

}
