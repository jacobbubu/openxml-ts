// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.Presentation

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertNumber,
} from "../../element/index.js";

/** Presentation.
 *
 * Element: `p:presentation` */
export class Presentation extends OpenXmlCompositeElement {
  override readonly localName = "presentation" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** serverZoom (:serverZoom) */
  serverZoom: Int32Value | undefined;

  /** firstSlideNum (:firstSlideNum) */
  firstSlideNum: Int32Value | undefined;

  /** showSpecialPlsOnTitleSld (:showSpecialPlsOnTitleSld) */
  showSpecialPlaceholderOnTitleSlide: BooleanValue | undefined;

  /** rtl (:rtl) */
  rightToLeft: BooleanValue | undefined;

  /** removePersonalInfoOnSave (:removePersonalInfoOnSave) */
  removePersonalInfoOnSave: BooleanValue | undefined;

  /** compatMode (:compatMode) */
  compatibilityMode: BooleanValue | undefined;

  /** strictFirstAndLastChars (:strictFirstAndLastChars) */
  strictFirstAndLastChars: BooleanValue | undefined;

  /** embedTrueTypeFonts (:embedTrueTypeFonts) */
  embedTrueTypeFonts: BooleanValue | undefined;

  /** saveSubsetFonts (:saveSubsetFonts) */
  saveSubsetFonts: BooleanValue | undefined;

  /** autoCompressPictures (:autoCompressPictures) */
  autoCompressPictures: BooleanValue | undefined;

  /** bookmarkIdSeed (:bookmarkIdSeed) */
  bookmarkIdSeed: UInt32Value | undefined;

  /** conformance (:conformance) */
  conformance: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":serverZoom": this.serverZoom = Int32Value.parse(value); return;
      case ":firstSlideNum": this.firstSlideNum = Int32Value.parse(value); return;
      case ":showSpecialPlsOnTitleSld": this.showSpecialPlaceholderOnTitleSlide = BooleanValue.parse(value); return;
      case ":rtl": this.rightToLeft = BooleanValue.parse(value); return;
      case ":removePersonalInfoOnSave": this.removePersonalInfoOnSave = BooleanValue.parse(value); return;
      case ":compatMode": this.compatibilityMode = BooleanValue.parse(value); return;
      case ":strictFirstAndLastChars": this.strictFirstAndLastChars = BooleanValue.parse(value); return;
      case ":embedTrueTypeFonts": this.embedTrueTypeFonts = BooleanValue.parse(value); return;
      case ":saveSubsetFonts": this.saveSubsetFonts = BooleanValue.parse(value); return;
      case ":autoCompressPictures": this.autoCompressPictures = BooleanValue.parse(value); return;
      case ":bookmarkIdSeed": this.bookmarkIdSeed = UInt32Value.parse(value); assertNumber(this.bookmarkIdSeed, { min: 1 }, { attribute: ":bookmarkIdSeed", elementClass: "Presentation" }); return;
      case ":conformance": this.conformance = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.serverZoom !== undefined) out.push([":serverZoom", this.serverZoom.toString()]);
    if (this.firstSlideNum !== undefined) out.push([":firstSlideNum", this.firstSlideNum.toString()]);
    if (this.showSpecialPlaceholderOnTitleSlide !== undefined) out.push([":showSpecialPlsOnTitleSld", this.showSpecialPlaceholderOnTitleSlide.toString()]);
    if (this.rightToLeft !== undefined) out.push([":rtl", this.rightToLeft.toString()]);
    if (this.removePersonalInfoOnSave !== undefined) out.push([":removePersonalInfoOnSave", this.removePersonalInfoOnSave.toString()]);
    if (this.compatibilityMode !== undefined) out.push([":compatMode", this.compatibilityMode.toString()]);
    if (this.strictFirstAndLastChars !== undefined) out.push([":strictFirstAndLastChars", this.strictFirstAndLastChars.toString()]);
    if (this.embedTrueTypeFonts !== undefined) out.push([":embedTrueTypeFonts", this.embedTrueTypeFonts.toString()]);
    if (this.saveSubsetFonts !== undefined) out.push([":saveSubsetFonts", this.saveSubsetFonts.toString()]);
    if (this.autoCompressPictures !== undefined) out.push([":autoCompressPictures", this.autoCompressPictures.toString()]);
    if (this.bookmarkIdSeed !== undefined) out.push([":bookmarkIdSeed", this.bookmarkIdSeed.toString()]);
    if (this.conformance !== undefined) out.push([":conformance", this.conformance.toString()]);
    return out;
  }

}
