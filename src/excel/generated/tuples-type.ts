// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.TuplesType

import {
  OpenXmlCompositeElement,
  UInt32Value,
} from "../../element/index.js";

/** Defines the TuplesType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class TuplesType extends OpenXmlCompositeElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** Member Name Count (:c) */
  memberNameCount: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":c": this.memberNameCount = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.memberNameCount !== undefined) out.push([":c", this.memberNameCount.toString()]);
    return out;
  }

}
