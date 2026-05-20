// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.DataField

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the DataField Class.
 *
 * Element: `x14:dataField` */
export class DataField extends OpenXmlLeafElement {
  override readonly localName = "dataField" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;


  /** pivotShowAs (:pivotShowAs) */
  pivotShowAs: StringValue | undefined;

  /** sourceField (:sourceField) */
  sourceField: UInt32Value | undefined;

  /** uniqueName (:uniqueName) */
  uniqueName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "pivotShowAs": this.pivotShowAs = StringValue.parse(value); return;
      case "sourceField": this.sourceField = UInt32Value.parse(value); return;
      case "uniqueName": this.uniqueName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.pivotShowAs !== undefined) out.push(["pivotShowAs", this.pivotShowAs.toString()]);
    if (this.sourceField !== undefined) out.push(["sourceField", this.sourceField.toString()]);
    if (this.uniqueName !== undefined) out.push(["uniqueName", this.uniqueName.toString()]);
    return out;
  }

}
