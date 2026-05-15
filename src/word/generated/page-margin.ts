// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.PageMargin

import {
  Int32Value,
  OpenXmlLeafElement,
  UInt32Value,
} from "../../element/index.js";

/** Defines the PageMargin Class.
 *
 * Element: `w:pgMar` */
export class PageMargin extends OpenXmlLeafElement {
  override readonly localName = "pgMar" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Top Margin Spacing (w:top) */
  top: Int32Value | undefined;

  /** Right Margin Spacing (w:right) */
  right: UInt32Value | undefined;

  /** Page Bottom Spacing (w:bottom) */
  bottom: Int32Value | undefined;

  /** Left Margin Spacing (w:left) */
  left: UInt32Value | undefined;

  /** Spacing to Top of Header (w:header) */
  header: UInt32Value | undefined;

  /** Spacing to Bottom of Footer (w:footer) */
  footer: UInt32Value | undefined;

  /** Page Gutter Spacing (w:gutter) */
  gutter: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:top": this.top = Int32Value.parse(value); return;
      case "w:right": this.right = UInt32Value.parse(value); return;
      case "w:bottom": this.bottom = Int32Value.parse(value); return;
      case "w:left": this.left = UInt32Value.parse(value); return;
      case "w:header": this.header = UInt32Value.parse(value); return;
      case "w:footer": this.footer = UInt32Value.parse(value); return;
      case "w:gutter": this.gutter = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.top !== undefined) out.push(["w:top", this.top.toString()]);
    if (this.right !== undefined) out.push(["w:right", this.right.toString()]);
    if (this.bottom !== undefined) out.push(["w:bottom", this.bottom.toString()]);
    if (this.left !== undefined) out.push(["w:left", this.left.toString()]);
    if (this.header !== undefined) out.push(["w:header", this.header.toString()]);
    if (this.footer !== undefined) out.push(["w:footer", this.footer.toString()]);
    if (this.gutter !== undefined) out.push(["w:gutter", this.gutter.toString()]);
    return out;
  }
}
