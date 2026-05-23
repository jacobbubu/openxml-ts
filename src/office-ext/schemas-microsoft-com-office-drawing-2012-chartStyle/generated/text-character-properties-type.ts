// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.TextCharacterPropertiesType

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertNumber,
} from "../../../element/index.js";

/** Defines the TextCharacterPropertiesType Class.
 *
 * Element: `cs:defRPr` */
export class TextCharacterPropertiesType extends OpenXmlCompositeElement {
  override readonly localName = "defRPr" as const;
  override readonly prefix = "cs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chartStyle" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** kumimoji (:kumimoji) */
  kumimoji: BooleanValue | undefined;

  /** lang (:lang) */
  language: StringValue | undefined;

  /** altLang (:altLang) */
  alternativeLanguage: StringValue | undefined;

  /** sz (:sz) */
  fontSize: Int32Value | undefined;

  /** b (:b) */
  bold: BooleanValue | undefined;

  /** i (:i) */
  italic: BooleanValue | undefined;

  /** u (:u) */
  underline: StringValue | undefined;

  /** strike (:strike) */
  strike: StringValue | undefined;

  /** kern (:kern) */
  kerning: Int32Value | undefined;

  /** cap (:cap) */
  capital: StringValue | undefined;

  /** spc (:spc) */
  spacing: Int32Value | undefined;

  /** normalizeH (:normalizeH) */
  normalizeHeight: BooleanValue | undefined;

  /** baseline (:baseline) */
  baseline: Int32Value | undefined;

  /** noProof (:noProof) */
  noProof: BooleanValue | undefined;

  /** dirty (:dirty) */
  dirty: BooleanValue | undefined;

  /** err (:err) */
  spellingError: BooleanValue | undefined;

  /** smtClean (:smtClean) */
  smartTagClean: BooleanValue | undefined;

  /** smtId (:smtId) */
  smartTagId: UInt32Value | undefined;

  /** bmk (:bmk) */
  bookmark: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "kumimoji": this.kumimoji = BooleanValue.parse(value); return;
      case "lang": this.language = StringValue.parse(value); return;
      case "altLang": this.alternativeLanguage = StringValue.parse(value); return;
      case "sz": this.fontSize = Int32Value.parse(value); assertNumber(this.fontSize, { min: 100, max: 400000 }, { attribute: ":sz", elementClass: "TextCharacterPropertiesType" }); return;
      case "b": this.bold = BooleanValue.parse(value); return;
      case "i": this.italic = BooleanValue.parse(value); return;
      case "u": this.underline = StringValue.parse(value); return;
      case "strike": this.strike = StringValue.parse(value); return;
      case "kern": this.kerning = Int32Value.parse(value); assertNumber(this.kerning, { min: 0, max: 400000 }, { attribute: ":kern", elementClass: "TextCharacterPropertiesType" }); return;
      case "cap": this.capital = StringValue.parse(value); return;
      case "spc": this.spacing = Int32Value.parse(value); assertNumber(this.spacing, { min: -400000, max: 400000 }, { attribute: ":spc", elementClass: "TextCharacterPropertiesType" }); return;
      case "normalizeH": this.normalizeHeight = BooleanValue.parse(value); return;
      case "baseline": this.baseline = Int32Value.parse(value); return;
      case "noProof": this.noProof = BooleanValue.parse(value); return;
      case "dirty": this.dirty = BooleanValue.parse(value); return;
      case "err": this.spellingError = BooleanValue.parse(value); return;
      case "smtClean": this.smartTagClean = BooleanValue.parse(value); return;
      case "smtId": this.smartTagId = UInt32Value.parse(value); return;
      case "bmk": this.bookmark = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.kumimoji !== undefined) out.push(["kumimoji", this.kumimoji.toString()]);
    if (this.language !== undefined) out.push(["lang", this.language.toString()]);
    if (this.alternativeLanguage !== undefined) out.push(["altLang", this.alternativeLanguage.toString()]);
    if (this.fontSize !== undefined) out.push(["sz", this.fontSize.toString()]);
    if (this.bold !== undefined) out.push(["b", this.bold.toString()]);
    if (this.italic !== undefined) out.push(["i", this.italic.toString()]);
    if (this.underline !== undefined) out.push(["u", this.underline.toString()]);
    if (this.strike !== undefined) out.push(["strike", this.strike.toString()]);
    if (this.kerning !== undefined) out.push(["kern", this.kerning.toString()]);
    if (this.capital !== undefined) out.push(["cap", this.capital.toString()]);
    if (this.spacing !== undefined) out.push(["spc", this.spacing.toString()]);
    if (this.normalizeHeight !== undefined) out.push(["normalizeH", this.normalizeHeight.toString()]);
    if (this.baseline !== undefined) out.push(["baseline", this.baseline.toString()]);
    if (this.noProof !== undefined) out.push(["noProof", this.noProof.toString()]);
    if (this.dirty !== undefined) out.push(["dirty", this.dirty.toString()]);
    if (this.spellingError !== undefined) out.push(["err", this.spellingError.toString()]);
    if (this.smartTagClean !== undefined) out.push(["smtClean", this.smartTagClean.toString()]);
    if (this.smartTagId !== undefined) out.push(["smtId", this.smartTagId.toString()]);
    if (this.bookmark !== undefined) out.push(["bmk", this.bookmark.toString()]);
    return out;
  }

}
