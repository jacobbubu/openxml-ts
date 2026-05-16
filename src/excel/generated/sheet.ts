// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Sheet

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Sheet Information.
 *
 * Element: `x:sheet` */
export class Sheet extends OpenXmlLeafElement {
  override readonly localName = "sheet" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Sheet Name (:name) */
  name: StringValue | undefined;

  /** Sheet Tab Id (:sheetId) */
  sheetId: UInt32Value | undefined;

  /** Visible State (:state) */
  state: StringValue | undefined;

  /** Relationship Id (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":name": this.name = StringValue.parse(value); return;
      case ":sheetId": this.sheetId = UInt32Value.parse(value); return;
      case ":state": this.state = StringValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.sheetId !== undefined) out.push([":sheetId", this.sheetId.toString()]);
    if (this.state !== undefined) out.push([":state", this.state.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "Sheet" });
    assertRequired(this.sheetId, { attribute: ":sheetId", elementClass: "Sheet" });
    assertRequired(this.id, { attribute: "r:id", elementClass: "Sheet" });
  }
}
