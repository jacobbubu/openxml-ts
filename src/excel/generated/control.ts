// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Control

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Embedded Control.
 *
 * Element: `x:control` */
export class Control extends OpenXmlCompositeElement {
  override readonly localName = "control" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Shape Id (:shapeId) */
  shapeId: UInt32Value | undefined;

  /** Relationship Id (r:id) */
  id: StringValue | undefined;

  /** Control Name (:name) */
  name: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "shapeId": this.shapeId = UInt32Value.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.shapeId !== undefined) out.push(["shapeId", this.shapeId.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.shapeId, { attribute: ":shapeId", elementClass: "Control" });
    assertRequired(this.id, { attribute: "r:id", elementClass: "Control" });
  }
}
