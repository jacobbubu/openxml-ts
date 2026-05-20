// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_chart.json
// @see DocumentFormat.OpenXml.Chart.HeaderFooter

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Header and Footer.
 *
 * Element: `c:headerFooter` */
export class HeaderFooter extends OpenXmlCompositeElement {
  override readonly localName = "headerFooter" as const;
  override readonly prefix = "c" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/chart" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Align With Margins (:alignWithMargins) */
  alignWithMargins: BooleanValue | undefined;

  /** Different Odd Even (:differentOddEven) */
  differentOddEven: BooleanValue | undefined;

  /** Different First (:differentFirst) */
  differentFirst: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "alignWithMargins": this.alignWithMargins = BooleanValue.parse(value); return;
      case "differentOddEven": this.differentOddEven = BooleanValue.parse(value); return;
      case "differentFirst": this.differentFirst = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.alignWithMargins !== undefined) out.push(["alignWithMargins", this.alignWithMargins.toString()]);
    if (this.differentOddEven !== undefined) out.push(["differentOddEven", this.differentOddEven.toString()]);
    if (this.differentFirst !== undefined) out.push(["differentFirst", this.differentFirst.toString()]);
    return out;
  }

}
