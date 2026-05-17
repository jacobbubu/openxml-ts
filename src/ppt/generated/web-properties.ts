// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.WebProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Web Properties.
 *
 * Element: `p:webPr` */
export class WebProperties extends OpenXmlCompositeElement {
  override readonly localName = "webPr" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Show animation in HTML output (:showAnimation) */
  showAnimation: BooleanValue | undefined;

  /** Resize graphics in HTML output (:resizeGraphics) */
  resizeGraphics: BooleanValue | undefined;

  /** Allow PNG in HTML output (:allowPng) */
  allowPng: BooleanValue | undefined;

  /** Rely on VML for HTML output (:relyOnVml) */
  relyOnVml: BooleanValue | undefined;

  /** Organize HTML output in folders (:organizeInFolders) */
  organizeInFolders: BooleanValue | undefined;

  /** Use long file names in HTML output (:useLongFilenames) */
  useLongFilenames: BooleanValue | undefined;

  /** Image size for HTML output (:imgSz) */
  imageSize: StringValue | undefined;

  /** Encoding for HTML output (:encoding) */
  encoding: StringValue | undefined;

  /** Slide Navigation Colors for HTML output (:clr) */
  color: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":showAnimation": this.showAnimation = BooleanValue.parse(value); return;
      case ":resizeGraphics": this.resizeGraphics = BooleanValue.parse(value); return;
      case ":allowPng": this.allowPng = BooleanValue.parse(value); return;
      case ":relyOnVml": this.relyOnVml = BooleanValue.parse(value); return;
      case ":organizeInFolders": this.organizeInFolders = BooleanValue.parse(value); return;
      case ":useLongFilenames": this.useLongFilenames = BooleanValue.parse(value); return;
      case ":imgSz": this.imageSize = StringValue.parse(value); return;
      case ":encoding": this.encoding = StringValue.parse(value); return;
      case ":clr": this.color = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.showAnimation !== undefined) out.push([":showAnimation", this.showAnimation.toString()]);
    if (this.resizeGraphics !== undefined) out.push([":resizeGraphics", this.resizeGraphics.toString()]);
    if (this.allowPng !== undefined) out.push([":allowPng", this.allowPng.toString()]);
    if (this.relyOnVml !== undefined) out.push([":relyOnVml", this.relyOnVml.toString()]);
    if (this.organizeInFolders !== undefined) out.push([":organizeInFolders", this.organizeInFolders.toString()]);
    if (this.useLongFilenames !== undefined) out.push([":useLongFilenames", this.useLongFilenames.toString()]);
    if (this.imageSize !== undefined) out.push([":imgSz", this.imageSize.toString()]);
    if (this.encoding !== undefined) out.push([":encoding", this.encoding.toString()]);
    if (this.color !== undefined) out.push([":clr", this.color.toString()]);
    return out;
  }

}
