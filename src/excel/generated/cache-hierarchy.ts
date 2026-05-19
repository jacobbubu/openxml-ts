// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CacheHierarchy

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** PivotCache Hierarchy.
 *
 * Element: `x:cacheHierarchy` */
export class CacheHierarchy extends OpenXmlCompositeElement {
  override readonly localName = "cacheHierarchy" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** uniqueName (:uniqueName) */
  uniqueName: StringValue | undefined;

  /** caption (:caption) */
  caption: StringValue | undefined;

  /** measure (:measure) */
  measure: BooleanValue | undefined;

  /** set (:set) */
  set: BooleanValue | undefined;

  /** parentSet (:parentSet) */
  parentSet: UInt32Value | undefined;

  /** iconSet (:iconSet) */
  iconSet: Int32Value | undefined;

  /** attribute (:attribute) */
  attribute: BooleanValue | undefined;

  /** time (:time) */
  time: BooleanValue | undefined;

  /** keyAttribute (:keyAttribute) */
  keyAttribute: BooleanValue | undefined;

  /** defaultMemberUniqueName (:defaultMemberUniqueName) */
  defaultMemberUniqueName: StringValue | undefined;

  /** allUniqueName (:allUniqueName) */
  allUniqueName: StringValue | undefined;

  /** allCaption (:allCaption) */
  allCaption: StringValue | undefined;

  /** dimensionUniqueName (:dimensionUniqueName) */
  dimensionUniqueName: StringValue | undefined;

  /** displayFolder (:displayFolder) */
  displayFolder: StringValue | undefined;

  /** measureGroup (:measureGroup) */
  measureGroup: StringValue | undefined;

  /** measures (:measures) */
  measures: BooleanValue | undefined;

  /** count (:count) */
  count: UInt32Value | undefined;

  /** oneField (:oneField) */
  oneField: BooleanValue | undefined;

  /** memberValueDatatype (:memberValueDatatype) */
  memberValueDatatype: StringValue | undefined;

  /** unbalanced (:unbalanced) */
  unbalanced: BooleanValue | undefined;

  /** unbalancedGroup (:unbalancedGroup) */
  unbalancedGroup: BooleanValue | undefined;

  /** hidden (:hidden) */
  hidden: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "uniqueName": this.uniqueName = StringValue.parse(value); return;
      case "caption": this.caption = StringValue.parse(value); return;
      case "measure": this.measure = BooleanValue.parse(value); return;
      case "set": this.set = BooleanValue.parse(value); return;
      case "parentSet": this.parentSet = UInt32Value.parse(value); return;
      case "iconSet": this.iconSet = Int32Value.parse(value); return;
      case "attribute": this.attribute = BooleanValue.parse(value); return;
      case "time": this.time = BooleanValue.parse(value); return;
      case "keyAttribute": this.keyAttribute = BooleanValue.parse(value); return;
      case "defaultMemberUniqueName": this.defaultMemberUniqueName = StringValue.parse(value); return;
      case "allUniqueName": this.allUniqueName = StringValue.parse(value); return;
      case "allCaption": this.allCaption = StringValue.parse(value); return;
      case "dimensionUniqueName": this.dimensionUniqueName = StringValue.parse(value); return;
      case "displayFolder": this.displayFolder = StringValue.parse(value); return;
      case "measureGroup": this.measureGroup = StringValue.parse(value); return;
      case "measures": this.measures = BooleanValue.parse(value); return;
      case "count": this.count = UInt32Value.parse(value); return;
      case "oneField": this.oneField = BooleanValue.parse(value); return;
      case "memberValueDatatype": this.memberValueDatatype = StringValue.parse(value); return;
      case "unbalanced": this.unbalanced = BooleanValue.parse(value); return;
      case "unbalancedGroup": this.unbalancedGroup = BooleanValue.parse(value); return;
      case "hidden": this.hidden = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uniqueName !== undefined) out.push(["uniqueName", this.uniqueName.toString()]);
    if (this.caption !== undefined) out.push(["caption", this.caption.toString()]);
    if (this.measure !== undefined) out.push(["measure", this.measure.toString()]);
    if (this.set !== undefined) out.push(["set", this.set.toString()]);
    if (this.parentSet !== undefined) out.push(["parentSet", this.parentSet.toString()]);
    if (this.iconSet !== undefined) out.push(["iconSet", this.iconSet.toString()]);
    if (this.attribute !== undefined) out.push(["attribute", this.attribute.toString()]);
    if (this.time !== undefined) out.push(["time", this.time.toString()]);
    if (this.keyAttribute !== undefined) out.push(["keyAttribute", this.keyAttribute.toString()]);
    if (this.defaultMemberUniqueName !== undefined) out.push(["defaultMemberUniqueName", this.defaultMemberUniqueName.toString()]);
    if (this.allUniqueName !== undefined) out.push(["allUniqueName", this.allUniqueName.toString()]);
    if (this.allCaption !== undefined) out.push(["allCaption", this.allCaption.toString()]);
    if (this.dimensionUniqueName !== undefined) out.push(["dimensionUniqueName", this.dimensionUniqueName.toString()]);
    if (this.displayFolder !== undefined) out.push(["displayFolder", this.displayFolder.toString()]);
    if (this.measureGroup !== undefined) out.push(["measureGroup", this.measureGroup.toString()]);
    if (this.measures !== undefined) out.push(["measures", this.measures.toString()]);
    if (this.count !== undefined) out.push(["count", this.count.toString()]);
    if (this.oneField !== undefined) out.push(["oneField", this.oneField.toString()]);
    if (this.memberValueDatatype !== undefined) out.push(["memberValueDatatype", this.memberValueDatatype.toString()]);
    if (this.unbalanced !== undefined) out.push(["unbalanced", this.unbalanced.toString()]);
    if (this.unbalancedGroup !== undefined) out.push(["unbalancedGroup", this.unbalancedGroup.toString()]);
    if (this.hidden !== undefined) out.push(["hidden", this.hidden.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.uniqueName, { attribute: ":uniqueName", elementClass: "CacheHierarchy" });
    assertRequired(this.count, { attribute: ":count", elementClass: "CacheHierarchy" });
  }
}
