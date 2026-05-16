// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RevisionConflict

import {
  BooleanValue,
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Revision Merge Conflict.
 *
 * Element: `x:rcft` */
export class RevisionConflict extends OpenXmlLeafElement {
  override readonly localName = "rcft" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Revision Id (:rId) */
  revisionId: UInt32Value | undefined;

  /** Revision From Rejection (:ua) */
  ua: BooleanValue | undefined;

  /** Revision Undo Rejected (:ra) */
  ra: BooleanValue | undefined;

  /** Sheet Id (:sheetId) */
  sheetId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":rId": this.revisionId = UInt32Value.parse(value); return;
      case ":ua": this.ua = BooleanValue.parse(value); return;
      case ":ra": this.ra = BooleanValue.parse(value); return;
      case ":sheetId": this.sheetId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.revisionId !== undefined) out.push([":rId", this.revisionId.toString()]);
    if (this.ua !== undefined) out.push([":ua", this.ua.toString()]);
    if (this.ra !== undefined) out.push([":ra", this.ra.toString()]);
    if (this.sheetId !== undefined) out.push([":sheetId", this.sheetId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.revisionId, { attribute: ":rId", elementClass: "RevisionConflict" });
  }
}
