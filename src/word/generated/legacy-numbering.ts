// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.LegacyNumbering

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Legacy Numbering Level Properties.
 *
 * Element: `w:legacy` */
export class LegacyNumbering extends OpenXmlLeafElement {
  override readonly localName = "legacy" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Use Legacy Numbering Properties (w:legacy) */
  legacy: BooleanValue | undefined;

  /** Legacy Spacing (w:legacySpace) */
  legacySpace: StringValue | undefined;

  /** Legacy Indent (w:legacyIndent) */
  legacyIndent: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:legacy": this.legacy = BooleanValue.parse(value); return;
      case "w:legacySpace": this.legacySpace = StringValue.parse(value); return;
      case "w:legacyIndent": this.legacyIndent = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.legacy !== undefined) out.push(["w:legacy", this.legacy.toString()]);
    if (this.legacySpace !== undefined) out.push(["w:legacySpace", this.legacySpace.toString()]);
    if (this.legacyIndent !== undefined) out.push(["w:legacyIndent", this.legacyIndent.toString()]);
    return out;
  }
}
