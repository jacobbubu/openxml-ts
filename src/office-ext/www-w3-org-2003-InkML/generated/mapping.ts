// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.Mapping

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the Mapping Class.
 *
 * Element: `inkml:mapping` */
export class Mapping extends OpenXmlCompositeElement {
  override readonly localName = "mapping" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (xml:id) */
  id: StringValue | undefined;

  /** type (:type) */
  type: StringValue | undefined;

  /** mappingRef (:mappingRef) */
  mappingRef: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "xml:id": this.id = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "mappingRef": this.mappingRef = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["xml:id", this.id.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.mappingRef !== undefined) out.push(["mappingRef", this.mappingRef.toString()]);
    return out;
  }

}
