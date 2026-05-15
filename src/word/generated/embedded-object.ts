// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.EmbeddedObject

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Inline Embedded Object.
 *
 * Element: `w:object` */
export class EmbeddedObject extends OpenXmlCompositeElement {
  override readonly localName = "object" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** dxaOrig (w:dxaOrig) */
  dxaOriginal: StringValue | undefined;

  /** dyaOrig (w:dyaOrig) */
  dyaOriginal: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:dxaOrig": this.dxaOriginal = StringValue.parse(value); return;
      case "w:dyaOrig": this.dyaOriginal = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.dxaOriginal !== undefined) out.push(["w:dxaOrig", this.dxaOriginal.toString()]);
    if (this.dyaOriginal !== undefined) out.push(["w:dyaOrig", this.dyaOriginal.toString()]);
    return out;
  }
}
