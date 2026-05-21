// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_04_emma.json
// @see DocumentFormat.OpenXml.200304Emma.Interpretation

import {
  BooleanValue,
  DecimalValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Interpretation Class.
 *
 * Element: `emma:interpretation` */
export class Interpretation extends OpenXmlCompositeElement {
  override readonly localName = "interpretation" as const;
  override readonly prefix = "emma" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/04/emma" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: StringValue | undefined;

  /** tokens (emma:tokens) */
  tokens: StringValue | undefined;

  /** process (emma:process) */
  process: StringValue | undefined;

  /** lang (emma:lang) */
  language: StringValue | undefined;

  /** signal (emma:signal) */
  signal: StringValue | undefined;

  /** signal-size (emma:signal-size) */
  signalSize: StringValue | undefined;

  /** media-type (emma:media-type) */
  mediaType: StringValue | undefined;

  /** confidence (emma:confidence) */
  confidence: DecimalValue | undefined;

  /** source (emma:source) */
  source: StringValue | undefined;

  /** start (emma:start) */
  start: StringValue | undefined;

  /** end (emma:end) */
  end: StringValue | undefined;

  /** time-ref-uri (emma:time-ref-uri) */
  timeReference: StringValue | undefined;

  /** time-ref-anchor-point (emma:time-ref-anchor-point) */
  timeReferenceAnchorPoint: StringValue | undefined;

  /** offset-to-start (emma:offset-to-start) */
  offsetToStart: StringValue | undefined;

  /** duration (emma:duration) */
  duration: StringValue | undefined;

  /** medium (emma:medium) */
  medium: StringValue | undefined;

  /** mode (emma:mode) */
  mode: StringValue | undefined;

  /** function (emma:function) */
  function: StringValue | undefined;

  /** verbal (emma:verbal) */
  verbal: BooleanValue | undefined;

  /** cost (emma:cost) */
  cost: DecimalValue | undefined;

  /** grammar-ref (emma:grammar-ref) */
  grammarRef: StringValue | undefined;

  /** endpoint-info-ref (emma:endpoint-info-ref) */
  endpointInfoRef: StringValue | undefined;

  /** model-ref (emma:model-ref) */
  modelRef: StringValue | undefined;

  /** dialog-turn (emma:dialog-turn) */
  dialogTurn: StringValue | undefined;

  /** no-input (emma:no-input) */
  noInput: BooleanValue | undefined;

  /** uninterpreted (emma:uninterpreted) */
  uninterpreted: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "emma:tokens": this.tokens = StringValue.parse(value); return;
      case "emma:process": this.process = StringValue.parse(value); return;
      case "emma:lang": this.language = StringValue.parse(value); return;
      case "emma:signal": this.signal = StringValue.parse(value); return;
      case "emma:signal-size": this.signalSize = StringValue.parse(value); return;
      case "emma:media-type": this.mediaType = StringValue.parse(value); return;
      case "emma:confidence": this.confidence = DecimalValue.parse(value); assertNumber(this.confidence, { min: 0, max: 1 }, { attribute: "emma:confidence", elementClass: "Interpretation" }); return;
      case "emma:source": this.source = StringValue.parse(value); return;
      case "emma:start": this.start = StringValue.parse(value); return;
      case "emma:end": this.end = StringValue.parse(value); return;
      case "emma:time-ref-uri": this.timeReference = StringValue.parse(value); return;
      case "emma:time-ref-anchor-point": this.timeReferenceAnchorPoint = StringValue.parse(value); return;
      case "emma:offset-to-start": this.offsetToStart = StringValue.parse(value); return;
      case "emma:duration": this.duration = StringValue.parse(value); return;
      case "emma:medium": this.medium = StringValue.parse(value); return;
      case "emma:mode": this.mode = StringValue.parse(value); return;
      case "emma:function": this.function = StringValue.parse(value); return;
      case "emma:verbal": this.verbal = BooleanValue.parse(value); return;
      case "emma:cost": this.cost = DecimalValue.parse(value); assertNumber(this.cost, { min: 0, max: 10000000 }, { attribute: "emma:cost", elementClass: "Interpretation" }); return;
      case "emma:grammar-ref": this.grammarRef = StringValue.parse(value); return;
      case "emma:endpoint-info-ref": this.endpointInfoRef = StringValue.parse(value); return;
      case "emma:model-ref": this.modelRef = StringValue.parse(value); return;
      case "emma:dialog-turn": this.dialogTurn = StringValue.parse(value); return;
      case "emma:no-input": this.noInput = BooleanValue.parse(value); return;
      case "emma:uninterpreted": this.uninterpreted = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.tokens !== undefined) out.push(["emma:tokens", this.tokens.toString()]);
    if (this.process !== undefined) out.push(["emma:process", this.process.toString()]);
    if (this.language !== undefined) out.push(["emma:lang", this.language.toString()]);
    if (this.signal !== undefined) out.push(["emma:signal", this.signal.toString()]);
    if (this.signalSize !== undefined) out.push(["emma:signal-size", this.signalSize.toString()]);
    if (this.mediaType !== undefined) out.push(["emma:media-type", this.mediaType.toString()]);
    if (this.confidence !== undefined) out.push(["emma:confidence", this.confidence.toString()]);
    if (this.source !== undefined) out.push(["emma:source", this.source.toString()]);
    if (this.start !== undefined) out.push(["emma:start", this.start.toString()]);
    if (this.end !== undefined) out.push(["emma:end", this.end.toString()]);
    if (this.timeReference !== undefined) out.push(["emma:time-ref-uri", this.timeReference.toString()]);
    if (this.timeReferenceAnchorPoint !== undefined) out.push(["emma:time-ref-anchor-point", this.timeReferenceAnchorPoint.toString()]);
    if (this.offsetToStart !== undefined) out.push(["emma:offset-to-start", this.offsetToStart.toString()]);
    if (this.duration !== undefined) out.push(["emma:duration", this.duration.toString()]);
    if (this.medium !== undefined) out.push(["emma:medium", this.medium.toString()]);
    if (this.mode !== undefined) out.push(["emma:mode", this.mode.toString()]);
    if (this.function !== undefined) out.push(["emma:function", this.function.toString()]);
    if (this.verbal !== undefined) out.push(["emma:verbal", this.verbal.toString()]);
    if (this.cost !== undefined) out.push(["emma:cost", this.cost.toString()]);
    if (this.grammarRef !== undefined) out.push(["emma:grammar-ref", this.grammarRef.toString()]);
    if (this.endpointInfoRef !== undefined) out.push(["emma:endpoint-info-ref", this.endpointInfoRef.toString()]);
    if (this.modelRef !== undefined) out.push(["emma:model-ref", this.modelRef.toString()]);
    if (this.dialogTurn !== undefined) out.push(["emma:dialog-turn", this.dialogTurn.toString()]);
    if (this.noInput !== undefined) out.push(["emma:no-input", this.noInput.toString()]);
    if (this.uninterpreted !== undefined) out.push(["emma:uninterpreted", this.uninterpreted.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "Interpretation" });
  }
}
