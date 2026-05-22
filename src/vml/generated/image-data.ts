// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_vml.json
// @see DocumentFormat.OpenXml.Vml.ImageData

import {
  OpenXmlLeafElement,
  StringValue,
  TrueFalseValue,
} from "../../element/index.js";

/** Defines the ImageData Class.
 *
 * Element: `v:imagedata` */
export class ImageData extends OpenXmlLeafElement {
  override readonly localName = "imagedata" as const;
  override readonly prefix = "v" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:vml" as const;


  /** Unique Identifier (:id) */
  id: StringValue | undefined;

  /** Image Transparency Color (:chromakey) */
  chromAKey: StringValue | undefined;

  /** Image Left Crop (:cropleft) */
  cropLeft: StringValue | undefined;

  /** Image Top Crop (:croptop) */
  cropTop: StringValue | undefined;

  /** Image Right Crop (:cropright) */
  cropRight: StringValue | undefined;

  /** Image Bottom Crop (:cropbottom) */
  cropBottom: StringValue | undefined;

  /** Image Intensity (:gain) */
  gain: StringValue | undefined;

  /** Image Brightness (:blacklevel) */
  blackLevel: StringValue | undefined;

  /** Image Gamma Correction (:gamma) */
  gamma: StringValue | undefined;

  /** Image Grayscale Toggle (:grayscale) */
  grayscale: TrueFalseValue | undefined;

  /** Image Bilevel Toggle (:bilevel) */
  biLevel: TrueFalseValue | undefined;

  /** Embossed Color (:embosscolor) */
  embossColor: StringValue | undefined;

  /** Black Recoloring Color (:recolortarget) */
  recolorTarget: StringValue | undefined;

  /** Image Data Title (o:title) */
  title: StringValue | undefined;

  /** Detect Mouse Click (o:detectmouseclick) */
  detectMouseClick: TrueFalseValue | undefined;

  /** Relationship to Part (o:relid) */
  relId: StringValue | undefined;

  /** Explicit Relationship to Image Data (r:id) */
  relationshipId: StringValue | undefined;

  /** Explicit Relationship to Alternate Image Data (r:pict) */
  picture: StringValue | undefined;

  /** Explicit Relationship to Hyperlink Target (r:href) */
  relHref: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "chromakey": this.chromAKey = StringValue.parse(value); return;
      case "cropleft": this.cropLeft = StringValue.parse(value); return;
      case "croptop": this.cropTop = StringValue.parse(value); return;
      case "cropright": this.cropRight = StringValue.parse(value); return;
      case "cropbottom": this.cropBottom = StringValue.parse(value); return;
      case "gain": this.gain = StringValue.parse(value); return;
      case "blacklevel": this.blackLevel = StringValue.parse(value); return;
      case "gamma": this.gamma = StringValue.parse(value); return;
      case "grayscale": this.grayscale = TrueFalseValue.parse(value); return;
      case "bilevel": this.biLevel = TrueFalseValue.parse(value); return;
      case "embosscolor": this.embossColor = StringValue.parse(value); return;
      case "recolortarget": this.recolorTarget = StringValue.parse(value); return;
      case "o:title": this.title = StringValue.parse(value); return;
      case "o:detectmouseclick": this.detectMouseClick = TrueFalseValue.parse(value); return;
      case "o:relid": this.relId = StringValue.parse(value); return;
      case "r:id": this.relationshipId = StringValue.parse(value); return;
      case "r:pict": this.picture = StringValue.parse(value); return;
      case "r:href": this.relHref = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.chromAKey !== undefined) out.push(["chromakey", this.chromAKey.toString()]);
    if (this.cropLeft !== undefined) out.push(["cropleft", this.cropLeft.toString()]);
    if (this.cropTop !== undefined) out.push(["croptop", this.cropTop.toString()]);
    if (this.cropRight !== undefined) out.push(["cropright", this.cropRight.toString()]);
    if (this.cropBottom !== undefined) out.push(["cropbottom", this.cropBottom.toString()]);
    if (this.gain !== undefined) out.push(["gain", this.gain.toString()]);
    if (this.blackLevel !== undefined) out.push(["blacklevel", this.blackLevel.toString()]);
    if (this.gamma !== undefined) out.push(["gamma", this.gamma.toString()]);
    if (this.grayscale !== undefined) out.push(["grayscale", this.grayscale.toString()]);
    if (this.biLevel !== undefined) out.push(["bilevel", this.biLevel.toString()]);
    if (this.embossColor !== undefined) out.push(["embosscolor", this.embossColor.toString()]);
    if (this.recolorTarget !== undefined) out.push(["recolortarget", this.recolorTarget.toString()]);
    if (this.title !== undefined) out.push(["o:title", this.title.toString()]);
    if (this.detectMouseClick !== undefined) out.push(["o:detectmouseclick", this.detectMouseClick.toString()]);
    if (this.relId !== undefined) out.push(["o:relid", this.relId.toString()]);
    if (this.relationshipId !== undefined) out.push(["r:id", this.relationshipId.toString()]);
    if (this.picture !== undefined) out.push(["r:pict", this.picture.toString()]);
    if (this.relHref !== undefined) out.push(["r:href", this.relHref.toString()]);
    return out;
  }

}
