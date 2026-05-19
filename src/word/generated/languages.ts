// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Languages

import {
  OpenXmlLeafElement,
  StringValue,
  assertString,
} from "../../element/index.js";

/** Defines the Languages Class.
 *
 * Element: `w:lang` */
export class Languages extends OpenXmlLeafElement {
  override readonly localName = "lang" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Latin Language (w:val) */
  val: StringValue | undefined;

  /** East Asian Language (w:eastAsia) */
  eastAsia: StringValue | undefined;

  /** Complex Script Language (w:bidi) */
  bidi: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:val": this.val = StringValue.parse(value); assertString(this.val, { maxLength: 84 }, { attribute: "w:val", elementClass: "Languages" }); return;
      case "w:eastAsia": this.eastAsia = StringValue.parse(value); assertString(this.eastAsia, { maxLength: 84 }, { attribute: "w:eastAsia", elementClass: "Languages" }); return;
      case "w:bidi": this.bidi = StringValue.parse(value); assertString(this.bidi, { maxLength: 84 }, { attribute: "w:bidi", elementClass: "Languages" }); return;
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
