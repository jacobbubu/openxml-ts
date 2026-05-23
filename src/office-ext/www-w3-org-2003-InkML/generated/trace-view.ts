// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.TraceView

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the TraceView Class.
 *
 * Element: `inkml:traceView` */
export class TraceView extends OpenXmlCompositeElement {
  override readonly localName = "traceView" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (xml:id) */
  id: StringValue | undefined;

  /** contextRef (:contextRef) */
  contextRef: StringValue | undefined;

  /** traceDataRef (:traceDataRef) */
  traceDataRef: StringValue | undefined;

  /** from (:from) */
  from: StringValue | undefined;

  /** to (:to) */
  to: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "xml:id": this.id = StringValue.parse(value); return;
      case "contextRef": this.contextRef = StringValue.parse(value); return;
      case "traceDataRef": this.traceDataRef = StringValue.parse(value); return;
      case "from": this.from = StringValue.parse(value); return;
      case "to": this.to = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["xml:id", this.id.toString()]);
    if (this.contextRef !== undefined) out.push(["contextRef", this.contextRef.toString()]);
    if (this.traceDataRef !== undefined) out.push(["traceDataRef", this.traceDataRef.toString()]);
    if (this.from !== undefined) out.push(["from", this.from.toString()]);
    if (this.to !== undefined) out.push(["to", this.to.toString()]);
    return out;
  }

}
