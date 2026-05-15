// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.AbstractNum

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Abstract Numbering Definition.
 *
 * Element: `w:abstractNum` */
export class AbstractNum extends OpenXmlCompositeElement {
  override readonly localName = "abstractNum" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Abstract Numbering Definition ID (w:abstractNumId) */
  abstractNumberId: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:abstractNumId": this.abstractNumberId = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.abstractNumberId !== undefined) out.push(["w:abstractNumId", this.abstractNumberId.toString()]);
    return out;
  }
}
