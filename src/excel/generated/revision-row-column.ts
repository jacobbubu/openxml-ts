// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RevisionRowColumn

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Revision Row Column Insert Delete.
 *
 * Element: `x:rrc` */
export class RevisionRowColumn extends OpenXmlCompositeElement {
  override readonly localName = "rrc" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Revision Id (:rId) */
  revisionId: UInt32Value | undefined;

  /** Revision From Rejection (:ua) */
  ua: BooleanValue | undefined;

  /** Revision Undo Rejected (:ra) */
  ra: BooleanValue | undefined;

  /** Sheet Id (:sId) */
  sheetId: UInt32Value | undefined;

  /** End Of List (:eol) */
  endOfList: BooleanValue | undefined;

  /** Reference (:ref) */
  reference: StringValue | undefined;

  /** User Action (:action) */
  action: StringValue | undefined;

  /** Edge Deleted (:edge) */
  edge: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rId": this.revisionId = UInt32Value.parse(value); return;
      case "ua": this.ua = BooleanValue.parse(value); return;
      case "ra": this.ra = BooleanValue.parse(value); return;
      case "sId": this.sheetId = UInt32Value.parse(value); return;
      case "eol": this.endOfList = BooleanValue.parse(value); return;
      case "ref": this.reference = StringValue.parse(value); return;
      case "action": this.action = StringValue.parse(value); return;
      case "edge": this.edge = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.revisionId !== undefined) out.push(["rId", this.revisionId.toString()]);
    if (this.ua !== undefined) out.push(["ua", this.ua.toString()]);
    if (this.ra !== undefined) out.push(["ra", this.ra.toString()]);
    if (this.sheetId !== undefined) out.push(["sId", this.sheetId.toString()]);
    if (this.endOfList !== undefined) out.push(["eol", this.endOfList.toString()]);
    if (this.reference !== undefined) out.push(["ref", this.reference.toString()]);
    if (this.action !== undefined) out.push(["action", this.action.toString()]);
    if (this.edge !== undefined) out.push(["edge", this.edge.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.revisionId, { attribute: ":rId", elementClass: "RevisionRowColumn" });
    assertRequired(this.sheetId, { attribute: ":sId", elementClass: "RevisionRowColumn" });
    assertRequired(this.reference, { attribute: ":ref", elementClass: "RevisionRowColumn" });
    assertRequired(this.action, { attribute: ":action", elementClass: "RevisionRowColumn" });
  }
}
