// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.OleObjectEmbed

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the OleObjectEmbed Class.
 *
 * Element: `p:embed` */
export class OleObjectEmbed extends OpenXmlCompositeElement {
  override readonly localName = "embed" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Color Scheme Properties for OLE Object (:followColorScheme) */
  followColorScheme: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "followColorScheme": this.followColorScheme = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.followColorScheme !== undefined) out.push(["followColorScheme", this.followColorScheme.toString()]);
    return out;
  }

}
