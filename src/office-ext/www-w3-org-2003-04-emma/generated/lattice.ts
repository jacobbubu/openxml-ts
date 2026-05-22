// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_04_emma.json
// @see DocumentFormat.OpenXml.200304Emma.Lattice

import {
  DecimalValue,
  IntegerValue,
  ListValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Lattice Class.
 *
 * Element: `emma:lattice` */
export class Lattice extends OpenXmlCompositeElement {
  override readonly localName = "lattice" as const;
  override readonly prefix = "emma" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/04/emma" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** initial (:initial) */
  initial: IntegerValue | undefined;

  /** final (:final) */
  final: ListValue<DecimalValue> | undefined;

  /** time-ref-uri (emma:time-ref-uri) */
  timeReference: StringValue | undefined;

  /** time-ref-anchor-point (emma:time-ref-anchor-point) */
  timeReferenceAnchorPoint: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "initial": this.initial = IntegerValue.parse(value); return;
      case "final": this.final = ListValue.parse(value, DecimalValue.parse); return;
      case "emma:time-ref-uri": this.timeReference = StringValue.parse(value); return;
      case "emma:time-ref-anchor-point": this.timeReferenceAnchorPoint = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.initial !== undefined) out.push(["initial", this.initial.toString()]);
    if (this.final !== undefined) out.push(["final", this.final.toString()]);
    if (this.timeReference !== undefined) out.push(["emma:time-ref-uri", this.timeReference.toString()]);
    if (this.timeReferenceAnchorPoint !== undefined) out.push(["emma:time-ref-anchor-point", this.timeReferenceAnchorPoint.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.initial, { attribute: ":initial", elementClass: "Lattice" });
    assertRequired(this.final, { attribute: ":final", elementClass: "Lattice" });
  }
}
