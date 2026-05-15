// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.ProofState

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Spelling and Grammatical Checking State.
 *
 * Element: `w:proofState` */
export class ProofState extends OpenXmlLeafElement {
  override readonly localName = "proofState" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Spell Checking State (w:spelling) */
  spelling: StringValue | undefined;

  /** Grammatical Checking State (w:grammar) */
  grammar: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:spelling": this.spelling = StringValue.parse(value); return;
      case "w:grammar": this.grammar = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.spelling !== undefined) out.push(["w:spelling", this.spelling.toString()]);
    if (this.grammar !== undefined) out.push(["w:grammar", this.grammar.toString()]);
    return out;
  }
}
