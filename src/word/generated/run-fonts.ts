// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.RunFonts

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the RunFonts Class.
 *
 * Element: `w:rFonts` */
export class RunFonts extends OpenXmlLeafElement {
  override readonly localName = "rFonts" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Font Content Type (w:hint) */
  hint: StringValue | undefined;

  /** ASCII Font (w:ascii) */
  ascii: StringValue | undefined;

  /** High ANSI Font (w:hAnsi) */
  highAnsi: StringValue | undefined;

  /** East Asian Font (w:eastAsia) */
  eastAsia: StringValue | undefined;

  /** Complex Script Font (w:cs) */
  complexScript: StringValue | undefined;

  /** ASCII Theme Font (w:asciiTheme) */
  asciiTheme: StringValue | undefined;

  /** High ANSI Theme Font (w:hAnsiTheme) */
  highAnsiTheme: StringValue | undefined;

  /** East Asian Theme Font (w:eastAsiaTheme) */
  eastAsiaTheme: StringValue | undefined;

  /** Complex Script Theme Font (w:cstheme) */
  complexScriptTheme: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:hint": this.hint = StringValue.parse(value); return;
      case "w:ascii": this.ascii = StringValue.parse(value); return;
      case "w:hAnsi": this.highAnsi = StringValue.parse(value); return;
      case "w:eastAsia": this.eastAsia = StringValue.parse(value); return;
      case "w:cs": this.complexScript = StringValue.parse(value); return;
      case "w:asciiTheme": this.asciiTheme = StringValue.parse(value); return;
      case "w:hAnsiTheme": this.highAnsiTheme = StringValue.parse(value); return;
      case "w:eastAsiaTheme": this.eastAsiaTheme = StringValue.parse(value); return;
      case "w:cstheme": this.complexScriptTheme = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.hint !== undefined) out.push(["w:hint", this.hint.toString()]);
    if (this.ascii !== undefined) out.push(["w:ascii", this.ascii.toString()]);
    if (this.highAnsi !== undefined) out.push(["w:hAnsi", this.highAnsi.toString()]);
    if (this.eastAsia !== undefined) out.push(["w:eastAsia", this.eastAsia.toString()]);
    if (this.complexScript !== undefined) out.push(["w:cs", this.complexScript.toString()]);
    if (this.asciiTheme !== undefined) out.push(["w:asciiTheme", this.asciiTheme.toString()]);
    if (this.highAnsiTheme !== undefined) out.push(["w:hAnsiTheme", this.highAnsiTheme.toString()]);
    if (this.eastAsiaTheme !== undefined) out.push(["w:eastAsiaTheme", this.eastAsiaTheme.toString()]);
    if (this.complexScriptTheme !== undefined) out.push(["w:cstheme", this.complexScriptTheme.toString()]);
    return out;
  }
}
