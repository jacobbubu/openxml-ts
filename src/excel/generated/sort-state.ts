// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.SortState

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Sort State for Auto Filter.
 *
 * Element: `x:sortState` */
export class SortState extends OpenXmlCompositeElement {
  override readonly localName = "sortState" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Sort by Columns (:columnSort) */
  columnSort: BooleanValue | undefined;

  /** Case Sensitive (:caseSensitive) */
  caseSensitive: BooleanValue | undefined;

  /** Sort Method (:sortMethod) */
  sortMethod: StringValue | undefined;

  /** Sort Range (:ref) */
  reference: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "columnSort": this.columnSort = BooleanValue.parse(value); return;
      case "caseSensitive": this.caseSensitive = BooleanValue.parse(value); return;
      case "sortMethod": this.sortMethod = StringValue.parse(value); return;
      case "ref": this.reference = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.columnSort !== undefined) out.push(["columnSort", this.columnSort.toString()]);
    if (this.caseSensitive !== undefined) out.push(["caseSensitive", this.caseSensitive.toString()]);
    if (this.sortMethod !== undefined) out.push(["sortMethod", this.sortMethod.toString()]);
    if (this.reference !== undefined) out.push(["ref", this.reference.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.reference, { attribute: ":ref", elementClass: "SortState" });
  }
}
