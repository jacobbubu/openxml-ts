// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.TraceGroup

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the TraceGroup Class.
 *
 * Element: `inkml:traceGroup` */
export class TraceGroup extends OpenXmlCompositeElement {
  override readonly localName = "traceGroup" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (xml:id) */
  id: StringValue | undefined;

  /** contextRef (:contextRef) */
  contextRef: StringValue | undefined;

  /** brushRef (:brushRef) */
  brushRef: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "xml:id": this.id = StringValue.parse(value); return;
      case "contextRef": this.contextRef = StringValue.parse(value); return;
      case "brushRef": this.brushRef = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["xml:id", this.id.toString()]);
    if (this.contextRef !== undefined) out.push(["contextRef", this.contextRef.toString()]);
    if (this.brushRef !== undefined) out.push(["brushRef", this.brushRef.toString()]);
    return out;
  }

}
