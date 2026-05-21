// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_excel_2006_main.json
// @see DocumentFormat.OpenXml.Excel2006Main.ColumnSortMapItem

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Column.
 *
 * Element: `xne:col` */
export class ColumnSortMapItem extends OpenXmlLeafElement {
  override readonly localName = "col" as const;
  override readonly prefix = "xne" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/excel/2006/main" as const;


  /** New Value (:newVal) */
  newVal: UInt32Value | undefined;

  /** Old Value (:oldVal) */
  oldVal: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "newVal": this.newVal = UInt32Value.parse(value); return;
      case "oldVal": this.oldVal = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.newVal !== undefined) out.push(["newVal", this.newVal.toString()]);
    if (this.oldVal !== undefined) out.push(["oldVal", this.oldVal.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.newVal, { attribute: ":newVal", elementClass: "ColumnSortMapItem" });
    assertRequired(this.oldVal, { attribute: ":oldVal", elementClass: "ColumnSortMapItem" });
  }
}
