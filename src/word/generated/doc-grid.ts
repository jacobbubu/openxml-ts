// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.DocGrid

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the DocGrid Class.
 *
 * Element: `w:docGrid` */
export class DocGrid extends OpenXmlLeafElement {
  override readonly localName = "docGrid" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Document Grid Type (w:type) */
  type: StringValue | undefined;

  /** Document Grid Line Pitch (w:linePitch) */
  linePitch: Int32Value | undefined;

  /** Document Grid Character Pitch (w:charSpace) */
  characterSpace: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:type": this.type = StringValue.parse(value); return;
      case "w:linePitch": this.linePitch = Int32Value.parse(value); return;
      case "w:charSpace": this.characterSpace = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["w:type", this.type.toString()]);
    if (this.linePitch !== undefined) out.push(["w:linePitch", this.linePitch.toString()]);
    if (this.characterSpace !== undefined) out.push(["w:charSpace", this.characterSpace.toString()]);
    return out;
  }

}
