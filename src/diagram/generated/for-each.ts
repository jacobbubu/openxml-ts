// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.ForEach

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** For Each.
 *
 * Element: `dgm:forEach` */
export class ForEach extends OpenXmlCompositeElement {
  override readonly localName = "forEach" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Name (:name) */
  name: StringValue | undefined;

  /** Reference (:ref) */
  reference: StringValue | undefined;

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

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "ref": this.reference = StringValue.parse(value); return;
      case "axis": this.axis = StringValue.parse(value); return;
      case "ptType": this.pointType = StringValue.parse(value); return;
      case "hideLastTrans": this.hideLastTrans = StringValue.parse(value); return;
      case "st": this.start = StringValue.parse(value); return;
      case "cnt": this.count = StringValue.parse(value); return;
      case "step": this.step = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.reference !== undefined) out.push(["ref", this.reference.toString()]);
    if (this.axis !== undefined) out.push(["axis", this.axis.toString()]);
    if (this.pointType !== undefined) out.push(["ptType", this.pointType.toString()]);
    if (this.hideLastTrans !== undefined) out.push(["hideLastTrans", this.hideLastTrans.toString()]);
    if (this.start !== undefined) out.push(["st", this.start.toString()]);
    if (this.count !== undefined) out.push(["cnt", this.count.toString()]);
    if (this.step !== undefined) out.push(["step", this.step.toString()]);
    return out;
  }

}
