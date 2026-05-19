// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.PivotFilter

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** PivotTable Advanced Filter.
 *
 * Element: `x:filter` */
export class PivotFilter extends OpenXmlCompositeElement {
  override readonly localName = "filter" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** fld (:fld) */
  field: UInt32Value | undefined;

  /** mpFld (:mpFld) */
  memberPropertyFieldId: UInt32Value | undefined;

  /** type (:type) */
  type: StringValue | undefined;

  /** evalOrder (:evalOrder) */
  evaluationOrder: Int32Value | undefined;

  /** id (:id) */
  id: UInt32Value | undefined;

  /** iMeasureHier (:iMeasureHier) */
  measureHierarchy: UInt32Value | undefined;

  /** iMeasureFld (:iMeasureFld) */
  measureField: UInt32Value | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** description (:description) */
  description: StringValue | undefined;

  /** stringValue1 (:stringValue1) */
  stringValue1: StringValue | undefined;

  /** stringValue2 (:stringValue2) */
  stringValue2: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "fld": this.field = UInt32Value.parse(value); return;
      case "mpFld": this.memberPropertyFieldId = UInt32Value.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "evalOrder": this.evaluationOrder = Int32Value.parse(value); return;
      case "id": this.id = UInt32Value.parse(value); return;
      case "iMeasureHier": this.measureHierarchy = UInt32Value.parse(value); return;
      case "iMeasureFld": this.measureField = UInt32Value.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "description": this.description = StringValue.parse(value); return;
      case "stringValue1": this.stringValue1 = StringValue.parse(value); return;
      case "stringValue2": this.stringValue2 = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.field !== undefined) out.push(["fld", this.field.toString()]);
    if (this.memberPropertyFieldId !== undefined) out.push(["mpFld", this.memberPropertyFieldId.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.evaluationOrder !== undefined) out.push(["evalOrder", this.evaluationOrder.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.measureHierarchy !== undefined) out.push(["iMeasureHier", this.measureHierarchy.toString()]);
    if (this.measureField !== undefined) out.push(["iMeasureFld", this.measureField.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.description !== undefined) out.push(["description", this.description.toString()]);
    if (this.stringValue1 !== undefined) out.push(["stringValue1", this.stringValue1.toString()]);
    if (this.stringValue2 !== undefined) out.push(["stringValue2", this.stringValue2.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.field, { attribute: ":fld", elementClass: "PivotFilter" });
    assertRequired(this.type, { attribute: ":type", elementClass: "PivotFilter" });
    assertRequired(this.id, { attribute: ":id", elementClass: "PivotFilter" });
  }
}
