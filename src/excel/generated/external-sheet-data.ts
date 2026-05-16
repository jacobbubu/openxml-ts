// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ExternalSheetData

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** External Sheet Data Set.
 *
 * Element: `x:sheetData` */
export class ExternalSheetData extends OpenXmlCompositeElement {
  override readonly localName = "sheetData" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Sheet Id (:sheetId) */
  sheetId: UInt32Value | undefined;

  /** Last Refresh Resulted in Error (:refreshError) */
  refreshError: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":sheetId": this.sheetId = UInt32Value.parse(value); return;
      case ":refreshError": this.refreshError = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.sheetId !== undefined) out.push([":sheetId", this.sheetId.toString()]);
    if (this.refreshError !== undefined) out.push([":refreshError", this.refreshError.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.sheetId, { attribute: ":sheetId", elementClass: "ExternalSheetData" });
  }
}
