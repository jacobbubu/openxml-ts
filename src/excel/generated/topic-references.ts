// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.TopicReferences

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** References.
 *
 * Element: `x:tr` */
export class TopicReferences extends OpenXmlLeafElement {
  override readonly localName = "tr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Reference (:r) */
  cellReference: StringValue | undefined;

  /** Sheet Id (:s) */
  sheetId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":r": this.cellReference = StringValue.parse(value); return;
      case ":s": this.sheetId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.cellReference !== undefined) out.push([":r", this.cellReference.toString()]);
    if (this.sheetId !== undefined) out.push([":s", this.sheetId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.cellReference, { attribute: ":r", elementClass: "TopicReferences" });
    assertRequired(this.sheetId, { attribute: ":s", elementClass: "TopicReferences" });
  }
}
