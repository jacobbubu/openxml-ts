// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.PageBorders

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the PageBorders Class.
 *
 * Element: `w:pgBorders` */
export class PageBorders extends OpenXmlCompositeElement {
  override readonly localName = "pgBorders" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Z-Ordering of Page Border (w:zOrder) */
  zOrder: StringValue | undefined;

  /** Pages to Display Page Borders (w:display) */
  display: StringValue | undefined;

  /** Page Border Positioning (w:offsetFrom) */
  offsetFrom: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:zOrder": this.zOrder = StringValue.parse(value); return;
      case "w:display": this.display = StringValue.parse(value); return;
      case "w:offsetFrom": this.offsetFrom = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.zOrder !== undefined) out.push(["w:zOrder", this.zOrder.toString()]);
    if (this.display !== undefined) out.push(["w:display", this.display.toString()]);
    if (this.offsetFrom !== undefined) out.push(["w:offsetFrom", this.offsetFrom.toString()]);
    return out;
  }

}
