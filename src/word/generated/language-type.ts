// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.LanguageType

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the LanguageType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class LanguageType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** Latin Language (w:val) */
  val: StringValue | undefined;

  /** East Asian Language (w:eastAsia) */
  eastAsia: StringValue | undefined;

  /** Complex Script Language (w:bidi) */
  bidi: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:val": this.val = StringValue.parse(value); return;
      case "w:eastAsia": this.eastAsia = StringValue.parse(value); return;
      case "w:bidi": this.bidi = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    if (this.eastAsia !== undefined) out.push(["w:eastAsia", this.eastAsia.toString()]);
    if (this.bidi !== undefined) out.push(["w:bidi", this.bidi.toString()]);
    return out;
  }
}
