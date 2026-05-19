// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ExternalDefinedName

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defined Name.
 *
 * Element: `x:definedName` */
export class ExternalDefinedName extends OpenXmlLeafElement {
  override readonly localName = "definedName" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Defined Name (:name) */
  name: StringValue | undefined;

  /** Refers To (:refersTo) */
  refersTo: StringValue | undefined;

  /** Sheet Id (:sheetId) */
  sheetId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "refersTo": this.refersTo = StringValue.parse(value); return;
      case "sheetId": this.sheetId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.refersTo !== undefined) out.push(["refersTo", this.refersTo.toString()]);
    if (this.sheetId !== undefined) out.push(["sheetId", this.sheetId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "ExternalDefinedName" });
  }
}
