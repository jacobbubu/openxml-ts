// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_spreadsheetDrawing.json
// @see DocumentFormat.OpenXml.SpreadsheetDrawing.NonVisualDrawingProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Non-Visual Drawing Properties.
 *
 * Element: `xdr:cNvPr` */
export class NonVisualDrawingProperties extends OpenXmlCompositeElement {
  override readonly localName = "cNvPr" as const;
  override readonly prefix = "xdr" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: UInt32Value | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** descr (:descr) */
  description: StringValue | undefined;

  /** hidden (:hidden) */
  hidden: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = UInt32Value.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "descr": this.description = StringValue.parse(value); return;
      case "hidden": this.hidden = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.description !== undefined) out.push(["descr", this.description.toString()]);
    if (this.hidden !== undefined) out.push(["hidden", this.hidden.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "NonVisualDrawingProperties" });
    assertRequired(this.name, { attribute: ":name", elementClass: "NonVisualDrawingProperties" });
  }
}
