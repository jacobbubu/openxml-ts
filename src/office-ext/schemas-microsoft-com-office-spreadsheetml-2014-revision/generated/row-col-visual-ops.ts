// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RowColVisualOps

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RowColVisualOps Class.
 *
 * Element: `xr:rowColVisualOps` */
export class RowColVisualOps extends OpenXmlLeafElement {
  override readonly localName = "rowColVisualOps" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;


  /** action (:action) */
  action: StringValue | undefined;

  /** isRow (:isRow) */
  isRow: BooleanValue | undefined;

  /** size (:size) */
  size: UInt32Value | undefined;

  /** userSized (:userSized) */
  userSized: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "action": this.action = StringValue.parse(value); return;
      case "isRow": this.isRow = BooleanValue.parse(value); return;
      case "size": this.size = UInt32Value.parse(value); return;
      case "userSized": this.userSized = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.action !== undefined) out.push(["action", this.action.toString()]);
    if (this.isRow !== undefined) out.push(["isRow", this.isRow.toString()]);
    if (this.size !== undefined) out.push(["size", this.size.toString()]);
    if (this.userSized !== undefined) out.push(["userSized", this.userSized.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.action, { attribute: ":action", elementClass: "RowColVisualOps" });
    assertRequired(this.isRow, { attribute: ":isRow", elementClass: "RowColVisualOps" });
  }
}
