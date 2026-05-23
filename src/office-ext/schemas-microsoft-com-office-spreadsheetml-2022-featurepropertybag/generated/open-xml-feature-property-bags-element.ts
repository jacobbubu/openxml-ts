// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2022_featurepropertybag.json
// @see DocumentFormat.OpenXml.Spreadsheetml2022Featurepropertybag.OpenXmlFeaturePropertyBagsElement

import {
  OpenXmlCompositeElement,
  UInt32Value,
} from "../../../element/index.js";

/** Defines the OpenXmlFeaturePropertyBagsElement Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class OpenXmlFeaturePropertyBagsElement extends OpenXmlCompositeElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** count (:count) */
  count: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "count": this.count = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.count !== undefined) out.push(["count", this.count.toString()]);
    return out;
  }

}
