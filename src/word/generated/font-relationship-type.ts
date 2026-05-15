// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.FontRelationshipType

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the FontRelationshipType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class FontRelationshipType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** fontKey (w:fontKey) */
  fontKey: StringValue | undefined;

  /** subsetted (w:subsetted) */
  subsetted: BooleanValue | undefined;

  /** Relationship to Part (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:fontKey": this.fontKey = StringValue.parse(value); return;
      case "w:subsetted": this.subsetted = BooleanValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.fontKey !== undefined) out.push(["w:fontKey", this.fontKey.toString()]);
    if (this.subsetted !== undefined) out.push(["w:subsetted", this.subsetted.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }
}
