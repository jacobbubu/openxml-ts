// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RevExChangeCell

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  UInt64Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RevExChangeCell Class.
 *
 * Element: `xr:xrrc` */
export class RevExChangeCell extends OpenXmlCompositeElement {
  override readonly localName = "xrrc" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** listUid (:listUid) */
  listUid: StringValue | undefined;

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

  /** r (:r) */
  r: StringValue | undefined;

  /** t (:t) */
  t: StringValue | undefined;

  /** x (:x) */
  x: StringValue | undefined;

  /** w (:w) */
  w: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "listUid": this.listUid = StringValue.parse(value); return;
      case "rev": this.rev = UInt64Value.parse(value); return;
      case "uid": this.uid = StringValue.parse(value); return;
      case "sh": this.sh = StringValue.parse(value); return;
      case "uidp": this.uidp = StringValue.parse(value); return;
      case "ctx": this.ctx = StringValue.parse(value); return;
      case "r": this.r = StringValue.parse(value); return;
      case "t": this.t = StringValue.parse(value); return;
      case "x": this.x = StringValue.parse(value); return;
      case "w": this.w = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.listUid !== undefined) out.push(["listUid", this.listUid.toString()]);
    if (this.rev !== undefined) out.push(["rev", this.rev.toString()]);
    if (this.uid !== undefined) out.push(["uid", this.uid.toString()]);
    if (this.sh !== undefined) out.push(["sh", this.sh.toString()]);
    if (this.uidp !== undefined) out.push(["uidp", this.uidp.toString()]);
    if (this.ctx !== undefined) out.push(["ctx", this.ctx.toString()]);
    if (this.r !== undefined) out.push(["r", this.r.toString()]);
    if (this.t !== undefined) out.push(["t", this.t.toString()]);
    if (this.x !== undefined) out.push(["x", this.x.toString()]);
    if (this.w !== undefined) out.push(["w", this.w.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.rev, { attribute: ":rev", elementClass: "RevExChangeCell" });
    assertRequired(this.uid, { attribute: ":uid", elementClass: "RevExChangeCell" });
    assertRequired(this.sh, { attribute: ":sh", elementClass: "RevExChangeCell" });
    assertRequired(this.r, { attribute: ":r", elementClass: "RevExChangeCell" });
  }
}
