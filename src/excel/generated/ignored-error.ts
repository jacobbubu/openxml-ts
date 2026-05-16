// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.IgnoredError

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Ignored Error.
 *
 * Element: `x:ignoredError` */
export class IgnoredError extends OpenXmlLeafElement {
  override readonly localName = "ignoredError" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Sequence of References (:sqref) */
  sequenceOfReferences: StringValue | undefined;

  /** Evaluation Error (:evalError) */
  evalError: BooleanValue | undefined;

  /** Two Digit Text Year (:twoDigitTextYear) */
  twoDigitTextYear: BooleanValue | undefined;

  /** Number Stored As Text (:numberStoredAsText) */
  numberStoredAsText: BooleanValue | undefined;

  /** Formula (:formula) */
  formula: BooleanValue | undefined;

  /** Formula Range (:formulaRange) */
  formulaRange: BooleanValue | undefined;

  /** Unlocked Formula (:unlockedFormula) */
  unlockedFormula: BooleanValue | undefined;

  /** Empty Cell Reference (:emptyCellReference) */
  emptyCellReference: BooleanValue | undefined;

  /** List Data Validation (:listDataValidation) */
  listDataValidation: BooleanValue | undefined;

  /** Calculated Column (:calculatedColumn) */
  calculatedColumn: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":sqref": this.sequenceOfReferences = StringValue.parse(value); return;
      case ":evalError": this.evalError = BooleanValue.parse(value); return;
      case ":twoDigitTextYear": this.twoDigitTextYear = BooleanValue.parse(value); return;
      case ":numberStoredAsText": this.numberStoredAsText = BooleanValue.parse(value); return;
      case ":formula": this.formula = BooleanValue.parse(value); return;
      case ":formulaRange": this.formulaRange = BooleanValue.parse(value); return;
      case ":unlockedFormula": this.unlockedFormula = BooleanValue.parse(value); return;
      case ":emptyCellReference": this.emptyCellReference = BooleanValue.parse(value); return;
      case ":listDataValidation": this.listDataValidation = BooleanValue.parse(value); return;
      case ":calculatedColumn": this.calculatedColumn = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.sequenceOfReferences !== undefined) out.push([":sqref", this.sequenceOfReferences.toString()]);
    if (this.evalError !== undefined) out.push([":evalError", this.evalError.toString()]);
    if (this.twoDigitTextYear !== undefined) out.push([":twoDigitTextYear", this.twoDigitTextYear.toString()]);
    if (this.numberStoredAsText !== undefined) out.push([":numberStoredAsText", this.numberStoredAsText.toString()]);
    if (this.formula !== undefined) out.push([":formula", this.formula.toString()]);
    if (this.formulaRange !== undefined) out.push([":formulaRange", this.formulaRange.toString()]);
    if (this.unlockedFormula !== undefined) out.push([":unlockedFormula", this.unlockedFormula.toString()]);
    if (this.emptyCellReference !== undefined) out.push([":emptyCellReference", this.emptyCellReference.toString()]);
    if (this.listDataValidation !== undefined) out.push([":listDataValidation", this.listDataValidation.toString()]);
    if (this.calculatedColumn !== undefined) out.push([":calculatedColumn", this.calculatedColumn.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.sequenceOfReferences, { attribute: ":sqref", elementClass: "IgnoredError" });
  }
}
