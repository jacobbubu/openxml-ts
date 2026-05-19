// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.TableStyleInfo

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Table Style.
 *
 * Element: `x:tableStyleInfo` */
export class TableStyleInfo extends OpenXmlLeafElement {
  override readonly localName = "tableStyleInfo" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Style Name (:name) */
  name: StringValue | undefined;

  /** Show First Column (:showFirstColumn) */
  showFirstColumn: BooleanValue | undefined;

  /** Show Last Column (:showLastColumn) */
  showLastColumn: BooleanValue | undefined;

  /** Show Row Stripes (:showRowStripes) */
  showRowStripes: BooleanValue | undefined;

  /** Show Column Stripes (:showColumnStripes) */
  showColumnStripes: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "showFirstColumn": this.showFirstColumn = BooleanValue.parse(value); return;
      case "showLastColumn": this.showLastColumn = BooleanValue.parse(value); return;
      case "showRowStripes": this.showRowStripes = BooleanValue.parse(value); return;
      case "showColumnStripes": this.showColumnStripes = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.showFirstColumn !== undefined) out.push(["showFirstColumn", this.showFirstColumn.toString()]);
    if (this.showLastColumn !== undefined) out.push(["showLastColumn", this.showLastColumn.toString()]);
    if (this.showRowStripes !== undefined) out.push(["showRowStripes", this.showRowStripes.toString()]);
    if (this.showColumnStripes !== undefined) out.push(["showColumnStripes", this.showColumnStripes.toString()]);
    return out;
  }

}
