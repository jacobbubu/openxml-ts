// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.PaperSource

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the PaperSource Class.
 *
 * Element: `w:paperSrc` */
export class PaperSource extends OpenXmlLeafElement {
  override readonly localName = "paperSrc" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** First Page Printer Tray Code (w:first) */
  first: StringValue | undefined;

  /** Non-First Page Printer Tray Code (w:other) */
  other: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:first": this.first = StringValue.parse(value); return;
      case "w:other": this.other = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.first !== undefined) out.push(["w:first", this.first.toString()]);
    if (this.other !== undefined) out.push(["w:other", this.other.toString()]);
    return out;
  }

}
