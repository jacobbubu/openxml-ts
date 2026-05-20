// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.PivotTableDefinition

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the PivotTableDefinition Class.
 *
 * Element: `x14:pivotTableDefinition` */
export class PivotTableDefinition extends OpenXmlCompositeElement {
  override readonly localName = "pivotTableDefinition" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** fillDownLabelsDefault (:fillDownLabelsDefault) */
  fillDownLabelsDefault: BooleanValue | undefined;

  /** visualTotalsForSets (:visualTotalsForSets) */
  visualTotalsForSets: BooleanValue | undefined;

  /** calculatedMembersInFilters (:calculatedMembersInFilters) */
  calculatedMembersInFilters: BooleanValue | undefined;

  /** altText (:altText) */
  altText: StringValue | undefined;

  /** altTextSummary (:altTextSummary) */
  altTextSummary: StringValue | undefined;

  /** enableEdit (:enableEdit) */
  enableEdit: BooleanValue | undefined;

  /** autoApply (:autoApply) */
  autoApply: BooleanValue | undefined;

  /** allocationMethod (:allocationMethod) */
  allocationMethod: StringValue | undefined;

  /** weightExpression (:weightExpression) */
  weightExpression: StringValue | undefined;

  /** hideValuesRow (:hideValuesRow) */
  hideValuesRow: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "fillDownLabelsDefault": this.fillDownLabelsDefault = BooleanValue.parse(value); return;
      case "visualTotalsForSets": this.visualTotalsForSets = BooleanValue.parse(value); return;
      case "calculatedMembersInFilters": this.calculatedMembersInFilters = BooleanValue.parse(value); return;
      case "altText": this.altText = StringValue.parse(value); return;
      case "altTextSummary": this.altTextSummary = StringValue.parse(value); return;
      case "enableEdit": this.enableEdit = BooleanValue.parse(value); return;
      case "autoApply": this.autoApply = BooleanValue.parse(value); return;
      case "allocationMethod": this.allocationMethod = StringValue.parse(value); return;
      case "weightExpression": this.weightExpression = StringValue.parse(value); return;
      case "hideValuesRow": this.hideValuesRow = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.fillDownLabelsDefault !== undefined) out.push(["fillDownLabelsDefault", this.fillDownLabelsDefault.toString()]);
    if (this.visualTotalsForSets !== undefined) out.push(["visualTotalsForSets", this.visualTotalsForSets.toString()]);
    if (this.calculatedMembersInFilters !== undefined) out.push(["calculatedMembersInFilters", this.calculatedMembersInFilters.toString()]);
    if (this.altText !== undefined) out.push(["altText", this.altText.toString()]);
    if (this.altTextSummary !== undefined) out.push(["altTextSummary", this.altTextSummary.toString()]);
    if (this.enableEdit !== undefined) out.push(["enableEdit", this.enableEdit.toString()]);
    if (this.autoApply !== undefined) out.push(["autoApply", this.autoApply.toString()]);
    if (this.allocationMethod !== undefined) out.push(["allocationMethod", this.allocationMethod.toString()]);
    if (this.weightExpression !== undefined) out.push(["weightExpression", this.weightExpression.toString()]);
    if (this.hideValuesRow !== undefined) out.push(["hideValuesRow", this.hideValuesRow.toString()]);
    return out;
  }

}
