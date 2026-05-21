// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_richdata2.json
// @see DocumentFormat.OpenXml.Spreadsheetml2017Richdata2.DynamicRichFilter

import {
  DateTimeValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the DynamicRichFilter Class.
 *
 * Element: `xlrd2:dynamicFilter` */
export class DynamicRichFilter extends OpenXmlLeafElement {
  override readonly localName = "dynamicFilter" as const;
  override readonly prefix = "xlrd2" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2" as const;


  /** Dynamic filter type (:type) */
  type: StringValue | undefined;

  /** Value (:val) */
  val: StringValue | undefined;

  /** Max Value (:maxVal) */
  maxVal: StringValue | undefined;

  /** valIso (:valIso) */
  valIso: DateTimeValue | undefined;

  /** maxValIso (:maxValIso) */
  maxValIso: DateTimeValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
      case "val": this.val = StringValue.parse(value); return;
      case "maxVal": this.maxVal = StringValue.parse(value); return;
      case "valIso": this.valIso = DateTimeValue.parse(value); return;
      case "maxValIso": this.maxValIso = DateTimeValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    if (this.maxVal !== undefined) out.push(["maxVal", this.maxVal.toString()]);
    if (this.valIso !== undefined) out.push(["valIso", this.valIso.toString()]);
    if (this.maxValIso !== undefined) out.push(["maxValIso", this.maxValIso.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.type, { attribute: ":type", elementClass: "DynamicRichFilter" });
  }
}
