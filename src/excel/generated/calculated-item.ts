// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CalculatedItem

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Calculated Item.
 *
 * Element: `x:calculatedItem` */
export class CalculatedItem extends OpenXmlCompositeElement {
  override readonly localName = "calculatedItem" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Field Index (:field) */
  field: UInt32Value | undefined;

  /** Calculated Item Formula (:formula) */
  formula: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":field": this.field = UInt32Value.parse(value); return;
      case ":formula": this.formula = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.field !== undefined) out.push([":field", this.field.toString()]);
    if (this.formula !== undefined) out.push([":formula", this.formula.toString()]);
    return out;
  }

}
