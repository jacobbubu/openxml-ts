// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.DiagramChooseIf

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** If.
 *
 * Element: `dgm:if` */
export class DiagramChooseIf extends OpenXmlCompositeElement {
  override readonly localName = "if" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Name (:name) */
  name: StringValue | undefined;

  /** Axis (:axis) */
  axis: StringValue | undefined;

  /** Data Point Type (:ptType) */
  pointType: StringValue | undefined;

  /** Hide Last Transition (:hideLastTrans) */
  hideLastTrans: StringValue | undefined;

  /** Start (:st) */
  start: StringValue | undefined;

  /** Count (:cnt) */
  count: StringValue | undefined;

  /** Step (:step) */
  step: StringValue | undefined;

  /** Function (:func) */
  function: StringValue | undefined;

  /** Argument (:arg) */
  argument: StringValue | undefined;

  /** Operator (:op) */
  operator: StringValue | undefined;

  /** Value (:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "axis": this.axis = StringValue.parse(value); return;
      case "ptType": this.pointType = StringValue.parse(value); return;
      case "hideLastTrans": this.hideLastTrans = StringValue.parse(value); return;
      case "st": this.start = StringValue.parse(value); return;
      case "cnt": this.count = StringValue.parse(value); return;
      case "step": this.step = StringValue.parse(value); return;
      case "func": this.function = StringValue.parse(value); return;
      case "arg": this.argument = StringValue.parse(value); return;
      case "op": this.operator = StringValue.parse(value); return;
      case "val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.axis !== undefined) out.push(["axis", this.axis.toString()]);
    if (this.pointType !== undefined) out.push(["ptType", this.pointType.toString()]);
    if (this.hideLastTrans !== undefined) out.push(["hideLastTrans", this.hideLastTrans.toString()]);
    if (this.start !== undefined) out.push(["st", this.start.toString()]);
    if (this.count !== undefined) out.push(["cnt", this.count.toString()]);
    if (this.step !== undefined) out.push(["step", this.step.toString()]);
    if (this.function !== undefined) out.push(["func", this.function.toString()]);
    if (this.argument !== undefined) out.push(["arg", this.argument.toString()]);
    if (this.operator !== undefined) out.push(["op", this.operator.toString()]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.function, { attribute: ":func", elementClass: "DiagramChooseIf" });
    assertRequired(this.operator, { attribute: ":op", elementClass: "DiagramChooseIf" });
    assertRequired(this.val, { attribute: ":val", elementClass: "DiagramChooseIf" });
  }
}
