// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.PhotoAlbum

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the PhotoAlbum Class.
 *
 * Element: `p:photoAlbum` */
export class PhotoAlbum extends OpenXmlCompositeElement {
  override readonly localName = "photoAlbum" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Black and White (:bw) */
  blackWhite: BooleanValue | undefined;

  /** Show/Hide Captions (:showCaptions) */
  showCaptions: BooleanValue | undefined;

  /** Photo Album Layout (:layout) */
  layout: StringValue | undefined;

  /** Frame Type (:frame) */
  frame: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "bw": this.blackWhite = BooleanValue.parse(value); return;
      case "showCaptions": this.showCaptions = BooleanValue.parse(value); return;
      case "layout": this.layout = StringValue.parse(value); return;
      case "frame": this.frame = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.blackWhite !== undefined) out.push(["bw", this.blackWhite.toString()]);
    if (this.showCaptions !== undefined) out.push(["showCaptions", this.showCaptions.toString()]);
    if (this.layout !== undefined) out.push(["layout", this.layout.toString()]);
    if (this.frame !== undefined) out.push(["frame", this.frame.toString()]);
    return out;
  }

}
