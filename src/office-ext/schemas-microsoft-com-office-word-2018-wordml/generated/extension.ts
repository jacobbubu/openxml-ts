// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2018_wordml.json
// @see DocumentFormat.OpenXml.Word2018Wordml.Extension

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the Extension Class.
 *
 * Element: `w16cur:ext` */
export class Extension extends OpenXmlCompositeElement {
  override readonly localName = "ext" as const;
  override readonly prefix = "w16cur" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2018/wordml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** uri (w16cur:uri) */
  uri: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w16cur:uri": this.uri = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uri !== undefined) out.push(["w16cur:uri", this.uri.toString()]);
    return out;
  }

}
