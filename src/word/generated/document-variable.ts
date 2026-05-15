// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.DocumentVariable

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Single Document Variable.
 *
 * Element: `w:docVar` */
export class DocumentVariable extends OpenXmlLeafElement {
  override readonly localName = "docVar" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Document Variable Name (w:name) */
  name: StringValue | undefined;

  /** Document Variable Value (w:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:name": this.name = StringValue.parse(value); return;
      case "w:val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["w:name", this.name.toString()]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    return out;
  }
}
