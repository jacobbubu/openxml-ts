// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.AnnotationXml

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the AnnotationXml Class.
 *
 * Element: `inkml:annotationXML` */
export class AnnotationXml extends OpenXmlCompositeElement {
  override readonly localName = "annotationXML" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** type (:type) */
  type: StringValue | undefined;

  /** encoding (:encoding) */
  encoding: StringValue | undefined;

  /** href (:href) */
  href: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
      case "encoding": this.encoding = StringValue.parse(value); return;
      case "href": this.href = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.encoding !== undefined) out.push(["encoding", this.encoding.toString()]);
    if (this.href !== undefined) out.push(["href", this.href.toString()]);
    return out;
  }

}
