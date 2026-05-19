// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.MemberProperty

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** OLAP Member Property.
 *
 * Element: `x:mp` */
export class MemberProperty extends OpenXmlLeafElement {
  override readonly localName = "mp" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** OLAP Member Property Unique Name (:name) */
  name: StringValue | undefined;

  /** Show Cell (:showCell) */
  showCell: BooleanValue | undefined;

  /** Show Tooltip (:showTip) */
  showTip: BooleanValue | undefined;

  /** Show As Caption (:showAsCaption) */
  showAsCaption: BooleanValue | undefined;

  /** Name Length (:nameLen) */
  nameLength: UInt32Value | undefined;

  /** Property Name Character Index (:pPos) */
  propertyNamePosition: UInt32Value | undefined;

  /** Property Name Length (:pLen) */
  propertyNameLength: UInt32Value | undefined;

  /** Level Index (:level) */
  level: UInt32Value | undefined;

  /** Field Index (:field) */
  field: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "showCell": this.showCell = BooleanValue.parse(value); return;
      case "showTip": this.showTip = BooleanValue.parse(value); return;
      case "showAsCaption": this.showAsCaption = BooleanValue.parse(value); return;
      case "nameLen": this.nameLength = UInt32Value.parse(value); return;
      case "pPos": this.propertyNamePosition = UInt32Value.parse(value); return;
      case "pLen": this.propertyNameLength = UInt32Value.parse(value); return;
      case "level": this.level = UInt32Value.parse(value); return;
      case "field": this.field = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.showCell !== undefined) out.push(["showCell", this.showCell.toString()]);
    if (this.showTip !== undefined) out.push(["showTip", this.showTip.toString()]);
    if (this.showAsCaption !== undefined) out.push(["showAsCaption", this.showAsCaption.toString()]);
    if (this.nameLength !== undefined) out.push(["nameLen", this.nameLength.toString()]);
    if (this.propertyNamePosition !== undefined) out.push(["pPos", this.propertyNamePosition.toString()]);
    if (this.propertyNameLength !== undefined) out.push(["pLen", this.propertyNameLength.toString()]);
    if (this.level !== undefined) out.push(["level", this.level.toString()]);
    if (this.field !== undefined) out.push(["field", this.field.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.field, { attribute: ":field", elementClass: "MemberProperty" });
  }
}
