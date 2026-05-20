// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.ModelTable

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the ModelTable Class.
 *
 * Element: `x15:modelTable` */
export class ModelTable extends OpenXmlLeafElement {
  override readonly localName = "modelTable" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** id (:id) */
  id: StringValue | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** connection (:connection) */
  connection: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "connection": this.connection = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.connection !== undefined) out.push(["connection", this.connection.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "ModelTable" });
    assertRequired(this.name, { attribute: ":name", elementClass: "ModelTable" });
    assertRequired(this.connection, { attribute: ":connection", elementClass: "ModelTable" });
  }
}
