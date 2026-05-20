// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_math.json
// @see DocumentFormat.OpenXml.Math.Text

import {
  OpenXmlElementList,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Text.
 *
 * Element: `m:t` */
export class Text extends OpenXmlLeafElement {
  override readonly localName = "t" as const;
  override readonly prefix = "m" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/math" as const;


  /** space (xml:space) */
  space: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "xml:space": this.space = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.space !== undefined) out.push(["xml:space", this.space.toString()]);
    return out;
  }

}
