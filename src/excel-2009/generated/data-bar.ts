// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.DataBar

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the DataBar Class.
 *
 * Element: `x14:dataBar` */
export class DataBar extends OpenXmlCompositeElement {
  override readonly localName = "dataBar" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** minLength (:minLength) */
  minLength: UInt32Value | undefined;

  /** maxLength (:maxLength) */
  maxLength: UInt32Value | undefined;

  /** showValue (:showValue) */
  showValue: BooleanValue | undefined;

  /** border (:border) */
  border: BooleanValue | undefined;

  /** gradient (:gradient) */
  gradient: BooleanValue | undefined;

  /** direction (:direction) */
  direction: StringValue | undefined;

  /** negativeBarColorSameAsPositive (:negativeBarColorSameAsPositive) */
  negativeBarColorSameAsPositive: BooleanValue | undefined;

  /** negativeBarBorderColorSameAsPositive (:negativeBarBorderColorSameAsPositive) */
  negativeBarBorderColorSameAsPositive: BooleanValue | undefined;

  /** axisPosition (:axisPosition) */
  axisPosition: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "minLength": this.minLength = UInt32Value.parse(value); return;
      case "maxLength": this.maxLength = UInt32Value.parse(value); return;
      case "showValue": this.showValue = BooleanValue.parse(value); return;
      case "border": this.border = BooleanValue.parse(value); return;
      case "gradient": this.gradient = BooleanValue.parse(value); return;
      case "direction": this.direction = StringValue.parse(value); return;
      case "negativeBarColorSameAsPositive": this.negativeBarColorSameAsPositive = BooleanValue.parse(value); return;
      case "negativeBarBorderColorSameAsPositive": this.negativeBarBorderColorSameAsPositive = BooleanValue.parse(value); return;
      case "axisPosition": this.axisPosition = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.minLength !== undefined) out.push(["minLength", this.minLength.toString()]);
    if (this.maxLength !== undefined) out.push(["maxLength", this.maxLength.toString()]);
    if (this.showValue !== undefined) out.push(["showValue", this.showValue.toString()]);
    if (this.border !== undefined) out.push(["border", this.border.toString()]);
    if (this.gradient !== undefined) out.push(["gradient", this.gradient.toString()]);
    if (this.direction !== undefined) out.push(["direction", this.direction.toString()]);
    if (this.negativeBarColorSameAsPositive !== undefined) out.push(["negativeBarColorSameAsPositive", this.negativeBarColorSameAsPositive.toString()]);
    if (this.negativeBarBorderColorSameAsPositive !== undefined) out.push(["negativeBarBorderColorSameAsPositive", this.negativeBarBorderColorSameAsPositive.toString()]);
    if (this.axisPosition !== undefined) out.push(["axisPosition", this.axisPosition.toString()]);
    return out;
  }

}
