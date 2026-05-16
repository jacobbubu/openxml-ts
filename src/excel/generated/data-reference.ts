// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.DataReference

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Data Consolidation Reference.
 *
 * Element: `x:dataRef` */
export class DataReference extends OpenXmlLeafElement {
  override readonly localName = "dataRef" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Reference (:ref) */
  reference: StringValue | undefined;

  /** Named Range (:name) */
  name: StringValue | undefined;

  /** Sheet Name (:sheet) */
  sheet: StringValue | undefined;

  /** relationship Id (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":ref": this.reference = StringValue.parse(value); return;
      case ":name": this.name = StringValue.parse(value); return;
      case ":sheet": this.sheet = StringValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.reference !== undefined) out.push([":ref", this.reference.toString()]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.sheet !== undefined) out.push([":sheet", this.sheet.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

}
