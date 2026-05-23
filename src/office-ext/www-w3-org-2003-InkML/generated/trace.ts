// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.Trace

import {
  DecimalValue,
  OpenXmlElementList,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the Trace Class.
 *
 * Element: `inkml:trace` */
export class Trace extends OpenXmlLeafElement {
  override readonly localName = "trace" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;


  /** id (xml:id) */
  id: StringValue | undefined;

  /** type (:type) */
  type: StringValue | undefined;

  /** continuation (:continuation) */
  continuation: StringValue | undefined;

  /** priorRef (:priorRef) */
  priorRef: StringValue | undefined;

  /** contextRef (:contextRef) */
  contextRef: StringValue | undefined;

  /** brushRef (:brushRef) */
  brushRef: StringValue | undefined;

  /** duration (:duration) */
  duration: DecimalValue | undefined;

  /** timeOffset (:timeOffset) */
  timeOffset: DecimalValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "xml:id": this.id = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "continuation": this.continuation = StringValue.parse(value); return;
      case "priorRef": this.priorRef = StringValue.parse(value); return;
      case "contextRef": this.contextRef = StringValue.parse(value); return;
      case "brushRef": this.brushRef = StringValue.parse(value); return;
      case "duration": this.duration = DecimalValue.parse(value); return;
      case "timeOffset": this.timeOffset = DecimalValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["xml:id", this.id.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.continuation !== undefined) out.push(["continuation", this.continuation.toString()]);
    if (this.priorRef !== undefined) out.push(["priorRef", this.priorRef.toString()]);
    if (this.contextRef !== undefined) out.push(["contextRef", this.contextRef.toString()]);
    if (this.brushRef !== undefined) out.push(["brushRef", this.brushRef.toString()]);
    if (this.duration !== undefined) out.push(["duration", this.duration.toString()]);
    if (this.timeOffset !== undefined) out.push(["timeOffset", this.timeOffset.toString()]);
    return out;
  }

}
