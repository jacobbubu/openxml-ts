// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.Context

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the Context Class.
 *
 * Element: `inkml:context` */
export class Context extends OpenXmlCompositeElement {
  override readonly localName = "context" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (xml:id) */
  id: StringValue | undefined;

  /** contextRef (:contextRef) */
  contextRef: StringValue | undefined;

  /** canvasRef (:canvasRef) */
  canvasRef: StringValue | undefined;

  /** canvasTransformRef (:canvasTransformRef) */
  canvasTransformRef: StringValue | undefined;

  /** traceFormatRef (:traceFormatRef) */
  traceFromatRef: StringValue | undefined;

  /** inkSourceRef (:inkSourceRef) */
  inkSourceRef: StringValue | undefined;

  /** brushRef (:brushRef) */
  brushRef: StringValue | undefined;

  /** timestampRef (:timestampRef) */
  timestampRef: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "xml:id": this.id = StringValue.parse(value); return;
      case "contextRef": this.contextRef = StringValue.parse(value); return;
      case "canvasRef": this.canvasRef = StringValue.parse(value); return;
      case "canvasTransformRef": this.canvasTransformRef = StringValue.parse(value); return;
      case "traceFormatRef": this.traceFromatRef = StringValue.parse(value); return;
      case "inkSourceRef": this.inkSourceRef = StringValue.parse(value); return;
      case "brushRef": this.brushRef = StringValue.parse(value); return;
      case "timestampRef": this.timestampRef = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["xml:id", this.id.toString()]);
    if (this.contextRef !== undefined) out.push(["contextRef", this.contextRef.toString()]);
    if (this.canvasRef !== undefined) out.push(["canvasRef", this.canvasRef.toString()]);
    if (this.canvasTransformRef !== undefined) out.push(["canvasTransformRef", this.canvasTransformRef.toString()]);
    if (this.traceFromatRef !== undefined) out.push(["traceFormatRef", this.traceFromatRef.toString()]);
    if (this.inkSourceRef !== undefined) out.push(["inkSourceRef", this.inkSourceRef.toString()]);
    if (this.brushRef !== undefined) out.push(["brushRef", this.brushRef.toString()]);
    if (this.timestampRef !== undefined) out.push(["timestampRef", this.timestampRef.toString()]);
    return out;
  }

}
