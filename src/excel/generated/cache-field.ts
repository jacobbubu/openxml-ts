// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CacheField

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** PivotCache Field.
 *
 * Element: `x:cacheField` */
export class CacheField extends OpenXmlCompositeElement {
  override readonly localName = "cacheField" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** caption (:caption) */
  caption: StringValue | undefined;

  /** propertyName (:propertyName) */
  propertyName: StringValue | undefined;

  /** serverField (:serverField) */
  serverField: BooleanValue | undefined;

  /** uniqueList (:uniqueList) */
  uniqueList: BooleanValue | undefined;

  /** numFmtId (:numFmtId) */
  numberFormatId: UInt32Value | undefined;

  /** formula (:formula) */
  formula: StringValue | undefined;

  /** sqlType (:sqlType) */
  sqlType: Int32Value | undefined;

  /** hierarchy (:hierarchy) */
  hierarchy: Int32Value | undefined;

  /** level (:level) */
  level: UInt32Value | undefined;

  /** databaseField (:databaseField) */
  databaseField: BooleanValue | undefined;

  /** mappingCount (:mappingCount) */
  mappingCount: UInt32Value | undefined;

  /** memberPropertyField (:memberPropertyField) */
  memberPropertyField: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "caption": this.caption = StringValue.parse(value); return;
      case "propertyName": this.propertyName = StringValue.parse(value); return;
      case "serverField": this.serverField = BooleanValue.parse(value); return;
      case "uniqueList": this.uniqueList = BooleanValue.parse(value); return;
      case "numFmtId": this.numberFormatId = UInt32Value.parse(value); return;
      case "formula": this.formula = StringValue.parse(value); return;
      case "sqlType": this.sqlType = Int32Value.parse(value); return;
      case "hierarchy": this.hierarchy = Int32Value.parse(value); return;
      case "level": this.level = UInt32Value.parse(value); return;
      case "databaseField": this.databaseField = BooleanValue.parse(value); return;
      case "mappingCount": this.mappingCount = UInt32Value.parse(value); return;
      case "memberPropertyField": this.memberPropertyField = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.caption !== undefined) out.push(["caption", this.caption.toString()]);
    if (this.propertyName !== undefined) out.push(["propertyName", this.propertyName.toString()]);
    if (this.serverField !== undefined) out.push(["serverField", this.serverField.toString()]);
    if (this.uniqueList !== undefined) out.push(["uniqueList", this.uniqueList.toString()]);
    if (this.numberFormatId !== undefined) out.push(["numFmtId", this.numberFormatId.toString()]);
    if (this.formula !== undefined) out.push(["formula", this.formula.toString()]);
    if (this.sqlType !== undefined) out.push(["sqlType", this.sqlType.toString()]);
    if (this.hierarchy !== undefined) out.push(["hierarchy", this.hierarchy.toString()]);
    if (this.level !== undefined) out.push(["level", this.level.toString()]);
    if (this.databaseField !== undefined) out.push(["databaseField", this.databaseField.toString()]);
    if (this.mappingCount !== undefined) out.push(["mappingCount", this.mappingCount.toString()]);
    if (this.memberPropertyField !== undefined) out.push(["memberPropertyField", this.memberPropertyField.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "CacheField" });
  }
}
