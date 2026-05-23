// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_11_main.json
// @see DocumentFormat.OpenXml.201411Main.ModelTimeGrouping

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ModelTimeGrouping Class.
 *
 * Element: `x16:modelTimeGrouping` */
export class ModelTimeGrouping extends OpenXmlCompositeElement {
  override readonly localName = "modelTimeGrouping" as const;
  override readonly prefix = "x16" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/11/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** tableName (:tableName) */
  tableName: StringValue | undefined;

  /** columnName (:columnName) */
  columnName: StringValue | undefined;

  /** columnId (:columnId) */
  columnId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "tableName": this.tableName = StringValue.parse(value); return;
      case "columnName": this.columnName = StringValue.parse(value); return;
      case "columnId": this.columnId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.tableName !== undefined) out.push(["tableName", this.tableName.toString()]);
    if (this.columnName !== undefined) out.push(["columnName", this.columnName.toString()]);
    if (this.columnId !== undefined) out.push(["columnId", this.columnId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.tableName, { attribute: ":tableName", elementClass: "ModelTimeGrouping" });
    assertRequired(this.columnName, { attribute: ":columnName", elementClass: "ModelTimeGrouping" });
    assertRequired(this.columnId, { attribute: ":columnId", elementClass: "ModelTimeGrouping" });
  }
}
