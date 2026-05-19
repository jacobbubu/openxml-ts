// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CalculationProperties

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the CalculationProperties Class.
 *
 * Element: `x:calcPr` */
export class CalculationProperties extends OpenXmlLeafElement {
  override readonly localName = "calcPr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Calculation Id (:calcId) */
  calculationId: UInt32Value | undefined;

  /** Calculation Mode (:calcMode) */
  calculationMode: StringValue | undefined;

  /** Full Calculation On Load (:fullCalcOnLoad) */
  fullCalculationOnLoad: BooleanValue | undefined;

  /** Reference Mode (:refMode) */
  referenceMode: StringValue | undefined;

  /** Calculation Iteration (:iterate) */
  iterate: BooleanValue | undefined;

  /** Iteration Count (:iterateCount) */
  iterateCount: UInt32Value | undefined;

  /** Iterative Calculation Delta (:iterateDelta) */
  iterateDelta: StringValue | undefined;

  /** Full Precision Calculation (:fullPrecision) */
  fullPrecision: BooleanValue | undefined;

  /** Calc Completed (:calcCompleted) */
  calculationCompleted: BooleanValue | undefined;

  /** Calculate On Save (:calcOnSave) */
  calculationOnSave: BooleanValue | undefined;

  /** Concurrent Calculations (:concurrentCalc) */
  concurrentCalculation: BooleanValue | undefined;

  /** Concurrent Thread Manual Count (:concurrentManualCount) */
  concurrentManualCount: UInt32Value | undefined;

  /** Force Full Calculation (:forceFullCalc) */
  forceFullCalculation: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "calcId": this.calculationId = UInt32Value.parse(value); return;
      case "calcMode": this.calculationMode = StringValue.parse(value); return;
      case "fullCalcOnLoad": this.fullCalculationOnLoad = BooleanValue.parse(value); return;
      case "refMode": this.referenceMode = StringValue.parse(value); return;
      case "iterate": this.iterate = BooleanValue.parse(value); return;
      case "iterateCount": this.iterateCount = UInt32Value.parse(value); return;
      case "iterateDelta": this.iterateDelta = StringValue.parse(value); return;
      case "fullPrecision": this.fullPrecision = BooleanValue.parse(value); return;
      case "calcCompleted": this.calculationCompleted = BooleanValue.parse(value); return;
      case "calcOnSave": this.calculationOnSave = BooleanValue.parse(value); return;
      case "concurrentCalc": this.concurrentCalculation = BooleanValue.parse(value); return;
      case "concurrentManualCount": this.concurrentManualCount = UInt32Value.parse(value); return;
      case "forceFullCalc": this.forceFullCalculation = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.calculationId !== undefined) out.push(["calcId", this.calculationId.toString()]);
    if (this.calculationMode !== undefined) out.push(["calcMode", this.calculationMode.toString()]);
    if (this.fullCalculationOnLoad !== undefined) out.push(["fullCalcOnLoad", this.fullCalculationOnLoad.toString()]);
    if (this.referenceMode !== undefined) out.push(["refMode", this.referenceMode.toString()]);
    if (this.iterate !== undefined) out.push(["iterate", this.iterate.toString()]);
    if (this.iterateCount !== undefined) out.push(["iterateCount", this.iterateCount.toString()]);
    if (this.iterateDelta !== undefined) out.push(["iterateDelta", this.iterateDelta.toString()]);
    if (this.fullPrecision !== undefined) out.push(["fullPrecision", this.fullPrecision.toString()]);
    if (this.calculationCompleted !== undefined) out.push(["calcCompleted", this.calculationCompleted.toString()]);
    if (this.calculationOnSave !== undefined) out.push(["calcOnSave", this.calculationOnSave.toString()]);
    if (this.concurrentCalculation !== undefined) out.push(["concurrentCalc", this.concurrentCalculation.toString()]);
    if (this.concurrentManualCount !== undefined) out.push(["concurrentManualCount", this.concurrentManualCount.toString()]);
    if (this.forceFullCalculation !== undefined) out.push(["forceFullCalc", this.forceFullCalculation.toString()]);
    return out;
  }

}
