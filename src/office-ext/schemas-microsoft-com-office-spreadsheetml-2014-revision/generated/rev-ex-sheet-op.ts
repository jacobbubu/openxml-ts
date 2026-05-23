// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RevExSheetOp

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  UInt64Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RevExSheetOp Class.
 *
 * Element: `xr:xrrSheet` */
export class RevExSheetOp extends OpenXmlLeafElement {
  override readonly localName = "xrrSheet" as const;
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

  /** op (:op) */
  op: StringValue | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** idOrig (:idOrig) */
  idOrig: UInt32Value | undefined;

  /** idNew (:idNew) */
  idNew: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rev": this.rev = UInt64Value.parse(value); return;
      case "uid": this.uid = StringValue.parse(value); return;
      case "sh": this.sh = StringValue.parse(value); return;
      case "uidp": this.uidp = StringValue.parse(value); return;
      case "ctx": this.ctx = StringValue.parse(value); return;
      case "op": this.op = StringValue.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "idOrig": this.idOrig = UInt32Value.parse(value); return;
      case "idNew": this.idNew = UInt32Value.parse(value); return;
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
    if (this.op !== undefined) out.push(["op", this.op.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.idOrig !== undefined) out.push(["idOrig", this.idOrig.toString()]);
    if (this.idNew !== undefined) out.push(["idNew", this.idNew.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.rev, { attribute: ":rev", elementClass: "RevExSheetOp" });
    assertRequired(this.uid, { attribute: ":uid", elementClass: "RevExSheetOp" });
    assertRequired(this.sh, { attribute: ":sh", elementClass: "RevExSheetOp" });
    assertRequired(this.op, { attribute: ":op", elementClass: "RevExSheetOp" });
  }
}
