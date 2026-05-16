// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ChartSheetProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Chart Sheet Properties.
 *
 * Element: `x:sheetPr` */
export class ChartSheetProperties extends OpenXmlCompositeElement {
  override readonly localName = "sheetPr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Published (:published) */
  published: BooleanValue | undefined;

  /** Code Name (:codeName) */
  codeName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":published": this.published = BooleanValue.parse(value); return;
      case ":codeName": this.codeName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.published !== undefined) out.push([":published", this.published.toString()]);
    if (this.codeName !== undefined) out.push([":codeName", this.codeName.toString()]);
    return out;
  }

}
