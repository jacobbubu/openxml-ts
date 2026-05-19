// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RevisionDefinedName

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Revision Defined Name.
 *
 * Element: `x:rdn` */
export class RevisionDefinedName extends OpenXmlCompositeElement {
  override readonly localName = "rdn" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Revision Id (:rId) */
  revisionId: UInt32Value | undefined;

  /** Revision From Rejection (:ua) */
  ua: BooleanValue | undefined;

  /** Revision Undo Rejected (:ra) */
  ra: BooleanValue | undefined;

  /** Local Name Sheet Id (:localSheetId) */
  localSheetId: UInt32Value | undefined;

  /** Custom View (:customView) */
  customView: BooleanValue | undefined;

  /** Name (:name) */
  name: StringValue | undefined;

  /** Function (:function) */
  function: BooleanValue | undefined;

  /** Old Function (:oldFunction) */
  oldFunction: BooleanValue | undefined;

  /** Function Group Id (:functionGroupId) */
  functionGroupId: StringValue | undefined;

  /** Old Function Group Id (:oldFunctionGroupId) */
  oldFunctionGroupId: StringValue | undefined;

  /** Shortcut Key (:shortcutKey) */
  shortcutKey: StringValue | undefined;

  /** Old Short Cut Key (:oldShortcutKey) */
  oldShortcutKey: StringValue | undefined;

  /** Named Range Hidden (:hidden) */
  hidden: BooleanValue | undefined;

  /** Old Hidden (:oldHidden) */
  oldHidden: BooleanValue | undefined;

  /** New Custom Menu (:customMenu) */
  customMenu: StringValue | undefined;

  /** Old Custom Menu Text (:oldCustomMenu) */
  oldCustomMenu: StringValue | undefined;

  /** Description (:description) */
  description: StringValue | undefined;

  /** Old Description (:oldDescription) */
  oldDescription: StringValue | undefined;

  /** New Help Topic (:help) */
  help: StringValue | undefined;

  /** Old Help Topic (:oldHelp) */
  oldHelp: StringValue | undefined;

  /** Status Bar (:statusBar) */
  statusBar: StringValue | undefined;

  /** Old Status Bar (:oldStatusBar) */
  oldStatusBar: StringValue | undefined;

  /** Name Comment (:comment) */
  comment: StringValue | undefined;

  /** Old Name Comment (:oldComment) */
  oldComment: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rId": this.revisionId = UInt32Value.parse(value); return;
      case "ua": this.ua = BooleanValue.parse(value); return;
      case "ra": this.ra = BooleanValue.parse(value); return;
      case "localSheetId": this.localSheetId = UInt32Value.parse(value); return;
      case "customView": this.customView = BooleanValue.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "function": this.function = BooleanValue.parse(value); return;
      case "oldFunction": this.oldFunction = BooleanValue.parse(value); return;
      case "functionGroupId": this.functionGroupId = StringValue.parse(value); return;
      case "oldFunctionGroupId": this.oldFunctionGroupId = StringValue.parse(value); return;
      case "shortcutKey": this.shortcutKey = StringValue.parse(value); return;
      case "oldShortcutKey": this.oldShortcutKey = StringValue.parse(value); return;
      case "hidden": this.hidden = BooleanValue.parse(value); return;
      case "oldHidden": this.oldHidden = BooleanValue.parse(value); return;
      case "customMenu": this.customMenu = StringValue.parse(value); return;
      case "oldCustomMenu": this.oldCustomMenu = StringValue.parse(value); return;
      case "description": this.description = StringValue.parse(value); return;
      case "oldDescription": this.oldDescription = StringValue.parse(value); return;
      case "help": this.help = StringValue.parse(value); return;
      case "oldHelp": this.oldHelp = StringValue.parse(value); return;
      case "statusBar": this.statusBar = StringValue.parse(value); return;
      case "oldStatusBar": this.oldStatusBar = StringValue.parse(value); return;
      case "comment": this.comment = StringValue.parse(value); return;
      case "oldComment": this.oldComment = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.revisionId !== undefined) out.push(["rId", this.revisionId.toString()]);
    if (this.ua !== undefined) out.push(["ua", this.ua.toString()]);
    if (this.ra !== undefined) out.push(["ra", this.ra.toString()]);
    if (this.localSheetId !== undefined) out.push(["localSheetId", this.localSheetId.toString()]);
    if (this.customView !== undefined) out.push(["customView", this.customView.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.function !== undefined) out.push(["function", this.function.toString()]);
    if (this.oldFunction !== undefined) out.push(["oldFunction", this.oldFunction.toString()]);
    if (this.functionGroupId !== undefined) out.push(["functionGroupId", this.functionGroupId.toString()]);
    if (this.oldFunctionGroupId !== undefined) out.push(["oldFunctionGroupId", this.oldFunctionGroupId.toString()]);
    if (this.shortcutKey !== undefined) out.push(["shortcutKey", this.shortcutKey.toString()]);
    if (this.oldShortcutKey !== undefined) out.push(["oldShortcutKey", this.oldShortcutKey.toString()]);
    if (this.hidden !== undefined) out.push(["hidden", this.hidden.toString()]);
    if (this.oldHidden !== undefined) out.push(["oldHidden", this.oldHidden.toString()]);
    if (this.customMenu !== undefined) out.push(["customMenu", this.customMenu.toString()]);
    if (this.oldCustomMenu !== undefined) out.push(["oldCustomMenu", this.oldCustomMenu.toString()]);
    if (this.description !== undefined) out.push(["description", this.description.toString()]);
    if (this.oldDescription !== undefined) out.push(["oldDescription", this.oldDescription.toString()]);
    if (this.help !== undefined) out.push(["help", this.help.toString()]);
    if (this.oldHelp !== undefined) out.push(["oldHelp", this.oldHelp.toString()]);
    if (this.statusBar !== undefined) out.push(["statusBar", this.statusBar.toString()]);
    if (this.oldStatusBar !== undefined) out.push(["oldStatusBar", this.oldStatusBar.toString()]);
    if (this.comment !== undefined) out.push(["comment", this.comment.toString()]);
    if (this.oldComment !== undefined) out.push(["oldComment", this.oldComment.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.revisionId, { attribute: ":rId", elementClass: "RevisionDefinedName" });
    assertRequired(this.name, { attribute: ":name", elementClass: "RevisionDefinedName" });
  }
}
