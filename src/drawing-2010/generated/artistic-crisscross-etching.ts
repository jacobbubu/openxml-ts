// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.ArtisticCrisscrossEtching

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Defines the ArtisticCrisscrossEtching Class.
 *
 * Element: `a14:artisticCrisscrossEtching` */
export class ArtisticCrisscrossEtching extends OpenXmlLeafElement {
  override readonly localName = "artisticCrisscrossEtching" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;


  /** trans (:trans) */
  transparancy: Int32Value | undefined;

  /** pressure (:pressure) */
  pressure: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "trans": this.transparancy = Int32Value.parse(value); assertNumber(this.transparancy, { min: 0, max: 100000 }, { attribute: ":trans", elementClass: "ArtisticCrisscrossEtching" }); return;
      case "pressure": this.pressure = Int32Value.parse(value); assertNumber(this.pressure, { min: 0, max: 100 }, { attribute: ":pressure", elementClass: "ArtisticCrisscrossEtching" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.transparancy !== undefined) out.push(["trans", this.transparancy.toString()]);
    if (this.pressure !== undefined) out.push(["pressure", this.pressure.toString()]);
    return out;
  }

}
