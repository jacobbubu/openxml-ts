// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RevExFormatting

import {
  BooleanValue,
  ListValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  UInt64Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RevExFormatting Class.
 *
 * Element: `xr:xrrf` */
export class RevExFormatting extends OpenXmlCompositeElement {
  override readonly localName = "xrrf" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** rev (:rev) */
  rev: UInt64Value | undefined;

  /** uid (:uid) */
  uid: StringValue | undefined;

  /** sh (:sh) */
  sh: StringValue | undefined;

  /** uidp (:uidp) */
  uidp: StringValue | undefined;

  /** ctx (:ctx) */
  ctx: StringValue | undefined;

  /** numFmtId (:numFmtId) */
  numFmtId: UInt32Value | undefined;

  /** xfDxf (:xfDxf) */
  xfDxf: BooleanValue | undefined;

  /** style (:style) */
  style: BooleanValue | undefined;

  /** sqref (:sqref) */
  sqref: ListValue<StringValue> | undefined;

  /** start (:start) */
  start: UInt32Value | undefined;

  /** length (:length) */
  length: UInt32Value | undefined;

  /** styleUid (:styleUid) */
  styleUid: StringValue | undefined;

  /** fBlankCell (:fBlankCell) */
  fBlankCell: BooleanValue | undefined;

  /** applyNumberFormat (:applyNumberFormat) */
  applyNumberFormat: BooleanValue | undefined;

  /** applyFont (:applyFont) */
  applyFont: BooleanValue | undefined;

  /** applyFill (:applyFill) */
  applyFill: BooleanValue | undefined;

  /** applyBorder (:applyBorder) */
  applyBorder: BooleanValue | undefined;

  /** applyAlignment (:applyAlignment) */
  applyAlignment: BooleanValue | undefined;

  /** applyProtection (:applyProtection) */
  applyProtection: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rev": this.rev = UInt64Value.parse(value); return;
      case "uid": this.uid = StringValue.parse(value); return;
      case "sh": this.sh = StringValue.parse(value); return;
      case "uidp": this.uidp = StringValue.parse(value); return;
      case "ctx": this.ctx = StringValue.parse(value); return;
      case "numFmtId": this.numFmtId = UInt32Value.parse(value); return;
      case "xfDxf": this.xfDxf = BooleanValue.parse(value); return;
      case "style": this.style = BooleanValue.parse(value); return;
      case "sqref": this.sqref = ListValue.parse(value, StringValue.parse); return;
      case "start": this.start = UInt32Value.parse(value); return;
      case "length": this.length = UInt32Value.parse(value); return;
      case "styleUid": this.styleUid = StringValue.parse(value); return;
      case "fBlankCell": this.fBlankCell = BooleanValue.parse(value); return;
      case "applyNumberFormat": this.applyNumberFormat = BooleanValue.parse(value); return;
      case "applyFont": this.applyFont = BooleanValue.parse(value); return;
      case "applyFill": this.applyFill = BooleanValue.parse(value); return;
      case "applyBorder": this.applyBorder = BooleanValue.parse(value); return;
      case "applyAlignment": this.applyAlignment = BooleanValue.parse(value); return;
      case "applyProtection": this.applyProtection = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rev !== undefined) out.push(["rev", this.rev.toString()]);
    if (this.uid !== undefined) out.push(["uid", this.uid.toString()]);
    if (this.sh !== undefined) out.push(["sh", this.sh.toString()]);
    if (this.uidp !== undefined) out.push(["uidp", this.uidp.toString()]);
    if (this.ctx !== undefined) out.push(["ctx", this.ctx.toString()]);
    if (this.numFmtId !== undefined) out.push(["numFmtId", this.numFmtId.toString()]);
    if (this.xfDxf !== undefined) out.push(["xfDxf", this.xfDxf.toString()]);
    if (this.style !== undefined) out.push(["style", this.style.toString()]);
    if (this.sqref !== undefined) out.push(["sqref", this.sqref.toString()]);
    if (this.start !== undefined) out.push(["start", this.start.toString()]);
    if (this.length !== undefined) out.push(["length", this.length.toString()]);
    if (this.styleUid !== undefined) out.push(["styleUid", this.styleUid.toString()]);
    if (this.fBlankCell !== undefined) out.push(["fBlankCell", this.fBlankCell.toString()]);
    if (this.applyNumberFormat !== undefined) out.push(["applyNumberFormat", this.applyNumberFormat.toString()]);
    if (this.applyFont !== undefined) out.push(["applyFont", this.applyFont.toString()]);
    if (this.applyFill !== undefined) out.push(["applyFill", this.applyFill.toString()]);
    if (this.applyBorder !== undefined) out.push(["applyBorder", this.applyBorder.toString()]);
    if (this.applyAlignment !== undefined) out.push(["applyAlignment", this.applyAlignment.toString()]);
    if (this.applyProtection !== undefined) out.push(["applyProtection", this.applyProtection.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.rev, { attribute: ":rev", elementClass: "RevExFormatting" });
    assertRequired(this.uid, { attribute: ":uid", elementClass: "RevExFormatting" });
    assertRequired(this.sh, { attribute: ":sh", elementClass: "RevExFormatting" });
    assertRequired(this.sqref, { attribute: ":sqref", elementClass: "RevExFormatting" });
  }
}
