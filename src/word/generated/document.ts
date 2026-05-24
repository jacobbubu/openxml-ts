// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Document

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Document.
 *
 * Element: `w:document` */
export class Document extends OpenXmlCompositeElement {
  override readonly localName = "document" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  override applyAttribute(qname: string, value: string): void {
    // §14.11.1 of ISO/IEC 29500-4: drop conformance="strict" when translating
    // from Strict to Transitional — this attribute has no meaning in Transitional.
    if (qname === "conformance" && value === "strict") {
      return;
    }
    super.applyAttribute(qname, value);
  }
}
