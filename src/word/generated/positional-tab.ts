// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.PositionalTab

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Absolute Position Tab Character.
 *
 * Element: `w:ptab` */
export class PositionalTab extends OpenXmlLeafElement {
  override readonly localName = "ptab" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Positional Tab Stop Alignment (w:alignment) */
  alignment: StringValue | undefined;

  /** Positional Tab Base (w:relativeTo) */
  relativeTo: StringValue | undefined;

  /** Tab Leader Character (w:leader) */
  leader: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:alignment": this.alignment = StringValue.parse(value); return;
      case "w:relativeTo": this.relativeTo = StringValue.parse(value); return;
      case "w:leader": this.leader = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.alignment !== undefined) out.push(["w:alignment", this.alignment.toString()]);
    if (this.relativeTo !== undefined) out.push(["w:relativeTo", this.relativeTo.toString()]);
    if (this.leader !== undefined) out.push(["w:leader", this.leader.toString()]);
    return out;
  }
}
