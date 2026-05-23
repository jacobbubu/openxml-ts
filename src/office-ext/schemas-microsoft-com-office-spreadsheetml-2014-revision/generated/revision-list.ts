// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RevisionList

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  UInt64Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RevisionList Class.
 *
 * Element: `xr:xrrList` */
export class RevisionList extends OpenXmlLeafElement {
  override readonly localName = "xrrList" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;


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

  /** Data (:Data) */
  data: BooleanValue | undefined;

  /** Formatting (:Formatting) */
  formatting: BooleanValue | undefined;

  /** RangeBased (:RangeBased) */
  rangeBased: BooleanValue | undefined;

  /** Fake (:Fake) */
  fake: BooleanValue | undefined;

  /** ref (:ref) */
  ref: StringValue | undefined;

  /** Headers (:Headers) */
  headers: BooleanValue | undefined;

  /** InsDelHeaders (:InsDelHeaders) */
  insDelHeaders: BooleanValue | undefined;

  /** rId (:rId) */
  rId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rev": this.rev = UInt64Value.parse(value); return;
      case "uid": this.uid = StringValue.parse(value); return;
      case "sh": this.sh = StringValue.parse(value); return;
      case "uidp": this.uidp = StringValue.parse(value); return;
      case "ctx": this.ctx = StringValue.parse(value); return;
      case "Data": this.data = BooleanValue.parse(value); return;
      case "Formatting": this.formatting = BooleanValue.parse(value); return;
      case "RangeBased": this.rangeBased = BooleanValue.parse(value); return;
      case "Fake": this.fake = BooleanValue.parse(value); return;
      case "ref": this.ref = StringValue.parse(value); return;
      case "Headers": this.headers = BooleanValue.parse(value); return;
      case "InsDelHeaders": this.insDelHeaders = BooleanValue.parse(value); return;
      case "rId": this.rId = UInt32Value.parse(value); return;
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
    if (this.data !== undefined) out.push(["Data", this.data.toString()]);
    if (this.formatting !== undefined) out.push(["Formatting", this.formatting.toString()]);
    if (this.rangeBased !== undefined) out.push(["RangeBased", this.rangeBased.toString()]);
    if (this.fake !== undefined) out.push(["Fake", this.fake.toString()]);
    if (this.ref !== undefined) out.push(["ref", this.ref.toString()]);
    if (this.headers !== undefined) out.push(["Headers", this.headers.toString()]);
    if (this.insDelHeaders !== undefined) out.push(["InsDelHeaders", this.insDelHeaders.toString()]);
    if (this.rId !== undefined) out.push(["rId", this.rId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.rev, { attribute: ":rev", elementClass: "RevisionList" });
    assertRequired(this.uid, { attribute: ":uid", elementClass: "RevisionList" });
    assertRequired(this.sh, { attribute: ":sh", elementClass: "RevisionList" });
    assertRequired(this.ref, { attribute: ":ref", elementClass: "RevisionList" });
    assertRequired(this.rId, { attribute: ":rId", elementClass: "RevisionList" });
  }
}
