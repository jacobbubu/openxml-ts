// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.PivotCacheDefinition

import {
  BooleanValue,
  OpenXmlLeafElement,
  UInt32Value,
} from "../../element/index.js";

/** Defines the PivotCacheDefinition Class.
 *
 * Element: `x14:pivotCacheDefinition` */
export class PivotCacheDefinition extends OpenXmlLeafElement {
  override readonly localName = "pivotCacheDefinition" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;


  /** slicerData (:slicerData) */
  slicerData: BooleanValue | undefined;

  /** pivotCacheId (:pivotCacheId) */
  pivotCacheId: UInt32Value | undefined;

  /** supportSubqueryNonVisual (:supportSubqueryNonVisual) */
  supportSubqueryNonVisual: BooleanValue | undefined;

  /** supportSubqueryCalcMem (:supportSubqueryCalcMem) */
  supportSubqueryCalcMem: BooleanValue | undefined;

  /** supportAddCalcMems (:supportAddCalcMems) */
  supportAddCalcMems: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "slicerData": this.slicerData = BooleanValue.parse(value); return;
      case "pivotCacheId": this.pivotCacheId = UInt32Value.parse(value); return;
      case "supportSubqueryNonVisual": this.supportSubqueryNonVisual = BooleanValue.parse(value); return;
      case "supportSubqueryCalcMem": this.supportSubqueryCalcMem = BooleanValue.parse(value); return;
      case "supportAddCalcMems": this.supportAddCalcMems = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.slicerData !== undefined) out.push(["slicerData", this.slicerData.toString()]);
    if (this.pivotCacheId !== undefined) out.push(["pivotCacheId", this.pivotCacheId.toString()]);
    if (this.supportSubqueryNonVisual !== undefined) out.push(["supportSubqueryNonVisual", this.supportSubqueryNonVisual.toString()]);
    if (this.supportSubqueryCalcMem !== undefined) out.push(["supportSubqueryCalcMem", this.supportSubqueryCalcMem.toString()]);
    if (this.supportAddCalcMems !== undefined) out.push(["supportAddCalcMems", this.supportAddCalcMems.toString()]);
    return out;
  }

}
