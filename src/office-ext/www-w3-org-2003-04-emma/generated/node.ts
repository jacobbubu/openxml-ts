// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_04_emma.json
// @see DocumentFormat.OpenXml.200304Emma.Node

import {
  DecimalValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Node Class.
 *
 * Element: `emma:node` */
export class Node extends OpenXmlCompositeElement {
  override readonly localName = "node" as const;
  override readonly prefix = "emma" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/04/emma" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** node-number (:node-number) */
  nodeNumber: StringValue | undefined;

  /** confidence (emma:confidence) */
  confidence: DecimalValue | undefined;

  /** cost (emma:cost) */
  cost: DecimalValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "node-number": this.nodeNumber = StringValue.parse(value); return;
      case "emma:confidence": this.confidence = DecimalValue.parse(value); assertNumber(this.confidence, { min: 0, max: 1 }, { attribute: "emma:confidence", elementClass: "Node" }); return;
      case "emma:cost": this.cost = DecimalValue.parse(value); assertNumber(this.cost, { min: 0, max: 10000000 }, { attribute: "emma:cost", elementClass: "Node" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.nodeNumber !== undefined) out.push(["node-number", this.nodeNumber.toString()]);
    if (this.confidence !== undefined) out.push(["emma:confidence", this.confidence.toString()]);
    if (this.cost !== undefined) out.push(["emma:cost", this.cost.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.nodeNumber, { attribute: ":node-number", elementClass: "Node" });
  }
}
