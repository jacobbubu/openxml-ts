// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_11_main.json
// @see DocumentFormat.OpenXml.201411Main.CalculatedTimeColumn

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the CalculatedTimeColumn Class.
 *
 * Element: `x16:calculatedTimeColumn` */
export class CalculatedTimeColumn extends OpenXmlLeafElement {
  override readonly localName = "calculatedTimeColumn" as const;
  override readonly prefix = "x16" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/11/main" as const;


  /** columnName (:columnName) */
  columnName: StringValue | undefined;

  /** columnId (:columnId) */
  columnId: StringValue | undefined;

  /** contentType (:contentType) */
  contentType: StringValue | undefined;

  /** isSelected (:isSelected) */
  isSelected: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "columnName": this.columnName = StringValue.parse(value); return;
      case "columnId": this.columnId = StringValue.parse(value); return;
      case "contentType": this.contentType = StringValue.parse(value); return;
      case "isSelected": this.isSelected = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.columnName !== undefined) out.push(["columnName", this.columnName.toString()]);
    if (this.columnId !== undefined) out.push(["columnId", this.columnId.toString()]);
    if (this.contentType !== undefined) out.push(["contentType", this.contentType.toString()]);
    if (this.isSelected !== undefined) out.push(["isSelected", this.isSelected.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.columnName, { attribute: ":columnName", elementClass: "CalculatedTimeColumn" });
    assertRequired(this.columnId, { attribute: ":columnId", elementClass: "CalculatedTimeColumn" });
    assertRequired(this.contentType, { attribute: ":contentType", elementClass: "CalculatedTimeColumn" });
    assertRequired(this.isSelected, { attribute: ":isSelected", elementClass: "CalculatedTimeColumn" });
  }
}
