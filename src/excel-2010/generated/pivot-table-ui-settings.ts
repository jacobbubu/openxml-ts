// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.PivotTableUISettings

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the PivotTableUISettings Class.
 *
 * Element: `x15:pivotTableUISettings` */
export class PivotTableUISettings extends OpenXmlCompositeElement {
  override readonly localName = "pivotTableUISettings" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** sourceDataName (:sourceDataName) */
  sourceDataName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "sourceDataName": this.sourceDataName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.sourceDataName !== undefined) out.push(["sourceDataName", this.sourceDataName.toString()]);
    return out;
  }

}
