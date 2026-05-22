// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_04_emma.json
// @see DocumentFormat.OpenXml.200304Emma.Arc

import {
  DecimalValue,
  IntegerValue,
  ListValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt64Value,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Arc Class.
 *
 * Element: `emma:arc` */
export class Arc extends OpenXmlCompositeElement {
  override readonly localName = "arc" as const;
  override readonly prefix = "emma" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/04/emma" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** from (:from) */
  from: IntegerValue | undefined;

  /** to (:to) */
  to: IntegerValue | undefined;

  /** start (emma:start) */
  start: UInt64Value | undefined;

  /** end (emma:end) */
  end: UInt64Value | undefined;

  /** offset-to-start (emma:offset-to-start) */
  offsetToStart: IntegerValue | undefined;

  /** duration (emma:duration) */
  duration: IntegerValue | undefined;

  /** confidence (emma:confidence) */
  confidence: DecimalValue | undefined;

  /** cost (emma:cost) */
  cost: DecimalValue | undefined;

  /** lang (emma:lang) */
  language: StringValue | undefined;

  /** medium (emma:medium) */
  medium: StringValue | undefined;

  /** mode (emma:mode) */
  mode: ListValue<StringValue> | undefined;

  /** source (emma:source) */
  source: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "from": this.from = IntegerValue.parse(value); return;
      case "to": this.to = IntegerValue.parse(value); return;
      case "emma:start": this.start = UInt64Value.parse(value); return;
      case "emma:end": this.end = UInt64Value.parse(value); return;
      case "emma:offset-to-start": this.offsetToStart = IntegerValue.parse(value); return;
      case "emma:duration": this.duration = IntegerValue.parse(value); return;
      case "emma:confidence": this.confidence = DecimalValue.parse(value); assertNumber(this.confidence, { min: 0, max: 1 }, { attribute: "emma:confidence", elementClass: "Arc" }); return;
      case "emma:cost": this.cost = DecimalValue.parse(value); assertNumber(this.cost, { min: 0, max: 10000000 }, { attribute: "emma:cost", elementClass: "Arc" }); return;
      case "emma:lang": this.language = StringValue.parse(value); return;
      case "emma:medium": this.medium = StringValue.parse(value); return;
      case "emma:mode": this.mode = ListValue.parse(value, StringValue.parse); return;
      case "emma:source": this.source = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.from !== undefined) out.push(["from", this.from.toString()]);
    if (this.to !== undefined) out.push(["to", this.to.toString()]);
    if (this.start !== undefined) out.push(["emma:start", this.start.toString()]);
    if (this.end !== undefined) out.push(["emma:end", this.end.toString()]);
    if (this.offsetToStart !== undefined) out.push(["emma:offset-to-start", this.offsetToStart.toString()]);
    if (this.duration !== undefined) out.push(["emma:duration", this.duration.toString()]);
    if (this.confidence !== undefined) out.push(["emma:confidence", this.confidence.toString()]);
    if (this.cost !== undefined) out.push(["emma:cost", this.cost.toString()]);
    if (this.language !== undefined) out.push(["emma:lang", this.language.toString()]);
    if (this.medium !== undefined) out.push(["emma:medium", this.medium.toString()]);
    if (this.mode !== undefined) out.push(["emma:mode", this.mode.toString()]);
    if (this.source !== undefined) out.push(["emma:source", this.source.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.from, { attribute: ":from", elementClass: "Arc" });
    assertRequired(this.to, { attribute: ":to", elementClass: "Arc" });
  }
}
