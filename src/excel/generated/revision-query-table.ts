// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RevisionQueryTable

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Revision Query Table.
 *
 * Element: `x:rqt` */
export class RevisionQueryTable extends OpenXmlLeafElement {
  override readonly localName = "rqt" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Sheet Id (:sheetId) */
  sheetId: UInt32Value | undefined;

  /** QueryTable Reference (:ref) */
  reference: StringValue | undefined;

  /** Field Id (:fieldId) */
  fieldId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "sheetId": this.sheetId = UInt32Value.parse(value); return;
      case "ref": this.reference = StringValue.parse(value); return;
      case "fieldId": this.fieldId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.sheetId !== undefined) out.push(["sheetId", this.sheetId.toString()]);
    if (this.reference !== undefined) out.push(["ref", this.reference.toString()]);
    if (this.fieldId !== undefined) out.push(["fieldId", this.fieldId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.sheetId, { attribute: ":sheetId", elementClass: "RevisionQueryTable" });
    assertRequired(this.reference, { attribute: ":ref", elementClass: "RevisionQueryTable" });
    assertRequired(this.fieldId, { attribute: ":fieldId", elementClass: "RevisionQueryTable" });
  }
}
