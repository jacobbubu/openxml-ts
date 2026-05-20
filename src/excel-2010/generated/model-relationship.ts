// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.ModelRelationship

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the ModelRelationship Class.
 *
 * Element: `x15:modelRelationship` */
export class ModelRelationship extends OpenXmlLeafElement {
  override readonly localName = "modelRelationship" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** fromTable (:fromTable) */
  fromTable: StringValue | undefined;

  /** fromColumn (:fromColumn) */
  fromColumn: StringValue | undefined;

  /** toTable (:toTable) */
  toTable: StringValue | undefined;

  /** toColumn (:toColumn) */
  toColumn: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "fromTable": this.fromTable = StringValue.parse(value); return;
      case "fromColumn": this.fromColumn = StringValue.parse(value); return;
      case "toTable": this.toTable = StringValue.parse(value); return;
      case "toColumn": this.toColumn = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.fromTable !== undefined) out.push(["fromTable", this.fromTable.toString()]);
    if (this.fromColumn !== undefined) out.push(["fromColumn", this.fromColumn.toString()]);
    if (this.toTable !== undefined) out.push(["toTable", this.toTable.toString()]);
    if (this.toColumn !== undefined) out.push(["toColumn", this.toColumn.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.fromTable, { attribute: ":fromTable", elementClass: "ModelRelationship" });
    assertRequired(this.fromColumn, { attribute: ":fromColumn", elementClass: "ModelRelationship" });
    assertRequired(this.toTable, { attribute: ":toTable", elementClass: "ModelRelationship" });
    assertRequired(this.toColumn, { attribute: ":toColumn", elementClass: "ModelRelationship" });
  }
}
