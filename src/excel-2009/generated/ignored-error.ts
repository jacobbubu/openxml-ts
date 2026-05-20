// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.IgnoredError

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Defines the IgnoredError Class.
 *
 * Element: `x14:ignoredError` */
export class IgnoredError extends OpenXmlCompositeElement {
  override readonly localName = "ignoredError" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** evalError (:evalError) */
  evalError: BooleanValue | undefined;

  /** twoDigitTextYear (:twoDigitTextYear) */
  twoDigitTextYear: BooleanValue | undefined;

  /** numberStoredAsText (:numberStoredAsText) */
  numberStoredAsText: BooleanValue | undefined;

  /** formula (:formula) */
  formula: BooleanValue | undefined;

  /** formulaRange (:formulaRange) */
  formulaRange: BooleanValue | undefined;

  /** unlockedFormula (:unlockedFormula) */
  unlockedFormula: BooleanValue | undefined;

  /** emptyCellReference (:emptyCellReference) */
  emptyCellReference: BooleanValue | undefined;

  /** listDataValidation (:listDataValidation) */
  listDataValidation: BooleanValue | undefined;

  /** calculatedColumn (:calculatedColumn) */
  calculatedColumn: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "evalError": this.evalError = BooleanValue.parse(value); return;
      case "twoDigitTextYear": this.twoDigitTextYear = BooleanValue.parse(value); return;
      case "numberStoredAsText": this.numberStoredAsText = BooleanValue.parse(value); return;
      case "formula": this.formula = BooleanValue.parse(value); return;
      case "formulaRange": this.formulaRange = BooleanValue.parse(value); return;
      case "unlockedFormula": this.unlockedFormula = BooleanValue.parse(value); return;
      case "emptyCellReference": this.emptyCellReference = BooleanValue.parse(value); return;
      case "listDataValidation": this.listDataValidation = BooleanValue.parse(value); return;
      case "calculatedColumn": this.calculatedColumn = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.evalError !== undefined) out.push(["evalError", this.evalError.toString()]);
    if (this.twoDigitTextYear !== undefined) out.push(["twoDigitTextYear", this.twoDigitTextYear.toString()]);
    if (this.numberStoredAsText !== undefined) out.push(["numberStoredAsText", this.numberStoredAsText.toString()]);
    if (this.formula !== undefined) out.push(["formula", this.formula.toString()]);
    if (this.formulaRange !== undefined) out.push(["formulaRange", this.formulaRange.toString()]);
    if (this.unlockedFormula !== undefined) out.push(["unlockedFormula", this.unlockedFormula.toString()]);
    if (this.emptyCellReference !== undefined) out.push(["emptyCellReference", this.emptyCellReference.toString()]);
    if (this.listDataValidation !== undefined) out.push(["listDataValidation", this.listDataValidation.toString()]);
    if (this.calculatedColumn !== undefined) out.push(["calculatedColumn", this.calculatedColumn.toString()]);
    return out;
  }

}
