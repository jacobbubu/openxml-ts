// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Break

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Break.
 *
 * Element: `w:br` */
export class Break extends OpenXmlLeafElement {
  override readonly localName = "br" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Break Type (w:type) */
  type: StringValue | undefined;

  /** Restart Location For Text Wrapping Break (w:clear) */
  clear: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:type": this.type = StringValue.parse(value); return;
      case "w:clear": this.clear = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["w:type", this.type.toString()]);
    if (this.clear !== undefined) out.push(["w:clear", this.clear.toString()]);
    return out;
  }

}
