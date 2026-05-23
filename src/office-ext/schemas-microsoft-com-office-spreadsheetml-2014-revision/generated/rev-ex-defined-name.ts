// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RevExDefinedName

import {
  BooleanValue,
  ByteValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt64Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RevExDefinedName Class.
 *
 * Element: `xr:xrrDefName` */
export class RevExDefinedName extends OpenXmlCompositeElement {
  override readonly localName = "xrrDefName" as const;
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

  /** customView (:customView) */
  customView: BooleanValue | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** function (:function) */
  function: BooleanValue | undefined;

  /** functionGroupId (:functionGroupId) */
  functionGroupId: ByteValue | undefined;

  /** shortcutKey (:shortcutKey) */
  shortcutKey: ByteValue | undefined;

  /** hidden (:hidden) */
  hidden: BooleanValue | undefined;

  /** customMenu (:customMenu) */
  customMenu: StringValue | undefined;

  /** description (:description) */
  description: StringValue | undefined;

  /** help (:help) */
  help: StringValue | undefined;

  /** statusBar (:statusBar) */
  statusBar: StringValue | undefined;

  /** comment (:comment) */
  comment: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rev": this.rev = UInt64Value.parse(value); return;
      case "uid": this.uid = StringValue.parse(value); return;
      case "sh": this.sh = StringValue.parse(value); return;
      case "uidp": this.uidp = StringValue.parse(value); return;
      case "ctx": this.ctx = StringValue.parse(value); return;
      case "customView": this.customView = BooleanValue.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "function": this.function = BooleanValue.parse(value); return;
      case "functionGroupId": this.functionGroupId = ByteValue.parse(value); return;
      case "shortcutKey": this.shortcutKey = ByteValue.parse(value); return;
      case "hidden": this.hidden = BooleanValue.parse(value); return;
      case "customMenu": this.customMenu = StringValue.parse(value); return;
      case "description": this.description = StringValue.parse(value); return;
      case "help": this.help = StringValue.parse(value); return;
      case "statusBar": this.statusBar = StringValue.parse(value); return;
      case "comment": this.comment = StringValue.parse(value); return;
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
    if (this.customView !== undefined) out.push(["customView", this.customView.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.function !== undefined) out.push(["function", this.function.toString()]);
    if (this.functionGroupId !== undefined) out.push(["functionGroupId", this.functionGroupId.toString()]);
    if (this.shortcutKey !== undefined) out.push(["shortcutKey", this.shortcutKey.toString()]);
    if (this.hidden !== undefined) out.push(["hidden", this.hidden.toString()]);
    if (this.customMenu !== undefined) out.push(["customMenu", this.customMenu.toString()]);
    if (this.description !== undefined) out.push(["description", this.description.toString()]);
    if (this.help !== undefined) out.push(["help", this.help.toString()]);
    if (this.statusBar !== undefined) out.push(["statusBar", this.statusBar.toString()]);
    if (this.comment !== undefined) out.push(["comment", this.comment.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.rev, { attribute: ":rev", elementClass: "RevExDefinedName" });
    assertRequired(this.uid, { attribute: ":uid", elementClass: "RevExDefinedName" });
    assertRequired(this.sh, { attribute: ":sh", elementClass: "RevExDefinedName" });
    assertRequired(this.name, { attribute: ":name", elementClass: "RevExDefinedName" });
  }
}
