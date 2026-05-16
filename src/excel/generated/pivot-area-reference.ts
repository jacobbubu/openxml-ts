// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.PivotAreaReference

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../element/index.js";

/** Reference.
 *
 * Element: `x:reference` */
export class PivotAreaReference extends OpenXmlCompositeElement {
  override readonly localName = "reference" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Field Index (:field) */
  field: UInt32Value | undefined;

  /** Item Index Count (:count) */
  count: UInt32Value | undefined;

  /** Selected (:selected) */
  selected: BooleanValue | undefined;

  /** Positional Reference (:byPosition) */
  byPosition: BooleanValue | undefined;

  /** Relative Reference (:relative) */
  relative: BooleanValue | undefined;

  /** Include Default Filter (:defaultSubtotal) */
  defaultSubtotal: BooleanValue | undefined;

  /** Include Sum Filter (:sumSubtotal) */
  sumSubtotal: BooleanValue | undefined;

  /** Include CountA Filter (:countASubtotal) */
  countASubtotal: BooleanValue | undefined;

  /** Include Average Filter (:avgSubtotal) */
  averageSubtotal: BooleanValue | undefined;

  /** Include Maximum Filter (:maxSubtotal) */
  maxSubtotal: BooleanValue | undefined;

  /** Include Minimum Filter (:minSubtotal) */
  minSubtotal: BooleanValue | undefined;

  /** Include Product Filter (:productSubtotal) */
  applyProductInSubtotal: BooleanValue | undefined;

  /** Include Count Subtotal (:countSubtotal) */
  countSubtotal: BooleanValue | undefined;

  /** Include StdDev Filter (:stdDevSubtotal) */
  applyStandardDeviationInSubtotal: BooleanValue | undefined;

  /** Include StdDevP Filter (:stdDevPSubtotal) */
  applyStandardDeviationPInSubtotal: BooleanValue | undefined;

  /** Include Var Filter (:varSubtotal) */
  applyVarianceInSubtotal: BooleanValue | undefined;

  /** Include VarP Filter (:varPSubtotal) */
  applyVariancePInSubtotal: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":field": this.field = UInt32Value.parse(value); return;
      case ":count": this.count = UInt32Value.parse(value); return;
      case ":selected": this.selected = BooleanValue.parse(value); return;
      case ":byPosition": this.byPosition = BooleanValue.parse(value); return;
      case ":relative": this.relative = BooleanValue.parse(value); return;
      case ":defaultSubtotal": this.defaultSubtotal = BooleanValue.parse(value); return;
      case ":sumSubtotal": this.sumSubtotal = BooleanValue.parse(value); return;
      case ":countASubtotal": this.countASubtotal = BooleanValue.parse(value); return;
      case ":avgSubtotal": this.averageSubtotal = BooleanValue.parse(value); return;
      case ":maxSubtotal": this.maxSubtotal = BooleanValue.parse(value); return;
      case ":minSubtotal": this.minSubtotal = BooleanValue.parse(value); return;
      case ":productSubtotal": this.applyProductInSubtotal = BooleanValue.parse(value); return;
      case ":countSubtotal": this.countSubtotal = BooleanValue.parse(value); return;
      case ":stdDevSubtotal": this.applyStandardDeviationInSubtotal = BooleanValue.parse(value); return;
      case ":stdDevPSubtotal": this.applyStandardDeviationPInSubtotal = BooleanValue.parse(value); return;
      case ":varSubtotal": this.applyVarianceInSubtotal = BooleanValue.parse(value); return;
      case ":varPSubtotal": this.applyVariancePInSubtotal = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.field !== undefined) out.push([":field", this.field.toString()]);
    if (this.count !== undefined) out.push([":count", this.count.toString()]);
    if (this.selected !== undefined) out.push([":selected", this.selected.toString()]);
    if (this.byPosition !== undefined) out.push([":byPosition", this.byPosition.toString()]);
    if (this.relative !== undefined) out.push([":relative", this.relative.toString()]);
    if (this.defaultSubtotal !== undefined) out.push([":defaultSubtotal", this.defaultSubtotal.toString()]);
    if (this.sumSubtotal !== undefined) out.push([":sumSubtotal", this.sumSubtotal.toString()]);
    if (this.countASubtotal !== undefined) out.push([":countASubtotal", this.countASubtotal.toString()]);
    if (this.averageSubtotal !== undefined) out.push([":avgSubtotal", this.averageSubtotal.toString()]);
    if (this.maxSubtotal !== undefined) out.push([":maxSubtotal", this.maxSubtotal.toString()]);
    if (this.minSubtotal !== undefined) out.push([":minSubtotal", this.minSubtotal.toString()]);
    if (this.applyProductInSubtotal !== undefined) out.push([":productSubtotal", this.applyProductInSubtotal.toString()]);
    if (this.countSubtotal !== undefined) out.push([":countSubtotal", this.countSubtotal.toString()]);
    if (this.applyStandardDeviationInSubtotal !== undefined) out.push([":stdDevSubtotal", this.applyStandardDeviationInSubtotal.toString()]);
    if (this.applyStandardDeviationPInSubtotal !== undefined) out.push([":stdDevPSubtotal", this.applyStandardDeviationPInSubtotal.toString()]);
    if (this.applyVarianceInSubtotal !== undefined) out.push([":varSubtotal", this.applyVarianceInSubtotal.toString()]);
    if (this.applyVariancePInSubtotal !== undefined) out.push([":varPSubtotal", this.applyVariancePInSubtotal.toString()]);
    return out;
  }

}
