// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.Rule

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Rule.
 *
 * Element: `dgm:rule` */
export class Rule extends OpenXmlCompositeElement {
  override readonly localName = "rule" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Constraint Type (:type) */
  type: StringValue | undefined;

  /** For (:for) */
  for: StringValue | undefined;

  /** For Name (:forName) */
  forName: StringValue | undefined;

  /** Data Point Type (:ptType) */
  pointType: StringValue | undefined;

  /** Value (:val) */
  val: StringValue | undefined;

  /** Factor (:fact) */
  fact: StringValue | undefined;

  /** Max Value (:max) */
  max: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
      case "for": this.for = StringValue.parse(value); return;
      case "forName": this.forName = StringValue.parse(value); return;
      case "ptType": this.pointType = StringValue.parse(value); return;
      case "val": this.val = StringValue.parse(value); return;
      case "fact": this.fact = StringValue.parse(value); return;
      case "max": this.max = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.for !== undefined) out.push(["for", this.for.toString()]);
    if (this.forName !== undefined) out.push(["forName", this.forName.toString()]);
    if (this.pointType !== undefined) out.push(["ptType", this.pointType.toString()]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    if (this.fact !== undefined) out.push(["fact", this.fact.toString()]);
    if (this.max !== undefined) out.push(["max", this.max.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.type, { attribute: ":type", elementClass: "Rule" });
  }
}
