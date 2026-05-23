// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_richdata2.json
// @see DocumentFormat.OpenXml.Spreadsheetml2017Richdata2.CustomRichFilters

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../../element/index.js";

/** Defines the CustomRichFilters Class.
 *
 * Element: `xlrd2:customFilters` */
export class CustomRichFilters extends OpenXmlCompositeElement {
  override readonly localName = "customFilters" as const;
  override readonly prefix = "xlrd2" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** and (:and) */
  and: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "and": this.and = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.and !== undefined) out.push(["and", this.and.toString()]);
    return out;
  }

}
