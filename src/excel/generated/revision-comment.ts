// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RevisionComment

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Revision Cell Comment.
 *
 * Element: `x:rcmt` */
export class RevisionComment extends OpenXmlLeafElement {
  override readonly localName = "rcmt" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Sheet Id (:sheetId) */
  sheetId: UInt32Value | undefined;

  /** Cell (:cell) */
  cell: StringValue | undefined;

  /** GUID (:guid) */
  guid: StringValue | undefined;

  /** User Action (:action) */
  action: StringValue | undefined;

  /** Always Show Comment (:alwaysShow) */
  alwaysShow: BooleanValue | undefined;

  /** Old Comment (:old) */
  old: BooleanValue | undefined;

  /** Comment In Hidden Row (:hiddenRow) */
  hiddenRow: BooleanValue | undefined;

  /** Hidden Column (:hiddenColumn) */
  hiddenColumn: BooleanValue | undefined;

  /** Author (:author) */
  author: StringValue | undefined;

  /** Original Comment Length (:oldLength) */
  oldLength: UInt32Value | undefined;

  /** New Comment Length (:newLength) */
  newLength: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "sheetId": this.sheetId = UInt32Value.parse(value); return;
      case "cell": this.cell = StringValue.parse(value); return;
      case "guid": this.guid = StringValue.parse(value); return;
      case "action": this.action = StringValue.parse(value); return;
      case "alwaysShow": this.alwaysShow = BooleanValue.parse(value); return;
      case "old": this.old = BooleanValue.parse(value); return;
      case "hiddenRow": this.hiddenRow = BooleanValue.parse(value); return;
      case "hiddenColumn": this.hiddenColumn = BooleanValue.parse(value); return;
      case "author": this.author = StringValue.parse(value); return;
      case "oldLength": this.oldLength = UInt32Value.parse(value); return;
      case "newLength": this.newLength = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.sheetId !== undefined) out.push(["sheetId", this.sheetId.toString()]);
    if (this.cell !== undefined) out.push(["cell", this.cell.toString()]);
    if (this.guid !== undefined) out.push(["guid", this.guid.toString()]);
    if (this.action !== undefined) out.push(["action", this.action.toString()]);
    if (this.alwaysShow !== undefined) out.push(["alwaysShow", this.alwaysShow.toString()]);
    if (this.old !== undefined) out.push(["old", this.old.toString()]);
    if (this.hiddenRow !== undefined) out.push(["hiddenRow", this.hiddenRow.toString()]);
    if (this.hiddenColumn !== undefined) out.push(["hiddenColumn", this.hiddenColumn.toString()]);
    if (this.author !== undefined) out.push(["author", this.author.toString()]);
    if (this.oldLength !== undefined) out.push(["oldLength", this.oldLength.toString()]);
    if (this.newLength !== undefined) out.push(["newLength", this.newLength.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.sheetId, { attribute: ":sheetId", elementClass: "RevisionComment" });
    assertRequired(this.cell, { attribute: ":cell", elementClass: "RevisionComment" });
    assertRequired(this.guid, { attribute: ":guid", elementClass: "RevisionComment" });
    assertRequired(this.author, { attribute: ":author", elementClass: "RevisionComment" });
  }
}
