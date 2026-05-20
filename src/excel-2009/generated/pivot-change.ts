// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.PivotChange

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the PivotChange Class.
 *
 * Element: `x14:pivotChange` */
export class PivotChange extends OpenXmlCompositeElement {
  override readonly localName = "pivotChange" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** allocationMethod (:allocationMethod) */
  allocationMethod: StringValue | undefined;

  /** weightExpression (:weightExpression) */
  weightExpression: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "allocationMethod": this.allocationMethod = StringValue.parse(value); return;
      case "weightExpression": this.weightExpression = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.allocationMethod !== undefined) out.push(["allocationMethod", this.allocationMethod.toString()]);
    if (this.weightExpression !== undefined) out.push(["weightExpression", this.weightExpression.toString()]);
    return out;
  }

}
