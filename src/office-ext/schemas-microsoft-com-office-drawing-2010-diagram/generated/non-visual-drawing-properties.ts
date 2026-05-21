// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_diagram.json
// @see DocumentFormat.OpenXml.Drawing2010Diagram.NonVisualDrawingProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the NonVisualDrawingProperties Class.
 *
 * Element: `dgm14:cNvPr` */
export class NonVisualDrawingProperties extends OpenXmlCompositeElement {
  override readonly localName = "cNvPr" as const;
  override readonly prefix = "dgm14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Application defined unique identifier. (:id) */
  id: UInt32Value | undefined;

  /** Name compatible with Object Model (non-unique). (:name) */
  name: StringValue | undefined;

  /** Description of the drawing element. (:descr) */
  description: StringValue | undefined;

  /** Flag determining to show or hide this element. (:hidden) */
  hidden: BooleanValue | undefined;

  /** Title (:title) */
  title: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = UInt32Value.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "descr": this.description = StringValue.parse(value); return;
      case "hidden": this.hidden = BooleanValue.parse(value); return;
      case "title": this.title = StringValue.parse(value); return;
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
    if (this.title !== undefined) out.push(["title", this.title.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "NonVisualDrawingProperties" });
    assertRequired(this.name, { attribute: ":name", elementClass: "NonVisualDrawingProperties" });
  }
}
