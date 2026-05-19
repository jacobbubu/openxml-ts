// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.HeaderFooter

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Defines the HeaderFooter Class.
 *
 * Element: `p:hf` */
export class HeaderFooter extends OpenXmlCompositeElement {
  override readonly localName = "hf" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Slide Number Placeholder (:sldNum) */
  slideNumber: BooleanValue | undefined;

  /** Header Placeholder (:hdr) */
  header: BooleanValue | undefined;

  /** Footer Placeholder (:ftr) */
  footer: BooleanValue | undefined;

  /** Date/Time Placeholder (:dt) */
  dateTime: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "sldNum": this.slideNumber = BooleanValue.parse(value); return;
      case "hdr": this.header = BooleanValue.parse(value); return;
      case "ftr": this.footer = BooleanValue.parse(value); return;
      case "dt": this.dateTime = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.slideNumber !== undefined) out.push(["sldNum", this.slideNumber.toString()]);
    if (this.header !== undefined) out.push(["hdr", this.header.toString()]);
    if (this.footer !== undefined) out.push(["ftr", this.footer.toString()]);
    if (this.dateTime !== undefined) out.push(["dt", this.dateTime.toString()]);
    return out;
  }

}
