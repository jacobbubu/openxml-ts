// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.NoLineBreaksBeforeKinsoku

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Custom Set Of Characters Which Cannot Begin A Line.
 *
 * Element: `w:noLineBreaksBefore` */
export class NoLineBreaksBeforeKinsoku extends OpenXmlLeafElement {
  override readonly localName = "noLineBreaksBefore" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** lang (w:lang) */
  language: StringValue | undefined;

  /** val (w:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:lang": this.language = StringValue.parse(value); return;
      case "w:val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.language !== undefined) out.push(["w:lang", this.language.toString()]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    return out;
  }
}
