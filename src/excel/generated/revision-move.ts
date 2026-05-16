// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RevisionMove

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Revision Cell Move.
 *
 * Element: `x:rm` */
export class RevisionMove extends OpenXmlCompositeElement {
  override readonly localName = "rm" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Revision Id (:rId) */
  revisionId: UInt32Value | undefined;

  /** Revision From Rejection (:ua) */
  ua: BooleanValue | undefined;

  /** Revision Undo Rejected (:ra) */
  ra: BooleanValue | undefined;

  /** Sheet Id (:sheetId) */
  sheetId: UInt32Value | undefined;

  /** Source (:source) */
  source: StringValue | undefined;

  /** Destination (:destination) */
  destination: StringValue | undefined;

  /** Source Sheet Id (:sourceSheetId) */
  sourceSheetId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":rId": this.revisionId = UInt32Value.parse(value); return;
      case ":ua": this.ua = BooleanValue.parse(value); return;
      case ":ra": this.ra = BooleanValue.parse(value); return;
      case ":sheetId": this.sheetId = UInt32Value.parse(value); return;
      case ":source": this.source = StringValue.parse(value); return;
      case ":destination": this.destination = StringValue.parse(value); return;
      case ":sourceSheetId": this.sourceSheetId = UInt32Value.parse(value); return;
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
    if (this.source !== undefined) out.push([":source", this.source.toString()]);
    if (this.destination !== undefined) out.push([":destination", this.destination.toString()]);
    if (this.sourceSheetId !== undefined) out.push([":sourceSheetId", this.sourceSheetId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.revisionId, { attribute: ":rId", elementClass: "RevisionMove" });
    assertRequired(this.sheetId, { attribute: ":sheetId", elementClass: "RevisionMove" });
    assertRequired(this.source, { attribute: ":source", elementClass: "RevisionMove" });
    assertRequired(this.destination, { attribute: ":destination", elementClass: "RevisionMove" });
  }
}
