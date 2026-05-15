// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.ActiveWritingStyle

import {
  BooleanValue,
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Grammar Checking Settings.
 *
 * Element: `w:activeWritingStyle` */
export class ActiveWritingStyle extends OpenXmlLeafElement {
  override readonly localName = "activeWritingStyle" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Writing Style Language (w:lang) */
  language: StringValue | undefined;

  /** Grammatical Engine ID (w:vendorID) */
  vendorID: StringValue | undefined;

  /** Grammatical Check Engine Version (w:dllVersion) */
  dllVersion: Int32Value | undefined;

  /** Natural Language Grammar Check (w:nlCheck) */
  naturalLanguageGrammarCheck: BooleanValue | undefined;

  /** Check Stylistic Rules With Grammar (w:checkStyle) */
  checkStyle: BooleanValue | undefined;

  /** Application Name (w:appName) */
  applicationName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:lang": this.language = StringValue.parse(value); return;
      case "w:vendorID": this.vendorID = StringValue.parse(value); return;
      case "w:dllVersion": this.dllVersion = Int32Value.parse(value); return;
      case "w:nlCheck": this.naturalLanguageGrammarCheck = BooleanValue.parse(value); return;
      case "w:checkStyle": this.checkStyle = BooleanValue.parse(value); return;
      case "w:appName": this.applicationName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.language !== undefined) out.push(["w:lang", this.language.toString()]);
    if (this.vendorID !== undefined) out.push(["w:vendorID", this.vendorID.toString()]);
    if (this.dllVersion !== undefined) out.push(["w:dllVersion", this.dllVersion.toString()]);
    if (this.naturalLanguageGrammarCheck !== undefined) out.push(["w:nlCheck", this.naturalLanguageGrammarCheck.toString()]);
    if (this.checkStyle !== undefined) out.push(["w:checkStyle", this.checkStyle.toString()]);
    if (this.applicationName !== undefined) out.push(["w:appName", this.applicationName.toString()]);
    return out;
  }
}
