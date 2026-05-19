// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.DataField

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Data Field Item.
 *
 * Element: `x:dataField` */
export class DataField extends OpenXmlCompositeElement {
  override readonly localName = "dataField" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** fld (:fld) */
  field: UInt32Value | undefined;

  /** subtotal (:subtotal) */
  subtotal: StringValue | undefined;

  /** showDataAs (:showDataAs) */
  showDataAs: StringValue | undefined;

  /** baseField (:baseField) */
  baseField: Int32Value | undefined;

  /** baseItem (:baseItem) */
  baseItem: UInt32Value | undefined;

  /** numFmtId (:numFmtId) */
  numberFormatId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "fld": this.field = UInt32Value.parse(value); return;
      case "subtotal": this.subtotal = StringValue.parse(value); return;
      case "showDataAs": this.showDataAs = StringValue.parse(value); return;
      case "baseField": this.baseField = Int32Value.parse(value); return;
      case "baseItem": this.baseItem = UInt32Value.parse(value); return;
      case "numFmtId": this.numberFormatId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.field !== undefined) out.push(["fld", this.field.toString()]);
    if (this.subtotal !== undefined) out.push(["subtotal", this.subtotal.toString()]);
    if (this.showDataAs !== undefined) out.push(["showDataAs", this.showDataAs.toString()]);
    if (this.baseField !== undefined) out.push(["baseField", this.baseField.toString()]);
    if (this.baseItem !== undefined) out.push(["baseItem", this.baseItem.toString()]);
    if (this.numberFormatId !== undefined) out.push(["numFmtId", this.numberFormatId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.field, { attribute: ":fld", elementClass: "DataField" });
  }
}
