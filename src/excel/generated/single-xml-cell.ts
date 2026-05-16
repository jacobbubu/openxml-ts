// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.SingleXmlCell

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Table Properties.
 *
 * Element: `x:singleXmlCell` */
export class SingleXmlCell extends OpenXmlCompositeElement {
  override readonly localName = "singleXmlCell" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Table Id (:id) */
  id: UInt32Value | undefined;

  /** Reference (:r) */
  cellReference: StringValue | undefined;

  /** Connection ID (:connectionId) */
  connectionId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":id": this.id = UInt32Value.parse(value); return;
      case ":r": this.cellReference = StringValue.parse(value); return;
      case ":connectionId": this.connectionId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push([":id", this.id.toString()]);
    if (this.cellReference !== undefined) out.push([":r", this.cellReference.toString()]);
    if (this.connectionId !== undefined) out.push([":connectionId", this.connectionId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "SingleXmlCell" });
    assertRequired(this.cellReference, { attribute: ":r", elementClass: "SingleXmlCell" });
    assertRequired(this.connectionId, { attribute: ":connectionId", elementClass: "SingleXmlCell" });
  }
}
