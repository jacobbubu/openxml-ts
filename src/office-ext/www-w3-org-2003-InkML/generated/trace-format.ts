// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.TraceFormat

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the TraceFormat Class.
 *
 * Element: `inkml:traceFormat` */
export class TraceFormat extends OpenXmlCompositeElement {
  override readonly localName = "traceFormat" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (xml:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "xml:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["xml:id", this.id.toString()]);
    return out;
  }

}
