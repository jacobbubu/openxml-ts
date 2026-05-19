// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.SheetProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Sheet Properties.
 *
 * Element: `x:sheetPr` */
export class SheetProperties extends OpenXmlCompositeElement {
  override readonly localName = "sheetPr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Synch Horizontal (:syncHorizontal) */
  syncHorizontal: BooleanValue | undefined;

  /** Synch Vertical (:syncVertical) */
  syncVertical: BooleanValue | undefined;

  /** Synch Reference (:syncRef) */
  syncReference: StringValue | undefined;

  /** Transition Formula Evaluation (:transitionEvaluation) */
  transitionEvaluation: BooleanValue | undefined;

  /** Transition Formula Entry (:transitionEntry) */
  transitionEntry: BooleanValue | undefined;

  /** Published (:published) */
  published: BooleanValue | undefined;

  /** Code Name (:codeName) */
  codeName: StringValue | undefined;

  /** Filter Mode (:filterMode) */
  filterMode: BooleanValue | undefined;

  /** Enable Conditional Formatting Calculations (:enableFormatConditionsCalculation) */
  enableFormatConditionsCalculation: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "syncHorizontal": this.syncHorizontal = BooleanValue.parse(value); return;
      case "syncVertical": this.syncVertical = BooleanValue.parse(value); return;
      case "syncRef": this.syncReference = StringValue.parse(value); return;
      case "transitionEvaluation": this.transitionEvaluation = BooleanValue.parse(value); return;
      case "transitionEntry": this.transitionEntry = BooleanValue.parse(value); return;
      case "published": this.published = BooleanValue.parse(value); return;
      case "codeName": this.codeName = StringValue.parse(value); return;
      case "filterMode": this.filterMode = BooleanValue.parse(value); return;
      case "enableFormatConditionsCalculation": this.enableFormatConditionsCalculation = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.syncHorizontal !== undefined) out.push(["syncHorizontal", this.syncHorizontal.toString()]);
    if (this.syncVertical !== undefined) out.push(["syncVertical", this.syncVertical.toString()]);
    if (this.syncReference !== undefined) out.push(["syncRef", this.syncReference.toString()]);
    if (this.transitionEvaluation !== undefined) out.push(["transitionEvaluation", this.transitionEvaluation.toString()]);
    if (this.transitionEntry !== undefined) out.push(["transitionEntry", this.transitionEntry.toString()]);
    if (this.published !== undefined) out.push(["published", this.published.toString()]);
    if (this.codeName !== undefined) out.push(["codeName", this.codeName.toString()]);
    if (this.filterMode !== undefined) out.push(["filterMode", this.filterMode.toString()]);
    if (this.enableFormatConditionsCalculation !== undefined) out.push(["enableFormatConditionsCalculation", this.enableFormatConditionsCalculation.toString()]);
    return out;
  }

}
