// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2019_extlst.json
// @see DocumentFormat.OpenXml.2019Extlst.Extension

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the Extension Class.
 *
 * Element: `oel:ext` */
export class Extension extends OpenXmlCompositeElement {
  override readonly localName = "ext" as const;
  override readonly prefix = "oel" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2019/extlst" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** uri (:uri) */
  uri: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "uri": this.uri = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uri !== undefined) out.push(["uri", this.uri.toString()]);
    return out;
  }

}
