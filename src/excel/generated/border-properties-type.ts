// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.BorderPropertiesType

import {
  OpenXmlCompositeElement,
  StringValue,
} from "../../element/index.js";

/** Defines the BorderPropertiesType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class BorderPropertiesType extends OpenXmlCompositeElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** Line Style (:style) */
  style: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "style": this.style = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.style !== undefined) out.push(["style", this.style.toString()]);
    return out;
  }

}
