// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordprocessingShape.json
// @see DocumentFormat.OpenXml.Word2010WordprocessingShape.TextBodyProperties

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
} from "../../../element/index.js";

/** Defines the TextBodyProperties Class.
 *
 * Element: `wps:bodyPr` */
export class TextBodyProperties extends OpenXmlCompositeElement {
  override readonly localName = "bodyPr" as const;
  override readonly prefix = "wps" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Rotation (:rot) */
  rotation: Int32Value | undefined;

  /** Paragraph Spacing (:spcFirstLastPara) */
  useParagraphSpacing: BooleanValue | undefined;

  /** Text Vertical Overflow (:vertOverflow) */
  verticalOverflow: StringValue | undefined;

  /** Text Horizontal Overflow (:horzOverflow) */
  horizontalOverflow: StringValue | undefined;

  /** Vertical Text (:vert) */
  vertical: StringValue | undefined;

  /** Text Wrapping Type (:wrap) */
  wrap: StringValue | undefined;

  /** Left Inset (:lIns) */
  leftInset: Int32Value | undefined;

  /** Top Inset (:tIns) */
  topInset: Int32Value | undefined;

  /** Right Inset (:rIns) */
  rightInset: Int32Value | undefined;

  /** Bottom Inset (:bIns) */
  bottomInset: Int32Value | undefined;

  /** Number of Columns (:numCol) */
  columnCount: Int32Value | undefined;

  /** Space Between Columns (:spcCol) */
  columnSpacing: Int32Value | undefined;

  /** Columns Right-To-Left (:rtlCol) */
  rightToLeftColumns: BooleanValue | undefined;

  /** From WordArt (:fromWordArt) */
  fromWordArt: BooleanValue | undefined;

  /** Anchor (:anchor) */
  anchor: StringValue | undefined;

  /** Anchor Center (:anchorCtr) */
  anchorCenter: BooleanValue | undefined;

  /** Force Anti-Alias (:forceAA) */
  forceAntiAlias: BooleanValue | undefined;

  /** Text Upright (:upright) */
  upRight: BooleanValue | undefined;

  /** Compatible Line Spacing (:compatLnSpc) */
  compatibleLineSpacing: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rot": this.rotation = Int32Value.parse(value); return;
      case "spcFirstLastPara": this.useParagraphSpacing = BooleanValue.parse(value); return;
      case "vertOverflow": this.verticalOverflow = StringValue.parse(value); return;
      case "horzOverflow": this.horizontalOverflow = StringValue.parse(value); return;
      case "vert": this.vertical = StringValue.parse(value); return;
      case "wrap": this.wrap = StringValue.parse(value); return;
      case "lIns": this.leftInset = Int32Value.parse(value); return;
      case "tIns": this.topInset = Int32Value.parse(value); return;
      case "rIns": this.rightInset = Int32Value.parse(value); return;
      case "bIns": this.bottomInset = Int32Value.parse(value); return;
      case "numCol": this.columnCount = Int32Value.parse(value); assertNumber(this.columnCount, { min: 1, max: 16 }, { attribute: ":numCol", elementClass: "TextBodyProperties" }); return;
      case "spcCol": this.columnSpacing = Int32Value.parse(value); assertNumber(this.columnSpacing, { min: 0 }, { attribute: ":spcCol", elementClass: "TextBodyProperties" }); return;
      case "rtlCol": this.rightToLeftColumns = BooleanValue.parse(value); return;
      case "fromWordArt": this.fromWordArt = BooleanValue.parse(value); return;
      case "anchor": this.anchor = StringValue.parse(value); return;
      case "anchorCtr": this.anchorCenter = BooleanValue.parse(value); return;
      case "forceAA": this.forceAntiAlias = BooleanValue.parse(value); return;
      case "upright": this.upRight = BooleanValue.parse(value); return;
      case "compatLnSpc": this.compatibleLineSpacing = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rotation !== undefined) out.push(["rot", this.rotation.toString()]);
    if (this.useParagraphSpacing !== undefined) out.push(["spcFirstLastPara", this.useParagraphSpacing.toString()]);
    if (this.verticalOverflow !== undefined) out.push(["vertOverflow", this.verticalOverflow.toString()]);
    if (this.horizontalOverflow !== undefined) out.push(["horzOverflow", this.horizontalOverflow.toString()]);
    if (this.vertical !== undefined) out.push(["vert", this.vertical.toString()]);
    if (this.wrap !== undefined) out.push(["wrap", this.wrap.toString()]);
    if (this.leftInset !== undefined) out.push(["lIns", this.leftInset.toString()]);
    if (this.topInset !== undefined) out.push(["tIns", this.topInset.toString()]);
    if (this.rightInset !== undefined) out.push(["rIns", this.rightInset.toString()]);
    if (this.bottomInset !== undefined) out.push(["bIns", this.bottomInset.toString()]);
    if (this.columnCount !== undefined) out.push(["numCol", this.columnCount.toString()]);
    if (this.columnSpacing !== undefined) out.push(["spcCol", this.columnSpacing.toString()]);
    if (this.rightToLeftColumns !== undefined) out.push(["rtlCol", this.rightToLeftColumns.toString()]);
    if (this.fromWordArt !== undefined) out.push(["fromWordArt", this.fromWordArt.toString()]);
    if (this.anchor !== undefined) out.push(["anchor", this.anchor.toString()]);
    if (this.anchorCenter !== undefined) out.push(["anchorCtr", this.anchorCenter.toString()]);
    if (this.forceAntiAlias !== undefined) out.push(["forceAA", this.forceAntiAlias.toString()]);
    if (this.upRight !== undefined) out.push(["upright", this.upRight.toString()]);
    if (this.compatibleLineSpacing !== undefined) out.push(["compatLnSpc", this.compatibleLineSpacing.toString()]);
    return out;
  }

}
