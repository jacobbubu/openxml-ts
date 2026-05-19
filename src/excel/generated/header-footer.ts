// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.HeaderFooter

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Header Footer Settings.
 *
 * Element: `x:headerFooter` */
export class HeaderFooter extends OpenXmlCompositeElement {
  override readonly localName = "headerFooter" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Different Odd Even Header Footer (:differentOddEven) */
  differentOddEven: BooleanValue | undefined;

  /** Different First Page (:differentFirst) */
  differentFirst: BooleanValue | undefined;

  /** Scale Header and Footer With Document (:scaleWithDoc) */
  scaleWithDoc: BooleanValue | undefined;

  /** Align Margins (:alignWithMargins) */
  alignWithMargins: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "differentOddEven": this.differentOddEven = BooleanValue.parse(value); return;
      case "differentFirst": this.differentFirst = BooleanValue.parse(value); return;
      case "scaleWithDoc": this.scaleWithDoc = BooleanValue.parse(value); return;
      case "alignWithMargins": this.alignWithMargins = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.differentOddEven !== undefined) out.push(["differentOddEven", this.differentOddEven.toString()]);
    if (this.differentFirst !== undefined) out.push(["differentFirst", this.differentFirst.toString()]);
    if (this.scaleWithDoc !== undefined) out.push(["scaleWithDoc", this.scaleWithDoc.toString()]);
    if (this.alignWithMargins !== undefined) out.push(["alignWithMargins", this.alignWithMargins.toString()]);
    return out;
  }

}
