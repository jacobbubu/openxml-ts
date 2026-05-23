// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RevExRowColumn

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt64Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RevExRowColumn Class.
 *
 * Element: `xr:xrrrc` */
export class RevExRowColumn extends OpenXmlLeafElement {
  override readonly localName = "xrrrc" as const;
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

  /** eol (:eol) */
  eol: BooleanValue | undefined;

  /** ref (:ref) */
  ref: StringValue | undefined;

  /** action (:action) */
  action: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rev": this.rev = UInt64Value.parse(value); return;
      case "uid": this.uid = StringValue.parse(value); return;
      case "sh": this.sh = StringValue.parse(value); return;
      case "uidp": this.uidp = StringValue.parse(value); return;
      case "ctx": this.ctx = StringValue.parse(value); return;
      case "eol": this.eol = BooleanValue.parse(value); return;
      case "ref": this.ref = StringValue.parse(value); return;
      case "action": this.action = StringValue.parse(value); return;
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
    if (this.eol !== undefined) out.push(["eol", this.eol.toString()]);
    if (this.ref !== undefined) out.push(["ref", this.ref.toString()]);
    if (this.action !== undefined) out.push(["action", this.action.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.rev, { attribute: ":rev", elementClass: "RevExRowColumn" });
    assertRequired(this.uid, { attribute: ":uid", elementClass: "RevExRowColumn" });
    assertRequired(this.sh, { attribute: ":sh", elementClass: "RevExRowColumn" });
    assertRequired(this.ref, { attribute: ":ref", elementClass: "RevExRowColumn" });
    assertRequired(this.action, { attribute: ":action", elementClass: "RevExRowColumn" });
  }
}
