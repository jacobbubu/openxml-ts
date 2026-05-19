// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.DataBinding

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** XML Mapping.
 *
 * Element: `x:DataBinding` */
export class DataBinding extends OpenXmlCompositeElement {
  override readonly localName = "DataBinding" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** DataBindingName (:DataBindingName) */
  dataBindingName: StringValue | undefined;

  /** FileBinding (:FileBinding) */
  fileBinding: BooleanValue | undefined;

  /** ConnectionID (:ConnectionID) */
  connectionId: UInt32Value | undefined;

  /** FileBindingName (:FileBindingName) */
  fileBindingName: StringValue | undefined;

  /** DataBindingLoadMode (:DataBindingLoadMode) */
  dataBindingLoadMode: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "DataBindingName": this.dataBindingName = StringValue.parse(value); return;
      case "FileBinding": this.fileBinding = BooleanValue.parse(value); return;
      case "ConnectionID": this.connectionId = UInt32Value.parse(value); return;
      case "FileBindingName": this.fileBindingName = StringValue.parse(value); return;
      case "DataBindingLoadMode": this.dataBindingLoadMode = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.dataBindingName !== undefined) out.push(["DataBindingName", this.dataBindingName.toString()]);
    if (this.fileBinding !== undefined) out.push(["FileBinding", this.fileBinding.toString()]);
    if (this.connectionId !== undefined) out.push(["ConnectionID", this.connectionId.toString()]);
    if (this.fileBindingName !== undefined) out.push(["FileBindingName", this.fileBindingName.toString()]);
    if (this.dataBindingLoadMode !== undefined) out.push(["DataBindingLoadMode", this.dataBindingLoadMode.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.dataBindingLoadMode, { attribute: ":DataBindingLoadMode", elementClass: "DataBinding" });
  }
}
