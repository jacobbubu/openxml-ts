// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.SharedItems

import {
  BooleanValue,
  DateTimeValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the SharedItems Class.
 *
 * Element: `x:sharedItems` */
export class SharedItems extends OpenXmlCompositeElement {
  override readonly localName = "sharedItems" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Contains Semi Mixed Data Types (:containsSemiMixedTypes) */
  containsSemiMixedTypes: BooleanValue | undefined;

  /** Contains Non Date (:containsNonDate) */
  containsNonDate: BooleanValue | undefined;

  /** Contains Date (:containsDate) */
  containsDate: BooleanValue | undefined;

  /** Contains String (:containsString) */
  containsString: BooleanValue | undefined;

  /** Contains Blank (:containsBlank) */
  containsBlank: BooleanValue | undefined;

  /** Contains Mixed Data Types (:containsMixedTypes) */
  containsMixedTypes: BooleanValue | undefined;

  /** Contains Numbers (:containsNumber) */
  containsNumber: BooleanValue | undefined;

  /** Contains Integer (:containsInteger) */
  containsInteger: BooleanValue | undefined;

  /** Minimum Numeric Value (:minValue) */
  minValue: StringValue | undefined;

  /** Maximum Numeric Value (:maxValue) */
  maxValue: StringValue | undefined;

  /** Minimum Date Time (:minDate) */
  minDate: DateTimeValue | undefined;

  /** Maximum Date Time Value (:maxDate) */
  maxDate: DateTimeValue | undefined;

  /** Shared Items Count (:count) */
  count: UInt32Value | undefined;

  /** Long Text (:longText) */
  longText: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "containsSemiMixedTypes": this.containsSemiMixedTypes = BooleanValue.parse(value); return;
      case "containsNonDate": this.containsNonDate = BooleanValue.parse(value); return;
      case "containsDate": this.containsDate = BooleanValue.parse(value); return;
      case "containsString": this.containsString = BooleanValue.parse(value); return;
      case "containsBlank": this.containsBlank = BooleanValue.parse(value); return;
      case "containsMixedTypes": this.containsMixedTypes = BooleanValue.parse(value); return;
      case "containsNumber": this.containsNumber = BooleanValue.parse(value); return;
      case "containsInteger": this.containsInteger = BooleanValue.parse(value); return;
      case "minValue": this.minValue = StringValue.parse(value); return;
      case "maxValue": this.maxValue = StringValue.parse(value); return;
      case "minDate": this.minDate = DateTimeValue.parse(value); return;
      case "maxDate": this.maxDate = DateTimeValue.parse(value); return;
      case "count": this.count = UInt32Value.parse(value); return;
      case "longText": this.longText = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.containsSemiMixedTypes !== undefined) out.push(["containsSemiMixedTypes", this.containsSemiMixedTypes.toString()]);
    if (this.containsNonDate !== undefined) out.push(["containsNonDate", this.containsNonDate.toString()]);
    if (this.containsDate !== undefined) out.push(["containsDate", this.containsDate.toString()]);
    if (this.containsString !== undefined) out.push(["containsString", this.containsString.toString()]);
    if (this.containsBlank !== undefined) out.push(["containsBlank", this.containsBlank.toString()]);
    if (this.containsMixedTypes !== undefined) out.push(["containsMixedTypes", this.containsMixedTypes.toString()]);
    if (this.containsNumber !== undefined) out.push(["containsNumber", this.containsNumber.toString()]);
    if (this.containsInteger !== undefined) out.push(["containsInteger", this.containsInteger.toString()]);
    if (this.minValue !== undefined) out.push(["minValue", this.minValue.toString()]);
    if (this.maxValue !== undefined) out.push(["maxValue", this.maxValue.toString()]);
    if (this.minDate !== undefined) out.push(["minDate", this.minDate.toString()]);
    if (this.maxDate !== undefined) out.push(["maxDate", this.maxDate.toString()]);
    if (this.count !== undefined) out.push(["count", this.count.toString()]);
    if (this.longText !== undefined) out.push(["longText", this.longText.toString()]);
    return out;
  }

}
