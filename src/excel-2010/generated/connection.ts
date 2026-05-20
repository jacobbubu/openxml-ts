// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.Connection

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the Connection Class.
 *
 * Element: `x15:connection` */
export class Connection extends OpenXmlCompositeElement {
  override readonly localName = "connection" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: StringValue | undefined;

  /** model (:model) */
  model: BooleanValue | undefined;

  /** excludeFromRefreshAll (:excludeFromRefreshAll) */
  excludeFromRefreshAll: BooleanValue | undefined;

  /** autoDelete (:autoDelete) */
  autoDelete: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "model": this.model = BooleanValue.parse(value); return;
      case "excludeFromRefreshAll": this.excludeFromRefreshAll = BooleanValue.parse(value); return;
      case "autoDelete": this.autoDelete = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.model !== undefined) out.push(["model", this.model.toString()]);
    if (this.excludeFromRefreshAll !== undefined) out.push(["excludeFromRefreshAll", this.excludeFromRefreshAll.toString()]);
    if (this.autoDelete !== undefined) out.push(["autoDelete", this.autoDelete.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "Connection" });
  }
}
