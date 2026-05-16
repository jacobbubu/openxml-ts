// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.DataValidation

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Data Validation.
 *
 * Element: `x:dataValidation` */
export class DataValidation extends OpenXmlCompositeElement {
  override readonly localName = "dataValidation" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** type (:type) */
  type: StringValue | undefined;

  /** errorStyle (:errorStyle) */
  errorStyle: StringValue | undefined;

  /** imeMode (:imeMode) */
  imeMode: StringValue | undefined;

  /** operator (:operator) */
  operator: StringValue | undefined;

  /** allowBlank (:allowBlank) */
  allowBlank: BooleanValue | undefined;

  /** showDropDown (:showDropDown) */
  showDropDown: BooleanValue | undefined;

  /** showInputMessage (:showInputMessage) */
  showInputMessage: BooleanValue | undefined;

  /** showErrorMessage (:showErrorMessage) */
  showErrorMessage: BooleanValue | undefined;

  /** errorTitle (:errorTitle) */
  errorTitle: StringValue | undefined;

  /** error (:error) */
  error: StringValue | undefined;

  /** promptTitle (:promptTitle) */
  promptTitle: StringValue | undefined;

  /** prompt (:prompt) */
  prompt: StringValue | undefined;

  /** sqref (:sqref) */
  sequenceOfReferences: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":type": this.type = StringValue.parse(value); return;
      case ":errorStyle": this.errorStyle = StringValue.parse(value); return;
      case ":imeMode": this.imeMode = StringValue.parse(value); return;
      case ":operator": this.operator = StringValue.parse(value); return;
      case ":allowBlank": this.allowBlank = BooleanValue.parse(value); return;
      case ":showDropDown": this.showDropDown = BooleanValue.parse(value); return;
      case ":showInputMessage": this.showInputMessage = BooleanValue.parse(value); return;
      case ":showErrorMessage": this.showErrorMessage = BooleanValue.parse(value); return;
      case ":errorTitle": this.errorTitle = StringValue.parse(value); return;
      case ":error": this.error = StringValue.parse(value); return;
      case ":promptTitle": this.promptTitle = StringValue.parse(value); return;
      case ":prompt": this.prompt = StringValue.parse(value); return;
      case ":sqref": this.sequenceOfReferences = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push([":type", this.type.toString()]);
    if (this.errorStyle !== undefined) out.push([":errorStyle", this.errorStyle.toString()]);
    if (this.imeMode !== undefined) out.push([":imeMode", this.imeMode.toString()]);
    if (this.operator !== undefined) out.push([":operator", this.operator.toString()]);
    if (this.allowBlank !== undefined) out.push([":allowBlank", this.allowBlank.toString()]);
    if (this.showDropDown !== undefined) out.push([":showDropDown", this.showDropDown.toString()]);
    if (this.showInputMessage !== undefined) out.push([":showInputMessage", this.showInputMessage.toString()]);
    if (this.showErrorMessage !== undefined) out.push([":showErrorMessage", this.showErrorMessage.toString()]);
    if (this.errorTitle !== undefined) out.push([":errorTitle", this.errorTitle.toString()]);
    if (this.error !== undefined) out.push([":error", this.error.toString()]);
    if (this.promptTitle !== undefined) out.push([":promptTitle", this.promptTitle.toString()]);
    if (this.prompt !== undefined) out.push([":prompt", this.prompt.toString()]);
    if (this.sequenceOfReferences !== undefined) out.push([":sqref", this.sequenceOfReferences.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.sequenceOfReferences, { attribute: ":sqref", elementClass: "DataValidation" });
  }
}
