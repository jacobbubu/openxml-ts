// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.DefinedName

import {
  BooleanValue,
  OpenXmlElementList,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defined Name.
 *
 * Element: `x:definedName` */
export class DefinedName extends OpenXmlLeafElement {
  override readonly localName = "definedName" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Defined Name (:name) */
  name: StringValue | undefined;

  /** Comment (:comment) */
  comment: StringValue | undefined;

  /** Custom Menu Text (:customMenu) */
  customMenu: StringValue | undefined;

  /** Description (:description) */
  description: StringValue | undefined;

  /** Help (:help) */
  help: StringValue | undefined;

  /** Status Bar (:statusBar) */
  statusBar: StringValue | undefined;

  /** Local Name Sheet Id (:localSheetId) */
  localSheetId: UInt32Value | undefined;

  /** Hidden Name (:hidden) */
  hidden: BooleanValue | undefined;

  /** Function (:function) */
  function: BooleanValue | undefined;

  /** Procedure (:vbProcedure) */
  vbProcedure: BooleanValue | undefined;

  /** External Function (:xlm) */
  xlm: BooleanValue | undefined;

  /** Function Group Id (:functionGroupId) */
  functionGroupId: UInt32Value | undefined;

  /** Shortcut Key (:shortcutKey) */
  shortcutKey: StringValue | undefined;

  /** Publish To Server (:publishToServer) */
  publishToServer: BooleanValue | undefined;

  /** Workbook Parameter (Server) (:workbookParameter) */
  workbookParameter: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "comment": this.comment = StringValue.parse(value); return;
      case "customMenu": this.customMenu = StringValue.parse(value); return;
      case "description": this.description = StringValue.parse(value); return;
      case "help": this.help = StringValue.parse(value); return;
      case "statusBar": this.statusBar = StringValue.parse(value); return;
      case "localSheetId": this.localSheetId = UInt32Value.parse(value); return;
      case "hidden": this.hidden = BooleanValue.parse(value); return;
      case "function": this.function = BooleanValue.parse(value); return;
      case "vbProcedure": this.vbProcedure = BooleanValue.parse(value); return;
      case "xlm": this.xlm = BooleanValue.parse(value); return;
      case "functionGroupId": this.functionGroupId = UInt32Value.parse(value); return;
      case "shortcutKey": this.shortcutKey = StringValue.parse(value); return;
      case "publishToServer": this.publishToServer = BooleanValue.parse(value); return;
      case "workbookParameter": this.workbookParameter = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.comment !== undefined) out.push(["comment", this.comment.toString()]);
    if (this.customMenu !== undefined) out.push(["customMenu", this.customMenu.toString()]);
    if (this.description !== undefined) out.push(["description", this.description.toString()]);
    if (this.help !== undefined) out.push(["help", this.help.toString()]);
    if (this.statusBar !== undefined) out.push(["statusBar", this.statusBar.toString()]);
    if (this.localSheetId !== undefined) out.push(["localSheetId", this.localSheetId.toString()]);
    if (this.hidden !== undefined) out.push(["hidden", this.hidden.toString()]);
    if (this.function !== undefined) out.push(["function", this.function.toString()]);
    if (this.vbProcedure !== undefined) out.push(["vbProcedure", this.vbProcedure.toString()]);
    if (this.xlm !== undefined) out.push(["xlm", this.xlm.toString()]);
    if (this.functionGroupId !== undefined) out.push(["functionGroupId", this.functionGroupId.toString()]);
    if (this.shortcutKey !== undefined) out.push(["shortcutKey", this.shortcutKey.toString()]);
    if (this.publishToServer !== undefined) out.push(["publishToServer", this.publishToServer.toString()]);
    if (this.workbookParameter !== undefined) out.push(["workbookParameter", this.workbookParameter.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "DefinedName" });
  }
}
